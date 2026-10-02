export type ProjectType = "client" | "personal";

export type StackGroup = {
  label: string;
  items: string[];
};

export type EngineeringHighlight = {
  title: string;
  description: string;
};

export type ChallengeSection = {
  title: string;
  body: string;
};

export type DevelopmentProject = {
  slug: string;
  number: string;
  title: string;
  shortTitle?: string;
  client?: string;
  type: ProjectType;
  eyebrow: string;
  tagline: string;
  summary: string;
  role: string;
  status?: string;
  year?: string;
  coverImage: string;
  coverAlt: string;
  coverFit?: "cover" | "contain";
  coverPosition?: string;
  heroMediaMode?: "full-bleed" | "contained";
  stack: string[];
  stackGroups?: StackGroup[];
  highlights: EngineeringHighlight[];
  features?: string[];
  problem?: string;
  solution?: string;
  architecture?: string;
  architectureSteps?: string[];
  challengeSections?: ChallengeSection[];
  privacySecurity?: string;
  testing?: string;
  liveUrl?: string;
  repositoryUrl?: string;
  sourceDoc?: string;
  featured: boolean;
};
