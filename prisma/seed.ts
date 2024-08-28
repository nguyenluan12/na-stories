"use server"

import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { generateAudio } from "./audio";




const openai = new OpenAI();
const prisma = new PrismaClient();

//Story
// export const generateStory=async (title:string)=>{
//     const Story = z.object({
//         title: z.string(),
//         id: z.string(),
//         content: z.string(),
//         translation: z.string(),
       
        
//     });

//     const completion = await openai.beta.chat.completions.parse({
//     model: "gpt-4o-2024-08-06",
//     messages: [
//         { role: "system", content: "You are the best fairy tale teller" },
//         { role: "user", content: "Story have about 10-15 sentences." },
//         { role: "user", content: "Translate them to Vietnamese" },
//         // { role: "user", content: "Give a vocabulary each sentence" },
//         // { role: "user", content: "The title will be two to four words, which are related topics of vocabulary" },
//         // { role: "user", content: "The gapIndexes are not allowed to refer to punctuation in a sentence " },
//         { role: "user", content: `The title is ${title} ` },
//         // { role: "user", content: "There must be space between words and punctuation marks, not attached" },
//         // { role: "user", content: "The gapIndexes have one element" },
//     ],
//     response_format: zodResponseFormat(Story, "event"),
//     });

//     const event = completion.choices[0]?.message.parsed;
//     // console.log(event)
//     // const lesson = await Promise.all(event?.lesson.map(async (item) => {
//     //     const text = {
//     //         id: "1",
//     //         content: item.content,
//     //     };
//     //     const audioUrl = await generateAudio("na-stories", text); // Chờ Promise hoàn thành
//     //     return {
//     //         id: item.id,
//     //         content: item.content,
//     //         translation: item.translation,
//     //         gapIndexes: item.gapIndexes,
//     //         audioUrl: audioUrl,
//     //     };
//     // }) || []);
//     // await prisma.lesson_cloze.create({
//     //         data: {
//     //         title: event?.title||'',
//     //         lesson: lesson
//     //         }
//     //     });
//     // await prisma.$disconnect()
//     return event;
//   }

// VOCAB
//   const generateVocab=async (title:string)=>{
//     const Story = z.object({
//         title: z.string(),
//         lesson: z.array(z.object({
//         id: z.string(),
//         content: z.string(),
//         translation: z.string(),
//         gapIndexes: z.array(z.number()),
//         })),
//     });

//     const completion = await openai.beta.chat.completions.parse({
//     model: "gpt-4o-2024-08-06",
//     messages: [
//         { role: "system", content: "You are best English teacher for foreigner" },
//         { role: "user", content: "Give an English vocalbulary(two or three word) for language beginers with 10-15 words." },
//         { role: "user", content: "Translate them to Vietnamese" },
//         { role: "user", content: "Give a vocabulary each sentence" },
//         // { role: "user", content: "The title will be two to four words, which are related topics of vocabulary" },
//         { role: "user", content: "The gapIndexes are not allowed to refer to punctuation in a sentence " },
//         { role: "user", content: `The title is ${title} ` },
//         { role: "user", content: "There must be space between words and punctuation marks, not attached" },
//         { role: "user", content: "The gapIndexes have one element" },
//     ],
//     response_format: zodResponseFormat(Story, "event"),
//     });

//     const event = completion.choices[0]?.message.parsed;
    
//     const lesson = await Promise.all(event?.lesson.map(async (item) => {
//         const text = {
//             id: "1",
//             content: item.content,
//         };
//         const audioUrl = await generateAudio("na-stories", text); // Chờ Promise hoàn thành
//         return {
//             id: item.id,
//             content: item.content,
//             translation: item.translation,
//             gapIndexes: item.gapIndexes,
//             audioUrl: audioUrl,
//         };
//     }) || []);
//     await prisma.lesson_cloze.create({
//             data: {
//             title: event?.title||'',
//             lesson: lesson
//             }
//         });
//     await prisma.$disconnect()
//   }

  // // CONVERSATION
const generateConversation = async (topic:string) => {
    const Story = z.object({
        title: z.string(),

        lesson: z.array(z.object({
        id: z.string(),
        person: z.string(),
        content: z.string(),
        translate: z.string(),
        audioUrl:z.string(),
        })),

    });

    const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
        { role: "system", content: "Give an English conversation between man and woman for language leaners level A2 with 10-15 sentences. Translate them to Vietnamese" },
        { role: "user", content: `The title is ${topic} ` },
        { role: "user", content: `the person should be man or woman lowercase  ` },
    ],
    response_format: zodResponseFormat(Story, "event"),
    });

    const event = completion.choices[0]?.message.parsed;
    const title = event?.title || '';
    const lesson = await Promise.all(event?.lesson.map(async (item) => {
        const text = {
            id: "1",
            content: item.content,
        };
        const audioUrl = await generateAudio("na-stories", text); // Chờ Promise hoàn thành
        return {
            id: item.id,
            content: item.content,
            translate: item.translate,
            audioUrl: audioUrl,
            person: item.person,
        };
    }) || []);
    await prisma.lesson_listen_read.create({
        data: {
        title: title,
        lesson: lesson
        }
    });
    await prisma.$disconnect()
}
const generateDictation = async (topic:string) => {
    const Story = z.object({
        title: z.string(),

        lesson: z.array(z.object({
        id: z.string(),
        person: z.string(),
        content: z.string(),
        translate: z.string(),
        audioUrl:z.string(),
        })),

    });

    const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
        { role: "system", content: "Tell me a story, told by someone for language leaners level A2 with 10-15 sentences. Translate them to Vietnamese" },
        { role: "user", content: `The title is ${topic} ` },
    ],
    response_format: zodResponseFormat(Story, "event"),
    });

    const event = completion.choices[0]?.message.parsed;
    const title = event?.title || '';
    const lesson = await Promise.all(event?.lesson.map(async (item) => {
        const text = {
            id: "1",
            content: item.content,
        };
        const audioUrl = await generateAudio("na-stories", text); // Chờ Promise hoàn thành
        return {
            id: item.id,
            content: item.content,
            translate: item.translate,
            audioUrl: audioUrl,
        };
    }) || []);
    await prisma.dictation.create({
        data: {
        title: title,
        lesson: lesson
        }
    });
 
    await prisma.$disconnect()
}
// await prisma.user.deleteMany();
// const user = await prisma.user.findMany();
// console.log(user);
// generateVocab("Tradition Festival")

generateDictation("Mark's Big Game")
// generateStory('snow white')
// generateConversation('Movies and TV Shows')