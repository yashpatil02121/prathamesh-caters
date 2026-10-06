import { useMemo, useRef, useState } from "react";
import { menu } from "../../data/menu";
import type { MenuCategory } from "../../data/menu";
import { menuImages } from "../../data/menuImages";
import { useMenuSelection } from "../../context/menuSelection";
import { SectionHeading } from "../ui/SectionHeading";
import { Reveal } from "../ui/Reveal";
import { CloseIcon, SearchIcon } from "../ui/Icons";
import { MenuSection } from "./MenuSection";
import { SelectedMenuSummary } from "./SelectedMenuSummary";

const featuredCategoryIds = [
  "starter",
  "paneer-main-course",
  "chat-counter-live",
  "dosa-counter-live",
  "sweets",
  "pasta-pizza-counter",
];

const searchSuggestions = ["Paneer", "Dosa", "Kulfi", "Pulao", "Halwa"];

function coverImage(category: MenuCategory) {
  return category.items
    .map((item) => menuImages[item])
    .find(Boolean);
}

export function Menu() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const resultsRef = useRef<HTMLDivElement>(null);
  const { selectedItems } = useMenuSelection();

  const selectCategory = (categoryId: string) => {
    setActiveCategory(categoryId);

    resultsRef.current?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  };

  const filteredMenu = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();

    const inCategory =
      activeCategory === "all"
        ? menu
        : menu.filter((category) => category.id === activeCategory);

    if (!query) {
      return inCategory;
    }

    return inCategory
      .map((category) => ({
        ...category,
        items: category.title.toLowerCase().includes(query)
          ? category.items
          : category.items.filter((item) =>
              item.toLowerCase().includes(query),
            ),
      }))
      .filter((category) => category.items.length > 0);
  }, [searchQuery, activeCategory]);

  const resultCount = filteredMenu.reduce(
    (total, category) => total + category.items.length,
    0,
  );

  return (
    <section
      id="menu"
      className="relative bg-sand/50 py-16 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        {/* Section heading */}
        <Reveal>
          <SectionHeading
            eyebrow="Our Menu"
            title="Swad Jo Yaad Rahe"
            description="Tap any dish to add it to your menu. When you're done, download it as a PDF or send it to us on WhatsApp for a quote."
          />
        </Reveal>

        {/* How the menu builder works */}
        <Reveal delay={100}>
          <ol className="mx-auto mt-6 flex max-w-2xl flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs font-medium text-muted sm:mt-8 sm:gap-x-5 sm:text-sm">
            {["Browse dishes", "Tap to select", "Download or share"].map(
              (step, index) => (
                <li
                  key={step}
                  className="flex items-center gap-2"
                >
                  <span className="flex h-6 w-6 items-center justify-center rounded-full bg-brand text-[11px] font-bold text-white">
                    {index + 1}
                  </span>
                  {step}
                </li>
              ),
            )}
          </ol>
        </Reveal>

        {/* Search */}
        <Reveal delay={150}>
          <div className="mx-auto mt-6 max-w-2xl sm:mt-10">
            <div className="relative">
              <span className="pointer-events-none absolute left-5 top-1/2 z-10 -translate-y-1/2 text-muted">
                <SearchIcon />
              </span>

              <input
                type="search"
                value={searchQuery}
                onChange={(event) => setSearchQuery(event.target.value)}
                placeholder="Search dishes, e.g. paneer, dosa, kulfi…"
                aria-label="Search dishes"
                className="h-14 w-full rounded-full border border-brand/10 bg-white pl-13 pr-12 text-base text-body shadow-[0_8px_30px_rgba(90,24,39,0.06)] outline-none transition-all placeholder:text-muted/70 focus:border-accent focus:ring-4 focus:ring-accent/10 sm:h-16 [&::-webkit-search-cancel-button]:hidden"
              />

              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  aria-label="Clear search"
                  className="absolute right-4 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full text-muted transition-colors hover:bg-cream hover:text-brand"
                >
                  <CloseIcon size={18} />
                </button>
              )}
            </div>

            <div className="scrollbar-none -mx-4 mt-3 flex items-center gap-2 overflow-x-auto px-4 text-xs sm:mx-0 sm:flex-wrap sm:justify-center sm:px-0">
              <span className="shrink-0 text-muted">Popular:</span>
              {searchSuggestions.map((suggestion) => (
                <button
                  key={suggestion}
                  type="button"
                  onClick={() => {
                    setSearchQuery(suggestion);
                    setActiveCategory("all");
                  }}
                  className="shrink-0 rounded-full border border-brand/10 bg-white/70 px-3.5 py-2 font-medium text-brand transition-colors hover:border-accent hover:text-accent"
                >
                  {suggestion}
                </button>
              ))}
            </div>
          </div>
        </Reveal>

        {/* Featured categories */}
        <FeaturedCategories onCategoryChange={selectCategory} />

        {/* Results */}
        <div
          ref={resultsRef}
          className="mt-10 scroll-mt-20 sm:mt-16"
        >
          {/* Sticky category navigation */}
          <div className="sticky top-16 z-30 -mx-4 border-y border-brand/5 bg-sand/90 px-4 py-3 backdrop-blur-md sm:mx-0 sm:rounded-full sm:border sm:px-3 lg:top-[4.5rem]">
            <CategoryNavigation
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
            />
          </div>

          <div className="mt-6 mb-4 flex items-center justify-between">
            <p className="text-xs text-muted sm:text-sm">
              Showing{" "}
              <span className="font-semibold text-brand">
                {resultCount}
              </span>{" "}
              {resultCount === 1 ? "dish" : "dishes"}
              {activeCategory !== "all" && (
                <>
                  {" "}in{" "}
                  <span className="font-semibold text-brand">
                    {menu.find((c) => c.id === activeCategory)?.title}
                  </span>
                </>
              )}
            </p>

            {(searchQuery || activeCategory !== "all") && (
              <button
                type="button"
                onClick={() => {
                  setSearchQuery("");
                  setActiveCategory("all");
                }}
                className="text-xs font-semibold text-accent hover:text-brand sm:text-sm"
              >
                Reset filters
              </button>
            )}
          </div>

          <div className="space-y-5 sm:space-y-6">
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

        {selectedItems.length > 0 && <SelectedMenuSummary />}
      </div>
    </section>
  );
}

/* =========================================================
   Featured Categories
========================================================= */

function FeaturedCategories({
  onCategoryChange,
}: {
  onCategoryChange: (category: string) => void;
}) {
  const categories = featuredCategoryIds
    .map((id) => menu.find((category) => category.id === id))
    .filter((category): category is MenuCategory => Boolean(category));

  return (
    <div className="mt-10 sm:mt-16">
      <div className="mb-5 flex items-end justify-between">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.2em] text-accent">
            Explore
          </p>

          <h3 className="mt-1 font-display text-2xl font-semibold text-brand">
            Popular Categories
          </h3>
        </div>

        <span className="text-xs text-muted sm:hidden">
          Swipe →
        </span>
      </div>

      <div className="scrollbar-none -mx-4 flex snap-x gap-3 overflow-x-auto px-4 pb-2 sm:mx-0 sm:grid sm:grid-cols-3 sm:gap-4 sm:overflow-visible sm:px-0 lg:grid-cols-6">
        {categories.map((category, index) => (
          <Reveal
            key={category.id}
            delay={index * 60}
            className="shrink-0 snap-start"
          >
            <FeaturedCategoryCard
              category={category}
              onClick={() => onCategoryChange(category.id)}
            />
          </Reveal>
        ))}
      </div>
    </div>
  );
}

function FeaturedCategoryCard({
  category,
  onClick,
}: {
  category: MenuCategory;
  onClick: () => void;
}) {
  const image = coverImage(category);

  return (
    <button
      type="button"
      onClick={onClick}
      className="group relative block aspect-[3/4] w-36 overflow-hidden rounded-2xl bg-brand text-left shadow-[0_10px_30px_rgba(90,24,39,0.12)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_18px_40px_rgba(90,24,39,0.22)] sm:w-full sm:rounded-3xl"
    >
      {image && (
        <img
          src={image}
          alt=""
          loading="lazy"
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      )}

      <div className="absolute inset-0 bg-gradient-to-t from-brand-dark via-brand-dark/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 p-4">
        <h4 className="font-display text-lg font-semibold leading-tight text-white">
          {category.title}
        </h4>

        <div className="mt-1.5 flex items-center justify-between">
          <span className="text-xs text-white/70">
            {category.items.length}{" "}
            {category.items.length === 1 ? "dish" : "dishes"}
          </span>

          <span className="text-sm text-accent transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </div>
      </div>

      <span
        aria-hidden="true"
        className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-full"
      />
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
    <div className="scrollbar-none overflow-x-auto">
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
            onClick={() => onCategoryChange(category.id)}
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
      aria-pressed={active}
      className={`
        shrink-0
        h-10
        rounded-full
        border
        px-4
        text-xs
        font-semibold
        transition-all
        duration-200
        sm:text-sm
        ${
          active
            ? "border-brand bg-brand text-white shadow-[0_6px_20px_rgba(90,24,39,0.18)]"
            : "border-brand/10 bg-white text-body hover:border-brand/30 hover:text-brand"
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

      <h3 className="mt-5 font-display text-2xl font-semibold text-brand">
        No dishes found
      </h3>

      <p className="mx-auto mt-2 max-w-md text-sm leading-6 text-muted">
        We couldn't find any menu items matching{" "}
        <span className="font-semibold text-body">"{searchQuery}"</span>.
        Don't worry — we can prepare many dishes on request. Just ask!
      </p>

      <button
        type="button"
        onClick={onClear}
        className="mt-5 rounded-full bg-brand px-5 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-accent"
      >
        View Full Menu
      </button>
    </div>
  );
}
