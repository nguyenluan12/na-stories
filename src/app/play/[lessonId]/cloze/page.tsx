import { Prisma, PrismaClient } from "@prisma/client";
import React from "react";
import Cloze from "../../../../components/cloze/Cloze"
import { number, promise } from "zod";
import { cookies } from "next/headers";
import { decrypt } from "~/lib/session";
import { now } from "next-auth/client/_utils";

interface LessonPlayProps {
  params: {
    lessonId: string;
  }
  searchParams: {
    activityId?: string;
  }
}
const prisma = new PrismaClient();
export default async function LessonPlay({ params, searchParams }: LessonPlayProps) {
  // console.log(params)
  const cookie = await cookies().get('session')?.value;
  const cook = await decrypt(cookie||'')
  console.log(cook)
  const users =cook && await prisma.review.findFirst({
    where:{
      userId:cook.userId||'',
    }
  })
  
  console.log(users)
  // await prisma.review.create({
  //   data:{
  //     userId:cook?.userId||'',
  //     userEmail:'huuluan0511@gmail.com'
  //   }
  // })
  // const lessonReview = users?.lesson?.cloze;
  
  
  // await prisma.review.findFirst({
  //   where:{userId:userId?.aud.}
  // })
  const lessonsList = await prisma.lesson_cloze.findMany({
    where:{ 
        id : params.lessonId
    }
  });

  const sentences = lessonsList[0]?.lesson||[];
  const title = lessonsList[0]?.title||'';
  // if(users){
  //   await prisma.review.update({
  //     where:{
  //       userId: users.userId,
  //     },
  //     data:{
  //       lesson:{
  //         cloze:[lessonReview,{id:params.lessonId, title:title, time:now}]
  //       }
  //     }
  //   })
  // }else {
  //   await prisma.review.create({
  //     data:{
  //       userId:cook?.userId||'',
  //       lesson:{
  //         cloze:[lessonReview,{id:params.lessonId, title:title, time:now}]
  //       }
  //     }
  //   })
  // }
  return(
    <Cloze sentences={sentences} title={title}/>
    // <></>
  )
}