import { Link } from "react-router-dom";

function NewFundraiserPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      {/* HEADER / MINI HERO */}
      <section className="relative overflow-hidden bg-blueDeep">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
          {/* Mini nav */}
          <Link
            to="/"
            className="inline-flex items-center rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25 hover:bg-white/20 transition"
          >
            ← Back
          </Link>

          <div className="mt-6 max-w-3xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30">
              Start a fundraiser
            </p>

            <h1 className="mt-4 text-3xl font-extrabold tracking-tight text-blueSky sm:text-4xl">
              What are you raising support for?
            </h1>

            <p className="mt-4 text-base leading-relaxed text-white/90 sm:text-lg">
              Start a fundraiser for your building, a shared repair, or a
              community project. You’ll choose the building next.
            </p>
          </div>
        </div>

        {/* Curve divider */}
        <div className="pointer-events-none absolute bottom-0 left-0 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="block h-16 w-full"
          >
            <path
              d="M0,40 C240,80 480,80 720,60 960,40 1200,20 1440,0 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-24">
          <div className="rounded-2xl bg-white p-6 ring-1 ring-blueDeep/10 shadow-sm">
            <h2 className="text-lg font-extrabold text-ink">
              Fundraiser details
            </h2>

            <p className="mt-2 text-sm text-blueDeep/70">
              Tell neighbours what’s happening and why it matters.
            </p>

            {/* FORM (stub for now) */}
            <form className="mt-6 space-y-5">
              <div>
                <label className="block text-sm font-semibold text-ink">
                  Fundraiser title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Fix the leaking roof"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blueBright focus:outline-none focus:ring-2 focus:ring-blueBright/20"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-ink">
                  Description
                </label>
                <textarea
                  rows={4}
                  placeholder="What’s going on? Why does it matter?"
                  className="mt-1 w-full rounded-xl border border-slate-300 px-4 py-2.5 text-sm focus:border-blueBright focus:outline-none focus:ring-2 focus:ring-blueBright/20"
                />
              </div>

              {/* Building selection placeholder */}
              <div className="rounded-xl bg-blueBright/5 p-4">
                <p className="text-sm font-semibold text-blueDeep">Building</p>
                <p className="mt-1 text-sm text-blueDeep/70">
                  You’ll choose the building this fundraiser belongs to in the
                  next step.
                </p>
              </div>

              <button
                type="button"
                className="mt-4 inline-flex rounded-xl bg-pinky px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
              >
                Continue
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}

export default NewFundraiserPage;
