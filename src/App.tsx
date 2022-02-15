import clone from "deep-clone";
import { useEffect, useState } from "react";
import "./App.css";

import { WorldList } from "./components/OpeningWords";

import { Word } from "./types";
import { DEFAULT_WORD, OPENING_WORDS } from "./alog/constants";
import { LetterBox } from "./components/LetterBox";
import { getPossibleAnswers } from "./alog/wordle";

function App() {
  const [gameWord, setGameWord] = useState("robin");
  const [guessedWords, setGuessedWords] = useState<Word[]>([]);
  const [currentWord, setCurrentWord] = useState<Word>(clone(DEFAULT_WORD));
  const [activeLetter, setActiveLetter] = useState<number>(0);
  const [activeValue, setActiveValue] = useState("");
  const [answers, setAnswers] = useState<string[]>([]);

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

  // Submit handler
  const handleSubmit = () => {
    const allSet = currentWord.every((letter) => letter.set);

    if (!allSet) {
      alert("You must set all letters before you can submit");
      return;
    }

    if (guessedWords.length < 6) {
      setGuessedWords([...guessedWords, currentWord]);
      setCurrentWord(clone(DEFAULT_WORD));
      setActiveLetter(0);
    }

    const a = getPossibleAnswers([...guessedWords, currentWord]);
    setAnswers(a);
  };

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
                  const newWord = clone(currentWord);
                  newWord[index].text = e.target?.value || "";

                  if (newWord[index].text === "") {
                    setActiveValue("");

                    if (newWord[activeLetter]?.set) {
                      newWord[activeLetter].set = false;
                    }
                    if (newWord[activeLetter]?.inUse) {
                      newWord[activeLetter].set = false;
                    }
                    if (newWord[activeLetter]?.inPosition) {
                      newWord[activeLetter].inPosition = false;
                    }
                  }

                  if (e.target.value !== "") {
                    setActiveLetter(index + 1);
                    setActiveValue(e.target.value.toLowerCase());
                  }
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
                if (!currentWord[activeLetter]?.text) {
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
                if (!currentWord[activeLetter]?.text) {
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
                if (!currentWord[activeLetter]?.text) {
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
              onClick={handleSubmit}
            >
              Submit
            </button>
          </div>

          <div className="overflow-y-auto">
            <WorldList
              words={!guessedWords.length ? (OPENING_WORDS as any) : answers}
              title={
                !guessedWords.length
                  ? "Opening suggestions"
                  : "Possible answers"
              }
            />
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
