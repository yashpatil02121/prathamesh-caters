import { useMemo, useState } from "react";
import { menu } from "../../data/menu";
import { SectionHeading } from "../ui/SectionHeading";
import { MenuSection } from "./MenuSection";
import type { MenuCategory } from "../../data/menu";
import type { SelectedMenuItem } from "../../types/menu";
import { SelectedMenuSummary } from "./SelectedMenuSummary";

export function Menu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const [selectedItems, setSelectedItems] = useState<
    SelectedMenuItem[]
    >([]);

  const featuredCategoryIds = [
    "starter",
    "veg-main-course",
    "paneer-main-course",
    "sweets",
    "chat-counter-live",
    "ice-cream",
  ];

  const selectedItemKeys = useMemo(
  () =>
    new Set(
      selectedItems.map(
        (item) =>
          `${item.categoryId}:${item.item}`,
      ),
    ),
  [selectedItems],
);

  const toggleItem = (
  category: MenuCategory,
  item: string,
) => {
  const itemKey = `${category.id}:${item}`;

  setSelectedItems((current) => {
    const exists = current.some(
      (selected) =>
        `${selected.categoryId}:${selected.item}` ===
        itemKey,
    );

    if (exists) {
      return current.filter(
        (selected) =>
          `${selected.categoryId}:${selected.item}` !==
          itemKey,
      );
    }

    return [
      ...current,
      {
        categoryId: category.id,
        categoryTitle: category.title,
        item,
      },
    ];
  });
};

  const filteredMenu = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return activeCategory === "all"
        ? menu
        : menu.filter(
            (category) => category.id === activeCategory,
          );
    }

    return menu
      .filter((category) => {
        if (
          activeCategory !== "all" &&
          category.id !== activeCategory
        ) {
          return false;
        }

        return (
          category.title.toLowerCase().includes(query) ||
          category.items.some((item) =>
            item.toLowerCase().includes(query),
          )
        );
      })
      .map((category) => ({
        ...category,
        items: category.items.filter((item) =>
          item.toLowerCase().includes(query),
        ),
      }))
      .filter(
        (category) =>
          category.items.length > 0 ||
          category.title.toLowerCase().includes(query),
      );
  }, [searchQuery, activeCategory]);

  const resultCount = filteredMenu.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  return (
    <section
      id="menu"
      className="bg-cream/40 py-20 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        {/* Section heading */}
        <SectionHeading
          eyebrow="Our Menu"
          title="A taste for every celebration"
          description="Explore our selection of dishes, live counters, sweets, beverages and more."
        />

        {/* Search */}
        <div className="mx-auto mt-10 max-w-2xl sm:mt-12">
          <div className="relative">
            {/* Search icon */}
            <span
              className="
                pointer-events-none
                absolute
                left-5
                top-1/2
                z-10
                -translate-y-1/2
                text-body
              "
            >
              <SearchIcon />
            </span>

            {/* Search input */}
            <input
              type="search"
              value={searchQuery}
              onChange={(event) =>
                setSearchQuery(event.target.value)
              }
              placeholder="Search dishes..."
              className="
                h-14
                w-full
                rounded-full
                border
                border-brand/10
                bg-white
                pl-12
                pr-12
                text-sm
                text-body
                shadow-[0_8px_30px_rgba(90,24,39,0.05)]
                outline-none
                transition-all
                placeholder:text-muted/70
                focus:border-accent
                focus:ring-2
                focus:ring-accent/10
                sm:h-16
                sm:text-base
              "
            />

            {/* Clear search */}
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery("")}
                aria-label="Clear search"
                className="
                  absolute
                  right-4
                  top-1/2
                  flex
                  h-8
                  w-8
                  -translate-y-1/2
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
            )}
          </div>
        </div>

        {/* Featured categories */}
        <FeaturedCategories
          categoryIds={featuredCategoryIds}
          onCategoryChange={setActiveCategory}
        />

        {/* Full menu navigation */}
        <div className="mt-10 sm:mt-12">
          <div className="mb-4">
            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
              Full Menu
            </p>

            <h3 className="mt-1 text-lg font-semibold text-brand sm:text-xl">
              Browse by category
            </h3>
          </div>

          <CategoryNavigation
            activeCategory={activeCategory}
            onCategoryChange={setActiveCategory}
          />
        </div>

        {/* Results */}
        <div className="mt-8 sm:mt-10">
          {filteredMenu.length > 0 && (
            <div className="mb-4 flex items-center justify-between">
              <p className="text-xs text-muted sm:text-sm">
                Showing{" "}
                <span className="font-semibold text-brand">
                  {resultCount}
                </span>{" "}
                dishes
              </p>

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="text-xs font-semibold text-accent hover:text-brand sm:text-sm"
                >
                  Clear search
                </button>
              )}
            </div>
          )}

          <div className="space-y-5 sm:space-y-6">
            {filteredMenu.length > 0 ? (
              filteredMenu.map((category) => (
               <MenuSection
                    key={category.id}
                    category={category}
                    selectedItems={selectedItemKeys}
                    onToggleItem={toggleItem}
                    />
              ))
            ) : (
              <EmptyState
                searchQuery={searchQuery}
                onClear={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
              />
            )}
          </div>
        </div>
                {selectedItems.length > 0 && (
            <SelectedMenuSummary
                selectedItems={selectedItems}
                onRemove={(item) => {
                setSelectedItems((current) =>
                    current.filter(
                    (selected) =>
                        !(
                        selected.categoryId === item.categoryId &&
                        selected.item === item.item
                        ),
                    ),
                );
                }}
                onClear={() => setSelectedItems([])}
            />
            )}
      </div>
    </section>
  );
}

/* =========================================================
   Featured Categories
========================================================= */

type FeaturedCategoriesProps = {
  categoryIds: string[];
  onCategoryChange: (category: string) => void;
};

function FeaturedCategories({
  categoryIds,
  onCategoryChange,
}: FeaturedCategoriesProps) {
  const categories = categoryIds
    .map((id) =>
      menu.find((category) => category.id === id),
    )
    .filter(
      (category): category is (typeof menu)[number] =>
        Boolean(category),
    );

  return (
    <div className="mt-10 sm:mt-12">
      <div className="mb-4 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Explore
          </p>

          <h3 className="mt-1 text-lg font-semibold text-brand sm:text-xl">
            Popular Categories
          </h3>
        </div>

        <span className="text-xs text-muted sm:text-sm">
          Swipe to explore
        </span>
      </div>

      <div
        className="
          -mx-4
          flex
          gap-3
          overflow-x-auto
          px-4
          pb-2
          scrollbar-none
          sm:mx-0
          sm:grid
          sm:grid-cols-2
          sm:gap-4
          sm:overflow-visible
          sm:px-0
          lg:grid-cols-3
        "
      >
        {categories.map((category) => (
          <FeaturedCategoryCard
            key={category.id}
            category={category}
            onClick={() => onCategoryChange(category.id)}
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Featured Category Card
========================================================= */

type FeaturedCategoryCardProps = {
  category: (typeof menu)[number];
  onClick: () => void;
};

function FeaturedCategoryCard({
  category,
  onClick,
}: FeaturedCategoryCardProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="
        group
        relative
        min-w-[190px]
        overflow-hidden
        rounded-2xl
        border
        border-brand/10
        bg-brand
        p-5
        text-left
        transition-all
        duration-300
        hover:-translate-y-1
        hover:shadow-xl
        sm:min-w-0
        sm:rounded-3xl
        sm:p-6
      "
    >
      {/* Decorative circle */}
      <span
        aria-hidden="true"
        className="
          absolute
          -right-10
          -top-10
          h-28
          w-28
          rounded-full
          bg-accent/20
          transition-transform
          duration-500
          group-hover:scale-150
        "
      />

      {/* Bottom accent */}
      <span
        aria-hidden="true"
        className="
          absolute
          bottom-0
          right-0
          h-1
          w-0
          bg-accent
          transition-all
          duration-300
          group-hover:w-full
        "
      />

      <div className="relative">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-white/10 text-accent">
          <span className="h-2 w-2 rounded-full bg-accent" />
        </span>

        <h4 className="mt-6 text-lg font-semibold leading-tight text-white">
          {category.title}
        </h4>

        <div className="mt-2 flex items-center justify-between">
          <span className="text-xs text-white/60">
            {category.items.length}{" "}
            {category.items.length === 1
              ? "dish"
              : "dishes"}
          </span>

          <span className="text-sm text-accent transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>
    </button>
  );
}

/* =========================================================
   Category Navigation
========================================================= */

type CategoryNavigationProps = {
  activeCategory: string;
  onCategoryChange: (category: string) => void;
};

function CategoryNavigation({
  activeCategory,
  onCategoryChange,
}: CategoryNavigationProps) {
  return (
    <div
      className="
        -mx-4
        overflow-x-auto
        px-4
        pb-2
        sm:mx-0
        sm:px-0
      "
    >
      <div className="flex w-max gap-2">
        <CategoryButton
          label="All"
          active={activeCategory === "all"}
          onClick={() => onCategoryChange("all")}
        />

        {menu.map((category) => (
          <CategoryButton
            key={category.id}
            label={category.title}
            active={activeCategory === category.id}
            onClick={() =>
              onCategoryChange(category.id)
            }
          />
        ))}
      </div>
    </div>
  );
}

/* =========================================================
   Category Button
========================================================= */

type CategoryButtonProps = {
  label: string;
  active: boolean;
  onClick: () => void;
};

function CategoryButton({
  label,
  active,
  onClick,
}: CategoryButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`
        shrink-0
        rounded-full
        border
        px-4
        py-2.5
        text-xs
        font-semibold
        transition-all
        duration-200
        sm:px-5
        sm:py-3
        sm:text-sm
        ${
          active
            ? "border-brand bg-brand text-white shadow-[0_6px_20px_rgba(90,24,39,0.18)]"
            : "border-brand/10 bg-white text-body hover:border-brand/30 hover:bg-cream hover:text-brand"
        }
      `}
    >
      {label}
    </button>
  );
}

/* =========================================================
   Empty State
========================================================= */

type EmptyStateProps = {
  searchQuery: string;
  onClear: () => void;
};

function EmptyState({
  searchQuery,
  onClear,
}: EmptyStateProps) {
  return (
    <div className="rounded-3xl border border-brand/10 bg-white px-6 py-12 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-cream text-brand">
        <SearchIcon />
      </div>

      <h3 className="mt-5 text-xl font-semibold text-brand">
        No dishes found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        We couldn't find any menu items matching{" "}
        <span className="font-semibold text-body">
          "{searchQuery}"
        </span>
        .
      </p>

      <button
        type="button"
        onClick={onClear}
        className="
          mt-5
          rounded-full
          bg-brand
          px-5
          py-2.5
          text-sm
          font-semibold
          text-white
          transition-colors
          hover:bg-accent
        "
      >
        View Full Menu
      </button>
    </div>
  );
}

/* =========================================================
   Icons
========================================================= */

function SearchIcon() {
  return (
    <svg
      width="20"
      height="20"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="m20 20-4-4" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg
      width="18"
      height="18"
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