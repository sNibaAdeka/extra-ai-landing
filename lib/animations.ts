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
