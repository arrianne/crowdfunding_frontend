export default function NewBuildingForm({
  value,
  onChange,
  onCancel,
  showCancel = true,
}) {
  // helper to update a single field
  const setField = (key) => (e) =>
    onChange({ ...value, [key]: e.target.value });

  return (
    <div className="rounded-xl bg-blueBright/5 p-4 space-y-4">
      <div className="flex items-center justify-between gap-3">
        <p className="text-sm font-semibold text-blueDeep">
          New building details
        </p>

        {showCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="text-sm font-semibold text-blueDeep hover:underline"
          >
            Cancel
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink">
          Building name
        </label>
        <input
          value={value.name}
          onChange={setField("name")}
          className="mt-1 w-full rounded-xl border border-blueDeep/20 px-4 py-3 text-sm"
          placeholder="e.g. Pleasantville Apartments"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink">
          Street address
        </label>
        <input
          value={value.street}
          onChange={setField("street")}
          className="mt-1 w-full rounded-xl border border-blueDeep/20 px-4 py-3 text-sm"
          placeholder="e.g. 96 Goldieslie Rd"
        />
      </div>

      <div>
        <label className="block text-sm font-semibold text-ink">
          CTS number
        </label>
        <input
          value={value.cts_number}
          onChange={setField("cts_number")}
          className="mt-1 w-full rounded-xl border border-blueDeep/20 px-4 py-3 text-sm"
          placeholder="e.g. 12345"
          required
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label className="block text-sm font-semibold text-ink">Suburb</label>
          <input
            value={value.suburb}
            onChange={setField("suburb")}
            className="mt-1 w-full rounded-xl border border-blueDeep/20 px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink">State</label>
          <input
            value={value.state}
            onChange={setField("state")}
            className="mt-1 w-full rounded-xl border border-blueDeep/20 px-4 py-3 text-sm"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold text-ink">
            Postcode
          </label>
          <input
            value={value.postcode}
            onChange={setField("postcode")}
            className="mt-1 w-full rounded-xl border border-blueDeep/20 px-4 py-3 text-sm"
          />
        </div>
      </div>
    </div>
  );
}
