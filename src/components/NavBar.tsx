"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useLenis } from "lenis/react";
import { ArrowRight, ChevronDown, Mail, Menu, Phone, X } from "lucide-react";
import { Logo } from "./Logo";
import { CountrySelector } from "./CountrySelector";
import { openBookCall } from "./BookCallModal";
import { contact, navLinks } from "@/lib/site";
import { cn } from "@/lib/cn";

const bookCallClass =
  "inline-flex items-center justify-center rounded-full bg-brand px-6 py-3 text-base font-medium text-white transition-colors hover:bg-hover";

function WhatsAppIcon({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  );
}

export function NavBar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const lenis = useLenis();

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  // Close the menu whenever the route changes.
  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  // Lock body scroll while the slide-in panel is open. Lenis drives scroll
  // from its own rAF loop, so `overflow: hidden` alone does not hold it — it
  // has to be stopped explicitly as well.
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) lenis?.stop();
    else lenis?.start();
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
    };
  }, [open, lenis]);

  return (
    <>
    <header className="fixed inset-x-0 top-0 z-50 bg-white/40 backdrop-blur-md">
      <nav className="relative mx-auto flex h-[var(--header-h)] w-full max-w-[1720px] items-center justify-between px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-2.5 lg:gap-4">
          <Logo variant="nav" />
          {/* Mobile: the country flags sit to the right of the bar, clear of the logo; desktop: inline next to the logo. */}
          <div className="absolute right-16 top-1/2 -translate-y-1/2 lg:static lg:right-auto lg:translate-y-0">
            <CountrySelector />
          </div>
        </div>

        {/* Desktop links */}
        <ul className="hidden items-center gap-8 lg:flex">
          {navLinks.map((link) =>
            link.children ? (
              <li key={link.href} className="group relative">
                <Link
                  href={link.href}
                  className={cn(
                    "flex items-center gap-1 text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "text-brand"
                      : "text-ink-secondary hover:text-brand",
                  )}
                >
                  {link.label}
                  <ChevronDown className="h-4 w-4 transition-transform group-hover:rotate-180" />
                </Link>
                <div className="invisible absolute left-1/2 top-full w-64 -translate-x-1/2 pt-3 opacity-0 transition-all group-hover:visible group-hover:opacity-100">
                  <div className="rounded-2xl border border-neutral-200 bg-white p-2 shadow-xl shadow-black/5">
                    {link.children.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block rounded-xl px-4 py-3 hover:bg-primary-100"
                      >
                        <span className="block text-sm font-semibold text-ink">
                          {c.name}
                        </span>
                        <span className="block text-xs text-ink-secondary">
                          {c.blurb}
                        </span>
                      </Link>
                    ))}
                  </div>
                </div>
              </li>
            ) : (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={cn(
                    "text-base font-medium transition-colors",
                    isActive(link.href)
                      ? "text-brand"
                      : "text-ink-secondary hover:text-brand",
                  )}
                >
                  {link.label}
                </Link>
              </li>
            ),
          )}
        </ul>

        <div className="hidden lg:block">
          <button type="button" onClick={openBookCall} className={bookCallClass}>
            Book a Free Call
          </button>
        </div>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label="Open menu"
          aria-expanded={open}
          onClick={() => setOpen(true)}
          className="flex h-11 w-11 items-center justify-center rounded-xl text-brand transition-colors hover:bg-neutral-100 lg:hidden"
        >
          <Menu className="h-6 w-6" />
        </button>
      </nav>
    </header>

      {/* Off-canvas layer — kept OUT of <header> because the header's
          backdrop-blur would otherwise become this fixed box's containing
          block (sizing it to the 72px bar). The `transform` makes this box the
          containing block for its absolute children, and `overflow-clip` stops
          the off-screen panel from extending the page (no horizontal scroll). */}
      <div className="pointer-events-none fixed inset-0 z-[60] transform-gpu overflow-clip lg:hidden">
      {/* Mobile overlay */}
      <div
        onClick={() => setOpen(false)}
        className={cn(
          "absolute inset-0 bg-ink/40 backdrop-blur-sm transition-opacity duration-300",
          open ? "pointer-events-auto opacity-100" : "opacity-0",
        )}
        aria-hidden
      />

      {/* Mobile slide-in panel */}
      <div
        className={cn(
          "pointer-events-auto absolute right-0 top-0 flex h-full w-[85%] max-w-[360px] flex-col bg-white shadow-2xl transition-transform duration-300 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "translate-x-0" : "translate-x-full",
        )}
      >
        {/* Panel header */}
        <div className="flex items-center justify-between border-b border-neutral-200 px-5 py-4">
          <Logo variant="plain" />
          <button
            type="button"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-ink hover:bg-neutral-100"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {/* Nav links */}
        <div className="flex-1 overflow-y-auto px-5 pb-6 pt-5">
          <div className="flex flex-col gap-1">
            {navLinks.map((link, i) => {
              const active = isActive(link.href);
              const delay = open ? `${80 + i * 60}ms` : "0ms";

              if (link.children) {
                return (
                  <div
                    key={link.href}
                    className={cn(
                      "transition-all duration-300",
                      open
                        ? "translate-x-0 opacity-100"
                        : "translate-x-6 opacity-0",
                    )}
                    style={{ transitionDelay: delay }}
                  >
                    <div
                      className={cn(
                        "flex items-center rounded-xl",
                        active ? "bg-primary-100" : "hover:bg-neutral-100",
                      )}
                    >
                      <Link
                        href={link.href}
                        onClick={() => setOpen(false)}
                        className={cn(
                          "flex-1 px-3 py-3.5 text-base font-medium",
                          active ? "text-brand" : "text-ink",
                        )}
                      >
                        {link.label}
                      </Link>
                      <button
                        type="button"
                        aria-label="Toggle services"
                        aria-expanded={servicesOpen}
                        onClick={() => setServicesOpen((v) => !v)}
                        className="flex h-11 w-11 items-center justify-center text-ink-secondary"
                      >
                        <ChevronDown
                          className={cn(
                            "h-5 w-5 transition-transform",
                            servicesOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </div>
                    {servicesOpen && (
                      <div className="ml-3 mt-1 flex flex-col gap-0.5 border-l border-neutral-200 pl-3">
                        {link.children.map((c) => (
                          <Link
                            key={c.href}
                            href={c.href}
                            onClick={() => setOpen(false)}
                            className={cn(
                              "rounded-lg px-3 py-2.5 text-sm font-medium",
                              isActive(c.href)
                                ? "text-brand"
                                : "text-ink-secondary hover:bg-neutral-100 hover:text-ink",
                            )}
                          >
                            {c.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </div>
                );
              }

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    "flex items-center justify-between rounded-xl px-3 py-3.5 text-base font-medium transition-all duration-300",
                    active ? "bg-primary-100 text-brand" : "text-ink hover:bg-neutral-100",
                    open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
                  )}
                  style={{ transitionDelay: delay }}
                >
                  {link.label}
                  <ArrowRight
                    className={cn(
                      "h-4 w-4",
                      active ? "text-brand" : "text-ink-secondary/40",
                    )}
                  />
                </Link>
              );
            })}
          </div>

          <div className="my-5 border-t border-neutral-200" />

          {/* Contact */}
          <p
            className={cn(
              "mb-3 px-3 text-xs font-semibold uppercase tracking-wider text-ink-secondary transition-all duration-300",
              open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
            )}
            style={{ transitionDelay: open ? "380ms" : "0ms" }}
          >
            Get in touch
          </p>
          <div className="flex flex-col gap-1">
            <a
              href={contact.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink transition-all duration-300 hover:bg-neutral-100",
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
              )}
              style={{ transitionDelay: open ? "440ms" : "0ms" }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/10 text-[#25D366]">
                <WhatsAppIcon className="h-4.5 w-4.5" />
              </span>
              WhatsApp
            </a>
            <a
              href={`mailto:${contact.email}`}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink transition-all duration-300 hover:bg-neutral-100",
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
              )}
              style={{ transitionDelay: open ? "500ms" : "0ms" }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-100 text-brand">
                <Mail className="h-4.5 w-4.5" />
              </span>
              {contact.email}
            </a>
            <a
              href={`tel:${contact.phone.replace(/\s/g, "")}`}
              className={cn(
                "flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium text-ink transition-all duration-300 hover:bg-neutral-100",
                open ? "translate-x-0 opacity-100" : "translate-x-6 opacity-0",
              )}
              style={{ transitionDelay: open ? "560ms" : "0ms" }}
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-200 text-brand">
                <Phone className="h-4.5 w-4.5" />
              </span>
              {contact.phone}
            </a>
          </div>
        </div>

        {/* Footer CTA */}
        <div className="border-t border-neutral-200 bg-white px-5 py-4">
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openBookCall();
            }}
            className={cn(bookCallClass, "w-full")}
          >
            Book a Free Call
          </button>
        </div>
      </div>
      </div>
    </>
  );
}
