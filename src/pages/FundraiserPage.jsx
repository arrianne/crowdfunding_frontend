import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

import { useAuth } from "../hooks/use-auth";
import useFundraiser from "../hooks/use-fundraiser";
import useBuilding from "../hooks/use-building";

import { deleteFundraiser } from "../api/delete-fundraiser";
import PledgeForm from "../components/PledgeForm";
import PledgesList from "../components/PledgeList";
function FundraiserPage() {
  // ======================================================
  // ROUTING + AUTH
  // ======================================================
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  // ======================================================
  // LOCAL UI STATE
  // ======================================================
  const [refreshKey, setRefreshKey] = useState(0); // triggers refetch after pledge
  const [showPledgeForm, setShowPledgeForm] = useState(false);
  const [pledgeSuccess, setPledgeSuccess] = useState(false);

  // Show success message for a reliable amount of time
  useEffect(() => {
    if (!pledgeSuccess) return;
    const t = setTimeout(() => setPledgeSuccess(false), 2500);
    return () => clearTimeout(t);
  }, [pledgeSuccess]);

  // ======================================================
  // DATA LOADING
  // ======================================================
  const { fundraiser, isLoading, error } = useFundraiser(id, refreshKey);

  const buildingId = fundraiser?.building;
  const { building } = useBuilding(buildingId);
  const buildingName = building?.name ?? "Strata Community";

  // ======================================================
  // LOADING / ERROR GUARDS
  // ======================================================
  if (isLoading) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="h-8 w-2/3 rounded bg-slate-200/70" />
        <div className="mt-4 h-4 w-1/2 rounded bg-slate-200/70" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10">
          <h1 className="text-xl font-extrabold text-ink">
            Couldn’t load fundraiser
          </h1>
          <p className="mt-2 text-blueDeep/80">
            Something went wrong. Try refreshing, or go back.
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

  if (!fundraiser) return null;

  // ======================================================
  // DERIVED VALUES
  // ======================================================
  const title = fundraiser.title ?? "Fundraiser";
  const description = fundraiser.description ?? "";
  const isOpen = !!fundraiser.is_open;

  // money totals: try a few possible backend field names safely
  const goal = Number(fundraiser.goal ?? 0);
  const raised = Number(fundraiser.total_pledged ?? 0);
  const progress = Math.round(Number(fundraiser.progress_percent ?? 0));
  const isFunded = !!fundraiser.is_funded;

  const created = fundraiser.date_created
    ? new Date(fundraiser.date_created).toLocaleDateString()
    : null;

  const ownerName = fundraiser.owner_name ?? `User ${fundraiser.owner}`;
  const isOwner = Number(auth?.user?.id) === Number(fundraiser.owner);

  // If you only consider "money fundraisers" as those with a goal:
  const hasMoney = goal > 0;

  // ======================================================
  // ACTIONS
  // ======================================================
  const handleDeleteFundraiser = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this fundraiser?\n\n" +
        "• This will permanently delete the fundraiser\n" +
        "• This action cannot be undone",
    );
    if (!confirmed) return;

    try {
      const token = auth?.token || localStorage.getItem("token");
      await deleteFundraiser(fundraiser.id, token);

      // redirect back to the building (or communities list)
      navigate(buildingId ? `/buildings/${buildingId}` : "/strata-communities");
    } catch (err) {
      console.error(err);
      alert(err.message || "Failed to delete fundraiser");
    }
  };

  // ======================================================
  // PAGE UI
  // ======================================================
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      {/* ======================================================
          HEADER / MINI HERO
      ====================================================== */}
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
              Fundraiser
            </span>

            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
              {isOpen ? "Open" : "Closed"}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-6 max-w-3xl text-3xl font-extrabold tracking-tight text-blueSky sm:text-4xl">
            {title}
          </h1>

          {/* Building context */}
          {buildingId ? (
            <Link
              to={`/buildings/${buildingId}`}
              className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/20 px-4 py-1.5 text-sm font-semibold text-white ring-1 ring-white/25 hover:bg-white/30 transition"
            >
              <span className="opacity-80">Building:</span>
              <span className="font-extrabold">{buildingName}</span>
              <span aria-hidden>→</span>
            </Link>
          ) : (
            <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-1.5 text-sm font-semibold text-white/80 ring-1 ring-white/15">
              Building: {buildingName}
            </div>
          )}

          {/* Meta */}
          <div className="mt-4 flex flex-wrap gap-x-6 gap-y-2 text-sm text-white/80">
            {created && <span>Created: {created}</span>}
            <span>By {ownerName}</span>
          </div>

          {/* Owner actions */}
          {isOwner && (
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={`/fundraisers/${fundraiser.id}/edit`}
                className="inline-flex items-center rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/30 transition"
              >
                Edit
              </Link>

              <button
                onClick={handleDeleteFundraiser}
                className="inline-flex items-center rounded-full bg-red-500/20 px-4 py-2 text-sm font-semibold text-red-100 ring-1 ring-red-300/30 hover:bg-red-500/30 transition"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      </section>

      {/* ======================================================
          CONTENT
      ====================================================== */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-10 pb-20">
          <div className="grid gap-8 md:grid-cols-[2fr_1fr]">
            {/* ======================================================
      LEFT COLUMN
  ====================================================== */}
            <div className="space-y-6">
              {/* Image card */}
              <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-blueDeep/10 shadow-sm">
                <div className="relative h-64 bg-blueSky/20 sm:h-80">
                  <img
                    src={fundraiser.image}
                    alt={title}
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.currentTarget.onerror = null;
                      e.currentTarget.src = "/images/placeholder.png";
                    }}
                  />
                </div>
              </div>

              {/* About card */}
              <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10 shadow-sm">
                <h2 className="text-lg font-extrabold text-ink">
                  What this fundraiser is for
                </h2>
                <p className="mt-3 leading-relaxed text-blueDeep/80">
                  {description}
                </p>

                <div className="mt-6 flex flex-wrap gap-2">
                  <span className="inline-flex items-center rounded-full bg-blueBright/10 px-3 py-1 text-xs font-semibold text-blueDeep">
                    Community-first
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blueBright/10 px-3 py-1 text-xs font-semibold text-blueDeep">
                    Transparent updates
                  </span>
                  <span className="inline-flex items-center rounded-full bg-blueBright/10 px-3 py-1 text-xs font-semibold text-blueDeep">
                    Neighbour powered
                  </span>
                </div>
              </div>

              {/* Pledges */}
              <PledgesList pledges={fundraiser.pledges} />
            </div>

            {/* ======================================================
      RIGHT COLUMN / CHIP IN
  ====================================================== */}
            <aside>
              <div className="sticky top-6 rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10 shadow-sm">
                <h2 className="text-lg font-extrabold text-ink">Chip in</h2>

                {pledgeSuccess && (
                  <div className="mt-3 rounded-xl bg-blueBright/10 p-3 text-sm font-semibold text-blueDeep ring-1 ring-blueDeep/10">
                    Pledge submitted! 🎉
                  </div>
                )}

                <button
                  className="mt-6 w-full rounded-xl bg-pinky px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition disabled:opacity-50"
                  disabled={!isOpen}
                  onClick={() => setShowPledgeForm(true)}
                >
                  {isOpen ? "Contribute" : "Fundraiser closed"}
                </button>

                {showPledgeForm && (
                  <PledgeForm
                    fundraiserId={fundraiser.id}
                    isOpen={isOpen}
                    onCancel={() => setShowPledgeForm(false)}
                    onSuccess={() => {
                      setShowPledgeForm(false);
                      setRefreshKey((k) => k + 1);
                      setPledgeSuccess(true);
                    }}
                  />
                )}

                {hasMoney ? (
                  <div className="mt-4">
                    <div className="flex items-end justify-between">
                      <p className="text-sm font-semibold text-blueDeep/80">
                        Raised
                      </p>
                      <p className="text-sm font-semibold text-blueDeep/70">
                        {progress}%
                      </p>
                    </div>

                    <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-blueBright/10">
                      <div
                        className="h-full rounded-full bg-blueBright"
                        style={{ width: `${progress}%` }}
                      />
                    </div>

                    <div className="mt-3 flex justify-between text-sm text-blueDeep/80">
                      <span>${raised.toLocaleString()}</span>
                      <span>${goal.toLocaleString()} goal</span>
                    </div>
                  </div>
                ) : (
                  <p className="mt-3 text-sm text-blueDeep/70">
                    This fundraiser accepts support — details coming soon.
                  </p>
                )}

                <button className="mt-6 w-full rounded-xl bg-white px-6 py-3 text-sm font-semibold text-blueDeep ring-1 ring-blueDeep/15 hover:bg-blueBright/10 transition">
                  Share
                </button>

                <p className="mt-4 text-xs text-blueDeep/60">
                  Neighbour-powered support — money or skills — all welcome.
                </p>
              </div>
            </aside>
          </div>
        </div>
      </section>
    </div>
  );
}

export default FundraiserPage;
