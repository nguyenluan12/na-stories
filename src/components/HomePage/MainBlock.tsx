
import HomeHeader from './HomeHeader';
import TextBlock from './TextBlock';
import ListLesson from './ListLesson';
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
      <HomeHeader/>
      <TextBlock />
      <ListLesson lessons={lessons} />
    </main>
  );
};


