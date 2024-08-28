'use client'
import { signOut } from "next-auth/react";
import { redirect } from "next/navigation";

import React from "react";
import { handleLogout } from "~/app/actions/logout";


export default function Logout() {

  return (
  <button 
  //className="cursor-pointer flex items-center w-full h-1/2 px-7 py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm font-bold text-lg transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"

  onClick={()=>{
    handleLogout();
    signOut({ callbackUrl: "" });
    
}}>Logout</button>
);
}
