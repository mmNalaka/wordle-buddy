import clone from "deep-clone";
import { useEffect, useState } from "react";
import "./App.css";

import { OpeningWords } from "./components/OpeningWords";

import { Word } from "./types";
import { DEFAULT_WORD } from "./alog/constants";
import { LetterBox } from "./components/LetterBox";

function App() {
  const [gameWord, setGameWord] = useState("robin");
  const [guessedWords, setGuessedWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word>(clone(DEFAULT_WORD));
  const [activeLetter, setActiveLetter] = useState<number>(0);
  const [activeValue, setActiveValue] = useState("");

  useEffect(() => {
    const leister = (e: KeyboardEvent) => {
      if (e.key === "Backspace" && activeValue === "") {
        setActiveLetter(activeLetter - 1);
      }
    };
    document.addEventListener("keydown", leister);
    return () => {
      document.removeEventListener("keydown", leister);
    };
  }, [activeLetter, activeValue]);

  return (
    <div className="App">
      <main className="h-screen bg-slate-900 pt-8 px-4 overflow-auto">
        <section className="max-w-md mx-auto">
          {/* Guessed Words */}
          <div className="">
            {guessedWords.map((word, index) => (
              <div key={index} className="grid grid-cols-5 gap-2 my-2">
                {word.map((letter, index) => (
                  <LetterBox
                    key={index}
                    disabled
                    set={letter.set}
                    inUse={letter.inUse}
                    inPosition={letter.inPosition}
                    value={letter.text}
                  />
                ))}
              </div>
            ))}
          </div>

          {/* Current Word */}
          <div className="grid grid-cols-5 gap-2">
            {currentWord.map((letter, index) => (
              <LetterBox
                key={index}
                autoFocus={index === activeLetter}
                set={letter.set}
                inUse={letter.inUse}
                inPosition={letter.inPosition}
                value={letter.text}
                onChange={(e: any) => {
                  const newWord = currentWord.slice(0);
                  newWord[index].text = e.target.value || "";
                  if (e.target.value) {
                    setActiveLetter(index + 1);
                  }
                  setActiveValue(e.target.value);
                  setCurrentWord(newWord as Word);
                }}
                onFocus={(_) => {
                  setActiveLetter(index);
                }}
              />
            ))}
          </div>

          <div className="grid grid-cols-3 gap-2 font-mono font-bold pt-6 mt-6 border-teal-300 border-t">
            <button
              className="text-sm bg-slate-400 focus:bg-slate-600 hover:bg-slate-500 rounded-md"
              onClick={() => {
                if (!currentWord[activeLetter].text) {
                  return;
                }
                const newWord = [...currentWord];
                newWord[activeLetter].set = true;
                newWord[activeLetter].inUse = false;
                newWord[activeLetter].inPosition = false;
                setActiveLetter(activeLetter + 1);
                setCurrentWord(newWord as Word);
              }}
            >
              Not used
            </button>

            <button
              className="text-sm bg-yellow-400 focus:bg-yellow-600 hover:bg-yellow-500 rounded-md"
              onClick={() => {
                if (!currentWord[activeLetter].text) {
                  return;
                }
                const newWord = [...currentWord];
                newWord[activeLetter].set = true;
                newWord[activeLetter].inUse = true;
                newWord[activeLetter].inPosition = false;
                setActiveLetter(activeLetter + 1);
                setCurrentWord(newWord as Word);
              }}
            >
              In use
            </button>

            <button
              className="text-sm bg-green-400 focus:bg-green-600 hover:bg-green-500 h-10 rounded-md"
              onClick={() => {
                if (!currentWord[activeLetter].text) {
                  return;
                }
                const newWord = [...currentWord];
                newWord[activeLetter].set = true;
                newWord[activeLetter].inPosition = true;
                setActiveLetter(activeLetter + 1);
                setCurrentWord(newWord as Word);
              }}
            >
              Position
            </button>

            <button
              className="col-span-3 text-sm bg-violet-400 focus:bg-violet-600 hover:bg-violet-500 h-10 rounded-md"
              onClick={() => {
                const allSet = currentWord.every((letter) => letter.set);

                if (!allSet) {
                  alert("You must set all letters before you can submit");
                  return;
                }

                setGuessedWords([...guessedWords, currentWord]);
                setCurrentWord(clone(DEFAULT_WORD));
                setActiveLetter(0);
              }}
            >
              Submit
            </button>
          </div>

          <div className="overflow-y-auto">
            {!guessedWords.length && <OpeningWords />}
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
