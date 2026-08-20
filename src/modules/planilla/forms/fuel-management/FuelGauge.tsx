import { Fuel } from "lucide-react";

export interface FuelGaugeProps {
  fuelLevel: number;
  size?: number;
  className?: string;
}

const TICKS = Array.from({ length: 11 }, (_, index) => {
  const angle = (135 + index * 27) * (Math.PI / 180);
  const isMajor = index % 5 === 0;
  const outerRadius = 78;
  const innerRadius = isMajor ? 64 : 69;
  return {
    x1: 100 + Math.cos(angle) * innerRadius,
    y1: 100 + Math.sin(angle) * innerRadius,
    x2: 100 + Math.cos(angle) * outerRadius,
    y2: 100 + Math.sin(angle) * outerRadius,
    reserve: index <= 2,
    isMajor,
  };
});

export default function FuelGauge({ fuelLevel, size = 220, className = "" }: FuelGaugeProps) {
  const level = Math.min(100, Math.max(0, fuelLevel));
  const needleAngle = -135 + (level / 100) * 270;

  return (
    <div className={`relative aspect-square ${className}`} style={{ width: size, maxWidth: "100%" }}>
      <svg viewBox="0 0 200 200" className="h-full w-full" role="img" aria-label={`Nivel de combustible: ${Math.round(level)}%`}>
        <circle cx="100" cy="100" r="91" fill="#fff" stroke="#e2e8f0" strokeWidth="2" />
        <path d="M 44.8 155.2 A 78 78 0 1 1 155.2 155.2" fill="none" stroke="#0f172a" strokeWidth="5" strokeLinecap="round" />
        <path d="M 44.8 155.2 A 78 78 0 1 1 155.2 155.2" fill="none" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" pathLength="100" strokeDasharray="20 100" />

        {TICKS.map((tick, index) => (
          <line
            key={index}
            x1={tick.x1} y1={tick.y1} x2={tick.x2} y2={tick.y2}
            stroke={tick.reserve ? "#ef4444" : "#0f172a"}
            strokeWidth={tick.isMajor ? 3 : 2}
            strokeLinecap="round"
          />
        ))}

        <text x="35" y="169" fill="#0f172a" fontSize="17" fontWeight="800">E</text>
        <text x="157" y="169" fill="#0f172a" fontSize="17" fontWeight="800">F</text>

        <g
          style={{ transform: `rotate(${needleAngle}deg)`, transformOrigin: "100px 100px", transition: "transform 500ms ease" }}
        >
          <path d="M 96 101 L 100 37 L 104 101 Z" fill="#ef4444" />
        </g>
        <circle cx="100" cy="100" r="9" fill="#0f172a" />
        <circle cx="100" cy="100" r="3" fill="#fff" />
      </svg>
      <Fuel aria-hidden="true" className="absolute left-1/2 top-[61%] h-[12%] w-[12%] -translate-x-1/2 text-slate-900" strokeWidth={2.25} />
    </div>
  );
}
