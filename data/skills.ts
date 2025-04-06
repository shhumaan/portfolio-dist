import type { Skill } from "@/types/skill"

// Define all skill IDs in one place to avoid typos
const skillIds = {
  // Cloud
  azure: "azure",
  aws: "aws",
  
  // Development
  python: "python",
  dotnet: "dotnet",
  react: "react",
  typescript: "typescript",
  
  // AI
  chatgpt: "chatgpt",
  customGpt: "custom-gpt",
  
  // Database
  sqlServer: "sql-server",
  mongodb: "mongodb",
  
  // System
  windowsServer: "windows-server",
  docker: "docker"
};

export const skills: Skill[] = [
  {
    id: skillIds.azure,
    name: "Microsoft Azure",
    category: "cloud",
    proficiency: 85,
    description: "Cloud computing platform for building, testing, deploying, and managing applications and services.",
    experience: "Extensive experience with Azure VMs, App Service, Functions, and Azure DevOps for CI/CD pipelines.",
    relatedSkills: [skillIds.aws, skillIds.docker, skillIds.dotnet, skillIds.windowsServer],
    isRecent: true,
    icon: "☁️",
    years: 5,
    projects: ["Enterprise App Migration", "Serverless Function Architecture"]
  },
  {
    id: skillIds.aws,
    name: "Amazon Web Services",
    category: "cloud",
    proficiency: 70,
    description:
      "Cloud services platform offering compute power, database storage, content delivery, and other functionality.",
    experience: "Worked with EC2, S3, Lambda, and CloudFormation for infrastructure as code.",
    relatedSkills: [skillIds.azure, skillIds.python, skillIds.docker, skillIds.mongodb],
    isRecent: false,
    icon: "☁️",
    years: 3,
    projects: ["S3 Media Storage System", "Lambda Processing Pipeline"]
  },
  {
    id: skillIds.python,
    name: "Python",
    category: "development",
    proficiency: 90,
    description: "High-level programming language known for its readability and versatility.",
    experience: "Used Python for automation scripts, data processing, and backend development with Flask and FastAPI.",
    relatedSkills: [skillIds.aws, skillIds.dotnet, skillIds.mongodb, skillIds.chatgpt, skillIds.customGpt],
    isRecent: true,
    icon: "🐍",
    years: 7,
    projects: ["Data Processing Pipeline", "API Backend Services"]
  },
  {
    id: skillIds.dotnet,
    name: ".NET",
    category: "development",
    proficiency: 85,
    description:
      "Free, cross-platform, open-source developer platform for building many different types of applications.",
    experience: "Developed enterprise applications using .NET Core and ASP.NET MVC with C#.",
    relatedSkills: [skillIds.sqlServer, skillIds.azure, skillIds.windowsServer, skillIds.typescript],
    isRecent: true,
    icon: "🟣",
    years: 6,
    projects: ["Enterprise Web Application", "Microservice Architecture"]
  },
  {
    id: skillIds.react,
    name: "React",
    category: "development",
    proficiency: 80,
    description: "JavaScript library for building user interfaces, particularly single-page applications.",
    experience: "Built interactive web applications with React, Redux, and Next.js for server-side rendering.",
    relatedSkills: [skillIds.typescript, skillIds.mongodb, skillIds.customGpt],
    isRecent: true,
    icon: "⚛️",
    years: 4,
    projects: ["Portfolio Website", "Admin Dashboard"]
  },
  {
    id: skillIds.typescript,
    name: "TypeScript",
    category: "development",
    proficiency: 85,
    description: "Strongly typed programming language that builds on JavaScript, giving better tooling at any scale.",
    experience: "Used TypeScript for frontend and backend development to improve code quality and maintainability.",
    relatedSkills: [skillIds.react, skillIds.dotnet, skillIds.chatgpt],
    isRecent: true,
    icon: "📘",
    years: 4,
    projects: ["Type-Safe APIs", "Large Scale Web Applications"]
  },
  {
    id: skillIds.chatgpt,
    name: "ChatGPT API",
    category: "ai",
    proficiency: 90,
    description: "API for accessing OpenAI's language models for natural language processing tasks.",
    experience: "Integrated ChatGPT into support workflows for ticket categorization and response generation.",
    relatedSkills: [skillIds.customGpt, skillIds.python, skillIds.typescript],
    isRecent: true,
    icon: "🤖",
    years: 2,
    projects: ["AI Support Agent", "Content Generation System"]
  },
  {
    id: skillIds.customGpt,
    name: "Custom GPT Workflows",
    category: "ai",
    proficiency: 85,
    description: "Specialized AI workflows tailored for specific business processes and tasks.",
    experience: "Developed custom GPT workflows for technical support, documentation, and code review.",
    relatedSkills: [skillIds.chatgpt, skillIds.python, skillIds.react],
    isRecent: true,
    icon: "🧠",
    years: 2,
    projects: ["Automated Documentation", "Code Review Assistant"]
  },
  {
    id: skillIds.sqlServer,
    name: "SQL Server",
    category: "database",
    proficiency: 80,
    description: "Microsoft's relational database management system.",
    experience: "Designed and optimized databases, wrote complex queries, and implemented stored procedures.",
    relatedSkills: [skillIds.mongodb, skillIds.dotnet, skillIds.windowsServer],
    isRecent: false,
    icon: "🗄️",
    years: 8,
    projects: ["Enterprise Data Warehouse", "Performance Optimization"]
  },
  {
    id: skillIds.mongodb,
    name: "MongoDB",
    category: "database",
    proficiency: 75,
    description: "NoSQL database program that uses JSON-like documents with optional schemas.",
    experience: "Used MongoDB for web applications requiring flexible schema design and horizontal scaling.",
    relatedSkills: [skillIds.sqlServer, skillIds.aws, skillIds.python, skillIds.react],
    isRecent: true,
    icon: "🍃",
    years: 3,
    projects: ["Document-Based CMS", "Real-Time Analytics"]
  },
  {
    id: skillIds.windowsServer,
    name: "Windows Server",
    category: "system",
    proficiency: 85,
    description:
      "Microsoft's server operating system designed for enterprise-level management, applications, and storage.",
    experience: "Managed Windows Server environments, including Active Directory, IIS, and network services.",
    relatedSkills: [skillIds.azure, skillIds.dotnet, skillIds.sqlServer, skillIds.docker],
    isRecent: false,
    icon: "🪟",
    years: 10,
    projects: ["Enterprise Directory Services", "Windows Server Migration"]
  },
  {
    id: skillIds.docker,
    name: "Docker",
    category: "system",
    proficiency: 70,
    description: "Platform for developing, shipping, and running applications in containers.",
    experience: "Containerized applications for consistent deployment across different environments.",
    relatedSkills: [skillIds.aws, skillIds.azure, skillIds.windowsServer],
    isRecent: true,
    icon: "🐳",
    years: 4,
    projects: ["Containerized Microservices", "Development Environment Setup"]
  },
]

