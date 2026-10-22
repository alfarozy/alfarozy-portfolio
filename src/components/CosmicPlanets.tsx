import { useEffect, useRef, memo } from "react";
import { useTheme } from "@/context/ThemeContext";

export const CosmicPlanets = memo(() => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const containerRef = useRef<HTMLDivElement>(null);
  const saturnRef = useRef<HTMLDivElement>(null);
  const earthRef = useRef<HTMLDivElement>(null);

  // Smooth mouse parallax using requestAnimationFrame
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    if (prefersReducedMotion) return;

    let targetX = 0;
    let targetY = 0;
    let currentX = 0;
    let currentY = 0;
    let animId: number;

    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to range [-1, 1]
      targetX = (e.clientX / window.innerWidth) * 2 - 1;
      targetY = (e.clientY / window.innerHeight) * 2 - 1;
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    const updateParallax = () => {
      currentX += (targetX - currentX) * 0.05;
      currentY += (targetY - currentY) * 0.05;

      // Saturn: distant, subtle movement
      if (saturnRef.current) {
        saturnRef.current.style.transform = `translate3d(${currentX * 12}px, ${currentY * 10}px, 0)`;
      }

      // Earth: closer foreground body, smooth counter-movement
      if (earthRef.current) {
        earthRef.current.style.transform = `translate3d(${currentX * -14}px, ${currentY * -12}px, 0)`;
      }

      animId = requestAnimationFrame(updateParallax);
    };

    animId = requestAnimationFrame(updateParallax);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animId);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* ========================================================
          1. STYLIZED BLUE SATURN (SATURNUS BIRU & BINTANG) - Top Right
          ======================================================== */}
      <div
        ref={saturnRef}
        className="absolute top-[7%] sm:top-[10%] right-[2%] sm:right-[5%] md:right-[7%] transition-opacity duration-700"
        style={{
          opacity: isDark ? 0.95 : 0.32,
        }}
      >
        {/* Soft Electric Blue & Cyan Aura */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-52 sm:w-68 h-52 sm:h-68 rounded-full blur-3xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(43, 122, 236, 0.28) 0%, rgba(93, 206, 255, 0.12) 50%, transparent 70%)",
          }}
        />

        {/* Floating zero-gravity motion */}
        <div className="relative animate-[cosmic-float-slow_16s_ease-in-out_infinite]">
          <svg
            className="w-44 sm:w-56 md:w-64 h-auto drop-shadow-[0_0_25px_rgba(43,122,236,0.4)]"
            viewBox="0 0 320 200"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Filter glow for neon rings and stars */}
              <filter id="saturn-glow" x="-20%" y="-20%" width="140%" height="140%">
                <feGaussianBlur stdDeviation="3" result="blur" />
                <feComposite in="SourceGraphic" in2="blur" operator="over" />
              </filter>

              {/* Saturn Globe Gradient: Stylized Deep Blue / Cyan Atmospheric Bands */}
              <linearGradient id="saturn-blue-bands" x1="160" y1="52" x2="160" y2="148" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#1e3a8a" />
                <stop offset="14%" stopColor="#1e40af" />
                <stop offset="26%" stopColor="#2563eb" />
                <stop offset="38%" stopColor="#38bdf8" />
                <stop offset="48%" stopColor="#1d4ed8" />
                <stop offset="60%" stopColor="#5DCEFF" />
                <stop offset="72%" stopColor="#1e3a8a" />
                <stop offset="85%" stopColor="#0f172a" />
                <stop offset="100%" stopColor="#030712" />
              </linearGradient>

              {/* Spherical Starlight Shading */}
              <radialGradient id="saturn-blue-light" cx="34%" cy="28%" r="72%">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.7" />
                <stop offset="35%" stopColor="#38bdf8" stopOpacity="0.3" />
                <stop offset="60%" stopColor="#0f172a" stopOpacity="0.3" />
                <stop offset="88%" stopColor="#020617" stopOpacity="0.85" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.95" />
              </radialGradient>

              {/* Luminous Blue & Cyan Rings Gradient */}
              <linearGradient id="saturn-blue-rings" x1="20" y1="100" x2="300" y2="100" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#38bdf8" stopOpacity="0" />
                <stop offset="12%" stopColor="#2B7AEC" stopOpacity="0.4" />
                <stop offset="22%" stopColor="#5DCEFF" stopOpacity="0.9" />
                <stop offset="36%" stopColor="#e0f2fe" stopOpacity="0.95" />
                {/* Cassini Division gap */}
                <stop offset="40%" stopColor="#040816" stopOpacity="0.1" />
                <stop offset="43%" stopColor="#5DCEFF" stopOpacity="0.95" />
                <stop offset="60%" stopColor="#2563eb" stopOpacity="0.85" />
                <stop offset="74%" stopColor="#38bdf8" stopOpacity="0.4" />
                <stop offset="85%" stopColor="#1e3a8a" stopOpacity="0" />
              </linearGradient>

              {/* Shadow cast by globe onto the back of rings */}
              <radialGradient id="saturn-blue-ring-shadow" cx="50%" cy="50%" r="42%">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.9" />
                <stop offset="65%" stopColor="#020617" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0" />
              </radialGradient>

              {/* Ring shadow across the globe */}
              <linearGradient id="saturn-blue-equator-shadow" x1="160" y1="92" x2="160" y2="106" gradientUnits="userSpaceOnUse">
                <stop offset="0%" stopColor="#020617" stopOpacity="0.8" />
                <stop offset="100%" stopColor="#020617" stopOpacity="0" />
              </linearGradient>

              {/* Clips for Rings: Back (y < 0 in local coords) and Front (y >= 0) */}
              <clipPath id="saturn-blue-back-clip">
                <rect x="-160" y="-100" width="320" height="100" />
              </clipPath>
              <clipPath id="saturn-blue-front-clip">
                <rect x="-160" y="0" width="320" height="100" />
              </clipPath>
              <clipPath id="saturn-globe-clip">
                <circle cx="160" cy="100" r="46" />
              </clipPath>
            </defs>

            {/* Tilted celestial coordinate system (-24deg) */}
            <g transform="translate(160, 100) rotate(-24) translate(-160, -100)">
              {/* 1. BACK OF RINGS (behind globe) */}
              <g clipPath="url(#saturn-blue-back-clip)" transform="translate(160, 100)">
                <g transform="translate(-160, -100)">
                  {/* Outer glow stroke */}
                  <ellipse cx="160" cy="100" rx="136" ry="34" fill="none" stroke="url(#saturn-blue-rings)" strokeWidth="32" opacity="0.95" />
                  {/* Sharp neon inner & outer filaments */}
                  <ellipse cx="160" cy="100" rx="152" ry="38" fill="none" stroke="#5DCEFF" strokeWidth="1.2" opacity="0.6" />
                  <ellipse cx="160" cy="100" rx="146" ry="36.5" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.75" />
                  <ellipse cx="160" cy="100" rx="120" ry="30" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.65" />
                  {/* Stardust particle dashed ring */}
                  <ellipse cx="160" cy="100" rx="130" ry="32.5" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 7" opacity="0.5" />
                  {/* Planet shadow onto back of ring */}
                  <ellipse cx="180" cy="95" rx="44" ry="22" fill="url(#saturn-blue-ring-shadow)" />
                </g>
              </g>

              {/* 2. SATURN GLOBE (Stylized Blue & Stardust) */}
              <g>
                {/* Globe Base & Stylized Atmospheric Bands */}
                <circle cx="160" cy="100" r="46" fill="url(#saturn-blue-bands)" />

                {/* Stardust particles & constellations inside Saturn */}
                <g clipPath="url(#saturn-globe-clip)">
                  {/* Luminous cyan flow lines */}
                  <path d="M 116 88 Q 160 97 204 88" stroke="rgba(93, 206, 255, 0.4)" strokeWidth="1.2" fill="none" />
                  <path d="M 118 76 Q 160 84 202 76" stroke="rgba(56, 189, 248, 0.35)" strokeWidth="1" fill="none" />
                  <path d="M 118 114 Q 160 122 202 114" stroke="rgba(43, 122, 236, 0.4)" strokeWidth="1" fill="none" />

                  {/* Constellation star dots inside the globe */}
                  <circle cx="145" cy="80" r="1.3" fill="#ffffff" />
                  <circle cx="170" cy="74" r="1.1" fill="#5DCEFF" />
                  <circle cx="138" cy="108" r="1" fill="#e0f2fe" />
                  <circle cx="182" cy="112" r="1.2" fill="#5DCEFF" />
                  <circle cx="162" cy="122" r="0.9" fill="#ffffff" />
                  {/* Subtle connecting constellation stardust line */}
                  <polyline points="138,108 145,80 170,74 182,112" stroke="rgba(255, 255, 255, 0.2)" strokeWidth="0.6" strokeDasharray="2 3" fill="none" />
                </g>

                {/* Spherical Starlight & Night Terminator */}
                <circle cx="160" cy="100" r="46" fill="url(#saturn-blue-light)" />

                {/* Ring shadow across globe */}
                <path
                  d="M 115 97 Q 160 106 205 97 L 205 104 Q 160 113 115 104 Z"
                  fill="url(#saturn-blue-equator-shadow)"
                />

                {/* Luminous Cyan Atmosphere Edge */}
                <circle
                  cx="160"
                  cy="100"
                  r="46"
                  fill="none"
                  stroke="#5DCEFF"
                  strokeWidth="1.5"
                  opacity="0.8"
                />

                {/* Starburst diffraction spike (bintang bersinar) on Saturn's sunlit crescent */}
                <g transform="translate(136, 68)">
                  <line x1="-7" y1="0" x2="7" y2="0" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />
                  <line x1="0" y1="-7" x2="0" y2="7" stroke="#ffffff" strokeWidth="1.2" opacity="0.9" />
                  <circle cx="0" cy="0" r="1.5" fill="#ffffff" />
                  <circle cx="0" cy="0" r="3.5" fill="#5DCEFF" opacity="0.5" />
                </g>
              </g>

              {/* 3. FRONT OF RINGS (passes in front of globe) */}
              <g clipPath="url(#saturn-blue-front-clip)" transform="translate(160, 100)">
                <g transform="translate(-160, -100)">
                  <ellipse cx="160" cy="100" rx="136" ry="34" fill="none" stroke="url(#saturn-blue-rings)" strokeWidth="32" opacity="0.95" />
                  <ellipse cx="160" cy="100" rx="152" ry="38" fill="none" stroke="#5DCEFF" strokeWidth="1.2" opacity="0.6" />
                  <ellipse cx="160" cy="100" rx="146" ry="36.5" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.75" />
                  <ellipse cx="160" cy="100" rx="120" ry="30" fill="none" stroke="#38bdf8" strokeWidth="1.2" opacity="0.65" />
                  <ellipse cx="160" cy="100" rx="130" ry="32.5" fill="none" stroke="#ffffff" strokeWidth="1" strokeDasharray="3 7" opacity="0.5" />
                </g>
              </g>

              {/* Star sparkle on the outer ring edge */}
              <g transform="translate(292, 100)">
                <line x1="-5" y1="0" x2="5" y2="0" stroke="#ffffff" strokeWidth="1" opacity="0.85" />
                <line x1="0" y1="-5" x2="0" y2="5" stroke="#ffffff" strokeWidth="1" opacity="0.85" />
                <circle cx="0" cy="0" r="1.2" fill="#ffffff" />
              </g>
            </g>
          </svg>
        </div>
      </div>

      {/* ========================================================
          2. STYLIZED BLUE & STARRY EARTH (BUMI BIRU & BINTANG) - Bottom Right
          ======================================================== */}
      <div
        ref={earthRef}
        className="absolute bottom-20 sm:bottom-24 lg:bottom-28 right-3 sm:right-6 md:right-10 lg:right-12 transition-opacity duration-700"
        style={{
          opacity: isDark ? 0.95 : 0.35,
        }}
      >
        {/* Glowing Sapphire & Electric Cyan Cosmic Aura */}
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-28 sm:w-36 md:w-44 h-28 sm:h-36 md:h-44 rounded-full blur-2xl pointer-events-none"
          style={{
            background:
              "radial-gradient(circle, rgba(43, 122, 236, 0.35) 0%, rgba(93, 206, 255, 0.16) 45%, transparent 70%)",
          }}
        />

        {/* Floating counter-drift motion */}
        <div className="relative animate-[cosmic-float-reverse_20s_ease-in-out_infinite]">
          <svg
            className="w-20 sm:w-24 md:w-28 lg:w-32 h-auto drop-shadow-[0_0_24px_rgba(93,206,255,0.5)]"
            viewBox="0 0 260 260"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <defs>
              {/* Deep Cosmic Ocean Sphere Gradient */}
              <radialGradient id="earth-blue-sphere" cx="35%" cy="32%" r="68%">
                <stop offset="0%" stopColor="#38bdf8" />
                <stop offset="25%" stopColor="#2563eb" />
                <stop offset="55%" stopColor="#1e3a8a" />
                <stop offset="85%" stopColor="#0b1739" />
                <stop offset="100%" stopColor="#020617" />
              </radialGradient>

              {/* Day/Night Terminator Shading */}
              <radialGradient id="earth-blue-terminator" cx="32%" cy="30%" r="72%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.35" />
                <stop offset="40%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="65%" stopColor="#020617" stopOpacity="0.5" />
                <stop offset="85%" stopColor="#020617" stopOpacity="0.88" />
                <stop offset="100%" stopColor="#000000" stopOpacity="0.98" />
              </radialGradient>

              {/* Luminous Cyan Atmospheric Rim (Fresnel limb light) */}
              <radialGradient id="earth-cyan-limb" cx="30%" cy="28%" r="70%">
                <stop offset="0%" stopColor="#e0f2fe" stopOpacity="0.8" />
                <stop offset="22%" stopColor="#5DCEFF" stopOpacity="0.45" />
                <stop offset="50%" stopColor="#2B7AEC" stopOpacity="0.15" />
                <stop offset="90%" stopColor="#000000" stopOpacity="0" />
              </radialGradient>

              {/* Clip path inside Earth globe */}
              <clipPath id="earth-blue-clip">
                <circle cx="130" cy="130" r="88" />
              </clipPath>
            </defs>

            {/* Orbiting Stardust Celestial Ring around Earth */}
            <g transform="translate(130, 130) rotate(-18) translate(-130, -130)">
              <ellipse
                cx="130"
                cy="130"
                rx="118"
                ry="38"
                fill="none"
                stroke="rgba(93, 206, 255, 0.25)"
                strokeWidth="1"
                strokeDasharray="4 8"
              />
              {/* Mini glowing celestial node on the orbital ring */}
              <circle cx="240" cy="130" r="2" fill="#ffffff" />
              <circle cx="240" cy="130" r="4.5" fill="#5DCEFF" opacity="0.6" />
            </g>

            {/* Atmospheric Outer Corona Rings */}
            <circle
              cx="130"
              cy="130"
              r="92"
              fill="none"
              stroke="#5DCEFF"
              strokeWidth="1.5"
              opacity="0.75"
            />
            <circle
              cx="130"
              cy="130"
              r="96"
              fill="none"
              stroke="#2B7AEC"
              strokeWidth="0.8"
              strokeDasharray="2 6"
              opacity="0.45"
            />

            {/* EARTH GLOBE CONTENT */}
            <g clipPath="url(#earth-blue-clip)">
              {/* 1. Base Oceanic Blue Sphere */}
              <circle cx="130" cy="130" r="88" fill="url(#earth-blue-sphere)" />

              {/* 2. Stylized Blue & Cyan Landmass Energy Silhouettes (No brown/green!) */}
              <path
                d="M 90 70 Q 105 60 122 64 Q 138 68 148 80 Q 152 95 142 105 Q 130 112 118 108 Q 105 118 96 105 Q 86 90 90 70 Z"
                fill="#2563eb"
                opacity="0.55"
              />
              <path
                d="M 90 70 Q 105 60 122 64 Q 138 68 148 80 Q 152 95 142 105 Q 130 112 118 108 Q 105 118 96 105 Q 86 90 90 70 Z"
                stroke="#5DCEFF"
                strokeWidth="1.2"
                fill="none"
                opacity="0.75"
              />

              <path
                d="M 135 85 Q 155 78 170 92 Q 178 110 166 125 Q 150 132 138 120 Q 128 105 135 85 Z"
                fill="#1d4ed8"
                opacity="0.5"
              />
              <path
                d="M 135 85 Q 155 78 170 92 Q 178 110 166 125 Q 150 132 138 120 Q 128 105 135 85 Z"
                stroke="#38bdf8"
                strokeWidth="1.2"
                fill="none"
                opacity="0.7"
              />

              <path
                d="M 98 118 Q 112 115 120 125 Q 122 145 108 160 Q 95 164 90 150 Q 85 132 98 118 Z"
                fill="#2563eb"
                opacity="0.45"
              />
              <path
                d="M 98 118 Q 112 115 120 125 Q 122 145 108 160 Q 95 164 90 150 Q 85 132 98 118 Z"
                stroke="#5DCEFF"
                strokeWidth="1"
                fill="none"
                opacity="0.65"
              />

              {/* 3. Constellations & Connected Starlight Nodes inside Earth */}
              <g>
                {/* Constellation Lines */}
                <line x1="88" y1="85" x2="108" y2="78" stroke="rgba(93, 206, 255, 0.4)" strokeWidth="0.8" />
                <line x1="108" y1="78" x2="135" y2="92" stroke="rgba(93, 206, 255, 0.4)" strokeWidth="0.8" />
                <line x1="135" y1="92" x2="152" y2="115" stroke="rgba(93, 206, 255, 0.4)" strokeWidth="0.8" />
                <line x1="108" y1="78" x2="118" y2="128" stroke="rgba(93, 206, 255, 0.3)" strokeWidth="0.7" strokeDasharray="2 3" />
                <line x1="118" y1="128" x2="148" y2="145" stroke="rgba(93, 206, 255, 0.3)" strokeWidth="0.7" strokeDasharray="2 3" />

                {/* Constellation Star Nodes */}
                <circle cx="88" cy="85" r="2" fill="#ffffff" />
                <circle cx="88" cy="85" r="4" fill="#5DCEFF" opacity="0.5" />

                <circle cx="108" cy="78" r="2.2" fill="#ffffff" />
                <circle cx="108" cy="78" r="5" fill="#38bdf8" opacity="0.6" />

                <circle cx="135" cy="92" r="1.8" fill="#ffffff" />
                <circle cx="152" cy="115" r="2.3" fill="#ffffff" />
                <circle cx="152" cy="115" r="5.5" fill="#5DCEFF" opacity="0.6" />

                <circle cx="118" cy="128" r="1.6" fill="#5DCEFF" />
                <circle cx="148" cy="145" r="2" fill="#ffffff" />
                <circle cx="148" cy="145" r="4.5" fill="#5DCEFF" opacity="0.5" />

                {/* Additional Twinkling Celestial Star Points on Earth */}
                <circle cx="72" cy="108" r="1.2" fill="#ffffff" opacity="0.85" />
                <circle cx="80" cy="138" r="1.4" fill="#5DCEFF" opacity="0.9" />
                <circle cx="168" cy="135" r="1.5" fill="#ffffff" opacity="0.9" />
                <circle cx="178" cy="102" r="1.2" fill="#e0f2fe" opacity="0.8" />
                <circle cx="162" cy="155" r="1.3" fill="#5DCEFF" opacity="0.85" />
                <circle cx="135" cy="165" r="1.1" fill="#ffffff" opacity="0.75" />
                <circle cx="105" cy="152" r="1.3" fill="#38bdf8" opacity="0.9" />
              </g>

              {/* 4. Swirling Luminous Cosmic Stardust Waves (Replaces realistic clouds) */}
              <path
                d="M 68 82 Q 95 68 135 76 Q 170 85 195 70 Q 178 95 142 88 Q 105 82 68 82 Z"
                fill="#ffffff"
                opacity="0.3"
              />
              <path
                d="M 85 115 Q 120 128 160 110 Q 188 102 205 120 Q 165 132 130 125 Q 98 122 85 115 Z"
                fill="#5DCEFF"
                opacity="0.28"
              />
              <path
                d="M 80 152 Q 115 142 148 158 Q 178 170 198 152 Q 172 178 138 168 Q 105 162 80 152 Z"
                fill="#ffffff"
                opacity="0.25"
              />

              {/* Polar Starlight Cap */}
              <ellipse cx="130" cy="48" rx="46" ry="12" fill="#e0f2fe" opacity="0.6" />

              {/* 5. Spherical Day/Night Terminator Shading */}
              <circle cx="130" cy="130" r="88" fill="url(#earth-blue-terminator)" />

              {/* 6. Luminous Cyan Limb Glow */}
              <circle cx="130" cy="130" r="88" fill="url(#earth-cyan-limb)" />
            </g>

            {/* Glowing Sunlit Crescent Rim */}
            <path
              d="M 64 82 A 88 88 0 0 1 130 42"
              fill="none"
              stroke="#ffffff"
              strokeWidth="2.5"
              strokeLinecap="round"
              opacity="0.85"
            />

            {/* Brilliant Starburst (Diffraction Spike) on Earth's sunlit horizon */}
            <g transform="translate(85, 58)">
              <line x1="-10" y1="0" x2="10" y2="0" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="0" y1="-10" x2="0" y2="10" stroke="#ffffff" strokeWidth="1.5" />
              <line x1="-4" y1="-4" x2="4" y2="4" stroke="#5DCEFF" strokeWidth="1" />
              <line x1="-4" y1="4" x2="4" y2="-4" stroke="#5DCEFF" strokeWidth="1" />
              <circle cx="0" cy="0" r="2.5" fill="#ffffff" />
              <circle cx="0" cy="0" r="6" fill="#5DCEFF" opacity="0.6" />
            </g>
          </svg>
        </div>
      </div>
    </div>
  );
});

CosmicPlanets.displayName = "CosmicPlanets";
