import { useState } from "react";
import DeleteConfirm from "./DeleteConfirm";
import PledgeForm from "./PledgeForm";
import { deletePledge } from "../api/delete-pledge";

function isPledgeOwner(pledge, currentUserId) {
  if (!currentUserId) return false;
  const ownerId = pledge.supporter ?? pledge.supporter_id ?? pledge.owner;
  return ownerId != null && String(ownerId) === String(currentUserId);
}

function PledgeActions({
  pledge,
  fundraiserId,
  isOpen,
  currentUserId,
  token,
  onRefresh,
}) {
  const [editing, setEditing] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteError, setDeleteError] = useState(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setDeleteError(null);
    setIsDeleting(true);
    try {
      await deletePledge(pledge.id, token);
      setShowDeleteConfirm(false);
      onRefresh?.();
    } catch (err) {
      console.error(err);
      setDeleteError(err?.message ?? "Failed to delete pledge");
    } finally {
      setIsDeleting(false);
    }
  };

  if (!isPledgeOwner(pledge, currentUserId)) return null;

  return (
    <div className="mt-2 space-y-3">
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          onClick={() => setEditing((e) => !e)}
          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-blueDeep ring-1 ring-blueDeep/15 hover:bg-blueBright/10 transition"
        >
          {editing ? "Cancel edit" : "Edit"}
        </button>
        <button
          type="button"
          onClick={() => {
            setShowDeleteConfirm(true);
            setDeleteError(null);
          }}
          className="rounded-lg bg-white px-3 py-1.5 text-xs font-semibold text-red-600 ring-1 ring-red-200 hover:bg-red-50 transition"
        >
          Delete
        </button>
      </div>
      <DeleteConfirm
        variant="light"
        isOpen={showDeleteConfirm}
        onCancel={() => {
          setShowDeleteConfirm(false);
          setDeleteError(null);
        }}
        onConfirm={handleDelete}
        title="Are you sure you want to remove this pledge?"
        bullets={["This will permanently delete the pledge", "This action cannot be undone"]}
        error={deleteError}
        isDeleting={isDeleting}
      />
      {editing && (
        <div className="w-full">
          <PledgeForm
            fundraiserId={fundraiserId}
            initialPledge={pledge}
            isOpen={isOpen}
            onSuccess={() => {
              setEditing(false);
              onRefresh?.();
            }}
            onCancel={() => setEditing(false)}
          />
        </div>
      )}
    </div>
  );
}

function PledgesList({
  pledges = [],
  fundraiserId = null,
  isOpen = true,
  currentUserId = null,
  onRefresh,
}) {
  const token =
    typeof window !== "undefined" ? window.localStorage.getItem("token") : null;

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
                  : `Supporter #${p.supporter ?? p.supporter_id ?? "?"}`;

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

                    <PledgeActions
                      pledge={p}
                      fundraiserId={fundraiserId}
                      isOpen={isOpen}
                      currentUserId={currentUserId}
                      token={token}
                      onRefresh={onRefresh}
                    />
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
                  : `Supporter #${p.supporter ?? p.supporter_id ?? "?"}`;

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
                        "{p.comment}"
                      </p>
                    )}

                    <PledgeActions
                      pledge={p}
                      fundraiserId={fundraiserId}
                      isOpen={isOpen}
                      currentUserId={currentUserId}
                      token={token}
                      onRefresh={onRefresh}
                    />
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
