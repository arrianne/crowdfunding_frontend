import useFundraisers from "../hooks/use-fundraisers";
import useBuildings from "../hooks/use-buildings";
import { useAuth } from "../hooks/use-auth";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

import FundraiserCard from "../components/FundraiserCard";
import FundraiserStatusFilter from "../components/FundraiserStatusFilter";
import StatsCarousel from "../components/StatsCarousel";

function HomePage() {
  const { fundraisers } = useFundraisers();
  const { buildings } = useBuildings();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const username = auth?.username;

  const handleClick = () => {
    if (auth?.token) {
      navigate("/fundraisers/new");
    } else {
      navigate("/login", { state: { from: { pathname: "/fundraisers/new" } } });
    }
  };

  const buildingsById = Object.fromEntries(buildings.map((b) => [b.id, b]));

  // Filter state: "all" | "open" | "closed"
  const [statusFilter, setStatusFilter] = useState("all");

  // Simple derived lists (no useMemo)
  const openFundraisers = fundraisers.filter((f) => !!f.is_open);
  const closedFundraisers = fundraisers.filter((f) => !f.is_open);

  // Counts for the filter pills
  const counts = {
    all: fundraisers.length,
    open: openFundraisers.length,
    closed: closedFundraisers.length,
  };

  // Stats for the carousel (pledges: sum from list if API includes them)
  const totalPledges = fundraisers.reduce(
    (sum, f) =>
      sum +
      (Array.isArray(f.pledges)
        ? f.pledges.length
        : Number(f.pledge_count) || 0),
    0,
  );
  const fundedCount = fundraisers.filter((f) => Boolean(f.is_funded)).length;

  // Apply filter
  let visibleFundraisers = fundraisers;
  if (statusFilter === "open") visibleFundraisers = openFundraisers;
  if (statusFilter === "closed") visibleFundraisers = closedFundraisers;

  // Sort by most recently created first
  visibleFundraisers = [...visibleFundraisers].sort(
    (a, b) => new Date(b.created_at) - new Date(a.created_at),
  );

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-blueDeep">
        <div className="relative mx-auto max-w-6xl px-6 pt-32 pb-56 md:pt-40 lg:pb-64">
          <div className="max-w-xl">
            {/* Tag */}
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30">
              Neighbours helping neighbours ✨
            </p>

            {/* Headline — two-line, two-colour, strong display font */}
            <h1 className="mt-6 font-display text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
              <span className="block text-blueSky">Raise funds,</span>
              <span className="-mt-3 block text-pinky sm:-mt-2">
                not stress.
              </span>
            </h1>

            {/* Supporting copy */}
            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
              Start a fundraiser for your strata repairs, community projects, or
              a neighbour who needs a boost — and make it easy for people to
              chip in.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={handleClick}
                className="rounded-xl bg-pinky px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
              >
                {auth?.token
                  ? "Start a fundraiser"
                  : "Log in to start your fundraiser"}
              </button>

              <button
                onClick={() => {
                  document
                    .getElementById("fundraisers")
                    ?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center rounded-xl bg-pinky px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
              >
                Browse fundraisers
              </button>
            </div>
          </div>
        </div>

        {/* Building image pinned bottom-right — scales with viewport to avoid overlap */}
        <div className="pointer-events-none absolute bottom-0 right-0 z-10 max-h-[280px] overflow-hidden sm:max-h-[340px] md:max-h-[420px]">
          <img
            src="/images/hero-building.png"
            alt=""
            className="max-h-full w-[min(650px,85vw)] object-right object-contain opacity-95 sm:w-[min(780px,80vw)] md:w-[min(920px,75vw)] lg:w-[min(1080px,70vw)]"
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
              className="fill-pinky"
            />
          </svg>
        </div>
      </section>

      {/* STATS CAROUSEL */}
      <StatsCarousel
        totalFundraisers={fundraisers.length}
        totalPledges={totalPledges}
        fundedCount={fundedCount}
      />

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

          <FundraiserStatusFilter
            className="mt-8"
            value={statusFilter}
            onChange={setStatusFilter}
            counts={counts}
          />

          <div
            className="mt-10 grid gap-7 sm:grid-cols-2 lg:grid-cols-3"
            id="fundraisers"
          >
            {visibleFundraisers.map((fundraiserData) => {
              const building = buildingsById[fundraiserData.building];

              return (
                <FundraiserCard
                  key={fundraiserData.id}
                  fundraiserData={fundraiserData}
                  building={building}
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
