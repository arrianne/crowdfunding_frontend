// src/api/get-user.js
export default async function getUser(userId, token) {
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${userId}/`,
    {
      headers: {
        Authorization: `Token ${token}`,
      },
    },
  );

  if (!response.ok) {
    throw new Error("Could not fetch user details");
  }

  return await response.json(); // expect { id, username, ... }
}
