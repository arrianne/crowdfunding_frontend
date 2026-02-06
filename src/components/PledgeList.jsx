function PledgesList({ pledges = [] }) {
  const moneyPledges = pledges.filter((p) => p.pledge_type === "MONEY");
  const skillPledges = pledges.filter((p) => p.pledge_type === "SKILL");

  if (!pledges || pledges.length === 0) {
    return (
      <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10 shadow-sm">
        <h2 className="text-lg font-extrabold text-ink">Pledges</h2>
        <p className="mt-2 text-sm text-blueDeep/70">
          No pledges yet — be the first to chip in 💙
        </p>
      </div>
    );
  }

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10 shadow-sm">
      <h2 className="text-lg font-extrabold text-ink">Pledges</h2>

      <div className="mt-4 space-y-8">
        {/* =====================
            MONEY PLEDGES
        ===================== */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-blueDeep">
              Money pledged
            </h3>

            <span className="inline-flex items-center rounded-full bg-blueBright/10 px-3 py-1 text-xs font-semibold text-blueDeep">
              {moneyPledges.length}
            </span>
          </div>

          {moneyPledges.length === 0 ? (
            <p className="text-sm text-blueDeep/70">No money pledges yet.</p>
          ) : (
            <ul className="space-y-3">
              {moneyPledges.map((p) => {
                const who = p.anonymous
                  ? "Anonymous"
                  : `Supporter #${p.supporter}`;

                return (
                  <li
                    key={p.id}
                    className="rounded-xl bg-sky-50/60 p-4 ring-1 ring-blueDeep/10"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-extrabold text-ink">{who}</p>
                        <p className="mt-1 text-sm text-blueDeep/80">
                          Pledged{" "}
                          <span className="font-extrabold text-blueDeep">
                            ${Number(p.amount ?? 0).toLocaleString()}
                          </span>
                        </p>
                      </div>

                      <span className="inline-flex items-center rounded-full bg-blueBright/10 px-3 py-1 text-xs font-semibold text-blueDeep ring-1 ring-blueDeep/10">
                        Money
                      </span>
                    </div>

                    {p.comment && (
                      <p className="mt-3 text-sm text-blueDeep/70">
                        “{p.comment}”
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        {/* =====================
            SKILL PLEDGES
        ===================== */}
        <div>
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-sm font-extrabold uppercase tracking-wide text-pinky">
              Skills offered
            </h3>

            <span className="inline-flex items-center rounded-full bg-pinky/10 px-3 py-1 text-xs font-semibold text-pinky">
              {skillPledges.length}
            </span>
          </div>

          {skillPledges.length === 0 ? (
            <p className="text-sm text-blueDeep/70">No skill pledges yet.</p>
          ) : (
            <ul className="space-y-3">
              {skillPledges.map((p) => {
                const who = p.anonymous
                  ? "Anonymous"
                  : `Supporter #${p.supporter}`;

                return (
                  <li
                    key={p.id}
                    className="rounded-xl bg-pinky/5 p-4 ring-1 ring-pinky/20"
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-sm font-extrabold text-ink">{who}</p>

                        <p className="mt-1 text-sm text-blueDeep/80">
                          Offered{" "}
                          <span className="font-extrabold text-blueDeep">
                            {p.skill_description}
                          </span>
                          {p.hours != null && (
                            <span className="text-blueDeep/70">
                              {" "}
                              ({p.hours} hrs)
                            </span>
                          )}
                        </p>
                      </div>

                      <span className="inline-flex items-center rounded-full bg-pinky/10 px-3 py-1 text-xs font-semibold text-pinky ring-1 ring-pinky/20">
                        Skills
                      </span>
                    </div>

                    {p.comment && (
                      <p className="mt-3 text-sm text-blueDeep/70">
                        “{p.comment}”
                      </p>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}

export default PledgesList;
