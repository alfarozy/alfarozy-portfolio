import { memo } from "react";
import { useTheme } from "@/context/ThemeContext";

interface CosmicOverviewDecorationProps {
  className?: string;
}

export const CosmicOverviewDecoration = memo(({ className = "" }: CosmicOverviewDecorationProps) => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className={`pointer-events-none select-none absolute inset-0 overflow-hidden ${className}`}
      aria-hidden="true"
    >
      {/* Soft atmospheric blue/cyan glow concentrated on the right */}
      <div
        className="absolute top-1/2 -translate-y-1/2 right-[5%] sm:right-[10%] w-72 sm:w-96 h-72 sm:h-96 rounded-full blur-3xl transition-opacity duration-700"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(43, 122, 236, 0.22) 0%, rgba(93, 206, 255, 0.1) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(43, 122, 236, 0.09) 0%, rgba(93, 206, 255, 0.03) 45%, transparent 70%)",
        }}
      />

      {/* ROCKET CONTAINER: positioned to the right of the Hero content */}
      <div className="absolute top-[18%] sm:top-[22%] md:top-[26%] right-[5%] sm:right-[9%] md:right-[14%] flex flex-col items-center">
        {/* Animated Rocket with smooth slow glide */}
        <div className="relative animate-[cosmic-rocket_12s_ease-in-out_infinite]">
          {/* Ion Thruster Propulsion Glow Aura */}
          <div
            className="absolute -bottom-4 -left-4 w-12 h-12 rounded-full blur-md animate-pulse"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(93, 206, 255, 0.75) 0%, rgba(43, 122, 236, 0.45) 50%, transparent 80%)"
                : "radial-gradient(circle, rgba(93, 206, 255, 0.5) 0%, rgba(43, 122, 236, 0.25) 50%, transparent 80%)",
            }}
          />

          {/* Stardust Ion Exhaust Trail particles */}
          <div className="absolute -bottom-7 -left-7 flex flex-col items-center gap-1.5 opacity-80">
            <span className="w-2 h-2 rounded-full bg-cyan-300 shadow-[0_0_8px_#5DCEFF] blur-[0.5px] animate-ping" />
            <span className="w-1.5 h-1.5 rounded-full bg-sky-400/80 shadow-[0_0_6px_#38bdf8] blur-[0.5px]" />
            <span className="w-1 h-1 rounded-full bg-white/70 blur-[0.3px]" />
          </div>

          {/* CUSTOM STYLED COSMIC BLUE STARLIGHT ROCKET */}
          <div className="transform rotate-45 transition-transform duration-500">
            <svg
              className="w-12 h-auto sm:w-14 sm:h-auto md:w-16 md:h-auto drop-shadow-[0_0_20px_rgba(93,206,255,0.55)]"
              viewBox="0 0 90 145"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                {/* Rocket Hull Gradient: Deep Space Titanium & Cyber Blue */}
                <linearGradient id="rocket-hull-grad" x1="15" y1="20" x2="75" y2="85" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#1e293b" />
                  <stop offset="35%" stopColor="#0f172a" />
                  <stop offset="70%" stopColor="#1e3a8a" />
                  <stop offset="100%" stopColor="#2563eb" />
                </linearGradient>

                {/* Cockpit Canopy Gradient: Starlight Glint & Cyan Glass */}
                <linearGradient id="rocket-cockpit-grad" x1="45" y1="36" x2="45" y2="54" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" />
                  <stop offset="35%" stopColor="#e0f2fe" />
                  <stop offset="70%" stopColor="#5DCEFF" />
                  <stop offset="100%" stopColor="#1d4ed8" />
                </linearGradient>

                {/* Ion Plasma Engine Flame */}
                <linearGradient id="rocket-plasma-flame" x1="45" y1="94" x2="45" y2="142" gradientUnits="userSpaceOnUse">
                  <stop offset="0%" stopColor="#ffffff" stopOpacity="0.95" />
                  <stop offset="25%" stopColor="#5DCEFF" stopOpacity="0.9" />
                  <stop offset="65%" stopColor="#2B7AEC" stopOpacity="0.65" />
                  <stop offset="100%" stopColor="#1e3a8a" stopOpacity="0" />
                </linearGradient>
              </defs>

              {/* 1. ION ENGINE PLASMA EXHAUST (Shooting backward) */}
              <g>
                {/* Outer Plasma Plume */}
                <path
                  d="M 38 94 Q 45 140 45 144 Q 45 140 52 94 Z"
                  fill="url(#rocket-plasma-flame)"
                />
                {/* Intense Laser Core */}
                <path
                  d="M 42 94 Q 45 118 45 120 Q 45 118 48 94 Z"
                  fill="#ffffff"
                  opacity="0.95"
                />
                {/* Extra Plasma Glow Ring */}
                <ellipse cx="45" cy="95" rx="7" ry="2" fill="#5DCEFF" opacity="0.8" />
              </g>

              {/* 2. ENGINE NOZZLE */}
              <polygon points="36,94 54,94 52,88 38,88" fill="#0f172a" stroke="#5DCEFF" strokeWidth="1" />

              {/* 3. SWEPT DELTA WINGS (Left & Right) */}
              {/* Left Wing */}
              <path
                d="M 32 64 L 10 90 L 33 86 Z"
                fill="#0b1329"
                stroke="#5DCEFF"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Left Wingtip Starlight Beacon */}
              <circle cx="10" cy="90" r="1.5" fill="#ffffff" />
              <circle cx="10" cy="90" r="3.5" fill="#5DCEFF" opacity="0.75" />

              {/* Right Wing */}
              <path
                d="M 58 64 L 80 90 L 57 86 Z"
                fill="#0b1329"
                stroke="#5DCEFF"
                strokeWidth="1.2"
                strokeLinejoin="round"
              />
              {/* Right Wingtip Starlight Beacon */}
              <circle cx="80" cy="90" r="1.5" fill="#ffffff" />
              <circle cx="80" cy="90" r="3.5" fill="#5DCEFF" opacity="0.75" />

              {/* 4. MAIN FUSELAGE (AERODYNAMIC TITANIUM HULL) */}
              <path
                d="M 45 12 Q 31 45 31 65 L 33 88 L 57 88 L 59 65 Q 59 45 45 12 Z"
                fill="url(#rocket-hull-grad)"
                stroke="#5DCEFF"
                strokeWidth="1.4"
                strokeLinejoin="round"
              />

              {/* Sleek cyber panel seams */}
              <path d="M 34 68 L 41 85" stroke="rgba(93, 206, 255, 0.45)" strokeWidth="1" />
              <path d="M 56 68 L 49 85" stroke="rgba(93, 206, 255, 0.45)" strokeWidth="1" />

              {/* 5. CENTER DORSAL RIDGE */}
              <line x1="45" y1="56" x2="45" y2="85" stroke="#5DCEFF" strokeWidth="1.5" strokeLinecap="round" />

              {/* 6. COCKPIT VIEWPORT (CYAN & STARLIGHT REFLECTION) */}
              <rect
                x="40"
                y="36"
                width="10"
                height="17"
                rx="5"
                fill="url(#rocket-cockpit-grad)"
                stroke="#e0f2fe"
                strokeWidth="1"
              />

              {/* 7. NOSE CONE STARBURST (4-Point Starlight Glint / Diffraction Spike) */}
              <g transform="translate(45, 12)">
                <line x1="-10" y1="0" x2="10" y2="0" stroke="#ffffff" strokeWidth="1.4" />
                <line x1="0" y1="-10" x2="0" y2="10" stroke="#ffffff" strokeWidth="1.4" />
                <line x1="-4" y1="-4" x2="4" y2="4" stroke="#5DCEFF" strokeWidth="1" />
                <line x1="-4" y1="4" x2="4" y2="-4" stroke="#5DCEFF" strokeWidth="1" />
                <circle cx="0" cy="0" r="2" fill="#ffffff" />
                <circle cx="0" cy="0" r="5" fill="#5DCEFF" opacity="0.6" />
              </g>
            </svg>
          </div>
        </div>

        {/* Sparkling cluster right around the rocket path (Cosmic Cyan & Diamond Starlight) */}
        <div className="absolute -top-7 -right-7 animate-pulse">
          <svg className="w-6 h-6 drop-shadow-[0_0_8px_#5DCEFF]" viewBox="0 0 24 24" fill="none">
            <line x1="12" y1="2" x2="12" y2="22" stroke="#ffffff" strokeWidth="1.5" />
            <line x1="2" y1="12" x2="22" y2="12" stroke="#ffffff" strokeWidth="1.5" />
            <circle cx="12" cy="12" r="2.5" fill="#ffffff" />
            <circle cx="12" cy="12" r="5" fill="#5DCEFF" opacity="0.5" />
          </svg>
        </div>
      </div>

      {/* Sparkling Accent 1: Upper right (Cosmic Starlight Diamond) */}
      <div className="absolute top-[12%] right-[22%] sm:right-[26%] animate-[pulse_4s_ease-in-out_infinite]">
        <svg className="w-5 h-5 drop-shadow-[0_0_8px_rgba(93,206,255,0.7)]" viewBox="0 0 24 24" fill="none">
          <line x1="12" y1="3" x2="12" y2="21" stroke="#5DCEFF" strokeWidth="1.3" />
          <line x1="3" y1="12" x2="21" y2="12" stroke="#5DCEFF" strokeWidth="1.3" />
          <circle cx="12" cy="12" r="2" fill="#ffffff" />
        </svg>
      </div>

      {/* Sparkling Accent 2: Lower right near bottom of hero (Cyan Starburst) */}
      <div className="absolute bottom-[20%] right-[10%] sm:right-[18%] animate-[pulse_5s_ease-in-out_infinite]">
        <svg className="w-4 h-4 drop-shadow-[0_0_6px_rgba(56,189,248,0.7)]" viewBox="0 0 24 24" fill="none">
          <line x1="12" y1="4" x2="12" y2="20" stroke="#38BDF8" strokeWidth="1.2" />
          <line x1="4" y1="12" x2="20" y2="12" stroke="#38BDF8" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="1.5" fill="#ffffff" />
        </svg>
      </div>

      {/* Sparkling Accent 3: Subtle glimmer near badges (Deep Sky Sparkle) */}
      <div className="hidden sm:block absolute top-[48%] right-[32%] animate-[pulse_6s_ease-in-out_infinite]">
        <svg className="w-3.5 h-3.5 drop-shadow-[0_0_5px_rgba(43,122,236,0.6)]" viewBox="0 0 24 24" fill="none">
          <line x1="12" y1="5" x2="12" y2="19" stroke="#60A5FA" strokeWidth="1.2" />
          <line x1="5" y1="12" x2="19" y2="12" stroke="#60A5FA" strokeWidth="1.2" />
          <circle cx="12" cy="12" r="1.2" fill="#ffffff" />
        </svg>
      </div>
    </div>
  );
});

CosmicOverviewDecoration.displayName = "CosmicOverviewDecoration";
