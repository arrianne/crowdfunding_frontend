import { useState, useEffect } from "react";
import getUserPledges from "../api/get-user-pledges";

export default function useUserPledges(userId, token, refreshKey = 0) {
  const [pledges, setPledges] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!userId || !token) {
      setPledges([]);
      setIsLoading(false);
      return;
    }

    let isMounted = true;
    setIsLoading(true);
    setError(null);

    getUserPledges(userId, token)
      .then((data) => {
        if (!isMounted) return;
        const raw = Array.isArray(data) ? data : data?.results ?? [];
        // Only show pledges belonging to this user (in case API doesn't filter by ?supporter=)
        const mine = raw.filter((p) => {
          const sid = p.supporter ?? p.supporter_id;
          return sid != null && String(sid) === String(userId);
        });
        setPledges(mine);
        setIsLoading(false);
      })
      .catch((err) => {
        if (!isMounted) return;
        setError(err);
        setPledges([]);
        setIsLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [userId, token, refreshKey]);

  return { pledges, isLoading, error };
}
