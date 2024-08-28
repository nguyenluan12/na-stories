"use client"

import { redirect, useRouter } from "next/navigation";

import { SetStateAction, useEffect, useRef, useState } from "react";
import AudioPlayer from "~/components/cloze/AudioPlayer";
import Header from "~/components/Header";
import HomeHeader from "~/components/HomePage/HomeHeader";
import { prisma } from "~/lib/prisma";
// import AudioPlayer from "~/components/listen-and-read/AudioPlayer";
type datatype = {
    id:string;
    title:string;
    lesson: [{}];
    img:string;
}

export default function Dictation({data}:datatype){
    const [isAudioPlaying,setIsAudioPlaying]=useState(false)
    const [idx, setIdx]= useState(0);
    const lesson = data.lesson;
    const [isFinish, setIsFinish] = useState(idx==lesson.length-1)
    const [isTrue,setIsTrue] = useState(false)
    const [isChecked,setIsChecked]=useState(false)
    const [item,setItem] = useState(lesson[idx]);
    const [answer,setAnswer]=useState('');
    const [enter, setEnter] = useState(0)
    const audioRef = useRef(null);
    const [currentIdx,setCurrentIdx]=useState(1)
    const router = useRouter();
  useEffect(() => {
    if (isChecked) {
      audioRef.current.play();
    }
  }, [isChecked, isTrue]);
  useEffect(()=>{
    let result=removePunctuation(item.content.toLowerCase())
        let answerUser = removePunctuation(answer.toLowerCase())
        
        setIsTrue(answerUser==result)
  },[isChecked])
    useEffect(()=>{
        setItem(lesson[idx])
       
        setIsFinish(idx==lesson.length-1)
    },[idx])
    const handleSkip=()=>{
        setEnter(0)
        setAnswer('')
        setIdx((prev)=>(prev+1))
        setIsChecked(false)
        setCurrentIdx((prev)=>(prev+1))
    }
    
    const handleCheck=()=>{
        
        setIsChecked(true);
        setEnter(1)
        
    }
    function removePunctuation(str:string) {
        return str.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "").trim();
      }
      
    return(
        <div className="flex flex-col items-center">
            <HomeHeader/>
            
            <div className=" w-full flex flex-col items-center justify-center">
                <div className="w-1/2 flex flex-row gap-16 text-3xl font-sans py-10">
                    <p className="border-b-2 h-fit w-fit text-nowrap">Dictation Test</p>
              
                </div>
                
                <p className="p-10 mb-10 border-2 text-center text-2xl font-bold bg-gray-200 rounded-xl w-fit">{data.title}</p>
                
                {currentIdx<=lesson.length ? <div  className="w-1/2  rounded-lg flex flex-col items-center min-w-80 p-10 shadow-lg ">
                    <div className="w-full">
                        <p className="text-gray-500">{currentIdx}/{lesson.length}</p>
                        </div>
                   <div className="flex flex-row justify-center gap-5 p-3  w-full"> 
                        <AudioPlayer src={item.audioUrl} 
                        isAudioPlaying={isAudioPlaying} 
                        setIsAudioPlaying={setIsAudioPlaying}    />
                        <img className="w-1/2 min-w-48 h-20 rounded-lg border-2" src={isAudioPlaying?`/img/soundwave.gif`:'/img/soundwave-img.png'}/>
                       
                    
                    </div>
                    <div className=" w-2/3 mt-5 flex items-center justify-center">
                        
                    <textarea
                            maxLength={150}
                            className="textarea textarea-bordered min-w-56 border-2 border-gray-300 rounded-xl h-20 w-full"
                            placeholder="Write..."
                            onKeyDown={(e) => {
                                if (e.key === 'Enter') {
                                e.preventDefault(); // Ngăn textarea thêm ký tự xuống dòng
                                if(enter==0){
                                    handleCheck();
                                }else if(enter==1&&isTrue){
                                    handleSkip()
                                }
                                
                                }
                            }}
                            onChange={(e) => {
                                setAnswer(e.target.value);
                                setIsChecked(false);
                                setEnter(0)
                            }}
                            value={answer}
                            />


                    </div>
                    <audio ref={audioRef} src={isTrue?'/audios/correct.mp3':'/audios/incorrect.mp3'} />
                    {isTrue? <div role="alert" className="alert alert-success w-2/3 min-w-56 text-white"style={{opacity:isChecked?1:0}}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6 shrink-0 stroke-current"
                                fill="none"
                                viewBox="0 0 24 24">
                                <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                            <span>{item.content}</span>
                            
                        </div>:
                        <div role="alert" className="alert alert-error text-white w-2/3 min-w-56 "style={{opacity:isChecked?1:0}}>
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="h-6 w-6 shrink-0 stroke-current">
                            <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                        </svg>
                        <span>{item.content}</span>
                    </div>
                    }
                
                                <div className="flex flex-row w-1/3 gap-5  text-center justify-center">
                        <button
                            className=" py-3 px-5 my-2 border-2 border-green-500 rounded-xl bg-green-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                            onClick={handleCheck}
                            >
                            check
                            </button>
                        {(!isAudioPlaying&&isTrue&&isChecked)?<button 
                            className=" py-3 px-5 my-2 border-2 border-blue-500 rounded-xl bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                            onClick={handleSkip}
                        >skip</button>:<button 
                        className="py-3 px-5 my-2 border-2 border-gray-500 rounded-xl bg-gray-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 "
                        
                    >skip</button>}
                    </div>
                    
                    
                </div>
            
            :<div className="w-1/2 rounded-lg flex flex-col items-center min-w-80 p-10 shadow-lg">
                <p className="text-2xl font-semibold text-center  p-4 rounded-xl shadow-lg transform transition-all duration-300 ">
                     Great job! You've worked hard, and it shows. Keep up the excellent work!
                </p>

                <div className="flex flex-row items-center justify-center w-1/3 gap-5 mt-20">
                    <button 
                        className="py-3 px-5 my-2 border-2 border-blue-500 rounded-xl bg-blue-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
                        onClick={()=>(router.push('/home#dictation'))}
                    >Done</button>
                </div>
            </div>
            }
            </div>
            <div className="min-h-48"></div>
        </div>
    )
}