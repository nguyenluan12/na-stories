'use client'

import { useActionState, useState } from "react"
import { generateStory } from "../../actions/auth";
import HomeHeader from "../../../components/HomePage/HomeHeader";
import React from "react";

export default function StoryPage(){
    const [stateData, setStateData] =useState('normal')
    const [state, action, pending] = useActionState(generateStory, undefined);
    console.log(stateData)
    return (
        <div className="flex flex-col items-center justify-center">
            <HomeHeader />
            <form action={action} className=" m-10 w-3/4 flex items-center justify-center">
                <input
                className="h-10 w-2/3 border-2 border-black rounded-2xl m-5 p-3"
                placeholder="Enter the story's title"
                name="title"
                type="text"
                />
                <button
                type="submit"
                className="bg-blue-500 text-white p-2 rounded-2xl"
                >
                Submit
                </button>
            </form>
            
            {pending ? (
                <span className="loading loading-dots loading-md"></span>
            ) : state ? (
                <div className="w-3/4 p-10 flex flex-col items-center justify-center shadow-lg">
                
                
                    <div className="m-5 text-nowrap font-bold text-lg">
                        {state?.message?.title}

                    </div>
                    {/* <img className="w-52" src={state.message?.img}/> */}
                    <div className="m-5 text-base text-gray-700">
                        {state?.message?.content}
                    </div>
                    <div className="w-full p-5">
                        <div className=" w-fit collapse bg-base-200">
                            <input type="checkbox" />
                            <div className="collapse-title text-md font-medium w-1/2">Show/Hide The Translate</div>
                            <div className="collapse-content">
                                <p>{state.message?.translate}</p>
                            </div>
                        </div>
                    </div>
                    {state.message?.ask?.map((item, index) => (
                        <div key={index} className="mb-4 p-4 border-2 border-gray-300 rounded-xl shadow-md w-2/3">
                            <p>Question {index+1}</p>
                            <div tabIndex={0} className="collapse collapse-arrow border-base-300 bg-base-200 border">
                                <div className="collapse-title text-xl font-medium">{item.question}</div>
                                <div className="collapse-content">
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