import { useRef, useState } from "react";
import { useAuth } from "../hooks/use-auth";
import { postPledge } from "../api/post-pledge";

function PledgeForm({ fundraiserId, onSuccess, onCancel, isOpen = true }) {
  const { auth } = useAuth();

  const token = auth?.token || localStorage.getItem("token");
  const isLoggedIn = !!token;

  const [amount, setAmount] = useState("");
  const [comment, setComment] = useState("");
  const [anonymous, setAnonymous] = useState(false);

  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");
  const inFlight = useRef(false);

  const canSubmit = isLoggedIn && isOpen && Number(amount) > 0 && !submitting;

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (inFlight.current) return; // ✅ prevents double submit
    inFlight.current = true;

    setSubmitting(true);
    setError("");

    try {
      const created = await postPledge(
        {
          fundraiser: fundraiserId,
          pledge_type: "MONEY",
          amount: Number(amount),
          skill_description: "",
          hours: null,
          comment,
          anonymous,
        },
        token,
      );

      onSuccess?.(created);

      setAmount("");
      setComment("");
      setAnonymous(false);

      onSuccess?.();
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

        <label className="block">
          <span className="text-xs font-semibold text-blueDeep/70">
            Message (optional)
          </span>
          <textarea
            rows={3}
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="mt-1 w-full rounded-lg border border-slate-200 px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blueBright/40"
            placeholder="Happy to support!"
            disabled={!isLoggedIn || !isOpen}
          />
        </label>

        <label className="flex items-center gap-2 text-xs text-blueDeep/70">
          <input
            type="checkbox"
            checked={anonymous}
            onChange={(e) => setAnonymous(e.target.checked)}
            disabled={!isLoggedIn || !isOpen}
          />
          Make this pledge anonymous
        </label>

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
