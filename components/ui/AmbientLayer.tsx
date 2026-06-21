export default function AmbientLayer() {
  return (
    <div
      aria-hidden
      className="pointer-events-none fixed inset-0 z-0"
      style={{
        background: [
          "radial-gradient(50% 60% at 88% 30%, rgba(200,134,46,0.10) 0%, rgba(10,8,7,0) 60%)",
          "radial-gradient(60% 70% at 10% 90%, rgba(139,69,19,0.14) 0%, rgba(10,8,7,0) 65%)",
          "radial-gradient(80% 80% at 50% 50%, rgba(10,8,7,0) 40%, rgba(5,4,3,0.85) 100%)",
        ].join(", "),
      }}
    >
      <div
        className="absolute inset-0 opacity-[0.04] mix-blend-overlay"
        style={{
          backgroundImage:
            "url(\"data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.95 0 0 0 0 0.85 0 0 0 0 0.7 0 0 0 0.5 0'/></filter><rect width='200' height='200' filter='url(%23n)'/></svg>\")",
          backgroundSize: "200px 200px",
        }}
      />
    </div>
  );
}
