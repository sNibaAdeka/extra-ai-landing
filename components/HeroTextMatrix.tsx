type Snippet = { text: string; top: string; left: string; highlight?: boolean };

const snippets: Snippet[] = [
  { text: "npm run build", top: "6%", left: "4%" },
  { text: "TypeError: undefined", top: "14%", left: "78%" },
  { text: "useEffect(() =>", top: "22%", left: "18%" },
  { text: "git diff --stat", top: "9%", left: "58%" },
  { text: "className=", top: "34%", left: "6%" },
  { text: "contrast 4.5:1", top: "40%", left: "82%", highlight: true },
  { text: "op. cit. p. 42", top: "60%", left: "10%" },
  { text: "prompt.md", top: "66%", left: "72%" },
  { text: "flex: 1 1 0", top: "50%", left: "48%" },
  { text: "aria-label=\"\"", top: "18%", left: "40%" },
  { text: "onClick={() =>", top: "78%", left: "20%" },
  { text: "fixed.", top: "72%", left: "88%", highlight: true },
  { text: "z-index: 999", top: "30%", left: "92%" },
  { text: "grounded.", top: "84%", left: "50%", highlight: true },
  { text: "8px scale", top: "88%", left: "8%" },
  { text: "Suspense fallback", top: "8%", left: "28%" },
];

export function HeroTextMatrix() {
  return (
    <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden select-none">
      {snippets.map((s) => (
        <span
          key={s.text}
          className={
            s.highlight
              ? "absolute font-mono text-xs text-signal-ember/40 sm:text-sm"
              : "absolute font-mono text-xs text-cream-light/10 sm:text-sm"
          }
          style={{ top: s.top, left: s.left }}
        >
          {s.text}
        </span>
      ))}
    </div>
  );
}
