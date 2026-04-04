export const data = {
  name: "Bushra Jannat",
  title: "Software Engineer",
  tagline: "Full-Stack Developer · ML Practitioner · Open Source Builder",
  about: `I'm a Computer Science graduate from United International University, Dhaka, passionate about building scalable full-stack applications and integrating machine learning into real-world products. I love turning complex problems into clean, user-friendly solutions — from RESTful APIs and React UIs to predictive ML models deployed in production.`,
  email: "jannatjenniebushra@gmail.com",
  phone: "+8801540663503",
  github: "https://github.com/jannatjenniebushra",
  linkedin: "https://linkedin.com/in/jannatjenniebushra",
  portfolio: "https://jannatjenniebushra.github.io",

  skills: [
    {
      category: "Languages",
      items: ["C / C++", "Python", "Java", "JavaScript"],
    },
    {
      category: "Backend",
      items: ["Django", "Django REST Framework", "RESTful API Design", "JWT Auth (SimpleJWT)"],
    },
    {
      category: "Frontend & Mobile",
      items: ["React JS", "React Native", "Tailwind CSS", "HTML / CSS"],
    },
    {
      category: "ML & Data",
      items: ["Scikit-Learn", "Pandas", "NumPy", "Regression Models", "Data Preprocessing"],
    },
    {
      category: "Databases",
      items: ["PostgreSQL", "MySQL", "Schema Design", "Query Optimization"],
    },
    {
      category: "DevOps & Tools",
      items: ["Git / GitHub", "Docker", "GitHub Actions (CI/CD)", "Postman", "Linux", "Jira"],
    },
    {
      category: "Engineering",
      items: ["Data Structures & Algorithms", "OOP", "System Design", "SOLID Principles", "Design Patterns"],
    },
  ],

  projects: [
    {
      name: "Proprietor",
      description:
        "A production-grade AI-assisted real estate platform for Bangladesh. Users can browse, list, book, and pay for properties. Features ML-based price prediction, 3D virtual tours, Google Maps integration, and SSLCommerz payments (bKash, Nagad, cards).",
      tags: ["React", "Django", "DRF", "PostgreSQL", "Scikit-Learn", "JWT", "SSLCommerz", "Docker"],
      live: "https://proprietor.vercel.app",
      github: "https://github.com/redwanahmedutsab/Proprietor",
      highlights: [
        "ML price prediction model via Scikit-Learn, exposed as a REST endpoint",
        "JWT auth with refresh token rotation (SimpleJWT)",
        "Deployed on Render + Vercel + Neon",
      ],
    },
    {
      name: "Campusor",
      description:
        "A unified campus platform serving students with 4 integrated modules: Marketplace (buy/sell), Events (RSVP management), Lost & Found, and Study Groups — all under one authenticated experience.",
      tags: ["React", "Tailwind CSS", "Django", "DRF", "PostgreSQL", "JWT", "Render", "Vercel"],
      live: "https://campusor.vercel.app",
      github: "https://github.com/redwanahmedutsab/campusor",
      highlights: [
        "Modular Django app architecture with role-based auth",
        "Fully responsive React + Tailwind CSS frontend",
        "Deployed on Render + Vercel + Neon (managed PostgreSQL)",
      ],
    },
  ],

  research: [
    {
      title: "High School Students' Performance Analyser using Machine Learning Approach",
      venue: "ICCIT 2024",
      conf: "IEEE Conf. ID: 64611",
      location: "UIU, Dhaka",
      date: "Dec 2024",
      link: "https://www.researchgate.net/publication/392563509",
      description:
        "Developed a predictive ML model to analyze and forecast student academic performance. Accepted after double-blind peer review at ICCIT 2024.",
    },
    {
      title: "ENRNN-AU-NET: A Hybrid Deep Learning Model to Classify and Segment Histopathology Images of Breast Cancer",
      venue: "ICACCESS 2024",
      conf: "",
      location: "UIU, Dhaka",
      date: "Mar 2024",
      link: "https://www.researchgate.net/publication/380009652",
      description:
        "Achieved 99.99% classification accuracy and 99.54% segmentation accuracy by combining EfficientNetV2S (classification) and Attention U-Net (segmentation) on breast cancer histopathology images.",
    },
  ],

  experience: [
    {
      role: "Grader",
      company: "United International University",
      period: "Jun 2024 – Sep 2024",
      location: "Dhaka, Bangladesh",
      bullets: [
        "Evaluated programming assignments, quizzes, and exams following standardized rubrics for 60+ students.",
        "Assisted students with debugging, algorithm optimization, and clean coding practices.",
      ],
    },
  ],

  education: [
    {
      degree: "BSc in Computer Science & Engineering",
      school: "United International University",
      period: "Aug 2025",
    },
    {
      degree: "Higher Secondary Certificate (Science)",
      school: "Cantonment Public School & College, Saidpur",
      period: "2018",
    },
    {
      degree: "Secondary School Certificate (Science)",
      school: "Cantonment Public School & College, Saidpur",
      period: "2016",
    },
  ],

  extracurricular: [
    {
      org: "IEEE UIU Student Branch",
      role: "Chairperson (WIE) & Member",
      period: "Jan 2024 – Present",
      bullets: [
        "Leading IEEE Women in Engineering initiatives to promote women's participation in STEM.",
        "Organized technical workshops and outreach programs for 100+ undergraduate students.",
      ],
    },
    {
      org: "UIU Entrepreneur Development Forum",
      role: "Senior Executive (HR)",
      period: "May 2021 – Dec 2024",
      bullets: [
        "Oversaw HR operations, event organization, and student engagement initiatives.",
        "Progressed from General Member to Senior Executive through four consecutive promotions.",
      ],
    },
    {
      org: "UIU App Forum",
      role: "Executive Member & Media Associate",
      period: "Aug 2020 – Present",
      bullets: [
        "Led media communications and supported app development projects promoting student innovation.",
      ],
    },
  ],
};
