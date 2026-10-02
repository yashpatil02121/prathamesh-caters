import { services } from "../../data/services";
import { SectionHeading } from "../ui/SectionHeading";
import { ServiceCard } from "./ServiceCard";

export function Services() {
  return (
    <section
      id="services"
      className="bg-page py-20 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        {/* Section heading */}
        <SectionHeading
          eyebrow="What We Do"
          title="Everything your celebration needs"
          description="From delicious catering to beautiful event experiences, we help make your special occasion memorable."
        />

        {/* Service cards */}
        <div className="mt-12 grid grid-cols-2 gap-3 sm:mt-14 sm:gap-5 lg:mt-16 lg:grid-cols-4">
          {services.map((service) => (
            <ServiceCard
              key={service.number}
              {...service}
            />
          ))}
        </div>
      </div>
    </section>
  );
}