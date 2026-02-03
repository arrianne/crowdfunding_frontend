async function getBuildings() {
  const url = `${import.meta.env.VITE_API_URL}/buildings`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error("Failed to fetch buildings");
  }

  return await response.json();
}

export default getBuildings;
