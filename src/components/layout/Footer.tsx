import type { ReactNode } from "react";
import { business } from "../../config/business";
import { navigation } from "../../config/navigation";
import { occasions } from "../../data/occasions";
import { startEnquiry } from "../../utils/enquiry";
import { hasWhatsApp, phoneLink, whatsappLink } from "../../utils/whatsapp";
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
        <div className="relative -translate-y-1/2 overflow-hidden rounded-3xl bg-accent px-6 py-8 shadow-[0_25px_60px_rgba(226,132,19,0.35)] sm:px-10 sm:py-10">
          <div
            aria-hidden="true"
            className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-white/15"
          />

          <div className="relative flex flex-col items-start justify-between gap-6 md:flex-row md:items-center">
            <div>
              <h2 className="font-display text-2xl font-semibold sm:text-3xl">
                Planning a celebration?
              </h2>
              <p className="mt-2 text-sm text-white/85 sm:text-base">
                Tell us your date — we'll take care of the food and the décor.
              </p>
            </div>

            <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
              <Button
                href="#contact"
                variant="light"
                className="w-full sm:w-auto"
              >
                Get a Free Quote
              </Button>

              {business.contact.phone && (
                <Button
                  href={phoneLink()}
                  variant="outline"
                  className="w-full border-white/60 text-white hover:border-white hover:bg-white hover:text-brand sm:w-auto"
                >
                  <PhoneIcon size={16} />
                  {business.contact.phone}
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="container-custom -mt-8 pb-10">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr] lg:gap-12">
          {/* Brand */}
          <div>
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

            <p className="mt-5 max-w-xs text-sm leading-6 text-white/60">
              {business.description} Serving pure vegetarian celebrations
              since {business.since}.
            </p>

            {socialLinks.length > 0 && (
              <div className="mt-6 flex gap-3">
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
                  className="text-sm text-white/60 transition-colors hover:text-accent"
                >
                  {occasion.title}
                </button>
              </li>
            ))}
          </FooterColumn>

          {/* Contact */}
          <FooterColumn title="Contact">
            {business.contact.phone && (
              <ContactItem icon={<PhoneIcon size={16} />}>
                <FooterLink href={phoneLink()}>{business.contact.phone}</FooterLink>
              </ContactItem>
            )}

            {hasWhatsApp() && (
              <ContactItem icon={<WhatsAppIcon size={16} />}>
                <FooterLink
                  href={whatsappLink()}
                  external
                >
                  WhatsApp us
                </FooterLink>
              </ContactItem>
            )}

            {business.contact.email && (
              <ContactItem icon={<MailIcon size={16} />}>
                <FooterLink href={`mailto:${business.contact.email}`}>
                  {business.contact.email}
                </FooterLink>
              </ContactItem>
            )}

            {business.contact.address && (
              <ContactItem icon={<MapPinIcon size={16} />}>
                <span className="text-sm text-white/60">
                  {business.contact.address}
                </span>
              </ContactItem>
            )}

            {business.contact.hours && (
              <ContactItem icon={<ClockIcon size={16} />}>
                <span className="text-sm text-white/60">
                  {business.contact.hours}
                </span>
              </ContactItem>
            )}
          </FooterColumn>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-white/10 pt-6 text-xs text-white/50 sm:flex-row sm:items-center sm:justify-between sm:text-sm">
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
      <ul className="mt-5 space-y-3">{children}</ul>
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
      className="text-sm text-white/60 transition-colors hover:text-accent"
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
      <span className="mt-0.5 text-accent">{icon}</span>
      {children}
    </li>
  );
}
