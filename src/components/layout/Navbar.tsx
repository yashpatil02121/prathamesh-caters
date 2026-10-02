import { useState } from "react";
import { business } from "../../config/business";
import { navigation } from "../../config/navigation";
import { Button } from "../ui/Button";

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const closeMobileMenu = () => {
    setMobileMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 border-b border-brand/10 bg-page/95 backdrop-blur-md">
      <div className="container-custom">
        <div className="flex h-20 items-center justify-between">
          
          {/* Logo */}
          <a
  href="#home"
  onClick={closeMobileMenu}
  className="group leading-none"
>
  <span className="flex items-center gap-2">
    <span className="h-2 w-2 rounded-full bg-accent" />

    <span className="text-lg font-bold tracking-[0.12em] text-brand transition-colors group-hover:text-accent sm:text-xl">
      {business.brandName}
    </span>
  </span>

  <span className="mt-1 block pl-4 text-[9px] font-medium uppercase tracking-[0.2em] text-muted sm:text-[10px]">
    {business.category}
  </span>
</a>

          {/* Desktop Navigation */}
          <nav className="hidden items-center gap-7 lg:flex">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="
                  relative
                  py-2
                  text-sm
                  font-medium
                  text-body
                  transition-colors
                  duration-300
                  hover:text-brand
                  after:absolute
                  after:bottom-0
                  after:left-0
                  after:h-[2px]
                  after:w-0
                  after:bg-accent
                  after:transition-all
                  after:duration-300
                  hover:after:w-full
                "
              >
                {item.label}
              </a>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href="#contact">
              Get a Quote
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            type="button"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileMenuOpen}
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
              <CloseIcon />
            ) : (
              <MenuIcon />
            )}
          </button>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`
            overflow-hidden
            transition-all
            duration-300
            lg:hidden
            ${
              mobileMenuOpen
                ? "max-h-[500px] border-t border-brand/10 opacity-100"
                : "max-h-0 opacity-0"
            }
          `}
        >
          <nav className="flex flex-col py-4">
            {navigation.map((item) => (
              <a
                key={item.href}
                href={item.href}
                onClick={closeMobileMenu}
                className="
                  border-b
                  border-brand/5
                  px-2
                  py-3.5
                  text-sm
                  font-medium
                  text-body
                  transition-colors
                  hover:text-brand
                "
              >
                {item.label}
              </a>
            ))}

            <div className="pt-4 pb-2">
              <Button
                href="#contact"
                className="w-full"
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

/* ----------------------------------------
   Icons
---------------------------------------- */

function MenuIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M4 7h16" />
      <path d="M4 12h16" />
      <path d="M4 17h16" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="M6 6l12 12" />
      <path d="M18 6L6 18" />
    </svg>
  );
}