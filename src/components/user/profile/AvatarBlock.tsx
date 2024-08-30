'use client'
import { ReactNode, useState } from "react";
import { updateImg } from "~/app/actions/update";
import ImgUpload from "~/components/imgUpload/img-upload";

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
export default function AvatarBlock({imgSrc,changeMode, email,setImgUrl}:{
    imgSrc:string,
    changeMode:boolean,
    //  user:User,
    email:string
     setImgUrl:(url: string) => void}){
    const [isUpdate,setIsUpdate] = useState(false)
    console.log('user')
    console.log(email)
    return(
        <div className=" w-1/2 min-w-72 h-[200px] bg-green-400 rounded-lg flex flex-row items-end justify-center">
            <div className="relative rounded-full border-4 z-0 ">
            {!changeMode? <img src={imgSrc}
                        className="w-20 h-20 rounded-full"
                        />
               :
               <div className="relative w-20 h-20 cursor-pointer" onClick={()=>(setIsUpdate(false))}>
                    <ImgUpload email={email} setImgUrl={setImgUrl} setIsUpdate={setIsUpdate}/>
                    <div className="absolute top-3 right-7"><img className="w-5" src="/img/edit.png" alt="edit icon" /></div>
                </div> 
                }    
            {isUpdate&&<div className="absolute bottom-[-15px] right-[-60px] text-xs p-3">
                <img className="w-5" src="/img/check2.png" alt="done" />Done</div>}
            </div>
        </div>
    )
}