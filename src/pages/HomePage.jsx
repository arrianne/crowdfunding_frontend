import useFundraisers from "../hooks/use-fundraisers";
import useBuildings from "../hooks/use-buildings";
import { Link } from "react-router-dom";

import FundraiserCard from "../components/FundraiserCard";

function HomePage() {
  const { fundraisers } = useFundraisers();
  const { buildings } = useBuildings();

  const buildingsById = Object.fromEntries(buildings.map((b) => [b.id, b]));

  console.log("Buildings:", buildings);
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-blueDeep">
        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-56 md:pt-36 lg:pb-64">
          <div className="max-w-2xl">
            {/* Tag */}
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30">
              Neighbours helping neighbours ✨
            </p>

            {/* Headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-blueSky sm:text-5xl md:text-6xl">
              Raise help, not stress.
            </h1>

            {/* Supporting copy */}
            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
              Start a fundraiser for your strata repairs, community projects, or
              a neighbour who needs a boost — and make it easy for people to
              chip in.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Link
                to="/fundraisers/new"
                className="rounded-xl bg-pinky px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
              >
                Start a fundraiser
              </Link>

              <Link
                to="/fundraisers"
                className="rounded-xl bg-white/20 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/30 transition"
              >
                Browse fundraisers
              </Link>
            </div>
          </div>
        </div>

        {/* Building image pinned bottom-right */}
        <div className="pointer-events-none absolute bottom-0 right-0 z-10 max-h-[420px] overflow-hidden">
          <img
            src="/images/hero-building.png"
            alt=""
            className="w-[650px] sm:w-[780px] md:w-[920px] lg:w-[1080px] opacity-95"
          />
        </div>

        {/* Curve divider (must be inside hero) */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="block h-20 w-full"
          >
            <path
              d="M0,40 C240,80 480,80 720,60 960,40 1200,20 1440,0 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>
      {/* CONTENT */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-24 pb-28">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
                Recent fundraisers
              </h2>

              <p className="mt-2 max-w-2xl text-base text-blueDeep/80">
                Small acts, big impact — see what neighbours are raising funds
                for right now.
              </p>
            </div>

            <p className="text-sm font-semibold text-blueDeep/70">
              Small acts. Big impact.
            </p>
          </div>

          <div className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3">
            {fundraisers.map((fundraiserData) => {
              const building = buildingsById[fundraiserData.building];

              return (
                <FundraiserCard
                  key={fundraiserData.id}
                  fundraiserData={fundraiserData}
                  building={building} // ✅ pass the matched building object
                />
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;
