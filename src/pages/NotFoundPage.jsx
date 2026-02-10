import { Link, useLocation } from "react-router-dom";

export default function NotFoundPage() {
  const location = useLocation();

  return (
    <main className="min-h-[70vh] bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-16">
        <div className="overflow-hidden rounded-3xl bg-white shadow-sm ring-1 ring-blueDeep/10">
          {/* Top band */}
          <div className="relative overflow-hidden bg-blueDeep px-8 py-12">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/25">
                404 • Page not found
              </p>
              <h1 className="mt-5 text-3xl font-extrabold tracking-tight text-blueSky sm:text-4xl">
                This page has slipped out the fire exit.
              </h1>
              <p className="mt-3 text-base leading-relaxed text-white/90">
                We couldn’t find{" "}
                <span className="font-semibold text-white">
                  {location.pathname}
                </span>
                . It might’ve been moved, renamed, or never existed (like that
                “quick five-minute fix”).
              </p>

              <div className="mt-7 flex flex-wrap gap-3">
                <Link
                  to="/"
                  className="inline-flex items-center justify-center rounded-xl bg-pinky px-5 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
                >
                  Go to homepage
                </Link>
                <Link
                  to="/fundraisers"
                  className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/25 hover:bg-white/15 transition"
                >
                  Browse fundraisers
                </Link>
              </div>
            </div>

            {/* Decorative blobs */}
            <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-blueBright/20 blur-2xl" />
            <div className="pointer-events-none absolute -left-24 -bottom-24 h-72 w-72 rounded-full bg-pinky/20 blur-2xl" />
          </div>

          {/* Help box */}
          <div className="px-8 py-8">
            <div className="rounded-2xl bg-blueSky/10 p-6 ring-1 ring-blueDeep/10">
              <h2 className="text-base font-extrabold text-ink">
                What you can do next
              </h2>
              <ul className="mt-3 space-y-2 text-sm text-blueDeep/80">
                <li>• Check the URL for typos.</li>
                <li>• Use the navigation to find the fundraiser/building.</li>
                <li>
                  • If you expected this link to work, it may be a missing
                  route.
                </li>
              </ul>

              <div className="mt-5 flex flex-wrap gap-3">
                <Link
                  to="/buildings"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blueDeep shadow-sm ring-1 ring-blueDeep/10 hover:bg-slate-50 transition"
                >
                  View buildings
                </Link>
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center rounded-xl bg-white px-4 py-2 text-sm font-semibold text-blueDeep shadow-sm ring-1 ring-blueDeep/10 hover:bg-slate-50 transition"
                >
                  Contact
                </Link>
              </div>
            </div>

            {/* Tiny debug line (optional) */}
            <p className="mt-6 text-xs text-slate-400">
              If this happened after refresh on a hosted site, it’s usually a
              SPA routing/server rewrite issue.
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
