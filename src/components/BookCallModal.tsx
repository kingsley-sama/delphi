"use client";

import { useEffect, useRef, useState } from "react";
import { Check, ChevronDown, Mail, X } from "lucide-react";
import { cn } from "@/lib/cn";

const BOOK_CALL_EVENT = "open-book-call";

/** Open the "Book a Free Call" form from anywhere on the client. */
export function openBookCall() {
  window.dispatchEvent(new Event(BOOK_CALL_EVENT));
}

const countryCodes = ["+234", "+1", "+44", "+91", "+62"];
const programs = [
  "Delphi Prep",
  "Delphi Academics",
  "Delphi UpSkill",
  "Delphi Career",
  "Not sure yet",
];
const callModes = ["Google Meet", "WhatsApp", "Phone"];

const inputClass =
  "h-[46px] w-full rounded-full border border-neutral-200 bg-transparent px-4 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-secondary/60 focus:border-brand focus:ring-1 focus:ring-brand/30";

function SelectField({
  name,
  defaultValue,
  placeholder,
  options,
  required,
  className,
}: {
  name: string;
  defaultValue?: string;
  placeholder?: string;
  options: string[];
  required?: boolean;
  className?: string;
}) {
  return (
    <div className={cn("relative", className)}>
      <select
        name={name}
        required={required}
        defaultValue={defaultValue ?? ""}
        className={cn(inputClass, "appearance-none pr-10", !defaultValue && "text-ink-secondary/60")}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((o) => (
          <option key={o} value={o} className="text-ink">
            {o}
          </option>
        ))}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink-secondary" />
    </div>
  );
}

export function BookCallModal() {
  const [shouldRender, setShouldRender] = useState(false);
  const [visible, setVisible] = useState(false);
  const [sent, setSent] = useState(false);
  const [count, setCount] = useState(0);
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const close = () => {
    setVisible(false);
    closeTimer.current = setTimeout(() => setShouldRender(false), 500);
  };

  useEffect(() => {
    const onOpen = () => {
      if (closeTimer.current) clearTimeout(closeTimer.current);
      setSent(false);
      setCount(0);
      setShouldRender(true);
      // Mount first, then flip to the visible state on the next frame so the
      // CSS transition animates in.
      setTimeout(() => setVisible(true), 30);
    };
    window.addEventListener(BOOK_CALL_EVENT, onOpen);
    return () => window.removeEventListener(BOOK_CALL_EVENT, onOpen);
  }, []);

  useEffect(() => {
    if (!shouldRender) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && close();
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [shouldRender]);

  if (!shouldRender) return null;

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget).entries());
    setSent(true);
    const webhook = process.env.NEXT_PUBLIC_N8N_WEBHOOK_URL;
    if (webhook) {
      try {
        await fetch(webhook, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            source: "book-call",
            submitted_at: new Date().toISOString(),
            ...data,
          }),
        });
      } catch {
        /* non-blocking: the user already sees the success state */
      }
    }
  };

  return (
    <div
      role="dialog"
      aria-modal="false"
      aria-label="Book a free call"
      className={cn(
        "fixed bottom-6 right-6 z-[100] max-h-[calc(100vh-3rem)] w-[calc(100vw-3rem)] max-w-[420px] overflow-y-auto rounded-[24px] border border-neutral-200 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.12)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] sm:p-8",
        visible
          ? "translate-y-0 scale-100 opacity-100"
          : "pointer-events-none translate-y-8 scale-95 opacity-0",
      )}
    >
      <button
        type="button"
        onClick={close}
        aria-label="Close"
        className="absolute right-5 top-5 rounded-full p-1.5 text-ink-secondary opacity-70 transition-colors hover:bg-neutral-100 hover:text-ink hover:opacity-100"
      >
        <X className="h-5 w-5" />
      </button>

      {sent ? (
        <div className="flex flex-col items-center py-6 text-center">
          <span className="flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white">
            <Check className="h-7 w-7" />
          </span>
          <h2 className="mt-5 text-2xl font-bold text-ink">Request received!</h2>
          <p className="mt-2 max-w-sm text-[15px] text-ink-secondary">
            Thanks for reaching out. Our team will contact you shortly to
            schedule your free call.
          </p>
          <button
            type="button"
            onClick={close}
            className="mt-6 rounded-full bg-brand px-7 py-3 text-base font-medium text-white transition-colors hover:bg-hover"
          >
            Done
          </button>
        </div>
      ) : (
        <>
          <div className="mb-5">
            <h2 className="text-[32px] font-bold leading-tight tracking-tight text-ink">
              Get in Touch
            </h2>
            <p className="mt-1 text-[15px] text-ink-secondary">
              You can reach us anytime
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <input name="first_name" required placeholder="First name" className={inputClass} aria-label="First name" />
              <input name="last_name" required placeholder="Last name" className={inputClass} aria-label="Last name" />
            </div>

            <div className="relative">
              <Mail className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-ink-secondary" strokeWidth={1.5} />
              <input name="email" type="email" required placeholder="Your email" className={cn(inputClass, "pl-11")} aria-label="Email" />
            </div>

            <div className="flex gap-2">
              <SelectField name="country_code" defaultValue="+234" options={countryCodes} className="w-[104px]" />
              <input name="phone" type="tel" required placeholder="Phone number" className={cn(inputClass, "flex-1")} aria-label="Phone number" />
            </div>

            <SelectField name="program" placeholder="Select a service" options={programs} required />

            <SelectField name="call_mode" placeholder="Preferred call mode" options={callModes} required />

            <div className="relative">
              <textarea
                name="message"
                maxLength={120}
                rows={3}
                onChange={(e) => setCount(e.target.value.length)}
                placeholder="How can we help?"
                className="w-full resize-none rounded-[20px] border border-neutral-200 bg-transparent p-4 pb-8 text-[15px] text-ink outline-none transition-colors placeholder:text-ink-secondary/60 focus:border-brand focus:ring-1 focus:ring-brand/30"
              />
              <span className="absolute bottom-3 right-4 text-[13px] text-ink-secondary/50">
                {count}/120
              </span>
            </div>

            <button
              type="submit"
              className="mt-1 h-[52px] w-full rounded-full bg-brand text-base font-medium text-white transition-colors hover:bg-hover"
            >
              Submit
            </button>

            <p className="px-2 pt-1 text-center text-[12px] leading-relaxed text-ink-secondary/70">
              By contacting us, you agree to our{" "}
              <span className="font-medium text-ink-secondary">Terms</span> &{" "}
              <span className="font-medium text-ink-secondary">Privacy</span>
            </p>
          </form>
        </>
      )}
    </div>
  );
}
