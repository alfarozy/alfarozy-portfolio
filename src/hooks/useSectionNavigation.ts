import { useState, useEffect, useCallback } from "react";

export interface SectionDef {
  id: string;
  label: string;
}

export const SECTIONS: SectionDef[] = [
  { id: "hero", label: "Ringkasan" },
  { id: "work", label: "Proyek" },
  { id: "journey", label: "Pengalaman" },
  { id: "capabilities", label: "Keahlian" },
  { id: "foundations", label: "Pendidikan" },
  { id: "contact", label: "Kontak" },
];

export const useSectionNavigation = () => {
  const [activeSection, setActiveSection] = useState("hero");

  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (SECTIONS.some((s) => s.id === hash)) {
        setActiveSection(hash);
      }
    };

    handleHashChange();
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const handleNavigateSection = useCallback((sectionId: string) => {
    setActiveSection(sectionId);
    window.location.hash = sectionId;
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const goToNextSection = useCallback(() => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
    if (currentIndex < SECTIONS.length - 1) {
      handleNavigateSection(SECTIONS[currentIndex + 1].id);
    }
  }, [activeSection, handleNavigateSection]);

  const goToPrevSection = useCallback(() => {
    const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
    if (currentIndex > 0) {
      handleNavigateSection(SECTIONS[currentIndex - 1].id);
    }
  }, [activeSection, handleNavigateSection]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (document.body.classList.contains("modal-open")) return;
      if (e.key === "PageDown") {
        goToNextSection();
      } else if (e.key === "PageUp") {
        goToPrevSection();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [goToNextSection, goToPrevSection]);

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSection);
  const prevSection = currentIndex > 0 ? SECTIONS[currentIndex - 1] : null;
  const nextSection =
    currentIndex < SECTIONS.length - 1 ? SECTIONS[currentIndex + 1] : null;

  return {
    activeSection,
    handleNavigateSection,
    goToNextSection,
    goToPrevSection,
    prevSection,
    nextSection,
    sections: SECTIONS,
  };
};
