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
