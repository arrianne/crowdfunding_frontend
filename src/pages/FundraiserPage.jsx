import { useEffect, useState } from "react";
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

  const buildingId = fundraiser?.building ?? null;
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

  // ----- funded (handle booleans, 0/1, "true"/"false") -----
  const isFundedUI =
    !isOpen ||
    ["true", "1", "yes"].includes(
      String(fundraiser.is_funded ?? "").toLowerCase(),
    );

  // ----- money fields (handle multiple possible backend names) -----
  const goal =
    Number(
      fundraiser.goal ?? fundraiser.target ?? fundraiser.goal_amount ?? 0,
    ) || 0;

  const raised =
    Number(
      fundraiser.total_pledged ??
        fundraiser.raised ??
        fundraiser.amount_raised ??
        fundraiser.total_raised ??
        0,
    ) || 0;

  // If funded but totals aren't populated, make UI look complete.
  // If goal is missing/0, fall back to raised so it doesn't show $0 weirdly.
  const displayRaised = isFundedUI ? goal || raised : raised;

  // ----- percent (force 100 when funded; clamp; avoid NaN) -----
  const computedFromMoney = goal > 0 ? (raised / goal) * 100 : 0;

  const progressRaw =
    fundraiser.progress_percent != null
      ? Number(fundraiser.progress_percent)
      : computedFromMoney;

  const progress = isFundedUI ? 100 : progressRaw;

  const progressClamped = Number.isFinite(progress)
    ? Math.max(0, Math.min(100, Math.round(progress)))
    : 0;

  // "Created" (format nicely, but don’t crash if missing)
  const createdRaw =
    fundraiser.date_created ??
    fundraiser.created_at ??
    fundraiser.created ??
    null;

  const created = createdRaw ? new Date(createdRaw).toLocaleDateString() : null;

  // Owner display name (works with flat fields, nested objects, or numeric IDs)
  const ownerNameText =
    fundraiser.owner_name ??
    fundraiser.owner?.name ??
    fundraiser.owner?.username ??
    fundraiser.owner?.email ??
    (typeof fundraiser.owner === "number"
      ? `User #${fundraiser.owner}`
      : null) ??
    "Unknown";

  // Owner check (requires auth.user or auth.user_id or similar)
  const currentUserId =
    auth?.user?.id ?? auth?.user_id ?? auth?.id ?? auth?.userId ?? null;

  const ownerId =
    typeof fundraiser.owner === "object"
      ? fundraiser.owner?.id
      : (fundraiser.owner ?? fundraiser.owner_id ?? null);

  const isOwner =
    currentUserId != null &&
    ownerId != null &&
    Number(currentUserId) === Number(ownerId);

  // Do we have "money" style fields?
  const hasMoney =
    isFundedUI || goal > 0 || raised > 0 || fundraiser.goal != null;

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
      alert(err?.message || "Failed to delete fundraiser");
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
        <div className="mt-3 text-xs text-white/70">
          debug: is_funded={String(fundraiser.is_funded)} | isFunded=
          {String(isFundedUI)} | goal={goal} | raised={raised} |
          progressClamped=
          {progressClamped} | hasMoney={String(hasMoney)}
        </div>
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
              {isOpen ? "Open" : isFundedUI ? "Funded" : "Closed"}
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
            <span>
              By <span className="users">{ownerNameText}</span>
            </span>
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

          {/* TEMP DEBUG (remove once it looks right) */}
          <div className="mt-3 text-xs text-white/60">
            debug: is_funded={String(fundraiser.is_funded)} | isFundedUI=
            {String(isFundedUI)} | goal={goal} | raised={raised} | progress=
            {progressClamped}
          </div>
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
                  {isOpen
                    ? "Contribute"
                    : isFundedUI
                      ? "Funded 🎉"
                      : "Fundraiser closed"}
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
                        {progressClamped}%
                      </p>
                    </div>

                    <div className="mt-2 h-3 w-full overflow-hidden rounded-full bg-blueBright/10">
                      <div
                        className="h-full rounded-full bg-blueBright transition-all"
                        style={{ width: `${progressClamped}%` }}
                      />
                    </div>

                    <div className="mt-3 flex justify-between text-sm text-blueDeep/80">
                      <span>${displayRaised.toLocaleString()}</span>
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
