export async function deleteBuilding(id, token) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/buildings/${id}/`,
    {
      method: "DELETE",
      headers: {
        ...(token && { Authorization: `Token ${token}` }),
      },
    },
  );

  if (!response.ok) {
    throw new Error("Failed to delete building");
  }
}
