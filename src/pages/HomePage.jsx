import useFundraisers from "../hooks/use-fundraisers";
import FundraiserCard from "../components/FundraiserCard";
import "./HomePage.css";

// function HomePage() {
//   const { fundraisers } = useFundraisers();
//   return (
//     <>
//       <h1 className="text-2xl font-bold">Recent Fundraisers</h1>
//       <div id="fundraiser-list">
//         {fundraisers.map((fundraiserData, key) => {
//           return <FundraiserCard key={key} fundraiserData={fundraiserData} />;
//         })}
//       </div>
//     </>
//   );
// }

// export default HomePage;
export default function HomePage() {
  return (
    <div className="p-10 bg-red-500 text-white text-4xl">TAILWIND TEST</div>
  );
}
