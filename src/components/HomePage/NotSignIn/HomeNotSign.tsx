
import HeaderSignIn from './HeaderSignIn';
import TextBlock from '../TextBlock';
import { BoySvg, LockSvg } from '../../Svgs';
import React from 'react';
import ListLessonDefaut from './ListLessonDefaut';
type Lesson = {
  icon: string;
  name: string;
  
};

type LessonSet = {
  lesson: Lesson[];
};

interface MainComponentProps {
  lessons: LessonSet[];
}

export default function MainBlock({ lessons }:MainComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HeaderSignIn />
      <TextBlock />
      <div className='flex flex-row items-center p-5 border-2 bg-green-500 text-xl font-semibold text-white rounded-xl'>
        <LockSvg />
        <p>You need to Log In to see more lessons</p>
    </div>
      <ListLessonDefaut lessons={lessons} />
      
      
    </main>
  );
};


