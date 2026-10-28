export type ProjectCaseStudy = {
  slug: string;
  title: string;
  subtitle: string;
  tagline: string;
  description: string;
  stack: string[];
  highlights: string[];
  problem: string;
  approach: string;
  architecture: string;
  challenges: string;
  results: string;
  disclaimer?: string;
  repoUrl: string;
  liveUrl?: string;
  featured: boolean;
  primary?: boolean;
  visual: "chattermind" | "rozgarsetu" | "dermscan";
};

export const projects: ProjectCaseStudy[] = [
  {
    slug: "chattermind",
    title: "ChatterMind",
    subtitle: "AI-Powered Collaborative Development Platform",
    tagline:
      "Real-time collaborative coding with AI-assisted workflows and in-browser execution.",
    description:
      "A collaborative coding environment combining real-time project workspaces, AI-assisted code generation, and in-browser application execution.",
    stack: [
      "React",
      "Node.js",
      "Express.js",
      "MongoDB",
      "Socket.IO",
      "JWT",
      "bcrypt",
      "Google Gemini AI",
      "WebContainer API",
      "Docker",
      "GitHub Actions",
      "AWS EC2",
    ],
    highlights: [
      "Real-time multi-user project workspaces",
      "Sub-100ms message synchronization (as reported in project documentation)",
      "Planner → coder → reviewer AI workflow",
      "~70% reduction in manual setup effort (as reported)",
      "JWT authentication and bcrypt password hashing",
      "Persistent virtual file tree and browser-based execution",
      "Docker deployment and GitHub Actions CI/CD",
    ],
    problem:
      "Developers often lose time coordinating setup, sharing context, and iterating on code across distributed teams. ChatterMind targets that friction with a shared workspace and AI-assisted flow.",
    approach:
      "Built a full-stack platform with WebSocket-backed rooms, secure auth, and Gemini-powered agents orchestrated in planner, coder, and reviewer roles. Integrated WebContainer for runnable previews without local installs.",
    architecture:
      "React client ↔ Express API ↔ MongoDB for persistence; Socket.IO for sync; JWT sessions; containerized deployment on AWS EC2 with CI via GitHub Actions.",
    challenges:
      "Balancing low-latency sync with consistent file state, sandboxed execution safety, and reliable AI handoffs between workflow stages.",
    results:
      "Delivered multi-user workspaces, in-browser runs, and automated deployment—showcasing real-time systems, AI integration, and production-minded DevOps.",
    repoUrl: "https://github.com/GurmeetsinghRelusinghani28/ChatterMind",
    featured: true,
    primary: true,
    visual: "chattermind",
  },
  {
    slug: "rozgarsetu",
    title: "RozgarSetu",
    subtitle: "Cross-Platform Workforce Hiring Platform",
    tagline:
      "Connecting workers and contractors through one backend and AI-assisted job discovery.",
    description:
      "A web and mobile hiring platform connecting workers with contractors through a shared backend and AI-assisted job discovery.",
    stack: [
      "React",
      "React Native",
      "Node.js",
      "Express.js",
      "MongoDB",
      "JWT",
      "Groq LLM APIs",
      "Axios",
      "AsyncStorage",
      "Expo",
    ],
    highlights: [
      "Shared backend architecture for web and mobile clients",
      "Hindi/English conversational job discovery",
      "AI-assisted retrieval of top six matching opportunities per query",
      "OTP authentication with ten-minute expiry and retry protection",
      "Persistent authentication and multilingual onboarding",
    ],
    problem:
      "Informal workforce hiring is fragmented across channels, languages, and devices. RozgarSetu unifies discovery and matching for workers and contractors.",
    approach:
      "Single Express/MongoDB backend serving React web and React Native mobile clients, with Groq-powered conversational search and OTP-based identity.",
    architecture:
      "REST API with JWT/OTP flows; mobile persistence via AsyncStorage; LLM layer for bilingual query understanding and ranked job lists.",
    challenges:
      "Designing accessible UX for multilingual users while keeping auth secure and API responses fast on mobile networks.",
    results:
      "Demonstrated cross-platform product engineering, backend reuse, and practical AI retrieval—not just chat for its own sake.",
    repoUrl: "https://github.com/GurmeetsinghRelusinghani28/RozgarSetu",
    liveUrl: "https://rozgar-setu-gilt.vercel.app/",
    featured: true,
    visual: "rozgarsetu",
  },
  {
    slug: "dermscan",
    title: "DermScan",
    subtitle: "Skin Disease Classification Using CNN",
    tagline:
      "Experimental multiclass CNN classifier on dermatological imagery—research/education, not clinical use.",
    description:
      "A computer vision project that classifies dermatological images using a convolutional neural network.",
    stack: ["Python", "TensorFlow", "CNN", "Google Colab", "Dermnet dataset"],
    highlights: [
      "Dataset of 12,000+ dermatological images",
      "~90% multiclass classification accuracy (as reported on validation)",
      "Image augmentation and model optimization",
      "GPU-accelerated training and evaluation",
    ],
    problem:
      "Explore whether CNN architectures can learn discriminative features across dermatological classes using a public dataset— as an ML engineering exercise.",
    approach:
      "Trained and tuned a CNN with augmentation on the Dermnet dataset in Colab, emphasizing reproducible training loops and evaluation metrics.",
    architecture:
      "Python/TensorFlow pipeline: preprocessing → augmented batches → CNN training → held-out evaluation on GPU.",
    challenges:
      "Class imbalance, overfitting on fine-grained skin lesions, and clear separation between research accuracy and real-world medical validation.",
    results:
      "Achieved strong reported validation accuracy while documenting limits—no claim of clinical diagnosis.",
    disclaimer:
      "This project is for educational and experimental purposes only. It is not validated for medical diagnosis or patient use.",
    repoUrl:
      "https://github.com/GurmeetsinghRelusinghani28/SkinDiseasePrediction",
    featured: true,
    visual: "dermscan",
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export function getProjectBySlug(slug: string): ProjectCaseStudy | undefined {
  return projects.find((p) => p.slug === slug);
}
