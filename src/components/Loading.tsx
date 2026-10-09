import { useEffect, useState } from "react";
import { motion } from "motion/react";

interface LoadingProps {
  onLoadingComplete: () => void;
}

export const Loading = ({ onLoadingComplete }: LoadingProps) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 700;
    const startTime = performance.now();
    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const t = Math.min(elapsed / duration, 1);
      const easeProgress = Math.min(
        Math.round((1 - Math.pow(1 - t, 3)) * 100),
        100
      );
      setProgress(easeProgress);

      if (t < 1) {
        animId = requestAnimationFrame(tick);
      } else {
        setTimeout(() => {
          onLoadingComplete();
        }, 50);
      }
    };

    animId = requestAnimationFrame(tick);

    const safetyTimer = setTimeout(() => {
      setProgress(100);
      onLoadingComplete();
    }, 900);

    const handleSkip = () => {
      setProgress(100);
      onLoadingComplete();
    };

    window.addEventListener("keydown", handleSkip, { once: true });

    return () => {
      cancelAnimationFrame(animId);
      clearTimeout(safetyTimer);
      window.removeEventListener("keydown", handleSkip);
    };
  }, [onLoadingComplete]);

  return (
    <motion.div
      key="splash-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -16 }}
      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
      onClick={() => onLoadingComplete()}
      title="Click anywhere to continue"
      className="fixed inset-0 z-[100] flex flex-col justify-between p-8 sm:p-12 md:p-16 bg-(--color-bg) text-(--color-fg) selection:bg-(--color-fg) selection:text-(--color-bg) cursor-pointer select-none"
    >
      <div className="flex items-center justify-between text-xs font-mono text-(--color-muted)">
        <span className="tracking-widest uppercase">Muhammad Alfarozi</span>
        <span className="tracking-widest uppercase">Kota Padang, Indonesia.</span>
      </div>

      <div className="max-w-2xl space-y-4">
        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="space-y-2"
        >
          <span className="text-xs font-mono tracking-[0.2em] uppercase block text-(--color-muted)">
            Portfolio / 2026
          </span>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-(--color-fg) leading-tight">
            Muhammad Alfarozi
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="text-sm md:text-base font-normal max-w-lg text-(--color-muted)"
        >
          Core Team Leader | Software Engineer | Cyber Scurity Enthusiast .
        </motion.p>
      </div>

      <div className="space-y-4">
        <div className="flex items-center justify-between font-mono text-xs sm:text-sm text-(--color-muted)">
          <span className="tracking-wider">INITIALIZING SYSTEM</span>
          <span className="font-bold tracking-widest text-(--color-primary)">
            {String(progress).padStart(3, "0")}%
          </span>
        </div>

        <div className="w-full h-[2px] bg-(--color-border) overflow-hidden relative rounded-full">
          <div
            className="h-full bg-gradient-to-r from-(--color-primary) via-(--color-secondary) to-(--color-accent-orange) transition-all duration-75 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </motion.div>
  );
};
