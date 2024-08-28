"use client"
import Link from "next/link";
import LogoNaschool from "./LogoNaschool";
import React, { useState } from "react";
import Menu from "./Menu";

export default function HomeHeader(){
    const [isHovered, setIsHovered] = useState(false);
  
    return(
        <div id='homeHeader' className="w-full h-20 flex flex-row items-center border-b-2 justify-around">
        <LogoNaschool />
        <div
      className="relative cursor-pointer flex items-center w-1/7 h-1/2 scale-105 px-4 my-2 border-2 border-gray-100 rounded-lg bg-gray-50 text-sm text-white font-bold text-lg shadow-lg transition-transform duration-200 hover:shadow-xl hover:scale-105"
      // onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      // onClick={()=>setIsHovered((prev)=>!prev)}
    >
      <img onClick={()=>setIsHovered((prev)=>!prev)} onMouseEnter={() => setIsHovered(true)} src="/img/user_icon.png" className="w-7"></img>
     {isHovered?<Menu />:<></>}
    </div>
       
      </div>
    )
}
