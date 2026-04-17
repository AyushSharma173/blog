---
title: "A note on tagged unions"
date: 2026-04-10
font: sans
description: "Why I reach for tagged unions more than I used to."
---

A shorter, more direct technical note. This one is set in Inter — sans,
because code and prose sit next to each other more cleanly when the
body face is closer to the monospace.

Tagged unions make illegal states unrepresentable. If a value is either
a `Loading`, a `Ready`, or an `Error`, encode that in the type — don't
spread it across three nullable fields.

```ts
type Request<T> =
  | { status: "loading" }
  | { status: "ready"; data: T }
  | { status: "error"; message: string };

function render<T>(r: Request<T>) {
  switch (r.status) {
    case "loading": return "…";
    case "ready":   return JSON.stringify(r.data);
    case "error":   return `failed: ${r.message}`;
  }
}
```

The compiler narrows `r` inside each branch; you cannot forget a case,
because the exhaustiveness check catches you. Inline `code` gets the
monospace face too.
