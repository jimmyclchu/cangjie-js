# @jimmyclchu/cangjie

A TypeScript library for Cangjie/Sucheng input method code lookup.

## Installation

```bash
npm install @jimmyclchu/cangjie
```

## Usage

### JavaScript
```javascript
const { Cangjie } = require('@jimmyclchu/cangjie');

const cj = new Cangjie();
console.log(cj.searchCodes('香港')); // ['hda', 'etcu']
```

### TypeScript
```typescript
import { Cangjie, CangjieOptions } from '@jimmyclchu/cangjie';

const cj = new Cangjie({ inputMethod: 'cangjie' });
console.log(cj.searchCodes('同熱愛這片土地')); // ['bmr', 'gif', 'bbpe', 'yymr', 'llml', 'g', 'gpd']
```

## API

### Constructor
```typescript
new Cangjie(options?: CangjieOptions)
```

### Methods

#### `searchCodes(text: string): string[]`
Get Cangjie codes for Chinese characters.
```typescript
cj.searchCodes('難'); // ['toog']
cj.searchCodes('Hello香港World'); // ['hda', 'etcu'] - auto-extracts Chinese
```

#### `searchCharacters(code: string): string[]`
Get characters for a given code.
```typescript
cj.searchCharacters('a'); // ['日', '曰']
```

#### `searchRadicals(text: string): string[]`
Get radical representations grouped by character.
```typescript
cj.searchRadicals('日月'); // ['日', '月']
cj.searchRadicals('你好'); // ['人弓火', '女弓木']
```

#### `containsChinese(text: string): boolean`
Check if text contains any Chinese characters.
```typescript
cj.containsChinese('Hello香港'); // true
```

#### `isAllChinese(text: string): boolean`
Check if text contains only Chinese characters.
```typescript
cj.isAllChinese('香港'); // true
cj.isAllChinese('Hello香港'); // false
```

#### `extractChinese(text: string): string`
Extract only Chinese characters from text.
```typescript
cj.extractChinese('Hello朋友World'); // '朋友'
```

#### `setInputMethod(method: 'cangjie' | 'sucheng'): void`
Switch between Cangjie and Sucheng input methods.
```typescript
cj.setInputMethod('sucheng');
cj.searchCodes('你'); // ['of'] - first + last code only
cj.searchRadicals('你'); // ['人火'] - simplified radicals for sucheng
```

## Input Methods

- **Cangjie**
- **Sucheng**

## License

MIT
