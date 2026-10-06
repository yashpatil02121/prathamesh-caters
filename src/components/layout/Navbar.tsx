import { useEffect, useState } from "react";
import { business } from "../../config/business";
import { navigation } from "../../config/navigation";
import { useActiveSection } from "../../hooks/useActiveSection";
import { useScrolled } from "../../hooks/useScrolled";
import { phoneLink } from "../../utils/whatsapp";
import { Button } from "../ui/Button";
import { CloseIcon, MenuIcon, PhoneIcon } from "../ui/Icons";

const sectionIds = navigation.map((item) => item.href.slice(1));

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const activeSection = useActiveSection(sectionIds);
  const scrolled = useScrolled();

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
            ? "border-brand/10 bg-page/90 shadow-[0_6px_30px_rgba(90,24,39,0.08)]"
            : "border-transparent bg-page/95"
        }
      `}
    >
      <div className="container-custom">
        <div
          className={`
            flex
            items-center
            justify-between
            transition-all
            duration-300
            ${scrolled ? "h-16 lg:h-[4.5rem]" : "h-20"}
          `}
        >
          {/* Logo */}
          <a
            href="#home"
            onClick={closeMobileMenu}
            className="group flex items-center gap-3 leading-none"
          >
            <span className="flex h-10 w-10 items-center justify-center rounded-full bg-brand font-display text-lg font-semibold text-accent ring-2 ring-accent/30 ring-offset-2 ring-offset-page transition-transform duration-300 group-hover:rotate-[8deg]">
              P
            </span>

            <span>
              <span className="block font-display text-lg font-semibold tracking-[0.12em] text-brand transition-colors group-hover:text-accent sm:text-xl">
                {business.brandName}
              </span>

              <span className="mt-1 block text-[9px] font-medium uppercase tracking-[0.22em] text-muted sm:text-[10px]">
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
            {business.contact.phone && (
              <a
                href={phoneLink()}
                aria-label={`Call ${business.contact.phone}`}
                className="flex h-11 w-11 items-center justify-center rounded-full border border-brand/15 text-brand transition-colors hover:border-brand hover:bg-brand hover:text-white"
              >
                <PhoneIcon size={18} />
              </a>
            )}

            <Button href="#contact">Get a Quote</Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-navigation"
            onClick={() => setMobileMenuOpen((open) => !open)}
            className="
              flex
              h-11
              w-11
              items-center
              justify-center
              rounded-full
              border
              border-brand/15
              text-brand
              transition-colors
              hover:bg-cream
              lg:hidden
            "
          >
            {mobileMenuOpen ? (
              <CloseIcon size={22} />
            ) : (
              <MenuIcon size={22} />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          id="mobile-navigation"
          className={`
            overflow-hidden
            transition-all
            duration-300
            lg:hidden
            ${
              mobileMenuOpen
                ? "max-h-[600px] border-t border-brand/10 opacity-100"
                : "pointer-events-none max-h-0 opacity-0"
            }
          `}
        >
          <nav
            aria-label="Mobile"
            className="flex flex-col py-4"
          >
            {navigation.map((item) => {
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
                    px-2
                    py-3.5
                    text-sm
                    font-medium
                    transition-colors
                    hover:text-brand
                    ${active ? "text-brand" : "text-body"}
                  `}
                >
                  {item.label}

                  {active && (
                    <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                  )}
                </a>
              );
            })}

            <div className="grid grid-cols-2 gap-3 pt-4 pb-2">
              {business.contact.phone && (
                <Button
                  href={phoneLink()}
                  variant="outline"
                  className="w-full"
                >
                  <PhoneIcon size={16} />
                  Call Us
                </Button>
              )}

              <Button
                href="#contact"
                className={`w-full ${business.contact.phone ? "" : "col-span-2"}`}
                onClick={closeMobileMenu}
              >
                Get a Quote
              </Button>
            </div>
          </nav>
        </div>
      </div>
    </header>
  );
}
