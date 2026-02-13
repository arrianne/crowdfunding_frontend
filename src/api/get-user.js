// src/api/get-user.js
export default async function getUser(userId, token) {
  const headers = {};
  if (token) {
    headers.Authorization = `Token ${token}`;
  }
  const response = await fetch(
    `${import.meta.env.VITE_API_URL}/users/${userId}/`,
    { headers },
  );

  if (!response.ok) {
    throw new Error("Could not fetch user details");
  }

  return await response.json(); // expect { id, username, ... }
}
