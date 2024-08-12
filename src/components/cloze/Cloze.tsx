"use client";
import { useEffect, useState, useRef, SetStateAction } from "react";
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
  audioUrl: string;
};

export default function Cloze({ sentences, title }: { sentences: Sentence[], title: string }) {

  const [idx, setIdx] = useState(0);
  const [quest, setQuest] = useState<Sentence[]>(sentences);
  const [current, setCurrent] = useState<Sentence | undefined>(quest[idx]);
  const [total, setTotal] = useState<number>(quest.length);
  const [numPassed, setNumPassed] = useState<number>(0);
  const [isTrueValue, setIsTrueValue] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [wrongAnswers, setWrongAnswer] = useState<Sentence[]>([]);
  const [isClick, setIsClick] = useState(false);
  const [isAdded, setIsAdded] = useState(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const handleNextQuest = () => {
    setIsTrueValue(false);
    setNumPassed(numPassed + 1);
    setIdx(idx + 1);
    setIsAdded(false)
  };

  const handleCheck = () => {
    if (!isTrueValue) {
      if (current && !isAdded) {
        setQuest((prev) => [...prev, current]);
        setWrongAnswer((prev) => {
          if (!prev.includes(current)) {
            return [...prev, current];
          }
          return prev;
        });
        setIsAdded(true)
      }
    }
    setIsClick(true)     
    audioRef.current?.play();
  
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
    setInputValue(e.target.value);
    if (e.target.value.toLowerCase().trim() === value.toLowerCase()) {
      setIsTrueValue(true);
    } else {
      setIsTrueValue(false);
    }
    setIsClick(false)
  };

  return (
    <div className="relative h-full flex flex-col justify-center items-center">
      <div className="w-1/2 p-5">
        <ClozeHeader2 progressValue={numPassed} max={total} />
      </div>
      <p className="text-4xl font-bold border-2 rounded-xl bg-gray-100 px-10 py-5">{title}</p>
      {idx < quest.length && current ? (
        <PlayBlock sentences={sentences}
          current={current}
          inputValue={inputValue}
          isTrueValue={isTrueValue}
          isClick={isClick}
          handleInputChange={handleInputChange}
          handleCheck={handleCheck}
          handleNextQuest={handleNextQuest}
          setIsClick={setIsClick}
          audioUrl={current.audioUrl}
          isAudioPlaying={isAudioPlaying}
          setIsAudioPlaying={setIsAudioPlaying}
           />
      ) : (
        sentences ? <ResultBlock wrongAnswers={wrongAnswers} sentences={sentences} isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying} /> : <></>
      )}
      {/* <audio ref={audioRef} src='/audios/correct.mp3' /> */}
      <audio ref={audioRef} src={isTrueValue?'/audios/correct.mp3':'/audios/incorrect.mp3' }/>
    </div>
  );
}
