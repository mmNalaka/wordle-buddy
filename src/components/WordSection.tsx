import { LetterBox } from "./LetterBox";
import { DEFAULT_WORD } from "../alog/constants";

interface WordProps {
  word: string | null;
}

const WordBlock = ({ word }: WordProps) => {
  const w = word
    ? word
        .split("")
        .map((l) => ({ text: l, inUse: false, inPosition: false, set: false }))
    : DEFAULT_WORD;

  return (
    <>
      {w.map((letter, index) => (
        <LetterBox
          key={index}
          set={letter.set}
          inUse={letter.inUse}
          inPosition={letter.inPosition}
          defaultValue={letter.text}
          onChange={(e) => {
            console.log(e.target);
          }}
          onFocus={(e) => {
            console.log(letter);
          }}
        />
      ))}
    </>
  );
};

export const WordSection = () => {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-5 gap-2">
        <WordBlock word="robin" />
        <WordBlock word={null} />
        <WordBlock word={null} />
        <WordBlock word={null} />
        <WordBlock word={null} />
        <WordBlock word={null} />
      </div>
      <div className="grid grid-cols-3 gap-2 font-mono font-bold pt-6 mt-6 border-teal-300 border-t">
        <button className="text-sm bg-slate-400 focus:bg-slate-600 hover:bg-slate-500 rounded-md">
          Not used
        </button>
        <button className="text-sm bg-yellow-400 focus:bg-yellow-600 hover:bg-yellow-500 rounded-md">
          In use
        </button>
        <button className="text-sm bg-green-400 focus:bg-green-600 hover:bg-green-500 h-10 rounded-md">
          Position
        </button>

        <button className="col-span-3 text-sm bg-violet-400 focus:bg-violet-600 hover:bg-violet-500 h-10 rounded-md">
          Submit
        </button>
      </div>
    </div>
  );
};
