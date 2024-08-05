"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import ClozeHeader2 from "~/components/cloze/Header2";
// Define the Sentence type
type Sentence = {
  id: string;
  content: string;
  translation: string;
  gapIndexes: number[];
};

// Sample sentences
const sentences: Sentence[] = [
  {
    id: "1",
    content: "Hello naschool",
    translation: "Xin chào Naschool",
    gapIndexes: [1],
  },
  {
    id: "2",
    content: "Vietnamese Girl",
    translation: "Cô Gái Việt Nam",
    gapIndexes: [1],
  },
  {
    id: "3",
    content: "British",
    translation: "Người Anh",
    gapIndexes: [0],
  },
  {
    id: "4",
    content: "Database",
    translation: "Cơ sở dữ liệu",
    gapIndexes: [0],
  },
];

// ContentBlock component
function ContentBlock({
  content,
  gapIndexes,
  inputValue,
  handleInputChange,
  handleNextQuest,
  isTrueValue,
}: {
  content: string;
  gapIndexes: number[];
  inputValue: string;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  handleNextQuest: () => void;
  isTrueValue: boolean;
}) {
  const arr = content.split(" ");
  return (
    <div className="w-full p-5 relative text-2xl">
      <div className="pt-5 pb-10 mr-5 ">
          <p className="text-2xl font-semibold">Điền tiếp vào chỗ trống.</p>
        </div>
      <div className="flex flex-row items-center justify-center">
        
        {arr.map((item, index) => {
          if (gapIndexes.includes(index)) {
            return (
              <input
                key={index}
                className="text-center border border-blue-500 p-1 m-1 rounded-lg shadow-sm focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-500"
                placeholder="..."
                value={inputValue || ""}
                onChange={(e) => handleInputChange(e, item)}
                onKeyDown={(e) => e.key === 'Enter' && handleNextQuest()}
              />
            );
          } else {
            return <span key={index} className="m-1">{item}</span>;
          }
        })}
        
      </div>
    </div>
  );
}

// ResultBlock component
function ResultBlock({
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
        <div className="max-h-[500px] overflow-scroll mt-10 border-4 border-blue-200 rounded-lg p-5">
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
      <div className="p-5">
        {isClick ? (
          

          <Link href="/"
             className="px-4 my-2 border-2 border-blue-500 rounded-lg bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95">
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

// Main Component
export default function LessonPlay2() {
  const [idx, setIdx] = useState(0);
  const [quest, setQuest] = useState<Sentence[]>(sentences);
  const [current, setCurrent] = useState<Sentence>(quest[idx]);
  const [total, setTotal] = useState<number>(quest.length);
  const [numPassed, setNumPassed] = useState<number>(0);
  const [isTrueValue, setIsTrueValue] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [wrongAnswers, setWrongAnswer] = useState<Sentence[]>([]);
  const [isClick, setIsClick] = useState(false);

  const handleNextQuest = () => {
    if (!isTrueValue) {
      setQuest((prev) => [...prev, current]);
      setWrongAnswer((prev) => [...prev, current]);
    }
    setIsClick(false)
    setIsTrueValue(false);
    setNumPassed(numPassed + 1);
    setIdx(idx + 1);
  };

  useEffect(() => {
    setTotal(quest.length);
  }, [quest]);

  const handleSetCurrent = () => {
    setCurrent(quest[idx]);
    setIsTrueValue(false);
    setInputValue("");
  };

  useEffect(() => {
    handleSetCurrent();
  }, [idx]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setInputValue(e.target.value);
    if (e.target.value.toLowerCase().trim() === value.toLowerCase()) {
      setIsTrueValue(true);
    } else {
      setIsTrueValue(false);
    }
  };

  return (
    <div className="relative h-full flex flex-col justify-center items-center">
      <div className="w-1/2 p-5">
        <ClozeHeader2 progressValue={numPassed} max={total} />
      </div>
      {idx < quest.length ? (
        <div className="w-1/2 flex flex-col items-center ">
          <ContentBlock
            content={current.content}
            gapIndexes={current.gapIndexes}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleNextQuest={handleNextQuest}
            isTrueValue={isTrueValue}
          />
          <p className="p-5">{current.translation}</p>
          <div className="fixed bottom-0 flex items-center justify-center border-t-2  w-full h-20  "
                style={
                  {
                    backgroundColor: isClick?(isTrueValue?"#88D66C":"#FFAAAA"):"white"
                  
                  }
                }
          >
          <img
          src={
            isTrueValue
              ? "https://cdn-icons-png.flaticon.com/128/5610/5610944.png"
              : "https://cdn-icons-png.flaticon.com/128/16206/16206622.png"
          }
          className="fixed bottom-5 left-1/3 w-10 mr-40"
          style={{
            opacity:isClick?"1":"0"
          }}
          alt="status icon"
        />
          {isClick? <button
              onClick={handleNextQuest}
              className="w-40 h-1/2 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Next
            </button>: <button
              onClick={()=>setIsClick(true)}
              className="w-40 h-1/2 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
            >
              Check
            </button>
        }
          </div>
        </div>
      ) : (
        <ResultBlock wrongAnswers={wrongAnswers} sentences={sentences} />
      )}
    </div>
  );
}
