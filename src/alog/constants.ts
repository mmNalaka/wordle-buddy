import { Word } from "../types";

export const OPENING_WORDS = [
  "crane",
  "react",
  "adieu",
  "later",
  "sired",
  "tears",
  "alone",
  "arise",
  "about",
  "atone",
  "irate",
  "snare",
  "cream",
  "paint",
  "worse",
  "sauce",
  "anime",
  "prowl",
  "roast",
  "drape",
  "media",
] as const;

export const DEFAULT_WORD: Word = [
  {
    text: "",
    set: false,
    inUse: false,
    inPosition: false,
  },
  {
    text: "",
    set: false,
    inUse: false,
    inPosition: false,
  },
  {
    text: "",
    set: false,
    inUse: false,
    inPosition: false,
  },
  {
    text: "",
    set: false,
    inUse: false,
    inPosition: false,
  },
  {
    text: "",
    set: false,
    inUse: false,
    inPosition: false,
  },
];
