'use client'

import { useActionState, useState } from "react"
import { generateStory } from "../../actions/auth";
import HomeHeader from "../../../components/HomePage/HomeHeader";
import React from "react";
import Link from "next/link";

export default function StoryPage(){
    
    const [state, action, pending] = useActionState(generateStory, undefined);
    
    return (
        <div className="flex flex-col items-center justify-center">
            <HomeHeader />
            <div className="mt-10 text-3xl font-bold">Create A Story</div>
            <form action={action} className=" m-5 w-3/4 min-w-96  p-5 rounded-full flex items-center justify-center shadow-md">
                <input
                className="h-10 w-2/3 min-w-64 text-xs md:text-lg border-2 border-black rounded-2xl p-3"
                placeholder="Enter the story's title"
                name="title"
                type="text"
                maxLength={100}
                />
                <button
                type="submit"
                className="bg-blue-500 text-white text-xs md:text-lg font-semibold p-2 rounded-2xl"
                >
                Create
                </button>
            </form>
            
            <div className="w-2/3 "><Link href={"/Advanced/story/history"} className="hover:border-b-2 hover:bg-gray-200 p-3 rounded-lg text-lg mb-5 font-semibold border-b-2 border-gray-300" >History</Link></div>
            {pending ? (
                <div className="w-1/2">
                    <span className="loading loading-dots loading-lg"></span>
                    <div className="flex w-full flex-col gap-4">
                        <div className="skeleton h-32 w-full"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-full"></div>
                        <div className="skeleton h-4 w-32"></div>
                        <div className="skeleton h-4 w-28"></div>
                        <div className="skeleton h-4 w-full"></div>
                    </div>
                </div>
            ) : state ? (
                <div className="w-3/4 min-w-96 p-10 flex flex-col items-center justify-center shadow-lg">
                
                
                    <div className="m-5 flex flex-col items-center justify-center rounded-lg  font-bold text-lg text-center">
                        {state?.message?.title}
                        <img className="w-52 p-5 rounded-lg" src={state.message?.img}/>

                    </div>
                    
                    <div className="m-5 min-w-80  text-gray-700 bg-gray-50 p-5 rounded-lg">
                        {state?.message?.content}
                    </div>
                    <div className="w-full min-w-80 p-3 flex flex-col items-center justify-center">
                        <div className=" w-fit  collapse bg-base-200">
                            <input type="checkbox" />
                            <div className="collapse-title text-center text-md font-medium min-w-80 w-1/2">Show/Hide The Translate</div>
                            <div className="collapse-content">
                                <p>{state.message?.translate}</p>
                            </div>
                        </div>
                    </div>
                    {state.message?.ask?.map((item, index) => (
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
                ) : null}
        </div>

    )
}