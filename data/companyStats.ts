/**
 * Company statistics.
 * ------------------------------------------------------------------
 * Add ONLY verified figures, with `verified: true`. Unverified entries are
 * never rendered. Example (do not enable until verified):
 *   { label: "Years of combined experience", value: "—", verified: false }
 */

export type CompanyStat = {
  label: string;
  value: string;
  description?: string;
  verified: boolean;
};

export const companyStats: CompanyStat[] = [];

export const verifiedStats = () => companyStats.filter((s) => s.verified);
