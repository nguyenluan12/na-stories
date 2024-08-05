"use client";
import { useEffect, useState } from "react";
import Link from 'next/link';
import ClozeHeader2 from "~/components/cloze/Header2";
import { ResultBlock } from "~/components/cloze/ResultBlock";
import { ContentBlock } from "~/components/cloze/ContentBlock";
// Define the Sentence type
type Sentence = {
  id: string;
  content: string;
  translation: string;
  gapIndexes: number[];
};

// Sample sentences
// const sentences: Sentence[] = [
//   {
//     id: "1",
//     content: "Hello naschool",
//     translation: "Xin chào Naschool",
//     gapIndexes: [1],
//   },
//   {
//     id: "2",
//     content: "Vietnamese Girl",
//     translation: "Cô Gái Việt Nam",
//     gapIndexes: [1],
//   },
//   {
//     id: "3",
//     content: "British",
//     translation: "Người Anh",
//     gapIndexes: [0],
//   },
//   {
//     id: "4",
//     content: "Database",
//     translation: "Cơ sở dữ liệu",
//     gapIndexes: [0],
//   },
// ];


async function fetchLessons() {
  
  const response = await fetch('/api/lessons');
  if (!response.ok) {
    throw new Error('Failed to fetch lessons');
  }
  const data = await response.json();
  return data[0]?.lesson || [];
}

// Main Component
export default function LessonPlay2() {
  const [sentences, setSentences] = useState<Sentence[]>([]);
  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchLessons();
        
        setSentences(data)
        
        setQuest(data);
        setTotal(data.length);
        setCurrent(data[0]);
      } catch (error) {
        console.error('Failed to load lessons:', error);
      }
    }
    loadData();
  }, []);
  
  const [idx, setIdx] = useState(0);
  const [quest, setQuest] = useState<Sentence[]>(sentences);
  const [current, setCurrent] = useState<Sentence | undefined>(quest[idx]);
  const [total, setTotal] = useState<number>(quest.length);
  const [numPassed, setNumPassed] = useState<number>(0);
  const [isTrueValue, setIsTrueValue] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [wrongAnswers, setWrongAnswer] = useState<Sentence[]>([]);
  const [isClick, setIsClick] = useState(false);

  const handleNextQuest = () => {
    if (!isTrueValue) {
      if (current) {
        setQuest((prev) => [...prev, current]);
        setWrongAnswer((prev) => [...prev, current]);
      }
    }
    setIsClick(false);
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
    setIsClick(true)
    setInputValue(e.target.value);
    if (e.target.value.toLowerCase().trim() === value.toLowerCase()) {
      setIsTrueValue(true);
    } else {
      setIsTrueValue(false);
    }
  };

  return (
    (sentences&&<div className="relative h-full flex flex-col justify-center items-center">
      <div className="w-1/2 p-5">
        <ClozeHeader2 progressValue={numPassed} max={total} />
      </div>
      {idx < quest.length && current ? (
        <div className="w-1/2 flex flex-col items-center">
          <ContentBlock
            sentences={sentences}
            content={current.content}
            gapIndexes={current.gapIndexes}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleNextQuest={handleNextQuest}
            isTrueValue={isTrueValue}
          />
          <p className="p-5">{current.translation}</p>
          <div className="fixed bottom-0 flex items-center justify-center border-t-2 w-full h-20" style={{ backgroundColor: isClick ? (isTrueValue ? "#88D66C" : "#FFAAAA") : "white" }}>
            <img
              src={isTrueValue ? "https://cdn-icons-png.flaticon.com/128/5610/5610944.png" : "https://cdn-icons-png.flaticon.com/128/16206/16206622.png"}
              className="fixed bottom-5 left-1/3 w-10 mr-40"
              style={{ opacity: isClick ? "1" : "0" }}
              alt="status icon"
            />
            {isClick ? (
              <button
                onClick={handleNextQuest}
                className="w-40 h-1/2 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Next
              </button>
            ) : (
              <button
                onClick={() => setIsClick(true)}
                className="w-40 h-1/2 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Check
              </button>
            )}
          </div>
        </div>
      ) : (
         <ResultBlock wrongAnswers={wrongAnswers} sentences={sentences} />
        // <div></div>
      )}

    </div>)
  );
}
