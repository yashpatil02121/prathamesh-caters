import type { ReactNode } from "react";
import { services } from "../../data/services";
import { SparkleIcon } from "../ui/Icons";

type Service = (typeof services)[number];

type ServiceCardProps = Service;

export function ServiceCard({
  number,
  title,
  description,
  icon,
}: ServiceCardProps) {
  return (
    <article className="group relative h-full overflow-hidden rounded-2xl border border-brand/10 bg-white p-4 shadow-[0_8px_30px_rgba(90,24,39,0.05)] transition-all duration-500 hover:-translate-y-1.5 hover:border-transparent hover:bg-brand hover:shadow-[0_24px_50px_rgba(90,24,39,0.25)] sm:rounded-3xl sm:p-7 lg:p-8">
      {/* Decorative accent */}
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-cream transition-all duration-500 group-hover:scale-150 group-hover:bg-white/5" />

      {/* Icon + Number */}
      <div className="relative flex items-start justify-between">
        <ServiceIcon name={icon} />

        <span className="font-display text-3xl font-semibold text-brand/10 transition-colors duration-500 group-hover:text-white/15 sm:text-4xl">
          {number}
        </span>
      </div>

      {/* Content */}
      <div className="relative mt-6 sm:mt-12">
        <h3 className="font-display text-lg font-semibold leading-tight text-brand transition-colors duration-500 group-hover:text-white sm:text-2xl">
          {title}
        </h3>

        <p className="mt-3 text-xs leading-5 text-muted transition-colors duration-500 group-hover:text-white/70 sm:text-sm sm:leading-6">
          {description}
        </p>
      </div>

      {/* Bottom accent */}
      <div className="relative mt-6 h-0.5 w-8 rounded-full bg-accent transition-all duration-500 group-hover:w-16" />
    </article>
  );
}

/* ----------------------------------------
   Service Icons
---------------------------------------- */

function ServiceIcon({ name }: { name: Service["icon"] }) {
  const commonProps = {
    width: 24,
    height: 24,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
    "aria-hidden": true,
  };

  const icons: Record<Service["icon"], ReactNode> = {
    plate: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="8" />
        <circle cx="12" cy="12" r="4" />
        <path d="M3 12h2" />
        <path d="M19 12h2" />
      </svg>
    ),
    flower: (
      <svg {...commonProps}>
        <circle cx="12" cy="12" r="2" />
        <path d="M12 10C8 10 7 7 9 5c2-2 4 1 3 5" />
        <path d="M14 12c0-4 3-5 5-3 2 2-1 4-5 3" />
        <path d="M12 14c4 0 5 3 3 5-2 2-4-1-3-5" />
        <path d="M10 12c0 4-3 5-5 3-2-2 1-4 5-3" />
      </svg>
    ),
    fire: (
      <svg {...commonProps}>
        <path d="M12 3c1 4-3 5-3 9 0 2 1 3 3 3s3-1 3-3c0-2-1-3-2-5 4 2 5 5 5 8a6 6 0 0 1-12 0c0-4 2-7 6-12Z" />
      </svg>
    ),
    sparkle: <SparkleIcon size={24} strokeWidth={1.6} />,
  };

  return (
    <span className="relative z-10 flex h-12 w-12 items-center justify-center rounded-2xl bg-brand text-accent transition-colors duration-500 group-hover:bg-accent group-hover:text-white sm:h-14 sm:w-14">
      {icons[name]}
    </span>
  );
}
