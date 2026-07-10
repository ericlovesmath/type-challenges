//
// Implement `TrimLeft<T>` which takes an exact string type and returns a new string with the whitespace beginning removed.
//
// For example
//
// ```ts
// type trimmed = TrimLeft<'  Hello World  '> // expected to be 'Hello World  '
// ```
//
//

// ============= Code =============

type WS = " " | "\n" | "\t";
type TrimLeft<S extends string> = S extends `${WS}${infer T}` ? TrimLeft<T> : S;

// ============= Tests =============

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<TrimLeft<"str">, "str">>,
  Expect<Equal<TrimLeft<" str">, "str">>,
  Expect<Equal<TrimLeft<"     str">, "str">>,
  Expect<Equal<TrimLeft<"     str     ">, "str     ">>,
  Expect<Equal<TrimLeft<"   \n\t foo bar ">, "foo bar ">>,
  Expect<Equal<TrimLeft<"">, "">>,
  Expect<Equal<TrimLeft<" \n\t">, "">>,
];
