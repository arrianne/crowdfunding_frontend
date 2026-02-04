import { useEffect, useState } from "react";
import getBuildingFundraisers from "../api/get-building-fundraisers";

export default function useBuildingFundraisers(buildingId) {
  const [fundraisers, setFundraisers] = useState([]);
  const [isLoadingFundraisers, setIsLoadingFundraisers] = useState(true);
  const [fundraisersError, setFundraisersError] = useState(null);

  useEffect(() => {
    if (!buildingId) return;

    let isMounted = true;
    setIsLoadingFundraisers(true);
    setFundraisersError(null);

    getBuildingFundraisers(buildingId)
      .then((data) => {
        if (isMounted) setFundraisers(data);
      })
      .catch((err) => {
        if (isMounted) setFundraisersError(err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingFundraisers(false);
      });

    return () => {
      isMounted = false;
    };
  }, [buildingId]);

  return { fundraisers, isLoadingFundraisers, fundraisersError };
}
