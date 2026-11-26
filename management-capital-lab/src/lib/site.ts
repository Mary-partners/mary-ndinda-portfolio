// Central place for site-wide contact / brand constants.
export const SITE = {
  name: "The Management Capital Lab",
  author: "Mary Ndinda",
  email: "mary@managementcapitallab.com",
  tagline: "Beyond access to finance.",
  // The Capability Platform, served under this site at /platform. Founders and
  // programme teams enter through the login page, which also offers sign-up.
  platformUrl: "/platform/login",
  // Entry point for the founder diagnostic: the login page, which offers sign-up.
  diagnosticUrl: "/platform/login",
} as const;
