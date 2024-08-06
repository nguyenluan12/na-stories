
export default function Result({numWrong,numCorrect}:{
    numWrong:number;
    numCorrect:number
}){
    return(
        <div className="text-center">
            <h1 className="mb-5 font-semibold text-2xl">RESULTS</h1>
            <div className="flex flex-row">
                
            <div className="flex items-center flex-col pr-5 border-r-2 text-red-300">
                <p className="font-bold">Wrong</p>
                <p>{numWrong}</p>
            </div>
            <div className="flex items-center flex-col pl-5 text-blue-300">
                <p className="font-bold">Correct</p>
                <p>{numCorrect}</p>
            </div>
            </div>
        </div>
    )
}