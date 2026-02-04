async function getBuilding(buildingId) {
  const url = `${import.meta.env.VITE_API_URL}/buildings/${buildingId}/`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch building");
  }

  return await response.json();
}

export default getBuilding;
