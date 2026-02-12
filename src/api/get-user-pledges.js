/**
 * Fetches pledges made by the given user.
 * Uses GET /pledges/?supporter=<userId>. If your backend uses
 * e.g. GET /users/<userId>/pledges/, change the URL below.
 */
export default async function getUserPledges(userId, token) {
  if (!userId || !token) return [];

  const url = new URL(`${import.meta.env.VITE_API_URL}/pledges/`);
  url.searchParams.set("supporter", userId);

  const response = await fetch(url, {
    method: "GET",
    headers: {
      Authorization: `Token ${token}`,
    },
  });

  if (!response.ok) {
    const data = await response.json().catch(() => null);
    throw new Error(data?.detail ?? "Failed to fetch your pledges");
  }

  return await response.json();
}
