/**
 * The firm's photography library. Every image is a local asset in
 * /public/images, so the site is fully self-contained with no runtime
 * dependency on an external image host. The set is deliberately authentic
 * to an East African firm: a Nairobi boardroom, professionals at work, the
 * real Nairobi skyline, and grounded sector photography.
 *
 * To swap any image, drop a new file at the same path and keep the key.
 */

export type ImageAsset = { src: string; alt: string };

export const img = {
  // People and place, authentic to Nairobi and East Africa
  boardroom: {
    src: "/images/hero-boardroom.jpg",
    alt: "A team of professionals in a bright Nairobi boardroom reviewing figures",
  },
  meeting: {
    src: "/images/team-meeting.jpg",
    alt: "Advisers in a working session around a meeting table",
  },
  auditWork: {
    src: "/images/audit-work.jpg",
    alt: "An accountant working through figures on a laptop",
  },
  atWork: {
    src: "/images/at-work.jpg",
    alt: "A professional analysing data at a workstation",
  },
  collaboration: {
    src: "/images/collaboration.jpg",
    alt: "Colleagues collaborating over a plan in the office",
  },
  professional: {
    src: "/images/professional.jpg",
    alt: "A confident finance professional",
  },
  portraitA: {
    src: "/images/portrait-a.jpg",
    alt: "Portrait of a professional",
  },
  portraitB: {
    src: "/images/portrait-b.jpg",
    alt: "Portrait of a professional",
  },
  analytics: {
    src: "/images/analytics.jpg",
    alt: "A performance chart trending upward on a screen",
  },
  nairobi: {
    src: "/images/nairobi.jpg",
    alt: "The Nairobi central business district skyline",
  },

  // Sectors
  financialServices: {
    src: "/images/markets.jpg",
    alt: "Live financial market data on a trading screen",
  },
  agribusiness: {
    src: "/images/agriculture.jpg",
    alt: "Young crops growing on an East African farm",
  },
  farmland: {
    src: "/images/farmland.jpg",
    alt: "Cultivated farmland stretching to the horizon",
  },
  manufacturing: {
    src: "/images/manufacturing.jpg",
    alt: "A modern manufacturing and production line",
  },
  construction: {
    src: "/images/construction.jpg",
    alt: "A large construction and infrastructure site",
  },
  energy: {
    src: "/images/solar.jpg",
    alt: "A solar energy installation under an open sky",
  },
  technology: {
    src: "/images/technology.jpg",
    alt: "A young technology team building a product together",
  },
  development: {
    src: "/images/development.jpg",
    alt: "Children in a community served by development programmes",
  },
} satisfies Record<string, ImageAsset>;

export type ImageKey = keyof typeof img;

// Attribution for the one asset that requires it under its licence.
export const imageCredits = [
  {
    file: "nairobi.jpg",
    title: "Nairobi Skyline from BBC Studios",
    author: "afromusing",
    license: "CC BY 2.0",
  },
];
