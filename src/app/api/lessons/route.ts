import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
   
  export const lessonsListCloze = await prisma.lesson_cloze.findMany({
  });
  export const lessonsListListen = await prisma.lesson_listen_read.findMany({
});