/**
 * Inline delete confirmation UI. Renders under the Edit/Delete buttons
 * with a message, bullet points, and Cancel/OK actions.
 *
 * @param {string} variant - "dark" for blue hero (default), "light" for light backgrounds
 */
function DeleteConfirm({
  isOpen,
  onCancel,
  onConfirm,
  title,
  bullets,
  error,
  isDeleting,
  variant = "dark",
}) {
  if (!isOpen) return null;

  const styles = {
    light: {
      container: "rounded-xl bg-white p-4 ring-1 ring-blueDeep/15 shadow-sm",
      title: "text-sm font-semibold text-ink",
      bullets: "mt-2 list-inside list-disc space-y-1 text-sm text-blueDeep/80",
      error: "mt-3 text-sm text-red-600",
      cancel:
        "rounded-full bg-slate-100 px-4 py-2 text-sm font-semibold text-slate-700 ring-1 ring-slate-200 hover:bg-slate-200 transition",
    },
    dark: {
      container: "rounded-xl bg-white/10 p-4 ring-1 ring-white/20",
      title: "text-sm font-semibold text-white",
      bullets: "mt-2 list-inside list-disc space-y-1 text-sm text-white/90",
      error: "mt-3 text-sm text-red-200",
      cancel:
        "rounded-full bg-white/20 px-4 py-2 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/30 transition",
    },
  };
  const s = styles[variant] ?? styles.dark;

  return (
    <div className={s.container}>
      <p className={s.title}>{title}</p>
      <ul className={s.bullets}>
        {bullets.map((bullet, i) => (
          <li key={i}>{bullet}</li>
        ))}
      </ul>
      {error && <p className={s.error}>{error}</p>}
      <div className="mt-4 flex gap-3">
        <button onClick={onCancel} className={s.cancel}>
          Cancel
        </button>
        <button
          onClick={onConfirm}
          disabled={isDeleting}
          className="rounded-full bg-red-500 px-4 py-2 text-sm font-semibold text-white hover:bg-red-600 transition disabled:opacity-50"
        >
          {isDeleting ? "Deleting…" : "OK"}
        </button>
      </div>
    </div>
  );
}

export default DeleteConfirm;
