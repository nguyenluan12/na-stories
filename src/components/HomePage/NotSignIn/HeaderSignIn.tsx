import Link from "next/link";

import React from "react";
import LogoNaschool from "../LogoNaschool";

export default function HomeHeader(){
    return(
        <div className="w-full h-20 flex flex-row items-center border-b-2 justify-around">
        <LogoNaschool />
        <Link href="/login/loginpage" className="flex items-center w-1/7 h-1/2 scale-105 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-sm text-white font-bold text-lg shadow-lg transition-transform duration-200 hover:shadow-xl hover:scale-110 active:scale-100">
          LOG IN
        </Link>
      </div>
    )
}