//
// Implement the built-in `Omit<T, K>` generic without using it.
//
// Constructs a type by picking all properties from `T` and then removing `K`
//
// For example
//
// ```ts
// interface Todo {
//   title: string
//   description: string
//   completed: boolean
// }
//
// type TodoPreview = MyOmit<Todo, 'description' | 'title'>
//
// const todo: TodoPreview = {
//   completed: false,
// }
// ```
//

// ============= Code =============

// type Exclude<T, U> = T extends U ? never : T;
type MyOmit<T, K> = {
  [P in keyof T as Exclude<P, K>]: T[P];
};

// ============= Tests =============

import type { Equal, Expect } from "@type-challenges/utils";

type cases = [
  Expect<Equal<Expected1, MyOmit<Todo, "description">>>,
  Expect<Equal<Expected2, MyOmit<Todo, "description" | "completed">>>,
  Expect<Equal<Expected3, MyOmit<Todo1, "description" | "completed">>>,
];

interface Todo {
  title: string;
  description: string;
  completed: boolean;
}

interface Todo1 {
  readonly title: string;
  description: string;
  completed: boolean;
}

interface Expected1 {
  title: string;
  completed: boolean;
}

interface Expected2 {
  title: string;
}

interface Expected3 {
  readonly title: string;
}
