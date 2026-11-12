#!/usr/bin/env python3
"""
Regenerate src/lib/data/literature.ts from the Management Capital literature
database spreadsheet (the "Literature Database" sheet).

Usage (from the management-capital-lab folder):

    pip install openpyxl
    python3 scripts/import-literature.py path/to/Management_Capital_Literature_Database.xlsx

How it works
------------
* Bibliographic fields (title, authors, journal, year, DOI, theme, review
  status, open access, citation count) always come from the spreadsheet.
* CURATED below holds a reviewed, plain-English "key finding" and "why it
  matters to this study" for each article, grounded in Chapters One and Two.
  Rows without a curated entry fall back to the spreadsheet's "Major
  observations" and "Relevance to proposed study" columns, so new articles
  appear on the site as soon as they are added to the database. Write a
  curated entry for them when the full text has been read.
* CORRECTIONS fixes geography / method labels that the spreadsheet still marks
  "to verify" or has mislabelled, using what Chapter Two establishes. They are
  display-only overrides; the spreadsheet itself should be corrected too.
"""

from __future__ import annotations

import json
import sys
from pathlib import Path

import openpyxl

OUT = Path(__file__).resolve().parent.parent / "src" / "lib" / "data" / "literature.ts"

# --------------------------------------------------------------------------- #
# Curated per-article text: id -> (key finding, why it matters to this study)
# --------------------------------------------------------------------------- #
CURATED: dict[int, tuple[str, str]] = {
    1: (
        "Sustained competitive advantage comes from firm resources that are valuable, rare, imperfectly imitable and not readily substitutable.",
        "Principal theoretical lens (resource-based view). Explains why management capital, embedded in routines, systems and decision rights, can make similarly financed SMEs perform differently.",
    ),
    2: (
        "Long-run wealth creation depends on a firm's ability to integrate, build and reconfigure competences as conditions change: its dynamic capabilities.",
        "Principal theoretical lens. Explains why management capital matters most during growth and disruption, when routines must change rather than simply repeat.",
    ),
    3: (
        "Dynamic capabilities are specific, identifiable processes with commonalities across firms; in fast-moving markets they become simple, experiential and fragile.",
        "Supports measuring capability through observable processes rather than labels, and warns against calling every successful change a 'capability' (a tautology risk the study guards against).",
    ),
    4: (
        "Organises dynamic capabilities into three activities: sensing opportunities and threats, seizing them, and reconfiguring the enterprise.",
        "The sensing-seizing-reconfiguring logic maps onto strategic clarity, financial and operational systems, and leadership in the proposed index.",
    ),
    5: (
        "A firm's ability to recognise, assimilate and apply valuable external knowledge (absorptive capacity) depends on its prior related knowledge.",
        "Used by analogy only: acquiring an external resource does not guarantee its productive use. That idea frames 'capital absorption', without treating money and knowledge as the same thing.",
    ),
    6: (
        "Distinguishes potential absorptive capacity (acquiring and assimilating) from realised absorptive capacity (transforming and exploiting).",
        "Directly inspires the study's split between ex ante capital-deployment readiness and ex post realised capital absorption.",
    ),
    7: (
        "Argues that absorptive-capacity research had become 'reified' around untested assumptions, and calls for clearer process definitions.",
        "A caution against importing a popular construct wholesale. Capital absorption has to be defined and tested on its own terms.",
    ),
    8: (
        "Coordination mechanisms such as cross-functional interfaces, participation in decisions and job rotation mainly build potential absorptive capacity; potential and realised capacity respond to different drivers.",
        "Evidence that 'ready' and 'realised' capacity are empirically distinct, which supports the study's measurement proposition MP1.",
    ),
    9: (
        "When one party knows more than the other, credible signals that are costly for low-quality actors to imitate can reduce uncertainty.",
        "Explains how reliable accounts, transparent ownership and coherent forecasts can act as signals to funders. This is the route from management capital to investment readiness.",
    ),
    10: (
        "Raising interest rates need not clear a credit market, because higher rates change who borrows and how much risk they take. Lenders may ration credit instead.",
        "The core finance-constraint mechanism: a capable SME can still be rationed when its quality cannot be verified.",
    ),
    11: (
        "Structured management practices vary widely across firms and countries and are strongly associated with productivity, profitability, growth and survival.",
        "Moved management from vague 'leadership' talk to scorable practices, and its interview method informs behaviourally anchored items. Its thresholds were built for medium-sized manufacturers and cannot be copied to founder-led SMEs.",
    ),
    12: (
        "Randomly introducing structured management practices in Indian textile plants improved quality, inventory and efficiency, with first-year productivity gains of around 17%.",
        "Shows that management practices can cause performance change, not merely describe successful firms. The intervention was intensive and costly, and the plants were large by African SME standards.",
    ),
    13: (
        "A 26-item set of basic practices (marketing, stock control, record keeping, financial planning) predicts sales, profits, productivity and survival among small firms in seven countries, including Kenya.",
        "The closest measurement foundation for small firms. The evidence is associational, so it shapes item content rather than proving that every practice causes growth.",
    ),
    14: (
        "Meta-analysis: conventional business training raises profits and sales by about 5-10% on average, an effect that is meaningful but often too small for individual trials to detect.",
        "A null result from one course does not disprove management capability, and attending a course is not evidence that capability exists. The index measures routines in use.",
    ),
    15: (
        "Subsidised, tailored consulting changed management practices among Mexican SMEs and produced lasting gains in productivity, employment and wages, although intensive advice is costly.",
        "Firm-specific diagnosis can beat generic training. This is the logic behind an index that targets each firm's binding capability gap.",
    ),
    16: (
        "In Togo, personal-initiative training produced larger profit gains for microentrepreneurs than traditional business training.",
        "Founder behaviour can be developed and it matters. Initiative does not replace the financial and operational routines that make action informed and repeatable.",
    ),
    17: (
        "A randomised experiment in Ghana found that basic management training improved business practices and performance, though gains varied widely between entrepreneurs.",
        "Direct African experimental evidence that management capability can be built, and that responses are heterogeneous.",
    ),
    18: (
        "Business training for Kenyan women entrepreneurs produced market-level effects, so evaluations must account for competitive spillovers between firms.",
        "Kenyan evidence that capability gains at one firm can shift a whole local market. Firm-level results need to be read alongside competitive effects.",
    ),
    19: (
        "In Kenya, matching microentrepreneurs with experienced local mentors and classroom training produced different learning pathways; intervention format shapes adoption.",
        "Kenyan evidence that local mentors can pass on practical knowledge a classroom cannot. Delivery design matters as much as content.",
    ),
    20: (
        "A randomised management-training experiment with small manufacturers in Tanzania compares short- and medium-run effects on practices and performance. Full-text review pending.",
        "East African evidence on whether practice changes persist, which matters for measuring routines that remain after a programme ends.",
    ),
    21: (
        "In Tanzania, combining business training with a cash grant had strong effects on male entrepreneurs' performance and practices, but much weaker effects for women.",
        "Human and financial capital work together, and outcomes vary with the owner's context. This supports fairness testing across gender.",
    ),
    22: (
        "In the Dominican Republic, simple financial rules of thumb improved financial practices more than standard accounting training, especially for those with weaker initial skills.",
        "Supports items about what managers actually do, such as separating business and personal cash and reviewing liquidity, rather than whether they know accounting vocabulary.",
    ),
    23: (
        "Reviews business-training and entrepreneurship evaluations: effects on existing firms are modest over short horizons, with stronger evidence that training speeds up new business start-up.",
        "An early synthesis showing that training effects are small and hard to detect. It is a reason to measure practices in use rather than participation.",
    ),
    24: (
        "In rural Pakistan, business training improved knowledge and practices and reduced business failure (mainly for men), while access to larger loans had limited average impact.",
        "'Money or ideas?' Not every expression of financial need means a bigger loan is the binding intervention.",
    ),
    25: (
        "Nigeria's business-plan competition awarded grants averaging about US$50,000; winners saw higher survival, sales, profits and employment.",
        "Capital can unlock growth among selected, ambitious entrepreneurs. The index may add most value by predicting execution risk and advisory needs, not by re-scoring opportunity quality.",
    ),
    26: (
        "In South Africa, marketing training and finance training improved performance through different pathways: marketing helped firms grow, finance helped them run leaner.",
        "South African evidence that the most useful intervention depends on the firm's binding constraint. This is the core logic of a diagnostic profile.",
    ),
    27: (
        "Randomised grants to Sri Lankan microenterprises produced high average returns to capital, but returns varied sharply with owner ability, household wealth and gender.",
        "Some small firms are genuinely capital-constrained, yet identical grants produced unequal results. An average effect is not a readiness diagnostic.",
    ),
    28: (
        "In Ghana, in-kind grants stayed in the business and raised profits for women with larger firms, while cash grants leaked out: a 'flypaper effect'.",
        "The form and governance of finance shape how it is deployed. Absorption must be interpreted alongside the design of the instrument.",
    ),
    29: (
        "Among Ghanaian tailors, consulting changed practices and cash increased investment, but neither produced sustained profit gains, and firms drifted back to earlier practices.",
        "Adoption can be temporary. Supports measuring persistence, fit and learning rather than one-time adoption.",
    ),
    30: (
        "Ugandan group grants for vocational training and business start-up increased skilled self-employment, work hours and earnings.",
        "Real programmes bundle screening, planning, peer accountability and cash, which makes it hard to credit results to money alone.",
    ),
    31: (
        "A systematic review of interventions targeted at micro-entrepreneurs and SMEs finds that creating employment is complex and that little is known about which interventions work, and when.",
        "Underlines the heterogeneity problem the index is designed to diagnose.",
    ),
    32: (
        "Across more than 4,000 firms in 54 countries, financial, legal and corruption obstacles constrain small firms' growth more than large firms'.",
        "Some obstacles managers complain about most did not predict growth. A reported obstacle is not necessarily the binding constraint, which is the distinction the study relies on.",
    ),
    33: (
        "Financial and institutional development reduces the disadvantage small firms face; the authors caution against support targeted on firm size alone.",
        "Supports diagnosis over a uniform capital response for every firm below a size threshold.",
    ),
    35: (
        "Uses firm-level survey data from developing countries to examine which firms create jobs, highlighting the importance of small and young firms for employment and job creation.",
        "Context for why SME capability matters for development outcomes, and for using firm size and age as control variables.",
    ),
    36: (
        "Using World Bank Enterprise Survey data on 10,888 firms in 30 African countries, firms that were not credit-constrained grew faster; severe perceived finance obstacles went with weaker growth.",
        "Confirms that finance matters in Africa, but a cross-sectional design cannot explain why similarly financed firms perform differently.",
    ),
    37: (
        "Within ECOWAS, firm size, ownership, legal rights, credit information, export orientation and top-manager experience shape SMEs' access to finance, with marked country differences.",
        "Manager experience links to management capital, and the country differences support analysing Kenya and South Africa separately before pooling.",
    ),
    40: (
        "Firm size, age and ownership predict how severely firms report financing obstacles; financial and institutional development eases them.",
        "Specifies size, age and ownership as controls in the study's finance model.",
    ),
    41: (
        "SME financing sources shift over a 'financial growth cycle' as firms become larger, older and more transparent: from insiders and trade credit to bank debt and external equity.",
        "Readiness depends on stage and instrument. Records that suffice for a microloan will not satisfy an institutional equity investor.",
    ),
    42: (
        "Longer lending relationships improve small firms' credit availability and terms by reducing information asymmetry.",
        "Relationship history is a signal in its own right. The index must not mistake an existing banking relationship for management capability.",
    ),
    43: (
        "Links lending technologies (relationship, financial-statement and asset-based lending, among others) to the structure of financial institutions and the wider lending infrastructure.",
        "Different lenders rely on different information, so what counts as 'ready' depends on the provider being approached.",
    ),
    45: (
        "Builds cross-country estimates of household access to formal financial services and relates access to poverty and inequality.",
        "Helps distinguish financial inclusion from access to appropriate growth capital, a distinction central to Kenya, where account ownership is widespread.",
    ),
    46: (
        "Bank access around the world is shaped by affordability, eligibility and physical barriers, which vary greatly across countries.",
        "Capability cannot fully substitute for financial-system barriers, so external constraints stay in the model.",
    ),
    47: (
        "Systematic review of SME finance programmes in developing countries: finance tends to raise firm investment, profits and employment, but evidence on wider economic effects is limited.",
        "Confirms finance can help, while leaving open which firms convert it into lasting growth, the question the index addresses.",
    ),
    48: (
        "Gender differences in access to finance in Sub-Saharan Africa largely reflect firm and owner characteristics and structural conditions.",
        "Fairness: an index used by funders must not reproduce structural inequality. Supports testing for differential item functioning by gender.",
    ),
    49: (
        "The regulatory business environment shapes SMEs' funding choices in developing countries; interventions should make varied finance more accessible and affordable.",
        "Regulation and institutions stay as contextual variables outside management capital.",
    ),
    50: (
        "Using Enterprise Survey data, access to finance emerges as the most common binding constraint on firm growth across many developing-country sectors, alongside other constraints.",
        "Perception data may miss managerial constraints founders do not recognise, for example weak pricing behind a reported credit shortage.",
    ),
    51: (
        "Human capital has a positive but varied link with entrepreneurial success; task-related education and experience matter more than general proxies.",
        "Credentials alone are weak proxies for applied capability. The founder and team dimension measures what people do, not their degrees.",
    ),
    52: (
        "Meta-analysis linking different forms of entrepreneurial talent and human capital to venture performance, with effects varying by type of talent and outcome measured.",
        "Supports a founder and team dimension, while showing why one proxy cannot stand in for organisational capability.",
    ),
    53: (
        "Longitudinal data on 119 German business owners: owners' human capital, together with how employees are developed and used, predicts employment growth.",
        "Capability sits in the team and its development, not only in the founder.",
    ),
    54: (
        "Founders' education and prior experience help technology ventures grow, but organisational capabilities remain distinct from founder attributes.",
        "The index separates what the founder knows from what the firm can keep doing without constant founder intervention.",
    ),
    57: (
        "Entrepreneurial orientation's effect on small-business performance depends on its configuration with access to capital and the dynamism of the environment.",
        "Strategic posture and finance interact. This is evidence for complementarity rather than substitution.",
    ),
    58: (
        "Meta-analysis: HR-enhancing practices are positively related to small-firm performance, with effects varying across contexts.",
        "Supports people-management practices within the operational and team dimensions.",
    ),
    59: (
        "Meta-analysis: business planning has a positive average relationship with performance, moderated by firm age, context and uncertainty.",
        "A written plan is not proof of strategic capability. The index asks how priorities and assumptions are used and revised.",
    ),
    60: (
        "Following Swedish new ventures over time, planning helped coordinate action and improve decisions, although planners may differ from non-planners in other ways.",
        "Supports planning as part of strategic clarity, with caution about cause and effect.",
    ),
    61: (
        "Reviews governance and strategic leadership in entrepreneurial firms; finds little systematic evidence yet, but good reasons to expect stronger effects in such firms.",
        "Governance research rarely studies owner-managed SMEs, a gap the index addresses with governance items proportionate to firm size.",
    ),
    62: (
        "In SMEs, ownership, boards and top-management composition influence the capacity for strategic change.",
        "Supports governance as an active capability that enables change, not a compliance label.",
    ),
    64: (
        "Growth-oriented SMEs become more responsive when they can acquire external knowledge and spread it internally, especially in turbulent environments.",
        "SME-level evidence that absorption routines can be observed and measured.",
    ),
    65: (
        "Develops and validates a scale measuring absorptive capacity through acquisition, assimilation, transformation and exploitation routines.",
        "A scale-development precedent for building and validating a multidimensional SME capability measure.",
    ),
    66: (
        "In 258 Swedish small firms, the relationship between entrepreneurial orientation and performance is an inverted U: more is not always better.",
        "Supports testing for non-linear effects and 'proportionate formality': past a point, more formality may add cost without benefit.",
    ),
    67: (
        "In manufacturing firms across 11 Sub-Saharan African countries, product innovation, internet connectivity and own transport were linked to high growth, with drivers differing across the growth distribution.",
        "Capability, infrastructure and innovation interact in Africa, and average-only models can miss high-growth dynamics.",
    ),
    68: (
        "Among 285 South African SMEs, entrepreneurial orientation was positively associated with sales and employment growth, with individual dimensions behaving differently.",
        "South African evidence for strategic posture. Because the design is cross-sectional self-report, it complements rather than replaces evidence on routines.",
    ),
    69: (
        "Financial literacy among owners of new South African microenterprises was weak in several areas, including planning, bookkeeping and knowledge of funding sources.",
        "Shows the practical relevance of finance knowledge in South Africa, and the need to separate knowledge from practice in the index.",
    ),
    70: (
        "Among Nigerian SME owner-managers, financial knowledge, awareness and attitude together shape how financial literacy translates into firm performance.",
        "African evidence that financial capability is attitudinal and behavioural, not just technical knowledge.",
    ),
    71: (
        "A four-wave panel of 646 small firms in Kampala: repeated severe disruptions lowered sales, while having a trusted person able to run the business in the owner's absence, plus backup inventory or power, aided recovery.",
        "Resilience depends on delegation and routines, not only founder skill. Informs the founder and team and operational-systems dimensions.",
    ),
}

# --------------------------------------------------------------------------- #
# Display-only corrections where the spreadsheet says "to verify" or mislabels.
# id -> {"geography": ..., "method": ...}
# --------------------------------------------------------------------------- #
CORRECTIONS: dict[int, dict[str, str]] = {
    13: {"geography": "Seven developing countries incl. Kenya, Ghana, Nigeria", "method": "Quantitative study"},
    16: {"geography": "Togo", "method": "Experiment (RCT / field)"},
    22: {"geography": "Dominican Republic"},
    23: {"geography": "Developing countries", "method": "Review / meta-analysis"},
    25: {"geography": "Nigeria"},
    29: {"method": "Experiment (RCT / field)"},
    32: {"geography": "54 countries", "method": "Quantitative study"},
    36: {"geography": "30 African countries"},
    47: {"geography": "Developing countries"},
    60: {"geography": "Sweden", "method": "Quantitative study"},
    66: {"geography": "Sweden"},
    67: {"geography": "11 Sub-Saharan African countries"},
    68: {"geography": "South Africa"},
    69: {"geography": "South Africa"},
    70: {"geography": "Nigeria", "method": "Quantitative study"},
    71: {"geography": "Uganda", "method": "Quantitative study"},
    26: {"geography": "South Africa"},
    17: {"geography": "Ghana"},
    18: {"geography": "Kenya"},
    19: {"geography": "Kenya"},
}

KENYA_IDS = {13, 18, 19}
SOUTH_AFRICA_IDS = {26, 68, 69}
OTHER_AFRICA_IDS = {16, 17, 20, 21, 28, 29, 30, 36, 37, 48, 49, 67, 70, 71}


def method_bucket(raw: str) -> str:
    raw = (raw or "").lower()
    if "pending" in raw or "verify" in raw:
        return "Method to verify"
    if "experiment" in raw:
        return "Experiment (RCT / field)"
    if "meta-analysis" in raw or "systematic review" in raw:
        return "Review / meta-analysis"
    if "scale development" in raw:
        return "Scale development"
    if "conceptual" in raw or "theoretical" in raw:
        return "Conceptual / theory"
    return "Quantitative study"


def clean_geography(raw: str) -> str:
    raw = (raw or "").strip()
    if not raw or "to verify" in raw.lower():
        return "Context to verify"
    if raw.startswith("General theory"):
        return "General theory"
    # Drop the generic "; Africa/multiple African countries" tag the sheet appends.
    parts = [p.strip() for p in raw.split(";") if "Africa/multiple" not in p]
    return "; ".join(parts) if parts else raw


def region(id_: int, geography: str) -> str:
    if id_ in KENYA_IDS:
        return "Kenya"
    if id_ in SOUTH_AFRICA_IDS:
        return "South Africa"
    if id_ in OTHER_AFRICA_IDS or "africa" in geography.lower():
        return "Other Africa"
    return "Global"


PREPRINT_MARKERS = ("working paper", "ssrn", "randomized controlled trials", "discussion series", "ebooks")


def is_preprint(journal: str) -> bool:
    j = (journal or "").lower()
    return any(m in j for m in PREPRINT_MARKERS)


def short_authors(raw: str) -> str:
    names = [n.strip() for n in (raw or "").split(";") if n.strip()]
    if not names:
        return "Unknown"

    particles = {"van", "von", "de", "den", "der", "da", "di", "du", "le", "la"}

    def surname(full: str) -> str:
        # Title-case shouted names from the metadata source (e.g. "THORSTEN BECK").
        full = full.title() if full.isupper() else full
        tokens = full.split()
        i = len(tokens) - 1
        # Keep name particles: "John Van Reenen" -> "Van Reenen", "Suresh de Mel" -> "de Mel".
        while i > 0 and tokens[i - 1].lower() in particles:
            i -= 1
        return " ".join(tokens[i:])

    if len(names) == 1:
        return surname(names[0])
    if len(names) == 2:
        return f"{surname(names[0])} & {surname(names[1])}"
    return f"{surname(names[0])} et al."


def main(xlsx: str) -> None:
    wb = openpyxl.load_workbook(xlsx, data_only=True)
    ws = wb["Literature Database"]
    rows = list(ws.iter_rows(values_only=True))
    header = [str(h).strip() if h else "" for h in rows[0]]
    col = {name: i for i, name in enumerate(header)}

    def get(r, name):
        v = r[col[name]]
        return "" if v is None else str(v).strip()

    records = []
    for r in rows[1:]:
        if not r or r[0] is None:
            continue
        id_ = int(r[0])
        fix = CORRECTIONS.get(id_, {})
        geography = fix.get("geography") or clean_geography(get(r, "Geography"))
        method = fix.get("method") or method_bucket(get(r, "Methodology"))
        finding, why = CURATED.get(
            id_, (get(r, "Major observations"), get(r, "Relevance to proposed study"))
        )
        status_raw = get(r, "Review status").lower()
        oa = get(r, "Open access").lower()
        cites = get(r, "Citation count (OpenAlex/Crossref)")
        authors_full = get(r, "Author(s)")
        records.append(
            {
                "id": f"lit-{id_}",
                "dbId": id_,
                "title": get(r, "Paper title"),
                "author": short_authors(authors_full),
                "authorsFull": "; ".join(
                    a.title() if a.isupper() else a
                    for a in (x.strip() for x in authors_full.split(";"))
                    if a
                ),
                "journal": get(r, "Journal / source"),
                "year": get(r, "Publication year"),
                "theme": get(r, "Theme"),
                "geography": geography,
                "region": region(id_, geography),
                "method": method,
                "summary": finding,
                "whyItMatters": why,
                "url": get(r, "DOI / stable URL") or None,
                "openAccess": oa == "yes",
                "reviewStatus": "Full text pending" if "pending" in status_raw else "Abstract reviewed",
                # Citation counts for working-paper, SSRN or trial-registry records
                # describe that version, not the published article, so hide them.
                "citations": (
                    int(float(cites))
                    if cites and not is_preprint(get(r, "Journal / source"))
                    else None
                ),
                "curated": id_ in CURATED,
                "createdAt": "2026-11-12",
            }
        )

    records.sort(key=lambda x: x["dbId"])
    body = json.dumps(records, indent=2, ensure_ascii=False)
    OUT.write_text(
        "// AUTO-GENERATED by scripts/import-literature.py from the Management\n"
        "// Capital literature database spreadsheet. Edit the script's CURATED /\n"
        "// CORRECTIONS tables (or the spreadsheet) and re-run, rather than editing here.\n"
        'import type { ResearchSource } from "../types";\n\n'
        f"export const LITERATURE: ResearchSource[] = {body};\n",
        encoding="utf-8",
    )
    missing = [x["dbId"] for x in records if not x["curated"]]
    print(f"Wrote {len(records)} records to {OUT}")
    if missing:
        print(f"Records without a curated summary (using spreadsheet text): {missing}")


if __name__ == "__main__":
    if len(sys.argv) != 2:
        sys.exit(__doc__)
    main(sys.argv[1])
