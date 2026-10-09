import { useTheme } from "@/context/ThemeContext";
import { useTranslation } from "react-i18next";
import { useJakartaTime } from "@/hooks";
import {
  Sun,
  Moon,
  ArrowUpRight,
  GraduationCap,
  MapPin,
  Clock,
  Compass,
  Briefcase,
  Layers,
  Cpu,
  Mail,
  PanelLeftClose,
  PanelLeftOpen,
} from "lucide-react";
import { socialLinks } from "@/config";
import profileImg from "@/assets/images/pp-alfarozy.png";
import logoImg from "@/assets/images/logo.png";

interface SidebarProps {

  activeSection?: string;
  onNavigateSection?: (sectionId: string) => void;
  isCollapsed?: boolean;
  onToggleCollapse?: () => void;
}

export const Sidebar = ({
  activeSection = "hero",
  onNavigateSection,
  isCollapsed = false,
  onToggleCollapse,
}: SidebarProps) => {
  const { t } = useTranslation();
  const { toggleTheme, theme } = useTheme();
  const jakartaTime = useJakartaTime();

  const navLinks = [
    { id: "hero", label: t("nav.overview", "Overview"), icon: Compass },
    { id: "work", label: t("nav.work", "Projects"), icon: Layers },
    { id: "journey", label: t("nav.journey", "Experience"), icon: Briefcase },
    { id: "capabilities", label: t("nav.skills", "Skills"), icon: Cpu },
    { id: "foundations", label: t("nav.foundations", "Education"), icon: GraduationCap },
    { id: "contact", label: t("nav.contact", "Contact"), icon: Mail },
  ];

  const handleNavClick = (id: string) => {
    if (onNavigateSection) {
      onNavigateSection(id);
    } else {
      const el = document.getElementById(id);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  return (
    <>
      <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-(--color-bg)/95 backdrop-blur-md border-b border-(--color-border) px-4 sm:px-6 h-16 flex items-center justify-between">
        <button
          onClick={() => handleNavClick("hero")}
          className="flex items-center gap-2.5 text-left focus-visible:outline-2 cursor-pointer"
        >
          <img
            src={logoImg}
            alt="Muhammad Alfarozi"
            className="w-8 h-8 rounded-lg object-contain"
          />
          <div>
            <span className="text-sm font-bold tracking-tight text-(--color-fg) block">
              Alfarozi
            </span>
          </div>
        </button>


        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-md border border-(--color-border) bg-(--color-surface) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer min-h-[38px] min-w-[38px] flex items-center justify-center"
            aria-label="Toggle theme"
          >
            {theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />}
          </button>
        </div>
      </header>

      <aside
        className={`hidden lg:flex flex-col justify-between fixed top-0 left-0 bottom-0 bg-(--color-surface) border-r border-(--color-border) z-40 transition-all duration-300 ${isCollapsed ? "w-20 p-4" : "w-72 xl:w-80 p-6"
          }`}
        aria-label="Sidebar Navigation"
      >
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            {!isCollapsed && (
              <span className="text-xs font-mono font-bold uppercase tracking-wider text-(--color-fg)">
                Portfolio
              </span>
            )}

            <button
              onClick={onToggleCollapse}
              className={`p-2 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-(--color-muted) hover:text-(--color-fg) transition-all cursor-pointer ${isCollapsed ? "mx-auto" : "ml-auto"
                }`}
              aria-label={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {isCollapsed ? (
                <PanelLeftOpen className="w-4 h-4 text-(--color-fg)" />
              ) : (
                <PanelLeftClose className="w-4 h-4 text-(--color-muted)" />
              )}
            </button>
          </div>

          <div className={`space-y-4 ${isCollapsed ? "text-center" : ""}`}>
            <div className="relative inline-block">
              <div className={`rounded-xl overflow-hidden border border-(--color-border) transition-all ${isCollapsed ? "w-11 h-11 mx-auto" : "w-14 h-14"
                }`}>
                <img
                  src={profileImg}
                  alt="Muhammad Alfarozi"
                  className="w-full h-full object-cover"
                />
              </div>
              <span
                className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border-2 border-(--color-surface) shadow-xs"
                title="Available for opportunities"
              />
            </div>

            {!isCollapsed && (
              <div className="space-y-1">
                <h1 className="text-base font-bold text-(--color-fg) leading-tight">
                  Muhammad Alfarozi
                </h1>
                <p className="text-xs text-(--color-muted) font-medium">
                  Informatics Graduate
                </p>
                <p className="text-[11px] font-mono text-(--color-subtle)">
                  Universitas Pasundan
                </p>
              </div>
            )}

            {!isCollapsed && (
              <div className="p-2.5 rounded-lg border border-(--color-border) bg-(--color-surface-raised) space-y-1 text-xs text-(--color-muted) font-mono">
                <div className="flex items-center justify-between">
                  <span className="flex items-center gap-1.5">
                    <MapPin className="w-3 h-3 text-(--color-primary)" />
                    <span>Kota Padang, ID</span>
                  </span>
                  <span className="text-[11px] text-(--color-subtle)">WIB</span>
                </div>
                <div className="flex items-center justify-between pt-1 border-t border-(--color-border)/60">
                  <span className="flex items-center gap-1.5">
                    <Clock className="w-3 h-3 text-(--color-muted)" />
                    <span>Local Time</span>
                  </span>
                  <strong className="text-(--color-fg) text-[11px]">
                    {jakartaTime || "08:00"}
                  </strong>
                </div>
              </div>
            )}
          </div>

          <nav className="space-y-1" aria-label="Desktop Navigation">
            {navLinks.map((link) => {
              const isActive = activeSection === link.id;
              const IconComponent = link.icon;
              return (
                <button
                  key={link.id}
                  onClick={() => handleNavClick(link.id)}
                  className={`w-full flex items-center ${isCollapsed ? "justify-center p-2.5" : "justify-between px-3.5 py-2.5"
                    } rounded-xl text-xs font-medium transition-all cursor-pointer group ${isActive
                      ? "bg-(--color-primary) text-white font-semibold shadow-sm shadow-blue-500/20"
                      : "text-(--color-muted) hover:text-(--color-fg) hover:bg-(--color-surface-raised)"
                    }`}
                  title={isCollapsed ? link.label : undefined}
                >
                  <div className="flex items-center gap-2.5">
                    <IconComponent className={`w-4 h-4 ${isActive ? "text-white" : "text-(--color-fg) group-hover:text-(--color-primary)"}`} />
                    {!isCollapsed && <span>{link.label}</span>}
                  </div>
                  {!isCollapsed && (
                    <ArrowUpRight className={`w-3 h-3 transition-opacity ${isActive ? "opacity-100 text-white" : "opacity-0 group-hover:opacity-80 group-hover:text-(--color-primary)"}`} />
                  )}
                </button>
              );
            })}
          </nav>
        </div>

        <div className="space-y-3 pt-4 border-t border-(--color-border)">
          <div className="flex items-center">
            <button
              onClick={toggleTheme}
              className={`p-2.5 rounded-lg border border-(--color-border) bg-(--color-surface-raised) text-(--color-muted) hover:text-(--color-fg) transition-colors cursor-pointer flex items-center justify-center w-full min-h-[36px]`}
              aria-label="Toggle Theme"
              title={theme === "light" ? "Switch to Dark Mode" : "Switch to Light Mode"}
            >
              {isCollapsed ? (
                theme === "light" ? <Moon className="w-4 h-4" /> : <Sun className="w-4 h-4" />
              ) : (
                <div className="flex items-center gap-2 text-xs font-mono font-medium">
                  {theme === "light" ? (
                    <>
                      <Moon className="w-3.5 h-3.5" />
                      <span>Dark Mode</span>
                    </>
                  ) : (
                    <>
                      <Sun className="w-3.5 h-3.5" />
                      <span>Light Mode</span>
                    </>
                  )}
                </div>
              )}
            </button>
          </div>

          {!isCollapsed && (
            <div className="flex items-center justify-between px-1">
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-(--color-subtle) hover:text-(--color-fg) transition-colors p-1.5 rounded-md hover:bg-(--color-surface-raised)"
                  aria-label={link.label}
                  title={link.label}
                >
                  {link.icon}
                </a>
              ))}
            </div>
          )}
        </div>
      </aside>
    </>
  );
};
