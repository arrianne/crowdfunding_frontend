import { useId } from "react";

export default function NewBuildingForm({
  value,
  onChange,
  onCancel,
  showCancel = true,
  errors = {},
}) {
  const id = useId();

  const setField = (key) => (e) =>
    onChange({ ...value, [key]: e.target.value });

  const fieldClass = (key) =>
    [
      "mt-1 w-full rounded-xl border px-4 py-3 text-sm shadow-sm focus:outline-none focus:ring-2",
      errors?.[key]
        ? "border-red-300 focus:ring-red-200 focus:border-red-400"
        : "border-blueDeep/20 focus:ring-blueBright/20 focus:border-blueBright",
    ].join(" ");

  const ErrorText = ({ name }) =>
    errors?.[name] ? (
      <p className="mt-1 text-sm font-semibold text-red-600">{errors[name]}</p>
    ) : null;

  const fieldId = (key) => `${id}-${key}`;

  return (
    <div className="rounded-xl bg-blueBright/5 p-4 space-y-4 ring-1 ring-blueDeep/10">
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
        <label htmlFor={fieldId("name")} className="block text-sm font-semibold text-ink">
          Building name <span className="text-red-500">*</span>
        </label>
        <input
          id={fieldId("name")}
          value={value.name}
          onChange={setField("name")}
          className={fieldClass("name")}
          placeholder="e.g. Pleasantville Apartments"
        />
        <ErrorText name="name" />
      </div>

      <div>
        <label htmlFor={fieldId("street")} className="block text-sm font-semibold text-ink">
          Street address <span className="text-red-500">*</span>
        </label>
        <input
          id={fieldId("street")}
          value={value.street}
          onChange={setField("street")}
          className={fieldClass("street")}
          placeholder="e.g. 96 Goldieslie Rd"
        />
        <ErrorText name="street" />
      </div>

      <div>
        <label htmlFor={fieldId("cts_number")} className="block text-sm font-semibold text-ink">
          CTS number <span className="text-red-500">*</span>
        </label>
        <input
          id={fieldId("cts_number")}
          value={value.cts_number}
          onChange={setField("cts_number")}
          className={fieldClass("cts_number")}
          placeholder="e.g. 12345"
        />
        <ErrorText name="cts_number" />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
        <div>
          <label htmlFor={fieldId("suburb")} className="block text-sm font-semibold text-ink">Suburb <span className="text-slate-500 font-normal">(optional)</span></label>
          <input
            id={fieldId("suburb")}
            value={value.suburb}
            onChange={setField("suburb")}
            className={fieldClass("suburb")}
          />
          <ErrorText name="suburb" />
        </div>

        <div>
          <label htmlFor={fieldId("state")} className="block text-sm font-semibold text-ink">State <span className="text-slate-500 font-normal">(optional)</span></label>
          <input
            id={fieldId("state")}
            value={value.state}
            onChange={setField("state")}
            className={fieldClass("state")}
          />
          <ErrorText name="state" />
        </div>

        <div>
          <label htmlFor={fieldId("postcode")} className="block text-sm font-semibold text-ink">
            Postcode <span className="text-slate-500 font-normal">(optional)</span>
          </label>
          <input
            id={fieldId("postcode")}
            value={value.postcode}
            onChange={setField("postcode")}
            className={fieldClass("postcode")}
          />
          <ErrorText name="postcode" />
        </div>
      </div>
    </div>
  );
}
