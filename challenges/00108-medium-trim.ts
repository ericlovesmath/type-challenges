//
// Implement `Trim<T>` which takes an exact string type and returns a new string with the whitespace from both ends removed.
//
// For example
//
// ```ts
// type trimmed = Trim<'  Hello World  '> // expected to be 'Hello World'
// ```
//
//

// ============= Code =============

type WS = " " | "\n" | "\t";
type TrimL<S extends string> = S extends `${WS}${infer T}` ? TrimL<T> : S;
type TrimR<S extends string> = S extends `${infer T}${WS}` ? TrimR<T> : S;
type Trim<S extends string> = TrimL<TrimR<S>>;

// ============= Tests =============

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Trim<"str">, "str">>,
  Expect<Equal<Trim<" str">, "str">>,
  Expect<Equal<Trim<"     str">, "str">>,
  Expect<Equal<Trim<"str   ">, "str">>,
  Expect<Equal<Trim<"     str     ">, "str">>,
  Expect<Equal<Trim<"   \n\t foo bar \t">, "foo bar">>,
  Expect<Equal<Trim<"">, "">>,
  Expect<Equal<Trim<" \n\t ">, "">>,
];
