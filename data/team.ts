/**
 * Leadership / team.
 * ------------------------------------------------------------------
 * Add verified details only. Leave arrays empty rather than guessing.
 * Photos go in /public/images/team/ (square, at least 800×800).
 */

export type TeamMember = {
  name: string;
  title: string;
  image?: string;
  shortBio: string;
  longBio: string[];
  qualifications: string[];
  recognitions: string[];
  areasOfExpertise: string[];
  linkedin?: string;
  featured: boolean;
  placeholder?: boolean;
};

export const team: TeamMember[] = [
  {
    name: "Founder name",
    title: "Founder & Principal Consultant",
    shortBio:
      "Placeholder — add a two-sentence summary of the founder’s background in privacy, information security and compliance.",
    longBio: [
      "Placeholder — add a verified biography. Keep it factual: roles held, types of programmes led, sectors supported.",
    ],
    qualifications: [],
    recognitions: [],
    areasOfExpertise: ["Data privacy", "Information security", "Governance", "Risk"],
    featured: true,
    placeholder: true,
  },
];

export const leadershipSection = {
  eyebrow: "Leadership",
  heading: "Led by practitioners",
  description:
    "Engagements are led by experienced professionals across privacy, information security, governance and risk.",
};
