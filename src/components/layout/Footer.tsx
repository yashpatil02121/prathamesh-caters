import type { ReactNode } from "react";
import { business } from "../../config/business";
import { navigation } from "../../config/navigation";
import { occasions } from "../../data/occasions";
import { startEnquiry } from "../../utils/enquiry";
import {
  formatPhone,
  phoneLink,
  whatsappLink,
} from "../../utils/whatsapp";
import { Button } from "../ui/Button";
import {
  ClockIcon,
  FacebookIcon,
  InstagramIcon,
  MailIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
  YoutubeIcon,
} from "../ui/Icons";

const socialLinks = [
  { label: "Instagram", href: business.social.instagram, icon: <InstagramIcon size={18} /> },
  { label: "Facebook", href: business.social.facebook, icon: <FacebookIcon size={18} /> },
  { label: "YouTube", href: business.social.youtube, icon: <YoutubeIcon size={18} /> },
].filter((link) => link.href);

export function Footer() {
  return (
    <footer className="bg-pattern relative bg-brand-dark text-white">
      {/* CTA band */}
      <div className="container-custom">
        <div className="relative -translate-y-1/2 overflow-hidden rounded-3xl bg-accent px-5 py-6 shadow-[0_25px_60px_rgba(226,132,19,0.35)] sm:px-10 sm:py-10">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15"
          />

          <div className="relative flex flex-col items-start justify-between gap-5 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Planning a celebration?
              </h2>
              <p className="mt-1.5 text-sm text-white/85 sm:text-base">
                Tell us your date — we'll take care of the food and the décor.
              </p>
            </div>

            <div className="grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto">
              <Button
                href="#contact"
                variant="light"
                className="w-full px-4 sm:w-auto sm:px-6"
              >
                Get a Quote
              </Button>

              <Button
                href={phoneLink()}
                variant="outline"
                className="w-full border-white/60 px-4 text-white hover:border-white hover:bg-white hover:text-brand sm:w-auto sm:px-6"
              >
                <PhoneIcon size={16} />
                Call Now
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom -mt-6 pb-8 sm:-mt-8 sm:pb-10">
        <div className="grid grid-cols-2 gap-x-6 gap-y-10 lg:grid-cols-[1.3fr_0.8fr_1fr_1.4fr] lg:gap-12">
          {/* Brand */}
          <div className="col-span-2 lg:col-span-1">
            <a
              href="#home"
              className="flex items-center gap-3"
            >
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent font-display text-xl font-semibold text-white">
                P
              </span>
              <span>
                <span className="block font-display text-xl font-semibold tracking-[0.12em]">
                  {business.brandName}
                </span>
                <span className="mt-0.5 block text-[10px] uppercase tracking-[0.22em] text-white/60">
                  {business.category}
                </span>
              </span>
            </a>

            <p className="mt-4 max-w-sm text-sm leading-6 text-white/60">
              {business.description} Serving pure vegetarian celebrations
              since {business.since}.
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-5 flex gap-3">
                {socialLinks.map((link) => (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={link.label}
                    className="flex h-10 w-10 items-center justify-center rounded-full border border-white/15 text-white/80 transition-colors hover:border-accent hover:bg-accent hover:text-white"
                  >
                    {link.icon}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick links */}
          <FooterColumn title="Explore">
            {navigation.map((item) => (
              <li key={item.href}>
                <FooterLink href={item.href}>{item.label}</FooterLink>
              </li>
            ))}
          </FooterColumn>

          {/* Occasions */}
          <FooterColumn title="Occasions">
            {occasions.map((occasion) => (
              <li key={occasion.title}>
                <button
                  type="button"
                  onClick={() => startEnquiry(occasion.eventType)}
                  className="py-1 text-left text-sm text-white/60 transition-colors hover:text-accent"
                >
                  {occasion.title}
                </button>
              </li>
            ))}
          </FooterColumn>

          {/* Contact */}
          <div className="col-span-2 lg:col-span-1">
            <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Contact
            </h3>

            <ul className="mt-4 space-y-2">
              {business.contact.people.map((person) => (
                <li
                  key={person.phone}
                  className="flex items-center justify-between gap-3 rounded-2xl bg-white/[0.04] px-4 py-2.5 ring-1 ring-white/10"
                >
                  <a
                    href={phoneLink(person.phone)}
                    className="min-w-0"
                  >
                    <span className="block truncate text-sm font-medium">
                      {person.name}
                    </span>
                    <span className="block text-xs text-white/55">
                      {formatPhone(person.phone)}
                    </span>
                  </a>

                  <span className="flex shrink-0 gap-2">
                    <a
                      href={whatsappLink(undefined, person.phone)}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`WhatsApp ${person.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-[#25D366]/90"
                    >
                      <WhatsAppIcon size={16} />
                    </a>
                    <a
                      href={phoneLink(person.phone)}
                      aria-label={`Call ${person.name}`}
                      className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10"
                    >
                      <PhoneIcon size={15} />
                    </a>
                  </span>
                </li>
              ))}
            </ul>

            <ul className="mt-5 space-y-3">
              {business.contact.email && (
                <ContactItem icon={<MailIcon size={16} />}>
                  <FooterLink href={`mailto:${business.contact.email}`}>
                    {business.contact.email}
                  </FooterLink>
                </ContactItem>
              )}

              <ContactItem icon={<MapPinIcon size={16} />}>
                <FooterLink
                  href={business.contact.mapUrl}
                  external
                >
                  {business.contact.address}
                </FooterLink>
              </ContactItem>

              <ContactItem icon={<ClockIcon size={16} />}>
                <span className="text-sm text-white/60">
                  {business.contact.hours}
                </span>
              </ContactItem>
            </ul>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
          <p>
            © {new Date().getFullYear()} {business.name}. All rights reserved.
          </p>

          <p className="flex items-center gap-2">
            <span className="flex h-3.5 w-3.5 items-center justify-center rounded-[2px] border border-green-500">
              <span className="h-1.5 w-1.5 rounded-full bg-green-500" />
            </span>
            100% Pure Vegetarian
          </p>
        </div>
      </div>
    </footer>
  );
}

function FooterColumn({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) {
  return (
    <div>
      <h3 className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
        {title}
      </h3>
      <ul className="mt-4 space-y-2">{children}</ul>
    </div>
  );
}

function FooterLink({
  href,
  external = false,
  children,
}: {
  href: string;
  external?: boolean;
  children: ReactNode;
}) {
  return (
    <a
      href={href}
      className="inline-block py-1 text-sm leading-6 text-white/60 transition-colors hover:text-accent"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </a>
  );
}

function ContactItem({
  icon,
  children,
}: {
  icon: ReactNode;
  children: ReactNode;
}) {
  return (
    <li className="flex items-start gap-3">
      <span className="mt-1.5 shrink-0 text-accent">{icon}</span>
      {children}
    </li>
  );
}
