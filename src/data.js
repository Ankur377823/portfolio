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

const baseAbout = [
  "I'm a final-year B.Tech student at NIT Calicut. This summer (May–July 2026) I interned as a software engineer at Wingback Security, working on security for AI coding agents.",
  'On the side I built and still run Job Bot, a live AI job-application platform that 20 people use. I work mainly in Python, FastAPI and SQL, and I use Claude Code and Cursor every day.',
  'What I care about most is building tools and automations that people actually use.',
];

const baseStickies = [
  { big: 'Wingback', text: 'former SWE intern', color: 'yellow' },
  { big: 'NIT Calicut', text: 'final-year B.Tech', color: 'green' },
  { big: 'GRiD 8.0', text: 'Flipkart national semifinalist', color: 'pink' },
  { big: '800+', text: 'LeetCode problems solved', color: 'blue' },
];

const baseProjects = [
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

const baseExperience = [
  {
    role: 'Software Engineering Intern (AI Security)',
    org: 'Wingback Security',
    when: 'May 2026 – July 2026',
    points: [
      ['AI coding-agent security', 'Built discovery for AI coding agents (Copilot, Cursor, Codex, Devin, Windsurf, Gemini CLI, Trae) on macOS and Windows, then added enforcement hooks that turned a detect-only agent into one that blocks risky actions.'],
      ['5 LLM providers end to end', 'Integrated xAI Grok, DeepSeek, Kimi, Baseten and Fireworks AI across the AI gateway, model catalog, red-team scanner and onboarding UI, with a live "Test API Key" check.'],
      ['Security fixes', 'Closed a cross-tenant Slack OAuth forgery with HMAC-signed state tokens, and stopped the AI gateway from echoing user input in error responses.'],
      ['Testing + releases', 'Built the endpoint-agent E2E suite with CI (mocked on PRs, nightly on the live cluster) and ran PoC releases on AWS EKS with Helm.'],
    ],
    tags: ['Go', 'Python', 'TypeScript', 'AI Security', 'Red Teaming', 'AWS EKS', 'Helm'],
    note: 'favourite bug: a Slack OAuth flow one customer could forge for another',
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

const baseMilestones = [
  { label: 'National engineering challenge', title: 'National Semifinalist – Flipkart GRiD 8.0', text: "Reached the national semifinal of Flipkart's engineering challenge." },
  { label: 'National hackathon', title: '2nd Place – Yuva Manthan Hackathon (2024)', text: 'Placed second nationally as a team.' },
  { label: 'Algorithms + problem solving', title: '800+ LeetCode problems solved', text: 'Global rank under 60,000.' },
  { label: 'Product launch', title: 'Job Bot – 20 live users', text: 'Launched it and still run it in production.' },
];

const baseSkills = [
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

/* ------------------------------------------------------------------
   TEMPORARY: risk-focused version of the site.
   While show is true, the hero, stickies, about, projects order, Wingback
   points, skills, milestones, contact note and resume all lean toward
   risk and analysis work. Set show to false to bring back the normal site.
   ------------------------------------------------------------------ */
export const riskLens = {
  show: true,
  resume: '/assets/resume-engineering-risk.pdf',
  hero: {
    note: 'civil engineering · risk analysis · automation ↓',
    lede: [
      'Final-year Civil Engineering student at NIT Calicut. I combine engineering knowledge with data analysis and automation to',
      'assess risk',
      ' and support better decisions, and I am building towards a long-term career in risk management.',
    ],
  },
  stickies: [
    { big: 'CGPA 8.24', text: 'B.Tech Civil, NIT Calicut', color: 'yellow' },
    { big: 'Wingback', text: 'former SWE intern', color: 'green' },
    { big: 'GRiD 8.0', text: 'Flipkart national semifinalist', color: 'pink' },
    { big: 'Excel + SQL', text: 'Python for risk analysis', color: 'blue' },
  ],
  about: [
    "I'm a final-year Civil Engineering student at NIT Calicut with a strong interest in construction and infrastructure risk. I know the basics of structural analysis and how large projects are built.",
    'This summer I interned as a software engineer at Wingback Security, building tools that check data, flag problems and send risky cases for manual review.',
    'I work in Excel, SQL and Python, use automation to make routine checks faster and more consistent, and explain findings clearly to non-technical people. I want to build a long-term career in risk management.',
  ],
  aboutCard: {
    currently: 'risk, analytics and engineering',
    tools: 'Excel, SQL, Python, STAAD.Pro, AutoCAD',
  },
  title: 'Engineering risk',
  intro:
    'Civil engineering taught me how infrastructure is built. Data and automation let me measure what can go wrong, how likely it is and what it would cost, and turn that into a clear decision.',
  note: 'engineering judgement, backed by data',
  items: [
    { label: 'infrastructure risk', title: 'Scoring roads for risk', text: 'Weighted 0–100 risk scores for road segments, and pothole grading on the IRC likelihood × consequence matrix.' },
    { label: 'hazard identification', title: 'Finding hazards in images', text: 'Computer vision that flags trees too close to utility poles or hanging over the road, replacing manual surveys.' },
    { label: 'risk pricing', title: 'Pricing from risk factors', text: 'Premium bands from BMI, age, lifestyle and city tier; loan default risk from credit features, with reasons for each decision.' },
    { label: 'equipment risk', title: 'Predicting machine failure', text: 'Predicts the type of machine failure from temperature, speed, torque and tool wear, so maintenance can come first.' },
    { label: 'loss analysis', title: 'From loss drivers to a decision', text: 'Measured churn at 30.5% of revenue, confirmed its drivers with statistical tests, and costed a retention test to break-even.' },
    { label: 'automation', title: 'Automating routine decisions', text: 'Rules that allow, block or refer requests for manual review at Wingback, and a checklist tool that stops avoidable escalations.' },
  ],
  // Projects shown in risk mode: featured first, then smaller cards. Software-only projects are left out.
  projectIds: ['smartroad', 'telco', 'insurance', 'loan', 'machinefailure', 'streetaudit', 'rideops', 'carprice', 'rain'],
  featuredIds: ['smartroad', 'telco', 'insurance'],
  smallerTitle: 'more risk and analysis work →',
  extraProjects: [
    {
      id: 'telco',
      title: 'Telco Churn Analysis',
      subtitle: 'loss drivers to a costed decision',
      kind: 'statistics + data analysis',
      summary:
        'End-to-end analysis of 7,043 customers: what the losses cost, what drives them, and whether a retention offer would pay for itself.',
      stats: [
        { n: '30.5%', l: 'of monthly revenue lost' },
        { n: '18', l: 'models compared' },
        { n: '0.853', l: 'test AUC' },
      ],
      diagram: {
        rows: [['7,043 records', 'cleaning + EDA', 'hypothesis tests', '*model + SHAP', 'A/B test + ROI']],
        note: null,
      },
      highlights: [
        ['Main driver', 'Month-to-month contracts churn 36 points more than annual ones, confirmed with chi-square and CMH tests.'],
        ['Explainable model', 'Chose tuned logistic regression over a stronger ensemble because it is within 1 SE and easy to explain.'],
        ['Costed decision', 'A retention discount breaks even at a 4.3-point churn drop; a pre-registered rule decides the roll-out.'],
      ],
      tags: ['Python', 'Pandas', 'Scikit-Learn', 'SHAP', 'Statistics', 'Excel'],
      links: [{ label: 'code', href: 'https://github.com/Ankur377823/Telco-churn-analysis' }],
      caseStudy: {
        stack: ['Python', 'Pandas', 'NumPy', 'SciPy', 'Scikit-Learn', 'LightGBM', 'SHAP', 'Jupyter', 'Pytest'],
        problem:
          'A telecom provider loses 26.5% of its customers in a quarter. Leadership needs to know what that costs, which customers are at risk and why, and whether a retention offer is worth the money.',
        solution:
          'A documented analysis from problem framing to a business decision. Cleaning decisions are logged, every driver is tested with effect sizes and confidence intervals, and 18 model configurations are compared before choosing an explainable one. The work ends with an A/B test design that sizes the sample, simulates the result and calculates the break-even point.',
        features: [
          'Churn costs 30.5% of monthly recurring revenue, about $1.37M in expected lifetime revenue',
          'Contract type is the biggest driver (42.7% vs 6.8% churn, Cramér\'s V = 0.41); payment method, fibre service and short tenure also confirmed',
          'Hypothesis tests (chi-square, Mann-Whitney, z-tests, CMH) with Holm correction',
          '18 model configurations at CV AUC 0.83–0.87; tuned logistic regression selected by the 1-SE rule, test AUC 0.853, well calibrated',
          'Odds ratios and SHAP to explain why each customer is at risk',
          'Power analysis: 1,126 customers per arm, or 1,513 for the target segment, so the test runs in two waves',
          'Break-even at a 4.3-point churn reduction, with sensitivity from 2.4 to 7.5 points',
          'Reusable code with 48 automated tests and a script that scores new customers',
        ],
      },
    },
    {
      id: 'insurance',
      title: 'Insurance Premium Prediction',
      subtitle: 'risk-based pricing',
      kind: 'pricing model + automation',
      summary:
        'Places each applicant in a Low, Medium or High premium band from risk factors derived automatically from their details.',
      diagram: {
        rows: [['applicant details', 'validation', '*risk factors', 'classifier', 'premium band']],
        note: null,
      },
      bullets: [
        'Derives BMI, age group, lifestyle risk and city tier from raw input',
        'Returns the predicted band, a confidence score and each class probability',
        'Automated, validated service packaged with Docker',
      ],
      tags: ['Python', 'Scikit-Learn', 'FastAPI', 'Pydantic', 'Docker'],
      links: [{ label: 'code', href: 'https://github.com/Ankur377823/Insurance-premium-prediction' }],
      caseStudy: {
        stack: ['Python', 'Scikit-Learn', 'FastAPI', 'Pydantic v2', 'Docker'],
        problem:
          'Premium decisions depend on a handful of risk factors, but raw application details such as height, weight, age and city do not express those factors directly.',
        solution:
          'A service that validates each application, turns raw details into risk factors and returns a premium band with the probability of each band, so the decision and its confidence are both visible.',
        features: [
          'BMI calculated from height and weight',
          'Age groups: young (under 25), adult (25–44), middle-aged (45–59), senior (60+)',
          'Lifestyle risk: high for smokers with BMI over 30, medium for smokers or BMI over 27, otherwise low',
          'City tier 1, 2 or 3 from maintained city lists',
          'Input validation, health check with model version, and a Docker image for deployment',
        ],
      },
    },
    {
      id: 'loan',
      title: 'Loan Default Risk',
      subtitle: 'credit risk',
      kind: 'credit risk model',
      summary: 'Predicts whether a loan will be fully paid or charged off from borrower credit features, with an explanation for each decision.',
      diagram: { rows: [['borrower features', 'validation', '*default model', 'SHAP reasons', 'decision log']], note: null },
      tags: ['Python', 'Scikit-Learn', 'SHAP', 'FastAPI', 'Docker'],
      links: [{ label: 'code', href: 'https://github.com/Ankur377823/Loan-Default-Risk-Prediction-API' }],
      caseStudy: {
        stack: ['Python', 'Scikit-Learn', 'Pandas', 'NumPy', 'SHAP', 'FastAPI', 'Docker'],
        problem: 'Lenders need to judge borrower risk before approving a loan, and need to explain why an application looks risky.',
        solution:
          'A model that scores default risk from loan amount, term, interest rate, grade, income, debt-to-income ratio and employment details, served as an automated service that explains each prediction.',
        features: [
          'Predicts Fully Paid or Charged Off with a confidence score',
          'SHAP explanations showing which features drove each decision',
          'Every request validated, given a unique ID and logged for audit',
          'Packaged with Docker for repeatable deployment',
        ],
      },
    },
    {
      id: 'machinefailure',
      title: 'Machine Failure Prediction',
      subtitle: 'equipment risk',
      kind: 'predictive maintenance',
      summary: 'Predicts whether a machine will fail, and the failure type, from its operating conditions.',
      diagram: { rows: [['sensor readings', '*Random Forest', 'failure type']], note: null },
      tags: ['Python', 'Scikit-Learn', 'Pandas', 'Streamlit'],
      links: [{ label: 'code', href: 'https://github.com/Ankur377823/machine-failure-prediction' }],
      caseStudy: {
        stack: ['Python', 'Scikit-Learn', 'Pandas', 'Streamlit'],
        problem: 'Unplanned equipment failure stops production. Spotting the conditions that lead to failure lets maintenance happen before a breakdown.',
        solution:
          'A Random Forest classifier trained on a predictive maintenance dataset, with a simple app where an engineer enters operating conditions and sees the expected failure type.',
        features: [
          'Inputs: machine quality grade, air and process temperature, rotational speed, torque and tool wear',
          'Failure types: heat dissipation, overstrain, power, random and tool wear failure',
          'Data exploration and model training documented in a notebook',
        ],
      },
    },
    {
      id: 'streetaudit',
      title: 'Roadside Hazard Audit',
      subtitle: 'infrastructure hazards',
      kind: 'computer vision + rules',
      summary: 'Audits roadside photos for trees that endanger utility poles or the road, replacing manual surveys.',
      diagram: { rows: [['road photo', 'YOLO segmentation', 'distance estimate', '*hazard rules']], note: null },
      tags: ['Python', 'YOLO', 'OpenCV', 'Streamlit'],
      links: [{ label: 'code', href: 'https://github.com/Ankur377823/street-audit' }],
      caseStudy: {
        stack: ['Python', 'Ultralytics YOLO', 'OpenCV', 'NumPy', 'Streamlit'],
        problem: 'Trees growing near power lines and over roads are a hazard, and checking them by manual survey is slow.',
        solution:
          'A custom-trained segmentation model finds poles and trees in a roadside photo, a camera model estimates distances, and clear rules classify each tree as safe or hazardous.',
        features: [
          'Hand-labelled dataset and custom-trained YOLO segmentation model',
          'Distance to each pole and spacing between poles from a pinhole camera model',
          'A tree is flagged when it is taller than the nearest pole, overhangs the road centre, or stands too close to a pole',
          'Annotated, downloadable audit image with a summary',
          'Prototype for the later SmartRoad Audit platform',
        ],
      },
    },
    {
      id: 'rideops',
      title: 'Support Escalation Analysis',
      subtitle: 'process improvement',
      kind: 'data analysis + automation',
      live: true,
      summary: 'Diagnosed why a support backlog grew 60% and built a check that stops avoidable escalations.',
      diagram: { rows: [['1,444 tickets', 'root-cause analysis', '*pre-escalation check', 'measured impact']], note: null },
      tags: ['Python', 'Pandas', 'Data Analysis', 'Automation'],
      links: [
        { label: 'live demo', href: 'https://rideops-escalation-check.vercel.app' },
        { label: 'code', href: 'https://github.com/Ankur377823/rideops-escalation-check' },
      ],
      caseStudy: {
        stack: ['Python', 'Pandas', 'Jupyter', 'FastAPI', 'React'],
        problem:
          'Open support tickets rose 60% in two months. More tickets were arriving, and every stage of handling had slowed, so the average ticket stayed open a fifth longer.',
        solution:
          'The data showed that 57% of escalations to engineering came back without a fix, and 68% of engineering trips went to tickets it did not fix. I built a pre-escalation check that shows ticket history and known issues, runs a checklist, writes the handoff note and logs every decision so the effect can be measured.',
        features: [
          '486 of 1,444 tickets escalated; 275 of them (57%) returned without an engineering fix',
          'Each extra trip to engineering added about two days and lowered the rating',
          'Monitor mode warns about gaps; enforce mode blocks escalation until the checklist is complete',
          'Dashboard with weekly measures for the support lead, plus a four-page write-up and a four-week plan',
        ],
        liveNote: 'The demo API runs on a free server, so the first load can take up to a minute.',
      },
    },
    {
      id: 'rain',
      title: 'Rain Prediction',
      subtitle: 'weather risk',
      kind: 'weather data model',
      summary: 'Predicts whether it will rain tomorrow at about 50 Australian weather stations from today\'s observations.',
      diagram: { rows: [['weather observations', 'encoding', '*neural network', 'rain tomorrow']], note: null },
      tags: ['Python', 'Keras', 'Pandas', 'Streamlit'],
      links: [{ label: 'code', href: 'https://github.com/Ankur377823/Rain-prediction-in-australia' }],
      caseStudy: {
        stack: ['Python', 'TensorFlow / Keras', 'Pandas', 'Streamlit'],
        problem: 'Weather drives risk for outdoor work and infrastructure, and next-day rain is a common planning question.',
        solution: 'A neural network trained on historical Australian weather observations, with an app that takes today\'s readings and predicts rain tomorrow.',
        features: [
          'Inputs: temperature, rainfall, evaporation, sunshine, wind, humidity, pressure and cloud cover',
          'Covers about 50 weather stations',
          'Data preparation and training documented in a notebook',
        ],
      },
    },
  ],
  projectsIntro: 'Risk, analysis and automation projects: infrastructure hazards, equipment failure, pricing, credit risk and loss analysis.',
  wingback: {
    points: [
      ['Data checks', 'Built a Python tool that checks data for sensitive information and misuse, and labels each finding for review.'],
      ['Decision rules', 'Wrote rules that decide whether a request is allowed, blocked or sent for manual review, and documented them for the team.'],
      ['Investigation', 'Used SQL and logs to investigate problems, confirm results and report findings; wrote 32 automated tests.'],
    ],
    tags: ['Python', 'SQL', 'Data Analysis', 'Risk Rules', 'Documentation'],
    note: null,
  },
  skills: [
    { group: 'engineering', items: ['Structural analysis', 'Construction methods', 'EPC projects', 'AutoCAD', 'STAAD.Pro', 'Autodesk Robot', 'MATLAB'] },
    { group: 'data + analysis', items: ['MS Excel (pivots, lookups, modelling)', 'PowerPoint', 'SQL', 'Python (Pandas, NumPy, Matplotlib)', 'Statistics', 'XGBoost', 'SHAP'] },
  ],
  skillsIntro: 'Engineering software, data analysis and the automation tools I use to measure and explain risk.',
  contactNote: 'open to risk, analytics and engineering roles from 2027 — write to me:',
};

const R = riskLens.show;
if (R) profile.resume = riskLens.resume;

export const about = R ? riskLens.about : baseAbout;
export const stickies = R ? riskLens.stickies : baseStickies;
const allProjects = [...baseProjects, ...riskLens.extraProjects];
export const projects = R
  ? riskLens.projectIds.map((id) => {
      const p = allProjects.find((x) => x.id === id);
      return { ...p, featured: riskLens.featuredIds.includes(id) };
    })
  : baseProjects;
export const experience = R
  ? baseExperience.map((e, i) => (i === 0 ? { ...e, ...riskLens.wingback } : e))
  : baseExperience;
export const milestones = baseMilestones;
export const skills = R ? [...riskLens.skills, ...baseSkills] : baseSkills;

export const copy = {
  heroNote: R ? riskLens.hero.note : null,
  heroLede: R ? riskLens.hero.lede : null,
  aboutCurrently: R ? riskLens.aboutCard.currently : 'software engineering',
  aboutTools: R ? riskLens.aboutCard.tools : 'Python, FastAPI, SQL, Claude Code, Cursor',
  projectsIntro: R
    ? riskLens.projectsIntro
    : 'Selected engineering work: full-stack automation, production APIs, AI security and computer vision.',
  skillsIntro: R ? riskLens.skillsIntro : 'Languages, frameworks and tools I use to build and ship production systems.',
  contactNote: R ? riskLens.contactNote : 'open to SWE roles from 2027 — write to me:',
  smallerTitle: R ? riskLens.smallerTitle : 'smaller builds, same care →',
};

export const sections = [
  ...(R ? [{ id: 'risk', label: 'risk' }] : []),
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
