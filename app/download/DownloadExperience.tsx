"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import {
  CheckCircle2,
  Circle,
  Command,
  Download,
  FolderDown,
  Monitor,
  ShieldCheck,
  Sparkles,
} from "lucide-react";
import { BackgroundPaths } from "@/components/ui/background-paths";
import { Logo } from "@/components/Logo";
import { cn } from "@/lib/utils";

type PlatformId = "macos" | "windows";

const platforms: Record<
  PlatformId,
  {
    label: string;
    detail: string;
    file: string;
    version: string;
    href: string;
    icon: typeof Command;
    comingSoon?: boolean;
  }
> = {
  macos: {
    label: "macOS",
    detail: "Universal · macOS 12+",
    file: "ExtraAI-1.0.0-universal.dmg",
    version: "v1.0.0",
    href: "/downloads/ExtraAI-1.0.0-universal.dmg",
    icon: Command,
  },
  windows: {
    label: "Windows",
    detail: "64-bit · Windows 10 / 11 · beta",
    file: "ExtraAI-1.0.0-windows-x64.zip",
    version: "v1.0.0",
    href: "/downloads/ExtraAI-1.0.0-windows-x64.zip",
    icon: Monitor,
  },
};

const platformOrder: PlatformId[] = ["macos", "windows"];

function detectPlatform(): PlatformId | null {
  if (typeof navigator === "undefined") {
    return null;
  }

  const platform = `${navigator.platform} ${navigator.userAgent}`.toLowerCase();
  if (platform.includes("win")) {
    return "windows";
  }
  if (platform.includes("mac")) {
    return "macos";
  }

  return null;
}

export function DownloadExperience() {
  const reduceMotion = useReducedMotion();
  const [selected, setSelected] = useState<PlatformId>("macos");
  const [detected, setDetected] = useState<PlatformId | null>(null);
  const active = platforms[selected];

  useEffect(() => {
    const platform = detectPlatform();
    if (platform) {
      setDetected(platform);
      setSelected(platform);
    }
  }, []);

  const filenameParts = useMemo(() => active.file.split("-"), [active.file]);

  return (
    <main className="relative min-h-screen overflow-hidden bg-bg-void text-cream-light">
      <div
        aria-hidden
        className="download-page-backdrop absolute inset-0 z-0"
      />
      <BackgroundPaths
        className="absolute inset-y-0 left-[45%] right-0 z-[1] hidden min-h-full w-auto bg-transparent lg:flex"
        pathClassName="download-white-paths text-white"
        showDemo={false}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-[45%] z-[2] hidden w-px bg-cream-light/6 lg:block"
      />

      <div className="relative z-10 mx-auto grid min-h-screen w-full max-w-7xl grid-cols-1 lg:grid-cols-[0.86fr_1.14fr]">
        <section className="flex min-h-screen flex-col px-6 py-8 sm:px-10 lg:px-14">
          <Link
            href="/"
            className="w-fit rounded-md focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember"
          >
            <Logo markClassName="h-7 w-7" wordmarkClassName="text-xl" />
          </Link>

          <motion.div
            className="flex flex-1 flex-col justify-center py-16"
            initial={reduceMotion ? false : { opacity: 0, y: 24 }}
            animate={reduceMotion ? undefined : { opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mb-4 flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-cream-warm/80">
              <Sparkles className="size-4 text-signal-ember" />
              desktop installer
            </p>
            <h1 className="max-w-md font-serif text-5xl leading-[0.95] tracking-tight text-cream-light sm:text-6xl">
              Pick your <em className="text-signal-ember">platform.</em>
            </h1>

            <div id="installers" className="mt-10 flex flex-col gap-4">
              {platformOrder.map((id) => {
                const platform = platforms[id];
                const Icon = platform.icon;
                const isActive = selected === id;
                const isDetected = detected === id;

                return (
                  <button
                    key={id}
                    type="button"
                    onClick={() => setSelected(id)}
                    aria-pressed={isActive}
                    className={cn(
                      "group relative flex w-full items-center gap-4 rounded-lg border p-4 text-left transition duration-200 sm:p-5",
                      "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember",
                      isActive
                        ? "border-signal-ember/70 bg-signal-ember/10 shadow-[0_0_50px_rgba(255,107,53,0.16)]"
                        : "border-cream-light/10 bg-cream-light/[0.035] hover:border-cream-light/20 hover:bg-cream-light/[0.055]"
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-14 shrink-0 items-center justify-center rounded-md border transition-colors",
                        isActive
                          ? "border-signal-ember/50 bg-signal-ember/15 text-signal-ember"
                          : "border-cream-light/10 bg-bg-void/40 text-cream-warm"
                      )}
                    >
                      <Icon className="size-6" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="flex flex-wrap items-center gap-2">
                        <span className="font-display text-lg font-bold text-cream-light">
                          {platform.label}
                        </span>
                        {isDetected ? (
                          <span className="rounded-full border border-signal-ember/35 bg-signal-ember/12 px-2 py-0.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-signal-ember">
                            detected
                          </span>
                        ) : null}
                        {platform.comingSoon ? (
                          <span className="rounded-full border border-cream-light/20 bg-cream-light/[0.06] px-2 py-0.5 font-mono text-[0.68rem] font-bold uppercase tracking-[0.14em] text-cream-warm/70">
                            coming soon
                          </span>
                        ) : null}
                      </span>
                      <span className="mt-1 block text-sm text-cream-warm">{platform.detail}</span>
                      <span className="mt-1 block truncate font-mono text-xs text-cream-warm/55">
                        {platform.comingSoon
                          ? "In development"
                          : `${platform.version} · ${platform.file}`}
                      </span>
                    </span>
                    {isActive ? (
                      <CheckCircle2 className="size-7 shrink-0 text-signal-ember" />
                    ) : (
                      <Circle className="size-7 shrink-0 text-cream-warm/25 transition-colors group-hover:text-cream-warm/45" />
                    )}
                  </button>
                );
              })}
            </div>

            {active.comingSoon ? (
              <div
                aria-disabled
                className="clip-corner mt-7 inline-flex min-h-14 cursor-not-allowed items-center justify-center gap-3 border border-cream-light/15 bg-cream-light/[0.05] px-6 py-4 font-display text-base font-bold text-cream-warm/60"
              >
                Windows build coming soon
              </div>
            ) : (
              <a
                href={active.href}
                className="clip-corner mt-7 inline-flex min-h-14 items-center justify-center gap-3 bg-signal-ember px-6 py-4 font-display text-base font-bold text-bg-void shadow-[0_18px_70px_rgba(255,107,53,0.3)] transition hover:bg-[#ff7b4b] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-signal-ember"
              >
                Download for {active.label}
                <Download className="size-5" />
              </a>
            )}

            <p className="mt-4 max-w-md text-xs leading-5 text-cream-warm/55">
              {selected === "macos"
                ? "First launch on macOS: if Gatekeeper warns about an unidentified developer, open System Settings → Privacy & Security → “Open Anyway”."
                : "Unzip the archive and run extra_ai.exe. If SmartScreen warns about an unknown publisher, click “More info” → “Run anyway”."}
            </p>

            <p className="mt-5 max-w-md text-sm leading-6 text-cream-warm/70">
              By downloading you agree to our{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-cream-light">
                terms
              </Link>{" "}
              and{" "}
              <Link href="#" className="underline underline-offset-4 hover:text-cream-light">
                privacy policy
              </Link>
              .
            </p>
          </motion.div>

          <p className="font-mono text-xs text-cream-warm/45">macOS 12+ · Windows 10/11</p>
        </section>

        <section className="relative hidden items-center justify-center px-10 py-20 lg:flex">
          <motion.div
            className="relative w-full max-w-[620px]"
            initial={reduceMotion ? false : { opacity: 0, x: 42, scale: 0.97 }}
            animate={reduceMotion ? undefined : { opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <div
              aria-hidden
              className="absolute -inset-12 rounded-full bg-signal-ember/15 blur-[90px]"
            />
            <div className="relative overflow-hidden rounded-xl border border-cream-light/15 bg-[#f7f7f9] text-[#3f4148] shadow-[0_50px_140px_rgba(0,0,0,0.34)]">
              <div className="flex h-14 items-center gap-3 border-b border-black/8 bg-[#f2f2f5] px-5">
                <span className="size-3 rounded-full bg-signal-ember" />
                <span className="size-3 rounded-full bg-cream-warm" />
                <span className="size-3 rounded-full bg-bg-violet" />
                <div className="mx-auto flex h-8 w-72 items-center gap-2 rounded-md border border-black/10 bg-white px-3 text-sm text-[#9ca0a8]">
                  <FolderDown className="size-4" />
                  extra.ai/download
                </div>
                <span className="extra-glow-filter flex size-9 items-center justify-center rounded-full bg-[#e6e7eb] text-signal-ember">
                  <Download className="size-5" />
                </span>
              </div>

              <div className="grid min-h-[360px] grid-cols-[180px_1fr]">
                <aside className="border-r border-black/8 bg-[#efeff3] px-5 py-8">
                  <p className="mb-5 text-xs font-bold uppercase tracking-[0.16em] text-[#969aa3]">
                    Favorites
                  </p>
                  {["Desktop", "Downloads", "Applications"].map((item) => (
                    <div
                      key={item}
                      className={cn(
                        "flex items-center gap-3 rounded-md px-3 py-2 text-sm font-semibold",
                        item === "Downloads" ? "bg-signal-ember/12 text-signal-ember" : "text-[#737780]"
                      )}
                    >
                      {item === "Downloads" ? (
                        <FolderDown className="size-4" />
                      ) : (
                        <Monitor className="size-4" />
                      )}
                      {item}
                    </div>
                  ))}
                </aside>

                <div className="flex flex-col justify-center px-8">
                  <div className="mb-8 flex items-center gap-4">
                    <span className="extra-glow-filter flex size-16 items-center justify-center rounded-2xl bg-bg-void text-signal-ember shadow-lg">
                      <active.icon className="size-8" />
                    </span>
                    <div>
                      <p className="text-lg font-bold text-[#2c2e34]">{active.label}</p>
                      <p className="text-sm text-[#7d828d]">{active.detail}</p>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="h-4 w-72 rounded-full bg-[#eceef2]" />
                    <div className="h-4 w-52 rounded-full bg-[#eceef2]" />
                    <div className="h-4 w-64 rounded-full bg-[#eceef2]" />
                  </div>
                  <div className="mt-10 rounded-lg border border-black/8 bg-white px-4 py-3 font-mono text-xs text-[#737780]">
                    {filenameParts.join("-")}
                  </div>
                  <div className="mt-4 flex items-center gap-2 text-xs font-semibold text-[#737780]">
                    <ShieldCheck className="extra-glow-icon size-4" />
                    Signed installer · ready for {active.label}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </section>
      </div>
      <div className="noise-overlay" aria-hidden />
    </main>
  );
}
