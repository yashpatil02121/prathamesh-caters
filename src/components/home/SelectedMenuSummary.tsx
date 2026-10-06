import { useMenuSelection } from "../../context/menuSelection";
import { generateMenuPdf } from "../../utils/generateMenuPdf";
import { startEnquiry } from "../../utils/enquiry";
import {
  buildMenuMessage,
  groupSelectedItems,
  whatsappLink,
} from "../../utils/whatsapp";
import {
  ArrowRightIcon,
  CloseIcon,
  PrintIcon,
  WhatsAppIcon,
} from "../ui/Icons";

export function SelectedMenuSummary() {
  const { selectedItems, removeItem, clear } = useMenuSelection();

  return (
    <div
      id="my-menu"
      className="animate-pop-in mt-10 scroll-mt-24 overflow-hidden rounded-2xl border border-accent/30 bg-white shadow-[0_20px_50px_rgba(90,24,39,0.12)] sm:mt-12 sm:rounded-3xl"
    >
      {/* Header */}
      <div className="bg-pattern flex items-center justify-between gap-4 bg-brand px-5 py-5 sm:px-7">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Your Menu
          </p>

          <h3 className="mt-1 font-display text-xl font-semibold text-white sm:text-2xl">
            {selectedItems.length}{" "}
            {selectedItems.length === 1 ? "dish" : "dishes"} selected
          </h3>
        </div>

        <button
          type="button"
          onClick={() => {
            if (window.confirm("Remove all dishes from your menu?")) {
              clear();
            }
          }}
          className="rounded-full border border-white/20 px-4 py-2 text-xs font-semibold text-white/80 transition-colors hover:bg-white hover:text-brand"
        >
          Clear all
        </button>
      </div>

      {/* Selected items */}
      <div className="max-h-[420px] overflow-y-auto p-5 sm:p-7">
        <div className="grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-2 lg:grid-cols-3">
          {groupSelectedItems(selectedItems).map(([category, items]) => (
            <div key={category}>
              <h4 className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.15em] text-accent">
                {category}
                <span className="font-medium tracking-normal text-muted">
                  {items.length}
                </span>
              </h4>

              <ul className="mt-2 divide-y divide-brand/5">
                {items.map((selected) => (
                  <li
                    key={`${selected.categoryId}:${selected.item}`}
                    className="flex items-center justify-between gap-4 py-2"
                  >
                    <span className="text-sm font-medium text-body">
                      {selected.item}
                    </span>

                    <button
                      type="button"
                      onClick={() => removeItem(selected)}
                      aria-label={`Remove ${selected.item}`}
                      className="-mr-2 flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-muted transition-colors hover:bg-cream hover:text-brand"
                    >
                      <CloseIcon size={16} />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Actions — WhatsApp first and full width on phones */}
      <div className="grid grid-cols-2 gap-3 border-t border-brand/10 bg-page p-4 sm:grid-cols-3 sm:p-5">
        <a
          href={whatsappLink(buildMenuMessage(selectedItems))}
          target="_blank"
          rel="noopener noreferrer"
          className="col-span-2 flex h-12 items-center justify-center gap-2 rounded-full bg-[#25D366] px-5 text-sm font-semibold text-white transition-all hover:bg-[#1da851] hover:shadow-lg sm:order-2 sm:col-span-1"
        >
          <WhatsAppIcon size={18} />
          Send on WhatsApp
        </a>

        <button
          type="button"
          onClick={() => generateMenuPdf(selectedItems)}
          className="flex h-12 items-center justify-center gap-2 rounded-full border border-brand/20 bg-white px-4 text-sm font-semibold text-brand transition-all hover:border-brand hover:bg-brand hover:text-white sm:order-1"
        >
          <PrintIcon size={18} />
          <span className="sm:hidden">PDF</span>
          <span className="hidden sm:inline">Download PDF</span>
        </button>

        <button
          type="button"
          onClick={() => startEnquiry()}
          className="flex h-12 items-center justify-center gap-2 rounded-full bg-accent px-4 text-sm font-semibold text-white transition-all hover:bg-brand hover:shadow-lg sm:order-3"
        >
          Get a Quote
          <ArrowRightIcon size={18} />
        </button>
      </div>
    </div>
  );
}
