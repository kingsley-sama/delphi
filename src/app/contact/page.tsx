import type { Metadata } from "next";
import { Mail, Phone, MessageCircle, Clock } from "lucide-react";
import { PageHero } from "@/components/sections/PageHero";
import { Container } from "@/components/ui/Container";
import { ContactForm } from "@/components/ContactForm";
import { Faq } from "@/components/sections/Faq";
import { contact } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact Us — Delphi Education Hub",
  description:
    "Book a free consultation call or reach out to the Delphi Education Hub team. We'd love to help you start your learning journey.",
};

const details = [
  { icon: Mail, label: "Email", value: contact.email, href: `mailto:${contact.email}` },
  { icon: Phone, label: "Phone", value: contact.phone, href: `tel:${contact.phone.replace(/\s/g, "")}` },
  { icon: MessageCircle, label: "WhatsApp", value: "Chat with us", href: contact.whatsapp },
  { icon: Clock, label: "Hours", value: "Mon – Sat, 9am – 6pm" },
];

export default function ContactPage() {
  return (
    <>
      <PageHero
        badge="Get In Touch"
        title="Let's Start Your Learning Journey"
        subtitle="Book a free consultation call or send us a message — our team typically responds within one business day."
      />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="grid gap-8 sm:gap-10 lg:grid-cols-[1fr_1.2fr]">
            <div>
              <h2 className="text-2xl font-semibold text-ink">Contact information</h2>
              <p className="mt-3 max-w-sm text-base text-ink-secondary">
                Reach out through any channel below, or fill in the form and we'll
                come to you.
              </p>
              <ul className="mt-8 space-y-5">
                {details.map((d) => (
                  <li key={d.label} className="flex items-start gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary-100 text-brand">
                      <d.icon className="h-5 w-5" />
                    </span>
                    <span>
                      <span className="block text-sm text-ink-secondary">{d.label}</span>
                      {d.href ? (
                        <a href={d.href} className="block text-base font-medium text-ink hover:text-brand">
                          {d.value}
                        </a>
                      ) : (
                        <span className="block text-base font-medium text-ink">{d.value}</span>
                      )}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <ContactForm />
          </div>
        </Container>
      </section>

      <Faq showImage={false} />
    </>
  );
}
