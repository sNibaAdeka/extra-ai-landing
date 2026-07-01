"use client";

import { motion, useReducedMotion } from "framer-motion";
import { animations } from "@/lib/animations";

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
