import type { Project } from "@/types/project"

export const projects: Project[] = [
  {
    id: "ai-ticket-automation",
    title: "AI-Powered Ticket Automation",
    description: "Automated support ticket workflow using ChatGPT integration with Zendesk",
    longDescription:
      "Developed a system that uses AI to categorize, prioritize, and generate initial responses for support tickets.",
    achievements: [
      "Reduced first response time by 65%",
      "Improved ticket categorization accuracy to 92%",
      "Automated response generation for common issues",
      "Integrated with existing Zendesk workflow",
    ],
    technologies: ["Python", "ChatGPT API", "Zendesk API", "Flask", "Docker"],
    category: "ai",
    company: "GAM Tech",
    date: "2023-2024",
    githubUrl: "https://github.com/anshuman/ai-ticket-automation",
    featured: true,
  },
  {
    id: "cloud-migration",
    title: "Cloud Migration & Optimization",
    description: "Migrated on-premises infrastructure to AWS with cost optimization",
    longDescription:
      "Led the migration of legacy on-premises systems to AWS cloud infrastructure with a focus on reliability and cost efficiency.",
    achievements: [
      "Reduced infrastructure costs by 35%",
      "Improved system reliability with 99.9% uptime",
      "Implemented auto-scaling for demand fluctuations",
      "Created comprehensive documentation and training",
    ],
    technologies: ["AWS", "EC2", "S3", "CloudFormation", "Terraform", "Docker"],
    category: "cloud",
    company: "GAM Tech",
    date: "2023",
    featured: true,
  },
  {
    id: "support-enhancement",
    title: "Technical Support Enhancement",
    description: "Redesigned support processes and implemented new tools for efficiency",
    longDescription:
      "Overhauled the technical support workflow with new tools and processes to improve resolution times and customer satisfaction.",
    achievements: [
      "Achieved 95% first-call resolution rate",
      "Reduced average resolution time by 40%",
      "Implemented knowledge base with 200+ articles",
      "Trained team on new support methodologies",
    ],
    technologies: ["Zendesk", "Confluence", "Jira", "Power BI", "Process Design"],
    category: "support",
    company: "GAM Tech",
    date: "2023",
    featured: true,
  },
  {
    id: "test-automation",
    title: "Comprehensive Test Automation Suite",
    description: "Built end-to-end test automation framework for web applications",
    longDescription:
      "Developed a robust test automation framework to ensure quality and reliability across multiple web applications.",
    achievements: [
      "Reduced regression testing time by 75%",
      "Increased test coverage to 85%",
      "Integrated with CI/CD pipeline for continuous testing",
      "Implemented detailed test reporting dashboard",
    ],
    technologies: ["Selenium", "Python", "Jenkins", "TestNG", "Docker"],
    category: "development",
    company: "AK Network Solutions",
    date: "2022",
    githubUrl: "https://github.com/anshuman/test-automation",
    featured: false,
  },
  {
    id: "dotnet-react-app",
    title: ".NET/React Application",
    description: "Full-stack application for inventory management and reporting",
    longDescription:
      "Designed and developed a comprehensive inventory management system with .NET backend and React frontend.",
    achievements: [
      "Streamlined inventory processes saving 15 hours/week",
      "Implemented real-time reporting dashboard",
      "Created mobile-responsive design",
      "Built RESTful API with comprehensive documentation",
    ],
    technologies: [".NET Core", "C#", "React", "SQL Server", "Entity Framework", "Azure DevOps"],
    category: "development",
    company: "AK Network Solutions",
    date: "2021-2022",
    githubUrl: "https://github.com/anshuman/inventory-system",
    liveUrl: "https://inventory-demo.anshuman.dev",
    featured: true,
  },
  {
    id: "client-web-solutions",
    title: "Custom Client Web Solutions",
    description: "Developed tailored websites and web applications for various clients",
    longDescription:
      "Created custom web solutions for small to medium businesses, focusing on performance, SEO, and user experience.",
    achievements: [
      "Delivered 15+ client projects on time and within budget",
      "Improved client conversion rates by an average of 25%",
      "Implemented SEO best practices resulting in traffic increases",
      "Built custom CMS solutions for easy content management",
    ],
    technologies: ["PHP", "WordPress", "JavaScript", "MySQL", "HTML/CSS", "SEO"],
    category: "development",
    company: "Freelancer.com",
    date: "2019-2021",
    featured: false,
  },
]

