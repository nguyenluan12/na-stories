
import HomeHeader from './HomeHeader';
import TextBlock from './TextBlock';
import ListLesson from './ListLessonCloze';
import Link from 'next/link';


type Lesson = {
  icon: string;
  name: string;
  id:string;
};

type LessonSet = {
  lesson: Lesson[];
};

interface MainComponentProps {
  lessonCloze: LessonSet[];
  lessonListen: LessonSet[];
  lessonDictation: LessonSet[];
}
const types = ['cloze','listen','dictation']
export default function MainBlock({ lessonCloze,lessonListen, lessonDictation }:MainComponentProps) {
 
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HomeHeader/>
      <TextBlock />
      <ListLesson lessonCloze={lessonCloze} type='cloze'/>
      <ListLesson lessonCloze={lessonListen}type='listen'/>
      <ListLesson lessonCloze={lessonDictation} type='dictation'/>
      <Link href='#homeHeader'
        className='fixed w-5 sm:w-10 bottom-20 right-5 sm:right-20' 
      >
        <img className=' border-10  shadow-lg hover:scale-105 md:none active:scale-95' src='/img/up-arrow.png'/>
      </Link>
    </main>
  );
};


