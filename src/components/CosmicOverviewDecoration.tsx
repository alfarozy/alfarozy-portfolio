import { memo } from "react";
import { Rocket, Sparkles } from "lucide-react";
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
            ? "radial-gradient(circle, rgba(43, 122, 236, 0.16) 0%, rgba(93, 206, 255, 0.08) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(43, 122, 236, 0.08) 0%, rgba(93, 206, 255, 0.03) 45%, transparent 70%)",
        }}
      />

      {/* ROCKET CONTAINER: positioned to the right of the Hero content */}
      <div className="absolute top-[20%] sm:top-[24%] md:top-[28%] right-[4%] sm:right-[8%] md:right-[12%] flex flex-col items-center">
        {/* Animated Rocket with smooth slow glide */}
        <div className="relative animate-[cosmic-rocket_12s_ease-in-out_infinite]">
          {/* Rocket thruster flame / propulsion glow */}
          <div
            className="absolute -bottom-2 -left-2 w-8 h-8 rounded-full blur-md animate-pulse"
            style={{
              background: isDark
                ? "radial-gradient(circle, rgba(255, 105, 0, 0.7) 0%, rgba(245, 158, 11, 0.4) 50%, transparent 80%)"
                : "radial-gradient(circle, rgba(255, 105, 0, 0.5) 0%, rgba(245, 158, 11, 0.25) 50%, transparent 80%)",
            }}
          />

          {/* Rocket Thruster Trail particles */}
          <div className="absolute -bottom-6 -left-6 flex flex-col items-center gap-1 opacity-70">
            <span className="w-1.5 h-1.5 rounded-full bg-orange-400/60 blur-[0.5px] animate-ping" />
            <span className="w-1 h-1 rounded-full bg-amber-300/40 blur-[0.5px]" />
          </div>

          {/* Rocket Icon */}
          <Rocket
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 stroke-[1.3] transition-colors duration-500"
            style={{
              color: isDark ? "#5DCEFF" : "#2B7AEC",
              filter: isDark
                ? "drop-shadow(0 0 16px rgba(93, 206, 255, 0.45))"
                : "drop-shadow(0 0 12px rgba(43, 122, 236, 0.3))",
            }}
          />
        </div>

        {/* Sparkling cluster right around the rocket path */}
        <div className="absolute -top-6 -right-6 animate-pulse">
          <Sparkles
            className="w-5 h-5 sm:w-6 sm:h-6 stroke-[1.2]"
            style={{
              color: isDark ? "#FDE047" : "#F59E0B",
              filter: isDark ? "drop-shadow(0 0 8px rgba(253, 224, 71, 0.5))" : undefined,
            }}
          />
        </div>
      </div>

      {/* Sparkling Accent 1: Upper right */}
      <div className="absolute top-[12%] right-[22%] sm:right-[26%] animate-[pulse_4s_ease-in-out_infinite]">
        <Sparkles
          className="w-4 h-4 sm:w-5 sm:h-5 stroke-[1.2]"
          style={{
            color: isDark ? "#38BDF8" : "#0284C7",
            opacity: isDark ? 0.75 : 0.55,
          }}
        />
      </div>

      {/* Sparkling Accent 2: Lower right near bottom of hero */}
      <div className="absolute bottom-[20%] right-[10%] sm:right-[18%] animate-[pulse_5s_ease-in-out_infinite]">
        <Sparkles
          className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[1.2]"
          style={{
            color: isDark ? "#A5B4FC" : "#6366F1",
            opacity: isDark ? 0.7 : 0.5,
          }}
        />
      </div>

      {/* Sparkling Accent 3: Subtle glimmer near badges */}
      <div className="hidden sm:block absolute top-[48%] right-[32%] animate-[pulse_6s_ease-in-out_infinite]">
        <Sparkles
          className="w-3 h-3 stroke-[1.2]"
          style={{
            color: isDark ? "#FDE047" : "#EAB308",
            opacity: isDark ? 0.6 : 0.4,
          }}
        />
      </div>
    </div>
  );
});

CosmicOverviewDecoration.displayName = "CosmicOverviewDecoration";
