import { useEffect, useState } from "react";
import { business } from "../../config/business";
import { useBodyScrollLock } from "../../hooks/useBodyScrollLock";
import { CONTACT_SHEET_EVENT } from "../../utils/contactSheet";
import {
  formatPhone,
  phoneLink,
  whatsappLink,
} from "../../utils/whatsapp";
import {
  CloseIcon,
  MapPinIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "../ui/Icons";

/**
 * Bottom sheet listing every contact person with
 * one-tap Call and WhatsApp buttons.
 */
export function ContactSheet() {
  const [open, setOpen] = useState(false);

  useBodyScrollLock(open);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener(CONTACT_SHEET_EVENT, onOpen);
    window.addEventListener("keydown", onKeyDown);

    return () => {
      window.removeEventListener(CONTACT_SHEET_EVENT, onOpen);
      window.removeEventListener("keydown", onKeyDown);
    };
  }, []);

  if (!open) {
    return null;
  }

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="contact-sheet-title"
      className="fixed inset-0 z-[90] flex items-end justify-center sm:items-center sm:p-6"
    >
      <button
        type="button"
        aria-label="Close"
        onClick={() => setOpen(false)}
        className="animate-fade-in absolute inset-0 bg-black/50 backdrop-blur-sm"
      />

      <div className="animate-sheet-up pb-safe relative max-h-[90svh] w-full max-w-md overflow-y-auto rounded-t-[1.75rem] bg-page shadow-2xl sm:rounded-3xl">
        {/* Grab handle */}
        <div className="flex justify-center pt-3 sm:hidden">
          <span className="h-1.5 w-12 rounded-full bg-brand/15" />
        </div>

        <div className="flex items-start justify-between gap-4 px-5 pt-4 sm:px-6 sm:pt-6">
          <div>
            <h2
              id="contact-sheet-title"
              className="font-display text-2xl font-semibold text-brand"
            >
              Call or WhatsApp us
            </h2>
            <p className="mt-1 text-sm text-muted">
              Talk directly to our family team.
            </p>
          </div>

          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Close"
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-sand text-brand"
          >
            <CloseIcon size={18} />
          </button>
        </div>

        <ul className="mt-5 space-y-3 px-5 sm:px-6">
          {business.contact.people.map((person, index) => (
            <li
              key={person.phone}
              className={`flex items-center gap-3 rounded-2xl border bg-white p-3 ${
                index === 0 ? "border-accent/40" : "border-brand/10"
              }`}
            >
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-lg font-semibold text-accent">
                {person.name.charAt(0)}
              </span>

              <a
                href={phoneLink(person.phone)}
                className="min-w-0 flex-1"
              >
                <span className="block truncate font-semibold text-brand">
                  {person.name}
                </span>
                <span className="block text-sm text-muted">
                  {formatPhone(person.phone)}
                </span>
                {index === 0 && (
                  <span className="mt-0.5 block text-[10px] font-semibold uppercase tracking-[0.14em] text-accent">
                    Main contact
                  </span>
                )}
              </a>

              <a
                href={whatsappLink(
                  `Hello ${business.name}! I'd like to enquire about catering / decoration for my event.`,
                  person.phone,
                )}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`WhatsApp ${person.name}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#25D366] text-white active:scale-95"
              >
                <WhatsAppIcon size={20} />
              </a>

              <a
                href={phoneLink(person.phone)}
                aria-label={`Call ${person.name}`}
                className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand text-white active:scale-95"
              >
                <PhoneIcon size={18} />
              </a>
            </li>
          ))}
        </ul>

        <a
          href={business.contact.mapUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="mx-5 mt-4 mb-5 flex items-start gap-3 rounded-2xl bg-sand/70 p-4 text-sm text-body sm:mx-6 sm:mb-6"
        >
          <MapPinIcon
            size={18}
            className="mt-0.5 shrink-0 text-accent"
          />
          <span>
            {business.contact.address}
            <span className="mt-1 block font-semibold text-accent">
              Get directions →
            </span>
          </span>
        </a>
      </div>
    </div>
  );
}
