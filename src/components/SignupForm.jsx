import { useState } from "react";
import { useNavigate } from "react-router-dom";
import postSignup from "../api/post-signup.js";
import postLogin from "../api/post-login.js";
import { useAuth } from "../hooks/use-auth.js";

function SignupForm() {
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    passwordConfirm: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [formError, setFormError] = useState("");

  const handleChange = (event) => {
    const { id, value } = event.target;
    setForm((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setFormError("");

    if (
      !form.username ||
      !form.email ||
      !form.password ||
      !form.passwordConfirm
    ) {
      setFormError("Please fill in all fields.");
      return;
    }

    if (form.password !== form.passwordConfirm) {
      setFormError("Passwords don’t match.");
      return;
    }

    try {
      setIsLoading(true);

      // 1) Create user account
      await postSignup(form.username, form.email, form.password);

      // 2) Immediately log them in and store token
      const loginResponse = await postLogin(form.username, form.password);

      window.localStorage.setItem("token", loginResponse.token);
      setAuth({ token: loginResponse.token });

      navigate("/", { replace: true });
    } catch (err) {
      // Try to display DRF-style field errors nicely
      const message =
        (err?.username && err.username[0]) ||
        (err?.email && err.email[0]) ||
        (err?.password && err.password[0]) ||
        err?.detail ||
        "Signup failed. Please try again.";

      setFormError(message);
    } finally {
      setIsLoading(false);
    }
  };

  const inputBase =
    "mt-1 w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-900 placeholder-slate-400 shadow-sm focus:border-blueDeep focus:ring-4 focus:ring-blueDeep/20 transition";

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {formError ? (
        <div className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm font-semibold text-red-700">
          {formError}
        </div>
      ) : null}

      <div>
        <label
          htmlFor="username"
          className="block text-sm font-semibold text-slate-700"
        >
          Username
        </label>
        <input
          id="username"
          type="text"
          placeholder="e.g. arrianne"
          value={form.username}
          onChange={handleChange}
          className={inputBase}
          autoComplete="username"
        />
      </div>

      <div>
        <label
          htmlFor="email"
          className="block text-sm font-semibold text-slate-700"
        >
          Email
        </label>
        <input
          id="email"
          type="email"
          placeholder="you@example.com"
          value={form.email}
          onChange={handleChange}
          className={inputBase}
          autoComplete="email"
        />
      </div>

      <div>
        <label
          htmlFor="password"
          className="block text-sm font-semibold text-slate-700"
        >
          Password
        </label>
        <input
          id="password"
          type="password"
          placeholder="••••••••"
          value={form.password}
          onChange={handleChange}
          className={inputBase}
          autoComplete="new-password"
        />
      </div>

      <div>
        <label
          htmlFor="passwordConfirm"
          className="block text-sm font-semibold text-slate-700"
        >
          Confirm password
        </label>
        <input
          id="passwordConfirm"
          type="password"
          placeholder="••••••••"
          value={form.passwordConfirm}
          onChange={handleChange}
          className={inputBase}
          autoComplete="new-password"
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="mt-2 inline-flex w-full items-center justify-center rounded-xl bg-pinky px-6 py-3 text-sm font-semibold text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-4 focus:ring-pinky/30 transition disabled:opacity-60"
      >
        {isLoading ? "Creating your account…" : "Create account"}
      </button>

      <p className="text-xs text-slate-500">
        By signing up, you agree to be lovely to your neighbours and only start
        fundraisers for things that actually exist.
      </p>
    </form>
  );
}

export default SignupForm;
