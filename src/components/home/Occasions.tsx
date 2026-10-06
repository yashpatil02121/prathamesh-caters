import type { ReactNode } from "react";
import { occasions } from "../../data/occasions";
import type { Occasion } from "../../data/occasions";
import { startEnquiry } from "../../utils/enquiry";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import {
  ArrowRightIcon,
  BriefcaseIcon,
  CakeIcon,
  DiyaIcon,
  HeartIcon,
  HomeIcon,
  RingsIcon,
} from "../ui/Icons";

const icons: Record<Occasion["icon"], ReactNode> = {
  rings: <RingsIcon size={26} strokeWidth={1.5} />,
  heart: <HeartIcon size={26} strokeWidth={1.5} />,
  cake: <CakeIcon size={26} strokeWidth={1.5} />,
  diya: <DiyaIcon size={26} strokeWidth={1.5} />,
  home: <HomeIcon size={26} strokeWidth={1.5} />,
  briefcase: <BriefcaseIcon size={26} strokeWidth={1.5} />,
};

export function Occasions() {
  return (
    <section
      id="occasions"
      className="bg-pattern relative overflow-hidden bg-brand py-16 text-white sm:py-24 lg:py-32"
    >
      <div
        aria-hidden="true"
        className="absolute -left-40 top-1/3 h-96 w-96 rounded-full bg-accent/15 blur-3xl"
      />

      <div className="container-custom relative">
        <Reveal>
          <SectionHeading
            tone="dark"
            eyebrow="Occasions We Serve"
            title="Har mauka, ek naya andaaz"
            description="Whatever you're celebrating, we bring the food, the décor and the hospitality — tailored to the occasion."
          />
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-3 sm:mt-16 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 lg:gap-5">
          {occasions.map((occasion, index) => (
            <Reveal
              key={occasion.title}
              delay={(index % 3) * 90}
            >
              <button
                type="button"
                onClick={() => startEnquiry(occasion.eventType)}
                className="group grid h-full w-full grid-cols-[auto_minmax(0,1fr)] items-start gap-x-4 rounded-3xl border border-white/10 bg-white/[0.04] p-4 text-left backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent/50 hover:bg-white/[0.08] active:bg-white/[0.1] sm:flex sm:flex-col sm:p-8"
              >
                <span className="row-span-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-accent/15 sm:h-14 sm:w-14 text-accent transition-colors duration-300 group-hover:bg-accent group-hover:text-white">
                  {icons[occasion.icon]}
                </span>

                <h3 className="font-display text-xl font-semibold sm:mt-6 sm:text-2xl">
                  {occasion.title}
                </h3>

                <p className="mt-1 flex-1 text-sm leading-6 text-white/65 sm:mt-2">
                  {occasion.description}
                </p>

                <span className="mt-3 inline-flex items-center gap-2 text-sm font-semibold text-accent sm:mt-6">
                  Plan this event
                  <ArrowRightIcon
                    size={16}
                    className="transition-transform duration-300 group-hover:translate-x-1"
                  />
                </span>
              </button>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
