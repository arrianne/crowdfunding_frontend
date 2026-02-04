import { Link } from "react-router-dom";
import NewFundraiserForm from "../components/NewFundraiserForm.jsx";

function NewFundraiserPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-sky-50 via-white to-white text-slate-900">
      {/* HEADER */}
      <section className="relative overflow-hidden bg-blueDeep">
        <div className="mx-auto max-w-6xl px-6 pt-16 pb-20 sm:pt-20 sm:pb-24">
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
              community project.
            </p>
          </div>
        </div>
      </section>

      {/* CONTENT */}
      <section className="bg-white">
        <div className="mx-auto max-w-3xl px-6 pt-12 pb-24">
          <NewFundraiserForm />
        </div>
      </section>
    </div>
  );
}

export default NewFundraiserPage;
