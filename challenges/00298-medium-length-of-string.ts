//
// Compute the length of a string literal, which behaves like `String#length`.
//

// ============= Code =============

type Explode<S extends string> = S extends `${infer L}${infer R}`
  ? [L, ...Explode<R>]
  : [];

type LengthOfString<S extends string> = Explode<S>["length"];

// ============= Tests =============

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<LengthOfString<"">, 0>>,
  Expect<Equal<LengthOfString<"kumiko">, 6>>,
  Expect<Equal<LengthOfString<"reina">, 5>>,
  Expect<Equal<LengthOfString<"Sound! Euphonium">, 16>>,
];
