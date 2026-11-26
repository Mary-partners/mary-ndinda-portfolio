import { PDFDocument, StandardFonts, rgb, PDFString, PDFName } from "pdf-lib";
import type { PDFFont, PDFPage, RGB } from "pdf-lib";
import fontkit from "@pdf-lib/fontkit";
import { gunzipSync } from "zlib";
import { POPPINS_REGULAR_GZ, POPPINS_SEMIBOLD_GZ } from "./poppins";
import { DIMENSION_META, CONSTRAINT_LABELS } from "./constants";
import { fmtScore, fmtIndex, fmtNumber, fmtDate, pctChange, maturityBand } from "./utils";
import { getActionPlan } from "./recommend";
import { getFounderV2 } from "./founder-v2";
import type { V2Result, V2Plan } from "./scoring-v2";
import { PRACTICE_GUIDE, PILLAR_PLAIN, DONE_WHEN, START_PHRASE, EVIDENCE_REFS } from "./practice-guide";
import type { getCompanyDetail } from "./company";
import type { getPortfolioStats } from "./portfolio";

type Detail = NonNullable<Awaited<ReturnType<typeof getCompanyDetail>>>;
type Stats = Awaited<ReturnType<typeof getPortfolioStats>>;

const W = 595.28, H = 841.89, M = 48, CW = W - M * 2;
const NAVY = rgb(16 / 255, 37 / 255, 63 / 255);
const NAVY_DEEP = rgb(8 / 255, 19 / 255, 34 / 255);
const GOLD = rgb(182 / 255, 154 / 255, 87 / 255);
const GOLD_DEEP = rgb(140 / 255, 114 / 255, 56 / 255);
const INK = rgb(0.1, 0.15, 0.2);
const MUTED = rgb(0.4, 0.46, 0.52);
const LINE = rgb(0.86, 0.86, 0.83);
const WHITE = rgb(1, 1, 1);
const OK = rgb(0.18, 0.49, 0.31), WARN = rgb(0.69, 0.49, 0.16), BAD = rgb(0.65, 0.27, 0.18);

// Keep text to what the standard WinAnsi fonts can encode.
const WINANSI = new Set([0x20AC, 0x201A, 0x0192, 0x201E, 0x2026, 0x2020, 0x2021, 0x02C6, 0x2030, 0x0160, 0x2039, 0x0152, 0x017D, 0x2018, 0x2019, 0x201C, 0x201D, 0x2022, 0x2013, 0x2014, 0x02DC, 0x2122, 0x0161, 0x203A, 0x0153, 0x017E, 0x0178]);
function san(s: unknown): string {
  return [...String(s ?? "")].map((ch) => {
    const c = ch.codePointAt(0)!;
    if (c === 9 || c === 10) return " ";
    if (c < 0x20) return "";
    if (c <= 0xff || WINANSI.has(c)) return ch;
    return "?";
  }).join("");
}

function toneColor(t: string): RGB {
  return t === "ok" ? OK : t === "warn" ? WARN : t === "bad" ? BAD : MUTED;
}

class Doc {
  doc!: PDFDocument;
  page!: PDFPage;
  reg!: PDFFont;
  bold!: PDFFont;
  y = H - M;

  static async create() {
    const d = new Doc();
    d.doc = await PDFDocument.create();
    try {
      d.doc.registerFontkit(fontkit);
      d.reg = await d.doc.embedFont(gunzipSync(Buffer.from(POPPINS_REGULAR_GZ, "base64")), { subset: true });
      d.bold = await d.doc.embedFont(gunzipSync(Buffer.from(POPPINS_SEMIBOLD_GZ, "base64")), { subset: true });
    } catch {
      d.reg = await d.doc.embedFont(StandardFonts.Helvetica);
      d.bold = await d.doc.embedFont(StandardFonts.HelveticaBold);
    }
    d.page = d.doc.addPage([W, H]);
    return d;
  }
  ensure(space: number) {
    if (this.y - space < M) { this.page = this.doc.addPage([W, H]); this.y = H - M; }
  }
  wrap(text: string, font: PDFFont, size: number, maxWidth: number): string[] {
    const words = san(text).split(/\s+/);
    const lines: string[] = [];
    let cur = "";
    for (const w of words) {
      const t = cur ? cur + " " + w : w;
      if (font.widthOfTextAtSize(t, size) > maxWidth && cur) { lines.push(cur); cur = w; }
      else cur = t;
    }
    if (cur) lines.push(cur);
    return lines.length ? lines : [""];
  }
  text(s: string, o: { x?: number; size?: number; bold?: boolean; color?: RGB; gap?: number; maxWidth?: number } = {}) {
    const { x = M, size = 10, bold = false, color = INK, gap = 5, maxWidth } = o;
    const font = bold ? this.bold : this.reg;
    const lines = maxWidth ? this.wrap(s, font, size, maxWidth) : [san(s)];
    for (const ln of lines) { this.ensure(size + gap); this.page.drawText(ln, { x, y: this.y - size, size, font, color }); this.y -= size + gap; }
  }
  cell(s: string, x: number, o: { size?: number; bold?: boolean; color?: RGB; align?: "left" | "right"; w?: number } = {}) {
    const { size = 10, bold = false, color = INK, align = "left", w = 0 } = o;
    const font = bold ? this.bold : this.reg;
    const t = san(s);
    const tw = font.widthOfTextAtSize(t, size);
    const px = align === "right" ? x + w - tw : x;
    this.page.drawText(t, { x: px, y: this.y - size, size, font, color });
  }
  hr(gap = 10) { this.ensure(gap); this.page.drawLine({ start: { x: M, y: this.y }, end: { x: W - M, y: this.y }, thickness: 0.75, color: LINE }); this.y -= gap; }
  gap(h: number) { this.y -= h; }
  section(label: string) {
    this.gap(8);
    this.text(label.toUpperCase(), { size: 9, bold: true, color: GOLD_DEEP, gap: 8 });
  }
  save() { return this.doc.save(); }
}

function header(d: Doc, eyebrow: string, title: string, orgName: string) {
  // navy band across the top
  d.page.drawRectangle({ x: 0, y: H - 104, width: W, height: 104, color: NAVY });
  d.page.drawRectangle({ x: 0, y: H - 108, width: W, height: 4, color: GOLD });
  d.page.drawText(san(eyebrow.toUpperCase()), { x: M, y: H - 44, size: 9, font: d.bold, color: GOLD });
  const t = san(title);
  const size = t.length > 38 ? 18 : 22;
  d.page.drawText(t, { x: M, y: H - 72, size, font: d.bold, color: WHITE });
  // right meta
  const right = (s: string, yy: number, sz = 8.5, color = rgb(0.68, 0.73, 0.8)) => {
    const w = d.reg.widthOfTextAtSize(san(s), sz);
    d.page.drawText(san(s), { x: W - M - w, y: yy, size: sz, font: d.reg, color });
  };
  right("Management Capital Lab", H - 40, 9, WHITE);
  right(orgName, H - 54);
  right("Generated " + fmtDate(new Date()), H - 67);
  right("CONFIDENTIAL", H - 84, 8, GOLD);
  d.y = H - 104 - 26;
}

// Enterprise Management Diagnostic (revised v2 rubric).
// Clickable URI link annotation over a rectangle on the current page.
function addLink(d: Doc, url: string, x: number, y: number, w: number, h: number) {
  const annot = d.doc.context.obj({
    Type: "Annot", Subtype: "Link", Rect: [x, y, x + w, y + h], Border: [0, 0, 0],
    A: { Type: "Action", S: "URI", URI: PDFString.of(url) },
  });
  const ref = d.doc.context.register(annot);
  const existing = d.page.node.Annots();
  if (existing) existing.push(ref);
  else d.page.node.set(PDFName.of("Annots"), d.doc.context.obj([ref]));
}

const SKY = rgb(0.93, 0.95, 0.99);
const CREAM = rgb(0.97, 0.94, 0.87);
const SUB = rgb(0.3, 0.36, 0.42);
const LINKC = rgb(0.16, 0.31, 0.55);
function matuTone(label: string): RGB {
  return label === "Embedded" || label === "Strong" ? OK : label === "Developing" ? WARN : BAD;
}

// Founder Snapshot and Practice Guide (two A4 pages) for a v2 assessment.
async function buildFounderSnapshotPdf(result: V2Result, plan: V2Plan, company: Detail["company"], generatedAt: Date, isBaseline: boolean): Promise<Uint8Array> {
  const d = await Doc.create();
  const put = (s: string, x: number, y: number, o: { size?: number; bold?: boolean; color?: RGB } = {}) =>
    d.page.drawText(san(s), { x, y, size: o.size ?? 10, font: o.bold ? d.bold : d.reg, color: o.color ?? INK });
  const right = (s: string, y: number, size: number, color: RGB, bold = false) => {
    const f = bold ? d.bold : d.reg;
    const w = f.widthOfTextAtSize(san(s), size);
    d.page.drawText(san(s), { x: W - M - w, y, size, font: f, color });
  };
  const rule = (y: number, color: RGB = LINE, x0 = M, x1 = W - M) =>
    d.page.drawLine({ start: { x: x0, y }, end: { x: x1, y }, thickness: 0.75, color });

  const name = company.tradingName || company.legalName;
  const gen = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Nairobi", day: "numeric", month: "short", year: "numeric" }).format(generatedAt)
    + ", " + new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Nairobi", hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false }).format(generatedAt) + " EAT";

  // Interpretation (tie-aware on unrounded values).
  const q = result.pillars.filter((p) => p.raw !== null);
  const maxRaw = q.length ? Math.max(...q.map((p) => p.raw!)) : 0;
  const minRaw = q.length ? Math.min(...q.map((p) => p.raw!)) : 0;
  const strongest = q.filter((p) => Math.abs((p.raw ?? 0) - maxRaw) < 1e-9);
  const lowest = q.filter((p) => Math.abs((p.raw ?? 0) - minRaw) < 1e-9);
  let interp = result.overallBand.blurb + " ";
  if (strongest.length === 1) interp += `Your strongest area was ${PILLAR_PLAIN[strongest[0].key]}. `;
  else if (strongest.length > 1) interp += `Your strongest areas were ${strongest.map((p) => p.name).join(" and ")}. `;
  if (lowest.length >= 2) interp += `${lowest.map((p) => p.name).join(" and ")} tied for the lowest scores.`;
  else if (lowest.length === 1) interp += `${lowest[0].name} had the lowest score.`;

  const pr = plan.priorities;
  const scoreLabel = (c: (typeof pr)[number]) => (c.status === "numeric" && c.score !== null ? `${c.score}/4` : "to check");
  const LX = M + 94; // content column (left label gutter)

  // ---------- PAGE 1 ----------
  let y = H - M;
  d.page.drawRectangle({ x: M, y: y - 1, width: 24, height: 2.5, color: GOLD });
  put("MANAGEMENT CAPITAL LAB", M + 32, y - 3, { size: 8.5, bold: true, color: NAVY });
  right("PRIVATE SELF-ASSESSMENT", y - 3, 8.5, GOLD_DEEP, true);
  y -= 30;
  put(name, M, y - 20, { size: 21, bold: true, color: NAVY }); y -= 28;
  put("Enterprise Management Diagnostic", M, y - 11, { size: 11.5, color: SUB }); y -= 24;
  const metaLeft = [company.sector, company.country].filter(Boolean).join("   /   ");
  if (metaLeft) put(metaLeft, M, y - 8, { size: 9, color: MUTED });
  right(`Report generated ${gen}`, y - 8, 9, MUTED); y -= 20;

  const interpLines = d.wrap(interp, d.reg, 9.5, CW - 196);
  const bandH = Math.max(76, 30 + interpLines.length * 13.5);
  d.page.drawRectangle({ x: M, y: y - bandH, width: CW, height: bandH, color: SKY });
  put(`${result.mci ?? "n/a"}/100`, M + 20, y - 32, { size: 22, bold: true, color: NAVY });
  put(result.overallBand.label, M + 20, y - 48, { size: 10.5, bold: true, color: NAVY });
  put(isBaseline ? "Your first assessment" : "Latest assessment", M + 20, y - 60, { size: 8, color: MUTED });
  let iy = y - 22;
  for (const ln of interpLines) { put(ln, M + 188, iy, { size: 9.5, color: INK }); iy -= 13.5; }
  y -= bandH + 20;

  if (result.mci === null) {
    put(`Not enough questions were answered to show an overall Index (${result.totalNumeric} of ${result.totalApplicable} scored).`, M, y - 9, { size: 9, color: BAD });
    y -= 20;
  }

  put("Capability breakdown", M, y - 13, { size: 13, bold: true, color: NAVY }); y -= 26;
  put("Score out of 4", M + 236, y, { size: 8, bold: true, color: MUTED });
  put("Maturity", M + 376, y, { size: 8, bold: true, color: MUTED });
  y -= 15;
  for (const p of result.pillars) {
    const rowY = y - 9;
    put(p.name, M, rowY, { size: 9.5, color: INK });
    if (p.qualifies && p.raw !== null) {
      const bw = 76;
      d.page.drawRectangle({ x: M + 236, y: rowY - 1, width: bw, height: 4, color: rgb(0.86, 0.88, 0.91) });
      d.page.drawRectangle({ x: M + 236, y: rowY - 1, width: Math.max(2, (p.raw / 4) * bw), height: 4, color: GOLD });
      put(p.raw.toFixed(2), M + 324, rowY, { size: 9.5, bold: true });
      put(p.band.label, M + 376, rowY, { size: 9, color: matuTone(p.band.label) });
    } else {
      put("Insufficient information", M + 236, rowY, { size: 8.5, color: MUTED });
    }
    rule(y - 19);
    y -= 22;
  }
  y -= 12;

  put("Your next 90 days", M, y - 13, { size: 13, bold: true, color: NAVY }); y -= 25;
  put("Three practices to focus on first, in order. \"Done when\" shows what finished looks like.", M, y, { size: 8.5, color: MUTED }); y -= 17;
  let startText: string;
  if (plan.startNow.length) startText = plan.startNow.map((c) => START_PHRASE[c.code]).filter(Boolean).join(", and ");
  else if (pr.length) startText = (PRACTICE_GUIDE[pr[0].code]?.milestone ?? pr[0].item.action).toLowerCase();
  else startText = "keep your current routines and reassess in 90 days";
  startText = startText.charAt(0).toUpperCase() + startText.slice(1) + ".";
  d.page.drawRectangle({ x: M, y: y - 24, width: CW, height: 24, color: CREAM });
  put("Start this week", M + 12, y - 16, { size: 8.5, bold: true, color: NAVY });
  put(startText, M + 108, y - 16, { size: 9.5, color: INK });
  y -= 24 + 16;

  pr.slice(0, 3).forEach((c, i) => {
    const g = PRACTICE_GUIDE[c.code];
    rule(y);
    y -= 7;
    put(`BY DAY ${30 * (i + 1)}`, M, y - 8, { size: 7.5, bold: true, color: MUTED });
    put(g?.milestone ?? c.item.action, LX, y - 8, { size: 11, bold: true, color: NAVY });
    y -= 21;
    put(`${g?.label ?? c.pillarName} · ${scoreLabel(c)}`, LX, y, { size: 8, color: GOLD_DEEP });
    y -= 12.5;
    const reason = c.status === "numeric" ? (g?.reason ?? "") : "You did not answer this. Confirm it from your records and record the result.";
    for (const ln of d.wrap(reason, d.reg, 9.5, CW - (LX - M))) { put(ln, LX, y, { size: 9.5, color: INK }); y -= 12.5; }
    put("Done when", LX, y, { size: 8.5, bold: true, color: NAVY });
    const lw = d.bold.widthOfTextAtSize("Done when", 8.5);
    put(DONE_WHEN[c.code] ?? c.item.action, LX + lw + 7, y, { size: 9, color: INK });
    y -= 17;
  });

  rule(y); y -= 13;
  for (const ln of d.wrap("At day 90, revisit these answers and record what changed. Compare your next assessment with this baseline.", d.reg, 8.5, CW)) { put(ln, M, y, { size: 8.5, color: MUTED }); y -= 11.5; }
  y -= 3;
  put(`Results are based on your answers. "${result.mci ?? "n/a"}/100" summarises the practices assessed here.`, M, y, { size: 8.5, color: MUTED });

  // ---------- PAGE 2 ----------
  d.page = d.doc.addPage([W, H]);
  y = H - M;
  d.page.drawRectangle({ x: M, y: y - 1, width: 24, height: 2.5, color: GOLD });
  put("MANAGEMENT CAPITAL LAB", M + 32, y - 3, { size: 8.5, bold: true, color: NAVY });
  right(`${name.toUpperCase()} / PRACTICE GUIDE`, y - 3, 8.5, GOLD_DEEP, true);
  y -= 32;
  put(pr.length === 1 ? "Why this practice?" : `Why these ${pr.length === 2 ? "two" : "three"} practices?`, M, y - 20, { size: 19, bold: true, color: NAVY });
  y -= 40;

  const financeFirst = pr.some((c) => c.startNow);
  let intro = pr.length
    ? "These are the practices your answers scored lowest, so they are where to start. "
    : "You rated most practices at a routine level or higher, so no priorities are flagged. ";
  intro += financeFirst
    ? "Essential money routines come first, even where another area scored lower, so you can see what cash the business has and what it will need. Work through them in order."
    : "They are ordered by what will strengthen how the business runs first. Work through them in order.";
  for (const ln of d.wrap(intro, d.reg, 9.5, CW)) { put(ln, M, y, { size: 9.5, color: INK }); y -= 13.5; }
  y -= 12;

  const RX = M + 108; // right-text column on page 2
  for (let i = 0; i < Math.min(3, pr.length); i++) {
    const c = pr[i];
    const g = PRACTICE_GUIDE[c.code];
    rule(y); y -= 8;
    put(g?.guideTitle ?? c.pillarName, M, y - 13, { size: 12, bold: true, color: NAVY });
    right(`${scoreLabel(c)} · By day ${30 * (i + 1)}`, y - 13, 9, MUTED);
    y -= 24;
    const rows: [string, string][] = [
      ["Why it matters", g?.why ?? c.item.why],
      ["Put it to work", (g?.work ?? c.item.action) + (g?.solo ? " " + g.solo : "")],
      ["What to watch", g?.watch ?? "Check whether the practice is being used in your weekly routine."],
    ];
    for (const [lab, txt] of rows) {
      put(lab, M, y, { size: 8.5, bold: true, color: SUB });
      const lines = d.wrap(txt, d.reg, 9.5, CW - (RX - M));
      let ty = y;
      for (const ln of lines) { put(ln, RX, ty, { size: 9.5, color: INK }); ty -= 12.5; }
      y -= Math.max(1, lines.length) * 12.5 + 5;
    }
    y -= 8;
  }

  // What the evidence says
  const evLines1 = d.wrap("The IFC SME Governance Guidebook recommends managing cash flow, separating business funds from the owner's, and making clear who has authority to decide. [1]", d.reg, 9, CW - 28);
  const evLines2 = d.wrap("McKenzie and Woodruff used a 26-practice index that included record-keeping and financial planning. In follow-up data from Kenya, Nigeria and Sri Lanka, firms that used more of the practices at baseline had higher survival rates and faster sales growth. [2]", d.reg, 9, CW - 28);
  const evLines3 = d.wrap(`That finding concerns the research index as a whole. Use your ${result.mci ?? "n/a"}/100 as a baseline to track adoption. Predicting your own growth or survival would require a separate, validated model.`, d.reg, 9, CW - 28);
  const panelH = 24 + (evLines1.length + evLines2.length + evLines3.length) * 12 + 22;
  d.page.drawRectangle({ x: M, y: y - panelH, width: CW, height: panelH, color: SKY });
  let ey = y - 19;
  put("What the evidence says", M + 14, ey, { size: 10.5, bold: true, color: NAVY }); ey -= 17;
  for (const group of [evLines1, evLines2, evLines3]) {
    for (const ln of group) { put(ln, M + 14, ey, { size: 9, color: INK }); ey -= 12; }
    ey -= 4;
  }
  y -= panelH + 14;

  put("[1] " + EVIDENCE_REFS.ifc.label, M, y, { size: 8, color: LINKC });
  addLink(d, EVIDENCE_REFS.ifc.url, M, y - 2, d.reg.widthOfTextAtSize(san("[1] " + EVIDENCE_REFS.ifc.label), 8), 11);
  y -= 12;
  put("[2] " + EVIDENCE_REFS.mw.label, M, y, { size: 8, color: LINKC });
  addLink(d, EVIDENCE_REFS.mw.url, M, y - 2, d.reg.widthOfTextAtSize(san("[2] " + EVIDENCE_REFS.mw.label), 8), 11);

  right("2 / 2", 40, 8, MUTED);

  return d.save();
}

export async function buildCompanyReportPdf(detail: Detail, orgName: string): Promise<Uint8Array> {
  const { company, latest, dimRows } = detail;
  // Revised (v2) rubric: the Founder Snapshot and Practice Guide (2 pages).
  const fvEarly = await getFounderV2(company.id);
  if (fvEarly.state === "v2") {
    return buildFounderSnapshotPdf(fvEarly.result, fvEarly.plan, company, new Date(), fvEarly.isBaseline);
  }
  const d = await Doc.create();
  const name = company.tradingName || company.legalName;
  header(d, "Enterprise Management Diagnostic Report", name, orgName);

  // Profile (two columns)
  const col = CW / 2;
  const prof: [string, string][] = [
    ["Sector", company.sector], ["Country", company.country],
    ["Stage", company.stage || "n/a"], ["Employees", company.employees != null ? fmtNumber(company.employees) : "n/a"],
    ["Advisor", company.advisor?.name || "n/a"], ["Programme", company.programme?.name || "n/a"],
  ];
  for (let i = 0; i < prof.length; i += 2) {
    d.ensure(16);
    d.cell(prof[i][0] + ":", M, { size: 9.5, color: MUTED });
    d.cell(prof[i][1], M + 58, { size: 9.5, bold: true });
    if (prof[i + 1]) { d.cell(prof[i + 1][0] + ":", M + col, { size: 9.5, color: MUTED }); d.cell(prof[i + 1][1], M + col + 58, { size: 9.5, bold: true }); }
    d.y -= 16;
  }
  d.hr();

  // Executive summary: stat blocks
  d.section("Executive summary");
  const band = maturityBand(latest?.overallScore);
  const stats: [string, string, string, RGB][] = [
    ["Management Capital Index", latest?.overallScore != null ? fmtIndex(latest?.overallScore) + "/100" : "n/a", band.label, GOLD_DEEP],
    ["Completeness", Math.round((latest?.completeness ?? 0) * 100) + "%", "applicable answered", NAVY],
    ["Evidence coverage", Math.round((latest?.evidenceCoverage ?? 0) * 100) + "%", "independently verified", NAVY],
  ];
  d.ensure(50);
  const sx = [M, M + 180, M + 340];
  stats.forEach((s, i) => {
    d.page.drawText(san(s[0]), { x: sx[i], y: d.y - 9, size: 8.5, font: d.reg, color: MUTED });
    d.page.drawText(san(s[1]), { x: sx[i], y: d.y - 30, size: 22, font: d.bold, color: s[3] });
    d.page.drawText(san(s[2]), { x: sx[i], y: d.y - 42, size: 8, font: d.reg, color: MUTED });
  });
  d.y -= 52;
  const ranked = [...dimRows].filter((x) => x.current !== null).sort((a, b) => (a.current ?? 0) - (b.current ?? 0));
  d.text(
    "Strongest capabilities: " + (ranked.slice(-2).map((x) => x.name).reverse().join(", ") || "not yet assessed") +
    ". Most material gaps: " + (ranked.slice(0, 2).map((x) => x.name).join(", ") || "not yet assessed") + ".",
    { size: 10, color: INK, gap: 6, maxWidth: CW });
  d.hr();

  // Capability breakdown
  d.section("Capability breakdown");
  // On a first assessment the baseline IS the current result, so showing both is
  // confusing. Show Now + gap to a fully embedded practice (4.0) instead, and only
  // show Base vs Now once a genuinely earlier assessment exists.
  const retaken = Boolean(detail.baseline && detail.latest && detail.baseline.id !== detail.latest.id);
  if (!retaken) {
    d.text("This is the first assessment, so it is also the baseline. The gap shows the distance to a fully embedded practice (4.0).", { size: 8.5, color: MUTED, gap: 7, maxWidth: CW });
  }
  const c1 = M, c2 = M + 210, c3 = M + 270, cbar = M + 330, cband = M + 452;
  d.cell("Pillar", c1, { size: 8.5, bold: true, color: MUTED });
  d.cell(retaken ? "Base" : "Now", c2, { size: 8.5, bold: true, color: MUTED, align: "right", w: 34 });
  d.cell(retaken ? "Now" : "Gap", c3, { size: 8.5, bold: true, color: MUTED, align: "right", w: 34 });
  d.cell("Maturity", cbar, { size: 8.5, bold: true, color: MUTED });
  d.y -= 14;
  for (const r of dimRows) {
    d.ensure(16);
    d.cell(r.name, c1, { size: 9.5 });
    if (retaken) {
      d.cell(fmtScore(r.baseline), c2, { size: 9.5, color: MUTED, align: "right", w: 34 });
      d.cell(fmtScore(r.current), c3, { size: 9.5, bold: true, align: "right", w: 34 });
    } else {
      d.cell(fmtScore(r.current), c2, { size: 9.5, bold: true, align: "right", w: 34 });
      d.cell(r.current != null ? (4 - r.current).toFixed(2) : "—", c3, { size: 9.5, color: MUTED, align: "right", w: 34 });
    }
    // bar
    const bw = 110, by = d.y - 9;
    d.page.drawRectangle({ x: cbar, y: by, width: bw, height: 5, color: rgb(0.9, 0.91, 0.93) });
    if (r.current != null) d.page.drawRectangle({ x: cbar, y: by, width: Math.max(2, (r.current / 4) * bw), height: 5, color: GOLD });
    d.cell(maturityBand(r.current).label, cband, { size: 8.5, color: toneColor(maturityBand(r.current).tone) });
    d.y -= 16;
  }
  d.hr();

  // Action plan: traceable 30/60/90 steps from the weakest rated practices
  d.section("Your action plan for the next 90 days");
  const plan = await getActionPlan(company.id);
  if (!plan || plan.priorities.length === 0) {
    d.text(
      ranked.length === 0
        ? "Complete a diagnostic to generate your action plan."
        : "Most practices were rated as regular or embedded. Keep these habits in place and reassess in a few months to track progress.",
      { size: 10, color: MUTED, maxWidth: CW });
  } else {
    plan.priorities.forEach((p, i) => {
      d.ensure(30);
      d.text(`${p.horizon}   ${p.pillarName}`, { size: 8.5, bold: true, color: GOLD_DEEP, gap: 3 });
      d.text(`${i + 1}. ${p.action}.`, { size: 10, color: INK, gap: 8, maxWidth: CW });
    });
    if (plan.moreActions.length) {
      d.gap(2);
      d.text("Then look at:", { size: 9, bold: true, color: NAVY, gap: 4 });
      plan.moreActions.slice(0, 5).forEach((m) => {
        d.text(`- ${m.action} (${m.pillarName}).`, { size: 9.5, color: INK, gap: 4, maxWidth: CW });
      });
    }
  }
  d.hr();

  // Constraints
  d.section("Underlying constraints");
  if (company.constraints.length === 0) d.text("No non-management constraints flagged.", { size: 10, color: MUTED, maxWidth: CW });
  for (const c of company.constraints) {
    d.text(`- ${CONSTRAINT_LABELS[c.type] ?? c.type} (${c.severity})${c.note ? ": " + c.note : ""}`, { size: 9.5, color: INK, gap: 5, maxWidth: CW });
  }
  d.hr();

  // KPIs
  if (company.kpis.length) {
    d.section("Business performance");
    const k1 = M, k2 = M + 250, k3 = M + 340, k4 = M + 430;
    d.cell("Indicator", k1, { size: 8.5, bold: true, color: MUTED });
    d.cell("Baseline", k2, { size: 8.5, bold: true, color: MUTED, align: "right", w: 70 });
    d.cell("Current", k3, { size: 8.5, bold: true, color: MUTED, align: "right", w: 70 });
    d.cell("Change", k4, { size: 8.5, bold: true, color: MUTED, align: "right", w: CW - (k4 - M) });
    d.y -= 14;
    for (const k of company.kpis) {
      d.ensure(15);
      const ch = pctChange(k.baseline, k.actual);
      d.cell(k.definition.name, k1, { size: 9.5 });
      d.cell(k.baseline == null ? "n/a" : fmtNumber(k.baseline), k2, { size: 9.5, color: MUTED, align: "right", w: 70 });
      d.cell(k.actual == null ? "n/a" : fmtNumber(k.actual), k3, { size: 9.5, align: "right", w: 70 });
      d.cell(ch.value == null ? (ch.note ?? "n/a") : `${ch.value >= 0 ? "+" : ""}${ch.value.toFixed(1)}%`, k4, { size: 9.5, color: ch.value == null ? MUTED : ch.value >= 0 ? OK : BAD, align: "right", w: CW - (k4 - M) });
      d.y -= 15;
    }
    d.hr();
  }

  // Limitations
  d.gap(4);
  d.ensure(60);
  const boxTop = d.y;
  d.text("Evidence & assessment limitations", { size: 9, bold: true, color: NAVY, gap: 5 });
  d.text("Scores reflect a custom SME maturity assessment, not validated WMS scores. Founder-provided evidence is independently verified only when confirmed by a reviewer. Management maturity, implementation progress and business performance are tracked distinctly, and associations between management quality and financial outcomes are not treated as causal.", { size: 8.5, color: MUTED, gap: 4, maxWidth: CW - 24 });
  d.page.drawRectangle({ x: M - 10, y: d.y - 2, width: CW + 20, height: boxTop - d.y + 12, borderColor: LINE, borderWidth: 0.75, color: rgb(0.97, 0.97, 0.95), opacity: 0.0 });

  return d.save();
}

export async function buildPortfolioReportPdf(stats: Stats, orgName: string): Promise<Uint8Array> {
  const d = await Doc.create();
  header(d, "Portfolio Intelligence Summary", orgName, orgName);

  d.section("Headline metrics");
  const cards: [string, string, string, RGB][] = [
    ["Enterprises", String(stats.totalEnterprises), `${stats.assessed} assessed`, NAVY],
    ["Avg. Index", stats.avgMaturity != null ? fmtIndex(stats.avgMaturity) + "/100" : "n/a", maturityBand(stats.avgMaturity).label, GOLD_DEEP],
    ["Verified adoption", Math.round(stats.pctVerifiedAdoption) + "%", "of enterprises", NAVY],
    ["Evidence coverage", Math.round(stats.evidenceCoverage) + "%", "verified / submitted", NAVY],
  ];
  d.ensure(50);
  const cx = [M, M + 128, M + 256, M + 384];
  cards.forEach((c, i) => {
    d.page.drawText(san(c[0]), { x: cx[i], y: d.y - 9, size: 8.5, font: d.reg, color: MUTED });
    d.page.drawText(san(c[1]), { x: cx[i], y: d.y - 30, size: 20, font: d.bold, color: c[3] });
    d.page.drawText(san(c[2]), { x: cx[i], y: d.y - 42, size: 8, font: d.reg, color: MUTED });
  });
  d.y -= 54;
  d.hr();

  d.section("Average capability by pillar");
  for (const dim of stats.dimensionAverages) {
    d.ensure(16);
    d.cell(dim.name, M, { size: 9.5 });
    d.cell(fmtScore(dim.score), M + 210, { size: 9.5, bold: true, align: "right", w: 34 });
    const bw = 150, by = d.y - 9;
    d.page.drawRectangle({ x: M + 260, y: by, width: bw, height: 5, color: rgb(0.9, 0.91, 0.93) });
    if (dim.score != null) d.page.drawRectangle({ x: M + 260, y: by, width: Math.max(2, (dim.score / 4) * bw), height: 5, color: GOLD });
    d.y -= 16;
  }
  d.hr();

  d.section("Adoption funnel");
  for (const f of stats.funnel) {
    d.ensure(15);
    d.cell(f.label, M, { size: 9.5 });
    d.cell(String(f.value), M + CW - 40, { size: 9.5, bold: true, align: "right", w: 40 });
    d.y -= 15;
  }
  d.hr();

  d.gap(4);
  d.text("Research note", { size: 9, bold: true, color: NAVY, gap: 5 });
  d.text("Figures are computed from stored records. Scores reflect a custom SME maturity assessment, not validated WMS scores; maturity, implementation and performance are tracked distinctly and correlation is not treated as cause.", { size: 8.5, color: MUTED, gap: 4, maxWidth: CW });

  return d.save();
}
