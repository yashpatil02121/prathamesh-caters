import type { MenuCategory } from "../../data/menu";
import { MenuItem } from "./MenuItem";

type MenuSectionProps = {
  category: MenuCategory;
  selectedItems: Set<string>;
  onToggleItem: (
    category: MenuCategory,
    item: string,
  ) => void;
};

export function MenuSection({
  category,
  selectedItems,
  onToggleItem,
}: MenuSectionProps) {
  return (
    <section
      id={`menu-${category.id}`}
      className="
        scroll-mt-28
        rounded-2xl
        border
        border-brand/10
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(90,24,39,0.04)]
        sm:rounded-3xl
        sm:p-7
        lg:p-8
      "
    >
      {/* Section heading */}
      <div className="mb-5 sm:mb-6">
        <div className="flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <span
              aria-hidden="true"
              className="h-2 w-2 rounded-full bg-accent"
            />

            <h3
              className="
                text-xl
                font-semibold
                leading-tight
                text-brand
                sm:text-2xl
              "
            >
              {category.title}
            </h3>
          </div>

          <span className="shrink-0 text-xs text-muted">
            {category.items.length}{" "}
            {category.items.length === 1
              ? "dish"
              : "dishes"}
          </span>
        </div>

        <div className="mt-3 h-px w-12 bg-accent/50" />
      </div>

      {/* Items */}
      <div>
        {category.items.map((item) => {
          const itemKey = `${category.id}:${item}`;

          return (
            <MenuItem
              key={itemKey}
              name={item}
              selected={selectedItems.has(itemKey)}
              onToggle={() =>
                onToggleItem(category, item)
              }
            />
          );
        })}
      </div>
    </section>
  );
}