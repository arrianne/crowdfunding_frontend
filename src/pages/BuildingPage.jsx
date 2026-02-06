import { useParams, Link, useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import useBuilding from "../hooks/use-building";
import useBuildingFundraisers from "../hooks/use-building-fundraiser";
import FundraiserCard from "../components/FundraiserCard";
import { deleteBuilding } from "../api/delete-building";

function BuildingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

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

  const isOwner = auth?.user?.id === building?.owner?.id;

  const handleDeleteBuilding = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this building?\n\n" +
        "• This will permanently delete the building\n" +
        "• All associated fundraisers will also be removed\n" +
        "• This action cannot be undone",
    );

    if (!confirmed) return;

    try {
      const token = auth?.token || localStorage.getItem("token");
      await deleteBuilding(building.id, token);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert(err.message || "Something went wrong while deleting.");
    }
  };

  return (
    <>
      {/* HERO / HEADER */}
      <section className="relative overflow-hidden bg-blueDeep">
        <div className="mx-auto max-w-6xl px-6 pt-12 pb-16">
          {/* Mini nav */}
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 hover:bg-white/20 transition"
            >
              ← Back
            </Link>

            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
              Building
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            {building.name}
          </h1>

          {building.address && (
            <p className="mt-3 max-w-2xl whitespace-pre-line text-sm text-white/80">
              {building.address}
            </p>
          )}

          {/* Owner actions */}
          {isOwner && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/buildings/${building.id}/edit`}
                className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/30 transition"
              >
                Edit building
              </Link>

              <button
                onClick={handleDeleteBuilding}
                className="inline-flex items-center rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 ring-1 ring-red-300/30 hover:bg-red-500/30 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </section>

      {/* CONTENT */}
      <div className="mx-auto max-w-6xl px-6 py-16 space-y-16">
        {/* Building details card */}
        <section className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10 shadow-sm">
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
        </section>

        {/* Fundraisers */}
        <section>
          <div className="flex items-center justify-between gap-4">
            <h2 className="text-2xl font-extrabold text-ink">Fundraisers</h2>

            <Link
              to="/fundraisers/new"
              className="inline-flex items-center rounded-xl bg-pinky px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
            >
              Start a fundraiser
            </Link>
          </div>

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
    </>
  );
}

export default BuildingPage;
