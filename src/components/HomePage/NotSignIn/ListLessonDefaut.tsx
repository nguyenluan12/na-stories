import Link from "next/link";

type Lesson = {
   
    icon: string;
    name: string;
    
  };
  
  type LessonSet = {
    lesson: Lesson[];
  };
  
  interface MainComponentProps {
    lessons: LessonSet[];
  }
  
  export default function ListLessonDefaut({ lessons }:MainComponentProps) {
    return(
        <div className="w-1/2 flex flex-row justify-center flex-wrap items-center pt-10 pb-10">
        {lessons.map((item, index) => (
          <div key={index} className="w-full flex flex-col items-center">
            <div className="relative mt-3 w-full flex items-center justify-center">
              <div className="absolute top-1/2 z-0 w-full h-[1px] border-[1px] border-red"></div>
              <p className="w-fit bg-white z-10 p-5 relative text-3xl rounded-2xl font-semibold">Lesson</p>
            </div>
            <div className="flex flex-row flex-wrap w-full">
              {item.lesson.map((list, idx) => (
                <div key={idx} className="flex flex-col justify-between items-center cursor-pointer w-1/5 rounded-xl shadow-xl p-6 m-3 hover:bg-gray-50 shadow-sm transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95">
                  <Link href={`/play/1/cloze`} className="w-full">
                    <img className="w-full" src={list.icon} alt={list.name}></img>
                    <p className="font-semibold text-center">{list.name}</p>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }