import { Prisma, PrismaClient } from "@prisma/client";
import { title } from "process";


const prisma = new PrismaClient();
const lesson = [
    {
      id: "1",
      content: "Hello naschool",
      translation: "Xin chào Naschool",
      gapIndexes: [1],
    },
    {
      id: "2",
      content: "Vietnamese Girl",
      translation: "Cô Gái Việt Nam",
      gapIndexes: [1],
    },
    {
      id: "3",
      content: "British",
      translation: "Người Anh",
      gapIndexes: [0],
    },
    {
      id: "4",
      content: "Database",
      translation: "Cơ sở dữ liệu",
      gapIndexes: [0],
    },
  ] as Prisma.JsonArray;
async function main(){
    await prisma.lesson.create({
        data: {
            title:"Default Lesson",
            image: "https://ardslot.com/s/vi.svg",
            lesson: lesson,
        }
    })
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })