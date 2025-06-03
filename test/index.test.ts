import { Cangjie } from "../src/index";

describe("Cangjie", () => {
  let cj: Cangjie;

  beforeEach(() => {
    cj = new Cangjie();
  });

  describe("searchCodes", () => {
    it("should return codes for Chinese characters", () => {
      expect(cj.searchCodes("難")).toEqual(["toog"]);
      expect(cj.searchCodes("同熱愛這片土地")).toEqual([
        "bmr",
        "gif",
        "bbpe",
        "yymr",
        "llml",
        "g",
        "gpd",
      ]);
    });

    it("should extract Chinese from mixed text", () => {
      expect(cj.searchCodes("Hello香港World")).toEqual([
        "hda",
        "etcu",
      ]);
    });

    it("should return empty array for non-Chinese text", () => {
      expect(cj.searchCodes("Hello World")).toEqual([]);
    });

    it("should preserve order and duplicates", () => {
      expect(cj.searchCodes("囉囉攣")).toEqual([
        "rwlg",
        "rwlg",
        "vfq",
      ]);
    });
  });

  describe("searchCharacters", () => {
    it("should return characters for given code", () => {
      expect(cj.searchCharacters("a")).toContain("日");
    });

    it("should return empty array for unknown code", () => {
      expect(cj.searchCharacters("xyz")).toEqual([]);
    });
  });

  describe("searchRadicals", () => {
    it("should return radicals grouped by character", () => {
      expect(cj.searchRadicals("日月")).toEqual([
        "日",
        "月",
      ]);
      expect(cj.searchRadicals("你好")).toEqual([
        "人弓火",
        "女弓木",
      ]);
    });

    it("should handle mixed text", () => {
      expect(cj.searchRadicals("Hello日World")).toEqual([
        "日",
      ]);
    });
  });

  describe("text utilities", () => {
    it("should detect Chinese characters", () => {
      expect(cj.containsChinese("Hello香港")).toBe(true);
      expect(cj.containsChinese("Hello World")).toBe(false);
    });

    it("should check if all Chinese", () => {
      expect(cj.isAllChinese("")).toBe(false);
      expect(cj.isAllChinese("Hello大家好")).toBe(false);
      expect(cj.isAllChinese("")).toBe(false);
    });

    it("should extract Chinese characters", () => {
      expect(cj.extractChinese("Hello朋友World")).toBe("朋友");
      expect(cj.extractChinese("No Chinese")).toBe("");
    });
  });

  describe("Sucheng mode", () => {
    beforeEach(() => {
      cj.setInputMethod("sucheng");
    });

    it("should return first and last codes only", () => {
      expect(cj.searchCodes("你")).toEqual(["of"]); // "onf" -> "of"
    });

    it("should handle short codes unchanged", () => {
      expect(cj.searchCodes("日")).toEqual(["a"]); // "a" -> "a"
    });

    it("should return correct radicals for sucheng", () => {
      expect(cj.searchRadicals("你")).toEqual(["人火"]); // "of" -> "人火"
    });
  });
});
