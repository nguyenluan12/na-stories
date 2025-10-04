"use server"

import { PrismaClient } from "@prisma/client";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { z } from "zod";
import { generateAudio } from "./audio";

const genAI = new GoogleGenerativeAI(process.env.GOOGLE_API_KEY!);
const prisma = new PrismaClient();
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

// VOCAB
export const generateVocab = async (title: string) => {
  const StorySchema = z.object({
    title: z.string(),
    lesson: z.array(z.object({
      id: z.string(),
      content: z.string(),
      translation: z.string(),
      gapIndexes: z.array(z.number()),
    })),
  });

  const prompt = `
    You are an excellent English teacher for foreigners.
    Create a vocabulary lesson for language beginners with 10-15 words.
    The lesson should be a JSON object with the following structure:
    {
      "title": "${title}",
      "lesson": [
        {
          "id": "1",
          "content": "English sentence here.",
          "translation": "Vietnamese translation here.",
          "gapIndexes": [
            0(this is the index of the word to be cloze-tested. )
          ]
        }
      ]
    }
    The title should be two to four words related to the vocabulary.
    Each sentence should have one vocabulary word or phrase that a beginner can learn.
    The "gapIndexes" array should contain the index of the word to be cloze-tested, and it should not be punctuation.Do **NOT** choose index of unimportant words like: articles (a, an, the), pronouns (I, you, he, she, it, we, they), auxiliary verbs (is, am, are, was, were, do, does, did), prepositions (in, on, at, of, to), or other function words.
    The vocabulary is about "${title}".
    Provide only the JSON object in your response, without any additional text or markdown.
  `;

  const event = await parseGeminiResponse(prompt, StorySchema);

  // Note: Gemini doesn't have an equivalent to Dall-E 3 for image generation.
  // You would need to use a separate image generation API or a different approach here.
  // For this example, I'll use a placeholder.
  const image_url = "placeholder_image_url";

  const lesson = await Promise.all(event.lesson.map(async (item) => {
    const text = {
      id: "1",
      content: item.content,
    };
    const audioUrl = await generateAudio("na-stories", text.content);
    return {
      id: item.id,
      content: item.content,
      translation: item.translation,
      gapIndexes: item.gapIndexes,
      audioUrl: audioUrl,
    };
  }));

  await prisma.lesson_cloze.create({
    data: {
      title: event.title,
      lesson: lesson as any, // Prisma doesn't have a direct JSON type so 'any' is used for this example
      img: image_url
    }
  });

  await prisma.$disconnect();
};

// CONVERSATION
export const generateConversation = async (topic: string) => {
  const ConversationSchema = z.object({
    title: z.string(),
    lesson: z.array(z.object({
      id: z.string(),
      person: z.string(),
      content: z.string(),
      translate: z.string(),
      audioUrl: z.string(),
    })),
  });

  const prompt = `
    You are an excellent English teacher for foreigners.
    Create a conversation between a man and a woman for language learners at level A2. The conversation should be 10-15 sentences long.
    The conversation should be a JSON object with the following structure:
    {
      "title": "${topic}",
      "lesson": [
        {
          "id": "1",
          "person": "man",
          "content": "English sentence here.",
          "translate": "Vietnamese translation here.",
          "audioUrl": ""
        }
      ]
    }
    The "person" field should be either "man" or "woman".
    The title of the conversation is about "${topic}".
    Provide only the JSON object in your response, without any additional text or markdown.
  `;

  const event = await parseGeminiResponse(prompt, ConversationSchema);

  const image_url = "placeholder_image_url";

  const lesson = await Promise.all(event.lesson.map(async (item) => {
    const voiceGender = item.person === "man" ? "MALE" : "FEMALE";
    const text = {
      id: "1",
      content: item.content,
    };
    const audioUrl = await generateAudio("na-stories", text.content, voiceGender);
    return {
      id: item.id,
      content: item.content,
      translate: item.translate,
      audioUrl: audioUrl,
      person: item.person,
    };
  }));

  await prisma.lesson_listen_read.create({
    data: {
      title: event.title,
      lesson: lesson as any,
      img: image_url
    }
  });

  await prisma.$disconnect();
};

// DICTATION
export const generateDictation = async (topic: string) => {
  const DictationSchema = z.object({
    title: z.string(),
    lesson: z.array(z.object({
      id: z.string(),
      content: z.string(),
      translate: z.string(),
      audioUrl: z.string(),
    })),
  });

  const prompt = `
    You are an excellent English teacher for foreigners.
    Tell a story for language learners at level A2. The story should be 10-15 sentences long.
    The story should be a JSON object with the following structure:
    {
      "title": "${topic}",
      "lesson": [
        {
          "id": "1",
          "content": "English sentence here.",
          "translate": "Vietnamese translation here.",
          "audioUrl": ""
        }
      ]
    }
    The title of the story is "${topic}".
    Provide only the JSON object in your response, without any additional text or markdown.
  `;

  const event = await parseGeminiResponse(prompt, DictationSchema);

  const lesson = await Promise.all(event.lesson.map(async (item) => {
    
    const text = {
      id: "1",
      content: item.content,
    };
    const audioUrl = await generateAudio("na-stories", text.content);
    return {
      id: item.id,
      content: item.content,
      translate: item.translate,
      audioUrl: audioUrl,
    };
  }));

  await prisma.dictation.create({
    data: {
      title: event.title,
      lesson: lesson as any
    }
  });

  await prisma.$disconnect();
};
const listTopics = [
  "My Family",
  // "My House",
  // "A Day at School",
  // "My Favorite Food",
  // "My Best Friend"
]
for (const topic of listTopics) {
  generateVocab(topic);
  // generateConversation(topic);
  // generateDictation(topic);
}
// generateVocab("Daily Activities");
// generateConversation("The First Date");
// generateDictation("A Day at the School");
// const mySentence = "Hello, world! This is a test of Google's Text-to-Speech API.";
// generateAudio("hello_world_tts.mp3", mySentence)
//   .then((url) => console.log(`Function finished. File URL: ${url}`))
//   .catch((err) => console.error("Function failed:", err));