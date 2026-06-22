"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import { submitContact } from "@/lib/supabase";

const programs = [
  "Delphi Prep",
  "Delphi Academics",
  "Delphi UpSkill",
  "Delphi Career",
  "Not sure yet",
];

export function ContactForm() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSubmitting(true);
    setError(null);
    try {
      await submitContact({
        source: "contact-form",
        name: (data.name as string) || null,
        email: data.email as string,
        phone: (data.phone as string) || null,
        program: (data.program as string) || null,
        message: (data.message as string) || null,
      });
      setSent(true);
    } catch {
      setError("Something went wrong. Please try again or email us directly.");
    } finally {
      setSubmitting(false);
    }
  };

  if (sent) {
    return (
      <div className="flex flex-col items-center justify-center rounded-3xl border border-primary-200 bg-primary-50 p-10 text-center">
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
          <Check className="h-7 w-7" />
        </span>
        <h3 className="mt-5 text-2xl font-semibold text-ink">Message sent!</h3>
        <p className="mt-2 max-w-sm text-base text-ink-secondary">
          Thanks for reaching out. Our team will get back to you within one
          business day to schedule your free call.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="rounded-3xl border border-neutral-200 bg-white p-6 sm:p-8"
    >
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" placeholder="Jane Doe" required />
        <Field label="Email" name="email" type="email" placeholder="jane@email.com" required />
        <Field label="Phone" name="phone" placeholder="+234 ..." />
        <div className="flex flex-col gap-2">
          <label htmlFor="program" className="text-sm font-medium text-ink">
            Program of interest
          </label>
          <select
            id="program"
            name="program"
            className="rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-base text-ink outline-none focus:border-brand"
          >
            {programs.map((p) => (
              <option key={p}>{p}</option>
            ))}
          </select>
        </div>
      </div>
      <div className="mt-5 flex flex-col gap-2">
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          placeholder="Tell us about your learning goals..."
          className="rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-base text-ink outline-none focus:border-brand"
        />
      </div>
      {error && (
        <p className="mt-4 text-sm text-red-600" role="alert">
          {error}
        </p>
      )}
      <button
        type="submit"
        disabled={submitting}
        className="mt-6 w-full rounded-full bg-brand px-6 py-3.5 text-base font-medium text-white transition-colors hover:bg-hover disabled:cursor-not-allowed disabled:opacity-60"
      >
        {submitting ? "Sending..." : "Send message"}
      </button>
    </form>
  );
}

function Field({
  label,
  name,
  type = "text",
  placeholder,
  required,
}: {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={name} className="text-sm font-medium text-ink">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        required={required}
        className="rounded-xl border border-neutral-200 bg-neutral-100 px-4 py-3 text-base text-ink outline-none focus:border-brand"
      />
    </div>
  );
}
