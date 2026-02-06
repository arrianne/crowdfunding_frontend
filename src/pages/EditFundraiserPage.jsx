import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import useFundraiser from "../hooks/use-fundraiser";
import { putFundraiser } from "../api/put-fundraiser";

function EditFundraiserPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { fundraiser, isLoadingFundraiser, fundraiserError } =
    useFundraiser(id);

  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // Seed editable form data once fundraiser loads
  useEffect(() => {
    if (fundraiser) {
      setFormData({
        title: fundraiser.title ?? "",
        description: fundraiser.description ?? "",
        goal: fundraiser.goal ?? 0,
        image: fundraiser.image ?? "",
        is_open: !!fundraiser.is_open,
        building: fundraiser.building,
      });
    }
  }, [fundraiser]);

  // ---- Loading & error states ----

  if (isLoadingFundraiser) {
    return <div className="px-6 py-16">Loading…</div>;
  }

  if (fundraiserError) {
    return <div className="px-6 py-16">Couldn’t load fundraiser.</div>;
  }

  if (!fundraiser || !formData) {
    return null;
  }

  // ---- Permission check (IMPORTANT FIX) ----

  const userId = auth?.user?.id;
  const ownerId = fundraiser.owner;

  // Only block if we are CERTAIN they are not the owner
  if (userId != null && Number(userId) !== Number(ownerId)) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10">
          <h1 className="text-xl font-extrabold text-ink">Not allowed</h1>
          <p className="mt-2 text-slate-600">
            Only the owner can edit this fundraiser.
          </p>
          <Link
            to={`/fundraisers/${id}`}
            className="mt-4 inline-flex rounded-xl bg-blueBright px-5 py-3 text-sm font-semibold text-white hover:bg-blueDeep transition"
          >
            Back to fundraiser
          </Link>
        </div>
      </div>
    );
  }

  // ---- Submit ----

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const token = auth?.token || localStorage.getItem("token");

      await putFundraiser(
        id,
        {
          ...formData,
          goal: Number(formData.goal),
        },
        token,
      );

      navigate(`/fundraisers/${id}`);
    } catch (err) {
      console.error(err);

      if (String(err.message).includes("403")) {
        setError("You don’t have permission to edit this fundraiser.");
      } else {
        setError(err.message || "Failed to save changes");
      }
    } finally {
      setSaving(false);
    }
  };

  // ---- UI ----

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-ink">Edit fundraiser</h1>
        <Link
          to={`/fundraisers/${id}`}
          className="inline-flex items-center rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200 transition"
        >
          ← Back
        </Link>
      </div>

      {error && (
        <div className="mt-4 rounded-xl bg-red-50 p-4 text-sm text-red-700 ring-1 ring-red-200">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Title</span>
          <input
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blueBright/40"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Description
          </span>
          <textarea
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            className="mt-2 min-h-[140px] w-full rounded-xl bg-white px-4 py-3 text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blueBright/40"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Goal</span>
          <input
            type="number"
            value={formData.goal}
            onChange={(e) => setFormData({ ...formData, goal: e.target.value })}
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blueBright/40"
            min="0"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            Image URL
          </span>
          <input
            value={formData.image}
            onChange={(e) =>
              setFormData({ ...formData, image: e.target.value })
            }
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blueBright/40"
          />
        </label>

        <label className="inline-flex items-center gap-2">
          <input
            type="checkbox"
            checked={formData.is_open}
            onChange={(e) =>
              setFormData({ ...formData, is_open: e.target.checked })
            }
          />
          <span className="text-sm font-semibold text-slate-700">Open</span>
        </label>

        <div className="pt-2 flex gap-3">
          <button
            type="submit"
            disabled={saving}
            className="inline-flex items-center rounded-xl bg-blueBright px-6 py-3 text-sm font-semibold text-white shadow-sm hover:bg-blueDeep transition disabled:opacity-50"
          >
            {saving ? "Saving…" : "Save changes"}
          </button>

          <Link
            to={`/fundraisers/${id}`}
            className="inline-flex items-center rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditFundraiserPage;
