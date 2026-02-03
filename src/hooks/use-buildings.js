import { useEffect, useState } from "react";
import getBuildings from "../api/get-buildings";

export default function useBuildings() {
  const [buildings, setBuildings] = useState([]);
  const [isLoadingBuildings, setIsLoadingBuildings] = useState(true);
  const [buildingsError, setBuildingsError] = useState(null);

  useEffect(() => {
    let isMounted = true;

    getBuildings()
      .then((data) => {
        if (isMounted) setBuildings(data);
      })
      .catch((err) => {
        if (isMounted) setBuildingsError(err);
      })
      .finally(() => {
        if (isMounted) setIsLoadingBuildings(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  return { buildings, isLoadingBuildings, buildingsError };
}
