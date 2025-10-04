
import { signOut } from "next-auth/react";

import Link from "next/link";
import { redirect } from "next/navigation";
import Logout from "./Logout";




export default function Menu(){


      return(
        <div
        className={`absolute  min-w-48 right-0 md:left-0 lg:w-fit top-9 text-black border-2 rounded-xl bg-gray-50 transition-transform duration-500 ease-in-out  'opacity-100 translate-y-0' `}>

        
          <ul className="menu text-black bg-gray-100 rounded-box w-56 z-50">
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