import {
  etafiliaLogo,
  cyberArmyLogo,
  unpasLogo,
  bangkitLogo,
  baitLogo,
  pasamandevLogo,
} from "@/assets/experience";

export interface ExperienceItem {
  id: number;
  role: string;
  company: string;
  period: string;
  location?: string;
  desc: string;
  tech: string[];
  logo?: string;
  initials?: string;
  isCurrent?: boolean;
}

export const experienceData: ExperienceItem[] = [
  {
    id: 1,
    role: "data.exp_etafilia_role",
    company: "data.exp_etafilia_company",
    period: "data.exp_etafilia_period",
    location: "data.exp_etafilia_location",
    desc: "data.exp_etafilia_desc",
    tech: ["Product Leadership", "System Architecture", "Laravel", "React.js", "Financial Systems", "Fullstack Development"],
    logo: etafiliaLogo,
    initials: "ET",
    isCurrent: true,
  },
  {
    id: 2,
    role: "data.exp_cyberarmy_role",
    company: "data.exp_cyberarmy_company",
    period: "data.exp_cyberarmy_period",
    location: "data.exp_cyberarmy_location",
    desc: "data.exp_cyberarmy_desc",
    tech: ["Laravel", "REST APIs", "PHP", "MySQL", "API Architecture", "Performance Optimization"],
    logo: cyberArmyLogo,
    initials: "CA",
  },
  {
    id: 3,
    role: "data.exp_gdgoc_role",
    company: "data.exp_gdgoc_company",
    period: "data.exp_gdgoc_period",
    location: "data.exp_gdgoc_location",
    desc: "data.exp_gdgoc_desc",
    tech: ["Web Development", "Software Development", "Laravel", "Technical Collaboration"],
    logo: unpasLogo,
    initials: "GD",
  },
  {
    id: 4,
    role: "data.exp_bangkit_role",
    company: "data.exp_bangkit_company",
    period: "data.exp_bangkit_period",
    location: "data.exp_bangkit_location",
    desc: "data.exp_bangkit_desc",
    tech: ["Google Cloud Platform (GCP)", "DevOps", "Docker", "Node.js", "REST APIs", "Cloud Computing"],
    logo: bangkitLogo,
    initials: "BK",
  },
  {
    id: 5,
    role: "data.exp_baitsolution_role",
    company: "data.exp_baitsolution_company",
    period: "data.exp_baitsolution_period",
    location: "data.exp_baitsolution_location",
    desc: "data.exp_baitsolution_desc",
    tech: ["Laravel", "PHP", "MySQL", "Web Development", "Client Solutions"],
    logo: baitLogo,
    initials: "BS",
  },
  {
    id: 6,
    role: "data.exp_pasamandev_role",
    company: "data.exp_pasamandev_company",
    period: "data.exp_pasamandev_period",
    location: "data.exp_pasamandev_location",
    desc: "data.exp_pasamandev_desc",
    tech: ["Web Development", "Git & GitHub", "Programming Fundamentals", "Collaboration"],
    logo: pasamandevLogo,
    initials: "PD",
  },
];
