"use server"
import { SignupFormSchema,SigninFormSchema, FormState, LogoutForm, updateInforSchema, generateStoryForm, StoryFormState, FormStateUpdate } from '../../lib/definitions'
import bcrypt from 'bcryptjs'; 
import { prisma } from '../../lib/prisma';
import { redirect } from 'next/navigation';
import { createSession, decrypt, deleteSession, logout } from '../../lib/session'
import { cookies } from 'next/headers';
import { z } from "zod";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash-latest" });

// This is a helper function to parse JSON from the Gemini response
async function parseGeminiResponse(prompt: string, schema: z.ZodTypeAny) {
  try {
    const result = await model.generateContent(prompt);
    const text = result.response.text();
    // Gemini often returns the JSON within a markdown code block, so we'll need to extract it.
    const jsonString = text.replace(/```json\n|```/g, '').trim();
    const parsedData = JSON.parse(jsonString);
    return schema.parse(parsedData);
  } catch (error) {
    console.error("Error parsing Gemini response:", error);
    throw new Error("Failed to parse Gemini response.");
  }
}
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
// STORY
export async function generateStory(state: StoryFormState, formData: FormData){
  console.log("generate Story")


  const validatedFields = generateStoryForm.safeParse({
    title: formData.get('title'),

  })
  console.log(validatedFields)
  
  const StorySchema = z.object({
    title: z.string(),
    id: z.string(),
    content: z.string(),
    translation: z.string(),
    ask: z.array(
      z.object({
        question: z.string(),
        answer: z.string(),
      })
    ),
  });

  const prompt = `
    You are the best English storyteller.
    Create a short story for beginners with 10–15 sentences in English.
    The lesson should be a JSON object with the following structure:
    {
      "title": "${validatedFields.data?.title}",
      "id": "1",
      "content": "English story here (10–15 sentences).",
      "translation": "Vietnamese translation of the story.",
      "ask": [
        {
          "question": "Question about the story",
          "answer": "Answer to the question"
        }
      ]
    }
    Requirements:
    - The story title must be 2–4 words, related to the topic "${validatedFields.data?.title}".
    - The English story should be simple, clear, and suitable for A2–B1 learners.
    - Provide the Vietnamese translation of the story in full.
    - Create 4–5 simple questions about the story with their correct answers.
    - Provide only the JSON object in your response, without any additional text or markdown.
  `;

  const event = await parseGeminiResponse(prompt, StorySchema);
  console.log('Generated Story from Gemini:', event);
  // Note: Gemini doesn't have an equivalent to Dall-E 3 for image generation.
  // You would need to use a separate image generation API or another approach.
  // For this example, I'll use a placeholder.
  const image_url = "placeholder_image_url";

  await prisma.storyGenerated.create({
    data: {
      content: event.content,
      title: event.title,
      translate: event.translation,
      ask: event.ask,
      img: image_url,
    },
  });

  await prisma.$disconnect();

  return {
    message: {
      content: event.content,
      title: event.title,
      translate: event.translation,
      ask: event.ask,
      img: image_url,
    },
  };
};

export async function CheckSentences(state: StoryFormState, formData: FormData) {
  // Bước 1: Validate dữ liệu từ form
  const validatedFields = generateStoryForm.safeParse({
    title: formData.get("title"), // input: câu của học viên
  });
  console.log(validatedFields)
  if (!validatedFields.success) {
    return {
      errors: {
        sentences: ["Fail to generate"],
      },
    };
  }

  // Bước 2: Khai báo schema cho dữ liệu trả về từ Gemini
  const SentenceSchema = z.object({
    id: z.string(),
    ask: z.array(
      z.object({
        sentences: z.string(), // câu của học viên
        check: z.boolean(),    // true nếu đúng, false nếu sai
        answer: z.string(),    // câu chỉnh sửa
        reason: z.string(),    // lời giải thích hoặc lời khen
      })
    ),
  });

  // Bước 3: Prompt gửi tới Gemini
  const prompt = `
You are an expert English grammar checker.
You will be given one or more sentences in English. Return ONLY a single JSON object with this exact structure:

{
  "id": "1",
  "ask": [
    {
      "sentences": "<original sentence>",
      "check": true|false,
      "answer": "<corrected sentence (minimal edit)>",
      "reason": "<explanation>"
    }
  ]
}

Instructions:
- If the input has multiple sentences, split them and return one item in "ask" for each sentence, in the same order.
- "check": true if the sentence is correct, false if it has any grammar or vocabulary errors.
- "answer": provide the corrected sentence (or the same if correct).
- "reason":
   - If incorrect: briefly point out what is wrong and explain why it is wrong (grammar/vocabulary).
   - If correct: give a short 2–4 word compliment (e.g., "Good job", "Well done").
- IMPORTANT: Do NOT mark as incorrect for punctuation (e.g., commas, periods) or capitalization (uppercase/lowercase). Only check grammar and vocabulary.

The sentences are: "${validatedFields.data.title}"
`;



  // Bước 4: Gọi Gemini qua helper parseGeminiResponse
  try {
    const event = await parseGeminiResponse(prompt, SentenceSchema);
    console.log("✅ Checked Sentences:", event);

    return {
      message: {
        list: event.ask,
      },
    };
  } catch (error) {
    console.error("❌ Gemini API error", error);
    return {
      errors: {
        sentences: ["Gemini request failed"],
      },
    };
  }
}
