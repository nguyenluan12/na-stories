"use client"

import React, { useState, useRef } from "react";
import ClozeHeader2 from "../cloze/Header2"
import Link from "next/link";
import AudioPlayer from "./AudioPlayer";
import { WomanSvg } from "../Svgs";
type Sentence = {
    id: number;
    person: string;
    content: string;
    translate: string;
    audioUrl:string;
  };
// const sentences = [
//     {
//       id: 1,
//       person: "kid",
//       content: "Dad! I need a new video game.",
//       translate: "Bố ơi! Con cần một trò chơi điện tử mới.",
//     },
//     {
//       id: 2,
//       person: "dad",
//       content: "Why do you need a new video game?",
//       translate: "Tại sao con cần một trò chơi điện tử mới?",
//     },
//     {
//       id: 3,
//       person: "kid",
//       content: "Because I've finished all my old ones.",
//       translate: "Vì con đã chơi hết tất cả trò chơi cũ rồi.",
//     },
//     {
//       id: 4,
//       person: "dad",
//       content: "But you just got a new game last week.",
//       translate: "Nhưng tuần trước con vừa mới có một trò chơi mới mà.",
//     },
//     {
//       id: 5,
//       person: "kid",
//       content: "I know, but this one is really cool!",
//       translate: "Con biết, nhưng trò chơi này thực sự rất tuyệt!",
//     },
//     {
//       id: 6,
//       person: "dad",
//       content: "Alright, let's see your grades first.",
//       translate: "Được rồi, hãy để bố xem điểm của con trước.",
//     },
//     {
//       id: 7,
//       person: "kid",
//       content: "I got an A in math!",
//       translate: "Con được điểm A môn toán!",
//     },
//     {
//       id: 8,
//       person: "dad",
//       content: "Good job! We'll talk about the game later.",
//       translate: "Làm tốt lắm! Chúng ta sẽ nói về trò chơi sau.",
//     },
//   ];
export default function ListenAndReadBLock({sentences, title}:{sentences:Sentence[],title:string}){


//   const title = "Can I have it?";
  const [items, setItems] = useState<Sentence[]>([]);
  const [idx, setIdx] = useState(0);
  const itemRefs = useRef<HTMLDivElement[]>([]);
  const [isAudioPlaying, setIsAudioPlaying] =useState(false);


  const handleAddSentence = () => {
    if (idx < sentences.length) {
      const newItem = sentences[idx];
      if (newItem) {
        setItems((prev) => [...prev, newItem]);
        setIdx(idx + 1);
      }
    }
  };

  const scrollToBottom = (index: number) => {
    if (itemRefs.current[index]) {
      itemRefs.current[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex items-center flex-col p-20  w-screen h-screen">
      <div className="w-full flex items-center justify-center min-w-72 fixed  top-0 pb-10 z-50 bg-white">
        <ClozeHeader2 progressValue={items.length} max={sentences.length} />
      </div>
      <div className="w-1/2 min-w-72 text-2xl font-semibold">
        <p className="border-b-2 w-fit">Listen And Repeat</p>
      </div>
      <div className="flex flex-col items-center mb-4 w-fit">
        {/* <img alt="icon lesson" src="/img/icon-lesson.svg" className="mr-4" /> */}
        <img src="/img/listening-ani.gif"/>
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div 
        style={{
          scrollbarWidth: "none", /* Firefox */
          msOverflowStyle: "none", /* IE and Edge */
        }}
        className="w-2/5 min-w-96 px-10 min-h-[700px] p-5 mb-20 rounded-xl shadow-md overflow-scroll">
        {items.map((item, index) => (<div>
            <div
                key={item.id}
                className="relative flex items-center p-5 group"
                ref={(el) => {
                if (el) itemRefs.current[index] = el;
                }}
            >   
                <AudioPlayer src={item.audioUrl} isAudioPlaying={isAudioPlaying} setIsAudioPlaying={setIsAudioPlaying}  />
                <img
                className="w-10 "
                src={item.person === "woman" ? "/img/woman.png" : "/img/icon-man.svg"}
                alt={`${item.person} icon`}
                />
                <p className="p-1 px-5 m-5 border-2 rounded-lg">{item.content}</p>
                <p className="absolute text-xs w-full top-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <em>{item.translate}</em>
                </p>
            </div>
          </div>))}
          <div className="min-h-32"></div>
      </div>
      <div className="h-100">
        <p className="h-[50px] block text-white">.</p>
      </div>
      <div className="fixed bottom-0 flex justify-center border-t-2 rounded-2xl w-full h-15 "
            style={{
                backgroundColor:items.length < sentences.length ?"white":"#88D66C"
            }}
            >
        {items.length < sentences.length ?
        (!isAudioPlaying?<button
          onClick={() => {
            handleAddSentence();
            scrollToBottom(items.length - 1);
          }}
          className="w-40 h-full p-1 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-center text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        >
          Next
        </button>:<div
        // onClick={() => {
        //   handleAddSentence();
        //   scrollToBottom(items.length - 1);
        // }}
        className="w-40 h-full p-1 px-4 my-2 border-2 border-gray-500 rounded-lg bg-gray-500 text-center text-white font-semibold text-lg shadow-lg "
      >
        Next
      </div>)
        :<Link href={"/home#listen"}
            className="w-40 h-full p-1 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-center text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
        >
            Finish
        </Link>}
      </div>
    </div>
  );
}