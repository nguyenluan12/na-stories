'use client'
import { Prisma } from "@prisma/client";
import { useEffect, useState } from "react";
import HomeHeader from "../HomePage/HomeHeader";
import Link from "next/link";

type Story = {
    id: string;
    title: string;
    content: string;
    translate: string;
    ask: {
        answer:string,
        question:string,
    }[];
    img: string;
}
export default function ListStory({listStory}:
    {listStory:Story[]}){
    const [story, setStory] = useState<Story>();
    useEffect(()=>{
        setStory(listStory[0])
    },[])
    
    return(
        <div className="flex flex-col items-center justify-center">
            <HomeHeader/>
            <div className="flex flex-row">
                <ul className=" menu bg-base-200 rounded-box">
                    <p className="text-lg mb-5 font-semibold border-b-2 border-gray-300">Stories</p>
                {listStory.map((item,idx)=>(
                    <li key={idx} onClick={()=>(setStory(item))}>
                        <a>{item.title}</a>
                    </li>
                ))}
                <Link href={'/Advanced/story'} className="text-lg mt-5 p-3 rounded-lg font-semibold border-t-2 border-gray-300 hover:bg-gray-200">+ Create new story</Link>
                </ul>
                {story&&(
                    <div className="w-3/4 min-w-96 p-10 flex flex-col items-center justify-center shadow-lg">
                    
                    
                        <div 
                        className="m-5 flex flex-col items-center justify-center rounded-lg  font-bold text-lg text-center">
                            {story.title}
                            

                        </div>
                        
                        <div className="m-5 min-w-80  text-gray-700 bg-gray-50 p-5 rounded-lg">
                            {story.content}
                        </div>
                        <div className="w-full min-w-80 p-3 flex flex-col items-center justify-center">
                            <div className=" w-fit  collapse bg-base-200">
                                <input type="checkbox" />
                                <div className="collapse-title text-center text-md font-medium min-w-80 w-1/2">Show/Hide The Translate</div>
                                <div className="collapse-content">
                                    <p>{story.translate}</p>
                                </div>
                            </div>
                        </div>
                        {story.ask.map((item, index) => (
                            <div key={index} className="mb-4 p-4 border-2 border-gray-300 rounded-xl shadow-md min-w-80 w-2/3">
                                <p>Question {index+1}</p>
                                <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
                                    <div className="collapse-title text-md md:text-xl font-medium">{item.question}</div>
                                    <div className="collapse-content text-xs md:text-sm">
                                        <p>{item.answer}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                        </div>
                    )}
            </div>
        </div>
    )
}