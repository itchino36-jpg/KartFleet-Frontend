type SemicircleProgressProps = {
  value: number;
  size?: number;
  strokeWidth?: number;
  className?: string;
};

export default function SemicircleProgress({
  value,
  size = 220,
  strokeWidth = 16,
  className = "",
}: SemicircleProgressProps) {
  const clamped = Math.min(100, Math.max(0, value));
  const radius = size / 2 - strokeWidth;
  const cx = size / 2;
  const cy = size / 2;
  const circumference = Math.PI * radius;
  const filled = (clamped / 100) * circumference;
  const startX = cx - radius;
  const endX = cx + radius;
  const pathD = `M ${startX} ${cy} A ${radius} ${radius} 0 0 1 ${endX} ${cy}`;

  return (
    <div
      className={`relative flex flex-col items-center ${className}`}
      style={{ width: size }}
    >
      <svg
        width={size}
        height={size / 2 + strokeWidth}
        viewBox={`0 0 ${size} ${size / 2 + strokeWidth}`}
      >
        <path
          d={pathD}
          fill="none"
          stroke="currentColor"
          strokeWidth={strokeWidth}
          strokeLinecap="round"
          className="text-emerald-400 transition-[stroke-dasharray] duration-300 ease-out"
          strokeDasharray={`${filled} ${circumference}`}
        />
      </svg>

      <div
        className="absolute flex flex-col items-center"
        style={{ top: size / 2 - strokeWidth * 1.4 }}
      >
        <span className="text-3xl font-semibold tabular-nums text-white">
          {Math.round(clamped)}%
        </span>
      </div>
    </div>
  );
}
