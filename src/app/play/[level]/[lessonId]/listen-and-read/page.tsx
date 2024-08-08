

import { PrismaClient } from "@prisma/client";
import { useState, useRef } from "react";

import ListenAndReadBLock from "~/components/listen-and-read/ListenAndRead";
import "~/styles/globals.css";

type Sentence = {
  id: number;
  person: string;
  content: string;
  translate: string;
};
interface LessonPlayProps {
  params: {
    level:string;
    lessonId: string;
  }
  searchParams: {
    activityId?: string;
  }
}
export default async function ListenAndRead({ params, searchParams }: LessonPlayProps) {
  const prisma = new PrismaClient();
  const lessonsList = await prisma.lesson.findMany({
    where:{
        LessonLevel:params.level,
        id:params.lessonId
        
    }
  }
   
  );
  console.log(lessonsList)
  const sentences = lessonsList[0]?.lesson||[];
  console.log(sentences)
  const title = lessonsList[0]?.title||''
  return (
    <ListenAndReadBLock sentences={sentences} title={title} />
  )
}
