import { useRef, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { postPledge } from "../api/post-pledge";

function PledgeForm({ fundraiserId, onSuccess, onCancel, isOpen = true }) {
  const { auth } = useAuth();

  const token = auth?.token || localStorage.getItem("token");
  const isLoggedIn = !!token;

  // --- Form state ---
  const [pledgeType, setPledgeType] = useState("MONEY"); // "MONEY" | "SKILL"

  const [amount, setAmount] = useState("");
  const [skillDescription, setSkillDescription] = useState("");
  const [hours, setHours] = useState("");

  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  // --- UX state ---
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  const canSubmit = (() => {
    if (!isLoggedIn || !isOpen || submitting) return false;

    if (pledgeType === "MONEY") {
      return Number(amount) > 0;
    }

    // SKILL
    return skillDescription.trim().length > 0; // hours optional
  })();

  const resetForm = () => {
    setPledgeType("MONEY");
    setAmount("");
    setSkillDescription("");
    setHours("");
    setComment("");
    setAnonymous(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent double submits
    if (inFlight.current) return;
    inFlight.current = true;

    setSubmitting(true);
    setError("");

    try {
      const payload =
        pledgeType === "MONEY"
          ? {
              fundraiser: fundraiserId,
              pledge_type: "MONEY",
              amount: Number(amount),
              skill_description: "",
              hours: null,
              comment,
              anonymous,
            }
          : {
              fundraiser: fundraiserId,
              pledge_type: "SKILL",
              amount: null,
              skill_description: skillDescription.trim(),
              hours: hours === "" ? null : Number(hours),
              comment,
              anonymous,
            };

      const created = await postPledge(payload, token);

      resetForm();
      onSuccess?.(created);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to submit pledge");
    } finally {
      setSubmitting(false);
      inFlight.current = false;
    }
  };

  return (
    <div className="mt-6 rounded-xl bg-blueBright/5 p-4 ring-1 ring-blueDeep/10">
      <h3 className="text-sm font-extrabold text-ink">Make a pledge</h3>

      {!isOpen && (
        <p className="mt-2 text-sm text-blueDeep/70">
          This fundraiser is closed.
        </p>
      )}

      {error && <p className="mt-2 text-sm text-red-600">{error}</p>}

      {!isLoggedIn && (
        <p className="mt-2 text-sm text-red-600">
          You must be logged in to make a pledge.
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-4 space-y-3">
        {/* Pledge type */}
        <label className="block">
          <span className="text-xs font-semibold text-blueDeep/70">
            I want to pledge
          </span>
          <select
            value={pledgeType}
            onChange={(e) => {
              const next = e.target.value;
              setPledgeType(next);

              // Optional: clear fields when switching types
              setAmount("");
              setSkillDescription("");
              setHours("");
            }}
            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueBright/40"
            disabled={!isLoggedIn || !isOpen}
          >
            <option value="MONEY">Money</option>
            <option value="SKILL">Time / Skills</option>
          </select>
        </label>

        {/* MONEY fields */}
        {pledgeType === "MONEY" && (
          <label className="block">
            <span className="text-xs font-semibold text-blueDeep/70">
              Amount (AUD)
            </span>
            <input
              type="number"
              min="1"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueBright/40"
              required
              disabled={!isLoggedIn || !isOpen}
            />
          </label>
        )}

        {/* SKILL fields */}
        {pledgeType === "SKILL" && (
          <>
            <label className="block">
              <span className="text-xs font-semibold text-blueDeep/70">
                What can you help with?
              </span>
              <input
                value={skillDescription}
                onChange={(e) => setSkillDescription(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueBright/40"
                placeholder="e.g. Gardening, painting, minor repairs, admin help…"
                required
                disabled={!isLoggedIn || !isOpen}
              />
            </label>

            <label className="block">
              <span className="text-xs font-semibold text-blueDeep/70">
                Hours available (optional)
              </span>
              <input
                type="number"
                min="0"
                step="0.5"
                value={hours}
                onChange={(e) => setHours(e.target.value)}
                className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueBright/40"
                placeholder="e.g. 2"
                disabled={!isLoggedIn || !isOpen}
              />
            </label>
          </>
        )}

        {/* Comment */}
        <label className="block">
          <span className="text-xs font-semibold text-blueDeep/70">
            Comment (optional)
          </span>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueBright/40"
            placeholder="Anything the organiser should know?"
            disabled={!isLoggedIn || !isOpen}
          />
        </label>

        {/* Anonymous */}
        <label className="flex items-center gap-2 text-xs text-blueDeep/70">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            disabled={!isLoggedIn || !isOpen}
          />
          Make this pledge anonymous
        </label>

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            disabled={!canSubmit}
            className="flex-1 rounded-lg bg-blueBright px-4 py-2 text-sm font-semibold text-white hover:bg-blueDeep transition disabled:opacity-50"
          >
            {submitting ? "Submitting…" : "Submit pledge"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-blueDeep ring-1 ring-blueDeep/15 hover:bg-blueBright/10 transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}

export default PledgeForm;
