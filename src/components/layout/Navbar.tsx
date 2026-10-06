import { useEffect, useState } from "react";
import { business } from "../../config/business";
import { navigation } from "../../config/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { useScrolled } from "../../hooks/useScrolled";
import { openContactSheet } from "../../utils/contactSheet";
import {
  formatPhone,
  phoneLink,
  whatsappLink,
} from "../../utils/whatsapp";
import { Button } from "../ui/Button";
import {
  ArrowRightIcon,
  CloseIcon,
  MapPinIcon,
  MenuIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "../ui/Icons";

const sectionIds = navigation.map((item) => item.href.slice(1));

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const scrolled = useScrolled();

  useBodyScrollLock(mobileMenuOpen);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  useEffect(() => {
    if (!mobileMenuOpen) {
      return;
    }

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobileMenuOpen(false);
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => window.removeEventListener("keydown", onKeyDown);
  }, [mobileMenuOpen]);

  return (
    <>
    <header
      className={`
        sticky
        top-0
        z-50
        border-b
        backdrop-blur-md
        transition-all
        duration-300
        ${
          scrolled || mobileMenuOpen
            ? "border-brand/10 bg-page/95 shadow-[0_6px_30px_rgba(90,24,39,0.08)]"
            : "border-transparent bg-page/95"
        }
      `}
    >
      <div className="container-custom">
        <div
          className={`
            flex
            h-16
            items-center
            justify-between
            gap-3
            transition-all
            duration-300
            ${scrolled ? "lg:h-[4.5rem]" : "lg:h-20"}
          `}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={closeMobileMenu}
            className="group flex min-w-0 items-center gap-2.5 leading-none sm:gap-3"
          >
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-brand font-display text-base font-semibold text-accent ring-2 ring-accent/30 ring-offset-2 ring-offset-page transition-transform duration-300 group-hover:rotate-[8deg] sm:h-10 sm:w-10 sm:text-lg">
              P
            </span>

            <span className="min-w-0">
              <span className="block font-display text-base font-semibold tracking-[0.1em] text-brand transition-colors group-hover:text-accent sm:text-xl sm:tracking-[0.12em]">
                {business.brandName}
              </span>

              <span className="mt-1 block truncate text-[9px] font-medium uppercase tracking-[0.18em] text-muted sm:text-[10px] sm:tracking-[0.22em]">
                {business.category}
              </span>
            </span>
          </a>

          {/* Desktop Navigation */}
          <nav
            aria-label="Main"
            className="hidden items-center gap-1 lg:flex"
          >
            {navigation.map((item) => {
              const active = activeSection === item.href.slice(1);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  aria-current={active ? "true" : undefined}
                  className={`
                    relative
                    rounded-full
                    px-3.5
                    py-2
                    text-sm
                    font-medium
                    transition-colors
                    duration-300
                    xl:px-4
                    ${
                      active
                        ? "bg-brand/[0.06] text-brand"
                        : "text-body hover:text-brand"
                    }
                  `}
                >
                  {item.label}

                  <span
                    aria-hidden="true"
                    className={`
                      absolute
                      bottom-1
                      left-1/2
                      h-1
                      w-1
                      -translate-x-1/2
                      rounded-full
                      bg-accent
                      transition-opacity
                      ${active ? "opacity-100" : "opacity-0"}
                    `}
                  />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden items-center gap-3 lg:flex">
            <a
              href={phoneLink()}
              className="flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold text-brand transition-colors hover:text-accent"
            >
              <PhoneIcon size={16} />
              {formatPhone()}
            </a>

            <Button href="#contact">Get a Quote</Button>
          </div>

          {/* Mobile actions */}
          <div className="flex shrink-0 items-center gap-2 lg:hidden">
            <button
              type="button"
              onClick={openContactSheet}
              aria-label="Call us"
              className="flex h-11 w-11 items-center justify-center rounded-full bg-brand text-white active:scale-95"
            >
              <PhoneIcon size={18} />
            </button>

            <button
              type="button"
              aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileMenuOpen}
              aria-controls="mobile-navigation"
              onClick={() => setMobileMenuOpen((open) => !open)}
              className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/15 text-brand active:bg-cream"
            >
              {mobileMenuOpen ? (
                <CloseIcon size={22} />
              ) : (
                <MenuIcon size={22} />
              )}
            </button>
          </div>
        </div>
      </div>
    </header>

      {/* Mobile Navigation (full screen) — outside the header so the
          header's backdrop-filter doesn't become its containing block */}
      <div
        id="mobile-navigation"
        className={`
          fixed
          inset-x-0
          bottom-0
          top-16
          z-40
          overflow-y-auto
          overscroll-contain
          bg-page
          transition-all
          duration-300
          lg:hidden
          ${
            mobileMenuOpen
              ? "visible translate-y-0 opacity-100"
              : "invisible -translate-y-2 opacity-0"
          }
        `}
      >
        {/* Bottom padding keeps the last button clear of the mobile action bar */}
        <div className="container-custom flex min-h-full flex-col pb-[calc(4.5rem+env(safe-area-inset-bottom))]">
          <nav
            aria-label="Mobile"
            className="flex flex-col py-3"
          >
            {navigation.map((item, index) => {
              const active = activeSection === item.href.slice(1);

              return (
                <a
                  key={item.href}
                  href={item.href}
                  onClick={closeMobileMenu}
                  tabIndex={mobileMenuOpen ? undefined : -1}
                  className={`
                    flex
                    items-center
                    justify-between
                    border-b
                    border-brand/5
                    py-4
                    font-display
                    text-2xl
                    font-semibold
                    ${active ? "text-accent" : "text-brand"}
                  `}
                >
                  <span className="flex items-baseline gap-4">
                    <span className="font-sans text-xs font-semibold text-muted/60">
                      0{index + 1}
                    </span>
                    {item.label}
                  </span>

                  <ArrowRightIcon
                    size={18}
                    className={active ? "text-accent" : "text-brand/30"}
                  />
                </a>
              );
            })}
          </nav>

          {/* Contacts */}
          <div className="mt-4 rounded-3xl bg-brand p-5 text-white">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Talk to us
            </p>

            <ul className="mt-3 divide-y divide-white/10">
              {business.contact.people.map((person) => (
                <li
                  key={person.phone}
                  className="flex items-center gap-3 py-3"
                >
                  <a
                    href={phoneLink(person.phone)}
                    tabIndex={mobileMenuOpen ? undefined : -1}
                    className="min-w-0 flex-1"
                  >
                    <span className="block truncate font-semibold">
                      {person.name}
                    </span>
                    <span className="block text-sm text-white/60">
                      {formatPhone(person.phone)}
                    </span>
                  </a>

                  <a
                    href={whatsappLink(undefined, person.phone)}
                    target="_blank"
                    rel="noopener noreferrer"
                    tabIndex={mobileMenuOpen ? undefined : -1}
                    aria-label={`WhatsApp ${person.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-[#25D366]"
                  >
                    <WhatsAppIcon size={18} />
                  </a>

                  <a
                    href={phoneLink(person.phone)}
                    tabIndex={mobileMenuOpen ? undefined : -1}
                    aria-label={`Call ${person.name}`}
                    className="flex h-10 w-10 items-center justify-center rounded-full bg-white/10"
                  >
                    <PhoneIcon size={16} />
                  </a>
                </li>
              ))}
            </ul>

            <a
              href={business.contact.mapUrl}
              target="_blank"
              rel="noopener noreferrer"
              tabIndex={mobileMenuOpen ? undefined : -1}
              className="mt-2 flex items-start gap-2 border-t border-white/10 pt-4 text-xs leading-5 text-white/70"
            >
              <MapPinIcon
                size={16}
                className="mt-0.5 shrink-0 text-accent"
              />
              {business.contact.address}
            </a>
          </div>

          <div className="py-5">
            <Button
              href="#contact"
              variant="secondary"
              size="lg"
              className="w-full"
              onClick={closeMobileMenu}
            >
              Get a Free Quote
            </Button>
          </div>
        </div>
      </div>
    </>
  );
}
