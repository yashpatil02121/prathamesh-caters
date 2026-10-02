import { business } from "../../config/business";
import { Button } from "../ui/Button";

export function Hero() {
  return (
    <section
      id="home"
      className="
        relative
        isolate
        overflow-hidden
        bg-brand
        text-white
      "
    >
      {/* Background decoration */}
      <div
        aria-hidden="true"
        className="
          absolute
          -right-32
          -top-32
          h-80
          w-80
          rounded-full
          bg-accent/20
          blur-3xl
        "
      />

      <div
        aria-hidden="true"
        className="
          absolute
          -bottom-32
          -left-32
          h-80
          w-80
          rounded-full
          bg-white/10
          blur-3xl
        "
      />

      <div className="container-custom relative">
        <div
          className="
            flex
            min-h-[calc(100svh-5rem)]
            flex-col
            justify-center
            py-12
            sm:py-16
            md:min-h-[calc(100svh-5rem)]
            md:py-20
            lg:min-h-[calc(100svh-5rem)]
          "
        >
          {/* Hero visual */}
          <div
            className="
              relative
              mb-10
              h-[42vh]
              min-h-[280px]
              overflow-hidden
              rounded-[28px]
              border
              border-white/10
              bg-gradient-to-br
              from-brand
              via-[#6d2033]
              to-[#35101b]
              shadow-2xl
              sm:h-[48vh]
              md:h-[55vh]
              lg:absolute
              lg:right-0
              lg:top-1/2
              lg:mb-0
              lg:h-[calc(100%-5rem)]
              lg:w-[52%]
              lg:-translate-y-1/2
              lg:rounded-l-[40px]
              lg:rounded-r-none
            "
          >
            {/* Decorative food/event visual */}
            <div
              className="
                absolute
                inset-0
                bg-[radial-gradient(circle_at_70%_30%,rgba(226,132,19,0.35),transparent_35%),radial-gradient(circle_at_30%_80%,rgba(255,255,255,0.12),transparent_30%)]
              "
            />

            <div
              className="
                absolute
                left-6
                top-6
                rounded-full
                border
                border-white/20
                bg-white/10
                px-4
                py-2
                text-[10px]
                font-semibold
                uppercase
                tracking-[0.2em]
                backdrop-blur-sm
                sm:left-8
                sm:top-8
              "
            >
              Catering & Decoration
            </div>

            {/* Center decorative element */}
            <div
              className="
                absolute
                left-1/2
                top-1/2
                flex
                h-32
                w-32
                -translate-x-1/2
                -translate-y-1/2
                items-center
                justify-center
                rounded-full
                border
                border-accent/50
                bg-black/10
                backdrop-blur-sm
                sm:h-40
                sm:w-40
              "
            >
              <div
                className="
                  flex
                  h-24
                  w-24
                  items-center
                  justify-center
                  rounded-full
                  border
                  border-white/20
                  bg-brand/50
                  text-center
                  sm:h-32
                  sm:w-32
                "
              >
                {/* <span className="text-xs font-medium uppercase tracking-[0.15em] text-white/90 sm:text-sm">
                  Celebrate
                  <br />
                  With Us
                </span> */}
              </div>
            </div>

            {/* Bottom visual label */}
            <div
              className="
                absolute
                bottom-5
                left-5
                right-5
                flex
                items-end
                justify-between
                sm:bottom-7
                sm:left-7
                sm:right-7
              "
            >
              <span className="text-xs uppercase tracking-[0.18em] text-white/60">
                Since your celebration
              </span>

              <span className="h-2 w-2 rounded-full bg-accent shadow-[0_0_18px_rgba(226,132,19,0.8)]" />
            </div>
          </div>

          {/* Hero content */}
          <div
            className="
              relative
              z-10
              max-w-xl
              lg:w-[52%]
              lg:max-w-2xl
              lg:pr-10
            "
          >
            {/* Eyebrow */}
            <div className="mb-5 flex items-center gap-3">
              <span className="h-px w-8 bg-accent sm:w-10" />

              <p className="text-xs font-semibold uppercase tracking-[0.28em] text-accent sm:text-sm">
                {business.brandName}
              </p>
            </div>

            {/* Heading */}
            <h1
              className="
                text-4xl
                font-semibold
                leading-[1.05]
                tracking-tight
                sm:text-5xl
                md:text-6xl
                lg:text-7xl
              "
            >
              Beautiful
              <span className="block text-accent">
                Celebrations.
              </span>

              <span className="block">
                Memorable
              </span>

              <span className="block">
                Flavours.
              </span>
            </h1>

            {/* Description */}
            <p
              className="
                mt-6
                max-w-md
                text-sm
                leading-6
                text-white/70
                sm:text-base
                sm:leading-7
              "
            >
              Premium catering and beautiful event experiences
              crafted for weddings, celebrations and special occasions.
            </p>

            {/* CTA */}
            <div
              className="
                mt-8
                flex
                flex-col
                gap-3
                sm:flex-row
                sm:items-center
              "
            >
              <Button
                href="#menu"
                variant="secondary"
                className="w-full sm:w-auto"
              >
                Explore Our Menu
              </Button>

              <Button
                href="#contact"
                variant="outline"
                className="
                  w-full
                  border-white/30
                  text-white
                  hover:border-brand
                  hover:bg-white
                  hover:text-brand
                  sm:w-auto
                "
              >
                Get a Quote
              </Button>
            </div>
          </div>

          {/* Scroll indicator */}
          {/* <a
            href="#services"
            className="
              relative
              z-10
              mt-10
              flex
              w-fit
              items-center
              gap-3
              text-[10px]
              font-medium
              uppercase
              tracking-[0.2em]
              text-white/50
              transition-colors
              hover:text-white
              lg:mt-12
            "
          >
            <span
              className="
                flex
                h-8
                w-5
                items-start
                justify-center
                rounded-full
                border
                border-white/20
                p-1
              "
            >
              <span className="h-1.5 w-0.5 animate-pulse rounded-full bg-accent" />
            </span>

            Scroll to explore
          </a> */}
        </div>
      </div>
    </section>
  );
}