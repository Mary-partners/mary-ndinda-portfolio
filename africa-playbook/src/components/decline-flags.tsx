"use client";

import { useState } from "react";
import { EvidenceBadge } from "./evidence-badge";

type Gate = "hard" | "defer";

const FLAGS: { id: string; label: string; gate: Gate; area: string; response: string }[] = [
  { id: "ubo", label: "Beneficial ownership cannot be fully established", gate: "hard", area: "Integrity", response: "Stop. No investment proceeds without a complete beneficial-ownership picture and satisfactory AML/KYC and sanctions results." },
  { id: "related", label: "Undisclosed related-party lending found in the loan file", gate: "hard", area: "Integrity and governance", response: "Stop pending a full explanation. Non-disclosure is a judgement about management, not only about the exposure." },
  { id: "mandate", label: "Investment would breach a fund concentration limit", gate: "hard", area: "Mandate", response: "Do not proceed unless syndication or resizing brings it within limits before IC. A strong return does not justify a mandate breach." },
  { id: "licence", label: "Licence conditions or capital requirements not met", gate: "hard", area: "Regulatory", response: "Defer until the regulator's position is clear and the remedy is funded. Fund capital should not be used to paper over a regulatory gap without the regulator's knowledge." },
  { id: "collections", label: "Evidence of abusive collection practices", gate: "hard", area: "Customer protection", response: "Defer and require remediation, independently verified, before any commitment. The firm's purpose is better outcomes for customers." },
  { id: "pricing", label: "Effective pricing not disclosed to customers", gate: "hard", area: "Customer protection", response: "Defer until transparent pricing is in place and verified." },
  { id: "par", label: "PAR30 does not reconcile to the loan-level file", gate: "defer", area: "Data quality", response: "Defer IC until reconciled. If the gap reflects restructured loans reported as current, re-underwrite the credit case." },
  { id: "funding", label: "Over 40% of funding from one lender maturing within 12 months", gate: "defer", area: "Liquidity", response: "Make a credible refinancing plan a condition precedent, and stress-test liquidity without the renewal." },
  { id: "fx", label: "Large unhedged USD liabilities against an LCU loan book", gate: "defer", area: "Currency", response: "Restructure the instrument (local-currency or matched funding) or decline. Do not push the FX risk onto borrowers who cannot bear it." },
  { id: "mgmt", label: "Key-person dependence with no succession plan", gate: "defer", area: "Management", response: "Proceed only with a succession plan and governance rights agreed in the term sheet." },
];

export function DeclineFlags() {
  const [on, setOn] = useState<Record<string, boolean>>({ par: true, funding: true });
  const active = FLAGS.filter((f) => on[f.id]);
  const hard = active.filter((f) => f.gate === "hard");
  const defer = active.filter((f) => f.gate === "defer");

  return (
    <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)]">
      <fieldset>
        <legend className="flex flex-wrap items-center gap-3">
          <span className="font-serif text-xl text-ink">Illustrative diligence flags for Illustrative FSP A</span>
          <EvidenceBadge kind="illustrative" />
        </legend>
        <p className="mt-2 text-sm text-ink-3">Tick the findings to include. Two are preselected as an example.</p>
        <ul className="mt-4 space-y-2">
          {FLAGS.map((f) => (
            <li key={f.id}>
              <label className="flex cursor-pointer items-start gap-3 rounded-md border border-rule bg-white/60 p-3 hover:border-ink/40">
                <input type="checkbox" checked={!!on[f.id]} onChange={(e) => setOn((s) => ({ ...s, [f.id]: e.target.checked }))} className="mt-1 h-4 w-4 accent-[#0e2236]" />
                <span>
                  <span className="block text-[0.95rem] text-ink">{f.label}</span>
                  <span className="mt-0.5 block text-xs text-ink-3">
                    {f.area} · {f.gate === "hard" ? "Hard gate: cannot be outweighed by returns" : "Defer until resolved"}
                  </span>
                </span>
              </label>
            </li>
          ))}
        </ul>
      </fieldset>

      <div aria-live="polite">
        <h3 className="font-serif text-xl text-ink">What would make me defer or decline?</h3>
        <p className="mt-2 text-sm leading-relaxed text-ink-3">
          This is a narrative aid, not an investment recommendation. The decision belongs to the Investment Committee. Financial output from the case above cannot overrule an integrity, mandate, regulatory or customer-protection gate.
        </p>
        {active.length === 0 ? (
          <p className="mt-5 rounded-lg border border-rule bg-paper-2/60 p-4 text-ink-2">
            No flags selected. That would mean the case can proceed to the next gate on its merits. It would not be an approval: the remaining diligence, the IC&rsquo;s judgement and documentation still apply.
          </p>
        ) : (
          <div className="mt-5 space-y-5">
            {hard.length ? (
              <div className="rounded-lg border-l-4 border-risk bg-risk-2/60 p-4">
                <p className="font-medium text-ink">
                  <span aria-hidden="true">■ </span>Hard gate triggered ({hard.length}). I would not recommend proceeding whatever the modelled return.
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-ink-2">
                  {hard.map((f) => (
                    <li key={f.id}>
                      <span className="font-medium text-ink">{f.area}:</span> {f.response}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
            {defer.length ? (
              <div className="rounded-lg border-l-4 border-gold bg-gold-2/50 p-4">
                <p className="font-medium text-ink">
                  <span aria-hidden="true">◆ </span>Defer until resolved ({defer.length}). The case can be reconsidered when each item is closed with evidence.
                </p>
                <ul className="mt-3 space-y-2.5 text-sm text-ink-2">
                  {defer.map((f) => (
                    <li key={f.id}>
                      <span className="font-medium text-ink">{f.area}:</span> {f.response}
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        )}
      </div>
    </div>
  );
}
