import Link from "next/link";
import { useState } from "react";

type Sentence = {
    id: string;
    content: string;
    translation: string;
    gapIndexes: number[];
  };
export function ResultBlock({
  
    wrongAnswers,
    sentences,
  }: {
    
    wrongAnswers: Sentence[];
    sentences: Sentence[];
  }) {
    const numCorrect = sentences.length - wrongAnswers.length;
    const numWrong = wrongAnswers.length;
    const [isClick, setIsClick] = useState(false);
  
    return (
      <div className="flex flex-col items-center">
        <h1 className="mb-5 font-semibold text-2xl">RESULTS</h1>
        <div className="flex flex-row">
          <div className="flex items-center flex-col pr-5 border-r-2 text-red-300">
            <p className="font-bold">Wrong</p>
            <p>{numWrong}</p>
          </div>
          <div className="flex items-center flex-col pl-5 text-blue-300">
            <p className="font-bold">Correct</p>
            <p>{numCorrect}</p>
          </div>
        </div>
        <div
          style={{
            opacity: isClick ? '1' : '0',
            transition: 'opacity 0.5s ease, transform 0.5s ease',
          }}
          className="flex flex-col items-center mt-10 transition-transform duration-1000"
        >
          <p className="font-bold text-2xl">Review Lesson</p>
          <div className="max-h-[500px] overflow-scroll mt-10 border-4 border-blue-200 rounded-lg px-20 py-10">
            {sentences.map((item, index) => (
              <div
                key={index}
                className="p-5 border-2 transition-transform duration-300 border-white hover:shadow-xl hover:scale-105 hover:perspective-10 hover:border-blue-100 hover:rounded-lg hover:bg-blue-100"
              >
                <p className="text-base font-medium">{item.content}</p>
                <p className="text-xs pt-2">{item.translation}</p>
              </div>
            ))}
          </div>
        </div>
        <div className="m-5 w-full border-2 text-center">
          {isClick ? (
            
  
            <Link href="/"
               className="w-1/2 px-4 py-1  border-2 border-blue-500 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
                Finish
             
            </Link>
            
          ) : (
            <button
              onClick={() => setIsClick(true)}
              className="p-0 px-4 my-2 border-2 border-blue-500 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Continue
            </button>
          )}
        </div>
      </div>
    );
  }