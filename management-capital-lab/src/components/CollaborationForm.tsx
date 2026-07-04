"use client";

import * as React from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Send, Loader2 } from "lucide-react";
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
import { ROLES, COUNTRIES, COLLABORATION_TYPES } from "@/lib/data/prompts";

export function CollaborationForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { toast } = useToast();

  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [organisation, setOrganisation] = React.useState("");
  const [role, setRole] = React.useState("");
  const [country, setCountry] = React.useState("");
  const typeParam = searchParams.get("type");
  const [collaborationType, setCollaborationType] = React.useState(
    typeParam ?? ""
  );

  React.useEffect(() => {
    if (typeParam) setCollaborationType(typeParam);
  }, [typeParam]);
  const [message, setMessage] = React.useState("");
  const [consentToContact, setConsentToContact] = React.useState(false);
  const [errors, setErrors] = React.useState<Record<string, string | undefined>>(
    {}
  );
  const [submitting, setSubmitting] = React.useState(false);

  function validate(): boolean {
    const next: Record<string, string | undefined> = {};
    if (!name.trim()) next.name = "Please add your name.";
    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Enter a valid email address.";
    if (!collaborationType) next.collaborationType = "Select a collaboration type.";
    if (!message.trim() || message.trim().length < 10)
      next.message = "Tell us a little about how you'd like to collaborate.";
    if (!consentToContact)
      next.consentToContact = "Please consent to being contacted.";
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
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          organisation,
          role,
          country,
          collaborationType,
          message,
          consentToContact,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      router.push("/thank-you?type=collaboration");
    } catch {
      toast("Something went wrong. Please try again.", "error");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-name" required>
            Name
          </Label>
          <Input
            id="c-name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1.5"
            aria-invalid={!!errors.name}
          />
          <FieldError>{errors.name}</FieldError>
        </div>
        <div>
          <Label htmlFor="c-email" required>
            Email
          </Label>
          <Input
            id="c-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1.5"
            aria-invalid={!!errors.email}
          />
          <FieldError>{errors.email}</FieldError>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-org">Organisation</Label>
          <Input
            id="c-org"
            value={organisation}
            onChange={(e) => setOrganisation(e.target.value)}
            className="mt-1.5"
          />
        </div>
        <div>
          <Label htmlFor="c-role">Role</Label>
          <Select
            id="c-role"
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="mt-1.5"
          >
            <option value="">Select your role…</option>
            {ROLES.map((r) => (
              <option key={r} value={r}>
                {r}
              </option>
            ))}
          </Select>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <Label htmlFor="c-country">Country</Label>
          <Select
            id="c-country"
            value={country}
            onChange={(e) => setCountry(e.target.value)}
            className="mt-1.5"
          >
            <option value="">Select your country…</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </Select>
        </div>
        <div>
          <Label htmlFor="c-type" required>
            Collaboration type
          </Label>
          <Select
            id="c-type"
            value={collaborationType}
            onChange={(e) => setCollaborationType(e.target.value)}
            className="mt-1.5"
            aria-invalid={!!errors.collaborationType}
          >
            <option value="">Select a pathway…</option>
            {COLLABORATION_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Select>
          <FieldError>{errors.collaborationType}</FieldError>
        </div>
      </div>

      <div>
        <Label htmlFor="c-message" required>
          Message
        </Label>
        <Textarea
          id="c-message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="How would you like to contribute to or partner on this research?"
          className="mt-1.5"
          aria-invalid={!!errors.message}
        />
        <FieldError>{errors.message}</FieldError>
      </div>

      <label className="flex items-start gap-3 rounded-xl border border-navy/10 bg-white p-4 text-sm text-navy-700">
        <Checkbox
          checked={consentToContact}
          onChange={(e) => setConsentToContact(e.target.checked)}
          aria-invalid={!!errors.consentToContact}
        />
        <span>
          I consent to being contacted about this research collaboration.{" "}
          <span className="text-gold-600">*</span>
        </span>
      </label>
      <FieldError>{errors.consentToContact}</FieldError>

      <Button type="submit" size="lg" disabled={submitting}>
        {submitting ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" /> Sending…
          </>
        ) : (
          <>
            <Send className="h-4 w-4" /> Express interest
          </>
        )}
      </Button>
    </form>
  );
}
