"use client"
import { useEffect, useState } from "react";
import { SessionProvider, signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
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

export default function ProfileContent({users}: {users:User[] }) {
  const { data: session, status } = useSession();
  const [user, setUser] = useState<User>(null);
  const [imgSrc, setImgSrc] = useState('https://i.pinimg.com/564x/ed/df/0c/eddf0c8ccc25b638465a8eecbbb5bc1f.jpg');
  const [changeMode, setChangeMode] = useState(false);
  useEffect(() => {
    if (session === null) {
      redirect("/");
    }

    if (session) {
      console.log(session)
      setImgSrc(session.user?.image || 'https://i.pinimg.com/564x/ed/df/0c/eddf0c8ccc25b638465a8eecbbb5bc1f.jpg');
      
      users.map((item,idx)=>{
     
        if(item?.email==session.user?.email){
           
            setUser(item)
        }
      })
    }
  }, [session, status]);

  // 
  //   const fetchUser = async () => {
  //     if (email) {

  //       try {
  //           console.log(email)
  //           const response = await axios.get(`/api/user?email=${encodeURIComponent(email)}`);

  //         setUser(response.data);
  //       } catch (error) {
  //         console.error('Error fetching user:', error);
  //       }
  //     }
  //   };

  //   fetchUser();
  // }, [email]);

  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="h-full w-1/3 flex flex-col items-center justify-center bg-white px-5 py-3 border-2 rounded-lg shadow-lg w-full">
        <AvatarBlock imgSrc={imgSrc} />
        {changeMode?<ChangeInfor user={user}/> : <Infor user={user} />}
     
            {changeMode?<button
                className="flex items-center w-1/7 h-[30px] scale-105 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-sm text-white font-bold text-lg shadow-lg transition-transform duration-200 hover:shadow-xl hover:scale-110 active:scale-100"
                onClick={()=>setChangeMode(false)}
            >
                Save
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
