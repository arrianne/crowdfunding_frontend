const buildingRes = await fetch(`${import.meta.env.VITE_API_URL}/buildings/`, {
  method: "POST",
  headers,
  body: JSON.stringify({
    name: newBuilding.name.trim(),
    cts_number: newBuilding.cts_number.trim(),
    address: newBuilding.address.trim(),
    ...(newBuilding.description.trim() && {
      description: newBuilding.description.trim(),
    }),
  }),
});
