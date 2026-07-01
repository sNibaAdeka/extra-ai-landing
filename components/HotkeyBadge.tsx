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
