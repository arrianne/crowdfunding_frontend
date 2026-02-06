import { Link } from "react-router-dom";

function About() {
  return (
    <main className="bg-white">
      {/* HERO */}
      <section className="relative overflow-hidden bg-blueDeep">
        {/* Text container */}
        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-56 md:pt-36 lg:pb-64">
          <div className="max-w-2xl">
            {/* Tag */}
            <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30">
              About StrataBoost
            </p>

            {/* Headline */}
            <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-blueSky sm:text-5xl md:text-6xl">
              Getting things fixed — together.
            </h1>

            {/* Supporting copy */}
            <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
              Communal strata living can be wonderful — shared spaces, familiar
              faces, and a real sense of neighbourhood. But when major repairs
              come up and the sinking fund is low, it can quickly feel
              overwhelming.
            </p>

            <p className="mt-4 text-base leading-relaxed text-white/80">
              StrataBoost helps buildings rally support and get essential works
              done, so there’s less stress around money — and more time for the
              good stuff, like social events and actually enjoying where you
              live.
            </p>
          </div>
        </div>

        {/* Image pinned to bottom-right (same as homepage) */}
        <div className="pointer-events-none absolute bottom-0 right-0 z-10 max-h-[420px] overflow-hidden">
          <img
            src="/images/happy-neighbours.png"
            alt="Residents enjoying their building community"
            className="w-[520px] sm:w-[640px] md:w-[760px] lg:w-[900px] opacity-95"
          />
        </div>

        {/* Curve divider */}
        <div className="pointer-events-none absolute bottom-0 left-0 z-20 w-full overflow-hidden leading-none">
          <svg
            viewBox="0 0 1440 80"
            preserveAspectRatio="none"
            className="block h-20 w-full"
          >
            <path
              d="M0,40 C240,80 480,80 720,60 960,40 1200,20 1440,0 L1440,80 L0,80 Z"
              fill="white"
            />
          </svg>
        </div>
      </section>

      {/* BODY */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <div className="grid gap-12 lg:grid-cols-3">
          {/* Left: Story */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-extrabold tracking-tight text-slate-900">
              Why StrataBoost exists
            </h2>

            <div className="mt-6 space-y-5 text-slate-700 leading-relaxed">
              <p>
                Living in strata can be brilliant — shared spaces, familiar
                faces, and that tiny thrill when someone waters the foyer plants
                without being asked.
              </p>

              <p>
                But when a big repair lands (waterproofing, concrete spalling,
                roof leaks, lifts, fire compliance…), the reality can hit hard:
                the sinking fund might not be ready, special levies are
                stressful, and organising agreement across a whole building
                takes time.
              </p>

              <p>
                StrataBoost is a simple way for committees and residents to fund
                essential works together — transparently — so the building can
                get safe, functional, and future-proof again.
              </p>

              <p>
                The goal isn’t “more admin”. It’s less. Get the important stuff
                done, reduce the stress, and free up energy for the good parts
                of community living — like BBQs, Christmas lights, and the
                occasional “we should do a trivia night” moment that actually
                happens.
              </p>
            </div>

            {/* Small callout */}
            <div className="mt-10 rounded-2xl bg-slate-50 p-6 ring-1 ring-slate-200">
              <h3 className="text-sm font-semibold text-slate-900">
                The vibe: calm, clear, collective
              </h3>
              <p className="mt-2 text-sm text-slate-700">
                No pressure tactics. No confusing fine print. Just a practical
                way to rally support — whether that’s money, skills, or both.
              </p>
            </div>
          </div>

          {/* Right: Principles / cards */}
          <aside className="space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Transparent fundraising
              </h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                Clear goals, clear progress, and clear outcomes — so everyone
                knows what’s happening and why.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                Built for committees (and humans)
              </h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                Strata decisions are hard enough. The platform should feel
                straightforward, not like doing your taxes in a maze.
              </p>
            </div>

            <div className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
              <h3 className="text-base font-bold text-slate-900">
                More time for what matters
              </h3>
              <p className="mt-2 text-sm text-slate-700 leading-relaxed">
                Fix the building issues sooner — so your community can spend
                more time on the fun stuff (and less time on email threads).
              </p>
            </div>

            <div className="rounded-2xl bg-blueDeep p-6 text-white shadow-sm">
              <h3 className="text-base font-bold">
                Ready to help your building?
              </h3>
              <p className="mt-2 text-sm text-white/80 leading-relaxed">
                Start a fundraiser in minutes and rally your neighbours.
              </p>
              <Link
                to="/create"
                className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white ring-1 ring-white/20 hover:bg-white/15 transition"
              >
                Start a fundraiser
              </Link>
            </div>
          </aside>
        </div>
      </section>

      {/* FINAL CTA STRIP */}
      <section className="border-t border-slate-200 bg-white">
        <div className="mx-auto max-w-6xl px-6 py-14">
          <div className="flex flex-col gap-6 md:flex-row md:items-center md:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-xl font-extrabold tracking-tight text-slate-900">
                Community living is better when the building works.
              </h2>
              <p className="mt-2 text-slate-700">
                StrataBoost helps you get repairs funded and finished — so your
                building can feel like a home again.
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Link
                to="/fundraisers"
                className="inline-flex items-center justify-center rounded-xl bg-slate-900 px-6 py-3 text-sm font-semibold text-white hover:opacity-90 transition"
              >
                Explore fundraisers
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center justify-center rounded-xl bg-slate-100 px-6 py-3 text-sm font-semibold text-slate-900 ring-1 ring-slate-200 hover:bg-slate-200 transition"
              >
                Contact
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

export default About;
