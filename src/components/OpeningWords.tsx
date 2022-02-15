import React from "react";

import { OPENING_WORDS } from "../alog/constants";

export const OpeningWords = () => {
  return (
    <div className="mt-6">
      <h3 className="text-left text-xl font-mono font-bold text-slate-400 pb-2">
        Opening Words
      </h3>
      <div className="">
        {OPENING_WORDS.map((word, index) => {
          return (
            <span
              key={index}
              className="flex font-mono text-slate-400 uppercase tracking-wider font-bold"
            >
              {word}
            </span>
          );
        })}
      </div>
    </div>
  );
};
