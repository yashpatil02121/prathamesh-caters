import { Reveal } from "../ui/Reveal";
import { SectionHeading } from "../ui/SectionHeading";
import { PlusIcon } from "../ui/Icons";

/*
 * Keep answers factual — update these to match
 * your actual policies (advance booking, minimum guests, etc).
 */
const faqs = [
  {
    question: "Is all your food vegetarian?",
    answer:
      "Yes. Every dish on our menu is pure vegetarian — from starters and main course to live counters and desserts.",
  },
  {
    question: "Can I customise the menu for my event?",
    answer:
      "Absolutely. Use the menu builder above to pick the dishes you like, then download it as a PDF or send it to us on WhatsApp. We'll help you balance the spread for your guest count.",
  },
  {
    question: "Do you provide both catering and decoration?",
    answer:
      "Yes — we offer catering and event décor together, so you can plan the food and the setup with a single team.",
  },
  {
    question: "What live counters do you offer?",
    answer:
      "Popular choices include Chaat, Dosa, Chinese, Pasta + Pizza, Pav Bhaji and Fruit counters, plus specials like Paan, Mukhwas, Popcorn and Candy Floss.",
  },
  {
    question: "How do I get a quote?",
    answer:
      "Fill in the enquiry form below with your event details, or call / WhatsApp us directly. Quotes depend on the menu, guest count, venue and décor requirements.",
  },
  {
    question: "Are seasonal dishes always available?",
    answer:
      "Dishes marked “Seasonal” (like Aamras, Gajar Halwa or Undhiyu) depend on the time of year. We'll suggest the best alternatives if something is out of season.",
  },
];

export function Faq() {
  return (
    <section
      id="faq"
      className="bg-page py-16 sm:py-24 lg:py-32"
    >
      <div className="container-custom">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)] lg:gap-20">
          <Reveal>
            <SectionHeading
              align="left"
              eyebrow="FAQ"
              title="Questions, answered"
              description="Everything you might want to know before planning your celebration with us."
            />
          </Reveal>

          <div className="space-y-3">
            {faqs.map((faq, index) => (
              <Reveal
                key={faq.question}
                delay={index * 60}
              >
                <details
                  name="faq"
                  className="group rounded-2xl border border-brand/10 bg-white transition-shadow open:shadow-[0_12px_35px_rgba(90,24,39,0.07)]"
                >
                  <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-4 text-left text-[15px] font-semibold text-brand sm:p-6 sm:text-base [&::-webkit-details-marker]:hidden">
                    {faq.question}

                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-sand text-brand transition-all duration-300 group-open:rotate-45 group-open:bg-accent group-open:text-white">
                      <PlusIcon size={16} />
                    </span>
                  </summary>

                  <p className="-mt-1 px-4 pb-5 text-sm leading-7 text-muted sm:px-6 sm:pb-6">
                    {faq.answer}
                  </p>
                </details>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
