import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
  const { fundraiserData } = props;
  const fundraiserLink = `fundraiser/${fundraiserData.id}`;

  return (
    <div className="fundraiser-card">
      <Link to={fundraiserLink}>
        <img
          src={fundraiserData.image}
          alt={fundraiserData.title}
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = "/images/placeholder.png";
          }}
        />
        <h3>{fundraiserData.title}</h3>
      </Link>
    </div>
  );
}

export default FundraiserCard;
