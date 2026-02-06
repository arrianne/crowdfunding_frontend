export async function putBuilding(id, building, token) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/buildings/${id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Token ${token}`,
      },
      body: JSON.stringify({
        name: building.name,
        cts_number: building.cts_number,
        address: building.address,
        description: building.description,
        photo: building.photo ?? null,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData ? JSON.stringify(errorData) : "Failed to update building",
    );
  }

  return await response.json();
}
