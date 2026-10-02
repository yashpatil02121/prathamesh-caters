import { Button } from "../ui/Button";
import { SectionHeading } from "../ui/SectionHeading";

const highlights = [
  {
    number: "01",
    title: "Thoughtful Catering",
    description:
      "A wide selection of dishes and menu options for celebrations, gatherings and special occasions.",
  },
  {
    number: "02",
    title: "Beautiful Decoration",
    description:
      "Event spaces designed with attention to atmosphere, presentation and the occasion.",
  },
  {
    number: "03",
    title: "Complete Experience",
    description:
      "Catering and decoration brought together to create a memorable celebration for your guests.",
  },
];

export function About() {
  return (
    <section
      id="about"
      className="bg-page py-20 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        <div className="grid gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center lg:gap-20">
          
          {/* Left content */}
          <div>
            <SectionHeading
              align="left"
              eyebrow="About Us"
              title="We bring food, beauty and celebration together."
              description="Prathamesh Decorators & Caters brings together catering and event decoration to help create beautiful celebrations with memorable food and experiences."
            />

            <div className="mt-8 sm:mt-10">
              <Button href="#contact">
                Plan Your Event
              </Button>
            </div>
          </div>

          {/* Right highlights */}
          <div className="space-y-3 sm:space-y-4">
            {highlights.map((item) => (
              <AboutHighlight
                key={item.number}
                {...item}
              />
            ))}
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
        transition-all
        duration-300
        hover:-translate-y-0.5
        hover:border-brand/20
        hover:shadow-[0_12px_35px_rgba(90,24,39,0.07)]
        sm:rounded-3xl
        sm:p-6
      "
    >
      {/* Decorative accent */}
      <div
        className="
          absolute
          bottom-0
          left-0
          h-1
          w-0
          bg-accent
          transition-all
          duration-300
          group-hover:w-full
        "
      />

      <div className="flex gap-4 sm:gap-5">
        {/* Number */}
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-cream text-xs font-bold tracking-[0.1em] text-accent sm:h-11 sm:w-11">
          {number}
        </div>

        {/* Content */}
        <div>
          <h3 className="text-base font-semibold text-brand sm:text-lg">
            {title}
          </h3>

          <p className="mt-2 text-sm leading-6 text-muted">
            {description}
          </p>
        </div>
      </div>
    </article>
  );
}