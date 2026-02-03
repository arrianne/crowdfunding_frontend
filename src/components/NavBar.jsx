import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth"; // ✅ named import

const linkBase =
  "text-sm font-semibold tracking-wide text-white/80 hover:text-white transition";

const linkActive = "text-white";

function NavBar() {
  const { auth, setAuth } = useAuth();

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
  };

  const isLoggedIn = Boolean(auth?.token);

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-lg font-extrabold tracking-wider text-white"
        >
          STRATABOOST
        </Link>

        {/* Left-ish nav links */}
        <nav className="hidden md:flex items-center gap-7">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/about"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            About
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Contact
          </NavLink>

          <NavLink
            to="/user"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            User
          </NavLink>
        </nav>

        {/* Right actions */}
        <div className="flex items-center gap-3">
          {isLoggedIn ? (
            <Link
              to="/"
              className="hidden sm:inline text-sm font-semibold text-white/80 hover:text-white transition"
              onClick={handleLogout}
            >
              Log out
            </Link>
          ) : (
            <div className="hidden sm:flex items-center gap-1 text-sm font-semibold text-white/80">
              <Link to="/login" className="hover:text-white transition">
                Log in
              </Link>

              <span className="opacity-60">/</span>

              <Link to="/signup" className="hover:text-white transition">
                Sign up
              </Link>
            </div>
          )}

          <Link
            to="/user"
            className="inline-flex items-center rounded-md border border-white/60 px-4 py-2 text-sm font-semibold text-white hover:border-white hover:bg-white/10 transition"
          >
            Get started
          </Link>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
