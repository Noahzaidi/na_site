import { Fragment, type ReactNode } from "react";

type Tags = Record<string, (chunks: string) => ReactNode>;

/**
 * Render dictionary text with inline markup: "See the <link>privacy policy</link>."
 * Tags are paired and not nested; each one maps to a render function. Text
 * stays a plain string in the dictionaries, so it can be passed to client
 * components and checked like any other copy.
 */
export function rich(text: string, tags: Tags): ReactNode {
  const parts: ReactNode[] = [];
  const pattern = /<(\w+)>(.*?)<\/\1>/g;
  let last = 0;
  for (const match of text.matchAll(pattern)) {
    const [whole, tag, chunks] = match;
    const render = tags[tag];
    if (!render) throw new Error(`rich(): no renderer for <${tag}> in "${text}"`);
    parts.push(text.slice(last, match.index));
    parts.push(<Fragment key={match.index}>{render(chunks)}</Fragment>);
    last = match.index + whole.length;
  }
  parts.push(text.slice(last));
  return parts;
}
