export async function putFundraiser(id, formData, token) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/fundraisers/${id}/`,
    {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        ...(token && { Authorization: `Token ${token}` }),
      },
      body: JSON.stringify({
        title: formData.title,
        description: formData.description,
        goal: formData.goal,
        image: formData.image, // keep for now (photos later)
        is_open: formData.is_open,
        building: formData.building,
      }),
    },
  );

  if (!response.ok) {
    const errorData = await response.json().catch(() => null);
    throw new Error(
      errorData ? JSON.stringify(errorData) : "Failed to update fundraiser",
    );
  }

  return await response.json();
}
