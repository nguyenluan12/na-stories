import { WomanSvg } from "../Svgs";

export default function TextBlock(){
    return(
        <div className="min-w-96 flex flex-col items-center text-center p-5">
        <WomanSvg />
        <p className="text-3xl font-bold">Official Naschool Stories</p>
        <p className="mt-5 font-regular text-lg w-2/3">
        Welcome to Na-Stories! Explore engaging stories and lessons to improve your English skills while enjoying the journey of learning.
        </p>
        <p className="mt-5 text-lg font-regular w-1/2">
          If you want to contribute or discuss the stories, meet us on Discord
          or learn more about the project in our FAQ.
        </p>
      </div>
    )
}