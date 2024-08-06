import { Prisma, PrismaClient } from "@prisma/client";
import Cloze from "~/components/cloze/Cloze";

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
  
  const num = params.lessonId
  console.log(num)
  const lessons = await prisma.lesson.findMany({
    where: {
      id: '2',
    },
  });
  console.log(lessons)
  const sentences = lessons[0]?.lesson || [];
  
  // console.log(sentences)
  return(
    <Cloze sentences={sentences} />
    // <></>
  )
}