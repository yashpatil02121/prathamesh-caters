import type { SelectedMenuItem } from "../../types/menu";
import { generateMenuPdf } from "../../utils/generateMenuPdf";

type SelectedMenuSummaryProps = {
  selectedItems: SelectedMenuItem[];
  onRemove: (item: SelectedMenuItem) => void;
  onClear: () => void;
};

export function SelectedMenuSummary({
  selectedItems,
  onRemove,
  onClear,
}: SelectedMenuSummaryProps) {
  return (
    <div
      className="
        mt-8
        overflow-hidden
        rounded-2xl
        border
        border-accent/30
        bg-white
        shadow-[0_10px_35px_rgba(90,24,39,0.08)]
        sm:mt-10
        sm:rounded-3xl
      "
    >
      {/* Header */}
      <div className="flex items-center justify-between gap-4 bg-brand px-5 py-4 sm:px-6">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-accent">
            Your Selection
          </p>

          <h3 className="mt-1 text-lg font-semibold text-white">
            {selectedItems.length}{" "}
            {selectedItems.length === 1
              ? "item"
              : "items"}{" "}
            selected
          </h3>
        </div>

        <button
          type="button"
          onClick={onClear}
          className="
            text-xs
            font-semibold
            text-white/60
            transition-colors
            hover:text-white
          "
        >
          Clear all
        </button>
      </div>

      {/* Selected items */}
      <div className="max-h-[420px] overflow-y-auto p-5 sm:p-6">
        {groupSelectedItems(selectedItems).map(
          ([category, items]) => (
            <div
              key={category}
              className="not-first:mt-6"
            >
              <h4 className="text-xs font-bold uppercase tracking-[0.15em] text-accent">
                {category}
              </h4>

              <div className="mt-2 divide-y divide-brand/8">
                {items.map((item) => {
                  const selected = selectedItems.find(
                    (selectedItem) =>
                      selectedItem.categoryTitle ===
                        category &&
                      selectedItem.item === item,
                  );

                  if (!selected) {
                    return null;
                  }

                  return (
                    <div
                      key={`${category}:${item}`}
                      className="flex items-center justify-between gap-4 py-2.5"
                    >
                      <span className="text-sm font-medium text-body">
                        {item}
                      </span>

                      <button
                        type="button"
                        onClick={() =>
                          onRemove(selected)
                        }
                        aria-label={`Remove ${item}`}
                        className="
                          flex
                          h-7
                          w-7
                          shrink-0
                          items-center
                          justify-center
                          rounded-full
                          text-muted
                          transition-colors
                          hover:bg-cream
                          hover:text-brand
                        "
                      >
                        <CloseIcon />
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          ),
        )}
      </div>

      {/* Print */}
      <div className="border-t border-brand/10 bg-page p-4 sm:p-5">
        <button
          type="button"
          onClick={() =>
            generateMenuPdf(selectedItems)
          }
          className="
            flex
            h-12
            w-full
            items-center
            justify-center
            gap-2
            rounded-full
            bg-accent
            px-5
            text-sm
            font-semibold
            text-white
            transition-all
            hover:bg-brand
            hover:shadow-lg
            sm:h-13
          "
        >
          <PrintIcon />
          Print Selected Menu
        </button>
      </div>
    </div>
  );
}

function groupSelectedItems(
  selectedItems: SelectedMenuItem[],
) {
  const grouped = new Map<string, string[]>();

  for (const selected of selectedItems) {
    const existing = grouped.get(
      selected.categoryTitle,
    );

    if (existing) {
      existing.push(selected.item);
    } else {
      grouped.set(selected.categoryTitle, [
        selected.item,
      ]);
    }
  }

  return Array.from(grouped.entries());
}

function CloseIcon() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      aria-hidden="true"
    >
      <path d="m6 6 12 12" />
      <path d="M18 6 6 18" />
    </svg>
  );
}

function PrintIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M6 9V3h12v6" />
      <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2" />
      <path d="M6 14h12v7H6z" />
    </svg>
  );
}