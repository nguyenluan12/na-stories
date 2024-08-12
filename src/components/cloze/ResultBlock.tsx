import Link from "next/link";
import { SetStateAction, useState } from "react";
import Result from "./Result";
import ReviewLesson from "./ReviewLessons";
import ActionButton from "./ActionButton";

type Sentence = {
    id: string;
    content: string;
    translation: string;
    gapIndexes: number[];
    audioUrl: string;
  };
export function ResultBlock({
  
    wrongAnswers,
    sentences,
    // isAudioPlaying,setIsAudioPlaying
  }: {
    
    wrongAnswers: Sentence[];
    sentences: Sentence[];
    // isAudioPlaying:boolean;
    // setIsAudioPlaying: React.Dispatch<React.SetStateAction<boolean>>;
  }) {
    const numCorrect = sentences.length - wrongAnswers.length;
    const numWrong = wrongAnswers.length;
    const [isClick, setIsClick] = useState(false);
  
    return (
      <div className="flex flex-col items-center">
        
        <Result numWrong={numWrong} numCorrect={numCorrect}/>
         <ReviewLesson sentences={sentences} isClick={isClick} />
        <ActionButton isClick={isClick} setIsClick={setIsClick} />
      </div>
    );
  }