import type { Workstream } from "../types";

export const ws08: Workstream = {
  number: "08",
  slug: "institutional-strengthening-ta",
  title: "Institutional strengthening, digitalisation and technical assistance",
  shortTitle: "Strengthening & TA",
  category: "portfolio",
  tagline:
    "Find the constraint that actually binds before prescribing training or technology, and judge support by sustained use and customer outcomes.",
  summary:
    "I would diagnose the operational constraint that limits each institution before recommending any training, system or advisory project. Improvements that are normal business would remain investee-financed. Support that may qualify for technical assistance would be shaped with the TA team, with real investee ownership and co-funding, and its terms verified rather than assumed. Each project would rest on a written causal hypothesis and a baseline. It would be judged by sustained operational use and customer outcomes, not by attendance or installation, and stop or redesign triggers would be agreed at the start.",
  outcome: {
    intended:
      "Capability support across the Africa portfolio is targeted at binding constraints, owned by investee management, coordinated with the TA team, measured against baselines and stopped or redesigned when it is not working.",
    why:
      "Training and technology are easy to buy and hard to make stick. Without a diagnosis, support goes to visible symptoms. Without ownership, systems are installed but bypassed. Without baselines, nobody can tell whether anything improved. Well-targeted capability work can raise asset quality, efficiency and customer experience together, and that is where investor support can add most value beyond capital.",
  },
  establishFirst: {
    data: [
      "The firm's TA framework, eligibility rules, co-funding expectations, procurement process and approval route, as published and as applied in practice. I would read these, not assume them.",
      "TA projects already under way or completed in the Africa portfolio, with their objectives, results and lessons.",
      "Each investee's operating data relevant to likely constraints: turnaround times, error and rework rates, staff productivity, portfolio quality by branch or product, system uptime and complaint data.",
      "Findings from diligence, auditors, regulators and value-creation plans (Workstream 07) that point to capability gaps.",
    ],
    conversations: [
      "TA team: priorities, capacity, typical project design and what has worked or failed before.",
      "Investee CEOs and COOs: what they believe holds the institution back, and what they would fund themselves.",
      "Front-line and middle managers at investees, where appropriate: where processes actually break down.",
      "Impact/ESG: customer-outcome evidence and safeguarding requirements.",
    ],
    constraints: [
      "TA approval, budget and procurement sit with the TA function and its governance. I would contribute and recommend, not approve.",
      "Eligibility, co-funding and terms must be confirmed for each project.",
      "Investee management must lead and own projects. Investor-designed projects without ownership tend not to last.",
    ],
  },
  method: [
    {
      title: "Diagnose the binding constraint",
      detail:
        "I would ask what most limits the institution's ability to grow responsibly or serve customers well. That might be credit decision quality, process speed, data reliability, governance capacity, cybersecurity, product economics or risk management. I would look for evidence, such as where loans stall, where errors arise and which branches outperform and why. Often the constraint is a process or incentive, not missing technology.",
    },
    {
      title: "Separate business-as-usual from potentially eligible TA",
      detail:
        "Routine improvements an institution should fund itself, such as ordinary staff training, standard licences and normal maintenance, would remain investee-financed. Support that may qualify for TA is usually catalytic, time-bound, linked to institutional change or customer outcomes, and co-owned. I would make that distinction explicitly with the TA team, so TA funds are not used to subsidise normal operations.",
    },
    {
      title: "Write a causal hypothesis and baseline",
      detail:
        "Every proposed intervention starts with a written chain: this change will alter this process, which will move this operational measure, which should improve this outcome for the institution and its customers. The baseline is measured before work starts. If we cannot measure the baseline, the first step is to measure it.",
    },
    {
      title: "Co-design with the investee and TA team",
      detail:
        "The concept note (template below) is drafted with management and the TA team. It sets out ownership, co-funding, procurement, budget, milestones, safeguards, adoption plans and outcome measures. The investee names an accountable executive.",
    },
    {
      title: "Track adoption, not just delivery",
      detail:
        "Installation and attendance are outputs. The test is whether staff use the new process after go-live, whether operating measures improve, and whether customers are better served. I would ask for adoption data monthly in the first six months.",
    },
    {
      title: "Stop or redesign on agreed triggers",
      detail:
        "Triggers agreed at the start, such as low adoption after a set period, no movement in the operating measure, cost overrun or a safeguarding concern, lead to a structured review with the TA team and management. Stopping a project that is not working is a sign of discipline, not failure.",
    },
  ],
  deliverables: [
    { name: "Constraint diagnostic per investee", description: "Short note identifying the binding constraint with evidence, linked to the value-creation plan." },
    { name: "TA concept notes", description: "Co-designed with management and the TA team. Template and worked example below." },
    { name: "Adoption and outcome tracker", description: "Monthly view of adoption, operating measures and customer indicators for active projects." },
    { name: "Annual lessons review", description: "What worked, what did not and why, shared with the TA team and firm-wide." },
  ],
  templates: [
    {
      kind: "table",
      caption: "TA concept note: loan-origination workflow at Illustrative FSP A (fictional)",
      evidence: "illustrative",
      columns: ["Section", "Content"],
      rows: [
        ["Problem", "Median time from complete application to disbursement is 6 working days for MSME loans. 12% of files need rework because of missing or inconsistent data. Loan officers spend about 40% of their time on paperwork. Customers report delays as the top complaint category."],
        ["Baseline (measured over 3 months)", "Median turnaround 6 days; rework rate 12%; delay-related complaints 31% of all complaints; affordability assessment fully documented in 78% of sampled files."],
        ["Causal hypothesis", "A structured digital application with mandatory fields, automated checks and a defined approval queue will reduce rework and waiting time. That frees officer time for customer assessment and follow-up, improving decision quality and customer experience without loosening credit standards."],
        ["Beneficiaries", "Loan officers and credit staff (process); MSME and individual borrowers (faster, clearer decisions); the institution (efficiency, asset quality)."],
        ["Investee ownership and co-funding", "COO is accountable executive. Investee funds software licences, hardware and staff time. Design, process redesign and change-management support proposed for TA, subject to eligibility."],
        ["Procurement", "Vendor selection by the investee under its procurement policy, with TA team review of process; at least three quotes; conflicts declared."],
        ["Budget (illustrative)", "Total USD 120k: investee USD 48k (40%: licences, hardware, staff time); proposed TA USD 72k (60%: process design, change management, training of trainers). Subject to TA approval."],
        ["Milestones", "M1 process map and design (month 2); M2 pilot in 3 branches (month 4); M3 pilot review against triggers (month 5); M4 roll-out (month 8); M5 six-month post-roll-out review (month 14)."],
        ["Safeguards", "Credit policy unchanged by the project; affordability assessment remains mandatory; customer data protection reviewed before go-live; no automated decline without human review."],
        ["Adoption plan", "Branch champions; weekly usage report; paper route closed in pilot branches after 6 weeks; manager KPIs include system use."],
        ["Outcome measures", "Median turnaround; rework rate; share of applications through the new workflow; affordability documentation rate; delay-related complaints; PAR30 for cohorts originated through the new workflow vs prior cohorts."],
        ["Sustainability", "Investee budgets ongoing licence and support costs from year 2; internal trainers in place; process owner named."],
      ],
    },
    {
      kind: "table",
      caption: "Outcome targets for the example (illustrative, baseline-dependent)",
      evidence: "illustrative",
      columns: ["Measure", "Baseline", "Pilot review target (month 5)", "Post-roll-out target (month 14)", "Type"],
      rows: [
        ["Median turnaround (working days)", "6", "4", "3", "Operational outcome"],
        ["Rework rate", "12%", "8%", "5%", "Operational outcome"],
        ["Applications through new workflow", "0%", "70% in pilot branches", "85% institution-wide", "Adoption"],
        ["Affordability assessment fully documented", "78%", "90%", "95%", "Responsible finance"],
        ["Delay-related complaints (share of total)", "31%", "25%", "15%", "Customer experience"],
        ["Staff trained", "0", "All pilot staff", "All credit staff", "Output only"],
      ],
      note: "Targets are fictional and would be set from measured baselines. Training numbers are an output and not evidence of success on their own.",
    },
  ],
  ownership: {
    lead: [
      "Constraint diagnosis for Africa investees, as part of portfolio management.",
      "Ensuring capability priorities link to value-creation plans and investment theses.",
      "Monitoring adoption and outcomes as part of portfolio review.",
    ],
    delegate: [
      "Baseline data gathering and adoption tracking to investment professionals.",
      "Project management to the investee's accountable executive, supported by the TA team.",
    ],
    recommend: [
      "TA concept notes to the TA function for its approval process.",
      "Stop, redesign or scale decisions to the TA team, with the evidence.",
    ],
    escalate: [
      "Safeguarding, data-protection or procurement integrity concerns, to the TA team, legal and impact/ESG.",
      "Projects that are failing against triggers without management response, to the TA lead and CIO.",
    ],
    dependencies: [
      { party: "TA team", need: "Eligibility, approval, budget, procurement oversight and expertise." },
      { party: "Investee management", need: "Ownership, co-funding, staff time and data." },
      { party: "Impact/ESG", need: "Customer-outcome measures and safeguards." },
      { party: "Legal / data protection", need: "Vendor contracts and customer-data compliance." },
    ],
  },
  gates: [
    {
      gate: "Concept note goes to the TA function",
      proceedIf: "The constraint is evidenced, the baseline is measured, management owns the project and co-funding is agreed.",
      deferOrDeclineIf: "The need is business-as-usual; management is lukewarm; the baseline cannot be measured; or the project substitutes for missing leadership.",
    },
    {
      gate: "Pilot moves to roll-out",
      proceedIf: "Pilot adoption and operating measures reach the agreed review thresholds without safeguarding issues.",
      deferOrDeclineIf: "Adoption is low, the process is bypassed, or quality measures worsen. Redesign before scaling.",
    },
    {
      gate: "Project closed as successful",
      proceedIf: "Outcomes are sustained six months after roll-out and the investee is funding ongoing costs.",
      deferOrDeclineIf: "Gains fade after support ends; the review then asks why before any further TA.",
    },
  ],
  cadence: [
    "Monthly: adoption and outcome tracker for active projects, reviewed with the investee and TA team.",
    "Quarterly: capability progress within portfolio review (Workstream 07).",
    "Annually: lessons review with the TA team.",
  ],
  kpis: [
    {
      name: "Sustained adoption",
      definition: "Share of relevant transactions processed through the new process or system, six months after roll-out.",
      source: "Investee system data",
      owner: "Investee accountable executive; reviewed by investment professional",
      frequency: "Monthly",
      threshold: "Proposed: redesign review if below 60% at month 3 of pilot",
    },
    {
      name: "Operating measure movement",
      definition: "Change in the project's primary operating measure against its measured baseline.",
      source: "Investee data, validated by the team",
      owner: "Investee",
      frequency: "Monthly during project; quarterly after",
      threshold: "Proposed: no measurable movement by pilot review triggers redesign",
    },
    {
      name: "Customer outcome indicator",
      definition: "Project-specific customer measure, e.g. delay-related complaints or affordability documentation.",
      source: "Complaints log; file sampling",
      owner: "Investee with impact/ESG review",
      frequency: "Quarterly",
      threshold: "Proposed: any deterioration pauses roll-out",
    },
    {
      name: "Co-funding delivered",
      definition: "Investee contribution paid or provided ÷ committed contribution.",
      source: "Project accounts",
      owner: "TA team",
      frequency: "Quarterly",
      threshold: "Proposed: below 80% triggers review of ownership",
    },
  ],
  risks: [
    {
      risk: "Technology is installed but staff keep using the old process.",
      tradeoff: "Speed of roll-out versus change management.",
      mitigation: "Pilot first, close parallel routes, link manager KPIs to use, track adoption monthly.",
    },
    {
      risk: "Efficiency gains come at the expense of credit quality or customer fairness.",
      tradeoff: "Faster decisions versus careful assessment.",
      mitigation: "Credit policy unchanged by design; affordability documentation and cohort PAR tracked as guardrails.",
    },
    {
      risk: "TA becomes a subsidy for routine operations.",
      tradeoff: "Supporting investees versus catalytic use of TA.",
      mitigation: "Explicit BAU vs TA test; co-funding; sustainability plan from the start.",
    },
    {
      risk: "Attribution is overstated.",
      tradeoff: "Simple stories versus honest evidence.",
      mitigation: "Report contribution against baseline with other factors noted; avoid claiming causal impact without a design that supports it.",
    },
  ],
  timeline: {
    first90:
      "TA framework and current projects reviewed with the TA team; constraint diagnostic drafted for each investee as part of the portfolio diagnostic; one or two priority concept notes in preparation where evidence supports them.",
    months4to12:
      "Priority projects approved and piloted; adoption tracked monthly; at least one pilot review against triggers; first annual lessons review; capability priorities refreshed in value-creation plans.",
  },
  success: {
    looksLike:
      "Each capability project can show a measured baseline, sustained use and a movement in operating and customer measures. Investees fund ongoing costs. The TA team regards the Africa portfolio as a disciplined user of TA resources.",
    assumptions: [
      "TA eligibility, co-funding and procurement rules are as understood from public material; to be verified.",
      "Investees can produce baseline operating data, or can be helped to.",
      "The TA team has capacity for Africa priorities alongside other regions.",
    ],
  },
  extras: [
    {
      id: "binding-constraint",
      title: "Diagnosing the binding constraint",
      after: "before-acting",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "Symptoms, possible constraints and the evidence that distinguishes them",
          evidence: "proposed",
          columns: ["Symptom", "Possible constraints", "Evidence I would look for", "Often not the answer"],
          rows: [
            ["Slow loan growth", "Funding, process speed, credit appetite, staff capacity", "Pipeline drop-off stages, turnaround times, funding headroom", "More sales training"],
            ["Rising arrears", "Underwriting quality, collections process, product design, incentives", "Vintage curves by product and branch, officer incentives", "A new core banking system"],
            ["Data inconsistencies", "Process design, system configuration, controls", "Reconciliation breaks, manual workarounds", "More reporting templates"],
            ["High complaints", "Disclosure, process delays, collections conduct", "Complaint categories, resolution times, file sampling", "Customer-care training alone"],
            ["Cyber incidents or near-misses", "Access control, patching, vendor management", "Security assessment findings, incident logs", "Awareness sessions only"],
          ],
        },
      ],
    },
    {
      id: "worked-example",
      title: "Worked example: loan-origination workflow",
      after: "deliverables",
      evidence: "illustrative",
      blocks: [
        {
          kind: "p",
          text: "Illustrative FSP A is a fictional deposit-taking lender serving micro and small enterprises. During the portfolio diagnostic, its management said growth was limited by a shortage of loan officers. The data suggested something different. Officers were spending about 40% of their time on paperwork, 12% of files needed rework, and the median time from complete application to disbursement was six working days. Delays were the largest complaint category. The binding constraint was the origination process, not headcount.",
        },
        {
          kind: "p",
          text: "I would agree with the COO and the TA team to test a structured digital workflow, with mandatory fields, automated document checks and a visible approval queue. Credit policy would stay unchanged. The investee would fund licences, hardware and staff time. Process design and change management would be proposed for TA, subject to eligibility. A three-branch pilot would run for three months before any roll-out decision.",
        },
        {
          kind: "p",
          text: "At pilot review, the question would be whether staff were using the workflow and whether turnaround, rework and documentation improved without credit quality slipping. If 70% of pilot-branch applications used the workflow, turnaround fell to four days and affordability documentation rose, the case for roll-out would be strong. If officers were keeping paper files alongside the system, or complaints shifted from delays to unclear decisions, I would recommend redesign before scale.",
        },
        {
          kind: "p",
          text: "Six months after roll-out, success would mean sustained use, a three-day median turnaround, lower rework, fewer delay complaints, and PAR30 for new cohorts at or below prior cohorts. Training attendance and system installation would be reported as outputs only.",
        },
      ],
    },
    {
      id: "stop-redesign",
      title: "Outputs, outcomes and stop/redesign triggers",
      after: "gates",
      evidence: "proposed",
      blocks: [
        {
          kind: "table",
          caption: "What counts as evidence of success",
          evidence: "proposed",
          columns: ["Level", "Examples", "Is it success?"],
          rows: [
            ["Input", "Budget spent, consultant days", "No"],
            ["Output", "Staff trained, system installed, policy written", "No, necessary but not sufficient"],
            ["Adoption", "Share of work through the new process, months after go-live", "Partly; shows the change took hold"],
            ["Operational outcome", "Turnaround, error rate, portfolio quality, cost per loan", "Yes, against baseline"],
            ["Customer outcome", "Complaints, clarity of terms, fair treatment, appropriate credit", "Yes, the ultimate test"],
          ],
        },
        {
          kind: "list",
          items: [
            "Adoption below the agreed threshold at pilot review: pause and redesign.",
            "No movement in the primary operating measure at pilot review: review the causal hypothesis.",
            "Any deterioration in credit quality or customer measures: pause roll-out and investigate.",
            "Co-funding not delivered or accountable executive departs without replacement: review ownership before continuing.",
            "Cost overrun above 15% of budget: TA team review before further spend.",
            "Safeguarding or data-protection concern: stop until resolved.",
          ],
        },
      ],
    },
  ],
  keywords: ["technical assistance", "TA", "capacity building", "digitalisation", "MIS", "core banking", "cybersecurity", "process improvement", "adoption", "co-funding"],
};
