import { WomanSvg } from "../Svgs";

export default function TextBlock(){
    return(
        <div className="flex flex-col items-center text-center p-5">
        <WomanSvg />
        <p className="text-3xl font-bold">Official Naschool Stories</p>
        <p className="mt-5 font-regular text-lg w-2/3">
          A community project to bring the original Duolingo Stories to new languages.
          2385 stories in 80 courses and counting!
        </p>
        <p className="mt-5 text-lg font-regular w-1/2">
          If you want to contribute or discuss the stories, meet us on Discord
          or learn more about the project in our FAQ.
        </p>
      </div>
    )
}