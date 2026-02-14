import { Link } from "react-router-dom";
import useBuildings from "../hooks/use-buildings";
import useFundraisers from "../hooks/use-fundraisers";

function StrataCommunitiesPage() {
  const { buildings, isLoadingBuildings, buildingsError } = useBuildings();
  const { fundraisers } = useFundraisers();

  // Count fundraisers per building (frontend-only, no backend changes)
  const fundraiserCountByBuilding = (fundraisers ?? []).reduce((acc, f) => {
    const bid = f.building;
    if (bid != null) acc[bid] = (acc[bid] ?? 0) + 1;
    return acc;
  }, {});

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      {/* PAGE HEADER (mini hero) */}
      <section className="relative overflow-hidden bg-blueDeep">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
          {/* Mini nav / status */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 hover:bg-white/20 transition"
            >
              ← Back
            </Link>

            <span className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25">
              StrataBoost
            </span>

            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
              Communities
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-blueSky">Strata</span>
            <span className="-mt-3 block text-pinky sm:-mt-2">Communities</span>
          </h1>

          {/* Subheading */}
          <p className="mt-4 max-w-2xl text-sm text-white/80">
            Explore strata communities on StrataBoost. View shared spaces,
            active fundraisers, and ways neighbours come together to improve
            their buildings.
          </p>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-10 pb-20">
          {isLoadingBuildings ? (
            <p className="text-sm text-blueDeep/70">Loading communities…</p>
          ) : buildingsError ? (
            <p className="text-sm text-red-600">
              Couldn’t load communities. Please try again later.
            </p>
          ) : buildings.length === 0 ? (
            <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10 shadow-sm">
              <p className="text-sm text-blueDeep/70">
                There are no strata communities listed yet.
              </p>
            </div>
          ) : (
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
              {buildings.map((building) => (
                <Link
                  key={building.id}
                  to={`/buildings/${building.id}`}
                  className="group block overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-pinky/20 transition-all hover:shadow-xl hover:ring-pinky/40"
                >
                  {/* Main card content */}
                  <div className="p-6 pb-0">
                    {/* Fundraiser count */}
                    <span className="mb-4 inline-flex items-center justify-center rounded-xl bg-blueSky/20 px-3 py-2 text-sm font-extrabold text-blueDeep">
                      {(fundraiserCountByBuilding[building.id] ?? 0) === 1
                        ? "1 fundraiser"
                        : `${fundraiserCountByBuilding[building.id] ?? 0} fundraisers`}
                    </span>

                    <h2 className="text-xl font-extrabold tracking-tight text-ink">
                      {building.name}
                    </h2>

                    {building.address && (
                      <p className="mt-2 whitespace-pre-line text-sm text-blueDeep/70">
                        {building.address}
                      </p>
                    )}

                    {/* Pill tags */}
                    <div className="mt-4 flex flex-wrap gap-2">
                      <span className="rounded-full border border-blueBright/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blueDeep">
                        Strata
                      </span>
                      <span className="rounded-full border border-blueBright/30 bg-white px-3 py-1 text-xs font-semibold uppercase tracking-wide text-blueDeep">
                        Community
                      </span>
                    </div>
                  </div>

                  {/* Pink footer strip */}
                  <div className="mt-6 bg-pinky px-6 py-3 text-center transition-[filter] group-hover:brightness-95">
                    <span className="text-sm font-semibold text-white">
                      View community →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StrataCommunitiesPage;
