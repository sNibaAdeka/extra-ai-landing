"use client";

import { type ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function FloatingPaths({ position }: { position: number }) {
  const reduceMotion = useReducedMotion();
  const paths = Array.from({ length: 36 }, (_, i) => ({
    id: i,
    d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
      380 - i * 5 * position
    } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
      152 - i * 5 * position
    } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
      684 - i * 5 * position
    } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
    width: 0.5 + i * 0.03,
    duration: 20 + ((i * 7) % 10),
  }));

  return (
    <div className="pointer-events-none absolute inset-0">
      <svg
        className="h-full w-full text-current"
        viewBox="0 0 696 316"
        fill="none"
        aria-hidden="true"
      >
        <title>Background Paths</title>
        {paths.map((path) => (
          <motion.path
            key={path.id}
            d={path.d}
            stroke="currentColor"
            strokeWidth={path.width}
            strokeOpacity={0.08 + path.id * 0.018}
            initial={reduceMotion ? false : { pathLength: 0.3, opacity: 0.45 }}
            animate={
              reduceMotion
                ? undefined
                : {
                    pathLength: 1,
                    opacity: [0.22, 0.5, 0.22],
                    pathOffset: [0, 1, 0],
                  }
            }
            transition={{
              duration: path.duration,
              repeat: Number.POSITIVE_INFINITY,
              ease: "linear",
            }}
          />
        ))}
      </svg>
    </div>
  );
}

export function BackgroundPaths({
  title = "Background Paths",
  children,
  className,
  pathClassName,
  showDemo = true,
}: {
  title?: string;
  children?: ReactNode;
  className?: string;
  pathClassName?: string;
  showDemo?: boolean;
}) {
  const words = title.split(" ");

  return (
    <div
      className={cn(
        "relative flex min-h-screen w-full items-center justify-center overflow-hidden bg-white dark:bg-neutral-950",
        className
      )}
    >
      <div className={cn("absolute inset-0", pathClassName)}>
        <FloatingPaths position={1} />
        <FloatingPaths position={-1} />
      </div>

      {children ? (
        <div className="relative z-10 w-full">{children}</div>
      ) : showDemo ? (
        <div className="relative z-10 container mx-auto px-4 text-center md:px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            className="mx-auto max-w-4xl"
          >
            <h1 className="mb-8 text-5xl font-bold tracking-tighter sm:text-7xl md:text-8xl">
              {words.map((word, wordIndex) => (
                <span key={word} className="mr-4 inline-block last:mr-0">
                  {word.split("").map((letter, letterIndex) => (
                    <motion.span
                      key={`${wordIndex}-${letterIndex}`}
                      initial={{ y: 100, opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: wordIndex * 0.1 + letterIndex * 0.03,
                        type: "spring",
                        stiffness: 150,
                        damping: 25,
                      }}
                      className="inline-block bg-gradient-to-r from-neutral-900 to-neutral-700/80 bg-clip-text text-transparent dark:from-white dark:to-white/80"
                    >
                      {letter}
                    </motion.span>
                  ))}
                </span>
              ))}
            </h1>

            <div className="group relative inline-block overflow-hidden rounded-2xl bg-gradient-to-b from-black/10 to-white/10 p-px shadow-lg backdrop-blur-lg transition-shadow duration-300 hover:shadow-xl dark:from-white/10 dark:to-black/10">
              <Button
                variant="ghost"
                className="rounded-[1.15rem] border border-black/10 bg-white/95 px-8 py-6 text-lg font-semibold text-black backdrop-blur-md transition-all duration-300 hover:bg-white/100 hover:shadow-md group-hover:-translate-y-0.5 dark:border-white/10 dark:bg-black/95 dark:text-white dark:hover:bg-black/100 dark:hover:shadow-neutral-800/50"
              >
                <span className="opacity-90 transition-opacity group-hover:opacity-100">
                  Discover Excellence
                </span>
                <span className="ml-3 opacity-70 transition-all duration-300 group-hover:translate-x-1.5 group-hover:opacity-100">
                  →
                </span>
              </Button>
            </div>
          </motion.div>
        </div>
      ) : null}
    </div>
  );
}
