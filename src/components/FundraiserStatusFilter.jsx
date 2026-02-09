export default function FundraiserStatusFilter({
  value = "open", // "all" | "open" | "closed"  (future: "funded")
  onChange,
  counts, // optional: { all, open, closed, funded }
  className = "",
}) {
  const items = [
    { key: "all", label: "All" },
    { key: "open", label: "Open" },
    { key: "closed", label: "Closed" },
    // Future:
    // { key: "funded", label: "Funded" },
  ];

  return (
    <div
      className={`inline-flex flex-wrap items-center gap-2 rounded-full bg-white p-1 ring-1 ring-blueDeep/10 shadow-sm ${className}`}
      role="group"
      aria-label="Filter fundraisers"
    >
      {items.map((item) => {
        const isActive = value === item.key;
        const count = counts?.[item.key];

        return (
          <button
            key={item.key}
            type="button"
            onClick={() => onChange(item.key)}
            className={`inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition ${
              isActive
                ? "bg-blueBright text-white shadow-sm"
                : "text-blueDeep/80 hover:bg-blueBright/10"
            }`}
            aria-pressed={isActive}
          >
            <span>{item.label}</span>
            {typeof count === "number" && (
              <span
                className={`inline-flex min-w-[1.75rem] justify-center rounded-full px-2 py-0.5 text-xs font-extrabold ${
                  isActive
                    ? "bg-white/20 text-white"
                    : "bg-blueDeep/5 text-blueDeep/70"
                }`}
              >
                {count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
