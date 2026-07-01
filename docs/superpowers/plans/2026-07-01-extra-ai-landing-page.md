# Extra AI Landing Page Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a premium, single-page Next.js marketing site for Extra AI, structurally modeled on ludr.dev (section rhythm, `~/section` labeling, numbered steps, hotkey badges) but with Extra AI's own warm ember/cream/terracotta color system and 100% original copy.

**Architecture:** Static Next.js 15 App Router page assembled from nine section components, each self-contained with its own copy and tests. Shared primitives (hotkey badge, scroll-fade wrapper, cn() util, motion tokens) are built first so every section can consume them. No backend, no data fetching — all content is hardcoded per the approved spec.

**Tech Stack:** Next.js 15 (App Router) · TypeScript strict · Tailwind CSS v4 (CSS-first `@theme` tokens) · shadcn/ui (accordion, button, badge) · Framer Motion v12 · Lucide React · Vitest + React Testing Library.

## Global Constraints

- Repo lives at `~/extra-ai-landing`, independent git history from the Extra AI Flutter app repo.
- Design spec of record: `Extra AI` repo's `docs/superpowers/specs/2026-07-01-extra-ai-landing-page-design.md` — copy in this plan is copied verbatim from it; do not paraphrase.
- Color tokens (exact hex, must be wired as Tailwind `@theme` CSS variables, never hardcoded as raw hex inside `.tsx` files):
  `--color-bg-void: #170D12`, `--color-bg-mid: #3D2015`, `--color-bg-warm: #6B3620`, `--color-cream-light: #F5E4CC`, `--color-cream-warm: #E8B98A`, `--color-signal-ember: #FF6B35`, `--color-grid-line: rgba(245,228,204,0.04)`.
- `--color-signal-ember` is used ONLY for primary CTAs, hover/active states, and numbered step digits — never as decoration. Every task that touches ember must satisfy this.
- Fonts: Space Grotesk (display, heavy weight) via `next/font/google`; JetBrains Mono (hotkey badges, monospace captions) via `next/font/google`; General Sans (body) via Fontshare CSS link (not on Google Fonts) — never substitute Inter.
- Icons: Lucide React only. No emoji. No lightning-bolt/sparkle/generic-AI-startup iconography.
- Gradient direction is always dark-top-left → warm-bottom-right, every section, never inverted.
- Cards/buttons use slightly clipped corners (not uniform `border-radius`) — implemented via the `.clip-corner` utility defined in Task 2.
- Accessibility floor (from user's global CLAUDE.md pre-delivery checklist): contrast ≥ 4.5:1, touch targets ≥ 44px, focus states on every interactive element, alt text on all images, no horizontal scroll at 375px, `prefers-reduced-motion` respected on every animation.
- Animation floor: only `transform`/`opacity` animate; enter 200–300ms ease-out; exit ≤ 60–70% of enter duration; no bounce/elastic easing on scroll-triggered fades.
- Every visual task (Tasks 5–13) must apply the `frontend-design` skill's anti-cliché guidance and the `ui-ux-pro-max` skill during implementation — this is a process requirement, not optional polish.
- Copy is exact and final — do not invent, shorten, or "improve" any headline, subheadline, button label, or caption text given in each task.

---

### Task 1: Project scaffold + test tooling

**Files:**
- Create: `~/extra-ai-landing/` (entire Next.js project via `create-next-app`)
- Create: `vitest.config.ts`
- Create: `vitest.setup.ts`
- Create: `tests/smoke.test.tsx`
- Modify: `package.json` (add `test` script, test deps)

**Interfaces:**
- Produces: a buildable Next.js 15 + TS + Tailwind v4 project at `~/extra-ai-landing`, with `npm run build`, `npm run lint`, and `npm test` all working. Every later task assumes this exists.

- [ ] **Step 1: Scaffold the Next.js app**

`~/extra-ai-landing` already exists and is already a git repo (it contains
`docs/superpowers/plans/` and `docs/superpowers/specs/` — the plan and spec
docs for this project — plus an initialized `.git`). Scaffold into it in
place rather than creating a new directory:

```bash
cd ~/extra-ai-landing
npx create-next-app@latest . \
  --typescript --eslint --tailwind --app --no-src-dir \
  --import-alias "@/*" --use-npm
```

Answer any interactive prompts with defaults (Turbopack: No if asked, to
keep tooling simple). If prompted about existing files, confirm — the only
existing content is the unrelated `docs/` folder, which create-next-app
will not touch.

- [ ] **Step 2: Install runtime and dev dependencies**

```bash
npm install framer-motion lucide-react clsx tailwind-merge
npm install -D vitest @vitejs/plugin-react jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event @types/node
```

- [ ] **Step 3: Init shadcn/ui and add primitives**

```bash
npx shadcn@latest init -d
npx shadcn@latest add accordion button badge
```

Expected: `components/ui/accordion.tsx`, `components/ui/button.tsx`, `components/ui/badge.tsx` created.

- [ ] **Step 4: Configure Vitest**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: { "@": path.resolve(__dirname, "./") },
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

Add to `package.json` `"scripts"`:

```json
"test": "vitest run"
```

- [ ] **Step 5: Write and run the smoke test**

Create `tests/smoke.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";

describe("tooling smoke test", () => {
  it("runs a basic assertion", () => {
    expect(1 + 1).toBe(2);
  });
});
```

Run: `npm test`
Expected: 1 passed test.

- [ ] **Step 6: Verify production build**

Run: `npm run build`
Expected: build succeeds with the default Next.js starter page (no errors).

- [ ] **Step 7: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js 15 app with shadcn/ui and Vitest"
```

---

### Task 2: Design tokens, Tailwind theme, and shared utility classes

**Files:**
- Modify: `app/globals.css`

**Interfaces:**
- Produces: Tailwind color utilities `bg-bg-void`, `bg-bg-mid`, `bg-bg-warm`, `text-cream-light`, `text-cream-warm`, `text-signal-ember`, `bg-signal-ember`, `border-grid-line`, plus utility classes `.bg-grid-texture`, `.gradient-warm`, `.clip-corner`. Every later component task consumes these instead of raw hex.

- [ ] **Step 1: Replace `app/globals.css` theme block**

Open `app/globals.css` and replace its `@theme`/root variable section (keep the `@import "tailwindcss";` line and any shadcn-generated `--radius`/`--background` vars used by `components/ui/*`, just add to them) with:

```css
@import "tailwindcss";

@theme {
  --color-bg-void: #170D12;
  --color-bg-mid: #3D2015;
  --color-bg-warm: #6B3620;
  --color-cream-light: #F5E4CC;
  --color-cream-warm: #E8B98A;
  --color-signal-ember: #FF6B35;
  --color-grid-line: rgba(245, 228, 204, 0.04);

  --font-display: var(--font-space-grotesk);
  --font-body: var(--font-general-sans);
  --font-mono: var(--font-jetbrains-mono);
}

body {
  background-color: var(--color-bg-void);
  color: var(--color-cream-light);
  font-family: var(--font-body), sans-serif;
}

.bg-grid-texture {
  background-image:
    linear-gradient(to right, var(--color-grid-line) 1px, transparent 1px),
    linear-gradient(to bottom, var(--color-grid-line) 1px, transparent 1px);
  background-size: 48px 48px;
}

.gradient-warm {
  background: linear-gradient(
    135deg,
    var(--color-bg-void) 0%,
    var(--color-bg-mid) 55%,
    var(--color-bg-warm) 100%
  );
}

.clip-corner {
  clip-path: polygon(
    12px 0%, 100% 0%, 100% calc(100% - 12px), calc(100% - 12px) 100%, 0% 100%, 0% 12px
  );
}

@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

- [ ] **Step 2: Write a test that guards the token contract**

Create `tests/tokens.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { readFileSync } from "fs";
import path from "path";

describe("design tokens", () => {
  const css = readFileSync(path.resolve(__dirname, "../app/globals.css"), "utf-8");

  it("defines every required color token with the exact spec value", () => {
    expect(css).toContain("--color-bg-void: #170D12");
    expect(css).toContain("--color-bg-mid: #3D2015");
    expect(css).toContain("--color-bg-warm: #6B3620");
    expect(css).toContain("--color-cream-light: #F5E4CC");
    expect(css).toContain("--color-cream-warm: #E8B98A");
    expect(css).toContain("--color-signal-ember: #FF6B35");
  });

  it("defines the grid texture, gradient, and clipped-corner utilities", () => {
    expect(css).toContain(".bg-grid-texture");
    expect(css).toContain(".gradient-warm");
    expect(css).toContain(".clip-corner");
  });

  it("respects prefers-reduced-motion", () => {
    expect(css).toContain("prefers-reduced-motion: reduce");
  });
});
```

Run: `npm test`
Expected: all `tokens.test.ts` assertions pass.

- [ ] **Step 3: Verify build still passes**

Run: `npm run build`
Expected: succeeds, no Tailwind theme errors.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: wire warm design token system into Tailwind v4 theme"
```

---

### Task 3: Fonts and root layout shell

**Files:**
- Modify: `app/layout.tsx`

**Interfaces:**
- Consumes: `--font-display`, `--font-body`, `--font-mono` CSS variables from Task 2.
- Produces: root `<html>`/`<body>` with all three font variables bound and metadata set. Every component task assumes `font-display`, `font-body`, `font-mono` Tailwind utilities (from `font-family` theme keys) resolve correctly.

- [ ] **Step 1: Replace `app/layout.tsx`**

```tsx
import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["500", "700"],
  variable: "--font-space-grotesk",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-jetbrains-mono",
});

export const metadata: Metadata = {
  title: "Extra AI — stop guessing what to fix next",
  description:
    "Extra AI looks at your site and your code at the same time — then writes the exact prompt your next fix needs. Works with Cursor, Windsurf, Claude Code, or whatever you're using today.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${jetbrainsMono.variable}`}>
      <head>
        <link
          href="https://api.fontshare.com/v2/css?f[]=general-sans@400,500,600,700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-body antialiased">{children}</body>
    </html>
  );
}
```

- [ ] **Step 2: Bind the General Sans variable in globals.css**

In `app/globals.css`, inside the `body` selector added in Task 2, the `font-family: var(--font-body)` already points at `--font-body: var(--font-general-sans)`. Add the raw variable binding right above the `body` rule:

```css
:root {
  --font-general-sans: "General Sans", sans-serif;
}
```

- [ ] **Step 3: Write a layout test**

Create `tests/layout.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render } from "@testing-library/react";
import RootLayout, { metadata } from "@/app/layout";

describe("RootLayout", () => {
  it("sets the exact page title from the spec", () => {
    expect(metadata.title).toBe("Extra AI — stop guessing what to fix next");
  });

  it("renders children inside a body with font-body class", () => {
    const { container } = render(
      <RootLayout>
        <div data-testid="child">content</div>
      </RootLayout>
    );
    const body = container.querySelector("body");
    expect(body?.className).toContain("font-body");
  });
});
```

Run: `npm test`
Expected: both assertions pass. (Rendering `<html>`/`<body>` directly via RTL works in jsdom; if RTL complains about nested html, instead assert on the returned JSX tree's className props via a shallow check — keep the two assertions above as the contract either way.)

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: wire Space Grotesk, JetBrains Mono, and General Sans fonts"
```

---

### Task 4: Shared utilities — `cn()` and motion tokens

**Files:**
- Create: `lib/utils.ts`
- Create: `lib/utils.test.ts`
- Create: `lib/animations.ts`
- Create: `lib/animations.test.ts`

**Interfaces:**
- Produces: `cn(...classes: ClassValue[]): string` and `animations` object with keys `spring`, `stagger40`, `stagger80`, `easeOut`, `durations`. Every component task imports these two modules.

- [ ] **Step 1: Write failing tests for `cn()`**

Create `lib/utils.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { cn } from "./utils";

describe("cn", () => {
  it("joins multiple class strings", () => {
    expect(cn("a", "b")).toBe("a b");
  });

  it("dedupes conflicting Tailwind utilities, keeping the last", () => {
    expect(cn("px-2", "px-4")).toBe("px-4");
  });

  it("drops falsy values", () => {
    expect(cn("a", false && "b", undefined, "c")).toBe("a c");
  });
});
```

Run: `npm test -- lib/utils.test.ts`
Expected: FAIL (`./utils` has no export `cn`).

- [ ] **Step 2: Implement `cn()`**

Create `lib/utils.ts`:

```ts
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
```

Run: `npm test -- lib/utils.test.ts`
Expected: PASS.

- [ ] **Step 3: Write failing tests for animation tokens**

Create `lib/animations.test.ts`:

```ts
import { describe, it, expect } from "vitest";
import { animations } from "./animations";

describe("animations", () => {
  it("matches the global spring token", () => {
    expect(animations.spring).toEqual({ type: "spring", stiffness: 280, damping: 22 });
  });

  it("matches the global easeOut curve", () => {
    expect(animations.easeOut).toEqual([0.22, 1, 0.36, 1]);
  });

  it("defines stagger40 and stagger80 as second offsets", () => {
    expect(animations.stagger40).toBe(0.04);
    expect(animations.stagger80).toBe(0.08);
  });

  it("defines micro, transition, and complex durations in seconds", () => {
    expect(animations.durations.micro).toBe(0.18);
    expect(animations.durations.transition).toBe(0.3);
    expect(animations.durations.complex).toBe(0.5);
  });
});
```

Run: `npm test -- lib/animations.test.ts`
Expected: FAIL (module doesn't exist).

- [ ] **Step 4: Implement animation tokens**

Create `lib/animations.ts`:

```ts
export const animations = {
  spring: { type: "spring" as const, stiffness: 280, damping: 22 },
  stagger40: 0.04,
  stagger80: 0.08,
  easeOut: [0.22, 1, 0.36, 1] as const,
  durations: {
    micro: 0.18,
    transition: 0.3,
    complex: 0.5,
  },
};
```

Run: `npm test -- lib/animations.test.ts`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add cn() utility and shared motion tokens"
```

---

### Task 5: Shared primitives — `HotkeyBadge` and `FadeInSection`

**Files:**
- Create: `components/HotkeyBadge.tsx`
- Create: `components/HotkeyBadge.test.tsx`
- Create: `components/FadeInSection.tsx`
- Create: `components/FadeInSection.test.tsx`

**Interfaces:**
- Consumes: `cn` from `@/lib/utils`, `animations` from `@/lib/animations`.
- Produces: `<HotkeyBadge keys={string[]} />` and `<FadeInSection>{children}</FadeInSection>`. Every section component (Tasks 6–13) uses `FadeInSection` as its outer wrapper; Hero and FinalCTA use `HotkeyBadge`.

- [ ] **Step 1: Write failing test for `HotkeyBadge`**

Create `components/HotkeyBadge.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { HotkeyBadge } from "./HotkeyBadge";

describe("HotkeyBadge", () => {
  it("renders one keycap per key", () => {
    render(<HotkeyBadge keys={["⌘", "⇧", "E"]} />);
    expect(screen.getByText("⌘")).toBeInTheDocument();
    expect(screen.getByText("⇧")).toBeInTheDocument();
    expect(screen.getByText("E")).toBeInTheDocument();
  });
});
```

Run: `npm test -- components/HotkeyBadge.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 2: Implement `HotkeyBadge`**

Create `components/HotkeyBadge.tsx`:

```tsx
import { cn } from "@/lib/utils";

export function HotkeyBadge({
  keys,
  className,
}: {
  keys: string[];
  className?: string;
}) {
  return (
    <span className={cn("inline-flex items-center gap-1", className)}>
      {keys.map((key, i) => (
        <kbd
          key={`${key}-${i}`}
          className="flex h-6 min-w-6 items-center justify-center rounded-md border border-grid-line bg-bg-mid px-1.5 font-mono text-xs text-cream-light"
        >
          {key}
        </kbd>
      ))}
    </span>
  );
}
```

Run: `npm test -- components/HotkeyBadge.test.tsx`
Expected: PASS.

- [ ] **Step 3: Write failing test for `FadeInSection`**

Create `components/FadeInSection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FadeInSection } from "./FadeInSection";

describe("FadeInSection", () => {
  it("renders its children", () => {
    render(
      <FadeInSection>
        <p>hello world</p>
      </FadeInSection>
    );
    expect(screen.getByText("hello world")).toBeInTheDocument();
  });
});
```

Run: `npm test -- components/FadeInSection.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 4: Implement `FadeInSection`**

Create `components/FadeInSection.tsx`:

```tsx
"use client";

import { motion, useReducedMotion } from "framer-motion";
import { animations } from "@/lib/animations";

export function FadeInSection({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reduce ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: animations.durations.complex, ease: animations.easeOut }}
    >
      {children}
    </motion.div>
  );
}
```

Run: `npm test -- components/FadeInSection.test.tsx`
Expected: PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add HotkeyBadge and FadeInSection shared primitives"
```

---

### Task 6: Hero section

**Files:**
- Create: `components/Hero.tsx`
- Create: `components/Hero.test.tsx`

**Interfaces:**
- Consumes: `HotkeyBadge` (Task 5), `cn` (Task 4).
- Produces: `<Hero />`, default export used by `app/page.tsx` in Task 14.

**Note:** Apply the `frontend-design` and `ui-ux-pro-max` skills while implementing this task — this is the first and highest-stakes visual surface on the page. Query Magic MCP for hero structural reference first, then adapt fully to the token system below; do not keep any default Magic styling, spacing, or copy.

- [ ] **Step 1: Write failing test**

Create `components/Hero.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Hero } from "./Hero";

describe("Hero", () => {
  it("renders the exact headline with emphasis on 'fix'", () => {
    render(<Hero />);
    expect(screen.getByText(/stop guessing what to/i)).toBeInTheDocument();
    expect(screen.getByText("fix")).toBeInTheDocument();
    expect(screen.getByText(/next$/i)).toBeInTheDocument();
  });

  it("renders the exact subheadline", () => {
    render(<Hero />);
    expect(
      screen.getByText(
        /Extra AI looks at your site and your code at the same time/i
      )
    ).toBeInTheDocument();
  });

  it("renders the CTA button with hotkey badge", () => {
    render(<Hero />);
    expect(screen.getByRole("link", { name: /download extra ai/i })).toBeInTheDocument();
  });

  it("renders the macOS badge and free-to-start note", () => {
    render(<Hero />);
    expect(screen.getByText("macOS · free to start")).toBeInTheDocument();
  });
});
```

Run: `npm test -- components/Hero.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 2: Implement `Hero`**

Create `components/Hero.tsx`:

```tsx
import Link from "next/link";
import { HotkeyBadge } from "@/components/HotkeyBadge";

export function Hero() {
  return (
    <section className="gradient-warm bg-grid-texture relative overflow-hidden px-6 pb-24 pt-32 sm:px-10 md:pt-40">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/3 h-[420px] w-[420px] -translate-x-1/2 animate-pulse rounded-full bg-signal-ember/20 blur-[120px]"
        style={{ animationDuration: "1.1s" }}
      />
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
        <span className="flex items-center gap-2 rounded-full border border-grid-line bg-bg-mid/60 px-3 py-1 font-mono text-xs text-cream-warm">
          <HotkeyBadge keys={["⌘", "⇧", "E"]} /> · macOS
        </span>

        <h1 className="font-display text-4xl font-bold leading-tight text-cream-light sm:text-5xl md:text-6xl">
          stop guessing what to <em className="text-signal-ember not-italic">fix</em> next
        </h1>

        <p className="max-w-xl text-balance text-base text-cream-warm sm:text-lg">
          Extra AI looks at your site and your code at the same time — then writes the
          exact prompt your next fix needs. Works with Cursor, Windsurf, Claude Code, or
          whatever you&apos;re using today.
        </p>

        <Link
          href="#pricing"
          className="clip-corner flex min-h-11 items-center gap-2 bg-signal-ember px-6 py-3 font-display text-sm font-bold text-bg-void transition-transform hover:scale-[1.02] active:scale-[0.98]"
        >
          Download Extra AI <HotkeyBadge keys={["⌘", "⇧", "E"]} />
        </Link>

        <span className="font-mono text-xs text-cream-warm/80">macOS · free to start</span>
      </div>
    </section>
  );
}
```

- [ ] **Step 3: Run test**

Run: `npm test -- components/Hero.test.tsx`
Expected: PASS. If the headline query fails because the sentence is split across text nodes, adjust the test to `screen.getByText((_, el) => el?.textContent === "stop guessing what to fix next")` scoped to the `h1` — keep the emphasis-on-"fix" assertion intact either way.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add Hero section"
```

---

### Task 7: FlowSteps section (`~/the-flow`)

**Files:**
- Create: `components/FlowSteps.tsx`
- Create: `components/FlowSteps.test.tsx`

**Interfaces:**
- Consumes: `FadeInSection` (Task 5).
- Produces: `<FlowSteps />`.

**Note:** Apply `frontend-design`/`ui-ux-pro-max` skills. The step digit is one of only two places ember is allowed outside CTAs — keep every other element in this section on cream/warm tones.

- [ ] **Step 1: Write failing test**

Create `components/FlowSteps.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FlowSteps } from "./FlowSteps";

describe("FlowSteps", () => {
  it("renders the eyebrow and title", () => {
    render(<FlowSteps />);
    expect(screen.getByText("~/the-flow")).toBeInTheDocument();
    expect(screen.getByText("ship.")).toBeInTheDocument();
  });

  it("renders all three numbered steps with their copy", () => {
    render(<FlowSteps />);
    expect(screen.getByText("01")).toBeInTheDocument();
    expect(screen.getByText("Press the hotkey")).toBeInTheDocument();
    expect(screen.getByText(/no app switching/i)).toBeInTheDocument();

    expect(screen.getByText("02")).toBeInTheDocument();
    expect(screen.getByText("Say what's wrong")).toBeInTheDocument();
    expect(screen.getByText(/no technical vocabulary needed/i)).toBeInTheDocument();

    expect(screen.getByText("03")).toBeInTheDocument();
    expect(screen.getByText("Get the exact prompt")).toBeInTheDocument();
    expect(screen.getByText(/copy it straight into cursor/i)).toBeInTheDocument();
  });
});
```

Run: `npm test -- components/FlowSteps.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 2: Implement `FlowSteps`**

Create `components/FlowSteps.tsx`:

```tsx
import { FadeInSection } from "@/components/FadeInSection";

const steps = [
  {
    number: "01",
    title: "Press the hotkey",
    body: "Anywhere on your Mac. The overlay appears instantly, no app switching.",
  },
  {
    number: "02",
    title: "Say what's wrong",
    body: `Plain words — "the button looks off on mobile." No technical vocabulary needed.`,
  },
  {
    number: "03",
    title: "Get the exact prompt",
    body: "Grounded in your actual screenshot and code — copy it straight into Cursor, Windsurf, or Claude Code.",
  },
];

export function FlowSteps() {
  return (
    <FadeInSection className="mx-auto max-w-4xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/the-flow</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        point · describe · <em className="text-signal-ember not-italic">ship.</em>
      </h2>
      <p className="mt-2 text-cream-warm">three steps. any AI coding tool you already use.</p>

      <ol className="mt-12 flex flex-col gap-10 sm:gap-12">
        {steps.map((step) => (
          <li key={step.number} className="flex items-start gap-6">
            <span className="font-display text-4xl font-bold text-signal-ember sm:text-5xl">
              {step.number}
            </span>
            <div>
              <h3 className="font-display text-xl font-semibold text-cream-light">
                {step.title}
              </h3>
              <p className="mt-1 text-cream-warm">{step.body}</p>
            </div>
          </li>
        ))}
      </ol>
    </FadeInSection>
  );
}
```

- [ ] **Step 3: Run test**

Run: `npm test -- components/FlowSteps.test.tsx`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add FlowSteps (~/the-flow) section"
```

---

### Task 8: GroundingShowcase section (`~/why`)

**Files:**
- Create: `components/GroundingShowcase.tsx`
- Create: `components/GroundingShowcase.test.tsx`

**Interfaces:**
- Consumes: `FadeInSection` (Task 5).
- Produces: `<GroundingShowcase />`.

**Note:** Apply `frontend-design`/`ui-ux-pro-max` skills for the annotated-mockup visual — this is the differentiation section, it must not look like a stock screenshot with generic pins.

- [ ] **Step 1: Write failing test**

Create `components/GroundingShowcase.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { GroundingShowcase } from "./GroundingShowcase";

describe("GroundingShowcase", () => {
  it("renders eyebrow, title, and subtitle", () => {
    render(<GroundingShowcase />);
    expect(screen.getByText("~/why")).toBeInTheDocument();
    expect(screen.getByText("it sees your site.")).toBeInTheDocument();
  });

  it("renders all three numbered annotations", () => {
    render(<GroundingShowcase />);
    expect(screen.getByText(/spacing inconsistent/i)).toBeInTheDocument();
    expect(screen.getByText(/contrast 3\.8:1/i)).toBeInTheDocument();
    expect(screen.getByText(/no mobile breakpoint below 768px/i)).toBeInTheDocument();
  });

  it("renders the grounding caption", () => {
    render(<GroundingShowcase />);
    expect(
      screen.getByText(/grounded in your real screenshot and your real code/i)
    ).toBeInTheDocument();
  });
});
```

Run: `npm test -- components/GroundingShowcase.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 2: Implement `GroundingShowcase`**

Create `components/GroundingShowcase.tsx`:

```tsx
import { FadeInSection } from "@/components/FadeInSection";

const annotations = [
  { id: 1, label: "spacing inconsistent — 13px where the rest of the page uses an 8px scale", top: "22%", left: "18%" },
  { id: 2, label: "contrast 3.8:1 — fails WCAG AA for body text", top: "48%", left: "62%" },
  { id: 3, label: "no mobile breakpoint below 768px", top: "76%", left: "34%" },
];

export function GroundingShowcase() {
  return (
    <FadeInSection className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/why</p>
      <h2 className="mt-3 max-w-2xl font-display text-3xl font-bold text-cream-light sm:text-4xl">
        it doesn&apos;t just read your prompt.{" "}
        <em className="text-signal-ember not-italic">it sees your site.</em>
      </h2>
      <p className="mt-2 max-w-xl text-cream-warm">
        most AI tools guess from code alone. Extra AI looks at what you&apos;re actually
        looking at.
      </p>

      <div className="clip-corner relative mt-12 aspect-video w-full border border-grid-line bg-bg-mid">
        {annotations.map((a) => (
          <span
            key={a.id}
            className="absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-2"
            style={{ top: a.top, left: a.left }}
          >
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-signal-ember font-mono text-xs font-bold text-bg-void">
              {a.id}
            </span>
            <span className="max-w-[220px] rounded-md border border-grid-line bg-bg-void/90 px-2 py-1 font-mono text-xs text-cream-light">
              {a.label}
            </span>
          </span>
        ))}
      </div>

      <p className="mt-4 text-sm text-cream-warm">
        grounded in your real screenshot and your real code — not a generic guess.
      </p>
    </FadeInSection>
  );
}
```

- [ ] **Step 3: Run test**

Run: `npm test -- components/GroundingShowcase.test.tsx`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add GroundingShowcase (~/why) section"
```

---

### Task 9: MemorySection (`~/memory`)

**Files:**
- Create: `components/MemorySection.tsx`
- Create: `components/MemorySection.test.tsx`

**Interfaces:**
- Consumes: `FadeInSection` (Task 5).
- Produces: `<MemorySection />`.

- [ ] **Step 1: Write failing test**

Create `components/MemorySection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemorySection } from "./MemorySection";

describe("MemorySection", () => {
  it("renders eyebrow and title", () => {
    render(<MemorySection />);
    expect(screen.getByText("~/memory")).toBeInTheDocument();
    expect(screen.getByText("remembers")).toBeInTheDocument();
  });

  it("renders the Monday and Wednesday exchange", () => {
    render(<MemorySection />);
    expect(screen.getByText(/Monday, in Cursor/)).toBeInTheDocument();
    expect(screen.getByText(/fix the header spacing/)).toBeInTheDocument();
    expect(screen.getByText(/Wednesday, in Windsurf/)).toBeInTheDocument();
    expect(screen.getByText(/the logo image itself is misaligned/)).toBeInTheDocument();
  });

  it("renders the caption", () => {
    render(<MemorySection />);
    expect(screen.getByText(/context that survives switching tools/i)).toBeInTheDocument();
  });
});
```

Run: `npm test -- components/MemorySection.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 2: Implement `MemorySection`**

Create `components/MemorySection.tsx`:

```tsx
import { FadeInSection } from "@/components/FadeInSection";

export function MemorySection() {
  return (
    <FadeInSection className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/memory</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        it <em className="text-signal-ember not-italic">remembers</em> your project.
      </h2>
      <p className="mt-2 text-cream-warm">
        switch between Cursor today and Windsurf tomorrow — Extra AI still knows what you
        already tried.
      </p>

      <div className="clip-corner mt-10 flex flex-col gap-4 border border-grid-line bg-bg-mid p-6 font-mono text-sm">
        <p className="text-cream-warm">
          <span className="text-cream-light/60">Monday, in Cursor:</span> &quot;fix the
          header spacing&quot;
          <br />
          <span className="text-signal-ember">→ Extra AI:</span> adjusted .header padding
          to match your 8px scale
        </p>
        <p className="text-cream-warm">
          <span className="text-cream-light/60">Wednesday, in Windsurf:</span> &quot;the
          header still looks off&quot;
          <br />
          <span className="text-signal-ember">→ Extra AI:</span> &quot;You already
          adjusted spacing on Monday — this looks like a different issue: the logo image
          itself is misaligned, not the padding.&quot;
        </p>
      </div>

      <p className="mt-4 text-sm text-cream-warm">
        context that survives switching tools. something no single AI coding assistant
        does today.
      </p>
    </FadeInSection>
  );
}
```

- [ ] **Step 3: Run test**

Run: `npm test -- components/MemorySection.test.tsx`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add MemorySection (~/memory) section"
```

---

### Task 10: SecuritySection (`~/security`)

**Files:**
- Create: `components/SecuritySection.tsx`
- Create: `components/SecuritySection.test.tsx`

**Interfaces:**
- Consumes: `FadeInSection` (Task 5), `Lock`/`ShieldCheck`/`Package` icons from `lucide-react`.
- Produces: `<SecuritySection />`.

- [ ] **Step 1: Write failing test**

Create `components/SecuritySection.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { SecuritySection } from "./SecuritySection";

describe("SecuritySection", () => {
  it("renders eyebrow and title", () => {
    render(<SecuritySection />);
    expect(screen.getByText("~/security")).toBeInTheDocument();
    expect(screen.getByText("never")).toBeInTheDocument();
  });

  it("renders all three bullets", () => {
    render(<SecuritySection />);
    expect(screen.getByText(/Local secret redaction/)).toBeInTheDocument();
    expect(screen.getByText(/Prompt injection defense/)).toBeInTheDocument();
    expect(screen.getByText(/No backend server/)).toBeInTheDocument();
  });

  it("renders the monospace caption", () => {
    render(<SecuritySection />);
    expect(
      screen.getByText(/only the current request context is sent for analysis/i)
    ).toBeInTheDocument();
  });
});
```

Run: `npm test -- components/SecuritySection.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 2: Implement `SecuritySection`**

Create `components/SecuritySection.tsx`:

```tsx
import { Lock, ShieldCheck, PackageX } from "lucide-react";
import { FadeInSection } from "@/components/FadeInSection";

const bullets = [
  {
    icon: Lock,
    title: "Local secret redaction",
    body: "scanned and stripped before any API call",
  },
  {
    icon: ShieldCheck,
    title: "Prompt injection defense",
    body: "your code is treated as data, never as commands",
  },
  {
    icon: PackageX,
    title: "No backend server",
    body: "history and project context stay on your device",
  },
];

export function SecuritySection() {
  return (
    <FadeInSection className="mx-auto max-w-3xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/security</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        your secrets <em className="text-signal-ember not-italic">never</em> leave your
        machine.
      </h2>
      <p className="mt-2 text-cream-warm">
        API keys, tokens, credentials — redacted locally before anything is sent for
        analysis.
      </p>

      <ul className="mt-10 flex flex-col gap-6">
        {bullets.map(({ icon: Icon, title, body }) => (
          <li key={title} className="flex items-start gap-4">
            <Icon aria-hidden className="mt-1 h-5 w-5 shrink-0 text-cream-warm" />
            <p className="text-cream-warm">
              <span className="font-display font-semibold text-cream-light">{title}</span>{" "}
              — {body}
            </p>
          </li>
        ))}
      </ul>

      <p className="mt-8 font-mono text-xs text-cream-warm/80">
        only the current request context is sent for analysis — nothing else, ever.
      </p>
    </FadeInSection>
  );
}
```

- [ ] **Step 3: Run test**

Run: `npm test -- components/SecuritySection.test.tsx`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add SecuritySection (~/security) section"
```

---

### Task 11: PricingCards (`~/pricing`)

**Files:**
- Create: `components/PricingCards.tsx`
- Create: `components/PricingCards.test.tsx`

**Interfaces:**
- Consumes: `FadeInSection` (Task 5), `cn` (Task 4).
- Produces: `<PricingCards />` with `id="pricing"` so `Hero`'s CTA `href="#pricing"` resolves.

- [ ] **Step 1: Write failing test**

Create `components/PricingCards.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { PricingCards } from "./PricingCards";

describe("PricingCards", () => {
  it("renders eyebrow and title", () => {
    render(<PricingCards />);
    expect(screen.getByText("~/pricing")).toBeInTheDocument();
  });

  it("renders all three tiers with prices", () => {
    render(<PricingCards />);
    expect(screen.getByText("FREE")).toBeInTheDocument();
    expect(screen.getByText("$0")).toBeInTheDocument();
    expect(screen.getByText("PRO")).toBeInTheDocument();
    expect(screen.getByText("$9/mo")).toBeInTheDocument();
    expect(screen.getByText("STUDIO")).toBeInTheDocument();
    expect(screen.getByText("$29/mo")).toBeInTheDocument();
  });

  it("marks only Pro as Most popular", () => {
    render(<PricingCards />);
    expect(screen.getByText("Most popular")).toBeInTheDocument();
    expect(screen.getAllByText("Most popular")).toHaveLength(1);
  });

  it("renders each tier's CTA", () => {
    render(<PricingCards />);
    expect(screen.getByRole("link", { name: /download — free/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start pro/i })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /start studio/i })).toBeInTheDocument();
  });

  it("renders the fine print", () => {
    render(<PricingCards />);
    expect(screen.getByText(/cancel anytime · no credit card for free/i)).toBeInTheDocument();
  });
});
```

Run: `npm test -- components/PricingCards.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 2: Implement `PricingCards`**

Create `components/PricingCards.tsx`:

```tsx
import Link from "next/link";
import { cn } from "@/lib/utils";
import { FadeInSection } from "@/components/FadeInSection";

const tiers = [
  {
    name: "FREE",
    price: "$0",
    features: ["5 analyses per month", "Works with any Code AI tool", "Basic prompt grounding"],
    cta: "Download — free",
    featured: false,
  },
  {
    name: "PRO",
    price: "$9/mo",
    features: [
      "Unlimited analyses",
      "1 active project with memory",
      "Tool-specific prompt formatting",
    ],
    cta: "Start Pro",
    featured: true,
  },
  {
    name: "STUDIO",
    price: "$29/mo",
    features: [
      "Everything in Pro",
      "Up to 5 projects",
      "Security & issue detection included",
      "Team sharing",
    ],
    cta: "Start Studio",
    featured: false,
  },
];

export function PricingCards() {
  return (
    <FadeInSection id="pricing" className="mx-auto max-w-5xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/pricing</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        start free. <em className="text-signal-ember not-italic">upgrade when it&apos;s obvious.</em>
      </h2>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-3">
        {tiers.map((tier) => (
          <div
            key={tier.name}
            className={cn(
              "clip-corner flex flex-col gap-4 border p-6",
              tier.featured
                ? "border-signal-ember bg-bg-mid"
                : "border-grid-line bg-bg-mid/60"
            )}
          >
            {tier.featured && (
              <span className="w-fit rounded-full bg-signal-ember px-2 py-0.5 font-mono text-xs font-bold text-bg-void">
                Most popular
              </span>
            )}
            <h3 className="font-display text-lg font-bold text-cream-light">{tier.name}</h3>
            <p className="font-display text-3xl font-bold text-cream-light">{tier.price}</p>
            <ul className="flex flex-col gap-2 text-sm text-cream-warm">
              {tier.features.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <Link
              href="#"
              className={cn(
                "clip-corner mt-auto flex min-h-11 items-center justify-center px-4 py-2 text-center font-display text-sm font-bold transition-transform hover:scale-[1.02] active:scale-[0.98]",
                tier.featured
                  ? "bg-signal-ember text-bg-void"
                  : "border border-grid-line text-cream-light"
              )}
            >
              {tier.cta}
            </Link>
          </div>
        ))}
      </div>

      <p className="mt-6 text-center font-mono text-xs text-cream-warm/80">
        cancel anytime · no credit card for Free
      </p>
    </FadeInSection>
  );
}
```

- [ ] **Step 3: Run test, then fix the `id` prop gap**

Run: `npm test -- components/PricingCards.test.tsx`

`FadeInSection` from Task 5 does not currently accept an `id` prop, so `id="pricing"` will be silently dropped by TypeScript (or fail the build under strict prop typing). Update `components/FadeInSection.tsx` from Task 5 to accept and forward it:

```tsx
export function FadeInSection({
  children,
  className,
  id,
}: {
  children: React.ReactNode;
  className?: string;
  id?: string;
}) {
  const reduce = useReducedMotion();

  return (
    <motion.div
      id={id}
      className={className}
      initial={reduce ? undefined : { opacity: 0, y: 40 }}
      whileInView={reduce ? undefined : { opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: animations.durations.complex, ease: animations.easeOut }}
    >
      {children}
    </motion.div>
  );
}
```

Run: `npm test -- components/PricingCards.test.tsx components/FadeInSection.test.tsx`
Expected: all PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add PricingCards (~/pricing) section, thread id prop through FadeInSection"
```

---

### Task 12: FAQAccordion (`~/faq`)

**Files:**
- Create: `components/FAQAccordion.tsx`
- Create: `components/FAQAccordion.test.tsx`

**Interfaces:**
- Consumes: shadcn `Accordion`/`AccordionItem`/`AccordionTrigger`/`AccordionContent` from `components/ui/accordion` (Task 1), `FadeInSection` (Task 5).
- Produces: `<FAQAccordion />`.

- [ ] **Step 1: Write failing test**

Create `components/FAQAccordion.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { FAQAccordion } from "./FAQAccordion";

describe("FAQAccordion", () => {
  it("renders eyebrow and all five questions", () => {
    render(<FAQAccordion />);
    expect(screen.getByText("~/faq")).toBeInTheDocument();
    expect(screen.getByText("Which platforms does Extra AI run on?")).toBeInTheDocument();
    expect(
      screen.getByText("Does Extra AI work with tools other than Cursor?")
    ).toBeInTheDocument();
    expect(screen.getByText("Where does my code go?")).toBeInTheDocument();
    expect(
      screen.getByText("What's the difference between Free and Pro?")
    ).toBeInTheDocument();
    expect(
      screen.getByText("Can I use this without an active Cursor/Windsurf subscription?")
    ).toBeInTheDocument();
  });

  it("reveals an answer when its question is clicked", async () => {
    const user = userEvent.setup();
    render(<FAQAccordion />);
    expect(screen.queryByText(/macOS 13\+/)).not.toBeInTheDocument();

    await user.click(screen.getByText("Which platforms does Extra AI run on?"));

    expect(await screen.findByText(/macOS 13\+/)).toBeInTheDocument();
  });
});
```

Run: `npm test -- components/FAQAccordion.test.tsx`
Expected: FAIL (module not found).

- [ ] **Step 2: Implement `FAQAccordion`**

Create `components/FAQAccordion.tsx`:

```tsx
"use client";

import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { FadeInSection } from "@/components/FadeInSection";

const faqs = [
  {
    q: "Which platforms does Extra AI run on?",
    a: "macOS 13+ (Apple Silicon + Intel via universal build). Windows is on the roadmap.",
  },
  {
    q: "Does Extra AI work with tools other than Cursor?",
    a: "Yes — Cursor, Windsurf, Claude Code, Codex, and v0 are all supported, with prompt formatting adapted to each tool's conventions.",
  },
  {
    q: "Where does my code go?",
    a: "Your screenshot and code are sent only to Gemini for the current analysis. Secrets are redacted locally first. Nothing is stored on a remote server.",
  },
  {
    q: "What's the difference between Free and Pro?",
    a: "Free gives you 5 analyses a month to try it. Pro removes the limit and adds persistent project memory.",
  },
  {
    q: "Can I use this without an active Cursor/Windsurf subscription?",
    a: "Yes — Extra AI generates the prompt, you paste it wherever you write code.",
  },
];

export function FAQAccordion() {
  return (
    <FadeInSection className="mx-auto max-w-2xl px-6 py-24 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/faq</p>
      <h2 className="mt-3 font-display text-3xl font-bold text-cream-light sm:text-4xl">
        questions, <em className="text-signal-ember not-italic">answered.</em>
      </h2>

      <Accordion type="single" collapsible className="mt-10">
        {faqs.map((faq) => (
          <AccordionItem key={faq.q} value={faq.q} className="border-grid-line">
            <AccordionTrigger className="text-left font-display text-cream-light">
              {faq.q}
            </AccordionTrigger>
            <AccordionContent className="text-cream-warm">{faq.a}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </FadeInSection>
  );
}
```

- [ ] **Step 3: Run test**

Run: `npm test -- components/FAQAccordion.test.tsx`
Expected: PASS.

- [ ] **Step 4: Commit**

```bash
git add -A
git commit -m "feat: add FAQAccordion (~/faq) section"
```

---

### Task 13: FinalCTA and Footer

**Files:**
- Create: `components/FinalCTA.tsx`
- Create: `components/FinalCTA.test.tsx`
- Create: `components/Footer.tsx`
- Create: `components/Footer.test.tsx`

**Interfaces:**
- Consumes: `HotkeyBadge` (Task 5), `FadeInSection` (Task 5).
- Produces: `<FinalCTA />`, `<Footer />`.

- [ ] **Step 1: Write failing tests**

Create `components/FinalCTA.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { FinalCTA } from "./FinalCTA";

describe("FinalCTA", () => {
  it("renders eyebrow, title, and CTA", () => {
    render(<FinalCTA />);
    expect(screen.getByText("~/⌘⇧e")).toBeInTheDocument();
    expect(screen.getByText(/stop starting from/i)).toBeInTheDocument();
    expect(screen.getByText("zero")).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /download extra ai/i })).toBeInTheDocument();
    expect(screen.getByText("macOS · free to start · 30 second install")).toBeInTheDocument();
  });
});
```

Create `components/Footer.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Footer } from "./Footer";

describe("Footer", () => {
  it("renders the nav links and copyright", () => {
    render(<Footer />);
    expect(screen.getByRole("link", { name: "Pricing" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Privacy" })).toBeInTheDocument();
    expect(screen.getByRole("link", { name: "Terms" })).toBeInTheDocument();
    expect(screen.getByText("© 2026 Extra AI")).toBeInTheDocument();
  });
});
```

Run: `npm test -- components/FinalCTA.test.tsx components/Footer.test.tsx`
Expected: both FAIL (modules not found).

- [ ] **Step 2: Implement `FinalCTA`**

Create `components/FinalCTA.tsx`:

```tsx
import Link from "next/link";
import { HotkeyBadge } from "@/components/HotkeyBadge";
import { FadeInSection } from "@/components/FadeInSection";

export function FinalCTA() {
  return (
    <FadeInSection className="gradient-warm bg-grid-texture mx-6 flex flex-col items-center gap-6 px-6 py-24 text-center sm:mx-10 sm:px-10">
      <p className="font-mono text-sm text-cream-warm">~/⌘⇧e</p>
      <h2 className="max-w-xl font-display text-3xl font-bold text-cream-light sm:text-4xl">
        stop starting from <em className="text-signal-ember not-italic">zero</em> on every
        prompt.
      </h2>
      <p className="text-cream-warm">one hotkey. one look at your screen. one exact prompt.</p>

      <Link
        href="#pricing"
        className="clip-corner flex min-h-11 items-center gap-2 bg-signal-ember px-6 py-3 font-display text-sm font-bold text-bg-void transition-transform hover:scale-[1.02] active:scale-[0.98]"
      >
        Download Extra AI <HotkeyBadge keys={["⌘", "⇧", "E"]} />
      </Link>

      <span className="font-mono text-xs text-cream-warm/80">
        macOS · free to start · 30 second install
      </span>
    </FadeInSection>
  );
}
```

- [ ] **Step 3: Implement `Footer`**

Create `components/Footer.tsx`:

```tsx
import Link from "next/link";

const links = [
  { label: "Pricing", href: "#pricing" },
  { label: "Privacy", href: "#" },
  { label: "Terms", href: "#" },
  { label: "GitHub", href: "#" },
];

export function Footer() {
  return (
    <footer className="mx-auto flex max-w-5xl flex-col items-center gap-4 px-6 py-16 text-center sm:flex-row sm:justify-between sm:px-10 sm:text-left">
      <span className="font-display text-sm font-bold text-cream-light">extra.</span>
      <nav className="flex gap-6">
        {links.map((link) => (
          <Link
            key={link.label}
            href={link.href}
            className="font-mono text-xs text-cream-warm hover:text-cream-light"
          >
            {link.label}
          </Link>
        ))}
      </nav>
      <span className="font-mono text-xs text-cream-warm/80">© 2026 Extra AI</span>
    </footer>
  );
}
```

- [ ] **Step 4: Run tests**

Run: `npm test -- components/FinalCTA.test.tsx components/Footer.test.tsx`
Expected: both PASS.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: add FinalCTA and Footer sections"
```

---

### Task 14: Assemble the page

**Files:**
- Modify: `app/page.tsx`
- Create: `app/page.test.tsx`

**Interfaces:**
- Consumes: `Hero`, `FlowSteps`, `GroundingShowcase`, `MemorySection`, `SecuritySection`, `PricingCards`, `FAQAccordion`, `FinalCTA`, `Footer` (Tasks 6–13).
- Produces: the full assembled page at `/`.

- [ ] **Step 1: Write failing test**

Create `app/page.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import Page from "./page";

describe("Page", () => {
  it("renders every section's eyebrow in the correct order", () => {
    render(<Page />);
    const eyebrows = ["~/the-flow", "~/why", "~/memory", "~/security", "~/pricing", "~/faq", "~/⌘⇧e"];
    for (let i = 0; i < eyebrows.length - 1; i++) {
      const a = screen.getByText(eyebrows[i]);
      const b = screen.getByText(eyebrows[i + 1]);
      // eslint-disable-next-line no-bitwise
      expect(a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING).toBeTruthy();
    }
  });

  it("renders the hero headline and the footer copyright", () => {
    render(<Page />);
    expect(screen.getByText("fix")).toBeInTheDocument();
    expect(screen.getByText("© 2026 Extra AI")).toBeInTheDocument();
  });
});
```

Run: `npm test -- app/page.test.tsx`
Expected: FAIL (page.tsx still has the create-next-app starter content, eyebrows missing).

- [ ] **Step 2: Replace `app/page.tsx`**

```tsx
import { Hero } from "@/components/Hero";
import { FlowSteps } from "@/components/FlowSteps";
import { GroundingShowcase } from "@/components/GroundingShowcase";
import { MemorySection } from "@/components/MemorySection";
import { SecuritySection } from "@/components/SecuritySection";
import { PricingCards } from "@/components/PricingCards";
import { FAQAccordion } from "@/components/FAQAccordion";
import { FinalCTA } from "@/components/FinalCTA";
import { Footer } from "@/components/Footer";

export default function Page() {
  return (
    <main>
      <Hero />
      <FlowSteps />
      <GroundingShowcase />
      <MemorySection />
      <SecuritySection />
      <PricingCards />
      <FAQAccordion />
      <FinalCTA />
      <Footer />
    </main>
  );
}
```

- [ ] **Step 3: Run test**

Run: `npm test -- app/page.test.tsx`
Expected: PASS.

- [ ] **Step 4: Run the full test suite and build**

Run: `npm test`
Expected: every test file from Tasks 1–14 passes.

Run: `npm run build`
Expected: production build succeeds with no type errors.

Run: `npm run lint`
Expected: no errors.

- [ ] **Step 5: Commit**

```bash
git add -A
git commit -m "feat: assemble full landing page in app/page.tsx"
```

---

### Task 15: Manual verification and self-critique pass

**Files:** none created; this task verifies and, if needed, patches files from Tasks 1–14.

**Interfaces:** none — terminal task, no downstream consumers.

- [ ] **Step 1: Run the dev server**

```bash
npm run dev
```

- [ ] **Step 2: Visually verify in a browser at all four breakpoints**

Open `http://localhost:3000` and check at 375px, 768px, 1024px, and 1440px widths:
- No horizontal scroll at any width.
- Pricing cards stack vertically on mobile (375px), 3-column on desktop.
- Hero headline scales down proportionally on mobile without wrapping awkwardly.
- Grid texture and gradient direction (dark-top-left → warm-bottom-right) are consistent across every section.

- [ ] **Step 3: Run the self-critique checkpoint from the spec**

Answer each honestly against the live page, and patch the relevant component file if the answer is "no":
1. Does the hero read as Extra AI specifically, not a generic AI startup? If generic, revise the headline/subheadline treatment in `components/Hero.tsx`.
2. Is ember used only for CTAs, active states, and step digits — not decoration? Audit every `text-signal-ember`/`bg-signal-ember` usage across `components/*.tsx`; remove any decorative use.
3. Is there real texture (grid lines, gradient direction, clipped corners), or does it read flat? If flat, confirm `.bg-grid-texture`, `.gradient-warm`, and `.clip-corner` are actually applied on `Hero.tsx`, `FinalCTA.tsx`, `PricingCards.tsx`, and `GroundingShowcase.tsx`.

- [ ] **Step 4: Run the accessibility checklist**

Using the browser's accessibility inspector or axe DevTools:
- Confirm contrast ≥ 4.5:1 for `text-cream-warm` on `bg-bg-void`/`bg-bg-mid` (adjust the color's opacity or swap to `text-cream-light` on any element that fails).
- Tab through the page; confirm every link/button/accordion trigger shows a visible focus ring (add `focus-visible:outline focus-visible:outline-2 focus-visible:outline-signal-ember` to any interactive element missing one).
- Confirm every interactive element (`Link`, `AccordionTrigger`) has a rendered height ≥ 44px (already satisfied by `min-h-11` = 44px on CTAs; verify `AccordionTrigger` from shadcn also meets this, patch its className in `components/FAQAccordion.tsx` if not).

- [ ] **Step 5: Final full-suite verification**

```bash
npm test
npm run build
npm run lint
```

Expected: all pass with zero errors.

- [ ] **Step 6: Commit any fixes from Steps 3–4**

```bash
git add -A
git commit -m "fix: accessibility and self-critique polish pass"
```

(Skip this commit if Steps 3–4 found nothing to change.)
