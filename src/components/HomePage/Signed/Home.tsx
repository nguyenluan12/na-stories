"use client"
import React, { useEffect } from "react";
import HomePage from "./MainContent";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
type Lesson = {
  id:string
  icon: string;
  name: string;
};

type LessonSet = {
  lesson: Lesson[];
};

interface MainComponentProps {
  isCookie:boolean;
  lessonCloze: LessonSet[];
  lessonListen: LessonSet[];
  lessonDictation:LessonSet[]
}

export default function Home({isCookie, lessonCloze, lessonListen,lessonDictation }: MainComponentProps) {
  

  return (
    <HomePage lessonCloze={lessonCloze} lessonListen={lessonListen} isCookie={isCookie} lessonDictation={lessonDictation} />
  );
} 
