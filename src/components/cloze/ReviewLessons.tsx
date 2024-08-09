import React from 'react';
import AudioPlayer from './AudioPlayer';

type Sentence = {
  id: string;
  content: string;
  translation: string;
  gapIndexes: number[];
  audioUrl:string;
};

interface ReviewLessonProps {
  sentences: Sentence[];
  isClick: boolean;
}

const ReviewLesson: React.FC<ReviewLessonProps> = ({ sentences, isClick }) => {
  return (
    <div
      style={{
        opacity: isClick ? '1' : '0',
        transition: 'opacity 0.5s ease, transform 0.5s ease',
      }}
      className="flex flex-col items-center mt-5 transition-transform duration-1000"
    >
      <p className="font-bold text-2xl">Review Lesson</p>
      <div className="max-h-[450px] overflow-scroll mt-5 border-4 border-blue-200 rounded-lg px-20 py-10">
        {sentences.map((item, index) => (
            <div key={index} className='flex flex-row'>
                <AudioPlayer src={item.audioUrl}/>
                <div
                    
                    className="p-5 border-2 transition-transform duration-300 border-white hover:shadow-xl hover:scale-105 hover:perspective-10 hover:border-blue-100 hover:rounded-lg hover:bg-blue-100"
                > 
                    <p className="text-base font-medium">{item.content}</p>
                    <p className="text-xs pt-2">{item.translation}</p>
                </div>
            </div>
        ))}
      </div>
    </div>
  );
};

export default ReviewLesson;
