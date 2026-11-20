import type {
  ColorName,
  IconName,
  OptionVisual,
  QuestionVisual,
  ShapeName,
} from '@/lib/types';

const COLORS: Record<ColorName, string> = {
  green: '#2fa84f',
  blue: '#3eaae5',
  yellow: '#f8bc17',
};

function Shape({ shape, color, size = 44 }: { shape: ShapeName; color: ColorName; size?: number }) {
  const fill = COLORS[color];
  return (
    <svg width={size} height={size} viewBox="0 0 44 44" aria-hidden="true">
      {shape === 'circle' && <circle cx="22" cy="22" r="18" fill={fill} />}
      {shape === 'square' && <rect x="5" y="5" width="34" height="34" rx="6" fill={fill} />}
      {shape === 'triangle' && (
        <path d="M22 5 L40 38 H4 Z" fill={fill} stroke={fill} strokeWidth="3" strokeLinejoin="round" />
      )}
    </svg>
  );
}

function Dots({ n, perRow = 3, dot = 12 }: { n: number; perRow?: number; dot?: number }) {
  return (
    <span
      className="dots"
      style={{ gridTemplateColumns: `repeat(${Math.min(n, perRow)}, ${dot}px)` }}
      aria-hidden="true"
    >
      {Array.from({ length: n }, (_, i) => (
        <span key={i} className="dots__dot" style={{ width: dot, height: dot }} />
      ))}
    </span>
  );
}

function Unknown() {
  // The mark itself comes from CSS so it shows ؟ in Arabic and ? in English.
  return <span className="unknown" aria-label="?" />;
}

function Icon({ name }: { name: IconName }) {
  const common = {
    width: 48,
    height: 48,
    viewBox: '0 0 48 48',
    fill: 'none',
    stroke: '#122e4f',
    strokeWidth: 2.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  };
  if (name === 'mouse') {
    return (
      <svg {...common}>
        <rect x="15" y="6" width="18" height="36" rx="9" fill="#e6f2fc" />
        <path d="M24 6v12M15 18h18" />
      </svg>
    );
  }
  if (name === 'keyboard') {
    return (
      <svg {...common}>
        <rect x="4" y="13" width="40" height="22" rx="4" fill="#e5f5eb" />
        <path d="M11 20h2M18 20h2M25 20h2M32 20h2M11 26h2M18 26h2M25 26h2M32 26h2M16 31h16" />
      </svg>
    );
  }
  if (name === 'screen') {
    return (
      <svg {...common}>
        <rect x="5" y="8" width="38" height="25" rx="3" fill="#e6f2fc" />
        <path d="M24 33v7M15 40h18" />
      </svg>
    );
  }
  return (
    <svg {...common}>
      <path d="M8 19h7l9-8v26l-9-8H8z" fill="#fef6e5" />
      <path d="M31 18c2 2 2 10 0 12M36 13c5 5 5 17 0 22" />
    </svg>
  );
}

export function OptionPicture({ visual }: { visual: OptionVisual }) {
  if (visual.kind === 'shape') return <Shape shape={visual.shape} color={visual.color} />;
  if (visual.kind === 'dots') return <Dots n={visual.n} perRow={visual.n > 4 ? 3 : visual.n} dot={14} />;
  return <Icon name={visual.name} />;
}

function RobotGrid({
  size,
  start,
  marks,
}: {
  size: number;
  start: [number, number];
  marks: { label: string; at: [number, number] }[];
}) {
  const cell = 60;
  const total = size * cell;
  const cx = start[0] * cell + cell / 2;
  const cy = start[1] * cell + cell / 2;
  return (
    <svg
      className="robot-grid"
      viewBox={`-2 -2 ${total + 4} ${total + 4}`}
      role="img"
      aria-label="شبكة مربعات فيها روبوت وأربع مربعات متعلّمة بالحروف أ ب ج د"
    >
      {Array.from({ length: size * size }, (_, i) => {
        const col = i % size;
        const row = Math.floor(i / size);
        return (
          <rect
            key={i}
            x={col * cell}
            y={row * cell}
            width={cell}
            height={cell}
            fill="#ffffff"
            stroke="#d5dee8"
            strokeWidth="2"
          />
        );
      })}
      {marks.map((m) => (
        <g key={m.label}>
          <rect
            x={m.at[0] * cell + 6}
            y={m.at[1] * cell + 6}
            width={cell - 12}
            height={cell - 12}
            rx="10"
            fill="#fef6e5"
            stroke="#f8bc17"
            strokeWidth="2"
          />
          <text
            x={m.at[0] * cell + cell / 2}
            y={m.at[1] * cell + cell / 2 + 8}
            textAnchor="middle"
            fontSize="24"
            fontWeight="700"
            fontFamily="Cairo, sans-serif"
            fill="#122e4f"
          >
            {m.label}
          </text>
        </g>
      ))}
      {/* Robot, facing up */}
      <g>
        <path d={`M${cx} ${cy - 27} l7 9 h-14 z`} fill="#2fa84f" />
        <rect x={cx - 15} y={cy - 14} width="30" height="26" rx="7" fill="#3eaae5" />
        <circle cx={cx - 6} cy={cy - 3} r="3.5" fill="#ffffff" />
        <circle cx={cx + 6} cy={cy - 3} r="3.5" fill="#ffffff" />
        <rect x={cx - 6} y={cy + 4} width="12" height="3" rx="1.5" fill="#122e4f" />
      </g>
    </svg>
  );
}

export function QuestionPicture({ visual }: { visual: QuestionVisual }) {
  if (visual.kind === 'shapeSeq') {
    return (
      <div className="seq">
        {visual.items.map((item, i) =>
          item ? <Shape key={i} shape={item.shape} color={item.color} size={40} /> : <Unknown key={i} />,
        )}
      </div>
    );
  }
  if (visual.kind === 'dotSeq') {
    return (
      <div className="seq seq--boxed">
        {visual.counts.map((n, i) => (
          <span key={i} className="seq__box">
            {n === null ? <Unknown /> : <Dots n={n} perRow={2} dot={14} />}
          </span>
        ))}
      </div>
    );
  }
  if (visual.kind === 'shapeGrid') {
    return (
      <div className="grid3">
        {visual.cells.map((cell, i) => (
          <span key={i} className="grid3__cell">
            {cell ? <Shape shape={cell.shape} color={cell.color} size={40} /> : <Unknown />}
          </span>
        ))}
      </div>
    );
  }
  if (visual.kind === 'dotGrid') {
    return (
      <div className="grid3">
        {visual.counts.map((n, i) => (
          <span key={i} className="grid3__cell">
            {n === null ? <Unknown /> : <Dots n={n} perRow={3} dot={11} />}
          </span>
        ))}
      </div>
    );
  }
  return <RobotGrid size={visual.size} start={visual.start} marks={visual.marks} />;
}
