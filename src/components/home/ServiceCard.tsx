import { services } from "../../data/services";

type Service = (typeof services)[number];

type ServiceCardProps = Service;

export function ServiceCard({
  number,
  title,
  description,
  icon,
}: ServiceCardProps) {
  return (
    <article
      className="
        group
        relative
        overflow-hidden
        rounded-2xl
        border
        border-brand/10
        bg-white
        p-5
        shadow-[0_8px_30px_rgba(90,24,39,0.05)]
        transition-all
        duration-300
        hover:-translate-y-1
        hover:border-brand/20
        hover:shadow-[0_16px_40px_rgba(90,24,39,0.10)]
        sm:rounded-3xl
        sm:p-6
        lg:p-7
      "
    >
      {/* Decorative accent */}
      <div
        className="
          absolute
          -right-8
          -top-8
          h-24
          w-24
          rounded-full
          bg-cream
          transition-transform
          duration-500
          group-hover:scale-150
        "
      />

      {/* Number + Icon */}
      <div className="relative flex items-center justify-between">
        <span
          className="
            text-xs
            font-bold
            tracking-[0.15em]
            text-accent
          "
        >
          {number}
        </span>

        <ServiceIcon name={icon} />
      </div>

      {/* Content */}
      <div className="relative mt-8 sm:mt-10">
        <h3
          className="
            text-lg
            font-semibold
            leading-tight
            text-brand
            sm:text-xl
            lg:text-2xl
          "
        >
          {title}
        </h3>

        <p
          className="
            mt-3
            text-xs
            leading-5
            text-muted
            sm:text-sm
            sm:leading-6
          "
        >
          {description}
        </p>
      </div>

      {/* Bottom accent */}
      <div
        className="
          relative
          mt-6
          h-px
          w-8
          bg-accent
          transition-all
          duration-300
          group-hover:w-14
        "
      />
    </article>
  );
}

/* ----------------------------------------
   Service Icons
---------------------------------------- */

function ServiceIcon({
  name,
}: {
  name: Service["icon"];
}) {
  const commonProps = {
    width: 22,
    height: 22,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  if (name === "plate") {
    return (
      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="8" />
          <circle cx="12" cy="12" r="4" />
          <path d="M3 12h2" />
          <path d="M19 12h2" />
        </svg>
      </span>
    );
  }

  if (name === "flower") {
    return (
      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
        <svg {...commonProps}>
          <circle cx="12" cy="12" r="2" />
          <path d="M12 10C8 10 7 7 9 5c2-2 4 1 3 5" />
          <path d="M14 12c0-4 3-5 5-3 2 2-1 4-5 3" />
          <path d="M12 14c4 0 5 3 3 5-2 2-4-1-3-5" />
          <path d="M10 12c0 4-3 5-5 3-2-2 1-4 5-3" />
        </svg>
      </span>
    );
  }

  if (name === "fire") {
    return (
      <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
        <svg {...commonProps}>
          <path d="M12 3c1 4-3 5-3 9 0 2 1 3 3 3s3-1 3-3c0-2-1-3-2-5 4 2 5 5 5 8a6 6 0 0 1-12 0c0-4 2-7 6-12Z" />
        </svg>
      </span>
    );
  }

  return (
    <span className="relative z-10 flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white">
      <svg {...commonProps}>
        <path d="m12 3 1.6 5.4L19 10l-5.4 1.6L12 17l-1.6-5.4L5 10l5.4-1.6L12 3Z" />
        <path d="m19 16 .7 2.3L22 19l-2.3.7L19 22l-.7-2.3L16 19l2.3-.7L19 16Z" />
      </svg>
    </span>
  );
}