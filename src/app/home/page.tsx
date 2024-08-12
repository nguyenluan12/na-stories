import { PrismaClient } from "@prisma/client";
import Link from "next/link";
import React from "react";
import MainBlock from "../../components/HomePage/MainBlock";
import Cloze from "~/components/cloze/Cloze";


const prisma = new PrismaClient();
export default async function HomePage() {
  const lessons_icon = [
    {
      id: 0,
      lesson: [
        {
          name: "Good Morning",
          icon: "https://ardslot.com/s/en.svg",
        },
        {
          name: "A Date",
          icon: "https://ardslot.com/s/ja.svg",
        },
        {
          name: "One Thing",
          icon: "https://ardslot.com/s/vi.svg",
        },
        {
          name: "The Honeymoon",
          icon: "https://ardslot.com/s/uk.svg",
        },
        {
          name: "A Date",
          icon: "https://ardslot.com/s/ja.svg",
        }
        
      ],
    },
    {
      id: 1,
      lesson: [
        {
          name: "Greetings",
          icon: "https://ardslot.com/s/it.svg",
        },
        {
          name: "Travel Tips",
          icon: "https://ardslot.com/s/es.svg",
        },
        {
          name: "Family Ties",
          icon: "https://ardslot.com/s/pt.svg",
        },
        {
          name: "Work and Play",
          icon: "https://ardslot.com/s/ru.svg",
        },
        
      ],
    },
    {
      id: 2,
      lesson: [
        {
          name: "Food and Drink",
          icon: "https://ardslot.com/s/vi.svg",
        },
        {
          name: "Emergency Situations",
          icon: "https://ardslot.com/s/el.svg",
        },
        {
          name: "City Tour",
          icon: "https://ardslot.com/s/ko.svg",
        },
        {
          name: "Business Meeting",
          icon: "https://ardslot.com/s/tr.svg",
        },
        
      ],
    },
  ];
  
  const lessonsListCloze = await prisma.lesson_cloze.findMany({
  });
  const lessonsListListen = await prisma.lesson_listen_read.findMany({
});
//   console.log(lessonsList)
  const lessonCloze = [{ id:1,    
                    lesson:lessonsListCloze.map((item,idx) =>({
                        name:item.title,
                        icon:"https://ardslot.com/s/vi.svg",
                        
                    }))
  }]
  const lessonListen = [{ id:1,    
    lesson:lessonsListListen.map((item,idx) =>({
        name:item.title,
        icon:"https://ardslot.com/s/en.svg",
        
    }))
}]
// const lesson=lessonsList.map((item,idx) =>({
//                             name:item.title,
//                             icon:item.image
//                         }))

  // console.log("lessonlist")
//   console.log(lesson[0]?.lesson)
//   console.log(lessons)
  // const lessons = lessonsList.map((item)=>({id:item.id,lesson:item.lesson}))
  
  return (
    <MainBlock lessonCloze={lessonCloze} lessonListen={lessonListen}/>
    // <></>
  );
}
