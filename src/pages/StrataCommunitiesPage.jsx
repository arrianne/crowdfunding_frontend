import { Link } from "react-router-dom";
import useBuildings from "../hooks/use-buildings";

function StrataCommunitiesPage() {
  const { buildings, isLoadingBuildings, buildingsError } = useBuildings();

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
          <h1 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-blueSky sm:text-4xl">
            Strata Communities
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
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {buildings.map((building) => (
                <div
                  key={building.id}
                  className="flex flex-col justify-between rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10 shadow-sm"
                >
                  <div>
                    <h2 className="text-xl font-extrabold text-ink">
                      {building.name}
                    </h2>

                    {building.address && (
                      <p className="mt-2 whitespace-pre-line text-sm text-blueDeep/70">
                        {building.address}
                      </p>
                    )}
                  </div>

                  <div className="mt-6">
                    <Link
                      to={`/buildings/${building.id}`}
                      className="inline-flex items-center rounded-xl bg-blueBright px-5 py-3 text-sm font-semibold text-white hover:bg-blueDeep transition"
                    >
                      View community
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

export default StrataCommunitiesPage;
