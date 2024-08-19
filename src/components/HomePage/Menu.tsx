
import { signOut } from "next-auth/react";

import Link from "next/link";
import { redirect } from "next/navigation";

export default function Menu(){
    return (
        <div className={`absolute left-0 top-10 text-black border-2 p-3 rounded-xl bg-gray-50 transition-transform duration-500 ease-in-out  'opacity-100 translate-y-0' `}>
          <Link href="/home"
            className="cursor-pointer flex items-center justify-center gap-2 w-full h-1/2  py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm font-bold text-lg transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Home
          </Link>
          <Link href="/user/profile" 
            className="cursor-pointer flex items-center w-full h-1/2 px-7 py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm font-bold text-lg transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Profile
          </Link>
          {/* <Link href={"/user/setting"}
            className="cursor-pointer flex items-center w-full h-1/2 px-7 py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm font-bold text-lg transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Setting
          </Link> */}
          <div onClick={() => {
            signOut({ callbackUrl: "" });
            redirect('/')
        }}
            className="cursor-pointer flex items-center w-full h-1/2 px-7 py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm font-bold text-lg text-nowrap transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
          >
            Log out
          </div>
        </div>
      );
    };