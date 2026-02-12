export async function putPledge(pledgeId, data, token) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/pledges/${pledgeId}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Token ${token}` }),
      },
      body: JSON.stringify(data),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData ? JSON.stringify(errorData) : "Failed to update pledge",
    );
  }

  return await response.json();
}
