async function getBuildingFundraisers(buildingId) {
  const url = `${import.meta.env.VITE_API_URL}/buildings/${buildingId}/fundraisers/`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch building fundraisers");
  }

  return await response.json();
}

export default getBuildingFundraisers;
