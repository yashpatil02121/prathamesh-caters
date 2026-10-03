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
            ? "border-brand ring-2 ring-brand/20"
            : "border-brand/10 hover:border-brand/30 hover:shadow-md"
        }
      `}
    >
      {/* Background image */}
      {image ? (
        <img
          src={image}
          alt=""
          aria-hidden="true"
          className="
            absolute
            inset-0
            h-full
            w-full
            object-cover
            transition-transform
            duration-500
            group-hover:scale-105
          "
        />
      ) : (
        /* Temporary background until images are added */
        <div
          className="
            absolute
            inset-0
            bg-gradient-to-br
            from-cream
            via-white
            to-cream
          "
        />
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
              ? "bg-brand/65"
              : "bg-gradient-to-t from-black/65 via-black/15 to-black/5 group-hover:from-black/70"
          }
        `}
      />

      {/* Selected indicator */}
      <span
        className={`
          absolute
          right-3
          top-3
          z-20
          flex
          h-7
          w-7
          items-center
          justify-center
          rounded-full
          border
          transition-all
          duration-200
          ${
            selected
              ? "border-white bg-accent text-white"
              : "border-white/70 bg-white/80 text-transparent backdrop-blur-sm"
          }
        `}
      >
        <CheckIcon />
      </span>

      {/* Item name */}
      <div
        className="
          absolute
          inset-x-0
          bottom-0
          z-10
          p-3
          sm:p-4
        "
      >
        <span
          className={`
            block
            text-sm
            font-semibold
            leading-tight
            drop-shadow-sm
            sm:text-base
            ${
              image
                ? "text-white"
                : "text-brand"
            }
          `}
        >
          {name}
        </span>
      </div>

      {/* Selected bottom accent */}
      <span
        className={`
          absolute
          bottom-0
          left-0
          z-20
          h-1
          bg-accent
          transition-all
          duration-300
          ${
            selected
              ? "w-full"
              : "w-0 group-hover:w-full"
          }
        `}
      />
    </button>
  );
}

function CheckIcon() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="m5 12 4 4L19 6" />
    </svg>
  );
}