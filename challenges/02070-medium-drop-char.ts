//
// Drop a specified char from a string.
//
// For example:
//
// ```ts
// type Butterfly = DropChar<' b u t t e r f l y ! ', ' '> // 'butterfly!'
// ```
//

// ============= Code =============

type DropChar<
  S extends string,
  C extends string,
> = S extends `${infer L}${infer R}`
  ? L extends C
    ? DropChar<R, C>
    : `${L}${DropChar<R, C>}`
  : S;

// ============= Tests =============

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  // @ts-expect-error
  Expect<Equal<DropChar<"butter fly!", "">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", " ">, "butterfly!">>,
  Expect<Equal<DropChar<"butter fly!", "!">, "butter fly">>,
  Expect<Equal<DropChar<"    butter fly!        ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", " ">, "butterfly!">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "b">, "  u t t e r f l y ! ">>,
  Expect<Equal<DropChar<" b u t t e r f l y ! ", "t">, " b u   e r f l y ! ">>,
];
