import React, { useLayoutEffect, useMemo, useState } from 'react';
import { getBulbPathsForLetter } from './bulbLetterPaths';

const SVG_NS = 'http://www.w3.org/2000/svg';

function bulbCountForChar(char: string): number {
  if ('MWQGDO08B'.includes(char)) {
    return 6;
  }
  if ('IL1i'.includes(char)) {
    return 4;
  }
  return 5;
}

function sampleBulbPoints(pathDs: string[], targetCount: number): { x: number; y: number }[] {
  if (targetCount < 1 || pathDs.length === 0) {
    return [];
  }

  const paths = pathDs.map((d) => {
    const p = document.createElementNS(SVG_NS, 'path');
    p.setAttribute('d', d);
    return p;
  });

  const segments = paths
    .map((p) => ({ path: p, len: p.getTotalLength() }))
    .filter((s) => s.len >= 0.5);

  const totalLen = segments.reduce((a, s) => a + s.len, 0) || 1;

  const raw: { x: number; y: number }[] = [];
  segments.forEach(({ path, len }) => {
    const share = Math.max(1, Math.round((targetCount * len) / totalLen));
    for (let j = 0; j < share; j++) {
      const t = share === 1 ? 0.5 : (j + 0.5) / share;
      const pt = path.getPointAtLength(t * len);
      raw.push({ x: pt.x, y: pt.y });
    }
  });

  if (raw.length === 0) {
    return [];
  }

  if (raw.length === targetCount) {
    return raw;
  }
  if (raw.length > targetCount) {
    const step = (raw.length - 1) / Math.max(1, targetCount - 1);
    return Array.from({ length: targetCount }, (_, i) => {
      const idx = Math.round(i * step);
      return raw[Math.min(idx, raw.length - 1)];
    });
  }

  const padded = [...raw];
  while (padded.length < targetCount) {
    padded.push(raw[raw.length - 1]);
  }
  return padded.slice(0, targetCount);
}

interface BulbChannelLetterProps {
  letter: string;
  letterIndex: number;
}

const BulbChannelLetter: React.FC<BulbChannelLetterProps> = ({
  letter,
  letterIndex,
}) => {
  const ch = letter.toUpperCase();
  const pathDs = useMemo(() => getBulbPathsForLetter(ch), [ch]);
  const n = useMemo(() => bulbCountForChar(ch), [ch]);

  const uid = useMemo(
    () => `bch-${ch}-${letterIndex}-${Math.random().toString(36).slice(2, 9)}`,
    [ch, letterIndex],
  );

  const gradChannel = `${uid}-ch`;
  const gradBulb = `${uid}-bulb`;
  const filBulb = `${uid}-bulbBloom`;

  const [points, setPoints] = useState<{ x: number; y: number }[]>([]);

  useLayoutEffect(() => {
    setPoints(sampleBulbPoints(pathDs, n));
  }, [pathDs, n]);

  /* Channel wall thickness — chunky vintage marquee */
  const strokeW = 15;

  return (
    <div className="BulbChannelSign-letterCell">
      <svg
        className="BulbChannelSign-letterSvg"
        viewBox="0 0 100 112"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden
      >
        <defs>
          {/* Inner channel “floor” — muted gold / ochre like reference */}
          <linearGradient id={gradChannel} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#e2c46e" />
            <stop offset="28%" stopColor="#c29b40" />
            <stop offset="55%" stopColor="#a37e2d" />
            <stop offset="100%" stopColor="#5c4016" />
          </linearGradient>

          <radialGradient id={gradBulb} cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#fffef8" />
            <stop offset="35%" stopColor="#fff5e1" />
            <stop offset="62%" stopColor="#ffd54a" />
            <stop offset="100%" stopColor="#c07820" />
          </radialGradient>

          <filter
            id={filBulb}
            x="-80%"
            y="-80%"
            width="260%"
            height="260%"
            colorInterpolationFilters="sRGB"
          >
            <feGaussianBlur in="SourceGraphic" stdDeviation="1.1" result="a1" />
            <feGaussianBlur in="SourceGraphic" stdDeviation="2.8" result="a2" />
            <feColorMatrix
              in="a2"
              type="matrix"
              values="1.1 0 0 0 0  0 1 0 0 0  0 0 0.75 0 0  0 0 0 0.9 0"
              result="warm"
            />
            <feMerge>
              <feMergeNode in="warm" />
              <feMergeNode in="a1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Deep outer casing */}
        {pathDs.map((d, i) => (
          <path
            key={`rim-deep-${i.toString()}`}
            d={d}
            fill="none"
            stroke="#0d0d0d"
            strokeWidth={strokeW + 9}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {/* Matte metal lip — #222 range */}
        {pathDs.map((d, i) => (
          <path
            key={`rim-mid-${i.toString()}`}
            d={d}
            fill="none"
            stroke="#1f1f1f"
            strokeWidth={strokeW + 6}
            strokeLinejoin="round"
            strokeLinecap="round"
          />
        ))}

        {pathDs.map((d, i) => (
          <path
            key={`rim-lit-${i.toString()}`}
            d={d}
            fill="none"
            stroke="#383838"
            strokeWidth={strokeW + 3.5}
            strokeLinejoin="round"
            strokeLinecap="round"
            opacity={0.9}
          />
        ))}

        {/* Warm reflective channel interior (stroke reads as letter body) */}
        {pathDs.map((d, i) => (
          <path
            key={`gold-${i.toString()}`}
            d={d}
            fill="none"
            stroke={`url(#${gradChannel})`}
            strokeWidth={strokeW}
            strokeLinejoin="round"
            strokeLinecap="round"
            className="BulbChannelSign-channelStroke"
          />
        ))}

        {/* Soft inner shadow on lower inside edge */}
        {pathDs.map((d, i) => (
          <path
            key={`inset-${i.toString()}`}
            d={d}
            fill="none"
            stroke="rgba(0,0,0,0.28)"
            strokeWidth={strokeW - 2}
            strokeLinejoin="round"
            strokeLinecap="round"
            transform="translate(0, 1.1)"
            style={{ pointerEvents: 'none' }}
          />
        ))}

        {/* Top lip glint */}
        {pathDs.map((d, i) => (
          <path
            key={`hi-${i.toString()}`}
            d={d}
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth={1.8}
            strokeLinejoin="round"
            strokeLinecap="round"
            transform="translate(0 -0.55)"
          />
        ))}

        {points.map((p, i) => (
          <circle
            key={`${i.toString()}-${p.x.toFixed(1)}`}
            className="BulbChannelSign-bulbSvg"
            cx={p.x}
            cy={p.y}
            r={4}
            fill={`url(#${gradBulb})`}
            stroke="rgba(45, 32, 18, 0.45)"
            strokeWidth={0.35}
            filter={`url(#${filBulb})`}
            style={{
              animationDelay: `${(letterIndex * 0.14 + i * 0.05).toFixed(3)}s`,
            }}
          />
        ))}
      </svg>
    </div>
  );
};

export default BulbChannelLetter;
