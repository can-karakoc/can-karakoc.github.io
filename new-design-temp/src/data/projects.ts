export type Track = "build" | "design";

export interface Project {
  id: string;
  title: string;
  /** Payne-style one-liner shown large on the card. */
  tagline: string;
  /** One-sentence plain description under the tagline. */
  blurb: string;
  /** Role credits, shown mono and "/"-separated, like film credits. */
  roles: string[];
  /** Tech stack chips. */
  stack: string[];
  /** Which track this belongs to. Design projects are hidden until flagged. */
  track: Track;
  year: string;
  href?: string;
  sourceHref?: string;
  /** Accent used for the card's hover wash. */
  accent: "cobalt" | "lime" | "periwinkle";
  /** Optional cover image path */
  cover?: string;
  /** Background color for the cover image */
  coverBg?: string;
}

export const projects: Project[] = [
  {
    id: "protein-io",
    title: "Protein Interaction Explorer",
    tagline: "An open workspace for structural biology.",
    blurb:
      "Built an open-source structural biology workspace for uploading, fetching, visualizing, and analyzing protein structures with PDB/mmCIF file parsing, AlphaFold integration, residue-residue and protein-ligand contact detection, and exportable interaction reports.",
    roles: ["Full Stack", "Structural Biology"],
    stack: ["Next.js", "TypeScript", "FastAPI", "Python", "Mol*", "Gemmi", "Tailwind CSS"],
    track: "build",
    year: "2024",
    href: "https://protein-io.vercel.app/",
    sourceHref: "https://github.com/can-karakoc/protein-io.git",
    accent: "cobalt",
  },
  {
    id: "protein-search",
    title: "Embedding-Based Similarity Search System",
    tagline: "Find the needle by its shape, not its name.",
    blurb:
      "Built a protein similarity search tool that takes a protein sequence, name, or accession ID and retrieves biologically similar proteins using embeddings and vector search. The tool resolves metadata from UniProt, validates inputs, and ranks nearest-neighbor protein matches.",
    roles: ["ML", "Backend", "API"],
    stack: ["Python", "FastAPI", "UniProt API", "FAISS", "Hugging Face", "ESM/ProtT5"],
    track: "build",
    year: "2024",
    href: "https://frontend-five-dusky-60.vercel.app/",
    accent: "lime",
  },
  {
    id: "energy-carbon",
    title: "Energy Production and Carbon Emissions",
    tagline: "What actually moves the needle on emissions.",
    blurb:
      "Analyzed state-level renewable energy adoption and carbon emissions by predicting renewable energy production using Gaussian GLM, Random Forest, and KNN, and estimating the causal impact of electricity prices on carbon emissions using Stabilized Inverse Propensity Weighting with bootstrapped scores.",
    roles: ["ML", "Causal Inference", "Data Science"],
    stack: ["Python", "Scikit-learn", "Pandas", "Seaborn", "Matplotlib", "Jupyter"],
    track: "build",
    year: "2024",
    sourceHref: "https://github.com/can-karakoc/data102-final-proj",
    accent: "periwinkle",
  },
  {
    id: "lentivirus",
    title: "Lentivirus Gene Search Tool",
    tagline: "A genome browser for the viruses that hide.",
    blurb:
      "Developed an interactive genome browser to analyze HIV-1, HIV-2, and SIV genomes, providing gene annotations, conserved region comparisons, and protein sequence alignments. Integrated 3D protein models to explore structural variation and potential drug targets.",
    roles: ["Frontend", "Bioinformatics"],
    stack: ["JBrowse2", "Clustal Omega", "GitHub"],
    track: "build",
    year: "2023",
    href: "https://jordanklanfer.github.io/static_jbrowse/",
    sourceHref: "https://github.com/JORDANKLANFER/jbrowse2_project",
    accent: "cobalt",
  },
  {
    id: "email-classifier",
    title: "Email Classification",
    tagline: "Teaching a model to smell spam.",
    blurb:
      "Built a Logistic Regression Model to classify emails as ham (not spam) or spam; identified 40+ features through feature engineering and performed cross-validation with L1 and L2 regularization to tune hyperparameters.",
    roles: ["ML"],
    stack: ["Python", "Scikit-learn", "Pandas", "Matplotlib"],
    track: "build",
    year: "2023",
    sourceHref: "https://github.com/can-karakoc/spam-ham.git",
    accent: "lime",
  },
  {
    id: "world-game",
    title: "Procedural World Engine",
    tagline: "An infinite world, seeded from nothing.",
    blurb:
      "Built a Java program that generates an interactive pseudo-random world with creative gameplay involving mini-worlds and persistent game states with saving, quitting, and loading options to ensure long-term engagement and continuity.",
    roles: ["Systems", "Java"],
    stack: ["Java", "Procedural Generation"],
    track: "build",
    year: "2023",
    href: "https://youtu.be/xaQWofbBags",
    accent: "periwinkle",
  },
];

/**
 * Flip to `true` when you're ready to surface the product-design case
 * studies (Trip-Up, Marketwake, Playbook) alongside the technical work.
 * Everything else — the grid, the filter — adapts automatically.
 */
export const SHOW_DESIGN_TRACK = false;

export const visibleProjects = projects.filter(
  (p) => SHOW_DESIGN_TRACK || p.track === "build"
);
