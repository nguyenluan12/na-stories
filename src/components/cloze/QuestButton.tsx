interface ActionFooterProps {
    isClick: boolean;
    isTrueValue: boolean;
    handleNextQuest: () => void;
    handleCheck: ()=>void;
  }
export default function QuestButton({isClick,isTrueValue,handleNextQuest,handleCheck}:ActionFooterProps){

    return(
        <div className="fixed bottom-0 flex items-center justify-center border-t-2 w-full h-20" style={{ backgroundColor: isClick ? (isTrueValue ? "#88D66C" : "#FFAAAA") : "white" }}>
            <div className="fixed  flex flex-row items-center bottom-5 left-20  mr-40"
                style={{ opacity: isClick ? "1" : "0" }}> 
                <img
                src={isTrueValue ? "https://cdn-icons-png.flaticon.com/128/5610/5610944.png" : "https://cdn-icons-png.flaticon.com/128/16206/16206622.png"}
                className="w-10 mr-5"
                style={{ opacity: isClick ? "1" : "0" }}
                alt="status icon"
                />
                <p className="text-white text-xl font-bold">{isTrueValue?"Correct.":"Wrong! Try again."} </p>
            </div>
            {isClick ? (
              <button
                onClick={handleNextQuest}
                className="w-40 h-1/2 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Next
              </button>
            ) : (
              <button
                onClick={handleCheck}
                className="w-40 h-1/2 px-4 my-2 border-2 border-green-500 rounded-lg bg-green-500 text-white font-semibold text-lg shadow-lg transition-transform duration-300 hover:shadow-xl hover:scale-105 active:scale-95"
              >
                Check
              </button>
            )}
          </div>
    )
}