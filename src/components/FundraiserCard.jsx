import { Link } from "react-router-dom";

function FundraiserCard({ fundraiserData, building }) {
  const fundraiserLink = `/fundraisers/${fundraiserData.id}`;
  const buildingLink = `/buildings/${fundraiserData.building}`;

  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
      <Link to={fundraiserLink} className="block">
        <img
          src={fundraiserData.image}
          alt={fundraiserData.title}
          className="h-44 w-full rounded-xl object-cover"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/placeholder.png";
          }}
        />
        <h3 className="mt-4 text-lg font-extrabold tracking-tight text-ink">
          {fundraiserData.title}
        </h3>
        <p className="mt-2 text-sm text-slate-600 line-clamp-2">
          {fundraiserData.description}
        </p>
      </Link>

      {/* ✅ Building link */}
      <div className="mt-4 flex items-center justify-between">
        <Link
          to={buildingLink}
          className="text-sm font-semibold text-blueDeep/80 hover:text-blueDeep transition"
        >
          {building?.name
            ? `Building: ${building.name}`
            : `Building #${fundraiserData.building}`}{" "}
          →
        </Link>

        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            fundraiserData.is_open
              ? "bg-green-100 text-green-700"
              : "bg-slate-100 text-slate-600"
          }`}
        >
          {fundraiserData.is_open ? "Open" : "Closed"}
        </span>
      </div>
    </div>
  );
}

export default FundraiserCard;
