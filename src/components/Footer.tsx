import Link from "next/link";
import { Logo } from "./Logo";
import { contact } from "@/lib/site";
import {
  FacebookIcon,
  InstagramIcon,
  LinkedinIcon,
  XIcon,
} from "@/components/ui/SocialIcons";

const quickLinks = [
  { label: "About Us", href: "/about" },
  { label: "What we do", href: "/services" },
  { label: "Our Services", href: "/services" },
  { label: "Curriculum", href: "/#curriculum" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "FAQs", href: "/#faqs" },
];

const company = [
  { label: "Help Centre", href: "/contact" },
  { label: "Learning Resources", href: "/services" },
  { label: "Student Support", href: "/contact" },
];

export function Footer() {
  return (
    <footer className="border-t border-neutral-200 bg-white">
      <div className="mx-auto w-full max-w-[1512px] px-5 pb-10 pt-16 sm:px-8 lg:px-[100px]">
        <div className="grid grid-cols-2 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="col-span-2 max-w-xs md:col-span-1">
            <Logo />
            <p className="mt-5 text-base text-ink-secondary">
              We support learning that shapes understanding, confidence, and a
              more meaningful life.
            </p>
            <div className="mt-6 flex gap-3">
              {[InstagramIcon, XIcon, FacebookIcon, LinkedinIcon].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-brand transition-colors hover:bg-primary-200"
                  aria-label="social link"
                >
                  <Icon className="h-5 w-5" />
                </a>
              ))}
            </div>
          </div>

          <FooterCol title="Quick Links" links={quickLinks} />
          <FooterCol title="Company" links={company} />

          <div className="col-span-2 md:col-span-1">
            <h3 className="text-xl font-semibold text-ink">
              Contact Information
            </h3>
            <ul className="mt-5 space-y-4 text-base text-ink-secondary">
              <li>
                <a href={`mailto:${contact.email}`} className="hover:text-brand">
                  {contact.email}
                </a>
              </li>
              <li>{contact.phone}</li>
            </ul>
          </div>
        </div>

        <div className="mt-14 text-center text-base text-ink-secondary">
          © 2026 <span className="font-medium text-brand">Delphi Education Hub.</span>{" "}
          All rights reserved.
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  links,
}: {
  title: string;
  links: { label: string; href: string }[];
}) {
  return (
    <div>
      <h3 className="text-xl font-semibold text-ink">{title}</h3>
      <ul className="mt-5 space-y-4">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-base text-ink-secondary transition-colors hover:text-brand"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
