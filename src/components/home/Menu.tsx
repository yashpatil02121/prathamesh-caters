import { useMemo, useState } from "react";
import { menu } from "../../data/menu";
import { SectionHeading } from "../ui/SectionHeading";
import { MenuSection } from "./MenuSection";

export function Menu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredMenu = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    if (!query) {
      return activeCategory === "all"
        ? menu
        : menu.filter(
            (category) =>
              category.id === activeCategory,
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

  return (
    <section
      id="menu"
      className="bg-cream/40 py-20 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        <SectionHeading
          eyebrow="Our Menu"
          title="A taste for every celebration"
          description="Explore our selection of dishes, live counters, sweets, beverages and more."
        />

        <div className="mx-auto mt-10 max-w-2xl sm:mt-12">
          <div className="relative">
            <SearchIcon />

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

        <CategoryNavigation
          activeCategory={activeCategory}
          onCategoryChange={setActiveCategory}
        />

        <div className="mt-8 space-y-5 sm:mt-10 sm:space-y-6">
          {filteredMenu.length > 0 ? (
            filteredMenu.map((category) => (
              <MenuSection
                key={category.id}
                category={category}
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
    </section>
  );
}

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
        mt-8
        -mx-4
        overflow-x-auto
        px-4
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
            ? "border-brand bg-brand text-white shadow-sm"
            : "border-brand/10 bg-white text-body hover:border-brand/30 hover:text-brand"
        }
      `}
    >
      {label}
    </button>
  );
}

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