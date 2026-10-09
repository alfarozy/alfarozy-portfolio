import unpasLogo from "@/assets/educations/unpas.png";
import smkLogo from "@/assets/educations/smk.png";

export interface EducationItem {
  id: number;
  institution: string;
  degree: string;
  period: string;
  description: string;
  logo: string;
  location: string;
}

export const educationData: EducationItem[] = [
  {
    id: 1,
    institution: "Universitas Pasundan",
    degree: "Sarjana Teknik Informatika",
    period: "2021 - 2025",
    description:
      "Focused on software engineering, web application development, algorithms, and cloud computing.",
    logo: unpasLogo,
    location: "Bandung, Indonesia",
  },
  {
    id: 2,
    institution: "SMK N 1 Lubuk Sikaping",
    degree: "Rekayasa Perangkat Lunak",
    period: "Jul 2018 – Jul 2021",
    description: "Focused on fundamental programming, software engineering, databases, web development, and computer systems.",
    logo: smkLogo,
    location: "Pasaman, Indonesia",
  },
];
