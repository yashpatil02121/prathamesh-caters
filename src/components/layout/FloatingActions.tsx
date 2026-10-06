import { useMenuSelection } from "../../context/menuSelection";
import { useScrolled } from "../../hooks/useScrolled";
import { business } from "../../config/business";
import { hasWhatsApp, whatsappLink } from "../../utils/whatsapp";
import { ArrowUpIcon, ListIcon, WhatsAppIcon } from "../ui/Icons";

/**
 * Floating "My Menu" pill, WhatsApp shortcut and back-to-top button.
 */
export function FloatingActions() {
  const { selectedItems } = useMenuSelection();
  const scrolled = useScrolled(600);

  return (
    <>
      {/* My Menu pill */}
      {selectedItems.length > 0 && (
        <a
          href="#my-menu"
          className="animate-pop-in fixed bottom-5 left-4 z-40 flex items-center sm:left-1/2 sm:-translate-x-1/2 gap-3 rounded-full bg-brand py-2 pl-2 pr-5 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(90,24,39,0.4)] ring-1 ring-white/10 transition-colors hover:bg-brand-dark sm:bottom-6"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent">
            <ListIcon size={18} />
          </span>
          My Menu
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs">
            {selectedItems.length}
          </span>
        </a>
      )}

      <div className="fixed bottom-5 right-4 z-40 flex flex-col items-center gap-3 sm:bottom-6 sm:right-6">
        {/* Back to top */}
        <a
          href="#home"
          aria-label="Back to top"
          tabIndex={scrolled ? undefined : -1}
          className={`
            flex
            h-11
            w-11
            items-center
            justify-center
            rounded-full
            border
            border-brand/10
            bg-white
            text-brand
            shadow-lg
            transition-all
            duration-300
            hover:bg-brand
            hover:text-white
            ${scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}
          `}
        >
          <ArrowUpIcon size={18} />
        </a>

        {/* WhatsApp */}
        {hasWhatsApp() && (
          <a
            href={whatsappLink(
              `Hello ${business.name}! I'd like to enquire about your services.`,
            )}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="Chat with us on WhatsApp"
            className="group relative flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform hover:scale-110"
          >
            <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 motion-reduce:hidden" />
            <WhatsAppIcon size={28} />
          </a>
        )}
      </div>
    </>
  );
}
