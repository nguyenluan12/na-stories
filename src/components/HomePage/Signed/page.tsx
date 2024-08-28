"use server"

import React from 'react';
import Home from './Home';
import { NextAuthProvider } from '../../signin/provider';
import {prisma as prisma} from "~/lib/prisma"
import HomePage from './MainContent';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
export async function ListLesson() {
  
  const lessonsListCloze = await prisma.lesson_cloze.findMany({
    orderBy: {
        id: 'asc', 
    },
});

    const lessonsListListen = await prisma.lesson_listen_read.findMany({
  });
  const lessonsDictation = await prisma.dictation.findMany({});
  return {"lessonsListCloze":lessonsListCloze,"lessonsListListen":lessonsListListen,'dictation':lessonsDictation}
}

export default async function Homepage() {
  const cookie = await cookies().get('session')?.value;
  const isCookie= cookie?true:false
  
    const lessonsList = await ListLesson() || []
    const lessonCloze = [{ id:1,    
        lesson:lessonsList.lessonsListCloze.map((item,idx) =>({
            name:item.title,
            icon:item.img||'',
            id:item.id,
        }))
    }]
    
    const lessonListen = [{ id:1,    
    lesson:lessonsList.lessonsListListen.map((item,idx) =>({
      name:item.title,
      icon:item.img||'',
      id:item.id,
    
    }))
    }]
    const lessonDictation = [{ id:1,    
      lesson:lessonsList.dictation.map((item,idx) =>({
        name:item.title,
        icon:item.img||'',
        id:item.id,
      
      }))
      }]
      
  return (
    <NextAuthProvider>
      {/* <Home lessonCloze={lessonCloze} lessonListen={lessonListen} /> */}
      <HomePage isCookie={isCookie} lessonCloze={lessonCloze} lessonListen={lessonListen} lessonDictation={lessonDictation}/>
    </NextAuthProvider>
  );
}
