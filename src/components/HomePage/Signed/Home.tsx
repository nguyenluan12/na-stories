"use client"
import React, { useEffect } from "react";
import HomePage from "./MainContent";
import { useSession } from "next-auth/react";

import { useRouter } from "next/navigation";
type Lesson = {
  icon: string;
  name: string;
};

type LessonSet = {
  lesson: Lesson[];
};

interface MainComponentProps {
  lessonCloze: LessonSet[];
  lessonListen: LessonSet[];
}

export default function Home({ lessonCloze, lessonListen }: MainComponentProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status !== "authenticated") {
      router.push("/home");
    }
  }, [status, router]);

  useEffect(() => {
    console.log(session);
  }, [session]);

  return (
    <HomePage lessonCloze={lessonCloze} lessonListen={lessonListen} />
  );
}
