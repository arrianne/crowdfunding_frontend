import { useParams, Link } from "react-router-dom";

function BuildingPage() {
  const { id } = useParams();

  return (
    <div className="min-h-screen bg-white">
      <div className="mx-auto max-w-4xl px-6 pt-28 pb-20">
        <Link
          to="/"
          className="text-sm font-semibold text-blueDeep/80 hover:text-blueDeep transition"
        >
          ← Back to home
        </Link>

        <h1 className="mt-6 text-3xl font-extrabold tracking-tight text-ink">
          Building #{id}
        </h1>

        <p className="mt-4 text-slate-600">
          This is the building page. Fundraisers for this building will live
          here.
        </p>
      </div>
    </div>
  );
}

export default BuildingPage;
