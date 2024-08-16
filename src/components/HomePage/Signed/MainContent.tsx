"use client"
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import React, { useEffect } from "react";
import MainBlock from "../MainBlock";

import { useSession } from "next-auth/react";
import router from "next/router";
import {prisma as prisma} from "~/lib/prisma"
import { promise } from "zod";
import { useRouter } from "next/navigation";

type Lesson = {
    icon: string;
    name: string;
  };
  
  type LessonSet = {
    lesson: Lesson[];
  };
  
  interface MainComponentProps {
    lessonCloze: LessonSet[];
    lessonListen: LessonSet[];
  }

export default function HomePage({lessonCloze,lessonListen}:MainComponentProps) {
    const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session === null) {
      router.push("/");
    }
  }, [status, router]);

  useEffect(() => {
    console.log(session);
    console.log(router)

  }, [session]);
      
//   console.log(lessonsList)
  
  return (
    <MainBlock lessonCloze={lessonCloze} lessonListen={lessonListen}/>
    // <></>
  );
}
