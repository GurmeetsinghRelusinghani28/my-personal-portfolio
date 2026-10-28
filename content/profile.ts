export const profile = {
  name: "Gurmeetsingh Relusinghani",
  shortName: "Gurmeetsingh",
  role: "Computer Engineering Student · Aspiring SDE",
  availability: "Open to Software Development Opportunities",
  headline: "I build software that turns complex problems into useful products.",
  intro:
    "I'm a Computer Engineering student at Vishwakarma Institute of Technology, Pune, building full-stack applications, AI-powered products, and developer tools with a focus on practical impact.",
  email: "gurmeetsingh50216@gmail.com",
  graduation: "May 2027",
  education: {
    degree: "B.Tech in Computer Engineering",
    institution: "Vishwakarma Institute of Technology, Pune",
    cgpa: "8.73/10",
  },
  social: {
    github: "https://github.com/GurmeetsinghRelusinghani28",
    linkedin:
      "https://www.linkedin.com/in/gurmeetsingh-relusinghani-5b0bb7302/",
    leetcode: "https://leetcode.com/u/Vpxusc8wgV/",
  },
  coding: {
    leetcodeRating: "1600+",
    codeforcesRating: "1300+",
    codechef: {
      rating: 1156,
      stars: "1-Star",
      /** Add your public CodeChef profile URL when available */
      profileUrl: null as string | null,
    },
  },
  highlights: [
    { label: "CGPA", value: "8.73/10" },
    { label: "LeetCode", value: "1600+ rating" },
    { label: "Codeforces", value: "1300+ rating" },
    { label: "Hackathons", value: "Runner-up · AISF & MIT" },
    { label: "Leadership", value: "Technical Head · Abhivriddhi Committee" },
  ],
  githubUsername: "GurmeetsinghRelusinghani28",
  resumePath: "/resume/gurmeetsingh-relusinghani-resume.pdf",
  rotatingFocus: [
    "Full-Stack Development",
    "AI Applications",
    "Problem Solving",
  ] as const,
} as const;

export type Profile = typeof profile;
