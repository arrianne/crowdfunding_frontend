export async function postPledge(data, token) {
  const response = await fetch(`${import.meta.env.VITE_API_URL}/pledges/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      ...(token && { Authorization: `Token ${token}` }),
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData ? JSON.stringify(errorData) : "Failed to create pledge",
    );
  }

  return await response.json();
}
