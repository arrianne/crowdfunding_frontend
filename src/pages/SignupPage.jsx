import { Link } from "react-router-dom";
import SignupForm from "../components/SignupForm";

function SignupPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      <section className="relative overflow-hidden bg-blueDeep">
        <div className="relative mx-auto max-w-6xl px-6 pt-28 pb-56 md:pt-36 lg:pb-64">
          <div className="grid gap-10 lg:grid-cols-2 lg:items-start">
            <div className="max-w-2xl">
              <p className="inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs font-semibold text-white ring-1 ring-white/30">
                New here? ✨
              </p>

              <h1 className="mt-6 text-4xl font-extrabold tracking-tight text-blueSky sm:text-5xl md:text-6xl">
                Create your StrataBoost account
              </h1>

              <p className="mt-5 text-base leading-relaxed text-white/90 sm:text-lg">
                Start fundraisers, pledge support, and keep your building
                projects moving.
              </p>

              <p className="mt-6 text-sm text-white/70">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-white underline"
                >
                  Log in
                </Link>
              </p>
            </div>

            <div className="rounded-2xl bg-white/95 p-6 shadow-xl ring-1 ring-white/20 backdrop-blur sm:p-8">
              <h2 className="text-xl font-extrabold tracking-tight text-ink">
                Sign up
              </h2>
              <p className="mt-1 text-sm text-slate-600">
                Takes about 20 seconds.
              </p>

              <div className="mt-6">
                <SignupForm />
              </div>
            </div>
          </div>
        </div>

        <div className="pointer-events-none absolute bottom-0 right-0 z-10 max-h-[420px] overflow-hidden">
          <img
            src="/images/hero-building.png"
            alt=""
            className="w-[650px] sm:w-[780px] md:w-[920px] lg:w-[1080px] opacity-95"
          />
        </div>

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
    </div>
  );
}

export default SignupPage;
