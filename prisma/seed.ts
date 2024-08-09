

import { PrismaClient } from "@prisma/client";
import OpenAI from "openai";
import { zodResponseFormat } from "openai/helpers/zod";
import { z } from "zod";
import { generateAudio } from "./audio";




const openai = new OpenAI();
const prisma = new PrismaClient();

// VOCAB
  const generateVocab=async ()=>{
    const Story = z.object({
        title: z.string(),
        lesson: z.array(z.object({
        id: z.string(),
        content: z.string(),
        translation: z.string(),
        gapIndexes: z.array(z.number()),
        })),
    });

    const completion = await openai.beta.chat.completions.parse({
    model: "gpt-4o-2024-08-06",
    messages: [
        { role: "system", content: "You are best English teacher for foreigner" },
        { role: "user", content: "Give an English vocalbulary(two or three word) for language beginer leaners with 10-15 words." },
        { role: "user", content: "Translate them to Vietnamese" },
        { role: "user", content: "Give a vocabulary each sentence" },
        { role: "user", content: "The title will be two to four words, which are related topics of vocabulary" },
        { role: "user", content: "The gapIndexes should have one element" },
    ],
    response_format: zodResponseFormat(Story, "event"),
    });

    const event = completion.choices[0]?.message.parsed;
    
    const lesson = await Promise.all(event?.lesson.map(async (item) => {
        const text = {
            id: "1",
            content: item.content,
        };
        const audioUrl = await generateAudio("na-stories", text); // Chờ Promise hoàn thành
        return {
            id: item.id,
            content: item.content,
            translation: item.translation,
            gapIndexes: item.gapIndexes,
            audioUrl: audioUrl,
        };
    }) || []);
    await prisma.lesson_cloze.create({
            data: {
            title: event?.title||'',
            lesson: lesson
            }
        });
    await prisma.$disconnect()
  }

  // // CONVERSATION
const generateConversation = async () => {
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
        { role: "system", content: "Give an English story for language leaners level A2 with 10-15 sentences. Translate them to Vietnamese" },
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
    await prisma.lesson_listen_read.create({
        data: {
        title: title,
        lesson: lesson
        }
    });
    await prisma.$disconnect()
}

// await prisma.lesson_listen_read.deleteMany();
generateVocab()
// generateConversation()