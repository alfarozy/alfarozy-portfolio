import React, { useEffect, useRef, memo } from 'react';

interface Star {
  x: number;
  y: number;
  radius: number;
  baseAlpha: number;
  twinkleSpeed: number;
  phase: number;
  hasSpike: boolean;
  colorType: 'white' | 'accent' | 'secondary';
}

interface ShootingStar {
  x: number;
  y: number;
  length: number;
  speed: number;
  angle: number;
  opacity: number;
  maxLife: number;
  currentLife: number;
}

export interface BackgroundStarsProps {
  /** Ganti warna aksen sesuai branding portofolio Anda (format: r, g, b) */
  accentRgb?: string; // default: "43, 122, 236" (Brand Primary Blue)
  secondaryRgb?: string; // default: "93, 206, 255" (Brand Cyan)
  /** Warna dasar background canvas (hex atau css var) */
  bgColor?: string;
  className?: string;
}

export const BackgroundStars: React.FC<BackgroundStarsProps> = memo(({
  accentRgb = '43, 122, 236',
  secondaryRgb = '93, 206, 255',
  bgColor,
  className = '',
}) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let width = window.innerWidth;
    let height = window.innerHeight;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    const setupCanvas = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.scale(dpr, dpr);
    };
    setupCanvas();

    // Cek preferensi aksesibilitas pengguna
    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    // Density partikel adaptif (85 - 150 bintang)
    const starCount = Math.floor(Math.min(width, height) / 9);
    const stars: Star[] = Array.from(
      { length: Math.max(85, Math.min(starCount, 150)) },
      () => {
        const colorRand = Math.random();
        const radius = 0.8 + Math.random() * 1.5;
        return {
          x: Math.random() * width,
          y: Math.random() * height,
          radius,
          baseAlpha: 0.35 + Math.random() * 0.5,
          twinkleSpeed: 0.015 + Math.random() * 0.03,
          phase: Math.random() * Math.PI * 2,
          hasSpike: radius > 1.8 && Math.random() > 0.4,
          colorType:
            colorRand > 0.65 ? 'accent' : colorRand > 0.4 ? 'secondary' : 'white',
        };
      }
    );

    const shootingStars: ShootingStar[] = [];
    let nextSpawnFrames = 60;

    const spawnShootingStar = () => {
      const angle = Math.PI / 4 + (Math.random() * 0.16 - 0.08); // Sudut diagonal ~45°
      const speed = 16 + Math.random() * 8;
      const length = 110 + Math.random() * 80;
      const startX = Math.random() * (width * 0.85);
      const startY = Math.random() * (height * 0.4);

      shootingStars.push({
        x: startX,
        y: startY,
        length,
        speed,
        angle,
        opacity: 0,
        maxLife: Math.floor(length / speed) + 30,
        currentLife: 0,
      });
    };

    const handleResize = () => {
      const prevW = width;
      const prevH = height;
      setupCanvas();
      // Reposition stars proportionally on resize to maintain uniform distribution
      if (prevW > 0 && prevH > 0 && (width !== prevW || height !== prevH)) {
        for (let i = 0; i < stars.length; i++) {
          stars[i].x = (stars[i].x / prevW) * width;
          stars[i].y = (stars[i].y / prevH) * height;
        }
      }
    };
    window.addEventListener('resize', handleResize, { passive: true });

    // Pause animasi saat tab tidak aktif untuk hemat CPU/baterai
    let isVisible = !document.hidden;
    const handleVisibility = () => {
      isVisible = !document.hidden;
    };
    document.addEventListener('visibilitychange', handleVisibility);

    const render = () => {
      if (!isVisible) {
        animId = requestAnimationFrame(render);
        return;
      }

      ctx.clearRect(0, 0, width, height);

      // Cek apakah halaman berada di Dark Mode (dinamis per-frame tanpa re-mount)
      const isDark =
        document.documentElement.classList.contains('dark') ||
        document.documentElement.getAttribute('data-theme') === 'dark' ||
        !document.documentElement.classList.contains('light');

      // 1. Render Bintang Twinkling
      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];
        if (!prefersReducedMotion) {
          star.phase += star.twinkleSpeed;
        }

        const twinkle = (Math.sin(star.phase) + 1) / 2;
        const alpha = (star.baseAlpha + twinkle * 0.4) * (isDark ? 0.95 : 0.45);

        ctx.save();

        if (isDark) {
          if (star.colorType === 'accent') {
            ctx.fillStyle = `rgba(${accentRgb}, ${alpha})`;
            ctx.shadowColor = `rgba(${accentRgb}, 0.8)`;
            ctx.shadowBlur = star.radius * 3;
          } else if (star.colorType === 'secondary') {
            ctx.fillStyle = `rgba(${secondaryRgb}, ${alpha})`;
            ctx.shadowColor = `rgba(${secondaryRgb}, 0.7)`;
            ctx.shadowBlur = star.radius * 3;
          } else {
            ctx.fillStyle = `rgba(255, 255, 255, ${alpha})`;
            ctx.shadowColor = 'rgba(255, 255, 255, 0.6)';
            ctx.shadowBlur = star.radius * 2;
          }
        } else {
          ctx.fillStyle =
            star.colorType === 'accent'
              ? `rgba(${accentRgb}, ${alpha * 0.8})`
              : `rgba(100, 116, 139, ${alpha * 0.65})`;
        }

        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fill();

        // Efek kilau salib 4-arah (diffraction spike) untuk bintang besar
        if (isDark && star.hasSpike && alpha > 0.6) {
          const spikeLen = star.radius * 3.5;
          ctx.strokeStyle = `rgba(255, 255, 255, ${alpha * 0.5})`;
          ctx.lineWidth = 0.75;
          ctx.beginPath();
          ctx.moveTo(star.x - spikeLen, star.y);
          ctx.lineTo(star.x + spikeLen, star.y);
          ctx.moveTo(star.x, star.y - spikeLen);
          ctx.lineTo(star.x, star.y + spikeLen);
          ctx.stroke();
        }

        ctx.restore();
      }

      // 2. Render Shooting Stars (Meteor)
      if (!prefersReducedMotion) {
        nextSpawnFrames--;
        if (nextSpawnFrames <= 0 && shootingStars.length < 2) {
          spawnShootingStar();
          nextSpawnFrames = 210 + Math.floor(Math.random() * 180);
        }

        for (let i = shootingStars.length - 1; i >= 0; i--) {
          const s = shootingStars[i];
          s.currentLife++;

          const lifeProgress = s.currentLife / s.maxLife;
          if (lifeProgress < 0.2) {
            s.opacity = lifeProgress / 0.2;
          } else {
            s.opacity = Math.max(0, 1 - (lifeProgress - 0.2) / 0.8);
          }

          const tailX = s.x - Math.cos(s.angle) * s.length;
          const tailY = s.y - Math.sin(s.angle) * s.length;

          ctx.save();
          const gradient = ctx.createLinearGradient(s.x, s.y, tailX, tailY);
          if (isDark) {
            gradient.addColorStop(0, `rgba(255, 255, 255, ${s.opacity * 0.95})`);
            gradient.addColorStop(0.18, `rgba(${accentRgb}, ${s.opacity * 0.9})`);
            gradient.addColorStop(0.6, `rgba(${accentRgb}, ${s.opacity * 0.35})`);
            gradient.addColorStop(1, `rgba(${accentRgb}, 0)`);
          } else {
            gradient.addColorStop(0, `rgba(${accentRgb}, ${s.opacity * 0.8})`);
            gradient.addColorStop(0.3, `rgba(${accentRgb}, ${s.opacity * 0.45})`);
            gradient.addColorStop(1, `rgba(${accentRgb}, 0)`);
          }

          ctx.strokeStyle = gradient;
          ctx.lineWidth = isDark ? 2 : 1.5;
          ctx.lineCap = 'round';
          ctx.beginPath();
          ctx.moveTo(s.x, s.y);
          ctx.lineTo(tailX, tailY);
          ctx.stroke();

          // Kepala meteor
          ctx.beginPath();
          ctx.arc(s.x, s.y, isDark ? 1.5 : 1.2, 0, Math.PI * 2);
          ctx.fillStyle = isDark
            ? `rgba(255, 255, 255, ${s.opacity})`
            : `rgba(${accentRgb}, ${s.opacity})`;
          if (isDark) {
            ctx.shadowColor = `rgb(${accentRgb})`;
            ctx.shadowBlur = 10;
          }
          ctx.fill();
          ctx.restore();

          s.x += Math.cos(s.angle) * s.speed;
          s.y += Math.sin(s.angle) * s.speed;

          if (
            s.currentLife >= s.maxLife ||
            s.x > width + s.length ||
            s.y > height + s.length
          ) {
            shootingStars.splice(i, 1);
          }
        }
      }

      animId = requestAnimationFrame(render);
    };

    animId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [accentRgb, secondaryRgb]);

  const vignetteColor = bgColor ?? 'var(--color-bg, #080808)';

  return (
    <div
      className={`fixed inset-0 pointer-events-none z-0 overflow-hidden select-none ${className}`}
      aria-hidden="true"
    >
      {/* 1. Efek Glow Aurora Lembut di Balik Bintang */}
      <div
        className="absolute top-[-10%] left-[-10%] w-[55vw] h-[55vw] rounded-full pointer-events-none blur-3xl opacity-20 dark:opacity-20"
        style={{
          background: `radial-gradient(circle, rgba(${accentRgb}, 0.35) 0%, transparent 70%)`,
        }}
      />
      <div
        className="absolute top-[35%] right-[-10%] w-[50vw] h-[50vw] rounded-full pointer-events-none blur-3xl opacity-15 dark:opacity-15"
        style={{
          background: `radial-gradient(circle, rgba(${secondaryRgb}, 0.3) 0%, transparent 70%)`,
        }}
      />

      {/* 2. Vignette Mask untuk Menyatu Halus ke Warna Canvas / Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 50% 35%, transparent 40%, ${vignetteColor} 92%)`,
        }}
      />

      {/* 3. Kanvas Partikel Bintang */}
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />
    </div>
  );
});

BackgroundStars.displayName = 'BackgroundStars';
