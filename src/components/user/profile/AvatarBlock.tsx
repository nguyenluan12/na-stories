import { ReactNode } from "react";

export default function AvatarBlock({imgSrc}:{imgSrc:string;}){
    return(
        <div className="w-1/2 h-[200px] bg-green-400 rounded-lg flex flex-row items-end justify-center">
            <div className="rounded-full border-4 ">
                <img src={imgSrc||"https://i.pinimg.com/564x/ed/df/0c/eddf0c8ccc25b638465a8eecbbb5bc1f.jpg"}
                    className="w-20 rounded-full"
                    />
            </div>
        </div>
    )
}