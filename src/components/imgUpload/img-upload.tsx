"use client";
 
import { useEffect, useState } from "react";
import { updateImg } from "~/app/actions/update";

import { UploadButton } from "~/utils/uploadthing";

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
 export default function ImgUpload({email, setImgUrl,setIsUpdate}: {
  // user:User;
  email:string
  setImgUrl: (url: string) => void;
  setIsUpdate:(url:boolean) =>void}){
    const [img, setImg]=useState('');
    
  return (
    <div className="flex flex-col items-center border-2 justify-between bg-white w-fit rounded-full w-full h-full overflow-hidden">
      <UploadButton
        endpoint="imageUploader"
        onClientUploadComplete={(res) => {
          // Do something with the response
          console.log("Files: ", res[0]?.url);
          
          updateImg(email||'',res[0]?.url||'')
        // setImgUrl(res[0]?.url||'')
            
            setIsUpdate(true)
        }}
        onUploadError={(error: Error) => {
          // Do something with the error.
        //   alert(`ERROR! ${error.message}`);
        console.log(error)
        }}
      />
    </div>
  );
}