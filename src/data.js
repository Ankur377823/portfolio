// All site content lives here. Components only decide how it looks.

export const profile = {
  name: 'Ankur Kumar Singh',
  role: 'Software engineer',
  focus: 'backends, AI automation, ML pipelines',
  email: 'ankurrajput7050@gmail.com',
  phone: '+91 88910 79725',
  location: 'NIT Calicut, Kerala, India',
  resume: '/assets/resume.pdf',
  photo: '/assets/profile_photo.jpg',
  links: [
    { label: 'github', href: 'https://github.com/Ankur377823' },
    { label: 'linkedin', href: 'https://www.linkedin.com/in/ankur-singh0112/' },
    { label: 'leetcode', href: 'https://leetcode.com/u/Ankur_rajput123/' },
    { label: 'kaggle', href: 'https://www.kaggle.com/ankur2006' },
  ],
};

export const about = [
  "I'm a final-year B.Tech student at NIT Calicut. This summer (May–July 2026) I interned as a software engineer at Wingback Security, working on security for AI coding agents.",
  'On the side I built and still run Job Bot, a live AI job-application platform that 20 people use. I work mainly in Python, FastAPI and SQL, and I use Claude Code and Cursor every day.',
  'What I care about most is building tools and automations that people actually use.',
];

export const stickies = [
  { big: 'Wingback', text: 'former SWE intern', color: 'yellow' },
  { big: 'NIT Calicut', text: 'final-year B.Tech', color: 'green' },
  { big: 'GRiD 8.0', text: 'Flipkart national semifinalist', color: 'pink' },
  { big: '800+', text: 'LeetCode problems solved', color: 'blue' },
];

export const projects = [
  {
    id: 'jobbot',
    featured: true,
    title: 'Job Bot',
    subtitle: 'AI job-application assistant',
    kind: 'full-stack automation + generative AI',
    live: true,
    privateRepo: true,
    summary:
      'Finds LinkedIn jobs, applies through its own Chrome extension, and emails recruiters the right resume. Runs daily in Docker on Azure.',
    stats: [
      { n: '20', l: 'live users' },
      { n: '1,000+', l: 'applications sent' },
      { n: '600+', l: 'recruiter emails' },
    ],
    diagram: {
      rows: [
        ['Chrome ext (MV3)', '*FastAPI server', 'PostgreSQL'],
        ['Gemini form agent', 'Gmail API', 'Playwright'],
      ],
      note: '↑ the server decides every form step, the extension just obeys',
    },
    highlights: [
      ['AI form agent', 'Answers screening questions from saved answers and asks only about new ones.'],
      ['Recruiter outreach', 'Finds recruiter contacts and drafts follow-ups naming the role and job ID.'],
      ['Reliable in production', 'Fixed a threading outage; added auto DB repair, daily backups and 150+ tests.'],
    ],
    tags: ['Python', 'FastAPI', 'SQLAlchemy', 'PostgreSQL', 'Gemini API', 'Gmail API', 'Chrome Extension (MV3)', 'Playwright', 'Docker', 'Azure'],
    links: [{ label: 'live demo', href: 'https://20-219-138-38.sslip.io' }],
    caseStudy: {
      stack: ['Python', 'FastAPI', 'SQLAlchemy', 'SQLite/PostgreSQL', 'Gemini API', 'Gmail API (OAuth)', 'JavaScript (ES Modules)', 'Chrome Extension (MV3)', 'Playwright', 'Docker', 'Caddy', 'Azure VM'],
      problem:
        'A serious job search means hundreds of repetitive applications, the same screening questions answered again and again, and recruiter follow-ups that are easy to forget. Tracking which application is at which stage, and which resume actually gets replies, usually ends up scattered across spreadsheets and inboxes.',
      solution:
        "Job Bot is live with 20 users and has sent 1,000+ applications and 600+ recruiter emails. It automates the search end to end. Every day it finds matching LinkedIn jobs and submits Easy Apply applications through its own Chrome extension, with a FastAPI server deciding each form step and Gemini answering screening questions. It then finds the recruiter's email or phone number, drafts a personal follow-up, and reads Gmail replies to move each job through the pipeline (Applied, Replied, Interview, Offer) without manual updates. It is multi-user, has an admin panel, and runs in Docker on an Azure VM behind Caddy for HTTPS.",
      features: [
        'Manifest V3 Chrome extension fills and submits LinkedIn Easy Apply forms, with each form step decided server-side',
        "An AI agent reads each form page and answers from the user's profile and saved answers, asking the user only about new questions and reusing answers when a question is worded differently",
        "Selects the best of the user's resumes for each job and tracks which resume earns the most replies and interviews",
        'Finds recruiter emails and phone numbers from job posts and LinkedIn posts, keeps the source of each contact, and drafts personal emails and WhatsApp messages naming the role and job ID',
        'Reads only relevant Gmail messages to detect replies, interviews, offers, and rejections, and moves tracker cards automatically',
        'Drag-and-drop pipeline tracker with an applications-per-day chart and reply and interview rates per resume',
        'Multi-user accounts with per-user data, an admin dashboard showing live extension status, and a daily scheduler',
        'Added features users asked for, such as salary privacy, recruiter names in emails, and a skip option, built to work for every user',
        'Traced a login outage to a network connection shared between threads and fixed it, then added automatic database repair, daily backups, and 150+ automated tests',
      ],
    },
  },
  {
    id: 'smartroad',
    featured: true,
    title: 'SmartRoad Audit',
    subtitle: 'AI road safety audit platform',
    kind: 'computer vision + full-stack',
    live: true,
    summary:
      'Scores each road segment for risk and grades potholes against Indian Roads Congress (IRC) standards, right in the browser.',
    diagram: {
      rows: [['camera', '*YOLO26n-seg in browser', 'IRC grading', 'FastAPI']],
      note: null,
    },
    bullets: [
      'Custom YOLO26n-seg model runs on-device (WebGPU or INT8 WASM)',
      'IRC:82-2015 grading and IRC:SP:88-2019 repair-priority matrix',
    ],
    margin: 'moved inference to the browser → backend RAM 500 MB → 90 MB',
    tags: ['React', 'FastAPI', 'PostgreSQL', 'YOLO', 'ONNX Runtime Web', 'Google Maps API'],
    links: [
      { label: 'live demo', href: 'https://smart-road-audit-1.onrender.com/' },
      { label: 'code', href: 'https://github.com/Ankur377823/Smart-Road-Audit' },
    ],
    caseStudy: {
      stack: ['React 19', 'Vite', 'Tailwind CSS', 'FastAPI', 'Pydantic v2', 'SQLAlchemy 2', 'PostgreSQL 16', 'YOLO26n-seg', 'ONNX Runtime Web', 'WebGPU', 'Google Maps APIs', 'Docker', 'Nginx', 'Render'],
      problem:
        'Road safety audits in India are mostly manual. Inspectors survey roads on foot or by car, note hazards on paper, and judge pothole severity by eye. The process is slow and inconsistent, and the findings are hard to track over time.',
      solution:
        "SmartRoad Audit automates the first screening step so auditors can spend field time on the riskiest stretches. An engineer picks a road on Google Maps; the FastAPI backend splits it into segments, collects elevation, gradient, curvature, land use, and traffic for each, scores every segment from 0 to 100, and generates a safety checklist. A phone-camera pothole scanner runs a custom YOLO segmentation model entirely in the browser, estimates each pothole's depth and width, grades it against IRC codes of practice, geotags it, and exports a PDF report.",
      features: [
        'Rule-based risk score per segment from five weighted factors: gradient (25), curvature (20), operating speed (20), traffic (20), and pedestrian activity (15)',
        'Auto-generated checklist per segment, with each item marked as answered automatically or needing field verification',
        'Custom-trained YOLO26n-seg model running in a Web Worker with ONNX Runtime Web, using WebGPU when available and an INT8-quantized WASM model otherwise; no video leaves the device',
        'False-positive filters that reject detections in the sky, tall vertical objects such as people and poles, and areas with colourful surroundings',
        'Single-image depth estimate from cavity shadow and surface roughness, with width measured from camera height and tilt',
        'IRC:82-2015 size classes and an IRC:SP:88-2019 likelihood × consequence matrix for risk level and repair priority, implemented identically in Python and JavaScript',
        'GPS geotagging with road snapping, merging of repeat sightings, and PDF report export',
        "Moving inference to the browser removed PyTorch from the server, cutting backend memory from ~500 MB to ~90 MB so the stack fits Render's free tier",
        'Layered FastAPI backend (routes, services, repositories, models), Docker Compose for local development, and a Render Blueprint for one-click deployment',
      ],
      liveNote: "Hosted on Render's free tier: the first visit can take 30–60 seconds while the server wakes up.",
    },
  },
  {
    id: 'rag',
    featured: true,
    title: 'Hybrid RAG Search',
    subtitle: 'cited document Q&A',
    kind: 'retrieval-augmented generation · open source',
    summary:
      'Document Q&A that searches by meaning and keywords, and answers with citations a second model verifies.',
    diagram: {
      rows: [['query', 'dense + BM25', '*RRF fuse', 're-rank top 5', 'verified answer']],
      note: null,
    },
    bullets: [
      'Says "I don\'t know" when confidence is low',
      '71 tests at 83% coverage, CI on Python 3.11 and 3.12',
    ],
    tags: ['Python', 'FastAPI', 'OpenAI API', 'BM25', 'PostgreSQL', 'Docker'],
    links: [{ label: 'code', href: 'https://github.com/Ankur377823/hybrid-rag-search' }],
    caseStudy: {
      stack: ['Python', 'FastAPI', 'OpenAI API', 'BM25', 'Reciprocal Rank Fusion', 'PostgreSQL', 'JWT Auth', 'Docker', 'Render', 'Pytest', 'mypy'],
      problem:
        "Teams want to ask questions of their own documents, but semantic search alone misses exact terms and identifiers, and language models will confidently answer even when the documents don't support the answer.",
      solution:
        'A multi-user document Q&A platform built with FastAPI, PostgreSQL, and OpenAI. Each question runs two searches, dense embeddings (text-embedding-3-small) and BM25 keywords, and the two ranked lists are fused with Reciprocal Rank Fusion (k = 60). An LLM re-ranker narrows the candidates to the top 5, GPT-4o writes an answer that cites each claim as [N], and a second model checks every citation against its source. Retrieval and citation scores combine into one confidence score; below the threshold the system answers “I don\'t know” instead of guessing.',
      features: [
        'Hybrid retrieval: dense and BM25 top-20 lists fused with Reciprocal Rank Fusion, avoiding fragile score normalization, then LLM re-ranking to the top 5',
        'Grounded answers where every claim cites an evidence chunk, checked by an LLM-as-judge and combined into a composite confidence score',
        'Hard “I don\'t know” gate that refuses low-confidence questions before spending generation tokens',
        "Per-user isolation: each document, chunk, and query belongs to a user, and search is filtered to the caller's chunks before the top-K is taken",
        'Ingests PDF, HTML, Markdown, and text with three chunking strategies; SHA-256 hashing makes identical re-uploads cost zero embedding calls',
        "Versioned re-indexing that swaps in a document's new chunks only after the new version is fully embedded",
        'JWT login, 60-requests-per-minute rate limiting, query history with latency and confidence, and per-user token usage tracking',
        '71 automated tests at 83% coverage, ruff and strict mypy, CI on Python 3.11 and 3.12, and a Render blueprint for Docker and managed PostgreSQL',
      ],
    },
  },
  {
    id: 'botpress',
    title: 'Botpress Red-Team Scanner',
    subtitle: 'AI security',
    kind: 'AI security + red-teaming',
    live: true,
    summary:
      'Attacks live Botpress chatbots with prompt injections, jailbreaks and PII-leak attempts.',
    diagram: { rows: [['attack battery', '*async Chat API client', 'live Botpress bot', 'verdict → SQLite']], note: null },
    tags: ['Python', 'FastAPI', 'Botpress Cloud', 'SQLite', 'Pytest'],
    links: [
      { label: 'live demo', href: 'https://botpress-connector-29gl.onrender.com/' },
      { label: 'code', href: 'https://github.com/Ankur377823/Botpress-Connector' },
    ],
    caseStudy: {
      stack: ['Python', 'FastAPI', 'Botpress Cloud', 'SQLite', 'Pytest'],
      problem:
        'Chatbots and LLM assistants in production are often vulnerable to prompt injection, system-prompt leaks, jailbreaks, and leaks of personal data (PII). Most teams have no automated way to simulate these attacks and check their guardrails before a bot reaches users.',
      solution:
        'An automated red-teaming tool that connects to a live bot through the Botpress Chat API. It sets up test conversations, verifies the connection in both directions, and runs structured batteries of attacks such as jailbreaks, credential harvesting, and role confusion. Every response, its timing, and the verdict are stored in SQLite for later review.',
      features: [
        'Asynchronous Python client for Botpress Cloud bots with connection handshake checks',
        'Attack batteries covering prompt injection, system-prompt leaks, and PII exfiltration',
        'Audit history of responses, timings, and vulnerability ratings stored in SQLite',
        '26 automated tests against a mock Botpress server, covering onboarding, scan runs, and timeouts',
      ],
    },
  },
  {
    id: 'medication',
    title: 'Medication Reconciliation Service',
    subtitle: 'healthcare backend API',
    kind: 'healthcare backend API',
    live: true,
    summary:
      "Merges a patient's medication lists and flags dosage conflicts and risky interactions.",
    diagram: { rows: [['multi-source records', 'normalize', '*rule engine', 'flags']], note: null },
    tags: ['Python', 'FastAPI', 'MongoDB', 'Pytest', 'OpenAPI'],
    links: [
      { label: 'live demo', href: 'https://medication-reconciliation-service-1-y257.onrender.com/' },
      { label: 'code', href: 'https://github.com/Ankur377823/medication-reconciliation-service' },
    ],
    caseStudy: {
      stack: ['Python', 'FastAPI', 'MongoDB', 'Pytest', 'OpenAPI'],
      problem:
        'When a patient moves between hospitals, clinics, and home care, their medication lists come from separate record systems and pharmacies and often disagree. Duplicate drug classes, contraindications, and dosage mismatches that go unnoticed are a common cause of preventable medication errors.',
      solution:
        'A FastAPI backend that takes medication records from several sources and normalizes them into one list. A deterministic reconciliation engine reads dosages and drug categories to flag duplicate drug classes, inconsistent doses, and known drug-drug interactions.',
      features: [
        'Rule-based reconciliation that flags drug-drug interactions and duplicate therapies',
        'Immutable, versioned patient snapshots in MongoDB for a full audit trail',
        '69 unit and integration tests in pytest covering edge cases, invalid payloads, and dosage limits',
        'Deployed on Render with a web app for reviewing and resolving medication discrepancies',
      ],
      liveNote: "Hosted on Render's free tier: the first visit can take 30–60 seconds while the server wakes up.",
    },
  },
  {
    id: 'carprice',
    title: 'Car Price Prediction API',
    subtitle: 'machine learning API',
    kind: 'machine learning API',
    live: true,
    summary:
      'Predicts used-car prices in real time, with repeat queries served from Redis in under 15 ms.',
    diagram: { rows: [['request', 'JWT / API key', '*Redis cache', 'Random Forest'], ['Prometheus', 'Grafana']], note: null },
    tags: ['Python', 'FastAPI', 'Scikit-Learn', 'Redis', 'Docker'],
    links: [
      { label: 'API docs', href: 'https://fastapi-project-lux4.onrender.com/docs' },
      { label: 'code', href: 'https://github.com/Ankur377823/fastapi-Project' },
    ],
    caseStudy: {
      stack: ['Python', 'FastAPI', 'Scikit-Learn', 'Redis', 'Docker', 'Prometheus', 'Grafana'],
      problem:
        'Used-car marketplaces need instant price estimates across many combinations of mileage, brand, age, and fuel type. Running the model again for every repeated query wastes compute and slows responses.',
      solution:
        'A Random Forest regression model trained on used-car listings and served through a FastAPI service. A Redis cache keyed on a hash of the input returns repeated predictions in under 15 ms without calling the model.',
      features: [
        'Scikit-Learn Random Forest model predicting resale price from vehicle specifications',
        'Redis cache keyed on hashed inputs, returning repeat predictions in under 15 ms',
        'Endpoints secured with JWT authentication and API-key validation',
        'Multi-container Docker Compose stack deployed on Render, with Prometheus metrics and Grafana dashboards',
      ],
    },
  },
];

export const experience = [
  {
    role: 'Software Engineering Intern (AI Security)',
    org: 'Wingback Security',
    when: 'May 2026 – July 2026',
    points: [
      ['AI coding-tool security', 'Worked on a security agent that finds AI coding tools on employee laptops and blocks risky commands in real time, and mapped coverage for 33 AI tools to show which were fully protected and what was missing.'],
      ['New agent onboarding', 'Onboarded Grok, DeepSeek and Kimi end to end, covering runtime interception and red teaming, so risky actions such as script downloads and secret leaks are blocked.'],
      ['Dashboard fix', 'Fixed a bug where devices with more than 1,000 items showed incomplete data, by loading the data in pages (React/TypeScript) and adding unit tests.'],
      ['AI-assisted development', 'Used AI coding agents (Claude Code, Cursor) daily to code, test and debug faster, reviewing every change before merging.'],
    ],
    tags: ['Python', 'React', 'TypeScript', 'AI Security', 'Red Teaming', 'Claude Code', 'Cursor'],
    note: 'favourite bug: the 1,001st item that never showed up',
  },
  {
    role: 'Head, Expo Committee',
    org: "Tathva, NIT Calicut's tech fest",
    when: '2025 – present',
    points: [
      [null, "Lead the team that brings startups to one of South India's largest tech fests, working directly with founders."],
      [null, 'Coordinate startups, volunteers and organisers on event days.'],
    ],
    tags: ['Leadership', 'Team Management', 'Startup Outreach', 'Event Operations'],
  },
  {
    role: 'AI/ML Team Member',
    org: 'Google Developer Student Club (GDSC), NIT Calicut',
    when: 'Jan 2024 – April 2026',
    points: [
      [null, 'Worked with student teams to build small machine learning projects for real-world problems.'],
      [null, 'Researched new AI topics such as large language models and computer vision, and presented the findings to the team.'],
    ],
    tags: ['Python', 'Machine Learning', 'Computer Vision', 'LLMs'],
  },
];

export const milestones = [
  { label: 'National engineering challenge', title: 'National Semifinalist – Flipkart GRiD 8.0', text: "Reached the national semifinal of Flipkart's engineering challenge." },
  { label: 'National hackathon', title: '2nd Place – Yuva Manthan Hackathon (2024)', text: 'Placed second nationally as a team.' },
  { label: 'Algorithms + problem solving', title: '800+ LeetCode problems solved', text: 'Global rank under 60,000.' },
  { label: 'Product launch', title: 'Job Bot – 20 live users', text: 'Launched it and still run it in production.' },
];

export const skills = [
  { group: 'languages', items: ['Python', 'C++', 'SQL'] },
  { group: 'backend + web', items: ['FastAPI', 'React', 'Pydantic', 'SQLAlchemy', 'Pytest', 'Playwright', 'Chrome Extensions'] },
  { group: 'AI + ML', items: ['PyTorch', 'Scikit-Learn', 'YOLO (Ultralytics)', 'OpenCV', 'ONNX Runtime', 'Gemini API', 'OpenAI API', 'NumPy', 'Pandas'] },
  { group: 'databases', items: ['PostgreSQL', 'MongoDB', 'Redis', 'SQLite'] },
  { group: 'devops + daily tools', items: ['Docker', 'Microsoft Azure', 'Prometheus', 'Grafana', 'Git', 'Linux', 'Claude Code', 'Cursor'] },
];

export const education = [
  {
    when: '2023 – 2027',
    school: 'National Institute of Technology (NIT) Calicut',
    degree: 'B.Tech, Civil Engineering',
    score: 'CGPA 8.24 / 10',
    text: 'Coursework and self-study in data structures, algorithms, DBMS and systems, applied alongside civil engineering in computer vision work on road infrastructure.',
  },
  { when: '2022 – 2023', school: 'Daya Prakash Saraswati Vidya Mandir', degree: 'Class XII (Senior Secondary)', score: '87.4%' },
  { when: '2020 – 2021', school: 'Keshav Saraswati Vidya Mandir', degree: 'Class X (Secondary)', score: '82.2%' },
];

export const sections = [
  { id: 'about', label: 'about' },
  { id: 'work', label: 'work' },
  { id: 'experience', label: 'experience' },
  { id: 'milestones', label: 'milestones' },
  { id: 'tools', label: 'tools' },
  { id: 'education', label: 'education' },
  { id: 'contact', label: 'contact' },
];

// Web3Forms public access key (the same one the old site used; it is meant to be public).
export const WEB3FORMS_KEY = '92a42b22-1eae-467a-9269-6dd538f8867b';
