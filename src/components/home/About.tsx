import { business, yearsOfExperience } from "../../config/business";
import { Button } from "../ui/Button";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import thali from "../../assets/menu/paneer-makhanwala.webp";
import sweets from "../../assets/menu/rasmalai.webp";
import chaat from "../../assets/menu/dahi-papdi-chat.webp";

const highlights = [
  {
    number: "01",
    title: "Daawat Ka Swad",
    description:
      "Thoughtfully prepared menus with plenty of choices for every celebration and every guest.",
  },
  {
    number: "02",
    title: "Sajawat Ka Andaaz",
    description:
      "Décor designed around your occasion, from elegant and traditional to vibrant and contemporary.",
  },
  {
    number: "03",
    title: "Mehmaan-Nawazi Ka Ehsaas",
    description:
      "Because a memorable celebration isn't just about how it looks or tastes, it's about how your guests feel.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="overflow-hidden bg-sand/50 py-16 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-16 lg:grid-cols-2 lg:items-center lg:gap-20">
          {/* Image collage */}
          <Reveal className="relative mx-auto w-full max-w-lg lg:max-w-none">
            <div className="grid grid-cols-5 grid-rows-6 gap-3 sm:gap-4">
              <img
                src={thali}
                alt="Paneer Makhanwala"
                loading="lazy"
                className="col-span-3 row-span-6 h-full w-full rounded-3xl object-cover shadow-xl"
              />
              <img
                src={sweets}
                alt="Rasmalai"
                loading="lazy"
                className="col-span-2 row-span-3 aspect-square h-full w-full rounded-3xl object-cover shadow-xl"
              />
              <img
                src={chaat}
                alt="Dahi Papdi Chaat"
                loading="lazy"
                className="col-span-2 row-span-3 aspect-square h-full w-full rounded-3xl object-cover shadow-xl"
              />
            </div>

            {/* Experience badge */}
            <div className="absolute -bottom-6 left-1/2 flex -translate-x-1/2 items-center gap-4 rounded-2xl bg-brand px-6 py-4 text-white shadow-[0_20px_40px_rgba(90,24,39,0.35)] sm:left-auto sm:right-8 sm:translate-x-0">
              <span className="font-display text-4xl font-semibold text-accent">
                {yearsOfExperience}+
              </span>
              <span className="text-xs uppercase leading-tight tracking-[0.15em] text-white/80">
                Years of
                <br />
                celebrations
              </span>
            </div>
          </Reveal>

          {/* Content */}
          <div>
            <Reveal>
              <SectionHeading
                align="left"
                eyebrow="About Us"
                title="Aapki Khushiyan. Hamari Zimmedari."
                description={`Since ${business.since}, ${business.name} has been bringing together delicious food, beautiful décor and warm hospitality for celebrations that bring families and loved ones together.`}
              />
            </Reveal>

            <div className="mt-8 space-y-3 sm:mt-10 sm:space-y-4">
              {highlights.map((item, index) => (
                <Reveal
                  key={item.number}
                  delay={index * 100}
                >
                  <AboutHighlight {...item} />
                </Reveal>
              ))}
            </div>

            <Reveal className="mt-8 sm:mt-10">
              <Button href="#contact">Plan Your Event</Button>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}

type AboutHighlightProps = {
  number: string;
  title: string;
  description: string;
};

function AboutHighlight({
  number,
  title,
  description,
}: AboutHighlightProps) {
  return (
    <article className="group relative overflow-hidden rounded-2xl border border-brand/10 bg-white p-5 transition-all duration-300 hover:-translate-y-0.5 hover:border-brand/20 hover:shadow-[0_12px_35px_rgba(90,24,39,0.07)] sm:rounded-3xl sm:p-6">
      {/* Decorative accent */}
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-accent transition-all duration-300 group-hover:w-full" />

      <div className="flex gap-4 sm:gap-5">
        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-brand font-display text-sm font-semibold text-accent">
          {number}
        </div>

        <div>
          <h3 className="font-display text-lg font-semibold text-brand sm:text-xl">
            {title}
          </h3>

          <p className="mt-1.5 text-sm leading-6 text-muted">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}
