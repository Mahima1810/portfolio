// Every fact on the site lives here, taken from my resume. Edit this file to update the site.

export const profile = {
  name: "Mahima Kopalley",
  role: "Machine Learning Researcher",
  focus: ["Edge AI", "Clinical AI", "Speech & NLP"],
  location: "Hyderabad, India (IST, UTC+5:30)",
  availability: "Open to freelance, contract & research roles",
  summary:
    "ML researcher with 1+ year of applied research at IIIT Hyderabad across clinical AI, speech and multilingual NLP. " +
    "I build models end to end, from signal and data pipelines to training, knowledge distillation, LoRA fine-tuning " +
    "and benchmarking for edge deployment, and I turn research models into small, reliable models that run on real devices.",
  email: "mahimakopalle@gmail.com",
  github: "https://github.com/Mahima1810",
  linkedin: "https://www.linkedin.com/in/mahima-kopalle",
};

export const highlights = [
  { value: "1+ yr", label: "applied ML research at IIIT Hyderabad" },
  { value: "~85–90%", label: "fewer trainable parameters with LoRA (IndicTrans2)" },
  { value: "150+", label: "participants mentored at NASA Space Apps" },
];

export type Experience = {
  role: string;
  org: string;
  place: string;
  period: string;
  points: string[];
  tags: string[];
};

export const experience: Experience[] = [
  {
    role: "AI/ML Research Intern, Clini-Aura",
    org: "Center for Innovation & Entrepreneurship (CIE), IIIT Hyderabad",
    place: "Hyderabad, India",
    period: "May 2026 – Present",
    points: [
      "Building an end-to-end wearable ECG pipeline for VitalPatch data: denoising and filtering, R-peak detection, HR/HRV features, signal-quality assessment and rhythm analysis for arrhythmia screening.",
      "Designing and comparing ECG beat-classification models (CNN, CNN–Transformer hybrids) with controlled experiments, validation and per-class error analysis.",
      "Leading knowledge distillation with MedGemma as teacher, training lightweight student models and checking reliability, accuracy retention and deployment efficiency.",
      "Benchmarking models for edge deployment: F1, sensitivity, specificity, inference latency, throughput and memory on resource-limited hardware.",
      "Integrating AI-generated findings into the Clini-Aura clinician dashboard.",
    ],
    tags: ["ECG", "PyTorch", "CNN–Transformer", "Knowledge distillation", "MedGemma", "Edge AI"],
  },
  {
    role: "Research Assistant, Applied AI/ML & NLP",
    org: "Language Technologies Research Centre (LTRC), IIIT Hyderabad",
    place: "Hyderabad, India",
    period: "Sep 2025 – Apr 2026",
    points: [
      "Fine-tuned IndicTrans2 with LoRA, cutting trainable parameters by ~85–90% while keeping translation quality.",
      "Built scalable speech-dataset pipelines from SWAYAM audio–text pairs for Indian-language TTS research.",
      "Ran phoneme alignment with the Montreal Forced Aligner and extracted duration, pitch, energy and mel-spectrogram features for FastSpeech2.",
      "Used M2M alignment for character-to-phoneme mapping and built structured phoneme embeddings for speech synthesis.",
    ],
    tags: ["LoRA / PEFT", "IndicTrans2", "TTS", "FastSpeech2", "Montreal Forced Aligner", "Hugging Face"],
  },
];

export type Project = {
  name: string;
  tagline: string;
  description: string;
  points: string[];
  stack: string[];
  repo: string;
  demo?: string; // live site, if the project is deployed
  color: string; // accent colour for this project's card
  slides: { src: string; alt: string; caption: string }[];
};

export const projects: Project[] = [
  {
    name: "PaperPilot",
    tagline: "Answers about research papers that you can check",
    description:
      "Upload a research PDF and ask questions. Every answer is cited to the exact section and page, and if the paper doesn't say it, PaperPilot says so instead of guessing.",
    points: [
      "Section-aware PDF parsing with page tracking for every passage",
      "Hybrid BM25 + TF-IDF retrieval merged with reciprocal rank fusion, offline on CPU",
      "Citation verification: answers without a valid citation are thrown away",
      "Works with any OpenAI-compatible LLM, or fully offline in extractive mode",
      "22 automated tests, CI, Docker; checked by hand on real arXiv papers",
    ],
    stack: ["Python", "FastAPI", "RAG", "BM25", "scikit-learn", "pypdf", "Docker"],
    repo: "https://github.com/Mahima1810/paperpilot",
    demo: "https://paper-pilot-livid.vercel.app",
    color: "#8b7fff",
    slides: [
      {
        src: "/projects/paperpilot.jpg",
        alt: "PaperPilot answering a question about 'Attention Is All You Need' with numbered citations",
        caption: "Answers on a real arXiv paper, cited to section and page",
      },
      {
        src: "/projects/paperpilot-answer.jpg",
        alt: "PaperPilot showing the quoted Limitations passage in the source panel next to its answer",
        caption: "Click a citation to see the exact passage it came from",
      },
      {
        src: "/projects/paperpilot-home.jpg",
        alt: "PaperPilot start screen with a PDF library and suggested questions",
        caption: "Drop in a PDF, or start from a suggested question",
      },
    ],
  },
  {
    name: "MoodMuse",
    tagline: "The mood and the themes in written feedback",
    description:
      "Drop in reviews, survey answers or support tickets and get sentiment, automatically discovered themes with representative quotes, and a summary built only from the data.",
    points: [
      "Sentence-embedding clustering (MiniLM + k-means, k chosen by silhouette)",
      "Distinctive theme labels with class-based TF-IDF",
      "Sentiment: VADER + product lexicon, or RoBERTa (91% vs 74% agreement with star ratings on the sample)",
      "Interactive Streamlit dashboard with charts, filters, a feedback map and exports",
      "20 automated tests, CI, Docker, CLI",
    ],
    stack: ["Python", "sentence-transformers", "scikit-learn", "Transformers", "Streamlit", "Plotly"],
    repo: "https://github.com/Mahima1810/moodmuse",
    color: "#ff5fa2",
    slides: [
      {
        src: "/projects/moodmuse.jpg",
        alt: "MoodMuse dashboard with KPI tiles, a written summary, a sentiment donut chart and theme bars",
        caption: "Sentiment, KPIs and a summary built only from the data",
      },
      {
        src: "/projects/moodmuse-themes.jpg",
        alt: "MoodMuse theme cards with keywords and representative quotes",
        caption: "Themes found automatically, each with real quotes",
      },
    ],
  },
];

export const skills: { group: string; items: string[] }[] = [
  {
    group: "ML Research",
    items: ["Knowledge distillation", "Model compression", "Quantization", "LoRA / PEFT", "Fine-tuning", "Benchmarking & evaluation"],
  },
  {
    group: "Deep Learning",
    items: ["CNNs", "Transformers", "CNN–Transformer hybrids", "Sequence modeling", "LLMs", "LLM agents", "RAG"],
  },
  {
    group: "Domains",
    items: ["ECG / biomedical signals", "Arrhythmia detection", "Speech synthesis (TTS)", "Multilingual NLP", "Edge AI"],
  },
  { group: "Frameworks", items: ["PyTorch", "TensorFlow", "Hugging Face", "scikit-learn", "Pandas", "NumPy"] },
  { group: "MLOps & Backend", items: ["MLflow", "Weights & Biases", "Docker", "Git", "Linux", "FastAPI", "Flask", "REST APIs"] },
  { group: "Edge & Embedded", items: ["NVIDIA Jetson", "Raspberry Pi", "ESP32", "Arduino", "Embedded C"] },
  { group: "Languages & Data", items: ["Python", "C/C++", "Java", "SQL", "JavaScript", "PostgreSQL", "MySQL", "MongoDB"] },
];

export const education = {
  school: "G. Narayanamma Institute of Technology and Science (GNITS)",
  degree: "B.Tech, Electronics & Telematics Engineering",
  detail: "CGPA 7.43 · Minor in AI/ML (CGPA 7.3)",
  period: "2021 – 2025",
};

export const achievements = [
  { title: "Poster, ESTIC 2026", text: "Co-authored research poster selected for presentation (Oct 2026)." },
  { title: "Organizer, NASA Space Apps Challenge", text: "Mentored and coordinated 150+ participants." },
  { title: "Design Head, College Yearbook", text: "Led UI/UX design and publication; raised Rs. 50,000+ through student fundraising." },
  { title: "Languages", text: "English (fluent), Telugu (native), Hindi (intermediate), Japanese (read/write)." },
];

// ---------- Numbers for the charts (all measured, see each repo's README) ----------

export const journey = [
  { label: "B.Tech, GNITS", sub: "Electronics & Telematics · AI/ML minor", start: 2021.6, end: 2025.5, color: "#4cc9f0" },
  { label: "LTRC, IIIT Hyderabad", sub: "Research Assistant · NLP & speech", start: 2025.67, end: 2026.33, color: "#ffb547" },
  { label: "CIE, IIIT Hyderabad", sub: "AI/ML Research Intern · Clini-Aura", start: 2026.33, end: 2026.9, color: "#ff5fa2", ongoing: true },
];

// MoodMuse README: agreement with star ratings on the 70-review sample (a sanity check, not a benchmark).
export const moodmuseAccuracy = {
  series: [
    { name: "3-class accuracy", color: "#ff5fa2" },
    { name: "Clearly positive / negative reviews", color: "#ffb547" },
  ],
  rows: [
    { label: "VADER (stock)", values: [55.7, 62.3] },
    { label: "VADER + product lexicon", values: [74.3, 83.6] },
    { label: "RoBERTa transformer", values: [91.4, 95.1] },
  ],
};

// IndicTrans2 + LoRA: ~85–90% fewer trainable parameters, so ~10–15% are still trained.
export const loraParams = { low: 10, high: 15 };
