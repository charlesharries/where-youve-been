# Validation

Before claiming a change works, run the checks that actually catch regressions in this stack.

## Type check

```
npx svelte-check --tsconfig ./tsconfig.json
```

## Lint + format

```
npm run lint
```

## Production build

```
npx vite build
```

Runs the Vercel adapter; verify that expected worker/asset chunks appear under
`.svelte-kit/output/client/_app/immutable/workers` when touching mapbox or anything
that uses Web Workers.

## Runtime check in a real browser

Type-check and build are not enough — Vite 8 / rolldown can produce chunks that
parse but fail at runtime (e.g. missing worker assets → `Cannot use 'import.meta'
outside a module`). Exercise the built site with Playwright:

```
npx vite preview --port 4181 &
# /tmp/browsercheck.js — uses /opt/node22/lib/node_modules/playwright via /tmp/node_modules symlinks
node /tmp/browsercheck.js
```

The script should navigate with `waitUntil: 'networkidle'` and log both
`pageerror` and `console` events. Env-dependent errors (e.g. "Missing Mapbox
access token") are expected locally; anything else is a real regression.
