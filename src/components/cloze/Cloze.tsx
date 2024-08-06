"use client";
import { SetStateAction, useEffect, useState } from "react";
import Link from 'next/link';
import ClozeHeader2 from "~/components/cloze/Header2";
import { ResultBlock } from "~/components/cloze/ResultBlock";
import { ContentBlock } from "~/components/cloze/ContentBlock";
import QuestButton from "~/components/cloze/QuestButton";
import { PlayBlock } from "./PlayBlock";
// Define the Sentence type
type Sentence = {
  id: string;
  content: string;
  translation: string;
  gapIndexes: number[];
};


export default function Cloze({sentences}:{sentences:Sentence[]}) {
  
  const [idx, setIdx] = useState(0);
  const [quest, setQuest] = useState<Sentence[]>(sentences);
  const [current, setCurrent] = useState<Sentence | undefined>(quest[idx]);
  const [total, setTotal] = useState<number>(quest.length);
  const [numPassed, setNumPassed] = useState<number>(0);
  const [isTrueValue, setIsTrueValue] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [wrongAnswers, setWrongAnswer] = useState<Sentence[]>([]);
  const [isClick, setIsClick] = useState(false);
  const [isAdded, setIsAdded] = useState(false)
  const handleNextQuest = () => {
    // if (!isTrueValue) {
    //   if (current) {
    //     setQuest((prev) => [...prev, current]);
    //     setWrongAnswer((prev) => [...prev, current]);
    //   }
    // }
    // setIsClick(false);
    setIsTrueValue(false);
    setNumPassed(numPassed + 1);
    setIdx(idx + 1);
    setIsAdded(false)
  };
  const handleCheck = () =>{
    if (!isTrueValue) {
        if (current&&!isAdded) {
          setQuest((prev) => [...prev, current]);
          setWrongAnswer((prev) => [...prev, current]);
          setIsAdded(true)
        }
      }
    setIsClick(true)
  }
  useEffect(() => {
    setTotal(quest.length);
  }, [quest]);

  const handleSetCurrent = () => {
    setIsClick(false);
    setCurrent(quest[idx]);
    setIsTrueValue(false);
    setInputValue("");
  };

  useEffect(() => {
    handleSetCurrent();
  }, [idx]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>, value: string) => {
    setIsClick(false)
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
      {idx < quest.length && current ? (
        <PlayBlock sentences={sentences} 
                    current={current} 
                    inputValue={inputValue} 
                    isTrueValue={isTrueValue} 
                    isClick={isClick} 
                    handleInputChange={handleInputChange} 
                    handleCheck={handleCheck} 
                    handleNextQuest={handleNextQuest} 
                    setIsClick={setIsClick} />
      ) : (

        sentences?<ResultBlock wrongAnswers={wrongAnswers} sentences={sentences} />:<></>
        // <div></div>
      )}

    </div>
  );
}
