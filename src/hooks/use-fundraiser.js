import { useState, useEffect } from "react";
import getFundraiser from "../api/get-fundraiser";

export default function useFundraiser(fundraiserId, refreshKey = 0) {
  const [fundraiser, setFundraiser] = useState();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    let isMounted = true;

    setIsLoading(true);
    setError(undefined);

    getFundraiser(fundraiserId)
      .then((fundraiser) => {
        if (!isMounted) return;
        setFundraiser(fundraiser);
        setIsLoading(false);
      })
      .catch((error) => {
        if (!isMounted) return;
        setError(error);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [fundraiserId, refreshKey]); // ✅ refreshKey triggers a refetch

  return { fundraiser, isLoading, error };
}
