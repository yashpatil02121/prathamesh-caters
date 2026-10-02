type MenuItemProps = {
  name: string;
};

export function MenuItem({ name }: MenuItemProps) {
  return (
    <div
      className="
        group
        flex
        items-center
        justify-between
        gap-4
        border-b
        border-brand/8
        py-3.5
        last:border-b-0
        sm:py-4
      "
    >
      <span
        className="
          text-sm
          font-medium
          leading-5
          text-body
          transition-colors
          duration-200
          group-hover:text-brand
          sm:text-base
        "
      >
        {name}
      </span>

      <span
        aria-hidden="true"
        className="
          h-1.5
          w-1.5
          shrink-0
          rounded-full
          bg-accent
          opacity-60
          transition-all
          duration-200
          group-hover:scale-150
          group-hover:opacity-100
        "
      />
    </div>
  );
}