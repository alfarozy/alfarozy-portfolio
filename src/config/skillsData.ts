export interface SkillCategory {
  id: number;
  category: string;
  key: string;
  skills: string[];
}

export const skillsData: SkillCategory[] = [

  {
    id: 1,
    category: "Backend & APIs",
    key: "skills.data_apis",
    skills: [
      "Node.js",
      "Express.js",
      "Laravel",
      "GO",
      "RESTful API",
      "JWT Authentication",
      "MySQL",
      "PostgreSQL",
    ],
  },
  {
    id: 2,
    category: "Cloud & Infrastructure",
    key: "skills.cloud_devops",
    skills: [
      "Google Cloud Platform",
      "Google Compute Engine",
      "Cloud Storage",
      "Linux / Shell",
      "Docker",
      "Git / GitHub / GitLab",
    ],
  },
];
