// All content lives here. Edit this file to update the site; no JSX changes needed.
export const profile = {
  name: "Bushra Jannat",
  initials: "BJ",
  role: "AI Engineer",
  tagline: "LLM & Agentic Systems · Machine Learning",
  typed: ["LangGraph agents", "RAG pipelines on ChromaDB", "fine-tuned transformer models", "ML inference APIs with FastAPI"],
  summary:
    "AI Engineer and IEEE-published ML researcher who builds and ships LLM-powered and agentic systems end to end: LangGraph agents, RAG pipelines, fine-tuned transformers, and the FastAPI and Django backends that serve them in production.",
  email: "jannatjenniebushra@gmail.com",
  phone: "+8801540663503",
  location: "Dhaka, Bangladesh",
  links: [
    { label: "GitHub", href: "https://github.com/jannatjenniebushra" },
    { label: "LinkedIn", href: "https://linkedin.com/in/jannatjenniebushra" },
  ],
};

export const stats = [
  { to: 2, suffix: "", label: "IEEE papers" },
  { to: 4, suffix: "", label: "AI projects" },
  { to: 100, suffix: "+", label: "students reached" },
  { to: 60, suffix: "+", label: "students graded" },
];

export const about = [
  "I'm an AI Engineer based in Dhaka who enjoys taking models out of the notebook and into deployed products. My work spans agentic document intelligence (EfficientAgent), a career intelligence system (CareerMind), an ML price-prediction service inside a real estate platform (Proprietor), and a campus services platform with an LLM onboarding assistant (Campusor).",
  "On the research side, I have published two papers at IEEE conferences, on deep learning for breast cancer histopathology and on predicting student performance with machine learning. I also chair the IEEE UIU Women in Engineering (WIE) group.",
];

export const facts = [
  ["Location", "Dhaka, Bangladesh"],
  ["Education", "B.Sc. CSE, United International University"],
  ["CGPA", "3.51 / 4.00"],
  ["Research", "2 IEEE conference papers"],
  ["Leading", "Chairperson, IEEE UIU WIE"],
];

export const skills = [
  { group: "AI & LLM", icon: "spark", items: ["LangChain", "LangGraph", "Agentic AI", "RAG", "ChromaDB", "Prompt Engineering", "LLM Routing", "Groq API (LLaMA 3.1/3.3)", "Hugging Face Transformers", "Fine-Tuning", "DistilBERT", "MiniLM", "ONNX"] },
  { group: "ML & Deep Learning", icon: "brain", items: ["Scikit-Learn", "Pandas", "NumPy", "Regression & Classification", "EfficientNetV2S", "Attention U-Net", "Feature Engineering", "Model Versioning (joblib)", "Model Evaluation"] },
  { group: "Languages", icon: "code", items: ["Python", "SQL", "JavaScript", "TypeScript", "C/C++", "Java"] },
  { group: "Backend & MLOps", icon: "server", items: ["FastAPI", "Django", "Django REST Framework", "Node.js", "REST API Design", "ML Inference Serving", "JWT", "OAuth2", "Docker", "GitHub Actions", "CI/CD"] },
  { group: "Databases", icon: "db", items: ["PostgreSQL", "MySQL", "Vector Databases (ChromaDB)", "Schema Design", "Query Optimization", "Neon"] },
  { group: "Frontend & Tools", icon: "table", items: ["React.js", "Next.js", "React Native", "Tailwind CSS", "Git", "Linux", "Postman", "Render", "Vercel", "Jira"] },
  { group: "Engineering Practices", icon: "rocket", items: ["System Design", "Data Structures & Algorithms", "OOP", "SOLID", "Design Patterns", "Unit & API Testing"] },
];

export const marquee = ["LangGraph", "LangChain", "RAG", "ChromaDB", "Groq", "DistilBERT", "Hugging Face", "FastAPI", "Django REST", "Scikit-Learn", "ONNX", "PostgreSQL", "Docker", "GitHub Actions", "React", "Next.js"];

export const timeline = [
  {
    kind: "work",
    role: "Grader",
    org: "United International University",
    when: "Jun 2024 – Sep 2024",
    where: "Dhaka, Bangladesh",
    points: [
      "Evaluated 60+ students' programming assignments, quizzes and exams against standardized rubrics for correctness, algorithm efficiency and code quality, and coached students on debugging and optimization.",
    ],
  },
  {
    kind: "edu",
    role: "B.Sc. in Computer Science & Engineering",
    org: "United International University",
    when: "2021 – 2025",
    where: "Dhaka",
    points: [
      "CGPA 3.51 / 4.00.",
      "SSC: 5.00 / 5.00. HSC (Science): 4.08 / 5.00.",
    ],
  },
];

export const projects = [
  {
    title: "EfficientAgent",
    kind: "Token-Aware Agentic Document Intelligence System",
    art: "agent",
    metrics: [["6-node", "LangGraph agent"], ["60–100×", "lower inference latency"]],
    stack: ["LangGraph", "Groq / LLaMA 3", "Fine-Tuned DistilBERT", "ChromaDB", "FastAPI", "React", "Docker"],
    links: [
      { label: "Live", href: "https://efficient-agent.vercel.app" },
      { label: "GitHub", href: "https://github.com/redwanahmedutsab/efficient_agent" },
    ],
    points: [
      "Built components of a 6-node LangGraph agent (classify, plan, retrieve, extract, web-search, synthesize) that routes queries across Groq-served LLaMA 3.1-8B and 3.3-70B to balance cost, quality and token usage.",
      "Contributed to a ChromaDB RAG pipeline on a fine-tuned DistilBERT/MiniLM stack, cutting inference latency 60–100× vs. standard API providers; deployed as a Dockerized FastAPI + React app.",
    ],
  },
  {
    title: "CareerMind",
    kind: "AI-Powered Career Intelligence System",
    art: "career",
    metrics: [["LangGraph", "agentic pipeline"], ["RAG", "job retrieval"]],
    stack: ["LangGraph", "RAG", "ChromaDB", "Scikit-Learn", "FastAPI", "React", "JWT", "Docker"],
    links: [
      { label: "Live", href: "https://career-mind-app.vercel.app" },
      { label: "GitHub", href: "https://github.com/redwanahmedutsab/careermind" },
    ],
    points: [
      "Contributed to an agentic pipeline that parses resumes, retrieves matching jobs via ChromaDB RAG, and scores candidate–job fit with a Scikit-Learn classifier, powered by Groq LLaMA inference.",
      "Delivered JWT/bcrypt authentication and a decoupled React/FastAPI deployment for production use.",
    ],
  },
  {
    title: "Proprietor",
    kind: "AI-Assisted Real Estate Platform",
    art: "property",
    metrics: [["<200ms", "ML inference"], ["−60%", "query latency"], ["100%", "branch coverage"]],
    stack: ["React", "Django REST", "FastAPI", "PostgreSQL", "Scikit-Learn", "SSLCommerz", "Docker"],
    links: [
      { label: "Live", href: "https://proprietor.binarybrains.tech" },
      { label: "GitHub", href: "https://github.com/redwanahmedutsab/Proprietor" },
    ],
    points: [
      "Decoupled an MLOps inference pipeline: trained a Scikit-Learn price-regression model, versioned it with joblib, and served predictions via /api/predict/ in under 200ms.",
      "Engineered 25+ REST endpoints with JWT, RBAC and owner-only mutations; modeled 8 relational entities with composite indexes, cutting listing query latency by 60% and supporting 3× traffic growth.",
      "Shipped a full SSLCommerz payment lifecycle with 100% branch-coverage integration tests.",
    ],
  },
  {
    title: "Campusor",
    kind: "Campus Services Platform",
    art: "campus",
    metrics: [["4", "bounded apps"], ["−70%", "response payload"]],
    stack: ["React", "Django REST", "WebSocket", "Next.js", "PostgreSQL", "Docker"],
    links: [
      { label: "Live", href: "https://campusor.vercel.app" },
      { label: "GitHub", href: "https://github.com/redwanahmedutsab/Campusor" },
    ],
    points: [
      "Integrated an LLM-powered onboarding assistant that guides first-time users through features and FAQs in natural language, reducing new-user drop-off.",
      "Architected four bounded Django apps (Users, Marketplace, Events, Lost & Found) behind a shared JWT layer with refresh-token rotation and RBAC; added server-side filtering (django-filter) that cut response payload by 70%.",
    ],
  },
];

export const research = [
  {
    title: "ENRNN-AU-NET: Hybrid Deep Learning for Breast Cancer Classification",
    meta: "IEEE ICACCESS 2024 · Mar 2024",
    text: "Combined EfficientNetV2S and Attention U-Net to reach 99.99% classification and 99.54% segmentation accuracy on histopathology images.",
    href: "https://www.researchgate.net/publication/380009652",
  },
  {
    title: "High School Students' Performance Analyser using Machine Learning",
    meta: "IEEE ICCIT 2024 · Dec 2024",
    text: "Built and published a predictive ML model that forecasts student academic performance; accepted after double-blind peer review at IEEE ICCIT 2024.",
  },
];

// Leadership & extracurricular (shown in the "Leadership" section)
export const wins = [
  { title: "Chairperson", text: "Women in Engineering (WIE)", meta: "IEEE UIU Student Branch · Jan 2024 – Present" },
  { title: "Senior Executive, HR", text: "UIU Entrepreneur Development Forum", meta: "May 2021 – Dec 2024 · promoted four times" },
  { title: "Executive & Media Associate", text: "UIU App Forum", meta: "Aug 2020 – Present" },
];
