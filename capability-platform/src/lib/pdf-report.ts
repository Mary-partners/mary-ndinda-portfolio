import { PDFDocument, StandardFonts, rgb } from "pdf-lib";
import type { PDFFont, PDFPage, RGB } from "pdf-lib";
import { DIMENSION_META, CONSTRAINT_LABELS } from "./constants";
import { fmtScore, fmtNumber, fmtDate, pctChange, maturityBand } from "./utils";
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
    d.reg = await d.doc.embedFont(StandardFonts.Helvetica);
    d.bold = await d.doc.embedFont(StandardFonts.HelveticaBold);
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

export async function buildCompanyReportPdf(detail: Detail, orgName: string): Promise<Uint8Array> {
  const d = await Doc.create();
  const { company, latest, dimRows } = detail;
  const name = company.tradingName || company.legalName;
  header(d, "Enterprise Management Diagnostic Report", name, orgName);

  // Profile (two columns)
  const col = CW / 2;
  const prof: [string, string][] = [
    ["Sector", company.sector], ["Country", company.country],
    ["Stage", company.stage || "—"], ["Employees", company.employees != null ? fmtNumber(company.employees) : "—"],
    ["Advisor", company.advisor?.name || "—"], ["Programme", company.programme?.name || "—"],
  ];
  for (let i = 0; i < prof.length; i += 2) {
    d.ensure(16);
    d.cell(prof[i][0] + ":", M, { size: 9.5, color: MUTED });
    d.cell(prof[i][1], M + 58, { size: 9.5, bold: true });
    if (prof[i + 1]) { d.cell(prof[i + 1][0] + ":", M + col, { size: 9.5, color: MUTED }); d.cell(prof[i + 1][1], M + col + 58, { size: 9.5, bold: true }); }
    d.y -= 16;
  }
  d.hr();

  // Executive summary — stat blocks
  d.section("Executive summary");
  const band = maturityBand(latest?.overallScore);
  const stats: [string, string, string, RGB][] = [
    ["Overall maturity", fmtScore(latest?.overallScore), band.label, GOLD_DEEP],
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
  const c1 = M, c2 = M + 210, c3 = M + 270, cbar = M + 330, cband = M + 452;
  d.cell("Dimension", c1, { size: 8.5, bold: true, color: MUTED });
  d.cell("Base", c2, { size: 8.5, bold: true, color: MUTED, align: "right", w: 34 });
  d.cell("Now", c3, { size: 8.5, bold: true, color: MUTED, align: "right", w: 34 });
  d.cell("Maturity", cbar, { size: 8.5, bold: true, color: MUTED });
  d.y -= 14;
  for (const r of dimRows) {
    d.ensure(16);
    d.cell(r.name, c1, { size: 9.5 });
    d.cell(fmtScore(r.baseline), c2, { size: 9.5, color: MUTED, align: "right", w: 34 });
    d.cell(fmtScore(r.current), c3, { size: 9.5, bold: true, align: "right", w: 34 });
    // bar
    const bw = 110, by = d.y - 9;
    d.page.drawRectangle({ x: cbar, y: by, width: bw, height: 5, color: rgb(0.9, 0.91, 0.93) });
    if (r.current != null) d.page.drawRectangle({ x: cbar, y: by, width: Math.max(2, (r.current / 4) * bw), height: 5, color: GOLD });
    d.cell(maturityBand(r.current).label, cband, { size: 8.5, color: toneColor(maturityBand(r.current).tone) });
    d.y -= 16;
  }
  d.hr();

  // Recommendations
  d.section("Priority recommendations");
  if (ranked.length === 0) d.text("Complete a diagnostic to generate recommendations.", { size: 10, color: MUTED, maxWidth: CW });
  ranked.slice(0, 3).forEach((r, i) => {
    d.text(`${i + 1}.  Strengthen ${r.name.toLowerCase()} — current ${fmtScore(r.current)}, gap to Embedded (4.0) = ${(4 - (r.current ?? 0)).toFixed(2)}.`, { size: 10, color: INK, gap: 6, maxWidth: CW });
  });
  d.hr();

  // Constraints
  d.section("Underlying constraints");
  if (company.constraints.length === 0) d.text("No non-management constraints flagged.", { size: 10, color: MUTED, maxWidth: CW });
  for (const c of company.constraints) {
    d.text(`- ${CONSTRAINT_LABELS[c.type] ?? c.type} (${c.severity})${c.note ? " — " + c.note : ""}`, { size: 9.5, color: INK, gap: 5, maxWidth: CW });
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
      d.cell(k.baseline == null ? "—" : fmtNumber(k.baseline), k2, { size: 9.5, color: MUTED, align: "right", w: 70 });
      d.cell(k.actual == null ? "—" : fmtNumber(k.actual), k3, { size: 9.5, align: "right", w: 70 });
      d.cell(ch.value == null ? (ch.note ?? "—") : `${ch.value >= 0 ? "+" : ""}${ch.value.toFixed(1)}%`, k4, { size: 9.5, color: ch.value == null ? MUTED : ch.value >= 0 ? OK : BAD, align: "right", w: CW - (k4 - M) });
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
    ["Avg. maturity", fmtScore(stats.avgMaturity), maturityBand(stats.avgMaturity).label, GOLD_DEEP],
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

  d.section("Average capability by dimension");
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
