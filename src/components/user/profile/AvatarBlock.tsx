import { ReactNode } from "react";

export default function AvatarBlock({imgSrc}:{imgSrc:string;}){
    console.log(imgSrc)
    return(
        <div className="w-1/2 h-[200px] bg-green-400 rounded-lg flex flex-row items-end justify-center">
            <div className="rounded-full border-4 ">
            <img src={imgSrc}
                    className="w-20 rounded-full"
                    />
            </div>
        </div>
    )
}