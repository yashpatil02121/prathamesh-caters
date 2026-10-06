import { useMenuSelection } from "../../context/menuSelection";
import { useScrolled } from "../../hooks/useScrolled";
import { business } from "../../config/business";
import { openContactSheet } from "../../utils/contactSheet";
import { whatsappLink } from "../../utils/whatsapp";
import {
  ArrowUpIcon,
  ListIcon,
  PhoneIcon,
  WhatsAppIcon,
} from "../ui/Icons";

const enquiryMessage = `Hello ${business.name}! I'd like to enquire about your services.`;

/**
 * Mobile: sticky bottom action bar (Call · WhatsApp · Quote).
 * Desktop: WhatsApp bubble. Both: "My Menu" pill and back-to-top.
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
          className="animate-pop-in fixed bottom-[calc(4.75rem+env(safe-area-inset-bottom))] left-1/2 z-40 flex -translate-x-1/2 items-center gap-3 rounded-full bg-brand py-1.5 pl-1.5 pr-4 text-sm font-semibold text-white shadow-[0_15px_40px_rgba(90,24,39,0.4)] ring-1 ring-white/10 transition-colors hover:bg-brand-dark lg:bottom-6 lg:py-2 lg:pl-2 lg:pr-5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-accent lg:h-9 lg:w-9">
            <ListIcon size={16} />
          </span>
          My Menu
          <span className="rounded-full bg-white/15 px-2.5 py-0.5 text-xs">
            {selectedItems.length}
          </span>
        </a>
      )}

      {/* Back to top */}
      <a
        href="#home"
        aria-label="Back to top"
        tabIndex={scrolled ? undefined : -1}
        className={`
          fixed
          bottom-[calc(4.75rem+env(safe-area-inset-bottom))]
          right-4
          z-40
          flex
          h-10
          w-10
          items-center
          justify-center
          rounded-full
          border
          border-brand/10
          bg-white/95
          text-brand
          shadow-lg
          backdrop-blur
          transition-all
          duration-300
          hover:bg-brand
          hover:text-white
          lg:bottom-24
          lg:right-7
          lg:h-11
          lg:w-11
          ${scrolled ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"}
        `}
      >
        <ArrowUpIcon size={18} />
      </a>

      {/* Desktop WhatsApp bubble */}
      <a
        href={whatsappLink(enquiryMessage)}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Chat with us on WhatsApp"
        className="fixed bottom-6 right-6 z-40 hidden h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-[0_10px_30px_rgba(37,211,102,0.45)] transition-transform hover:scale-110 lg:flex"
      >
        <span className="absolute inset-0 animate-ping rounded-full bg-[#25D366] opacity-30 motion-reduce:hidden" />
        <WhatsAppIcon size={28} />
      </a>

      {/* Mobile action bar */}
      <nav
        aria-label="Quick actions"
        className="pb-safe fixed inset-x-0 bottom-0 z-40 border-t border-brand/10 bg-page/95 shadow-[0_-8px_30px_rgba(90,24,39,0.08)] backdrop-blur-md lg:hidden"
      >
        <div className="mx-auto grid max-w-lg grid-cols-[1fr_1fr_1.4fr] gap-2 px-3 py-2.5">
          <button
            type="button"
            onClick={openContactSheet}
            className="flex h-12 flex-col items-center justify-center rounded-2xl text-brand active:bg-sand"
          >
            <PhoneIcon size={19} />
            <span className="mt-0.5 text-[11px] font-semibold">Call</span>
          </button>

          <a
            href={whatsappLink(enquiryMessage)}
            target="_blank"
            rel="noopener noreferrer"
            className="flex h-12 flex-col items-center justify-center rounded-2xl text-[#128C7E] active:bg-sand"
          >
            <WhatsAppIcon size={20} />
            <span className="mt-0.5 text-[11px] font-semibold">WhatsApp</span>
          </a>

          <a
            href="#contact"
            className="flex h-12 items-center justify-center rounded-2xl bg-accent text-sm font-semibold text-white shadow-[0_8px_20px_rgba(226,132,19,0.3)] active:scale-[0.98]"
          >
            Get a Quote
          </a>
        </div>
      </nav>
    </>
  );
}
