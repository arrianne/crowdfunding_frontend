import { useState } from "react";
import postLogin from "../api/post-login.js";
import getUser from "../api/get-user.js";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth.js";

function LoginForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [error, setError] = useState(null);

  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const handleChange = (event) => {
    const { id, value } = event.target;
    setCredentials((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!credentials.username || !credentials.password) return;

    setError(""); // clear old errors

    try {
      const { token, user_id } = await postLogin(
        credentials.username,
        credentials.password,
      );

      const user = await getUser(user_id, token);

      window.localStorage.setItem("token", token);
      window.localStorage.setItem("user_id", user_id);
      window.localStorage.setItem("username", user.username);

      setAuth({ token, user_id, username: user.username });

      navigate("/");
    } catch (err) {
      console.error(err);

      // Default message
      let message = "Something went wrong. Please try again.";

      // If your postLogin throws something like:
      // Error("Login failed (400): {...}")
      if (typeof err?.message === "string" && err.message.includes("400")) {
        message = "Incorrect username or password. Please try again.";
      }

      setError(message);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Username */}
      <div>
        <label
          htmlFor="username"
          className="block text-sm font-semibold text-slate-700"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          placeholder="e.g. arrianne"
          value={credentials.username}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-blueDeep focus:ring-4 focus:ring-blueDeep/20 transition"
        />
      </div>

      {/* Password */}
      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-slate-700"
        >
          Password
        </label>
        <input
          type="password"
          id="password"
          placeholder="••••••••"
          value={credentials.password}
          onChange={handleChange}
          className="mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-blueDeep focus:ring-4 focus:ring-blueDeep/20 transition"
        />
      </div>

      {/* Submit */}
      {error && (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
          {error}
        </div>
      )}

      <button
        type="submit"
        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-pinky px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-pinky/30 transition disabled:opacity-50"
        disabled={!credentials.username || !credentials.password}
      >
        Log in
      </button>
    </form>
  );
}

export default LoginForm;
