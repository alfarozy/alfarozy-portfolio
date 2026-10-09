import { experienceData } from "@/config";
import { useTranslation } from "react-i18next";
import {
  Compass,
  Calendar,
  Building2,
  CheckCircle2,
  Sparkles,
  ArrowDown,
  MapPin,
} from "lucide-react";
import { SpotlightCard } from "@/components/SpotlightCard";

export const ExperienceSection = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-0 lg:min-h-[75vh] flex flex-col justify-center py-4 sm:py-8 md:py-12 w-full space-y-8 sm:space-y-10">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-3 border-b border-(--color-border) pb-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-caption text-(--color-muted) font-mono">
            <Compass className="w-3.5 h-3.5 text-(--color-primary)" aria-hidden="true" />
            <span>{t("journey.label", "CAREER JOURNEY")}</span>
          </div>
          <h2 className="text-headline font-bold text-(--color-fg)">
            {t("journey.heading", "Professional Path & Growth")}
          </h2>
          <p className="text-body text-xs sm:text-sm text-(--color-muted)">
            {t(
              "journey.intro",
              "A chronological milestone of my learning, technical roles, leadership initiatives, and professional contributions."
            )}
          </p>
        </div>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-border) bg-(--color-surface) text-xs font-mono text-(--color-muted) self-start sm:self-auto shrink-0">
          <span className="text-(--color-fg) font-semibold flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-(--color-accent-orange) animate-pulse" />
            Present
          </span>
          <ArrowDown className="w-3 h-3 text-(--color-primary)" />
          <span>2020</span>
        </div>
      </div>

      {/* VERTICAL CONNECTED TIMELINE */}
      <div className="relative pl-6 sm:pl-8 md:pl-10 space-y-8 sm:space-y-10">
        {/* Continuous vertical connecting line: from brand orange active to subtle blue/border */}
        <div
          className="absolute left-[11px] sm:left-[15px] md:left-[19px] top-4 bottom-4 w-0.5 bg-gradient-to-b from-(--color-accent-orange) via-blue-500/40 to-(--color-border)"
          aria-hidden="true"
        />


        {experienceData.map((item, index) => {
          const isLatest = item.isCurrent;

          return (
            <div key={item.id} className="relative group">
              {/* Timeline Node Icon/Dot */}
              <div
                className={`absolute -left-[23px] sm:-left-[27px] md:-left-[31px] top-5 w-6 h-6 sm:w-7 sm:h-7 rounded-full flex items-center justify-center border-2 transition-all duration-300 z-10 ${
                  isLatest
                    ? "bg-(--color-accent-orange) border-orange-400 text-white shadow-md shadow-orange-500/30 scale-110"
                    : "bg-(--color-surface) border-(--color-border) text-(--color-muted) group-hover:border-(--color-primary) group-hover:text-(--color-primary)"
                }`}
                aria-hidden="true"
              >
                {isLatest ? (
                  <Sparkles className="w-3.5 h-3.5 animate-pulse" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-(--color-primary)" />
                )}
              </div>

              {/* Milestone Card */}
              <SpotlightCard className="p-5 sm:p-7 md:p-8 rounded-2xl sm:rounded-3xl border border-(--color-border) bg-(--color-surface) shadow-xs transition-all hover:border-(--color-primary)/40">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-start">
                  {/* Left Column: Logo, Role, Company, Period, Location */}
                  <div className="lg:col-span-5 space-y-4">
                    <div className="flex items-start gap-3.5 sm:gap-4">
                      {/* Company Logo or Monogram/Initials */}
                      <div className="w-12 h-12 rounded-2xl bg-(--color-surface-raised) border border-(--color-border) p-1.5 flex items-center justify-center shrink-0 overflow-hidden shadow-xs">
                        {item.logo ? (
                          <img
                            src={item.logo}
                            alt={t(item.company)}
                            className="w-full h-full object-contain"
                            loading="lazy"
                          />
                        ) : (
                          <div className="w-full h-full rounded-xl bg-(--color-primary)/10 text-(--color-primary) flex items-center justify-center font-mono font-bold text-sm tracking-wider">
                            {item.initials || <Building2 className="w-5 h-5 text-(--color-primary)" />}
                          </div>
                        )}
                      </div>

                      <div className="min-w-0 flex-1 space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="font-mono text-xs font-semibold text-(--color-muted) truncate">
                            {t(item.company)}
                          </span>
                          {isLatest && (
                            <span className="px-2 py-0.5 rounded-md bg-(--color-accent-orange)/10 text-(--color-accent-orange) font-semibold text-[10px] font-mono border border-(--color-accent-orange)/20 shrink-0">
                              {t("journey.present_badge", "Current Role")}
                            </span>
                          )}
                        </div>

                        <h3 className="text-xl sm:text-2xl font-bold tracking-tight text-(--color-fg) leading-snug">
                          {t(item.role)}
                        </h3>
                      </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-2 pt-1">
                      <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-xs font-mono text-(--color-muted)">
                        <Calendar className="w-3 h-3 text-(--color-primary)" />
                        <span>{t(item.period)}</span>
                      </div>

                      {item.location && (
                        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-xs font-mono text-(--color-muted)">
                          <MapPin className="w-3 h-3 text-(--color-primary)" />
                          <span>{t(item.location)}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Right Column: Description & Tech Stack */}
                  <div className="lg:col-span-7 space-y-4 border-t lg:border-t-0 lg:border-l border-(--color-border) pt-4 lg:pt-0 lg:pl-6">
                    <p className="text-body text-sm sm:text-base leading-relaxed text-(--color-muted)">
                      {t(item.desc)}
                    </p>

                    {item.tech && item.tech.length > 0 && (
                      <div className="space-y-2 pt-1">
                        <span className="text-[11px] font-mono uppercase tracking-wider text-(--color-muted) block">
                          Core Technologies & Competencies
                        </span>
                        <div className="flex flex-wrap gap-1.5 sm:gap-2">
                          {item.tech.map((tag) => (
                            <span
                              key={tag}
                              className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1 rounded-md border border-(--color-border) bg-(--color-surface-raised) text-(--color-fg)"
                            >
                              <CheckCircle2 className="w-3 h-3 text-(--color-secondary)" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </SpotlightCard>
            </div>
          );
        })}
      </div>
    </div>
  );
};


