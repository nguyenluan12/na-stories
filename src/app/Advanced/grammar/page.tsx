'use client'

import { useActionState, useState } from "react"
import { CheckSentences, generateStory } from "../../actions/auth";
import HomeHeader from "~/components/HomePage/HomeHeader";

export default function StoryPage(){
    const [sentences, setSentences] =useState('')
    const [currentSentences, setCurrentSentences]=useState('')
    const [state, action, pending] = useActionState(CheckSentences, undefined);
    
    return (
        <div className="flex flex-col items-center justify-center">
            <HomeHeader/>
            <div className="mt-10 text-3xl font-bold">Checking Grammar</div>
            <form action={action} className=" m-10 w-3/4 flex items-center justify-center">
                <input
                className="h-10 w-2/3 border-2 border-black rounded-2xl m-5 p-3"
                placeholder="Enter your sentences ..."
                name="title"
                type="text"
                onChange={(e)=>(setSentences(e.target.value))}
                />
                <button
                type="submit"
                className="bg-blue-500 text-white p-2 px-5 rounded-2xl"
                onClick={()=>(setCurrentSentences(sentences))}
                >
                Check
                </button>
            </form>
            
            {pending ? (
                <span className="loading loading-dots loading-md"></span>
            ) : state ? (
                <div className="w-3/4 p-10 flex flex-col items-center justify-center shadow-lg">
                
                
                
                    {/* <img className="w-52" src={state.message?.img}/> */}
                    <div className="p-5 mb-20 bg-gray-50 rounded-lg text-base font-bold text-gray-700">
                    {currentSentences}
                    </div>
                    {/* <div className="w-full p-5">
                        <div className=" w-fit collapse bg-base-200">
                            <input type="checkbox" />
                            <div className="collapse-title text-md font-medium w-1/2">Show/Hide The Translate</div>
                            <div className="collapse-content">
                                <p>{state.message?.translate}</p>
                            </div>
                        </div>
                    </div> */}
                    
                    {state.message?.list?.map((item, index) => (
                        !item.check? <div key={index} className="mb-4 p-4 border-2 border-gray-300 bg-red-200 rounded-xl shadow-md w-2/3">
                            <p className="font-bold">Question {index+1}</p>
                            <div className="collapse bg-red-100">
                                <input type="checkbox" />
                                <div className="collapse-title text-md md:text-xl font-medium">{item.sentences}</div>
                                <div className="collapse-content">
                                    <p>{item.answer}</p>
                                    <p>{item.reason}</p>
                                </div>
                            </div>
                        </div>:<div key={index} className="mb-4 p-4 border-2 border-gray-300 bg-green-200 rounded-xl shadow-md w-2/3">
                            <p className="font-bold">Question {index+1}</p>
                            <div className="collapse bg-green-100">
                                <input type="checkbox" />
                                <div className="collapse-title text-md md:text-xl font-medium">{item.sentences}</div>
                                <div className="collapse-content">
                                    <p>{item.answer}</p>
                                    <p>{item.reason}</p>
                                </div>
                            </div>
                        </div>
                    ))}
                    </div>
                ) : null}
        </div>

    )
}