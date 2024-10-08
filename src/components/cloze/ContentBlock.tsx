"use Client"
import { SetStateAction, useState } from "react";
import AudioPlayer from "./AudioPlayer";


type Sentence = {
    id: string;
    content: string;
    translation: string;
    gapIndexes: number[];
    audioUrl:string;
  };
export function ContentBlock({
    sentences,
    content,
    gapIndexes,
    inputValue,
    handleInputChange,
    handleCheck,
    handleNextQuest,
    isTrueValue,
    isClick,
    audioUrl,
   
    
  }: {
    sentences: Sentence[];
    content: string;
    gapIndexes: number[];
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    handleCheck: () => void;
    handleNextQuest: () => void;
    isTrueValue: boolean;
    isClick: boolean;
    audioUrl:string;
    
  }) {
    const arr = content.split(" ");
    const[isAudioPlaying,setIsAudioPlaying]=useState(false);
    return (
      <div className="w-full min-w-96 p-10  text-2xl">
        <div className="pt-5 pb-10 mr-5 ">
            <p className="w-fit text-3xl font-semibold border-b-2">Complete the sentence.</p>
          </div>
        <div className="relative min-w-80 flex flex-row items-center justify-center">
        <AudioPlayer src={audioUrl} isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying} />
          {arr.map((item, index) => {
            if (gapIndexes.includes(index)) {
              return (
                <div key={index} className="  flex flex-row flex-wrap items-center justify-center">

                        <input
                            key={index}
                            className="relative min-w-20 w-2/3 text-center border border-blue-500 p-1 rounded-lg shadow-sm focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-500"
                            placeholder="..."
                            value={inputValue || ""}
                            onChange={(e) => handleInputChange(e, item)}
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                if (!isClick) {
                                    handleCheck();}
                                //   } else {
                                //     handleNextQuest();
                                //   }
                                }
                        }}
                        style={{
                            backgroundColor:isClick?(isTrueValue?"#88D66C" : "#FFAAAA"):"white"
                        }}
                        />
                        <div className="absolute top-[-35px] left-30 px-5  rounded-lg bg-purple-400 text-white " 
                            style={
                            {
                                opacity:!isTrueValue&&isClick?"1":"0"
                            }
                        }>
                            {item}
                        </div>
                    
                    
                    
                </div>
              );
            } else {
              return <span key={index} className="m-1">{item}</span>;
            }
          })}
          
        </div>
      </div>
    );
  }
  