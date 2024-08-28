import { SetStateAction, useState } from "react";
import AudioPlayer from "~/components/cloze/AudioPlayer";
import Dictation from "~/components/dictation/Dictation";
import Header from "~/components/Header";
import HomeHeader from "~/components/HomePage/HomeHeader";
import { prisma } from "~/lib/prisma";
// import AudioPlayer from "~/components/listen-and-read/AudioPlayer";

interface LessonPlayProps {
    params: {
      lessonId: string;
    }
    searchParams: {
      activityId?: string;
    }
  }
export default async function DictationPage({ params, searchParams }: LessonPlayProps){
    const data = await prisma.dictation.findFirst({
        where:{ 
            id : params.lessonId
        }
      });
    // console.log(data)
    return(
        <Dictation data={data} />
    )
}