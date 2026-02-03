import { Link } from "react-router-dom";
import LoginForm from "../components/LoginForm";

function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      {/* HERO */}
      <section className="relative overflow-hidden bg-blueDeep">
        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-56 md:pt-36 lg:pb-64">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            {/* Left: copy */}
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30">
                Welcome back ✨
              </p>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-blueSky sm:text-5xl md:text-6xl">
                Log in to StrataBoost
              </h1>

              <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
                Pick up where you left off — support a fundraiser, start one of
                your own, or manage your profile.
              </p>

              <div className="mt-8 flex flex-wrap items-center gap-3">
                <Link
                  to="/"
                  className="rounded-xl bg-white/20 px-6 py-3 text-sm font-semibold text-white ring-1 ring-white/30 hover:bg-white/30 transition"
                >
                  Back to home
                </Link>

                <Link
                  to="/fundraisers"
                  className="rounded-xl bg-pinky px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 transition"
                >
                  Browse fundraisers
                </Link>
              </div>

              <p className="mt-6 text-sm text-white/70">
                Don’t have an account yet?{" "}
                <Link
                  to="/signup"
                  className="font-semibold text-white underline"
                >
                  Create one
                </Link>
              </p>
            </div>

            {/* Right: login card */}
            <div className="relative">
              <div className="rounded-2xl bg-white/95 p-6 shadow-xl ring-1 ring-white/20 backdrop-blur sm:p-8">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-xl font-extrabold tracking-tight text-ink">
                      Sign in
                    </h2>
                    <p className="mt-1 text-sm text-slate-600">
                      Use your StrataBoost username and password.
                    </p>
                  </div>

                  <span className="inline-flex items-center rounded-full bg-blueDeep/10 px-3 py-1 text-xs font-semibold text-blueDeep">
                    Secure login
                  </span>
                </div>

                <div className="mt-6">
                  <LoginForm />
                </div>

                <div className="mt-6 flex items-center justify-between">
                  <Link
                    to="/forgot-password"
                    className="text-sm font-semibold text-blueDeep/80 hover:text-blueDeep transition"
                  >
                    Forgot password?
                  </Link>

                  <Link
                    to="/"
                    className="text-sm font-semibold text-slate-600 hover:text-slate-900 transition"
                  >
                    Cancel
                  </Link>
                </div>
              </div>

              <p className="mt-4 text-xs text-white/65">
                By logging in, you agree to be a decent human and not start a
                fundraiser for “New office espresso machine (emergency)”.
              </p>
            </div>
          </div>
        </div>

        {/* Building image pinned bottom-right */}
        <div className="pointer-events-none absolute bottom-0 right-0 z-10 max-h-[420px] overflow-hidden">
          <img
            src="/images/hero-building.png"
            alt=""
            className="w-[650px] sm:w-[780px] md:w-[920px] lg:w-[1080px] opacity-95"
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

      {/* Below hero (optional) */}
      <section className="bg-white">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-24">
          <div className="grid gap-6 sm:grid-cols-3">
            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-ink">
                Start faster
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Create fundraisers in minutes with clear steps and friendly
                copy.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-ink">
                Support safely
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Keep your token tucked away and your neighbours supported.
              </p>
            </div>

            <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
              <h3 className="text-base font-extrabold text-ink">
                Stay organised
              </h3>
              <p className="mt-2 text-sm text-slate-600">
                Track your fundraisers and pledges without spreadsheet despair.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default LoginPage;
