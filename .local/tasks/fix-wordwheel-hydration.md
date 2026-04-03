# Fix WordWheel Hydration Mismatch

## What & Why
The `WordWheel` component calculates SVG line endpoint coordinates using `Math.sin` and `Math.cos`, producing long floating-point numbers (e.g. `257.66695062509393`). When Next.js server-renders these values they get serialized with slightly fewer decimal places (e.g. `257.666950625094`), while the client retains the full precision — causing a React hydration mismatch error on every page load.

## Done looks like
- The hydration error for `WordWheel` no longer appears in the browser console.
- The word wheel renders and animates correctly as before.

## Out of scope
- Changes to animation logic, styling, or word content.
- Fixing any other hydration issues in the project.

## Tasks
1. **Round SVG coordinates to fixed precision** — In the WordWheel component, apply `parseFloat(value.toFixed(4))` (or similar rounding) to all floating-point coordinates (`x`, `y`, `sx`, `sy`) before passing them as SVG prop values. This ensures the server and client always produce the exact same numeric string.

## Relevant files
- `app/components/ui/WordWheel.tsx:103-124`
