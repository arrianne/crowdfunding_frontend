import { useState, useEffect } from "react";

const SLIDE_DURATION_MS = 3500;

function StatsCarousel({ totalFundraisers, totalPledges, fundedCount }) {
  const slides = [
    {
      value: totalFundraisers,
      label: "Fundraisers on the platform",
    },
    {
      value: totalPledges,
      label: "Pledges made",
    },
    {
      value: fundedCount,
      label: "Fully funded",
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setActiveIndex((i) => (i + 1) % slides.length);
    }, SLIDE_DURATION_MS);
    return () => clearInterval(id);
  }, [slides.length]);

  return (
    <section
      className="relative w-screen left-1/2 -ml-[50vw] overflow-hidden bg-pinky pb-14 pt-12"
      aria-label="Platform statistics"
    >
      <div className="relative mx-auto max-w-4xl px-6 flex flex-col lg:flex-row lg:items-center gap-10 lg:gap-12">
        {}
        <div className="flex flex-col items-center lg:w-1/2 lg:flex-shrink-0">
          <p className="mt-5 w-full max-w-md border-b-2 border-blueDeep pb-3 text-left text-lg font-semibold text-white sm:max-w-lg sm:text-xl">
            Communal living is better when neighbours can come together.
          </p>
          <p className="mt-4 w-full max-w-md text-left text-base text-white/95 leading-relaxed sm:max-w-lg sm:text-lg">
            StrataBoost makes it easy for strata communities to raise funds for
            shared spaces, repairs, and improvements — simply, transparently,
            and without the stress.
          </p>
        </div>

        {}
        <div className="flex flex-col items-center lg:w-1/2 lg:flex-shrink-0 lg:justify-center">
          <div className="relative min-h-[140px] w-full max-w-sm sm:min-h-[160px]">
            {slides.map((slide, index) => (
              <div
                key={slide.label}
                className="absolute inset-0 flex flex-col items-center justify-center gap-1 transition-opacity duration-500"
                style={{
                  opacity: index === activeIndex ? 1 : 0,
                  pointerEvents: index === activeIndex ? "auto" : "none",
                }}
                aria-hidden={index !== activeIndex}
              >
                <p className="text-7xl font-extrabold tracking-tight text-white sm:text-8xl md:text-9xl lg:text-[7rem] xl:text-8xl">
                  {slide.value.toLocaleString()}
                </p>
                <p className="text-sm font-semibold text-white/90 sm:text-base md:text-lg">
                  {slide.label}
                </p>
              </div>
            ))}
          </div>

          {/* Dots */}
          <div
            className="mt-8 flex justify-center gap-2"
            role="tablist"
            aria-label="Stats carousel"
          >
            {slides.map((_, index) => (
              <button
                key={index}
                type="button"
                role="tab"
                aria-selected={index === activeIndex}
                aria-label={`Show stat ${index + 1}`}
                className={`h-2.5 w-2.5 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-pinky ${
                  index === activeIndex ? "bg-white" : "bg-white/50"
                }`}
                onClick={() => setActiveIndex(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default StatsCarousel;
