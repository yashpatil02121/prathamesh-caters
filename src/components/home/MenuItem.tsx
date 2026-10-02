type MenuItemProps = {
  name: string;
  selected: boolean;
  onToggle: () => void;
};

export function MenuItem({
  name,
  selected,
  onToggle,
}: MenuItemProps) {
  return (
    <button
      type="button"
      onClick={onToggle}
      className="
        group
        flex
        w-full
        items-center
        justify-between
        gap-4
        border-b
        border-brand/8
        py-3.5
        text-left
        last:border-b-0
        sm:py-4
      "
    >
      <span
        className={`
          text-sm
          font-medium
          leading-5
          transition-colors
          duration-200
          sm:text-base
          ${
            selected
              ? "text-brand"
              : "text-body group-hover:text-brand"
          }
        `}
      >
        {name}
      </span>

      {/* Selection indicator */}
      <span
        className={`
          flex
          h-6
          w-6
          shrink-0
          items-center
          justify-center
          rounded-full
          border
          transition-all
          duration-200
          ${
            selected
              ? "border-brand bg-brand text-white"
              : "border-brand/20 bg-white text-transparent group-hover:border-accent"
          }
        `}
      >
        <CheckIcon />
      </span>
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