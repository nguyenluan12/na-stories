

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
    handleNextQuest,
    isTrueValue,
  }: {
    sentences: Sentence[];
    content: string;
    gapIndexes: number[];
    inputValue: string;
    handleInputChange: (e: React.ChangeEvent<HTMLInputElement>, value: string) => void;
    handleNextQuest: () => void;
    isTrueValue: boolean;
  }) {
    const arr = content.split(" ");
    return (
      <div className="w-full p-5 relative text-2xl">
        <div className="pt-5 pb-10 mr-5 ">
            <p className="text-2xl font-semibold">Điền tiếp vào chỗ trống.</p>
          </div>
        <div className="flex flex-row items-center justify-center">
          
          {arr.map((item, index) => {
            if (gapIndexes.includes(index)) {
              return (
                <input
                  key={index}
                  className="text-center border border-blue-500 p-1 m-1 rounded-lg shadow-sm focus:outline-none focus:border-blue-700 focus:ring-2 focus:ring-blue-500"
                  placeholder="..."
                  value={inputValue || ""}
                  onChange={(e) => handleInputChange(e, item)}
                //   onKeyDown={(e) => e.key === 'Enter' && handleNextQuest()}
                />
              );
            } else {
              return <span key={index} className="m-1">{item}</span>;
            }
          })}
          
        </div>
      </div>
    );
  }
  