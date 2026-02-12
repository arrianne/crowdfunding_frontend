export async function deletePledge(pledgeId, token) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/pledges/${pledgeId}/`,
    {
      method: "DELETE",
      headers: {
        ...(token && { Authorization: `Token ${token}` }),
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete pledge");
  }
}
