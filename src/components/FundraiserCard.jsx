import { Link } from "react-router-dom";
import "./FundraiserCard.css";

function FundraiserCard(props) {
  const { fundraiserData } = props;

  return (
    <div className="fundraiser-card">
      <Link to="/fundraiser">
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
