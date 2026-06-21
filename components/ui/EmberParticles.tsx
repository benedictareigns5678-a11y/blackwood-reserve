/**
 * Brass embers drifting upward. Pure CSS keyframes — no JS cycles.
 * Sits above the video/background, below the text (z-2). Defaults to the
 * hero's six-ember field; sections can pass their own quieter set.
 *
 * Under prefers-reduced-motion each ember becomes a static 0.3-opacity speck.
 */
export type Ember = {
  x: string;
  duration: number; // seconds, 18–28 keeps them out of sync
  delay: number; // seconds, 0–15
  mobileHidden?: boolean; // hide below md for performance
};

const heroEmbers: Ember[] = [
  { x: "8%", duration: 24, delay: 0 },
  { x: "22%", duration: 19, delay: 6 },
  { x: "41%", duration: 27, delay: 11 },
  { x: "58%", duration: 21, delay: 3 },
  { x: "73%", duration: 25, delay: 14 },
  { x: "89%", duration: 18, delay: 8 },
];

export default function EmberParticles({
  embers = heroEmbers,
}: {
  embers?: Ember[];
}) {
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
    >
      <style>{`
        @keyframes heroEmberDrift {
          0%   { transform: translateY(20vh); opacity: 0; }
          20%  { opacity: 0.7; }
          80%  { opacity: 0.7; }
          100% { transform: translateY(-20vh); opacity: 0; }
        }
        .hero-ember {
          position: absolute;
          top: 50%;
          width: 3px;
          height: 3px;
          border-radius: 9999px;
          background: #C8862E;
          box-shadow: 0 0 6px 1px rgba(184, 146, 76, 0.6);
          opacity: 0;
          will-change: transform, opacity;
          animation-name: heroEmberDrift;
          animation-timing-function: linear;
          animation-iteration-count: infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-ember {
            animation: none !important;
            transform: none !important;
            opacity: 0.3 !important;
          }
        }
      `}</style>
      {embers.map((e, i) => (
        <span
          key={i}
          className={`hero-ember${e.mobileHidden ? " max-md:hidden" : ""}`}
          style={{
            left: e.x,
            animationDuration: `${e.duration}s`,
            animationDelay: `${e.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
