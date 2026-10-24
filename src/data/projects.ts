export type Project = {
  slug: string;
  title: string;
  summary: string;
  description: string;
  techStack: string[];
  repoUrl: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
};

export const projects: Project[] = [
  {
    slug: "cropmind-chatbot",
    title: "CropMind",
    summary:
      "AI-powered smart farming assistant combining IoT soil data, market prices, and generative AI.",
    description:
      "CropMind connects real-time soil sensor data and APMC mandi market prices with a generative AI model to give farmers actionable advice: crop cataloging, weather-aware planning, disease diagnosis, and irrigation guidance. It includes a crop registry with CRUD operations backed by MongoDB, a live farming telemetry dashboard with price sparklines, an AI agronomist diagnostic flow for crop symptoms, and a floating chat assistant powered by Google Gemini. Auth uses JWT plus Google OAuth with a sandbox fallback for local development.",
    techStack: [
      "React 19",
      "Vite",
      "Node.js",
      "Express 5",
      "MongoDB",
      "Gemini API",
    ],
    repoUrl: "https://github.com/deepanshi-code/CropMind-Chatbot",
    liveUrl: "https://crop-mind-chatbot-frontend.vercel.app",
    image: "/project-images/cropmind-chatbot.jpg",
    featured: true,
  },
  {
    slug: "shrinkbyte",
    title: "ShrinkByte",
    summary:
      "Lossless file compression and decompression built from scratch using Huffman coding.",
    description:
      "ShrinkByte implements lossless file compression using Huffman coding, built as a practical application of Data Structures (frequency tables, min-heaps, binary trees) in C/C++, with a Node.js/Express layer and a simple web UI on top. It compresses suitable files, decompresses them, and verifies the recovered file is byte-for-byte identical to the original — the goal was understanding the compression process from first principles rather than using an existing library.",
    techStack: ["C++", "C", "Node.js", "Express", "JavaScript"],
    repoUrl: "https://github.com/deepanshi-code/ShrinkByte",
    image: "/project-images/shrinkbyte.jpg",
  },
  {
    slug: "orbit",
    title: "Orbit",
    summary:
      "A study timer, stopwatch, and task manager that runs entirely in the browser.",
    description:
      "Orbit is a study-tracking app built with no framework and no backend — plain HTML, CSS, and JavaScript. You pick a task, run a countdown or stopwatch, and the time studied logs automatically against that task's deadline and study-time budget, so you can see progress and get alerted before a deadline slips. It supports six themes, a mobile-friendly layout that switches between Focus and Tasks views, desktop notifications for deadlines, and local profiles with WebCrypto-hashed passwords, all persisted in localStorage.",
    techStack: ["JavaScript", "HTML", "CSS", "Web Audio API", "WebCrypto"],
    repoUrl: "https://github.com/deepanshi-code/Orbit",
    liveUrl: "https://deepanshi-code.github.io/Orbit/",
    image: "/project-images/orbit.jpg",
  },
  {
    slug: "calcora",
    title: "Calcora",
    summary:
      "A dependency-free scientific toolkit: calculator, plotter, calculus tools, and unit converters.",
    description:
      "Calcora bundles a scientific calculator, function plotter, calculus tools, unit and currency converters, a BMI calculator, and a searchable formula library into a single dependency-free, offline-capable (PWA) web app. It's validated with a dedicated test suite plus an accuracy benchmark checked against an independent Python reference implementation, and a mutation-testing script that plants known bugs to prove the benchmark can actually catch regressions.",
    techStack: ["JavaScript", "HTML", "CSS", "Service Worker / PWA"],
    repoUrl: "https://github.com/deepanshi-code/CalCora",
    image: "/project-images/calcora.jpg",
  },
  {
    slug: "ime-email-segregation",
    title: "IME Shipping Email Segregation",
    summary:
      "Automates classification and data extraction from shipping/chartering emails.",
    description:
      "Built for the IME Innovation Challenge under TBI-GEU, this system processes unstructured shipping and chartering emails (vessel availability, voyage charter cargo requests, time charter requirements) and converts them into structured, machine-readable JSON — without calling any external LLM API. It identifies the email category and extracts the relevant business fields using local Python processing, automating a task that otherwise requires manually reading each email.",
    techStack: ["Python"],
    repoUrl: "https://github.com/deepanshi-code/IME_EMIAL_SEGREGATION",
    image: "/project-images/ime-email-segregation.jpg",
  },
  {
    slug: "password-generator",
    title: "Password Generator",
    summary:
      "A customizable secure password generator with a glassmorphism UI.",
    description:
      "A small front-end tool for generating secure random passwords with configurable length and character sets (uppercase, lowercase, numbers, symbols), a strength indicator, and one-click copy to clipboard, styled with a glassmorphism UI.",
    techStack: ["HTML", "CSS", "JavaScript"],
    repoUrl: "https://github.com/deepanshi-code/Password-Generator",
    liveUrl: "https://deepanshi-code.github.io/Password-Generator/",
    image: "/project-images/password-generator.jpg",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
