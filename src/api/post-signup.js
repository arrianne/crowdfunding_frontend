async function postSignup(username, email, password) {
  const url = `${import.meta.env.VITE_API_URL}/users/`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, email, password }),
  });

  const data = await response.json();

  if (!response.ok) {
    // DRF often returns field errors like { "username": ["..."], "password": ["..."] }
    throw data;
  }

  return data;
}

export default postSignup;
