import { useState } from "react";
import useBuildings from "../hooks/use-buildings";
import { useAuth } from "../hooks/use-auth";
import { useNavigate } from "react-router-dom";
import NewBuildingForm from "./NewBuildingForm";

function NewFundraiserForm() {
  const { auth } = useAuth(); // ✅ now auth exists if you need it
  const { buildings, isLoadingBuildings } = useBuildings();

  const navigate = useNavigate();

  const [selectedBuildingId, setSelectedBuildingId] = useState("");

  const isNewBuilding = selectedBuildingId === "__new__";

  const [newBuilding, setNewBuilding] = useState({
    name: "",
    cts_number: "",
    street: "",
    suburb: "",
    state: "",
    postcode: "",
  });

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ✅ moved INSIDE component
  const [goal, setGoal] = useState("");
  const [image, setImage] = useState("");

  const canContinue =
    title.trim() &&
    description.trim() &&
    Number(goal) > 0 &&
    (selectedBuildingId && selectedBuildingId !== "__new__"
      ? true
      : newBuilding.name.trim() &&
        newBuilding.cts_number.trim() &&
        newBuilding.street.trim());

  // handle submit

  const handleSubmit = async (event) => {
    event.preventDefault();

    const token = auth?.token || localStorage.getItem("token");

    const headers = {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Token ${token}` }),
    };

    try {
      let buildingId;

      if (selectedBuildingId === "__new__") {
        const address = [
          newBuilding.street.trim(),
          [
            newBuilding.suburb.trim(),
            newBuilding.state.trim(),
            newBuilding.postcode.trim(),
          ]
            .filter(Boolean)
            .join(" "),
        ]
          .filter(Boolean)
          .join(", ");

        const buildingRes = await fetch(
          `${import.meta.env.VITE_API_URL}/buildings/`,
          {
            method: "POST",
            headers,
            body: JSON.stringify({
              name: newBuilding.name.trim(),
              cts_number: newBuilding.cts_number.trim(),
              address,
            }),
          },
        );

        const buildingData = await buildingRes.json().catch(() => null);

        if (!buildingRes.ok) {
          const message =
            buildingData?.detail ||
            (buildingData && JSON.stringify(buildingData)) ||
            `Building create failed (${buildingRes.status})`;
          throw new Error(message);
        }

        buildingId = buildingData.id;
      } else {
        buildingId = Number(selectedBuildingId);
      }

      const fundraiserPayload = {
        title: title.trim(),
        description: description.trim(),
        goal: Number(goal),
        building: buildingId,
        ...(image.trim() && { image: image.trim() }),
      };

      const fundraiserRes = await fetch(
        `${import.meta.env.VITE_API_URL}/fundraisers/`,
        {
          method: "POST",
          headers,
          body: JSON.stringify(fundraiserPayload),
        },
      );

      const fundraiserData = await fundraiserRes.json().catch(() => null);

      if (!fundraiserRes.ok) {
        const message =
          fundraiserData?.detail ||
          (fundraiserData && JSON.stringify(fundraiserData)) ||
          `Fundraiser create failed (${fundraiserRes.status})`;
        throw new Error(message);
      }

      navigate(`/fundraiser/${fundraiserData.id}`);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
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
            className="mt-1 w-full rounded-xl border border-blueDeep/20 px-4 py-3 text-sm font-medium shadow-sm focus:border-blueBright focus:outline-none focus:ring-2 focus:ring-blueBright/20"
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
            className="mt-1 w-full rounded-xl border border-blueDeep/20 px-4 py-3 text-sm font-medium shadow-sm focus:border-blueBright focus:outline-none focus:ring-2 focus:ring-blueBright/20"
            required
          />
        </div>

        {/* Goal */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Fundraising goal ($)
          </label>
          <input
            type="number"
            min="1"
            step="1"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            placeholder="e.g. 2500"
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-pinky focus:ring-pinky"
            required
          />
        </div>

        {/* Image URL */}
        <div>
          <label className="block text-sm font-medium text-slate-700">
            Image URL (optional)
          </label>

          <input
            type="url"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="https://example.com/photo.jpg"
            className="mt-1 block w-full rounded-xl border border-slate-300 px-4 py-2 focus:border-pinky focus:ring-pinky"
          />

          {image && (
            <p className="mt-2 text-xs text-slate-600 break-all">
              Preview: {image}
            </p>
          )}
        </div>

        {/* Building selector */}
        <div>
          <label className="block text-sm font-semibold text-ink">
            Which building is this for?
          </label>

          {isLoadingBuildings ? (
            <p className="mt-2 text-sm text-blueDeep/70">Loading buildings…</p>
          ) : (
            <div className="relative mt-2">
              <select
                value={isNewBuilding ? "" : selectedBuildingId}
                disabled={isNewBuilding}
                onChange={(e) => {
                  setSelectedBuildingId(e.target.value);
                }}
                className="w-full appearance-none rounded-xl border border-blueDeep/20 bg-white px-4 py-3 pr-10 text-sm font-semibold text-ink shadow-sm focus:border-blueBright focus:outline-none focus:ring-2 focus:ring-blueBright/20"
              >
                <option value="">Select a building</option>

                {buildings.map((building) => (
                  <option key={building.id} value={building.id}>
                    {building.name}
                  </option>
                ))}
              </select>

              <button
                type="button"
                onClick={() => setSelectedBuildingId("__new__")}
                className="mt-3 text-sm font-semibold text-blueDeep hover:underline"
              >
                + Add a new building
              </button>

              {isNewBuilding && (
                <NewBuildingForm
                  value={newBuilding}
                  onChange={setNewBuilding}
                  onCancel={() => {
                    setSelectedBuildingId("");
                    setNewBuilding({
                      name: "",
                      cts_number: "",
                      street: "",
                      suburb: "",
                      state: "",
                      postcode: "",
                    });
                  }}
                />
              )}

              <div className="pointer-events-none absolute inset-y-0 right-3 flex items-center">
                <svg
                  className="h-4 w-4 text-blueDeep/60"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.23 7.21a.75.75 0 011.06.02L10 10.94l3.71-3.71a.75.75 0 111.06 1.06l-4.24 4.24a.75.75 0 01-1.06 0L5.21 8.29a.75.75 0 01.02-1.08z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          )}
        </div>

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
