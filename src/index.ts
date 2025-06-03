import { CangjieOptions, InputMethod, CharacterCodeMap, CodeRadicalMap } from "./types";
import cangjieData from "./data/cangjie.json";
import radicalData from "./data/radicals.json";

export class Cangjie {
  private inputMethod: InputMethod;
  private characterCodeMap: CharacterCodeMap;
  private codeRadicalMap: CodeRadicalMap;
  private codeCharacterMap: Map<string, string[]>;

  constructor(options: CangjieOptions = { inputMethod: "cangjie" }) {
    this.inputMethod = options.inputMethod;

    // TODO: Load data files
    this.characterCodeMap = {}; // Will load from JSON
    this.codeRadicalMap = {};   // Will load from JSON
    this.codeCharacterMap = new Map(); // Will build reverse index

    this.initializeData();
  }

  private initializeData(): void {
    this.loadCharacterCodes();
    this.loadCodeRadicals();
    this.buildReverseIndex();
  }

  private loadCharacterCodes(): void {
    this.characterCodeMap = cangjieData as CharacterCodeMap;
  }

  private loadCodeRadicals(): void {
    this.codeRadicalMap = radicalData as CodeRadicalMap;
  }

  private buildReverseIndex(): void {
    this.codeCharacterMap.clear();

    for (const [character, code] of Object.entries(this.characterCodeMap)) {
      const finalCode = this.inputMethod === "sucheng" ? this.convertToSucheng(code) : code;

      if (!this.codeCharacterMap.has(finalCode)) {
        this.codeCharacterMap.set(finalCode, []);
      }
      this.codeCharacterMap.get(finalCode)!.push(character);
    }
  }

  private convertToSucheng(cangjieCode: string): string {
    if (cangjieCode.length <= 2) {
      return cangjieCode;
    }
    return cangjieCode[0] + cangjieCode[cangjieCode.length - 1];
  }

  private isChineseCharacter(char: string): boolean {
    const code = char.codePointAt(0);
    if (!code) return false;

    return (code >= 0x4E00 && code <= 0x9FFF) ||    // CJK Unified Ideographs
           (code >= 0x3400 && code <= 0x4DBF) ||    // CJK Extension A
           (code >= 0x20000 && code <= 0x2A6DF) ||  // CJK Extension B
           (code >= 0x2A700 && code <= 0x2B73F) ||  // CJK Extension C
           (code >= 0x2B740 && code <= 0x2B81F) ||  // CJK Extension D
           (code >= 0x2B820 && code <= 0x2CEAF);    // CJK Extension E
  }

  // Public API methods
  searchCodes(text: string): string[] {
    const chineseText = this.extractChinese(text);
    const codes: string[] = [];

    for (const char of chineseText) {
      const code = this.characterCodeMap[char];
      if (code) {
        const finalCode = this.inputMethod === "sucheng" ? this.convertToSucheng(code) : code;
        codes.push(finalCode);
      }
    }

    return codes;
  }

  searchCharacters(code: string): string[] {
    return this.codeCharacterMap.get(code) || [];
  }

  searchRadicals(text: string): string[] {
    const chineseText = this.extractChinese(text);
    const radicals: string[] = [];

    for (const char of chineseText) {
      const code = this.characterCodeMap[char];
      if (code) {
        const finalCode = this.inputMethod === "sucheng" ? this.convertToSucheng(code) : code;

        let radicalGroup = "";
        for (const letter of finalCode) {
          const radical = this.codeRadicalMap[letter];
          if (radical) {
            radicalGroup += radical;
          }
        }

        if (radicalGroup) {
          radicals.push(radicalGroup);
        }
      }
    }

    return radicals;
  }

  containsChinese(text: string): boolean {
    return [...text].some(char => this.isChineseCharacter(char));
  }

  isAllChinese(text: string): boolean {
    return text.length > 0 && [...text].every(char => this.isChineseCharacter(char));
  }

  extractChinese(text: string): string {
    return [...text].filter(char => this.isChineseCharacter(char)).join("");
  }

  setInputMethod(method: InputMethod): void {
    this.inputMethod = method;
    this.buildReverseIndex(); // Rebuild index for new input method
  }
}

// Export types for users
export { CangjieOptions, InputMethod } from "./types";
