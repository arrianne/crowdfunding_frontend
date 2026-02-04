import { useEffect, useState } from "react";
import getBuilding from "../api/get-building";

export default function useBuilding(buildingId) {
  const [building, setBuilding] = useState(null);
  const [isLoadingBuilding, setIsLoadingBuilding] = useState(false);
  const [buildingError, setBuildingError] = useState(null);

  useEffect(() => {
    if (!buildingId) return;

    let isMounted = true;
    setIsLoadingBuilding(true);
    setBuildingError(null);

    getBuilding(buildingId)
      .then((data) => {
        if (isMounted) setBuilding(data);
      })
      .catch((err) => {
        if (isMounted) setBuildingError(err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingBuilding(false);
      });

    return () => {
      isMounted = false;
    };
  }, [buildingId]);

  return { building, isLoadingBuilding, buildingError };
}
