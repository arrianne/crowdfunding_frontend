import { useState } from "react";
import useBuildings from "../hooks/use-buildings";

function NewFundraiserForm() {
  const { buildings, isLoadingBuildings } = useBuildings();
  const [selectedBuildingId, setSelectedBuildingId] = useState("");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const isNewBuilding = selectedBuildingId === "__new__";
  const canContinue = title.trim() && description.trim() && selectedBuildingId;

  const handleSubmit = (event) => {
    event.preventDefault();

    // 🚧 Placeholder: wire this up later
    const payload = {
      title,
      description,
      building:
        selectedBuildingId === "__new__" ? null : Number(selectedBuildingId),
    };

    console.log("New fundraiser payload:", payload);
  };

  return (
    <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10 shadow-sm">
      <h2 className="text-lg font-extrabold text-ink">Fundraiser details</h2>

      <p className="mt-2 text-sm text-blueDeep/70">
        Tell neighbours what’s happening and why it matters.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        {/* Title */}
        <div>
          <label className="block text-sm font-semibold text-ink">
            Fundraiser title
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="e.g. Fix the leaking roof"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blueBright focus:outline-none focus:ring-2 focus:ring-blueBright/20"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm font-semibold text-ink">
            Description
          </label>
          <textarea
            rows={4}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="What’s going on? Why does it matter?"
            className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blueBright focus:outline-none focus:ring-2 focus:ring-blueBright/20"
            required
          />
        </div>

        {/* Building selector */}
        <div>
          <label className="block text-sm font-semibold text-ink">
            Which building is this for?
          </label>

          {isLoadingBuildings ? (
            <p className="mt-2 text-sm text-blueDeep/70">Loading buildings…</p>
          ) : (
            <select
              value={selectedBuildingId}
              onChange={(e) => setSelectedBuildingId(e.target.value)}
              className="mt-2 w-full rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm focus:border-blueBright focus:outline-none focus:ring-2 focus:ring-blueBright/20"
            >
              <option value="">Select a building</option>

              {buildings.map((building) => (
                <option key={building.id} value={building.id}>
                  {building.name}
                </option>
              ))}

              <option value="__new__">My building isn’t listed</option>
            </select>
          )}

          <p className="mt-2 text-sm text-blueDeep/70">
            This keeps fundraisers organised and transparent.
          </p>
        </div>

        {/* New building hint */}
        {isNewBuilding && (
          <div className="rounded-xl bg-blueBright/5 p-4">
            <p className="text-sm font-semibold text-blueDeep">No problem!</p>
            <p className="mt-1 text-sm text-blueDeep/70">
              You’ll be able to add your building in the next step.
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="pt-2">
          <button
            type="submit"
            disabled={!canContinue}
            className="inline-flex rounded-xl bg-pinky px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            Continue
          </button>
        </div>
      </form>
    </div>
  );
}

export default NewFundraiserForm;
