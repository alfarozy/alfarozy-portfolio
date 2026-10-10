import * as ProjectImages from "@/assets/projects/index";

export interface ProjectData {
  id: number;
  title: string;
  desc: string;
  fullDesc: string;
  contribution: string;
  tech: string[];
  image: string;
  imageWidth: number;
  imageHeight: number;
  link: string | null;
  repo: string | null;
  category: string;
  year: string;
  role: string;
  award?: string;
}

export const projectsData: ProjectData[] = [
  {
    id: 1,
    title: "Tavio.id",
    desc: "data.tavio_desc",
    fullDesc: "data.tavio_full_desc",
    contribution: "data.tavio_contribution",
    tech: ["React.js", "Laravel", "Inertia.js", "REST API", "Tailwind CSS"],
    image: ProjectImages.tavioidImg,
    imageWidth: 1902,
    imageHeight: 998,
    link: "https://tavio.id",
    repo: null,
    category: "Fullstack Product",
    year: "2026",
    role: "Frontend Developer",
  },
  {
    id: 2,
    title: "sixsafe.id",
    desc: "data.sixsafe_desc",
    fullDesc: "data.sixsafe_full_desc",
    contribution: "data.sixsafe_contribution",
    tech: ["Laravel", "Blade Templates", "CSS", "JavaScript"],
    image: ProjectImages.sixsafeImg,
    imageWidth: 1903,
    imageHeight: 997,
    link: "https://sixsafe.id",
    repo: null,
    category: "Training Platform",
    year: "2026",
    role: "Frontend Developer",
  },
  {
    id: 3,
    title: "Apotek Doctor M+",
    desc: "data.apotek_desc",
    fullDesc: "data.apotek_full_desc",
    contribution: "data.apotek_contribution",
    tech: ["HTML", "CSS", "JavaScript", "Bootstrap"],
    image: ProjectImages.apotekImg,
    imageWidth: 1919,
    imageHeight: 1079,
    link: "https://apotekdoctorm.id",
    category: "Operations System",
    year: "2025",
    role: "Project Lead",
  },
];
