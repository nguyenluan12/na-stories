import React from 'react';
import { ContentBlock } from './ContentBlock';
import QuestButton from './QuestButton';

// import { Sentence } from '~/types'; // Đảm bảo import đúng type Sentence

type Sentence = {
    id: string;
    content: string;
    translation: string;
    gapIndexes: number[];
    audioUrl:string;
  };
interface QuestSectionProps {
  sentences: Sentence[];
  current: Sentence | undefined;
  inputValue: string;
  isTrueValue: boolean;
  isClick: boolean;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
  handleCheck: () => void;
  handleNextQuest:() => void;
  setIsClick: React.Dispatch<React.SetStateAction<boolean>>;
  audioUrl:string;
  
  
}

export function PlayBlock({
  sentences,
  current,
  inputValue,
  isTrueValue,
  isClick,
  handleInputChange,
  handleCheck,
  handleNextQuest,
  setIsClick,
  audioUrl,
 
  

}: QuestSectionProps){
  return (
    <div className="w-1/2 flex flex-col items-center">
      {current && (
        <>
          <ContentBlock
            sentences={sentences}
            content={current.content}
            gapIndexes={current.gapIndexes}
            inputValue={inputValue}
            handleInputChange={handleInputChange}
            handleCheck={handleCheck}
            handleNextQuest={handleNextQuest}
            isTrueValue={isTrueValue}
            isClick={isClick}
            audioUrl={audioUrl}
            
            
          />
          <p className="p-5">{current.translation}</p>
          <QuestButton
            isClick={isClick}
            isTrueValue={isTrueValue}
            handleNextQuest={handleNextQuest}
            handleCheck={handleCheck}
          />
        </>
      )}
    </div>
  );
};


