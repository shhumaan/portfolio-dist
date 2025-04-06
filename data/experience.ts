import type { TimelineItem } from "@/types/experience"

export const experience: TimelineItem[] = [
  {
    type: "work",
    title: "Technical Support Representative",
    company: "GAM Tech",
    date: "Feb 2023 - Mar 2024",
    description:
      "Provided technical support for enterprise clients, implemented AI-powered ticket automation, and led cloud migration projects. Achieved 95% first-call resolution rate and reduced system downtime by 20%.",
    skills: ["AWS", "Kubernetes", "Docker", "Python", "Terraform", "ServiceNow"],
    achievements: [
      "Achieved 95% first-call resolution rate",
      "Reduced system downtime by 20%",
      "Implemented AI-powered ticket automation system"
    ],
    testimonial: {
      text: "Anshuman was instrumental in our cloud migration. His technical expertise and problem-solving abilities saved us countless hours and resources.",
      author: "Sarah Johnson",
      position: "IT Director at GAM Tech"
    },
    expanded: {
      responsibilities: [
        "Managed and resolved complex technical issues for enterprise clients",
        "Led cloud migration projects from on-premise to AWS",
        "Implemented and maintained Kubernetes clusters",
        "Developed automation scripts using Python and Terraform"
      ],
      keyProjects: [
        {
          name: "AI Ticket Triage System",
          description: "Developed an ML-based system to automatically categorize and route support tickets",
          metrics: "Reduced response time by 35%"
        },
        {
          name: "AWS EKS Migration",
          description: "Led the migration of critical applications to AWS EKS",
          metrics: "Completed 2 weeks ahead of schedule with zero downtime"
        }
      ]
    }
  },
  {
    type: "work",
    title: ".NET Developer",
    company: "AK Network Solutions",
    date: "May 2021 - Aug 2022",
    description:
      "Developed full-stack applications using .NET Core, C#, and React. Created comprehensive test automation suite and implemented CI/CD pipelines for continuous delivery.",
    skills: [".NET Core", "C#", "React", "SQL Server", "Azure DevOps", "CI/CD"],
    achievements: [
      "Reduced application load time by 40%",
      "Implemented CI/CD pipeline reducing deployment time by 60%",
      "Developed 5 major features used by 10,000+ users"
    ],
    testimonial: {
      text: "Anshuman's code is clean, well-tested, and highly maintainable. His CI/CD implementation transformed our delivery process.",
      author: "Michael Chen",
      position: "Lead Developer at AK Network Solutions"
    },
    expanded: {
      responsibilities: [
        "Designed and implemented full-stack applications using .NET Core and React",
        "Developed and maintained SQL Server databases",
        "Created comprehensive test automation suite",
        "Implemented CI/CD pipelines using Azure DevOps"
      ],
      keyProjects: [
        {
          name: "Enterprise Customer Portal",
          description: "Built a responsive customer portal with real-time data visualization",
          metrics: "Used by 15,000+ customers daily"
        },
        {
          name: "DevOps Pipeline Overhaul",
          description: "Redesigned deployment pipeline with automated testing and staging environments",
          metrics: "Reduced deployment failures by 80%"
        }
      ]
    }
  },
  {
    type: "education",
    title: "Post Graduate Diploma in Web Development",
    company: "Conestoga College",
    date: "2022 - 2023",
    description:
      "Specialized in modern web technologies including React, Node.js, and cloud services. Completed capstone project on AI-assisted web development workflows.",
    skills: ["React", "Node.js", "AWS", "TypeScript", "MongoDB", "Express"],
    achievements: [
      "Dean's Honor List (3.9/4.0 GPA)",
      "Capstone Project Excellence Award",
      "Web Development Hackathon Winner"
    ],
    expanded: {
      responsibilities: [
        "Completed advanced coursework in modern web development",
        "Led team projects and coordinated with cross-functional teams",
        "Researched and implemented AI-assisted development workflows",
        "Participated in hackathons and coding competitions"
      ],
      keyProjects: [
        {
          name: "AI-Assisted Code Editor",
          description: "Capstone project: Created a web-based code editor with AI suggestions",
          metrics: "Presented at student innovation showcase"
        }
      ]
    }
  },
  {
    type: "work",
    title: "Web Developer",
    company: "Freelancer.com",
    date: "Nov 2019 - Apr 2021",
    description:
      "Designed and developed custom websites and web applications for various clients. Specialized in WordPress customization, e-commerce solutions, and SEO optimization.",
    skills: ["WordPress", "PHP", "JavaScript", "WooCommerce", "SEO", "UI/UX Design"],
    achievements: [
      "Maintained 5-star client rating across 25+ projects",
      "Increased client conversion rates by an average of 35%",
      "Reduced page load times by 60% through optimization"
    ],
    testimonial: {
      text: "Working with Anshuman was a pleasure. He delivered our e-commerce site ahead of schedule and the results exceeded our expectations.",
      author: "Lisa Rodriguez",
      position: "Owner, Boutique Marketplace"
    },
    expanded: {
      responsibilities: [
        "Designed and developed custom WordPress themes and plugins",
        "Created e-commerce solutions using WooCommerce",
        "Performed SEO optimization and analytics implementation",
        "Provided ongoing maintenance and support"
      ],
      keyProjects: [
        {
          name: "Boutique Marketplace",
          description: "E-commerce platform for small artisan businesses",
          metrics: "Generated $120K in first-year sales"
        },
        {
          name: "Restaurant Ordering System",
          description: "Online ordering and reservation system for restaurant chain",
          metrics: "Processed 2000+ orders per month"
        }
      ]
    }
  },
  {
    type: "education",
    title: "Bachelor's Degree in Computer Science",
    company: "Kurukshetra University",
    date: "2019 - 2021",
    description:
      "Studied computer science fundamentals, data structures, algorithms, and software engineering principles. Participated in coding competitions and hackathons.",
    skills: ["Java", "Data Structures", "Algorithms", "Database Design", "Software Engineering"],
    achievements: [
      "Graduated with First Class Honors",
      "Published research paper on efficient sorting algorithms",
      "2nd Place in National Coding Competition"
    ],
    expanded: {
      responsibilities: [
        "Completed rigorous coursework in computer science fundamentals",
        "Conducted research on algorithm optimization",
        "Participated in coding competitions and hackathons",
        "Mentored junior students in programming concepts"
      ],
      keyProjects: [
        {
          name: "Optimized Sorting Algorithm Implementation",
          description: "Research project comparing performance of various sorting algorithms",
          metrics: "Published in university journal"
        },
        {
          name: "Hospital Management System",
          description: "Comprehensive database project for managing hospital operations",
          metrics: "Selected as exemplary student project"
        }
      ]
    }
  },
]

