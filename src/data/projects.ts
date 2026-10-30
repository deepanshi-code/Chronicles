export type FlowNodeShape = "start" | "end" | "process" | "decision" | "io";

export type FlowNode = {
  id: string;
  label: string;
  detail?: string;
  shape: FlowNodeShape;
  tech?: string[];
};

export type FlowEdge = {
  from: string;
  to: string;
  label?: string;
};

export type FlowCluster = {
  id: string;
  label: string;
  color: string;
  nodeIds: string[];
};

export type Flowchart = {
  nodes: FlowNode[];
  edges: FlowEdge[];
  clusters?: FlowCluster[];
};

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
  flowchart?: Flowchart;
};

// Shared cluster palette, reused across every project's diagram.
const CLIENT = "#2aa9ff"; // frontend / UI
const SERVER = "#f5a623"; // API / backend routes
const DATA = "#34d399"; // storage / data stores
const AI = "#ff2d6e"; // AI / ML models
const LOGIC = "#a78bfa"; // core algorithms, validation, infra, tooling

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
    flowchart: {
      nodes: [
        { id: "start", label: "Farmer opens CropMind", shape: "start" },
        { id: "auth", label: "Authenticated?", shape: "decision" },
        { id: "login", label: "Google OAuth → JWT", detail: "Sandbox fallback in dev", shape: "process", tech: ["JWT", "OAuth"] },
        { id: "dashboard", label: "Dashboard page", detail: "Price sparklines", shape: "process" },
        { id: "registry", label: "Crop registry page", shape: "process" },
        { id: "chat", label: "Chat widget", shape: "process" },
        { id: "diagnostic", label: "Diagnostic page", shape: "process" },
        { id: "authRoute", label: "Auth routes", shape: "process", tech: ["Express 5"] },
        { id: "cropRoute", label: "Crop CRUD routes", shape: "process" },
        { id: "chatRoute", label: "Chat proxy route", shape: "process" },
        { id: "diagRoute", label: "Diagnostic route", shape: "process" },
        { id: "cropsDb", label: "Crops collection", shape: "io", tech: ["MongoDB"] },
        { id: "sensorDb", label: "Sensor readings", shape: "io" },
        { id: "priceDb", label: "Market prices", shape: "io" },
        { id: "chatEngine", label: "Gemini chat engine", shape: "process", tech: ["Gemini API"] },
        { id: "diagEngine", label: "Gemini diagnostic engine", shape: "process" },
        { id: "end", label: "Actionable crop advice", shape: "end" },
      ],
      edges: [
        { from: "start", to: "auth" },
        { from: "auth", to: "login", label: "No" },
        { from: "login", to: "authRoute" },
        { from: "authRoute", to: "dashboard" },
        { from: "auth", to: "dashboard", label: "Yes" },
        { from: "dashboard", to: "registry" },
        { from: "dashboard", to: "chat" },
        { from: "dashboard", to: "diagnostic" },
        { from: "registry", to: "cropRoute" },
        { from: "chat", to: "chatRoute" },
        { from: "diagnostic", to: "diagRoute" },
        { from: "cropRoute", to: "cropsDb" },
        { from: "cropRoute", to: "sensorDb" },
        { from: "cropRoute", to: "priceDb" },
        { from: "chatRoute", to: "chatEngine" },
        { from: "diagRoute", to: "diagEngine" },
        { from: "cropsDb", to: "end" },
        { from: "sensorDb", to: "end" },
        { from: "priceDb", to: "end" },
        { from: "chatEngine", to: "end" },
        { from: "diagEngine", to: "end" },
      ],
      clusters: [
        { id: "client", label: "Client (React 19 + Vite)", color: CLIENT, nodeIds: ["dashboard", "registry", "chat", "diagnostic"] },
        { id: "server", label: "Express 5 API", color: SERVER, nodeIds: ["authRoute", "cropRoute", "chatRoute", "diagRoute"] },
        { id: "data", label: "MongoDB", color: DATA, nodeIds: ["cropsDb", "sensorDb", "priceDb"] },
        { id: "ai", label: "Gemini API", color: AI, nodeIds: ["chatEngine", "diagEngine"] },
      ],
    },
    repoUrl: "https://github.com/deepanshi-code/CropMind-Chatbot",
    liveUrl: "https://crop-mind-chatbot-ten.vercel.app",
    image: "/project-images/cropmind-chatbot.jpg",
    featured: true,
  },
  {
    slug: "campus-lost-found",
    title: "Campus Lost & Found",
    summary:
      "A mobile app for colleges to report, match, and reunite lost and found items — in progress.",
    description:
      "A React Native (Expo) app for colleges and schools: people report items they've lost or found, and the app ranks possible matches by keyword overlap, location, and date proximity — transparent and rule-based rather than a black-box model. Only institutional email domains can sign up, verified with an emailed 6-digit code. A claimant has to describe a detail that isn't in the post before contact details are shared, and email/phone are only revealed after the original poster approves. The backend is Node.js 22 and Express 5 with JWT auth and SQLite (via Node's built-in node:sqlite, no native build step), and photo uploads go through Multer. Solo project, working prototype — not yet deployed.",
    techStack: ["React Native", "Expo", "Node.js", "Express 5", "SQLite"],
    flowchart: {
      nodes: [
        { id: "start", label: "User signs up", shape: "start" },
        { id: "domain", label: "Institutional email?", shape: "decision" },
        { id: "blocked", label: "Signup blocked", shape: "end" },
        { id: "mailer", label: "Email 6-digit code", shape: "process", tech: ["Nodemailer"] },
        { id: "verified", label: "Code verified", shape: "process" },
        { id: "report", label: "Report screen", shape: "process", tech: ["Expo"] },
        { id: "browse", label: "Browse / search screen", shape: "process" },
        { id: "respond", label: "Response screen", shape: "process" },
        { id: "authRoute", label: "Auth routes", shape: "process", tech: ["JWT"] },
        { id: "itemsRoute", label: "Items routes", shape: "process" },
        { id: "claimsRoute", label: "Claims routes", shape: "process", tech: ["Multer"] },
        { id: "matchEngine", label: "Match ranking", detail: "Keyword, location, date", shape: "process" },
        { id: "db", label: "SQLite", shape: "io" },
        { id: "decide", label: "Poster approves?", shape: "decision" },
        { id: "reveal", label: "Contact info revealed", shape: "end" },
        { id: "declined", label: "Stays closed", shape: "end" },
      ],
      edges: [
        { from: "start", to: "domain" },
        { from: "domain", to: "blocked", label: "No" },
        { from: "domain", to: "mailer", label: "Yes" },
        { from: "mailer", to: "verified" },
        { from: "verified", to: "authRoute" },
        { from: "authRoute", to: "itemsRoute" },
        { from: "authRoute", to: "claimsRoute" },
        { from: "verified", to: "report" },
        { from: "verified", to: "browse" },
        { from: "report", to: "itemsRoute" },
        { from: "browse", to: "itemsRoute" },
        { from: "itemsRoute", to: "db" },
        { from: "itemsRoute", to: "matchEngine" },
        { from: "matchEngine", to: "respond" },
        { from: "respond", to: "claimsRoute" },
        { from: "claimsRoute", to: "db" },
        { from: "claimsRoute", to: "decide" },
        { from: "decide", to: "reveal", label: "Approves" },
        { from: "decide", to: "declined", label: "Declines" },
      ],
      clusters: [
        { id: "client", label: "Expo client", color: CLIENT, nodeIds: ["verified", "report", "browse", "respond"] },
        { id: "server", label: "Express 5 API", color: SERVER, nodeIds: ["authRoute", "itemsRoute", "claimsRoute", "matchEngine"] },
        { id: "data", label: "SQLite", color: DATA, nodeIds: ["db"] },
        { id: "logic", label: "Email delivery", color: LOGIC, nodeIds: ["mailer"] },
      ],
    },
    repoUrl: "https://github.com/deepanshi-code/LostFound",
  },
  {
    slug: "shrinkbyte",
    title: "ShrinkByte",
    summary:
      "Lossless file compression and decompression built from scratch using Huffman coding.",
    description:
      "ShrinkByte implements lossless file compression using Huffman coding, a practical application of Data Structures (frequency tables, min-heaps, binary trees) originally written in C/C++ and ported to a browser-based implementation that runs entirely client-side via a Web Worker — no file ever leaves your device. It compresses suitable files, decompresses them, and verifies the recovered file is byte-for-byte identical to the original — the goal was understanding the compression process from first principles rather than using an existing library.",
    techStack: ["C++", "C", "Node.js", "Express", "JavaScript"],
    flowchart: {
      nodes: [
        { id: "start", label: "Select a file", shape: "start" },
        { id: "mode", label: "Compress or decompress?", shape: "decision" },
        { id: "freq", label: "Build frequency table", shape: "process" },
        { id: "heap", label: "Min-heap merges nodes", shape: "process" },
        { id: "tree", label: "Huffman tree + codes", shape: "process" },
        { id: "encode", label: "Encode", detail: "Web Worker", shape: "process" },
        { id: "compressed", label: "Compressed file", shape: "io" },
        { id: "decode", label: "Decode", detail: "Web Worker", shape: "process" },
        { id: "verify", label: "Byte-for-byte match?", shape: "decision" },
        { id: "pass", label: "Verified identical", shape: "end" },
        { id: "fail", label: "Mismatch flagged", shape: "end" },
        { id: "download", label: "Download result", shape: "process" },
      ],
      edges: [
        { from: "start", to: "mode" },
        { from: "mode", to: "freq", label: "Compress" },
        { from: "mode", to: "decode", label: "Decompress" },
        { from: "freq", to: "heap" },
        { from: "heap", to: "tree" },
        { from: "tree", to: "encode" },
        { from: "encode", to: "compressed" },
        { from: "compressed", to: "decode" },
        { from: "compressed", to: "download" },
        { from: "decode", to: "verify" },
        { from: "verify", to: "pass", label: "Match" },
        { from: "verify", to: "fail", label: "Mismatch" },
        { from: "pass", to: "download" },
      ],
      clusters: [
        { id: "client", label: "Browser UI", color: CLIENT, nodeIds: ["start", "download"] },
        { id: "logic", label: "Huffman core", color: LOGIC, nodeIds: ["freq", "heap", "tree"] },
        { id: "server", label: "Web Worker", color: SERVER, nodeIds: ["encode", "decode"] },
        { id: "data", label: "In-memory file", color: DATA, nodeIds: ["compressed"] },
      ],
    },
    repoUrl: "https://github.com/deepanshi-code/ShrinkByte",
    liveUrl: "https://deepanshi-code.github.io/ShrinkByte/",
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
    flowchart: {
      nodes: [
        { id: "start", label: "Open Orbit", shape: "start" },
        { id: "profile", label: "Local profile login", detail: "WebCrypto hash", shape: "process" },
        { id: "pick", label: "Pick a task", shape: "process" },
        { id: "focusView", label: "Focus view", shape: "process" },
        { id: "tasksView", label: "Tasks view", shape: "process" },
        { id: "themes", label: "Theme switcher", detail: "6 themes", shape: "process" },
        { id: "mode", label: "Countdown or stopwatch?", shape: "decision" },
        { id: "timer", label: "Timer engine", shape: "process" },
        { id: "storage", label: "localStorage", shape: "io" },
        { id: "check", label: "Deadline approaching?", shape: "decision" },
        { id: "notify", label: "Desktop notification", shape: "process" },
        { id: "audio", label: "Web Audio cue", shape: "process", tech: ["Web Audio API"] },
        { id: "end", label: "Progress tracked", shape: "end" },
      ],
      edges: [
        { from: "start", to: "profile" },
        { from: "profile", to: "pick" },
        { from: "pick", to: "focusView" },
        { from: "pick", to: "tasksView" },
        { from: "pick", to: "themes" },
        { from: "focusView", to: "mode" },
        { from: "mode", to: "timer", label: "Countdown" },
        { from: "mode", to: "timer", label: "Stopwatch" },
        { from: "timer", to: "storage" },
        { from: "profile", to: "storage" },
        { from: "timer", to: "check" },
        { from: "check", to: "notify", label: "Yes" },
        { from: "check", to: "audio", label: "Yes" },
        { from: "check", to: "end", label: "No" },
        { from: "notify", to: "end" },
        { from: "audio", to: "end" },
      ],
      clusters: [
        { id: "client", label: "UI (vanilla JS)", color: CLIENT, nodeIds: ["profile", "pick", "focusView", "tasksView", "themes"] },
        { id: "logic", label: "Timer engine", color: LOGIC, nodeIds: ["timer"] },
        { id: "data", label: "Persistence", color: DATA, nodeIds: ["storage"] },
        { id: "server", label: "Alerts", color: SERVER, nodeIds: ["notify", "audio"] },
      ],
    },
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
    flowchart: {
      nodes: [
        { id: "start", label: "Open a tool", shape: "start" },
        { id: "calc", label: "Calculator", shape: "process" },
        { id: "plot", label: "Plotter", shape: "process" },
        { id: "calculus", label: "Calculus tools", shape: "process" },
        { id: "convert", label: "Converters", detail: "Unit, currency, BMI", shape: "process" },
        { id: "formula", label: "Formula library", shape: "process" },
        { id: "core", label: "Math core", detail: "Dependency-free JS", shape: "process" },
        { id: "sw", label: "Service Worker cache", shape: "io" },
        { id: "end", label: "Offline-capable result", shape: "end" },
        { id: "test", label: "Test suite", shape: "process" },
        { id: "bench", label: "Python reference benchmark", shape: "process", tech: ["Python"] },
        { id: "mutation", label: "Mutation testing", shape: "process" },
        { id: "validated", label: "Accuracy validated", shape: "end" },
      ],
      edges: [
        { from: "start", to: "calc" },
        { from: "start", to: "plot" },
        { from: "start", to: "calculus" },
        { from: "start", to: "convert" },
        { from: "start", to: "formula" },
        { from: "calc", to: "core" },
        { from: "plot", to: "core" },
        { from: "calculus", to: "core" },
        { from: "convert", to: "core" },
        { from: "core", to: "sw" },
        { from: "sw", to: "end" },
        { from: "core", to: "test" },
        { from: "core", to: "bench" },
        { from: "core", to: "mutation" },
        { from: "test", to: "validated" },
        { from: "bench", to: "validated" },
        { from: "mutation", to: "validated" },
      ],
      clusters: [
        { id: "client", label: "UI panels", color: CLIENT, nodeIds: ["calc", "plot", "calculus", "convert", "formula"] },
        { id: "logic", label: "Math core", color: LOGIC, nodeIds: ["core"] },
        { id: "data", label: "Offline cache", color: DATA, nodeIds: ["sw"] },
        { id: "server", label: "Validation (offline)", color: SERVER, nodeIds: ["test", "bench", "mutation"] },
      ],
    },
    repoUrl: "https://github.com/deepanshi-code/CalCora",
    liveUrl: "https://deepanshi-code.github.io/CalCora/",
    image: "/project-images/calcora.jpg",
  },
  {
    slug: "uttarakhand-aipan-art",
    title: "Uttarakhand Aipan Art",
    summary:
      "Two e-commerce-style static sites for women-led Aipan folk-art businesses from Kumaon, Uttarakhand.",
    description:
      "A student project: two static websites for women-led Aipan folk-art businesses from the Kumaon hills of Uttarakhand — Devbhoomi Aipan Art (traditional ritual pieces: chowkis, wall art, puja decor) and Kumaon Aipan Art (modern lifestyle products: coasters, stoles, gift sets). Each site has Home, About, Products, Gallery, and Contact pages with a JSON-driven product catalog and a WhatsApp inquiry flow, built with Eleventy so the header, footer, product popup, and product card are each defined once and shared across both sites rather than duplicated. Deploys automatically to GitHub Pages via GitHub Actions on every push. It's explicitly labeled as a demo: product photos, prices, and contact details are placeholder sample content, not a live business.",
    techStack: ["HTML", "CSS", "JavaScript", "Eleventy", "GitHub Actions"],
    flowchart: {
      nodes: [
        { id: "start", label: "Push to main", shape: "start" },
        { id: "ci", label: "GitHub Actions triggered", shape: "process" },
        { id: "json", label: "JSON product catalog", shape: "io" },
        { id: "header", label: "Shared header", shape: "process" },
        { id: "footer", label: "Shared footer", shape: "process" },
        { id: "card", label: "Product card", shape: "process" },
        { id: "popup", label: "Product popup", shape: "process" },
        { id: "build", label: "Eleventy build", shape: "process", tech: ["Eleventy"] },
        { id: "siteA", label: "Devbhoomi Aipan Art", shape: "process" },
        { id: "siteB", label: "Kumaon Aipan Art", shape: "process" },
        { id: "whatsapp", label: "WhatsApp inquiry", shape: "process" },
        { id: "pages", label: "Live on GitHub Pages", shape: "end" },
      ],
      edges: [
        { from: "start", to: "ci" },
        { from: "ci", to: "build" },
        { from: "json", to: "build" },
        { from: "header", to: "build" },
        { from: "footer", to: "build" },
        { from: "card", to: "build" },
        { from: "popup", to: "build" },
        { from: "build", to: "siteA" },
        { from: "build", to: "siteB" },
        { from: "siteA", to: "whatsapp" },
        { from: "siteB", to: "whatsapp" },
        { from: "siteA", to: "pages" },
        { from: "siteB", to: "pages" },
      ],
      clusters: [
        { id: "server", label: "CI/CD", color: SERVER, nodeIds: ["ci", "build"] },
        { id: "data", label: "Content", color: DATA, nodeIds: ["json"] },
        { id: "logic", label: "Shared includes", color: LOGIC, nodeIds: ["header", "footer", "card", "popup"] },
        { id: "client", label: "Static sites", color: CLIENT, nodeIds: ["siteA", "siteB", "whatsapp"] },
      ],
    },
    repoUrl: "https://github.com/deepanshi-code/Uttarakhand-Aipan-Art",
    liveUrl: "https://deepanshi-code.github.io/Uttarakhand-Aipan-Art/",
    image: "/project-images/aipan-art.jpg",
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
    flowchart: {
      nodes: [
        { id: "start", label: "Reviews ingested", detail: "Whole market", shape: "start" },
        { id: "lang", label: "Language / length?", shape: "decision" },
        { id: "deberta", label: "DeBERTa-v3", detail: "English", shape: "process" },
        { id: "gemini", label: "Gemini", detail: "Short / Hindi-English", shape: "process" },
        { id: "keyword", label: "Keyword rules", detail: "Fallback", shape: "process" },
        { id: "attribution", label: "Linear attribution model", detail: "Cost per complaint", shape: "process" },
        { id: "sentiment", label: "Destination sentiment trends", shape: "process" },
        { id: "api", label: "FastAPI", shape: "process" },
        { id: "dashboard", label: "React dashboard", shape: "process" },
        { id: "bg", label: "Three.js ridge-relief bg", shape: "process" },
        { id: "end", label: "Hotel + destination insights", shape: "end" },
      ],
      edges: [
        { from: "start", to: "lang" },
        { from: "lang", to: "deberta", label: "English" },
        { from: "lang", to: "gemini", label: "Short/Hindi-Eng." },
        { from: "lang", to: "keyword", label: "Fallback" },
        { from: "deberta", to: "attribution" },
        { from: "gemini", to: "attribution" },
        { from: "keyword", to: "attribution" },
        { from: "deberta", to: "sentiment" },
        { from: "gemini", to: "sentiment" },
        { from: "attribution", to: "api" },
        { from: "sentiment", to: "api" },
        { from: "api", to: "dashboard" },
        { from: "bg", to: "dashboard" },
        { from: "dashboard", to: "end" },
      ],
      clusters: [
        { id: "ai", label: "Classification models", color: AI, nodeIds: ["deberta", "gemini", "keyword"] },
        { id: "logic", label: "Scoring", color: LOGIC, nodeIds: ["attribution", "sentiment"] },
        { id: "server", label: "FastAPI", color: SERVER, nodeIds: ["api"] },
        { id: "client", label: "React frontend", color: CLIENT, nodeIds: ["dashboard", "bg"] },
      ],
    },
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
    flowchart: {
      nodes: [
        { id: "start", label: "MCX Bhavcopy ingested", detail: "4 lot sizes", shape: "start" },
        { id: "validate", label: "Validate contract data", shape: "process" },
        { id: "normalize", label: "Normalize to price/gram", detail: "999 gold", shape: "process" },
        { id: "backtest", label: "Walk-forward backtest", detail: "1x / 2x / 3x costs", shape: "process" },
        { id: "baseline1", label: "No-cost baseline", shape: "io" },
        { id: "baseline2", label: "Random-entry baseline", shape: "io" },
        { id: "check", label: "Sharpe positive, every fold, at 2x?", shape: "decision" },
        { id: "edge", label: "Tradable edge confirmed", shape: "process" },
        { id: "noedge", label: "No edge — contract noise", shape: "process" },
        { id: "dashboard", label: "Results dashboard", shape: "end", tech: ["React 19"] },
        { id: "anim", label: "GSAP animation", shape: "process" },
      ],
      edges: [
        { from: "start", to: "validate" },
        { from: "validate", to: "normalize" },
        { from: "normalize", to: "backtest" },
        { from: "baseline1", to: "backtest" },
        { from: "baseline2", to: "backtest" },
        { from: "backtest", to: "check" },
        { from: "check", to: "edge", label: "Yes" },
        { from: "check", to: "noedge", label: "No" },
        { from: "edge", to: "dashboard" },
        { from: "noedge", to: "dashboard" },
        { from: "anim", to: "dashboard" },
      ],
      clusters: [
        { id: "data", label: "Market data", color: DATA, nodeIds: ["start", "baseline1", "baseline2"] },
        { id: "logic", label: "Backtest engine", color: LOGIC, nodeIds: ["validate", "normalize", "backtest", "edge", "noedge"] },
        { id: "client", label: "Frontend", color: CLIENT, nodeIds: ["dashboard", "anim"] },
      ],
    },
    repoUrl: "https://github.com/deepanshi-code/Bullion-Basis",
    liveUrl: "https://bullion-basis.pages.dev",
    image: "/project-images/bullion-basis.jpg",
  },
  {
    slug: "keyforge",
    title: "KeyForge",
    summary:
      "On-device identity toolkit: usernames, project/team names, personas, and encrypted passwords.",
    description:
      "KeyForge generates usernames, project names, team names, full fake personas, and secure passwords — entirely client-side, with no server. It started as a beginner password generator in plain HTML/CSS/JS and was rebuilt as a modular TypeScript app. Starring favorites trains a small on-device character-trigram model that re-ranks future results toward your taste, with 25% of results still drawn randomly so suggestions don't collapse into a bubble; an Insights tab measures whether that actually helps using interleaving (the method search engines use to A/B test rankings) with a 95% confidence interval and a two-proportion z-test, rather than just asserting it works. Saved favorites live in password-protected local profiles: a key is derived with PBKDF2-SHA256 (600,000 rounds) and items are encrypted with AES-256-GCM via the Web Crypto API, with encrypted backup/restore to move a profile between devices. Installable offline as a PWA.",
    techStack: ["TypeScript", "Web Crypto API", "PWA"],
    flowchart: {
      nodes: [
        { id: "start", label: "Generate request", shape: "start" },
        { id: "username", label: "Username generator", shape: "process" },
        { id: "persona", label: "Persona generator", shape: "process" },
        { id: "password", label: "Password generator", shape: "process" },
        { id: "star", label: "Star a favorite?", shape: "decision" },
        { id: "trigram", label: "Update trigram model", shape: "process" },
        { id: "rerank", label: "Re-rank future results", detail: "75% model / 25% random", shape: "process" },
        { id: "insight", label: "Interleaving A/B test", detail: "95% CI, z-test", shape: "process" },
        { id: "store", label: "Encrypted local profile", shape: "io", tech: ["PBKDF2", "AES-256-GCM"] },
        { id: "backup", label: "Encrypted backup/restore", shape: "process" },
        { id: "end", label: "Installed as offline PWA", shape: "end" },
      ],
      edges: [
        { from: "start", to: "username" },
        { from: "start", to: "persona" },
        { from: "start", to: "password" },
        { from: "username", to: "star" },
        { from: "persona", to: "star" },
        { from: "password", to: "star" },
        { from: "star", to: "trigram", label: "Yes" },
        { from: "star", to: "store", label: "No" },
        { from: "trigram", to: "rerank" },
        { from: "rerank", to: "insight" },
        { from: "insight", to: "store" },
        { from: "store", to: "backup" },
        { from: "backup", to: "end" },
        { from: "store", to: "end" },
      ],
      clusters: [
        { id: "client", label: "Generators", color: CLIENT, nodeIds: ["start", "username", "persona", "password"] },
        { id: "logic", label: "Preference model", color: LOGIC, nodeIds: ["trigram", "rerank"] },
        { id: "server", label: "Evaluation", color: SERVER, nodeIds: ["insight", "backup"] },
        { id: "data", label: "Encrypted storage", color: DATA, nodeIds: ["store"] },
      ],
    },
    repoUrl: "https://github.com/deepanshi-code/KeyForge",
    liveUrl: "https://deepanshi-code.github.io/KeyForge/",
    image: "/project-images/keyforge.jpg",
  },
  {
    slug: "codealpha-ml-projects",
    title: "CodeAlpha ML Projects",
    summary:
      "Two binary-classification projects for a CodeAlpha ML internship, with baselines and error analysis.",
    description:
      "Two binary-classification projects for the CodeAlpha ML internship: credit scoring (is a loan applicant creditworthy?) and disease prediction (does a patient have the disease?). Both follow the same disciplined workflow — problem and metric choice, data checks, EDA, a stratified train/test split, a majority-class baseline, cross-validated model comparison, tuning, held-out test evaluation, and error analysis — rather than just fitting one model and reporting accuracy. On the held-out set, logistic regression reached ROC-AUC 1.000 on credit scoring (the true labeling rule is linear, so it wins over a decision tree), while a Random Forest reached perfect recall on disease prediction, catching every positive case the tuned logistic regression's threshold missed. The datasets are synthetic and generated from explicit hand-written rules (documented in the README), and the write-up is explicit that this makes the scores an artefact of noise-free labels, not a claim about real-world performance — the point of the project is the methodology, not the number.",
    techStack: ["Python", "scikit-learn", "pandas", "Jupyter Notebook"],
    flowchart: {
      nodes: [
        { id: "start", label: "Synthetic data", detail: "Documented rules", shape: "start" },
        { id: "eda", label: "EDA + stratified split", shape: "process" },
        { id: "baseline", label: "Majority-class baseline", shape: "process" },
        { id: "cv", label: "Cross-validated comparison", shape: "process", tech: ["scikit-learn"] },
        { id: "tuneCredit", label: "Tune: Logistic Regression", shape: "process" },
        { id: "tuneDisease", label: "Tune: Random Forest", shape: "process" },
        { id: "evalCredit", label: "Held-out eval: credit scoring", shape: "decision" },
        { id: "evalDisease", label: "Held-out eval: disease prediction", shape: "decision" },
        { id: "credit", label: "ROC-AUC 1.000", shape: "end" },
        { id: "disease", label: "Perfect recall", shape: "end" },
      ],
      edges: [
        { from: "start", to: "eda" },
        { from: "eda", to: "baseline" },
        { from: "baseline", to: "cv" },
        { from: "cv", to: "tuneCredit" },
        { from: "cv", to: "tuneDisease" },
        { from: "tuneCredit", to: "evalCredit" },
        { from: "tuneDisease", to: "evalDisease" },
        { from: "evalCredit", to: "credit", label: "Linear rule wins" },
        { from: "evalDisease", to: "disease", label: "Catches misses" },
      ],
      clusters: [
        { id: "data", label: "Data", color: DATA, nodeIds: ["start"] },
        { id: "logic", label: "ML pipeline", color: LOGIC, nodeIds: ["eda", "baseline", "cv", "tuneCredit", "tuneDisease"] },
      ],
    },
    repoUrl: "https://github.com/deepanshi-code/CodeAlpha_project",
    image: "/project-images/codealpha-ml-projects.svg",
  },
  {
    slug: "ime-email-segregation",
    title: "IME Shipping Email Segregation",
    summary:
      "Automates classification and data extraction from shipping/chartering emails.",
    description:
      "Built for the IME Innovation Challenge under TBI-GEU, this system processes unstructured shipping and chartering emails (vessel availability, voyage charter cargo requests, time charter requirements) and converts them into structured, machine-readable JSON — without calling any external LLM API. It identifies the email category and extracts the relevant business fields using local Python processing, automating a task that otherwise requires manually reading each email.",
    techStack: ["Python"],
    flowchart: {
      nodes: [
        { id: "start", label: "Unstructured shipping email", shape: "start" },
        { id: "classify", label: "Which category?", shape: "decision", tech: ["Python"] },
        { id: "vessel", label: "Vessel availability", shape: "process" },
        { id: "voyage", label: "Voyage charter cargo", shape: "process" },
        { id: "time", label: "Time charter requirement", shape: "process" },
        { id: "extractPorts", label: "Extract ports", shape: "process" },
        { id: "extractSize", label: "Extract vessel size", shape: "process" },
        { id: "extractDuration", label: "Extract duration", shape: "process" },
        { id: "json", label: "Structured JSON", shape: "end" },
      ],
      edges: [
        { from: "start", to: "classify" },
        { from: "classify", to: "vessel", label: "Vessel avail." },
        { from: "classify", to: "voyage", label: "Voyage charter" },
        { from: "classify", to: "time", label: "Time charter" },
        { from: "vessel", to: "extractPorts" },
        { from: "vessel", to: "extractSize" },
        { from: "voyage", to: "extractPorts" },
        { from: "voyage", to: "extractDuration" },
        { from: "time", to: "extractSize" },
        { from: "time", to: "extractDuration" },
        { from: "extractPorts", to: "json" },
        { from: "extractSize", to: "json" },
        { from: "extractDuration", to: "json" },
      ],
      clusters: [
        { id: "logic", label: "Classification + extraction", color: LOGIC, nodeIds: ["classify", "vessel", "voyage", "time", "extractPorts", "extractSize", "extractDuration"] },
        { id: "data", label: "Output", color: DATA, nodeIds: ["json"] },
      ],
    },
    repoUrl: "https://github.com/deepanshi-code/IME_EMIAL_SEGREGATION",
    image: "/project-images/ime-email-segregation.jpg",
  },
];

export function getProjectBySlug(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
