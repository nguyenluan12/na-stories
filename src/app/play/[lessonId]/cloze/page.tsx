import { Prisma, PrismaClient } from "@prisma/client";
import React from "react";
import Cloze from "../../../../components/cloze/Cloze"

interface LessonPlayProps {
  params: {
    level:string;
    lessonId: string;
  }
  searchParams: {
    activityId?: string;
  }
}
const prisma = new PrismaClient();
export default async function LessonPlay({ params, searchParams }: LessonPlayProps) {
  // console.log(params)
  const num = params
 
  const lessonsList = await prisma.lesson_cloze.findMany({
    where:{
        
        id:params.lessonId
        
    }
  }
   
  );

  const sentences = lessonsList[0]?.lesson||[];
  const title = lessonsList[0]?.title||''

  return(
    <Cloze sentences={sentences} title={title}/>
    // <></>
  )
}