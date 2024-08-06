import AudioPlayer from "./AudioPlayer";


type Sentence = {
    id: string;
    content: string;
    translation: string;
    gapIndexes: number[];
  };
export function ContentBlock({
    sentences,
    content,
    gapIndexes,
    inputValue,
    handleInputChange,
    handleCheck,
    handleNextQuest,
    isTrueValue,
    isClick
  }: {
    sentences: Sentence[];
    content: string;
    gapIndexes: number[];
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    handleCheck: () => void;
    handleNextQuest: () => void;
    isTrueValue: boolean;
    isClick: boolean;
  }) {
    const arr = content.split(" ");
    return (
      <div className="w-full p-5 relative text-2xl">
        <div className="pt-5 pb-10 mr-5 ">
            <p className="w-fit text-3xl font-semibold border-b-2">Điền tiếp vào chỗ trống.</p>
          </div>
        <div className="flex flex-row items-center justify-center">
        <AudioPlayer src={"https://dailydictation.com/upload/general-english/1-first-snowfall-2019-03-14-04-19-38/2.mp3"} />
          {arr.map((item, index) => {
            if (gapIndexes.includes(index)) {
              return (
                <div key={index} className="  flex flex-row items-center justify-center">
                    
                    <input
                    key={index}
                    className="relative w-2/3 text-center border border-blue-500 p-1 rounded-lg shadow-sm focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-500"
                    placeholder="..."
                    value={inputValue || ""}
                    onChange={(e) => handleInputChange(e, item)}
                    onKeyDown={(e) => {
                        if (e.key === 'Enter') {
                          if (!isClick) {
                            handleCheck();
                          } else {
                            handleNextQuest();
                          }
                        }
                      }}
                    />
                    <div className="absolute top-20 left-30 px-5  rounded-lg bg-green-500 text-white " 
                        style={
                        {
                            opacity:!isTrueValue&&isClick?"1":"0"
                        }
                    }>
                        {item}
                    </div>
                </div>
              );
            } else {
              return <span key={index} className="m-1">{item}</span>;
            }
          })}
          
        </div>
      </div>
    );
  }
  