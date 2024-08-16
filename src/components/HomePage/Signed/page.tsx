

import React from 'react';
import Home from './Home';
import { NextAuthProvider } from '../../signin/provider';
import {prisma as prisma} from "~/lib/prisma"
import HomePage from './MainContent';
export async function ListLesson() {
    const lessonsListCloze = await prisma.lesson_cloze.findMany({
    });
    const lessonsListListen = await prisma.lesson_listen_read.findMany({
  });
  return {"lessonsListCloze":lessonsListCloze,"lessonsListListen":lessonsListListen}
}

export default async function Homepage() {
    const lessonsList = await ListLesson() || []
    const lessonCloze = [{ id:1,    
        lesson:lessonsList.lessonsListCloze.map((item,idx) =>({
            name:item.title,
            icon:"https://ardslot.com/s/vi.svg",
            
        }))
    }]
    
    const lessonListen = [{ id:1,    
    lesson:lessonsList.lessonsListListen.map((item,idx) =>({
    name:item.title,
    icon:"https://ardslot.com/s/en.svg",
    
    }))
    }]
    
  return (
    <NextAuthProvider>
      {/* <Home lessonCloze={lessonCloze} lessonListen={lessonListen} /> */}
      <HomePage lessonCloze={lessonCloze} lessonListen={lessonListen} />
    </NextAuthProvider>
  );
}
