import Link from "next/link";

type Lesson = {
   
    icon: string;
    name: string;
    id:string;
  };
  
  type LessonSet = {
    lesson: Lesson[];
  };
  
  interface MainComponentProps {
    lessonCloze: LessonSet[];
    type:string;
  }
  
  export default function MainBlock({ lessonCloze, type }:MainComponentProps) {
   
    return(
        <div id={type} className="min-w-96 w-1/2 flex flex-row justify-center flex-wrap items-center pt-10 pb-10">
        {lessonCloze.map((item, index) => (
          <div key={index} className="w-full flex flex-col items-center">
          <div className="relative mt-3 w-full flex items-center justify-center">
            <div className="absolute top-1/2 z-0 w-full h-[1px] border-[1px] border-red"></div>
            <p className="w-fit bg-white z-10 p-5 relative text-3xl rounded-2xl font-semibold">{type=='cloze'?'Check & Correct':type=='listen'?'Listen & Read':'Dictation'}</p>
          </div>
          <div className="flex flex-row items-center justify-center flex-wrap w-full">
            {item.lesson.map((list, idx) => (
              <Link key={idx} href={`/play/${list.id}/${type =='cloze'?'cloze':type=='listen'?'listen-and-read':'dictation'}`} 
              className="min-w-32 h-48 flex flex-col justify-between items-center cursor-pointer w-1/5 rounded-xl shadow-xl p-6 m-3 hover:bg-gray-50 shadow-sm transition-transform duration-200 hover:shadow-xl hover:scale-105 active:scale-95">
                
                    <img className="h-24 rounded-xl" src={list.icon} alt={list.name}></img>
                    <p className="font-semibold text-center">{list.name}</p>
                  
              
            </Link>
            ))}
          </div>
        </div>
          
        ))}
      </div>
    )
  }