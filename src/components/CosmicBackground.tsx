import { memo } from "react";
import { useTheme } from "@/context/ThemeContext";

export const CosmicBackground = memo(() => {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <div
      className="fixed inset-0 pointer-events-none z-0 overflow-hidden select-none"
      aria-hidden="true"
    >
      {/* Deep Cosmic Atmosphere / Nebula Gradients */}
      {/* Primary cosmic glow (top right) */}
      <div
        className="absolute -top-[10%] -right-[5%] w-[650px] sm:w-[850px] h-[650px] sm:h-[850px] rounded-full blur-3xl transition-opacity duration-1000"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(43, 122, 236, 0.10) 0%, rgba(93, 206, 255, 0.04) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(43, 122, 236, 0.04) 0%, rgba(93, 206, 255, 0.015) 40%, transparent 65%)",
        }}
      />

      {/* Secondary cosmic nebula (bottom left) */}
      <div
        className="absolute -bottom-[15%] -left-[10%] w-[500px] sm:w-[700px] h-[500px] sm:h-[700px] rounded-full blur-3xl transition-opacity duration-1000"
        style={{
          background: isDark
            ? "radial-gradient(circle, rgba(147, 51, 234, 0.06) 0%, rgba(59, 130, 246, 0.03) 45%, transparent 70%)"
            : "radial-gradient(circle, rgba(147, 51, 234, 0.02) 0%, rgba(59, 130, 246, 0.01) 40%, transparent 65%)",
        }}
      />
    </div>
  );
});

CosmicBackground.displayName = "CosmicBackground";

