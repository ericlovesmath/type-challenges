//
// Implement a type that adds a new field to the interface. The type takes the three arguments. The output should be an object with the new field.
//
// For example
//
// ```ts
// type Test = { id: '1' }
// type Result = AppendToObject<Test, 'value', 4> // expected to be { id: '1', value: 4 }
// ```
//
//

// ============= Code =============

// NOTE: This doesn't work because & is lazy, we need mapped types (eager)
// type AppendToObject<T, U extends PropertyKey, V> = T & { [K in U]: V };

type AppendToObject<T, U extends PropertyKey, V> = {
  [K in keyof T | U]: K extends keyof T ? T[K] : V;
};

// ============= Tests =============

import type { Equal, Expect } from "@type-challenges/utils";

type test1 = {
  key: "cat";
  value: "green";
};

type testExpect1 = {
  key: "cat";
  value: "green";
  home: boolean;
};

type test2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
};

type testExpect2 = {
  key: "dog" | undefined;
  value: "white";
  sun: true;
  home: 1;
};

type test3 = {
  key: "cow";
  value: "yellow";
  sun: false;
};

type testExpect3 = {
  key: "cow";
  value: "yellow";
  sun: false;
  moon: false | undefined;
};

type cases = [
  Expect<Equal<AppendToObject<test1, "home", boolean>, testExpect1>>,
  Expect<Equal<AppendToObject<test2, "home", 1>, testExpect2>>,
  Expect<Equal<AppendToObject<test3, "moon", false | undefined>, testExpect3>>,
];
