"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Send, Loader2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Label,
  Input,
  Textarea,
  Select,
  Checkbox,
  FieldError,
} from "@/components/ui/field";
import { useToast } from "@/components/ui/toast";
import { CONTRIBUTION_PROMPTS, ROLES, COUNTRIES } from "@/lib/data/prompts";

interface Errors {
  [key: string]: string | undefined;
}

export function ContributionForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const presetPrompt = searchParams.get("prompt");
  const initialPrompt =
    presetPrompt && CONTRIBUTION_PROMPTS.includes(presetPrompt)
      ? presetPrompt
      : CONTRIBUTION_PROMPTS[0];

  const [prompt, setPrompt] = React.useState(initialPrompt);
  const [content, setContent] = React.useState("");
  const [name, setName] = React.useState("");
  const [isAnonymous, setIsAnonymous] = React.useState(false);
  const [email, setEmail] = React.useState("");
  const [role, setRole] = React.useState("");
  const [country, setCountry] = React.useState("");
  const [sector, setSector] = React.useState("");
  const [organisation, setOrganisation] = React.useState("");
  const [consentToContact, setConsentToContact] = React.useState(false);
  const [consentToPublish, setConsentToPublish] = React.useState(false);
  const [errors, setErrors] = React.useState<Errors>({});
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (presetPrompt && CONTRIBUTION_PROMPTS.includes(presetPrompt)) {
      setPrompt(presetPrompt);
    }
  }, [presetPrompt]);

  function validate(): boolean {
    const next: Errors = {};
    if (!content.trim() || content.trim().length < 10)
      next.content = "Please share at least a sentence (10+ characters).";
    if (!isAnonymous && !name.trim())
      next.name = "Add your name, or tick “Contribute anonymously”.";
    if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (!role) next.role = "Please select your role.";
    if (!country) next.country = "Please select your country.";
    if (!consentToPublish)
      next.consentToPublish =
        "Consent to publish is required before submitting.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) {
      toast("Please fix the highlighted fields.", "error");
      return;
    }
    setSubmitting(true);
    try {
      const res = await fetch("/api/contributions", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          prompt,
          content,
          name,
          isAnonymous,
          email,
          role,
          country,
          sector,
          organisation,
          consentToContact,
          consentToPublish,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you?type=contribution");
    } catch {
      toast("Something went wrong. Please try again.", "error");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-6">
      <div className="flex items-start gap-3 rounded-xl border border-gold/30 bg-gold-50 p-4 text-sm text-navy-700">
        <Info className="mt-0.5 h-4 w-4 shrink-0 text-gold-600" />
        <p>
          Your contribution will be reviewed before appearing on the public
          research wall.
        </p>
      </div>

      <div>
        <Label htmlFor="prompt" required>
          Prompt
        </Label>
        <Select
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          className="mt-1.5"
        >
          {CONTRIBUTION_PROMPTS.map((p) => (
            <option key={p} value={p}>
              {p}
            </option>
          ))}
        </Select>
      </div>

      <div>
        <Label htmlFor="content" required>
          Your contribution
        </Label>
        <Textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="Share your insight for the research wall…"
          className="mt-1.5"
          maxLength={600}
          aria-invalid={!!errors.content}
        />
        <div className="mt-1 flex items-center justify-between">
          <FieldError>{errors.content}</FieldError>
          <span className="ml-auto text-xs text-navy-400">
            {content.length}/600
          </span>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="How should we credit you?"
            className="mt-1.5"
            disabled={isAnonymous}
            aria-invalid={!!errors.name}
          />
          <FieldError>{errors.name}</FieldError>
          <label className="mt-2 flex items-center gap-2 text-sm text-navy-600">
            <Checkbox
              checked={isAnonymous}
              onChange={(e) => setIsAnonymous(e.target.checked)}
            />
            Contribute anonymously
          </label>
        </div>
        <div>
          <Label htmlFor="email">Email (kept private)</Label>
          <Input
            id="email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="mt-1.5"
            aria-invalid={!!errors.email}
          />
          <FieldError>{errors.email}</FieldError>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="role" required>
            Role
          </Label>
          <Select
            id="role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1.5"
            aria-invalid={!!errors.role}
          >
            <option value="">Select your role…</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
          <FieldError>{errors.role}</FieldError>
        </div>
        <div>
          <Label htmlFor="country" required>
            Country
          </Label>
          <Select
            id="country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1.5"
            aria-invalid={!!errors.country}
          >
            <option value="">Select your country…</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
          <FieldError>{errors.country}</FieldError>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="sector">Sector</Label>
          <Input
            id="sector"
            value={sector}
            onChange={(e) => setSector(e.target.value)}
            placeholder="e.g. Agri-processing, Trade, Finance"
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="organisation">Organisation (optional)</Label>
          <Input
            id="organisation"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            placeholder="Your company or institution"
            className="mt-1.5"
          />
        </div>
      </div>

      <div className="space-y-3 rounded-xl border border-navy/10 bg-white p-4">
        <label className="flex items-start gap-3 text-sm text-navy-700">
          <Checkbox
            checked={consentToContact}
            onChange={(e) => setConsentToContact(e.target.checked)}
          />
          May we contact you for research follow-up?
        </label>
        <label className="flex items-start gap-3 text-sm text-navy-700">
          <Checkbox
            checked={consentToPublish}
            onChange={(e) => setConsentToPublish(e.target.checked)}
            aria-invalid={!!errors.consentToPublish}
          />
          <span>
            I consent to my contribution being published on the public research
            wall (my email is never shown).{" "}
            <span className="text-gold-600">*</span>
          </span>
        </label>
        <FieldError>{errors.consentToPublish}</FieldError>
      </div>

      <Button type="submit" size="lg" disabled={submitting} className="w-full sm:w-auto">
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Submitting…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Submit contribution
          </>
        )}
      </Button>
    </form>
  );
}
