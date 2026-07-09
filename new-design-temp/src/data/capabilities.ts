export interface Capability {
  n: string;
  title: string;
  line: string;
  items: string[];
}

export const capabilities: Capability[] = [
  {
    n: "01",
    title: "Programming",
    line: "Building with clean, efficient code.",
    items: ["Python", "SQL", "Java", "JavaScript", "HTML", "CSS", "C"],
  },
  {
    n: "02",
    title: "AI & Machine Learning",
    line: "Models that learn and predict.",
    items: [
      "PyTorch",
      "TensorFlow",
      "Scikit Learn",
      "NumPy",
      "Pandas",
      "Bambi",
    ],
  },
  {
    n: "03",
    title: "Computational Biology",
    line: "Where code meets molecular data.",
    items: ["BioPython", "Clustal Omega", "AlphaFold", "JBrowse", "Single-Cell Analysis", "Gene Annotations"],
  },
  {
    n: "04",
    title: "Data Analysis & Visualization",
    line: "Turning data into insights.",
    items: ["Plotly", "Seaborn", "Matplotlib", "Clustering", "Decision Trees", "Tableau"],
  },
];

/** Tools/credibility marquee. */
export const marquee: string[] = [
  "UC Berkeley",
  "Python",
  "PyTorch",
  "TensorFlow",
  "BioPython",
  "AlphaFold",
  "Next.js",
  "FastAPI",
  "Scikit-learn",
  "Pandas",
  "SQL",
  "Java",
  "TypeScript",
];
