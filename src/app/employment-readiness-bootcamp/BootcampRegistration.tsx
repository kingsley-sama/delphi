"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { Reveal } from "@/components/ui/Motion";
import { inputClassBox, SelectField } from "@/components/ui/FormFields";
import { submitContact } from "@/lib/supabase";
import { cn } from "@/lib/cn";

const countryCodes = ["+234", "+1", "+44", "+91", "+62"];

const plans = ["₦12,000 — per month", "₦30,000 — 3 months", "Not sure yet"];

const categories = [
  "Final-year student",
  "Fresh graduate",
  "NYSC corps member",
  "Young career seeker",
  "Other",
];

/** Label above the control, so the prompt survives once a field is filled. */
function Field({
  label,
  htmlFor,
  required,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-sm font-medium text-ink">
        {label}
        {required && <span aria-hidden>*</span>}
      </label>
      {children}
    </div>
  );
}

export function BootcampRegistration() {
  const [sent, setSent] = useState(false);
  const [accepted, setAccepted] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSent(true);

    // `contact_submissions` has a fixed set of columns, so the bootcamp-only
    // answers ride along inside `message` rather than requiring a migration.
    const notes = [
      `Category: ${data.category || "—"}`,
      `Referral code: ${data.referral || "—"}`,
      data.message ? `Notes: ${data.message}` : null,
    ]
      .filter(Boolean)
      .join("\n");

    // Non-blocking: the user already sees the success state, so a transient
    // failure shouldn't surface as an error here.
    submitContact({
      source: "bootcamp",
      first_name: (data.first_name as string) || null,
      last_name: (data.last_name as string) || null,
      email: data.email as string,
      country_code: (data.country_code as string) || null,
      phone: (data.phone as string) || null,
      program: (data.plan as string) || null,
      message: notes,
    }).catch(() => {
      /* non-blocking */
    });

    const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "bootcamp",
            submitted_at: new Date().toISOString(),
            ...data,
          }),
        });
      } catch {
        /* non-blocking */
      }
    }
  };

  return (
    <section id="register" className="scroll-mt-24 bg-primary-50 py-14 sm:py-20">
      <Container>
        <Reveal>
          <SectionHeading
            badge="Registration"
            title="Register For The Bootcamp"
            subtitle="Tell us a little about yourself and we'll get you set up with the next cohort."
          />
        </Reveal>

        <Reveal className="mt-8 sm:mt-12" delay={0.08}>
          {sent ? (
            <div className="mx-auto flex max-w-[560px] flex-col items-center rounded-[20px] border border-neutral-200 bg-white px-6 py-10 text-center">
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-accent">
                <Check className="h-7 w-7" strokeWidth={3} />
              </span>
              <h3 className="mt-5 text-2xl font-bold text-ink">Registration received!</h3>
              <p className="mt-2 max-w-sm text-[15px] text-ink-secondary">
                Thanks for signing up. Our team will contact you shortly with payment
                details and your cohort start date.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setAccepted(false);
                }}
                className="mt-6 rounded-lg bg-brand px-7 py-3 text-base font-medium text-white"
              >
                Register someone else
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="rounded-[20px] border border-neutral-200 bg-white p-6 sm:p-8"
            >
              <div className="grid gap-x-5 gap-y-5 sm:grid-cols-2 lg:grid-cols-3">
                <Field label="First name" htmlFor="first_name" required>
                  <input
                    id="first_name"
                    name="first_name"
                    required
                    className={inputClassBox}
                  />
                </Field>
                <Field label="Last name" htmlFor="last_name" required>
                  <input
                    id="last_name"
                    name="last_name"
                    required
                    className={inputClassBox}
                  />
                </Field>

                <Field
                  label="Email"
                  htmlFor="email"
                  required
                >
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    className={inputClassBox}
                  />
                </Field>

                <Field
                  label="WhatsApp number"
                  htmlFor="phone"
                  required
                >
                  <div className="flex gap-2">
                    <SelectField
                      name="country_code"
                      defaultValue="+234"
                      options={countryCodes}
                      inputClassName={inputClassBox}
                      className="w-[104px]"
                    />
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      className={cn(inputClassBox, "flex-1")}
                    />
                  </div>
                </Field>

                <Field label="Which describes you?" htmlFor="category" required>
                  <SelectField
                    name="category"
                    placeholder="Select one"
                    options={categories}
                    inputClassName={inputClassBox}
                    required
                  />
                </Field>
                <Field label="Preferred payment plan" htmlFor="plan" required>
                  <SelectField
                    name="plan"
                    placeholder="Select one"
                    options={plans}
                    inputClassName={inputClassBox}
                    required
                  />
                </Field>

                <Field label="Referral code" htmlFor="referral">
                  <input
                    id="referral"
                    name="referral"
                    placeholder="Optional"
                    className={inputClassBox}
                  />
                </Field>
              </div>

              <p className="mt-6 text-sm leading-relaxed text-ink-secondary">
                We want you to know exactly how the bootcamp works and why we need your
                details. Please confirm that you have read, understood and accept the{" "}
                <span className="font-semibold text-ink">terms and conditions</span>.
              </p>

              <label className="mt-4 flex cursor-pointer items-start gap-3">
                <input
                  type="checkbox"
                  name="terms"
                  required
                  checked={accepted}
                  onChange={(e) => setAccepted(e.target.checked)}
                  className="mt-0.5 h-5 w-5 shrink-0 rounded border-neutral-300 accent-brand"
                />
                <span className="text-sm text-ink-secondary">
                  I have read, understood and accept the{" "}
                  <span className="font-semibold text-ink">terms and conditions</span>.
                </span>
              </label>

              <button
                type="submit"
                disabled={!accepted}
                className={cn(
                  "mt-6 h-[52px] w-full rounded-lg text-base font-medium transition-colors sm:w-auto sm:px-10",
                  accepted
                    ? "bg-brand text-white"
                    : "cursor-not-allowed bg-neutral-200 text-ink-secondary/60",
                )}
              >
                Register
              </button>
            </form>
          )}
        </Reveal>
      </Container>
    </section>
  );
}
