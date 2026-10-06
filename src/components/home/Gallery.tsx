import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { gallery } from "../../data/gallery";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  CloseIcon,
  SearchIcon,
} from "../ui/Icons";

const categories = [
  "All",
  ...Array.from(new Set(gallery.map((image) => image.category))),
];

export function Gallery() {
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const images = useMemo(
    () =>
      activeCategory === "All"
        ? gallery
        : gallery.filter((image) => image.category === activeCategory),
    [activeCategory],
  );

  return (
    <section
      id="gallery"
      className="bg-page py-16 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        <Reveal>
          <SectionHeading
            eyebrow="Gallery"
            title="A taste of what we serve"
            description="A glimpse of the dishes our guests keep coming back for."
          />
        </Reveal>

        {/* Filters */}
        <div className="scrollbar-none -mx-4 mt-8 overflow-x-auto px-4 sm:mx-0 sm:mt-10 sm:px-0">
          <div
            role="tablist"
            aria-label="Gallery categories"
            className="flex w-max gap-2 sm:mx-auto"
          >
            {categories.map((category) => {
              const active = category === activeCategory;

              return (
                <button
                  key={category}
                  type="button"
                  role="tab"
                  aria-selected={active}
                  onClick={() => setActiveCategory(category)}
                  className={`
                    h-10
                    shrink-0
                    rounded-full
                    px-5
                    text-sm
                    font-semibold
                    transition-all
                    ${
                      active
                        ? "bg-brand text-white shadow-[0_6px_20px_rgba(90,24,39,0.18)]"
                        : "bg-sand/70 text-body hover:bg-sand hover:text-brand"
                    }
                  `}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Grid */}
        <div className="mt-8 grid auto-rows-[150px] grid-cols-2 gap-2.5 sm:mt-10 sm:auto-rows-[200px] sm:gap-4 md:grid-cols-3 lg:auto-rows-[220px] lg:grid-cols-4">
          {images.map((image, index) => (
            <button
              key={`${activeCategory}-${image.title}`}
              type="button"
              onClick={() => setLightboxIndex(index)}
              aria-label={`View ${image.title}`}
              className={`
                animate-fade-in
                group
                relative
                overflow-hidden
                rounded-2xl
                bg-sand
                ${index % 5 === 0 ? "row-span-2" : ""}
              `}
            >
              <img
                src={image.src}
                alt={image.title}
                loading="lazy"
                decoding="async"
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-brand-dark/85 via-brand-dark/10 to-transparent p-4 opacity-100 transition-opacity duration-300 sm:opacity-0 sm:group-hover:opacity-100">
                <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-accent">
                  {image.category}
                </span>
                <span className="mt-1 text-left font-display text-base font-semibold text-white sm:text-lg">
                  {image.title}
                </span>
              </div>

              <span className="absolute right-3 top-3 hidden h-9 w-9 items-center justify-center rounded-full bg-white/90 text-brand opacity-0 transition-opacity duration-300 group-hover:opacity-100 sm:flex">
                <SearchIcon size={16} />
              </span>
            </button>
          ))}
        </div>
      </div>

      {lightboxIndex !== null && (
        <Lightbox
          images={images}
          index={lightboxIndex}
          onChange={setLightboxIndex}
          onClose={() => setLightboxIndex(null)}
        />
      )}
    </section>
  );
}

/* =========================================================
   Lightbox
========================================================= */

type LightboxProps = {
  images: typeof gallery;
  index: number;
  onChange: (index: number) => void;
  onClose: () => void;
};

function Lightbox({
  images,
  index,
  onChange,
  onClose,
}: LightboxProps) {
  const image = images[index];
  const touchStartX = useRef<number | null>(null);

  const step = useCallback(
    (direction: 1 | -1) =>
      onChange((index + direction + images.length) % images.length),
    [index, images.length, onChange],
  );

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") onClose();
      if (event.key === "ArrowRight") step(1);
      if (event.key === "ArrowLeft") step(-1);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [onClose, step]);

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label={image.title}
      onClick={onClose}
      onTouchStart={(event) => {
        touchStartX.current = event.touches[0].clientX;
      }}
      onTouchEnd={(event) => {
        if (touchStartX.current === null) return;

        const deltaX = event.changedTouches[0].clientX - touchStartX.current;
        touchStartX.current = null;

        if (Math.abs(deltaX) > 50) step(deltaX < 0 ? 1 : -1);
      }}
      className="animate-fade-in fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
    >
      <button
        type="button"
        onClick={onClose}
        aria-label="Close"
        autoFocus
        className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full bg-white/10 text-white transition-colors hover:bg-white hover:text-brand"
      >
        <CloseIcon size={22} />
      </button>

      <LightboxArrow
        direction="previous"
        onClick={() => step(-1)}
      />

      <figure
        onClick={(event) => event.stopPropagation()}
        className="animate-pop-in max-w-4xl"
      >
        <img
          key={image.src}
          src={image.src}
          alt={image.title}
          className="max-h-[70svh] w-auto rounded-2xl object-contain shadow-2xl"
        />

        <figcaption className="mt-4 flex items-center justify-between gap-4 text-white">
          <span>
            <span className="block text-xs font-semibold uppercase tracking-[0.18em] text-accent">
              {image.category}
            </span>
            <span className="font-display text-xl">{image.title}</span>
          </span>

          <span className="shrink-0 text-right text-sm text-white/60">
            {index + 1} / {images.length}
            <span className="block text-xs sm:hidden">Swipe ←→</span>
          </span>
        </figcaption>
      </figure>

      <LightboxArrow
        direction="next"
        onClick={() => step(1)}
      />
    </div>
  );
}

function LightboxArrow({
  direction,
  onClick,
}: {
  direction: "previous" | "next";
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      aria-label={`${direction === "next" ? "Next" : "Previous"} image`}
      onClick={(event) => {
        event.stopPropagation();
        onClick();
      }}
      className={`
        absolute
        top-1/2
        z-10
        hidden
        h-12
        w-12
        -translate-y-1/2
        items-center
        justify-center
        rounded-full
        bg-white/10
        text-white
        transition-colors
        hover:bg-white
        hover:text-brand
        sm:flex
        ${direction === "next" ? "right-6" : "left-6"}
      `}
    >
      {direction === "next" ? (
        <ChevronRightIcon size={24} />
      ) : (
        <ChevronLeftIcon size={24} />
      )}
    </button>
  );
}
