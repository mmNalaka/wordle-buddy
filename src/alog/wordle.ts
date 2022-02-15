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
      if (letter.inUse) {
        inUse.add(letter);
      }
      if (!letter.inPosition && !letter.inUse) {
        unUsed.add(letter);
      }
    });
  });

  //  Filtering out words that are not in use
  let possibleAnswers: string[] = [];

  possibleAnswers = WORDS.filter(
    (w) =>
      [...unUsed].every((l) => !w.includes(l.text)) &&
      [...inUse].every((l) => w.includes(l.text)) &&
      inPosition.every((l) => {
        return w.split("").find((l2, i) => {
          return i === l.position && l2 === l.text;
        });
      })
  );

  return possibleAnswers;
};
