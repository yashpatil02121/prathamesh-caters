import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";

const steps = [
  {
    title: "Tell us about your event",
    description:
      "Share the occasion, date, venue and guest count through the form, a call or WhatsApp.",
  },
  {
    title: "Build your menu",
    description:
      "Pick your favourites from our menu or let us suggest a balanced spread for your guests.",
  },
  {
    title: "Plan the décor",
    description:
      "Choose a theme and style — traditional, elegant or vibrant — and we design the space around it.",
  },
  {
    title: "Celebrate stress-free",
    description:
      "We take care of the food, setup and service, so you can be with your guests.",
  },
];

export function Process() {
  return (
    <section
      id="process"
      className="bg-sand/50 py-20 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        <Reveal>
          <SectionHeading
            eyebrow="How It Works"
            title="From first call to last bite"
            description="A simple process — so planning your celebration feels as good as the celebration itself."
          />
        </Reveal>

        <ol className="relative mt-14 grid gap-8 sm:mt-16 md:grid-cols-2 lg:grid-cols-4 lg:gap-6">
          {/* Connecting line (desktop) */}
          <span
            aria-hidden="true"
            className="absolute left-[12.5%] right-[12.5%] top-7 hidden border-t border-dashed border-brand/25 lg:block"
          />

          {steps.map((step, index) => (
            <li key={step.title}>
              <Reveal
                delay={index * 120}
                className="relative flex gap-5 lg:flex-col lg:items-center lg:text-center"
              >
                <span className="relative z-10 flex h-14 w-14 shrink-0 items-center justify-center rounded-full bg-brand font-display text-xl font-semibold text-accent ring-8 ring-[#F7F2EA]">
                  {index + 1}
                </span>

                <div>
                  <h3 className="font-display text-xl font-semibold text-brand lg:mt-5">
                    {step.title}
                  </h3>

                  <p className="mt-2 text-sm leading-6 text-muted">
                    {step.description}
                  </p>
                </div>
              </Reveal>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
