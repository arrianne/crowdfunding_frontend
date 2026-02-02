import { Link } from "react-router-dom";

function FundraiserCard({ fundraiserData }) {
  const fundraiserLink = `/fundraiser/${fundraiserData.id}`;

  return (
    <Link
      to={fundraiserLink}
      className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-blueDeep/10 shadow-sm transition hover:-translate-y-1 hover:shadow-lg hover:ring-blueBright/25"
    >
      {/* Image */}
      <div className="relative h-44 overflow-hidden bg-blueSky/30">
        <img
          src={fundraiserData.image}
          alt={fundraiserData.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/placeholder.png";
          }}
        />

        {/* Soft colour wash to match your palette */}
        <div className="absolute inset-0 bg-gradient-to-t from-blueSky/40 via-transparent to-transparent" />

        {/* Little corner badge */}
        <div className="absolute left-3 top-3 rounded-full bg-white/80 px-3 py-1 text-xs font-semibold text-blueDeep ring-1 ring-blueDeep/10 backdrop-blur">
          Community
        </div>
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="text-base font-extrabold leading-snug text-ink line-clamp-2">
          {fundraiserData.title}
        </h3>

        <p className="mt-2 text-sm text-blueDeep/80 line-clamp-2">
          A small chip-in can make a big difference.
        </p>

        {/* Footer */}
        <div className="mt-4 flex items-center justify-between">
          <span className="inline-flex items-center rounded-full bg-blueBright/10 px-3 py-1 text-xs font-semibold text-blueDeep">
            View details
          </span>

          <span className="text-sm font-bold text-pinky group-hover:underline">
            Chip in →
          </span>
        </div>
      </div>
    </Link>
  );
}

export default FundraiserCard;
