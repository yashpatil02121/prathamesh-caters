import { CheckIcon, PlusIcon } from "../ui/Icons";

type MenuItemProps = {
  name: string;
  selected: boolean;
  onToggle: () => void;
  image?: string;
};

export function MenuItem({
  name,
  selected,
  onToggle,
  image,
}: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      aria-pressed={selected}
      aria-label={`${selected ? "Remove" : "Add"} ${name}`}
      className={`
        group
        relative
        aspect-[4/3]
        w-full
        overflow-hidden
        rounded-xl
        border
        text-left
        transition-all
        duration-300
        sm:rounded-2xl
        ${
          selected
            ? "border-accent ring-2 ring-accent/40 ring-offset-2"
            : "border-brand/10 hover:-translate-y-0.5 hover:border-brand/30 hover:shadow-[0_12px_30px_rgba(90,24,39,0.15)]"
        }
      `}
    >
      {/* Background image */}
      {image ? (
        <img
          src={image}
          alt=""
          loading="lazy"
          decoding="async"
          className={`
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            ${selected ? "scale-105" : "group-hover:scale-105"}
          `}
        />
      ) : (
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-sand via-white to-cream">
          <span className="font-display text-5xl text-brand/10 sm:text-6xl">
            {name.charAt(0)}
          </span>
        </div>
      )}

      {/* Image overlay */}
      <div
        className={`
          absolute
          inset-0
          transition-all
          duration-300
          ${
            selected
              ? "bg-gradient-to-t from-brand via-brand/50 to-brand/10"
              : image
                ? "bg-gradient-to-t from-black/70 via-black/10 to-transparent"
                : ""
          }
        `}
      />

      {/* Veg marker */}
      <span
        aria-hidden="true"
        title="Vegetarian"
        className="absolute left-2.5 top-2.5 z-20 flex h-4 w-4 items-center justify-center rounded-[3px] border-[1.5px] border-green-700 bg-white sm:left-3 sm:top-3"
      >
        <span className="h-1.5 w-1.5 rounded-full bg-green-700" />
      </span>

      {/* Selected indicator */}
      <span
        className={`
          absolute
          right-2.5
          top-2.5
          z-20
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          shadow-sm
          transition-all
          duration-200
          sm:right-3
          sm:top-3
          ${
            selected
              ? "scale-110 bg-accent text-white"
              : "bg-white/90 text-brand backdrop-blur-sm group-hover:bg-white"
          }
        `}
      >
        {selected ? <CheckIcon size={14} /> : <PlusIcon size={14} strokeWidth={2.2} />}
      </span>

      {/* Item name */}
      <div className="absolute inset-x-0 bottom-0 z-10 p-3 sm:p-4">
        <span
          className={`
            block
            text-sm
            font-semibold
            leading-tight
            drop-shadow-sm
            sm:text-base
            ${image || selected ? "text-white" : "text-brand"}
          `}
        >
          {name}
        </span>

        {selected && (
          <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.15em] text-accent">
            Added to menu
          </span>
        )}
      </div>
    </button>
  );
}
