import { allFundraisers } from "../data";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

function HomePage() {
  return (
    <>
      <h1>Recent Fundraisers</h1>
      <div id="fundraiser-list">
        {allFundraisers.map((fundraiserData, key) => {
          return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
        })}
      </div>
    </>
  );
}

export default HomePage;
