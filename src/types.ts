export interface Letter {
  text: string;
  set: boolean;
  inUse: boolean;
  inPosition: boolean;
}

export type Word = Letter[];

export type Alphabet =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "j"
  | "i"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

export interface LetterIndex {
  a: Set<string>;
  b: Set<string>;
  c: Set<string>;
  d: Set<string>;
  e: Set<string>;
  f: Set<string>;
  g: Set<string>;
  h: Set<string>;
  i: Set<string>;
  j: Set<string>;
  k: Set<string>;
  l: Set<string>;
  m: Set<string>;
  n: Set<string>;
  o: Set<string>;
  p: Set<string>;
  q: Set<string>;
  r: Set<string>;
  s: Set<string>;
  t: Set<string>;
  u: Set<string>;
  v: Set<string>;
  w: Set<string>;
  x: Set<string>;
  y: Set<string>;
  z: Set<string>;
}

export interface PositionIndex {
  1: LetterIndex;
  2: LetterIndex;
  3: LetterIndex;
  4: LetterIndex;
  5: LetterIndex;
}
