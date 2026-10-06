import type { en } from "./en";

// The English dictionary with every string literal widened to `string`. Lists
// stay fixed-length tuples, so a translation with a missing key, a missing FAQ
// entry or an extra list item fails type-checking (and so `next build`).
type Widen<T> = T extends string ? string : { readonly [K in keyof T]: Widen<T[K]> };

export type Dictionary = Widen<typeof en>;
