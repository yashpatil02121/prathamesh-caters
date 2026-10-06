import { services } from "../../data/services";
import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section
      id="services"
      className="bg-page py-16 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        {/* Section heading */}
        <Reveal>
          <SectionHeading
            eyebrow="What We Do"
            title="Everything your celebration needs"
            description="From delicious catering to beautiful event experiences, we help make your special occasion memorable."
          />
        </Reveal>

        {/* Service cards */}
        <div className="mt-10 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:mt-16 lg:grid-cols-4">
          {services.map((service, index) => (
            <Reveal
              key={service.number}
              delay={index * 90}
            >
              <ServiceCard {...service} />
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
