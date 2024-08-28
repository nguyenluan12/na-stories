
import { signOut } from "next-auth/react";

import Link from "next/link";
import { redirect } from "next/navigation";
import Logout from "./Logout";




export default function Menu(){
  // const handleLogout = ()=>{
  //   signOut({ callbackUrl: "" });
    
  // }
    // return (
    //     <div
    //  className={`absolute min-w-48 right-0 md:left-0 lg:w-fit top-9 text-black border-2 p-3 rounded-xl bg-gray-50 transition-transform duration-500 ease-in-out  'opacity-100 translate-y-0' `}>
    //       <Link href="/home"
    //           className="cursor-pointer flex items-center w-full h-1/2 px-7 py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm text-nowrap font-bold text-lg transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
    //           >
    //         Home
    //       </Link>
    //       <Link href={`/home#cloze`} 
    //           className="cursor-pointer flex items-center w-full h-1/2 px-7 py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm text-nowrap font-bold text-lg transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"

    //       >
    //         Check & Correct
    //       </Link>
    //       <Link href={`/home#listen`} 
    //           className="cursor-pointer flex items-center w-full h-1/2 px-7 py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm text-nowrap font-bold text-lg transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"

    //       >
    //         Listen & Read
    //       </Link>
    //       <Link href={`/home#dictation`} 
    //           className="cursor-pointer flex items-center w-full h-1/2 px-7 py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm text-nowrap font-bold text-lg transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"

    //       >
    //         Dictation
    //       </Link>
    //       <Link href="/user/profile" 
    //         className="cursor-pointer flex items-center w-full h-1/2 px-7 py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm font-bold text-lg transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
    //       >
    //         Profile
    //       </Link>
    //       {/* <Link href={"/user/setting"}
    //         className="cursor-pointer flex items-center w-full h-1/2 px-7 py-2 my-2 border-2 border-b-4 border-gray-200 rounded-lg bg-gray-50 text-sm font-bold text-lg transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95"
    //       >
    //         Setting
    //       </Link> */}
    //       {/* <div onClick={handleLogout}> */}
    //         <Logout/>
    //       {/* </div> */}
          
    //     </div>
    //   );

      return(
        <div
        className={`absolute min-w-48 right-0 md:left-0 lg:w-fit top-9 text-black border-2 rounded-xl bg-gray-50 transition-transform duration-500 ease-in-out  'opacity-100 translate-y-0' `}>

        
          <ul className="menu text-black bg-gray-100 rounded-box w-56">
            <li><Link href="/home">
              Home
            </Link></li>
            <li>
              <details >
                <summary>Learning</summary>
                <ul>
                  <li><Link href={`/home#cloze`} >
                    Check&Correct
                  </Link></li>
                  <li><Link href={`/home#listen`} >
                    Listen&Read
                  </Link></li>
                  <li><Link href={`/home#dictation`} >
                    Dictation
                  </Link></li>
                  
                </ul>
              </details>
            </li>
            <li>
            <details >
              <summary>Advance</summary>
              <ul>
                <li><Link href={'/Advanced/grammar'}>Grammar Checking</Link></li>
                <li><Link href={'/Advanced/story'}>AI Reading</Link></li>
              </ul>
            </details>
          </li>
          <li><Link href="/user/profile" >
            Profile
          </Link></li>
          <li><Logout/></li>
          </ul>
          
        </div>
      )
    };