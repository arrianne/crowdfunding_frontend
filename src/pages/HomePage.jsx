import { allFundraisers } from "../data";

function HomePage() {
  return (
    <div>
      {allFundraisers.map((fundraiserData, key) => {
        return <div key={key}>{fundraiserData.title}</div>;
      })}
    </div>
  );
}

export default HomePage;
