// src/api/post-login.js
export default async function postLogin(username, password) {
  const url = `${import.meta.env.VITE_API_URL}/api-token-auth/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  // If login fails, DRF usually returns useful JSON describing why
  if (!response.ok) {
    let errorDetail = "";
    try {
      const data = await response.json();
      errorDetail = JSON.stringify(data);
    } catch {
      errorDetail = await response.text();
    }

    console.error("Login failed:", response.status, errorDetail);
    throw new Error(`Login failed (${response.status}): ${errorDetail}`);
  }

  return await response.json(); // { token, user_id, ... }
}
