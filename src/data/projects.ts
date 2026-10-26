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
    slug: "doon-view",
    title: "Doon View",
    summary:
      "Review intelligence for Uttarakhand hill towns, built for an AI–Tourism Hackathon — team project.",
    description:
      "Built with a teammate for the AI–Tourism Hackathon (UNWTO theme: using AI to redesign tourism) — I pair-programmed and co-designed features alongside them. Doon View reads every recent review of every hotel in a hill-station market together and answers: is a complaint specific to one hotel, or shared across the whole town? It estimates which complaint costs a hotel the most star-rating (a linear model of stars on per-aspect complaints) and surfaces destination-level sentiment trends with real guest quotes. Reviews are classified with a fine-tuned DeBERTa-v3 model (English) and Gemini (short or Hindi-English text), with keyword rules as a fallback; a FastAPI backend serves the computed stats to a React frontend with a Three.js ridge-relief background.",
    techStack: [
      "React",
      "Tailwind CSS",
      "Three.js",
      "FastAPI",
      "DeBERTa-v3",
      "Gemini API",
    ],
    repoUrl: "https://github.com/deepanshi-code/doon-view",
    liveUrl: "https://doon-view.abhinesh.codes",
    image: "/project-images/doon-view.jpg",
  },
  {
    slug: "bullion-basis",
    title: "Bullion Basis",
    summary:
      "Tests MCX gold futures lot sizes for a tradable pricing gap — built for HackInHills 2026, team project.",
    description:
      "Built with Team Blaze for HackInHills 2026 (Track 3: Commodity Derivatives Intelligence) — I pair-programmed and co-designed features alongside my teammate. MCX lists gold futures in four lot sizes (GOLDM, GOLDTEN, GOLDGUINEA, GOLDPETAL); the app normalizes every contract to one price per gram of 999 gold and checks whether the gaps between them are a tradable edge after costs, or just contract differences. It ingests and validates real MCX Bhavcopy data, runs a walk-forward backtest (decide at close, trade next day, expanding training window, costs modeled at 1x/2x/3x) against no-cost and random-entry baselines, and only claims an edge if net Sharpe is positive across every hold-out fold at 2x costs.",
    techStack: ["React 19", "TypeScript", "Vite", "Tailwind CSS", "GSAP"],
    repoUrl: "https://github.com/deepanshi-code/Bullion-Basis",
    liveUrl: "https://bullion-basis.pages.dev",
    image: "/project-images/bullion-basis.jpg",
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
    slug: "keyforge",
    title: "KeyForge",
    summary:
      "On-device identity toolkit: usernames, project/team names, personas, and encrypted passwords.",
    description:
      "KeyForge generates usernames, project names, team names, full fake personas, and secure passwords — entirely client-side, with no server. It started as a beginner password generator in plain HTML/CSS/JS and was rebuilt as a modular TypeScript app. Starring favorites trains a small on-device character-trigram model that re-ranks future results toward your taste, with 25% of results still drawn randomly so suggestions don't collapse into a bubble; an Insights tab measures whether that actually helps using interleaving (the method search engines use to A/B test rankings) with a 95% confidence interval and a two-proportion z-test, rather than just asserting it works. Saved favorites live in password-protected local profiles: a key is derived with PBKDF2-SHA256 (600,000 rounds) and items are encrypted with AES-256-GCM via the Web Crypto API, with encrypted backup/restore to move a profile between devices. Installable offline as a PWA.",
    techStack: ["TypeScript", "Web Crypto API", "PWA"],
    repoUrl: "https://github.com/deepanshi-code/KeyForge",
    liveUrl: "https://deepanshi-code.github.io/KeyForge/",
    image: "/project-images/keyforge.jpg",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
