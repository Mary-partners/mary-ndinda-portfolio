import type { Metadata } from "next";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { site } from "@/lib/site";
import { PageHero } from "@/components/PageHero";
import { Reveal } from "@/components/Reveal";
import { ContactForm } from "@/components/ContactForm";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Talk to Mdawida LLP about audit, tax, and advisory support for your business in East Africa.",
};

const details = [
  {
    icon: MapPin,
    label: "Office",
    value: `${site.city}`,
    note: `Serving ${site.region}`,
  },
  {
    icon: Mail,
    label: "Email",
    value: site.email,
    href: `mailto:${site.email}`,
  },
  {
    icon: Phone,
    label: "Phone",
    value: site.phone,
    href: `tel:${site.phone.replace(/\s+/g, "")}`,
  },
  {
    icon: Clock,
    label: "Response time",
    value: "Within two working days",
    note: "We reply to every serious enquiry",
  },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Let us start with a conversation."
        lead="Tell us where your business is and what you are trying to do. We will suggest the right first step, with no obligation and no charge for the initial discussion."
      />

      <section className="container-page py-24">
        <div className="grid gap-14 lg:grid-cols-[1fr_1.1fr]">
          <div>
            <Reveal>
              <h2 className="font-serif text-2xl font-semibold text-ink-900">
                Reach the firm
              </h2>
              <p className="mt-4 text-ink-500">
                Whether you need a statutory audit, help with the Kenya Revenue
                Authority, or a finance partner to help you raise, the door is
                open.
              </p>
            </Reveal>

            <div className="mt-10 space-y-5">
              {details.map((d, i) => {
                const Icon = d.icon;
                return (
                  <Reveal
                    key={d.label}
                    delay={i * 70}
                    className="flex items-start gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft"
                  >
                    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-ink-950 text-gold-400">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-widest2 text-ink-400">
                        {d.label}
                      </p>
                      {d.href ? (
                        <a
                          href={d.href}
                          className="mt-1 block font-medium text-ink-900 transition-colors hover:text-teal-700"
                        >
                          {d.value}
                        </a>
                      ) : (
                        <p className="mt-1 font-medium text-ink-900">
                          {d.value}
                        </p>
                      )}
                      {d.note && (
                        <p className="mt-0.5 text-sm text-ink-500">{d.note}</p>
                      )}
                    </div>
                  </Reveal>
                );
              })}
            </div>
          </div>

          <Reveal
            delay={120}
            className="rounded-3xl border border-ink-100 bg-white p-8 shadow-soft sm:p-10"
          >
            <h2 className="font-serif text-2xl font-semibold text-ink-900">
              Send us a note
            </h2>
            <p className="mt-2 text-sm text-ink-500">
              Fields marked as required help us route your enquiry to the right
              partner.
            </p>
            <div className="mt-8">
              <ContactForm />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
