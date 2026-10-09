import { SpotlightCard } from "@/components/SpotlightCard";
import { educationData } from "@/config";
import { GraduationCap, MapPin } from "lucide-react";
import { useTranslation } from "react-i18next";

export const EducationSection = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-0 lg:min-h-[75vh] flex flex-col justify-center py-4 sm:py-8 md:py-12 w-full space-y-6 sm:space-y-8">
      <div className="space-y-2 max-w-2xl">
        <div className="inline-flex items-center gap-2 text-caption text-(--color-muted) font-mono">
          <GraduationCap
            className="w-3.5 h-3.5 text-(--color-primary)"
            aria-hidden="true"
          />
          <span>{t("education.label", "EDUCATION")}</span>
        </div>
        <h2 className="text-headline font-bold text-(--color-fg)">
          {t("education.heading", "Education")}
        </h2>
        <p className="text-body text-sm sm:text-base text-(--color-muted)">
          {t(
            "education.intro",
            "Formal education and academic background.",
          )}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
        {educationData.map((edu) => (
          <SpotlightCard
            key={edu.id}
            className="p-5 sm:p-6 md:p-7 space-y-5 flex flex-col justify-between h-full"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-full bg-(--color-surface-raised) border border-(--color-border) p-1 flex items-center justify-center shrink-0 overflow-hidden">
                  <img
                    src={edu.logo}
                    alt={t(edu.institution)}
                    className="w-full h-full object-contain "
                  />
                </div>
                <div className="min-w-0">
                  <span className="text-xs font-mono font-semibold text-(--color-fg) uppercase tracking-wider block truncate">
                    {t(edu.institution)}
                  </span>
                  <span className="font-mono text-xs text-(--color-muted)">
                    {t(edu.period)}
                  </span>
                </div>
              </div>

              <div>
                <h3 className="text-lg sm:text-xl font-bold text-(--color-fg)">
                  {t(edu.degree)}
                </h3>
                <p className="text-body text-sm text-(--color-muted) leading-relaxed mt-2">
                  {t(edu.description)}
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-(--color-border) flex items-center justify-between gap-2">
              <span className="text-xs font-mono text-(--color-muted)">
                Location
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold text-(--color-fg) px-3 py-1 rounded-md border border-(--color-border) bg-(--color-surface-raised)">
                <MapPin className="w-3.5 h-3.5 text-(--color-primary)" aria-hidden="true" />
                <span>{edu.location}</span>
              </span>
            </div>
          </SpotlightCard>
        ))}
      </div>
    </div>
  );
};

