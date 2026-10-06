import type { MenuCategory } from "../../data/menu";
import { menuImages } from "../../data/menuImages";
import {
  selectionKey,
  useMenuSelection,
} from "../../context/menuSelection";
import { MenuItem } from "./MenuItem";

type MenuSectionProps = {
  category: MenuCategory;
};

export function MenuSection({ category }: MenuSectionProps) {
  const { selectedKeys, toggleItem } = useMenuSelection();

  const selectedCount = category.items.filter((item) =>
    selectedKeys.has(selectionKey(category.id, item)),
  ).length;

  return (
    <section
      id={`menu-${category.id}`}
      aria-labelledby={`menu-${category.id}-title`}
      className="scroll-mt-36 rounded-2xl border border-brand/10 bg-white p-3.5 shadow-[0_8px_30px_rgba(90,24,39,0.04)] sm:rounded-3xl sm:p-7 lg:p-8"
    >
      {/* Section heading */}
      <div className="mb-5 flex items-end justify-between gap-4 border-b border-brand/5 pb-4 sm:mb-6">
        <div>
          <h3
            id={`menu-${category.id}-title`}
            className="font-display text-xl font-semibold leading-tight text-brand sm:text-2xl"
          >
            {category.title}
          </h3>

          <div className="mt-2 h-0.5 w-10 rounded-full bg-accent" />
        </div>

        <span className="shrink-0 rounded-full bg-sand px-3 py-1 text-xs font-medium text-muted">
          {selectedCount > 0 && (
            <span className="font-semibold text-accent">
              {selectedCount} selected ·{" "}
            </span>
          )}
          {category.items.length}{" "}
          {category.items.length === 1 ? "dish" : "dishes"}
        </span>
      </div>

      {/* Items */}
      <div className="grid grid-cols-2 gap-2.5 sm:gap-4 md:grid-cols-3 xl:grid-cols-4">
        {category.items.map((item) => {
          const itemKey = selectionKey(category.id, item);

          return (
            <MenuItem
              key={itemKey}
              name={item}
              image={menuImages[item]}
              selected={selectedKeys.has(itemKey)}
              onToggle={() => toggleItem(category, item)}
            />
          );
        })}
      </div>
    </section>
  );
}
