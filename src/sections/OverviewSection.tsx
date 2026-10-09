import { useTranslation } from "react-i18next";
import {
  ArrowDownRight,
  Mail,
  MapPin,
  Terminal,
  Quote,
  User,
} from "lucide-react";
import { CosmicOverviewDecoration } from "@/components/CosmicOverviewDecoration";
import profileImg from "@/assets/images/pp-alfarozy.png";

interface OverviewSectionProps {
  onNavigateSection?: (sectionId: string) => void;
}

export const OverviewSection = ({ onNavigateSection }: OverviewSectionProps) => {
  const { t } = useTranslation();

  const handleNavigate = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    }
  };

  return (
    <div className="w-full space-y-16 sm:space-y-20 py-4 sm:py-8 md:py-12">
      {/* ================= HERO SECTION ================= */}
      <div className="min-h-0 lg:min-h-[70vh] flex flex-col justify-center w-full relative">
        {/* Decorative cosmic rocket and sparkling accents exclusive to Overview */}
        <CosmicOverviewDecoration />

        <div className="w-full space-y-6 sm:space-y-8 max-w-4xl relative z-10">
          {/* Profile photo: centered, rounded-full circle, slightly larger with ample top/bottom space on mobile */}
          <div className="flex lg:hidden justify-center pt-4 sm:pt-6 pb-2 sm:pb-4">
            <div className="relative inline-block">
              {/* Outer soft ambient pulse/glow */}
              <div
                className="absolute -inset-1.5 rounded-full blur-md opacity-40 bg-gradient-to-tr from-sky-500 to-primary animate-pulse"
                aria-hidden="true"
              />
              {/* Rounded Circle Avatar */}
              <div className="relative w-28 h-28 sm:w-32 sm:h-32 rounded-full overflow-hidden border-2 sm:border-[3px] border-(--color-border) bg-(--color-surface) shadow-xl">
                <img
                  src={profileImg}
                  alt="Muhammad Alfarozi"
                  className="w-full h-full object-cover object-top scale-105"
                  width={128}
                  height={128}
                  loading="eager"
                />
              </div>
              {/* Online status indicator */}
              <span
                className="absolute bottom-1 right-1 sm:bottom-1.5 sm:right-1.5 w-4 h-4 sm:w-5 sm:h-5 rounded-full bg-emerald-500 border-2 sm:border-[2.5px] border-(--color-surface) shadow-sm"
                title="Online"
                aria-hidden="true"
              />
            </div>
          </div>

          <div className="space-y-3 sm:space-y-4 text-left">
            <h1 className="text-display font-bold tracking-tight text-(--color-fg)">
              Muhammad Alfarozi
            </h1>

            <p className="text-xl sm:text-2xl md:text-2xl font-medium text-(--color-muted) leading-relaxed">
              {t("hero.headline", "Core Team Leader | Software Engineer | Cyber Security Enthusiast")}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 text-xs">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-fg) font-medium">
              <span className="w-2 h-2 rounded-full bg-emerald-500 shadow-xs shadow-emerald-500/50 animate-pulse" aria-hidden="true" />
              <span>{t("hero.available", "Available for new projects & opportunities")}</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-muted) font-mono">
              <Terminal className="w-3.5 h-3.5 text-(--color-primary)" aria-hidden="true" />
              <span>{t("hero.experience", "5+ Years Experience")}</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3.5 pt-1 sm:pt-2">
            <button
              onClick={() => handleNavigate("work")}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-(--color-primary) text-white font-semibold text-sm rounded-xl hover:opacity-90 shadow-sm shadow-blue-500/25 transition-all cursor-pointer min-h-[44px] focus-visible:outline-2"
            >
              <span>{t("hero.cta_work", "Explore Projects")}</span>
              <ArrowDownRight className="w-4 h-4" aria-hidden="true" />
            </button>

            <button
              onClick={() => handleNavigate("contact")}
              className="inline-flex items-center gap-2 px-5 py-3.5 bg-(--color-surface) text-(--color-fg) font-semibold text-sm rounded-xl border border-(--color-border) hover:bg-(--color-surface-raised) hover:border-(--color-primary)/50 hover:text-(--color-primary) transition-all cursor-pointer min-h-[44px] focus-visible:outline-2"
            >
              <Mail className="w-4 h-4 text-(--color-muted)" aria-hidden="true" />
              <span>{t("hero.cta_contact", "Get in Touch")}</span>
            </button>
          </div>
        </div>
      </div>

      {/* ================= ABOUT ME SECTION ================= */}
      <section className="pt-8 sm:pt-12 border-t border-(--color-border) relative">
        <div className="space-y-8 max-w-4xl">
          {/* Section Header with Location Badge */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-2 text-caption text-(--color-muted) font-mono">
                <User className="w-3.5 h-3.5 text-(--color-primary)" aria-hidden="true" />
                <span>{t("about.label", "ABOUT ME")}</span>
              </div>
              <h2 className="text-headline font-bold text-(--color-fg)">
                {t("about.heading", "Crafting Solutions, Driving Real Impact")}
              </h2>
            </div>

            {/* Location Badge transferred here */}
            <div className="inline-flex items-center gap-2 px-3.5 py-2 rounded-full border border-(--color-border) bg-(--color-surface) text-(--color-muted) font-mono text-xs shadow-xs self-start sm:self-auto shrink-0 transition-colors hover:text-(--color-fg)">
              <MapPin className="w-3.5 h-3.5 text-(--color-primary)" aria-hidden="true" />
              <span>{t("about.location", "Kota Padang, Indonesia")}</span>
            </div>
          </div>


          {/* Narrative Paragraphs */}
          <div className="space-y-4 text-base sm:text-lg text-(--color-muted) leading-relaxed">
            <p>
              {t(
                "about.p1",
                "I am a fresh graduate in Informatics from Universitas Pasundan, originally from Riau, Indonesia. Passionate about Cyber Security, Web Technology, and Open Source, I began my software development journey in 2021."
              )}
            </p>
            <p>
              {t(
                "about.p2",
                "I am committed to engineering adaptive digital solutions that empower Indonesian MSMEs to scale sustainably. Currently leading strategic development across Tavio.id, Portavia, and Nyummi.com, my focus centers on transforming ideas into scalable initiatives through digital innovation, ecosystem development, and dependable operational execution."
              )}
            </p>
          </div>

          {/* Inspirational Motto / Quote Banner */}
          <div className="relative overflow-hidden rounded-2xl border border-(--color-border) bg-(--color-surface-raised)/60 p-5 sm:p-6 backdrop-blur-xs">
            <div className="flex items-start gap-4">
              <div className="p-2 rounded-xl bg-(--color-primary)/10 text-(--color-primary) shrink-0 mt-0.5">
                <Quote className="w-4 h-4" />
              </div>
              <div className="space-y-1">
                <p className="font-semibold text-(--color-fg) text-base sm:text-lg italic tracking-tight">
                  “{t("about.motto", "Better Life, Greater Impact. Be a blessing to the universe.")}”
                </p>
                <p className="text-xs text-(--color-muted) font-mono">
                  Personal Motto & Vision
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};



