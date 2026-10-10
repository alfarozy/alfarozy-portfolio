export interface SkillCategory {
  id: number;
  category: string;
  key: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [
  {
    id: 1,
    category: "Web Development",
    key: "skills.web_dev",
    skills: [
      "React.js",
      "TypeScript",
      "Tailwind CSS",
      "Laravel",
      "Go",
      "Node.js",
      "Express.js",
      "RESTful API",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    id: 2,
    category: "Cloud Architecture",
    key: "skills.cloud_architecture",
    skills: [
      "Google Cloud Platform",
      "Google Compute Engine",
      "Cloud Storage",
      "Cloudflare CDN & DNS",
      "Docker Containerization",
      "CI / CD Pipelines",
      "Nginx & Reverse Proxy",
      "Linux / Shell Scripting",
      "Git / GitHub / GitLab",
    ],
  },
];
