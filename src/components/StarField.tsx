import { useEffect, useRef, memo } from "react";
import { useTheme } from "@/context/ThemeContext";

interface Star {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  alpha: number;
  baseAlpha: number;
  pulseSpeed: number;
  hasGlow: boolean;
}

export const StarField = memo(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const isDark = theme === "dark";

    // Palette: Crisp starlight in dark mode, gentle deep-slate starlight in light mode
    const starRgb = isDark ? "255, 255, 255" : "71, 85, 105";
    const glowRgb = isDark ? "93, 206, 255" : "59, 130, 246";

    // Check user preference for reduced motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Subtle star count: balanced for premium depth without cluttering
    const starCount = Math.min(Math.floor((width * height) / 14000), 75);
    const stars: Star[] = [];

    for (let i = 0; i < starCount; i++) {
      // Natural distribution: mostly tiny background stars (0.6 - 1.2px), few medium (1.4 - 1.8px) with glow
      const isSpecialGlow = Math.random() < 0.2;
      const size = isSpecialGlow ? Math.random() * 0.7 + 1.2 : Math.random() * 0.6 + 0.6;
      const baseAlpha = isDark
        ? Math.random() * 0.4 + (isSpecialGlow ? 0.35 : 0.15)
        : Math.random() * 0.25 + (isSpecialGlow ? 0.15 : 0.08);

      stars.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.08, // Very slow drift
        vy: (Math.random() - 0.5) * 0.08,
        size,
        alpha: baseAlpha,
        baseAlpha,
        pulseSpeed: Math.random() * 0.015 + 0.005, // Slow twinkle
        hasGlow: isSpecialGlow,
      });
    }

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize, { passive: true });

    let tick = 0;

    const render = () => {
      if (document.hidden) {
        animationFrameId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);
      tick++;

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        if (!prefersReducedMotion) {
          star.x += star.vx;
          star.y += star.vy;

          if (star.x < 0) star.x = width;
          if (star.x > width) star.x = 0;
          if (star.y < 0) star.y = height;
          if (star.y > height) star.y = 0;
        }

        const twinkle = prefersReducedMotion
          ? 0
          : Math.sin(tick * star.pulseSpeed + i) * 0.18;
        const currentAlpha = Math.max(0.04, Math.min(0.9, star.baseAlpha + twinkle));

        // Subtle glow for special stars
        if (star.hasGlow) {
          ctx.beginPath();
          ctx.arc(star.x, star.y, star.size * 2.5, 0, Math.PI * 2);
          ctx.fillStyle = `rgba(${glowRgb}, ${currentAlpha * (isDark ? 0.25 : 0.15)})`;
          ctx.fill();
        }

        // Star core
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${starRgb}, ${currentAlpha})`;
        ctx.fill();
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [theme]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0 select-none"
      aria-hidden="true"
    />
  );
});

StarField.displayName = "StarField";
