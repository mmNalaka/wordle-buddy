import { WORDS } from "../data/raw";
import { Word, Letter } from "../types";

export const getPossibleAnswers = (words: Word[]): string[] => {
  let inPosition: Letter[] = [];
  let inUse = new Set<Letter>();
  let unUsed = new Set<Letter>();

  words.forEach((word) => {
    word.forEach((letter, position) => {
      if (letter.inPosition) {
        inPosition.push({ ...letter, position });
      }
      if (!letter.inPosition && letter.inUse) {
        inUse.add({ ...letter, position });
      }
      if (!letter.inPosition && !letter.inUse) {
        unUsed.add(letter);
      }
    });
  });

  const unUsedArr = [...unUsed].filter((letter) =>
    inPosition.every((l) => l.text !== letter.text)
  );

  //  Filtering out words that are not in use
  let possibleAnswers: string[] = [];

  possibleAnswers = WORDS.filter(
    (w) =>
      unUsedArr.every((l) => !w.includes(l.text)) &&
      [...inUse].every((l) => w.includes(l.text)) &&
      inPosition.every((l) => {
        return w.split("").find((l2, i) => {
          return i === l.position && l2 === l.text;
        });
      }) &&
      [...inUse].every((l) => {
        return w.split("").find((wl, i) => {
          return i === l.position && wl !== l.text;
        });
      })
  );

  return possibleAnswers;
};

export const getSuggestions = (words: Word[]): string[] => {
  let suggestions: string[] = [];
  let inUse = new Set<Letter>();
  let unUsed = new Set<Letter>();

  words.forEach((word) => {
    word.forEach((letter) => {
      if (letter.inUse) {
        inUse.add(letter);
      }
      if (!letter.inPosition && !letter.inUse) {
        unUsed.add(letter);
      }
    });
  });

  suggestions = WORDS.filter(
    (w) =>
      [...unUsed].every((l) => !w.includes(l.text)) &&
      [...inUse].every((l) => !w.includes(l.text))
  );

  // Filter out words that has duplicated letters
  return suggestions
    .filter((w) => !w.split("").some((v, i, a) => a.lastIndexOf(v) !== i))
    .slice(0, 30);
};
