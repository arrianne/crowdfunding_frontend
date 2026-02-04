import { useParams, Link } from "react-router-dom";
import useBuilding from "../hooks/use-building";
import useBuildingFundraisers from "../hooks/use-building-fundraiser";
import FundraiserCard from "../components/FundraiserCard";

function BuildingPage() {
  const { id } = useParams();

  const { building, isLoadingBuilding, buildingError } = useBuilding(id);
  const { fundraisers, isLoadingFundraisers, fundraisersError } =
    useBuildingFundraisers(id);

  if (isLoadingBuilding) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="h-8 w-1/3 rounded bg-slate-200/70" />
        <div className="mt-4 h-4 w-1/2 rounded bg-slate-200/70" />
      </div>
    );
  }

  if (buildingError) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10">
          <h1 className="text-xl font-extrabold text-ink">
            Couldn’t load building
          </h1>
          <p className="mt-2 text-blueDeep/80">
            Something went wrong. Try refreshing, or go back to the homepage.
          </p>
          <Link
            to="/"
            className="mt-4 inline-flex rounded-xl bg-blueBright px-5 py-3 text-sm font-semibold text-white hover:bg-blueDeep transition"
          >
            Back to home
          </Link>
        </div>
      </div>
    );
  }

  if (!building) return null;

  return (
    <div className="mx-auto max-w-6xl px-6 py-16">
      {/* Header */}
      <header>
        <h1 className="text-3xl font-extrabold text-ink">{building.name}</h1>

        {building.address && (
          <p className="mt-2 whitespace-pre-line text-sm text-slate-600">
            {building.address}
          </p>
        )}
      </header>

      {/* Building details */}
      <div className="mt-10 rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h2 className="text-xl font-extrabold tracking-tight text-ink">
          About this building
        </h2>

        {building.description ? (
          <p className="mt-3 max-w-3xl text-base text-slate-700">
            {building.description}
          </p>
        ) : (
          <p className="mt-3 text-sm text-slate-500">
            No description has been added yet.
          </p>
        )}

        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {building.cts_number && (
            <div>
              <p className="text-xs font-semibold uppercase tracking-wide text-slate-500">
                CTS number
              </p>
              <p className="mt-1 text-sm text-slate-700">
                {building.cts_number}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Fundraisers */}
      <section className="mt-16">
        <h2 className="text-2xl font-extrabold text-ink">Fundraisers</h2>

        {isLoadingFundraisers ? (
          <p className="mt-4 text-sm text-slate-600">Loading fundraisers…</p>
        ) : fundraisersError ? (
          <p className="mt-4 text-sm text-red-600">
            Couldn’t load fundraisers. Please try again later.
          </p>
        ) : fundraisers.length === 0 ? (
          <p className="mt-4 text-sm text-slate-600">
            There are no fundraisers for this building yet.
          </p>
        ) : (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {fundraisers.map((fundraiserData) => (
              <FundraiserCard
                key={fundraiserData.id}
                fundraiserData={fundraiserData}
                building={building}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}

export default BuildingPage;
