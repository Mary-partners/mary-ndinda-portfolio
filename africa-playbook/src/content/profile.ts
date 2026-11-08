/**
 * PUBLIC PROFILE
 *
 * Only Mary's name, location and approved positioning are published until
 * she verifies career details. Do NOT add employer names, figures, client
 * names, contact details or links here until each has been approved in the
 * internal content review (internal/CONTENT_REVIEW.md, never committed).
 *
 * To publish verified details later, add entries to `approvedCareerDetails`.
 * Each entry renders on /evidence under "Approved career details".
 */

export interface ApprovedDetail {
  /** e.g. "Finance leadership" */
  heading: string;
  /** Approved wording, exactly as Mary signed it off. */
  text: string;
  /** Date approved, ISO. */
  approvedOn: string;
}

export interface ExternalLink {
  label: string;
  href: string;
  /** Date the URL was checked and confirmed to be Mary's. */
  checkedOn: string;
}

export const profile = {
  name: "Mary Ndinda",
  initials: "MN",
  location: "Nairobi, Kenya",
  positioning:
    "I connect financial discipline, institutional capability and execution to help businesses use capital productively.",
  role: {
    title: "Director of Africa",
    firm: "Abler Nordic",
    reference: "A003437",
    recruiter: "Millar Cameron",
    location: "Nairobi",
  },
  disclaimer:
    "Independent application proposal by Mary Ndinda. Proposed approach, subject to mandate, portfolio review and internal approval.",
  notOfficial:
    "This site is not an Abler Nordic publication. It does not imply appointment, endorsement or access to internal information.",
  /** Empty until approved. See file header. */
  approvedCareerDetails: [] as ApprovedDetail[],
  /**
   * Empty until checked. The LinkedIn URL supplied in the brief could not be
   * checked from the build environment, so it is intentionally not linked.
   */
  links: [] as ExternalLink[],
  researchDate: "8 November 2026",
} as const;
