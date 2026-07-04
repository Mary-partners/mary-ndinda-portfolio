"use client";

import { useState } from "react";
import { Check, Loader2 } from "lucide-react";
import { services } from "@/lib/site";
import { cn } from "@/lib/utils";

type Status = "idle" | "sending" | "sent";

export function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    company: "",
    service: services[0].name,
    message: "",
  });

  const update = (key: keyof typeof form, value: string) =>
    setForm((f) => ({ ...f, [key]: value }));

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    // No backend is wired yet. This confirms capture and hands off to email.
    window.setTimeout(() => {
      setStatus("sent");
      const subject = encodeURIComponent(
        `New enquiry: ${form.service} from ${form.name || "website"}`,
      );
      const body = encodeURIComponent(
        `Name: ${form.name}\nEmail: ${form.email}\nCompany: ${form.company}\nService: ${form.service}\n\n${form.message}`,
      );
      window.location.href = `mailto:info@mdawidallp.com?subject=${subject}&body=${body}`;
    }, 700);
  };

  if (status === "sent") {
    return (
      <div className="flex flex-col items-start gap-4 rounded-2xl border border-teal-200 bg-teal-50 p-8">
        <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-teal-600 text-white">
          <Check className="h-6 w-6" />
        </span>
        <h3 className="text-xl font-semibold text-ink-900">Thank you</h3>
        <p className="text-ink-600">
          Your details are ready to send. We open engagements with a short,
          no obligation conversation and will respond within two working days.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-ink-900 placeholder:text-ink-400 focus:border-teal-500 focus:outline-none focus:ring-2 focus:ring-teal-500/20";

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink-700">
            Full name
          </label>
          <input
            required
            value={form.name}
            onChange={(e) => update("name", e.target.value)}
            placeholder="Your name"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink-700">
            Email
          </label>
          <input
            required
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="you@company.com"
            className={inputClass}
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label className="mb-2 block text-sm font-medium text-ink-700">
            Company
          </label>
          <input
            value={form.company}
            onChange={(e) => update("company", e.target.value)}
            placeholder="Organisation"
            className={inputClass}
          />
        </div>
        <div>
          <label className="mb-2 block text-sm font-medium text-ink-700">
            How can we help?
          </label>
          <select
            value={form.service}
            onChange={(e) => update("service", e.target.value)}
            className={inputClass}
          >
            {services.map((s) => (
              <option key={s.slug}>{s.name}</option>
            ))}
            <option>General enquiry</option>
          </select>
        </div>
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-ink-700">
          Message
        </label>
        <textarea
          required
          rows={5}
          value={form.message}
          onChange={(e) => update("message", e.target.value)}
          placeholder="Tell us a little about your business and what you need."
          className={cn(inputClass, "resize-none")}
        />
      </div>

      <button
        type="submit"
        disabled={status === "sending"}
        className="inline-flex items-center justify-center gap-2 rounded-full bg-ink-900 px-7 py-3.5 text-sm font-semibold text-sand-50 shadow-soft transition-all hover:bg-ink-800 hover:shadow-lift disabled:opacity-70"
      >
        {status === "sending" ? (
          <>
            <Loader2 className="h-4 w-4 animate-spin" />
            Preparing
          </>
        ) : (
          "Send enquiry"
        )}
      </button>
    </form>
  );
}
