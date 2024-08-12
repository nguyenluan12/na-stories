
import HomeHeader from './HomeHeader';
import TextBlock from './TextBlock';
import ListLessonCloze from './ListLessonCloze';
import ListLessonListen from './ListLessonListen';

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

export default function MainBlock({ lessonCloze,lessonListen }:MainComponentProps) {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <HomeHeader/>
      <TextBlock />
      <ListLessonCloze lessonCloze={lessonCloze} />
      <ListLessonListen lessonListen={lessonListen} />
    </main>
  );
};


