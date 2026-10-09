import { useState } from "react";
import { useTranslation } from "react-i18next";
import {
  Github,
  Award,
  Layers,
  ArrowUpRight,
  Sparkles,
  Info,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { projectsData, type ProjectData } from "@/config";
import { SpotlightCard } from "@/components/SpotlightCard";
import { ProjectDetailModal } from "@/components/ProjectDetailModal";

export const ProjectsSection = () => {
  const { t } = useTranslation();
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [activeModalProject, setActiveModalProject] = useState<ProjectData | null>(null);

  // Extract unique categories
  const categories = ["All", ...Array.from(new Set(projectsData.map((p) => p.category)))];

  const filteredProjects =
    selectedCategory === "All"
      ? projectsData
      : projectsData.filter((p) => p.category === selectedCategory);

  return (
    <div className="min-h-0 lg:min-h-[75vh] flex flex-col justify-center py-4 sm:py-8 md:py-12 w-full space-y-6 sm:space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b border-(--color-border) pb-4">
        <div className="space-y-1.5 max-w-2xl">
          <div className="inline-flex items-center gap-2 text-caption text-(--color-muted) font-mono">
            <Layers className="w-3.5 h-3.5 text-(--color-primary)" aria-hidden="true" />
            <span>{t("projects.label", "PORTFOLIO")}</span>
          </div>
          <h2 className="text-headline font-bold text-(--color-fg)">
            {t("projects.heading", "Featured Projects")}
          </h2>
          <p className="text-body text-xs sm:text-sm text-(--color-muted)">
            {t(
              "projects.intro",
              "A curated collection of web applications, cloud backends, and digital platforms."
            )}
          </p>
        </div>

        {/* Total Project Counter Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-(--color-border) bg-(--color-surface) text-xs font-mono text-(--color-muted) self-start sm:self-auto shrink-0">
          <Sparkles className="w-3.5 h-3.5 text-(--color-primary)" />
          <span>
            <strong className="text-(--color-fg)">{filteredProjects.length}</strong> Projects
          </span>
        </div>
      </div>

      {/* Category Filter Tabs */}
      <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-1">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-mono font-medium transition-all cursor-pointer shrink-0 border focus-visible:outline-2 ${
                isSelected
                  ? "bg-(--color-primary) text-white border-(--color-primary) shadow-sm shadow-blue-500/25"
                  : "bg-(--color-surface) text-(--color-muted) border-(--color-border) hover:border-(--color-primary)/50 hover:text-(--color-fg)"
              }`}
            >
              {category === "All" ? t("projects.all", "All Projects") : category}
            </button>
          );
        })}
      </div>

      {/* Modern Responsive Interactive Project Grid */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 sm:gap-6"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => (
            <motion.div
              layout
              key={project.id}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              className="h-full flex"
            >
              <SpotlightCard className="p-4 sm:p-5 rounded-2xl border border-(--color-border) bg-(--color-surface) shadow-xs transition-all hover:border-(--color-primary)/50 flex flex-col justify-between w-full group">
                <div className="space-y-4">
                  {/* Mock Browser / Image Preview Area */}
                  <div
                    onClick={() => setActiveModalProject(project)}
                    className="relative rounded-xl border border-(--color-border) bg-(--color-surface-raised) overflow-hidden aspect-[16/10] cursor-pointer group-hover:border-(--color-primary)/30 transition-colors"
                  >
                    {/* Top Mock Window Bar */}
                    <div className="flex items-center justify-between px-3 py-1.5 border-b border-(--color-border) bg-(--color-surface) text-[10px] font-mono text-(--color-muted)">
                      <div className="flex items-center gap-1">
                        <span className="w-2 h-2 rounded-full bg-zinc-500/30" />
                        <span className="w-2 h-2 rounded-full bg-zinc-500/30" />
                        <span className="w-2 h-2 rounded-full bg-zinc-500/30" />
                      </div>
                      <span className="truncate max-w-[130px] opacity-70">
                        {project.title.toLowerCase().replace(/\s+/g, "")}.web
                      </span>
                    </div>

                    {/* Screenshot Thumbnail */}
                    <div className="w-full h-[calc(100%-25px)] p-2.5 flex items-center justify-center">
                      <img
                        src={project.image}
                        alt={project.title}
                        width={project.imageWidth}
                        height={project.imageHeight}
                        loading="lazy"
                        className="w-full h-full object-contain transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>

                    {/* Optional Award Badge */}
                    {project.award && (
                      <div className="absolute top-8 left-2.5 inline-flex items-center gap-1 px-2.5 py-1 rounded-md bg-(--color-accent-orange) text-white text-[10px] font-semibold font-mono shadow-xs">
                        <Award className="w-3 h-3" />
                        <span>Best Capstone</span>
                      </div>
                    )}
                  </div>

                  {/* Project Meta Information */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs font-mono text-(--color-muted)">
                      <span className="px-2 py-0.5 rounded-md bg-(--color-surface-raised) border border-(--color-border) text-(--color-primary) font-semibold">
                        {project.category}
                      </span>
                      <span>{project.year}</span>
                    </div>

                    <h3
                      onClick={() => setActiveModalProject(project)}
                      className="text-lg sm:text-xl font-bold tracking-tight text-(--color-fg) group-hover:text-(--color-primary) transition-colors cursor-pointer"
                    >
                      {project.title}
                    </h3>

                    <p className="text-body text-xs sm:text-sm text-(--color-muted) line-clamp-2 leading-relaxed">
                      {t(project.desc)}
                    </p>
                  </div>

                  {/* Tech Tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {project.tech.slice(0, 3).map((tag) => (
                      <span
                        key={tag}
                        className="text-[11px] font-mono px-2 py-0.5 rounded-md border border-(--color-border) bg-(--color-surface-raised) text-(--color-muted)"
                      >
                        {tag}
                      </span>
                    ))}
                    {project.tech.length > 3 && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded-md text-(--color-muted) bg-(--color-surface-raised)">
                        +{project.tech.length - 3}
                      </span>
                    )}
                  </div>
                </div>

                {/* Card Action Buttons */}
                <div className="pt-4 mt-4 border-t border-(--color-border) flex items-center gap-2">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-1 inline-flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl bg-(--color-primary) text-white font-semibold text-xs hover:opacity-90 shadow-sm shadow-blue-500/20 transition-all min-h-[38px]"
                    >
                      <span>Live Site</span>
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.repo && (
                    <a
                      href={project.repo}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-xl border border-(--color-border) bg-(--color-surface-raised) text-(--color-fg) hover:bg-(--color-surface) transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center"
                      title="View GitHub Repository"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}

                  <button
                    onClick={() => setActiveModalProject(project)}
                    className="p-2 rounded-xl border border-(--color-border) text-(--color-muted) hover:text-(--color-primary) hover:border-(--color-primary)/50 hover:bg-(--color-surface-raised) transition-colors min-h-[38px] min-w-[38px] flex items-center justify-center cursor-pointer"
                    title="View Project Details"
                  >
                    <Info className="w-4 h-4" />
                  </button>
                </div>
              </SpotlightCard>
            </motion.div>
          ))}
        </AnimatePresence>
      </motion.div>

      {/* Modal Detail Pop-up */}
      <ProjectDetailModal
        isOpen={!!activeModalProject}
        project={activeModalProject}
        onClose={() => setActiveModalProject(null)}
      />
    </div>
  );
};

