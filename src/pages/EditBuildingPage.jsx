import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";
import useBuilding from "../hooks/use-building";
import { putBuilding } from "../api/put-building";

function EditBuildingPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { auth } = useAuth();

  const { building, isLoadingBuilding, buildingError } = useBuilding(id);

  const [formData, setFormData] = useState(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  // seed form once building loads
  useEffect(() => {
    if (building) {
      setFormData({
        name: building.name ?? "",
        cts_number: building.cts_number ?? "",
        address: building.address ?? "",
        description: building.description ?? "",
        photo: building.photo ?? null,
      });
    }
  }, [building]);

  if (isLoadingBuilding) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="h-8 w-1/2 rounded bg-slate-200/70" />
        <div className="mt-4 h-4 w-2/3 rounded bg-slate-200/70" />
      </div>
    );
  }

  if (buildingError) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10">
          <h1 className="text-xl font-extrabold text-ink">
            Couldn’t load building
          </h1>
          <p className="mt-2 text-blueDeep/80">
            Something went wrong. Try refreshing, or go back.
          </p>
          <Link
            to={`/buildings/${id}`}
            className="mt-4 inline-flex rounded-xl bg-blueBright px-5 py-3 text-sm font-semibold text-white hover:bg-blueDeep transition"
          >
            Back to building
          </Link>
        </div>
      </div>
    );
  }

  if (!building || !formData) return null;

  const isOwner = auth?.user?.id === building?.owner?.id;

  // optional safety: if someone guesses the URL
  if (!isOwner) {
    return (
      <div className="mx-auto max-w-2xl px-6 py-16">
        <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10">
          <h1 className="text-xl font-extrabold text-ink">Not allowed</h1>
          <p className="mt-2 text-slate-600">
            Only the owner can edit this building.
          </p>
          <Link
            to={`/buildings/${id}`}
            className="mt-4 inline-flex rounded-xl bg-blueBright px-5 py-3 text-sm font-semibold text-white hover:bg-blueDeep transition"
          >
            Back to building
          </Link>
        </div>
      </div>
    );
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError("");

    try {
      const token = auth?.token || localStorage.getItem("token");
      await putBuilding(id, formData, token);
      navigate(`/buildings/${id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || "Failed to save changes");
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="mx-auto max-w-2xl px-6 py-16">
      <div className="flex items-center justify-between gap-4">
        <h1 className="text-2xl font-extrabold text-ink">Edit building</h1>
        <Link
          to={`/buildings/${id}`}
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
          <span className="text-sm font-semibold text-slate-700">Name</span>
          <input
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blueBright/40"
            required
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">
            CTS number
          </span>
          <input
            value={formData.cts_number}
            onChange={(e) =>
              setFormData({ ...formData, cts_number: e.target.value })
            }
            className="mt-2 w-full rounded-xl bg-white px-4 py-3 text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blueBright/40"
          />
        </label>

        <label className="block">
          <span className="text-sm font-semibold text-slate-700">Address</span>
          <textarea
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            className="mt-2 min-h-[110px] w-full rounded-xl bg-white px-4 py-3 text-slate-900 ring-1 ring-slate-200 focus:outline-none focus:ring-2 focus:ring-blueBright/40"
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
          />
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
            to={`/buildings/${id}`}
            className="inline-flex items-center rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200 transition"
          >
            Cancel
          </Link>
        </div>
      </form>
    </div>
  );
}

export default EditBuildingPage;
