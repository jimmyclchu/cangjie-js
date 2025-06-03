export interface CangjieOptions {
  inputMethod: "cangjie" | "sucheng";
}

export type InputMethod = "cangjie" | "sucheng";

export interface CharacterCodeMap {
  [character: string]: string;
}

export interface CodeRadicalMap {
  [code: string]: string;
}
