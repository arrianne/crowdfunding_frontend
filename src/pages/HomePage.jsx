import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
  const { fundraisers } = useFundraisers();
  return (
    <>
      <h1>Recent Fundraisers</h1>
      <div id="fundraiser-list">
        {fundraisers.map((fundraiserData, key) => {
          return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
        })}
      </div>
    </>
  );
}

export default HomePage;
