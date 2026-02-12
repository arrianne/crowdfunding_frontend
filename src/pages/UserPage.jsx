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

  // Fundraisers where the current user is the owner
  const myFundraisers = (fundraisers ?? []).filter((f) => {
    const ownerId = f.owner ?? f.owner_id ?? f.ownerId;
    return ownerId != null && String(ownerId) === String(userId);
  });

  const isLoggedIn = !!token;

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
      <div className="mx-auto max-w-6xl px-6 py-16">
        <h1 className="text-3xl font-extrabold tracking-tight text-ink">
          Hi, {username}
        </h1>
        <p className="mt-2 text-blueDeep/80">
          Your fundraisers and pledges in one place.
        </p>

        {/* My fundraisers */}
        <section className="mt-10">
          <h2 className="text-xl font-extrabold text-ink">My fundraisers</h2>
          {fundraisersLoading ? (
            <p className="mt-3 text-sm text-blueDeep/70">Loading…</p>
          ) : myFundraisers.length === 0 ? (
            <p className="mt-3 text-sm text-blueDeep/70">
              You haven’t started any fundraisers yet.{" "}
              <Link
                to="/fundraisers/new"
                className="font-semibold text-blueBright hover:text-blueDeep transition"
              >
                Start one
              </Link>
            </p>
          ) : (
            <ul className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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

        {/* My pledges */}
        <section className="mt-14">
          <h2 className="text-xl font-extrabold text-ink">My pledges</h2>
          {pledgesError && (
            <p className="mt-3 text-sm text-red-600">
              Couldn’t load your pledges. Your API may need a{" "}
              <code className="rounded bg-slate-100 px-1 text-xs">
                GET /pledges/?supporter=&lt;user_id&gt;
              </code>{" "}
              endpoint.
            </p>
          )}
          {pledgesLoading ? (
            <p className="mt-3 text-sm text-blueDeep/70">Loading…</p>
          ) : !pledgesError && pledges.length === 0 ? (
            <p className="mt-3 text-sm text-blueDeep/70">
              You haven’t made any pledges yet. Browse{" "}
              <Link
                to="/"
                className="font-semibold text-blueBright hover:text-blueDeep transition"
              >
                fundraisers
              </Link>{" "}
              to chip in.
            </p>
          ) : (
            <ul className="mt-4 space-y-3">
              {(pledges ?? []).map((p) => {
                const fundraiserId = p.fundraiser ?? p.fundraiser_id ?? p.fundraiserId;
                const fundraiserLink = fundraiserId
                  ? `/fundraisers/${fundraiserId}`
                  : null;
                const isMoney = p.pledge_type === "MONEY";
                const summary = isMoney
                  ? `$${Number(p.amount ?? 0).toLocaleString()}`
                  : (p.skill_description ?? "Skills");

                return (
                  <li
                    key={p.id}
                    className="flex flex-wrap items-center justify-between gap-2 rounded-xl bg-white p-4 ring-1 ring-blueDeep/10 shadow-sm"
                  >
                    <div>
                      <span className="font-semibold text-ink">
                        {summary}
                      </span>
                      {fundraiserLink && (
                        <>
                          {" "}
                          <span className="text-blueDeep/70">→</span>{" "}
                          <Link
                            to={fundraiserLink}
                            className="text-sm font-semibold text-blueBright hover:text-blueDeep transition"
                          >
                            View fundraiser
                          </Link>
                        </>
                      )}
                    </div>
                    <span className="inline-flex items-center rounded-full bg-blueBright/10 px-3 py-1 text-xs font-semibold text-blueDeep">
                      {isMoney ? "Money" : "Skills"}
                    </span>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      </div>
    </div>
  );
}

export default UserPage;
