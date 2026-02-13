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
      <div className="relative mx-auto max-w-5xl px-6">
        <div className="min-h-[180px] sm:min-h-[200px]">
          {slides.map((slide, index) => (
            <div
              key={slide.label}
              className="absolute inset-0 flex min-h-[180px] items-center gap-8 px-6 transition-opacity duration-500 sm:min-h-[200px] sm:gap-12"
              style={{
                opacity: index === activeIndex ? 1 : 0,
                pointerEvents: index === activeIndex ? "auto" : "none",
              }}
              aria-hidden={index !== activeIndex}
            >
              <img
                src="/images/fundraiserlogo.png"
                alt=""
                className="h-24 w-24 shrink-0 object-contain sm:h-32 sm:w-32"
              />
              <div className="flex flex-col justify-center">
                <div
                  className="mb-2 h-1 w-16 rounded-full bg-blueDeep sm:mb-3 sm:h-1.5 sm:w-20"
                  aria-hidden
                />
                <div className="flex flex-wrap items-center gap-3 gap-y-0 sm:gap-4">
                  <p className="text-7xl font-extrabold tracking-tight text-white sm:text-8xl md:text-9xl">
                    {slide.value.toLocaleString()}
                  </p>
                  <p className="text-xl font-bold text-white/95 sm:text-2xl md:text-3xl">
                    {slide.label}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        <div
          className="relative mt-12 flex justify-start gap-2 px-6"
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
    </section>
  );
}

export default StatsCarousel;
