import { cn } from "@/lib/utils";

interface EqualizerProps {
  bars?: number;
  className?: string;
  barClassName?: string;
}

export function Equalizer({ bars = 7, className, barClassName }: EqualizerProps) {
  return (
    <div
      className={cn("flex items-end gap-[3px] h-5", className)}
      aria-hidden="true"
    >
      {Array.from({ length: bars }).map((_, i) => (
        <span
          key={i}
          className={cn(
            "block w-[3px] origin-bottom rounded-sm bg-gold animate-eq",
            barClassName
          )}
          style={{
            height: "100%",
            animationDelay: `${(i * 0.13).toFixed(2)}s`,
            animationDuration: `${(0.7 + (i % 3) * 0.18).toFixed(2)}s`,
          }}
        />
      ))}
    </div>
  );
}
