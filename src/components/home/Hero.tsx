import { business, yearsOfExperience } from "../../config/business";
import { menu } from "../../data/menu";
import { Button } from "../ui/Button";
import {
  ArrowRightIcon,
  LeafIcon,
  SparkleIcon,
  WhatsAppIcon,
} from "../ui/Icons";
import { hasWhatsApp, whatsappLink } from "../../utils/whatsapp";
import foodImage from "../../assets/food.webp";
import paneerTikka from "../../assets/menu/paneer-tikka.webp";
import jalebi from "../../assets/menu/rabdi-with-jalebi.webp";

const dishCount = menu.reduce(
  (total, category) => total + category.items.length,
  0,
);

const liveCounterCount = menu.filter((category) =>
  /counter/i.test(category.title),
).length;

const stats = [
  {
    value: `${yearsOfExperience}+`,
    label: "Years of hospitality",
  },
  {
    value: `${Math.floor(dishCount / 10) * 10}+`,
    label: "Dishes to choose from",
  },
  {
    value: `${liveCounterCount}+`,
    label: "Live food counters",
  },
  {
    value: "100%",
    label: "Pure vegetarian",
  },
];

export function Hero() {
  return (
    <section
      id="home"
      className="relative isolate overflow-hidden bg-brand text-white"
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="bg-pattern absolute inset-0 -z-10"
      />

      <div
        aria-hidden="true"
        className="absolute -right-40 -top-40 -z-10 h-[28rem] w-[28rem] rounded-full bg-accent/25 blur-3xl"
      />

      <div
        aria-hidden="true"
        className="absolute -bottom-40 -left-40 -z-10 h-96 w-96 rounded-full bg-white/10 blur-3xl"
      />

      <div className="container-custom">
        <div className="grid items-center gap-12 pt-12 pb-16 sm:pt-16 lg:min-h-[calc(100svh-5rem)] lg:grid-cols-[1.05fr_1fr] lg:gap-10 lg:py-20">
          {/* Hero content */}
          <div className="relative z-10 max-w-xl lg:max-w-2xl">
            {/* Eyebrow */}
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.22em] text-accent backdrop-blur-sm sm:text-xs">
              <SparkleIcon size={14} />
              Since {business.since} · {business.brandName}
            </div>

            {/* Heading */}
            <h1 className="font-display text-[2.6rem] font-semibold leading-[1.05] tracking-tight sm:text-6xl lg:text-7xl">
              Har Khaas
              <span className="block italic text-accent">
                Mauke Ki,
              </span>
              <span className="block">Khaas Taiyaari.</span>
            </h1>

            {/* Description */}
            <p className="mt-6 max-w-md text-base leading-7 text-white/75 sm:text-lg sm:leading-8">
              Pure vegetarian catering, live counters and elegant
              décor — from the menu to the mandap, we take care of the
              details that make your celebration truly yours.
            </p>

            {/* CTA */}
            <div className="mt-9 flex flex-col gap-3 sm:flex-row sm:items-center">
              <Button
                href="#menu"
                variant="secondary"
                size="lg"
                className="w-full sm:w-auto"
              >
                Build Your Menu
                <ArrowRightIcon
                  size={18}
                  className="transition-transform group-hover/button:translate-x-1"
                />
              </Button>

              {hasWhatsApp() ? (
                <Button
                  href={whatsappLink(
                    `Hello ${business.name}! I'd like to enquire about catering for my event.`,
                  )}
                  external
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 text-white hover:border-white hover:bg-white hover:text-brand sm:w-auto"
                >
                  <WhatsAppIcon size={18} />
                  Chat on WhatsApp
                </Button>
              ) : (
                <Button
                  href="#contact"
                  variant="outline"
                  size="lg"
                  className="w-full border-white/30 text-white hover:border-white hover:bg-white hover:text-brand sm:w-auto"
                >
                  Get a Quote
                </Button>
              )}
            </div>

            {/* Trust chips */}
            <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3 text-sm text-white/70">
              {[
                "Catering + Décor under one roof",
                "Fully customisable menus",
              ].map((item) => (
                <li
                  key={item}
                  className="flex items-center gap-2"
                >
                  <span className="flex h-5 w-5 items-center justify-center rounded-full bg-accent/20 text-accent">
                    <LeafIcon size={12} />
                  </span>
                  {item}
                </li>
              ))}
            </ul>
          </div>

          {/* Hero visual */}
          <div className="relative mx-auto w-full max-w-xl lg:max-w-none">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] border border-white/10 shadow-2xl sm:aspect-[5/4] lg:aspect-[4/5] lg:rounded-[2.5rem]">
              <img
                src={foodImage}
                alt="A spread of freshly prepared dishes by Prathamesh Caterers"
                fetchPriority="high"
                className="absolute inset-0 h-full w-full object-cover"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-brand-dark/80 via-transparent to-transparent" />

              <div className="absolute left-5 top-5 rounded-full border border-white/20 bg-white/10 px-4 py-2 text-[10px] font-semibold uppercase tracking-[0.2em] backdrop-blur-md sm:left-7 sm:top-7">
                Sajti Shaamein. Mehakti Daawatein.
              </div>

              <div className="absolute bottom-6 left-6 right-6 sm:bottom-8 sm:left-8">
                <p className="font-display text-2xl italic sm:text-3xl">
                  “Swad jo yaad rahe.”
                </p>
              </div>
            </div>

            {/* Floating dish cards */}
            <FloatingDish
              image={paneerTikka}
              title="Paneer Tikka"
              subtitle="Signature starter"
              className="-left-4 top-[18%] hidden sm:flex lg:-left-10"
            />

            <FloatingDish
              image={jalebi}
              title="Jalebi Rabadi"
              subtitle="Live sweet counter"
              className="-right-3 bottom-[22%] hidden sm:flex lg:-right-6"
              delay
            />
          </div>
        </div>

        {/* Stats */}
        <dl className="relative grid grid-cols-2 gap-px overflow-hidden rounded-t-3xl border border-b-0 border-white/10 bg-white/10 lg:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="bg-brand-dark/60 px-5 py-6 text-center backdrop-blur-sm sm:py-8"
            >
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-display text-3xl font-semibold text-accent sm:text-4xl">
                {stat.value}
              </dd>
              <dd className="mt-1 text-xs uppercase tracking-[0.16em] text-white/60 sm:text-sm sm:normal-case sm:tracking-normal">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}

type FloatingDishProps = {
  image: string;
  title: string;
  subtitle: string;
  className?: string;
  delay?: boolean;
};

function FloatingDish({
  image,
  title,
  subtitle,
  className = "",
  delay = false,
}: FloatingDishProps) {
  return (
    <div
      aria-hidden="true"
      style={delay ? { animationDelay: "-3s" } : undefined}
      className={`animate-float-slow absolute items-center gap-3 rounded-2xl bg-white p-2.5 pr-5 text-brand shadow-[0_20px_50px_rgba(0,0,0,0.25)] ${className}`}
    >
      <img
        src={image}
        alt=""
        className="h-14 w-14 rounded-xl object-cover"
      />

      <div>
        <p className="text-sm font-semibold">{title}</p>
        <p className="text-xs text-muted">{subtitle}</p>
      </div>
    </div>
  );
}
