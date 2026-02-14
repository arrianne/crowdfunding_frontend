import { Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import useFundraisers from "../hooks/use-fundraisers";
import useBuildings from "../hooks/use-buildings";
import useUserPledges from "../hooks/use-user-pledges";
import FundraiserCard from "../components/FundraiserCard";

function UserPage() {
  const { auth } = useAuth();
  const token = auth?.token ?? null;
  const userId = auth?.user_id ?? null;
  const username = auth?.username ?? "you";

  const { fundraisers, isLoading: fundraisersLoading } = useFundraisers();
  const { buildings } = useBuildings();
  const { pledges, isLoading: pledgesLoading, error: pledgesError } = useUserPledges(
    userId,
    token,
  );

  const buildingsById = Object.fromEntries((buildings ?? []).map((b) => [b.id, b]));
  const fundraisersById = Object.fromEntries((fundraisers ?? []).map((f) => [f.id, f]));

  // Fundraisers where the current user is the owner
  const myFundraisers = (fundraisers ?? []).filter((f) => {
    const ownerId = f.owner ?? f.owner_id ?? f.ownerId;
    return ownerId != null && String(ownerId) === String(userId);
  });

  // Money pledges only – for "total spent on pledges"
  const moneyPledges = (pledges ?? []).filter((p) => p.pledge_type === "MONEY");
  const totalSpentOnPledges = moneyPledges.reduce(
    (sum, p) => sum + Number(p.amount ?? 0),
    0,
  );
  const skillsPledgeCount = (pledges ?? []).filter(
    (p) => p.pledge_type === "SKILL",
  ).length;

  const isLoggedIn = !!token;

  function formatPledgeDate(pledge) {
    const raw =
      pledge.date_created ?? pledge.created_at ?? pledge.created ?? null;
    if (!raw) return null;
    try {
      return new Date(raw).toLocaleDateString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      });
    } catch {
      return null;
    }
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
        <div className="mx-auto max-w-6xl px-6 py-20">
          <div className="rounded-2xl bg-white p-8 ring-1 ring-blueDeep/10 shadow-sm text-center">
            <h1 className="text-2xl font-extrabold text-ink">Your activity</h1>
            <p className="mt-3 text-blueDeep/80">
              Log in to see your fundraisers and pledges.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex rounded-xl bg-blueBright px-6 py-3 text-sm font-semibold text-white hover:bg-blueDeep transition"
            >
              Log in
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      {/* PAGE HEADER (hero) */}
      <section className="relative overflow-hidden bg-blueDeep">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
          <div className="flex flex-wrap items-center gap-2">
            <Link
              to="/"
              className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 hover:bg-white/20 transition"
            >
              ← Back
            </Link>
            <span className="inline-flex items-center rounded-full bg-white/10 px-3 py-1 text-xs font-semibold text-white/80 ring-1 ring-white/15">
              Dashboard
            </span>
          </div>

          <h1 className="mt-6 max-w-3xl font-display text-4xl leading-tight tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
            <span className="block text-blueSky">Hello,</span>
            <span className="-mt-3 flex items-center text-pinky sm:-mt-2">
            {username}
            <img
              src="/images/waving-hand.png"
              alt=""
              className="ml-5 h-[1em] w-[1em] shrink-0 animate-wave-shake sm:ml-6 md:ml-8"
              aria-hidden
            />
          </span>
          </h1>

          <p className="mt-4 max-w-2xl text-sm text-white/80">
            Your fundraisers and pledges in one place.
          </p>
        </div>
      </section>

      {/* Dashboard grid: left (wider) + right (narrow) */}
      <div className="mx-auto max-w-6xl px-6 pt-10 pb-8 lg:pt-12 lg:pb-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_340px]">
          {/* Left column */}
          <div className="space-y-6">
            {/* Hero card – Total spent on pledges (dashboard-style "My Card") */}
            <section className="rounded-2xl bg-blueDeep p-6 text-white shadow-lg sm:p-8">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-white/80">
                Money spent on pledges
              </h2>
              <p className="mt-2 text-3xl font-extrabold tracking-tight sm:text-4xl">
                ${totalSpentOnPledges.toLocaleString("en-AU", { minimumFractionDigits: 2 })}
              </p>
              <p className="mt-1 text-sm text-white/80">
                Total amount pledged across {moneyPledges.length} money pledge
                {moneyPledges.length !== 1 ? "s" : ""}.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-blueDeep hover:bg-white/90 transition"
                >
                  Browse fundraisers
                </Link>
                <Link
                  to="/fundraisers/new"
                  className="rounded-xl bg-white/20 px-5 py-2.5 text-sm font-semibold text-white ring-1 ring-white/40 hover:bg-white/30 transition"
                >
                  Start a fundraiser
                </Link>
              </div>
            </section>

            {/* Summary cards – Financial record style */}
            <section>
              <h2 className="mb-4 text-lg font-extrabold text-ink">
                Your impact
              </h2>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Total pledged
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-ink">
                    ${totalSpentOnPledges.toLocaleString("en-AU", { minimumFractionDigits: 0 })}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {moneyPledges.length} money pledge{moneyPledges.length !== 1 ? "s" : ""}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    My fundraisers
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-ink">
                    {fundraisersLoading ? "…" : myFundraisers.length}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    {myFundraisers.length === 1 ? "campaign" : "campaigns"} created
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
                  <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Skills pledged
                  </p>
                  <p className="mt-2 text-xl font-extrabold text-ink">
                    {skillsPledgeCount}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    skill pledge{skillsPledgeCount !== 1 ? "s" : ""} offered
                  </p>
                </div>
              </div>
            </section>

            {/* My fundraisers */}
            <section>
              <h2 className="mb-4 text-lg font-extrabold text-ink">
                My fundraisers
              </h2>
              {fundraisersLoading ? (
                <p className="text-sm text-blueDeep/70">Loading…</p>
              ) : myFundraisers.length === 0 ? (
                <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-sm">
                  <p className="text-sm text-slate-600">
                    You haven’t started any fundraisers yet.{" "}
                    <Link
                      to="/fundraisers/new"
                      className="font-semibold text-blueBright hover:text-blueDeep transition"
                    >
                      Start one
                    </Link>
                  </p>
                </div>
              ) : (
                <ul className="grid gap-4 sm:grid-cols-2">
                  {myFundraisers.map((f) => (
                    <li key={f.id}>
                      <FundraiserCard
                        fundraiserData={f}
                        building={buildingsById[f.building] ?? null}
                      />
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>

          {/* Right column – Recent pledges (transactions-style) */}
          <aside className="lg:max-w-[340px]">
            <div className="sticky top-6 space-y-6">
              <section className="rounded-2xl border border-slate-200 bg-white shadow-sm">
                <div className="border-b border-slate-100 px-5 py-4">
                  <h2 className="text-lg font-extrabold text-ink">
                    Recent pledges
                  </h2>
                </div>
                <div className="max-h-[420px] overflow-y-auto">
                  {pledgesError && (
                    <div className="px-5 py-4">
                      <p className="text-sm text-red-600">
                        Couldn’t load pledges. Try again later.
                      </p>
                    </div>
                  )}
                  {pledgesLoading ? (
                    <div className="px-5 py-8 text-center text-sm text-slate-500">
                      Loading…
                    </div>
                  ) : !pledgesError && (pledges ?? []).length === 0 ? (
                    <div className="px-5 py-8 text-center text-sm text-slate-500">
                      No pledges yet.{" "}
                      <Link
                        to="/"
                        className="font-semibold text-blueBright hover:text-blueDeep"
                      >
                        Browse fundraisers
                      </Link>
                    </div>
                  ) : (
                    <ul className="divide-y divide-slate-100">
                      {(pledges ?? []).slice(0, 15).map((p) => {
                        const fid = p.fundraiser ?? p.fundraiser_id ?? p.fundraiserId;
                        const fundraiser = fid ? fundraisersById[fid] : null;
                        const title = fundraiser?.title ?? `Fundraiser #${fid ?? "?"}`;
                        const isMoney = p.pledge_type === "MONEY";
                        const amount = isMoney
                          ? `$${Number(p.amount ?? 0).toLocaleString()}`
                          : (p.skill_description ?? "Skills");
                        const date = formatPledgeDate(p);
                        const link = fid ? `/fundraisers/${fid}` : null;

                        return (
                          <li key={p.id} className="px-5 py-4 hover:bg-slate-50/80">
                            <div className="flex items-start justify-between gap-3">
                              <div className="min-w-0 flex-1">
                                {link ? (
                                  <Link
                                    to={link}
                                    className="font-semibold text-ink hover:text-blueBright transition truncate block"
                                  >
                                    {title}
                                  </Link>
                                ) : (
                                  <span className="font-semibold text-ink truncate block">
                                    {title}
                                  </span>
                                )}
                                {date && (
                                  <span className="mt-0.5 block text-xs text-slate-500">
                                    {date}
                                  </span>
                                )}
                              </div>
                              <div className="flex shrink-0 items-center gap-2">
                                <span className="text-sm font-semibold text-ink">
                                  {amount}
                                </span>
                                <span
                                  className={`rounded-full px-2 py-0.5 text-xs font-medium ${
                                    isMoney
                                      ? "bg-emerald-100 text-emerald-700"
                                      : "bg-blueSky/30 text-blueDeep"
                                  }`}
                                >
                                  {isMoney ? "Money" : "Skills"}
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                </div>
                {(pledges ?? []).length > 15 && (
                  <div className="border-t border-slate-100 px-5 py-3 text-center">
                    <span className="text-xs text-slate-500">
                      Showing 15 of {(pledges ?? []).length} pledges
                    </span>
                  </div>
                )}
              </section>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}

export default UserPage;
