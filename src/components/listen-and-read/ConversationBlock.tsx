// type Sentence = {
//     id: number;
//     person: string;
//     content: string;
//     translate: string;
//     audioUrl:string;
//   };
// export default function ConversationBlock({items,title,itemRefs}:{items:Sentence[],title:string,itemRefs:HTMLDivElement[]}){

//     return(
//         <>
//         <div className="flex flex-col items-center mb-4 w-fit">
//         <img alt="icon lesson" src="/img/icon-lesson.svg" className="mr-4" />
//         <h1 className="text-2xl font-bold">{title}</h1>
//       </div>
//       <div className="w-2/5  p-5 mb-20 rounded-xl">
//         {items.map((item, index) => (
//           <div
//             key={item.id}
//             className="relative flex items-center p-5 group"
//             ref={(el) => {
//               if (el) itemRefs.current[index] = el;
//             }}
//           >
//             <img
//               className="w-10 "
//               src={item.person === "kid" ? "/img/icon-kid.svg" : "/img/icon-man.svg"}
//               alt={`${item.person} icon`}
//             />
//             <p className="p-1 px-5 m-5 border-2 rounded-lg">{item.content}</p>
//             <p className="absolute text-xs w-full top-0 ml-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
//               <em>({item.translate})</em>
//             </p>
//           </div>
//         ))}
//       </div>
//       <div className="h-100">
//         <p className="h-[50px] block text-white">.</p>
//       </div>
//         </>
//     )
// }