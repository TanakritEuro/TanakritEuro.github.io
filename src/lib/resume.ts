import { execSync } from "node:child_process";
import { existsSync } from "node:fs";
import { join } from "node:path";
import data from "../../content/resume.json";

export type ProjectGroup = "own" | "daily-tool" | "showcase";

export interface Project {
  id: string;
  group: ProjectGroup;
  builtWith?: string;
  title: string;
  tagline?: string;
  context?: string;
  period?: string;
  stack: string[];
  /** Keyed by label name in site.labels (demo, repo, frontend, backend). */
  links: Partial<Record<string, string>>;
  bullets?: string[];
  /** Files in src/assets/projects/. */
  images?: { file: string; caption: string; alt: string }[];
}

export interface Resume {
  name: string;
  nickname: string;
  headline: string;
  location: string;
  availability: string;
  summary: string;
  /** Shorter summary for the site hero, which already shows headline and availability. */
  siteSummary?: string;
  contact: { email: string; github: string; linkedin: string };
  resumePdf: string;
  site: { title: string; description: string; labels: Record<string, string> };
  education: {
    school: string;
    location: string;
    degree: string;
    period: string;
    gpax: string;
    coursework: string[];
  }[];
  projects: Project[];
  showcaseNote: string;
  courseProjects: { title: string; course: string; description: string }[];
  skills: { group: string; items: string[] }[];
}

export const resume = data as Resume;
export const labels = resume.site.labels;

export const projectsBy = (group: ProjectGroup) =>
  resume.projects.filter((p) => p.group === group);

/** The PDF button stays hidden until public/resume.pdf actually exists. */
export const hasResumePdf = existsSync(join(process.cwd(), "public", resume.resumePdf));

/** Date of the latest commit (falls back to the build date outside git). */
export const lastUpdated: Date = (() => {
  try {
    const iso = execSync("git log -1 --format=%cI", { stdio: ["ignore", "pipe", "ignore"] })
      .toString()
      .trim();
    if (iso) return new Date(iso);
  } catch {
    /* not a git checkout */
  }
  return new Date();
})();
