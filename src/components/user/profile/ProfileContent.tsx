"use client"
import { useEffect, useState } from "react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import AvatarBlock from "./AvatarBlock";
import Infor from "./Infor";
import axios from "axios";
import ChangeInfor from "./ChangeInfor";


type User = {
  id: string;
  email: string;
  name: string | null;
  password: string | null;
  avatar: string | null;
  createdAt: Date;
  updatedAt: Date;
  phoneNumber: string | null;
  date: string | null;
} | null;

export default function ProfileContent({users, cookie}: {users:User[], cookie:string|undefined }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>(null);
  const [imgSrc, setImgSrc] = useState('https://i.pinimg.com/564x/ed/df/0c/eddf0c8ccc25b638465a8eecbbb5bc1f.jpg');
  const [changeMode, setChangeMode] = useState(false);
  const router = useRouter();
  useEffect(() => {
    if (session === null&&!cookie) {
      redirect("/login/signin");
    }

    if (session) {
     console.log(session)
      setImgSrc(session.user?.image || 'https://i.pinimg.com/564x/ed/df/0c/eddf0c8ccc25b638465a8eecbbb5bc1f.jpg');
      
      users.map((item,idx)=>{
     
        if(item?.email==session.user?.email){
            setUser(item)
        }
      })
    }else if(cookie){
      console.log(users[0])
      setUser(users[0]||null)
      setImgSrc(users[0]?.avatar||'https://i.pinimg.com/564x/ed/df/0c/eddf0c8ccc25b638465a8eecbbb5bc1f.jpg')
    }
  }, [session, status]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-full w-1/3 flex flex-col items-center justify-center bg-white px-5 py-3 border-2 rounded-lg shadow-lg w-full">
        <AvatarBlock imgSrc={imgSrc} />
        {changeMode?<ChangeInfor user={user}/> : <Infor user={user} />}
     
            {changeMode?<button
                className="flex items-center w-1/7 h-[30px] scale-105 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-sm text-white font-bold text-lg shadow-lg transition-transform duration-200 hover:shadow-xl hover:scale-110 active:scale-100"
                onClick={()=>{
                  window.location.reload();
                  setChangeMode(false)
                }}
            >
                Done
            </button>:
            <button
                className="flex items-center w-1/7 h-[30px] scale-105 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-sm text-white font-bold text-lg shadow-lg transition-transform duration-200 hover:shadow-xl hover:scale-110 active:scale-100"
                onClick={()=>setChangeMode(true)}
            >
                Edit
                </button>
                }
      
      </div>
    </div>
  );
}
