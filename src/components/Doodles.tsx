/** Hand-drawn accents (underline, arrow, sparkle) that give the page a human touch. */

export function Squiggle({ color = '#f8bc17' }: { color?: string }) {
  return (
    <svg className="squiggle" viewBox="0 0 220 18" preserveAspectRatio="none" aria-hidden="true">
      <path
        d="M3 12 C 30 4, 52 16, 80 9 S 130 3, 156 10 S 200 14, 217 6"
        fill="none"
        stroke={color}
        strokeWidth="5"
        strokeLinecap="round"
      />
    </svg>
  );
}

export function DoodleArrow({ className = '' }: { className?: string }) {
  return (
    <svg className={`doodle-arrow ${className}`} viewBox="0 0 90 70" aria-hidden="true">
      <path
        d="M80 8 C 60 6, 30 14, 22 40 C 19 50, 20 56, 22 62"
        fill="none"
        stroke="#122e4f"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeDasharray="1 7"
      />
      <path d="M12 52 L22 63 L31 51" fill="none" stroke="#122e4f" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export function Sparkle({ color = '#f8bc17', className = '' }: { color?: string; className?: string }) {
  return (
    <svg className={`sparkle ${className}`} viewBox="0 0 40 40" aria-hidden="true">
      <path d="M20 3 C 21 14, 26 19, 37 20 C 26 21, 21 26, 20 37 C 19 26, 14 21, 3 20 C 14 19, 19 14, 20 3 Z" fill={color} />
    </svg>
  );
}
