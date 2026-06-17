import { cn } from "@/lib/utils";

interface LvMarkProps {
  className?: string;
  size?: number;
  tone?: "gold" | "silver" | "bronze" | "bone";
}

const toneColor: Record<NonNullable<LvMarkProps["tone"]>, string> = {
  gold: "#E9C46A",
  silver: "#D5D5D8",
  bronze: "#B87333",
  bone: "#F5F4EF",
};

export function LvMark({ className, size = 64, tone = "gold" }: LvMarkProps) {
  const color = toneColor[tone];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      role="img"
      aria-label="LV DJ monogram"
      className={cn("inline-block", className)}
    >
      <defs>
        <radialGradient id="lvGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={color} stopOpacity="0.4" />
          <stop offset="70%" stopColor={color} stopOpacity="0" />
        </radialGradient>
      </defs>
      <circle cx="60" cy="60" r="58" fill="url(#lvGlow)" />
      <circle
        cx="60"
        cy="60"
        r="54"
        fill="none"
        stroke={color}
        strokeWidth="2"
        opacity="0.85"
      />
      <circle
        cx="60"
        cy="60"
        r="46"
        fill="none"
        stroke={color}
        strokeWidth="0.75"
        opacity="0.45"
      />
      {/* Stylized LV — overlapping serifed letters */}
      <g fill={color}>
        <path d="M40 36 L46 36 L46 78 L66 78 L66 84 L40 84 Z" />
        <path d="M58 36 L65 36 L74 72 L82 36 L88 36 L77 84 L70 84 Z" />
      </g>
      <text
        x="60"
        y="100"
        textAnchor="middle"
        fontFamily="var(--font-bebas), Impact, sans-serif"
        fontSize="9"
        letterSpacing="3"
        fill={color}
        opacity="0.75"
      >
        DJ · SYDNEY
      </text>
    </svg>
  );
}
