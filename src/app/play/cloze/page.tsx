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
  const lessons = await prisma.lesson.findMany();
  console.log('lesson')
  console.log(lessons)
  const sentences = await lessons[0]?.lesson || [];
  console.log(sentences)
  return(
    <Cloze sentences={sentences} />
    // <></>
  )
}