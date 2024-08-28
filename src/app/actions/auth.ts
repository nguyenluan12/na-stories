"use server"
import { SignupFormSchema,SigninFormSchema, FormState, LogoutForm, updateInforSchema, generateStoryForm, StoryFormState, FormStateUpdate } from '../../lib/definitions'
import bcrypt from 'bcryptjs'; 
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
import { createSession, decrypt, deleteSession, logout } from '../../lib/session'
import { cookies } from 'next/headers';
import { error, log } from 'console';
import { json } from 'stream/consumers';
import Email from 'next-auth/providers/email';
import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { title } from 'process';

const openai = new OpenAI();
export async function signup(state: FormState, formData: FormData) {
  // Validate form fields
  console.log("signup")
  const validatedFields = SignupFormSchema.safeParse({
    name: formData.get('name'),
    email: formData.get('email'),
    password: formData.get('password'),
    verifyPassword: formData.get('verifyPassword'),
    phoneNumber:formData.get('phone'),
    date:formData.get('date')

  })
  
  // If any form fields are invalid, return early
  if (!validatedFields.success) {
    console.log('not valid field')
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
 
  const { name, email, password, phoneNumber,verifyPassword, date } = validatedFields.data
  console.log(verifyPassword)
  
  const existingUser = await prisma.user.findUnique({
    where: { email },
  });
  if (existingUser) {
    return {
        errors: {
            email: ['Email already exists'],
            },
        }}
  if (password!=verifyPassword) {
    console.log("wrong verify password")
    return {
        errors:{
            verifyPassword: ['Wrong verify password'],
        }
    }
  }
  // e.g. Hash the user's password before storing it
  const hashedPassword = await bcrypt.hash(password, 10)

    const user =await prisma.user.create({
      data: {
        email,
        name,
        password: hashedPassword,
        phoneNumber,
        date,
      },
    });
    await createSession(user.id)
    redirect("/login/signin")
}
export async function signin(state:FormState,formData:FormData ) {
    console.log("signin")
    console.log(formData.get('email'))
    const validatedFields = SigninFormSchema.safeParse(
        {
            email: formData.get('email'),
            password: formData.get('password'),
        }
    )
    console.log(validatedFields.data)
    if (!validatedFields.success) {
        return {
          errors: validatedFields.error.flatten().fieldErrors,
        }
      }
    const {email, password} = validatedFields.data
    const user = await prisma.user.findUnique({
        where: {email}
        });
    if (!user) {
        
        return {
            errors: {
                email: ['Email not found'],
                },
            }

    }
    else{
        const isValidPassword = await bcrypt.compare(password, user.password||"")
        if (!isValidPassword) {
            console.log("wrong password")
            return {
                errors:{
                    password: ['Wrong password'],
                }
            }
        }
    }
    // await logout();
    await createSession(user.id);
    const cookie = cookies().get('session')?.value
    const session:any = await decrypt(cookie||'')
    console.log(session.userId)
    
    redirect("/home")
}
export async function updateInfor(state: FormState, formData: FormData) {
  // Validate form fields
  console.log("update")
  
  const validatedFields = updateInforSchema.safeParse({
    email: formData.get('email'),
    password: formData.get('password')||'',
    verifyPassword:formData.get('verifyPassword')||'',
    phoneNumber:formData.get('phone'),
    date:formData.get('date'),
    // imgSrc: formData.get('imgUrl')

  })
  
  // If any form fields are invalid, return early
  console.log(formData.get('email'))
  if (!validatedFields.success) {
    console.log('not valid')
    console.log(validatedFields.error.flatten().fieldErrors)
    return {
      errors: validatedFields.error.flatten().fieldErrors,
    }
  }
  // const verifyPassword =formData.get('verifyPassword')
  
  const {email, password, phoneNumber, date, verifyPassword } = validatedFields.data
  // e.g. Hash the user's password before storing it
  // console.log(password)
  console.log(verifyPassword)
  console.log(password==verifyPassword)
  if (password!=verifyPassword) {
    console.log("wrong verify password")
    return {
        errors:{
            verifyPassword: ['Wrong verify password'],
        }
    }
  }
  
  if(password!=''){
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log("done")

    await prisma.user.update({
      where:{email:email},
      data: {
        password:hashedPassword,
        phoneNumber:phoneNumber,
        date:date,
      },
    });
  }else{
    console.log('done2')
    await prisma.user.update({
      where:{email:email},
      data: {
        
        phoneNumber:phoneNumber,
        date:date,
      },
    });
  }
    // await createSession(user.id)
    // redirect("/login/signin")
}
export async function generateStory(state: StoryFormState, formData: FormData){
  console.log("generate Story")


  const validatedFields = generateStoryForm.safeParse({
    title: formData.get('title'),

  })
  console.log(validatedFields)
  
  const Story = z.object({
      title: z.string(),
      id: z.string(),
      content: z.string(),
      translation: z.string(),
      ask: z.array(
       z.object({
        question: z.string(),
        answer: z.string(),
       })
      )
      
  });

  const completion = await openai.beta.chat.completions.parse({
  model: "gpt-4o-2024-08-06",
  messages: [
      { role: "system", content: "You are the best english teller" },
      { role: "user", content: "The story told in English has about 10-15 sentences." },
      { role: "user", content: "Translate them to Vietnamese" },
      // { role: "user", content: "Give a vocabulary each sentence" },
      // { role: "user", content: "The title will be two to four words, which are related topics of vocabulary" },
      // { role: "user", content: "The gapIndexes are not allowed to refer to punctuation in a sentence " },
      { role: "user", content: `The title of the story can be ${validatedFields.data?.title} or some story related to that element ` },
      { role: "user", content: "You will ask about 4-5 questions related to the content in the story for readers to answer. The questions will be placed in the question section of the ask element, and the answers will be placed in the answer section of the element ask" },
      // { role: "user", content: "The gapIndexes have one element" },
  ],
  response_format: zodResponseFormat(Story, "event"),
  
  });
  const buffer = {
    name:''
  };

// Set a `name` that ends with .png so that the API knows it's a PNG image


  const event = completion.choices[0]?.message.parsed;
  // GENERATE IMG
  const response = await openai.images.generate({
    model: "dall-e-3",
    prompt: event?.title||'',
    n: 1,
    size: "1024x1024",
  });
  const image_url = response?.data[0]?.url;
  console.log(image_url)
  // console.log(event)
  // // const lesson = await Promise.all(event?.lesson.map(async (item) => {
  // //     const text = {
  // //         id: "1",
  // //         content: item.content,
  // //     };
  // //     const audioUrl = await generateAudio("na-stories", text); // Chờ Promise hoàn thành
  // //     return {
  // //         id: item.id,
  // //         content: item.content,
  // //         translation: item.translation,
  // //         gapIndexes: item.gapIndexes,
  // //         audioUrl: audioUrl,
  // //     };
  // // }) || []);
  // // await prisma.lesson_cloze.create({
  // //         data: {
  // //         title: event?.title||'',
  // //         lesson: lesson
  // //         }
  // //     });
  // // await prisma.$disconnect()
  // return event;
  if (validatedFields.success) {
    console.log(event)
    console.log('valid')
    await prisma.storyGenerated.create({
      data: {
        content:event?.content||'',
        title:event?.title||'',
        translate: event?.translation||'',
        ask: event?.ask||{},
        img: image_url||'',
      }
    });
    await prisma.$disconnect()
    return {
      message:{
        content:event?.content,
        title:event?.title,
        translate: event?.translation,
        ask: event?.ask,
        img: image_url || ''
    }}
  }else{
    return{
      errors:{
        title: ['Fail to generate'],
    }
    }
  }
  
}
export async function CheckSentences(state: StoryFormState, formData: FormData){
  console.log("Checking Sentences")


  const validatedFields = generateStoryForm.safeParse({
    title: formData.get('title'),

  })
  console.log(formData.get('title'))
  
  const Story = z.object({
      id: z.string(),
      ask: z.array(
       z.object({
        sentences: z.string(), // câu trong đoạn văn (chat gpt sẽ phải phân tích tính đúng sai của từng câu văn)
        check: z.boolean(), //return true nễu câu đó hợp lý, false nếu câu đó sai ngứ pháp hoặc từ vựng
        answer: z.string(), // Đáp án sau khi chỉnh sửa câu
        reason: z.string()  // Lý do sai của câu đó
       })
      )
      
  });

  const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
        { role: "system", content: "You are an expert English grammar checker." },
        { 
          role: "user", 
          content: `You will be given sentence numbers in English. Your task is:
          1. Analyze each sentence to find grammatical and vocabulary errors.
          2. For each sentence, return:
              - “check”: true if the sentence is grammatically correct, or false if there are errors.
              - “answer”: Corrected sentence (if necessary).
              - "reason": Briefly explain the error and how to fix it, if any. If the sentence is correct, send a short 2-4 word compliment to encourage the student.`
        },
        { role: "user", content: `The sentences are "${validatedFields.data?.title}" ` },
        // { role: "user", content: "Translate the story to Vietnamese after checking the sentences." }
    ],
    response_format: zodResponseFormat(Story, "event"),
  });
  

// Set a `name` that ends with .png so that the API knows it's a PNG image


  const event = completion.choices[0]?.message.parsed;
  console.log(event?.ask)
  if (validatedFields.success) {
    // console.log(event)
    console.log('valid')
    return {
      message:{
        list: event?.ask
    }}
  }else{
    console.log(validatedFields.error)
    return{
      errors:{
        title: ['Fail to generate'],
    }
    }
  }
  
}
