"use client"
import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import React, { useEffect } from "react";
import MainBlock from "../MainBlock";

import { useSession } from "next-auth/react";
import router from "next/router";
import {prisma as prisma} from "~/lib/prisma"
import { promise } from "zod";
import { redirect, useRouter } from "next/navigation";
import { updateData } from "~/app/actions/update";

type Lesson = {
    icon: string;
    name: string;
    id:string
  };
  
  type LessonSet = {
    lesson: Lesson[];
  };
  
  interface MainComponentProps {
    isCookie: boolean
    lessonCloze: LessonSet[];
    lessonListen: LessonSet[];
    lessonDictation: LessonSet[];
  }

export default function HomePage({isCookie, lessonCloze,lessonListen,lessonDictation}:MainComponentProps) {
    const { data: session, status } = useSession();
  const router = useRouter();
  // if(session){
  //   updateData(session.user?.email||'',session.user?.image||'',session.user?.name||'')
  // }
  useEffect(() => {
    if (session === null&&!isCookie) {
      redirect("/login/signin");
    }
  }, [status, router]);


      
 
  
  return (
    <MainBlock lessonCloze={lessonCloze} lessonListen={lessonListen} lessonDictation={lessonDictation}/>
    // <></>
  );
}
