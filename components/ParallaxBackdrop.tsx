"use client";

export function ParallaxBackdrop() {
  return (
    <div className="parallax-backdrop fixed inset-0 z-0 overflow-hidden" aria-hidden="true">
      <div className="parallax-image absolute inset-[-9vh_-8vw] bg-[url('/cinematic-backdrop.svg')] bg-cover bg-center opacity-80" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_18%,rgba(177,133,255,0.18),transparent_28rem),radial-gradient(circle_at_20%_68%,rgba(123,77,255,0.14),transparent_25rem),linear-gradient(90deg,rgba(5,6,10,0.55),rgba(5,6,10,0.12)_48%,rgba(5,6,10,0.7))]" />
      <div className="parallax-slice absolute left-[6vw] top-[16vh] h-[38vh] w-[18vw] min-w-40 rotate-[-10deg] overflow-hidden rounded-lg border border-signal/18 bg-signal/7 shadow-glow">
        {/* Replace /my-pic.jpg with your actual image path */}
        <img src="/self_image2.jpg" alt="Profile" className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-500 hover:opacity-100" />
      </div>
      <div className="parallax-slice absolute bottom-[10vh] right-[8vw] h-[24vh] w-[30vw] min-w-52 rotate-[7deg] overflow-hidden rounded-lg border border-ember/16 bg-ember/7 shadow-ember">
        <img src="/bg_unique.png" alt="Unique Background" className="absolute inset-0 h-full w-full object-cover opacity-70 transition-opacity duration-500 hover:opacity-100" />
      </div>
    </div>
  );
}
