// app/data/toolbox.ts

interface SkillsDataItem {
  title: string;
  icon: string;
  description: string;
  skills: string[];
}

type SoftwareDataItem = {
  title: string;
  imgSrc: string;
  link: string;
};

const softwareData: SoftwareDataItem[] = [
  {
    title: "Cursor",
    imgSrc: "/toolbox/cursor_logo.png",
    link: "https://code.visualstudio.com/",
  },
  {
    title: "Git",
    imgSrc: "/toolbox/git_logo.png",
    link: "https://code.visualstudio.com/",
  },
  {
    title: "VSCode",
    imgSrc: "/toolbox/vscode_logo.png",
    link: "https://code.visualstudio.com/",
  },
  {
    title: "Notion",
    imgSrc: "/toolbox/notion_logo.png",
    link: "https://www.notion.so/",
  },
  {
    title: "Discord",
    imgSrc: "/toolbox/discord_logo.png",
    link: "https://discord.com/",
  },
  {
    title: "Brave",
    imgSrc: "/toolbox/brave_logo.png",
    link: "https://brave.com/",
  },
  {
    title: "Figma",
    imgSrc: "/toolbox/figma_logo.png",
    link: "https://www.figma.com/",
  },
  {
    title: "TickTick",
    imgSrc: "/toolbox/ticktick_logo.png",
    link: "https://ticktick.com/",
  },
  {
    title: "Spotify",
    imgSrc: "/toolbox/spotify_logo.png",
    link: "https://www.spotify.com/",
  },

  {
    title: "Overleaf",
    imgSrc: "/toolbox/overleaf_logo.png",
    link: "https://flexibits.com/fantastical",
  },
];

const skillsData: SkillsDataItem[] = [
  {
    title: "Programming",
    icon: "/toolbox/programming.svg",
    description:
      "Core programming languages I've used extensively in my projects, competitive problem solving and building end-to-end applications.",
    skills: [
      "Python",
      "JavaScript",
      "Java",
      "SQL",
      "HTML/CSS",
      "R Programming",
    ],
  },
  {
    title: "Relevant Courses",
    icon: "/toolbox/courses.svg",
    description:
      "Key academic and professional courses that have shaped my expertise in AI and software development.",
    skills: [
      "Machine Learning",
      "Deep Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Data Structures & Algorithms",
      "Software Engineering",
      "Database Management",
      "Operating Systems",
    ],
  },
  {
    title: "AI/ML Expertise",
    icon: "/toolbox/brain.svg",
    description:
      "Specialized areas in AI/ML where I've researched, developed and deployed production-ready solutions.",
    skills: [
      "PyTorch, Scikit Learn, Keras, TensorFlow",
      "Large Language Models",
      "Multimodal Processing (NLP, CV, Speech)",
      "Model Training & Finetuning",
      "Generative AI, Agentic Systems, RAG",
      "Model Optimization and Evaluation",
      "Recommendation Systems",
    ],
  },
  {
    title: "Software Development",
    icon: "/toolbox/version.svg",
    description:
      "Professional software development skills honed through internships at tech companies, building scalable projects, and delivering production systems.",
    skills: [
      "Full Stack Development",
      "RDBMS (MySQL, PostgreSQL)",
      "Version Control (Git/Github)",
      "React, TypeScript, Tailwind, Node.js",
      "Docker, Cloud (AWS), MongoDB, Kafka",
      "Flask & Flutter Framework",
      "Big Data (Hadoop, PySpark)",
      "System Design",
    ],
  },
];

export { skillsData, softwareData };
