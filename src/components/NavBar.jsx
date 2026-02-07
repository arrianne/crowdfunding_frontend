import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth"; // ✅ named import

const linkBase =
  "text-sm font-semibold tracking-wide text-white/80 hover:text-white transition";

const linkActive = "text-white";

function NavBar() {
  const { auth, setAuth } = useAuth();
  const username = auth?.username;

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
            to="/strata-communities"
            className={({ isActive }) =>
              `${linkBase} ${isActive ? linkActive : ""}`
            }
          >
            Strata Communities
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
            <>
              {username && (
                <span className="hidden sm:inline text-sm font-semibold text-white/90">
                  Hi, {username}
                </span>
              )}

              <Link
                to="/"
                className="hidden sm:inline text-sm font-semibold text-white/80 hover:text-white transition"
                onClick={handleLogout}
              >
                Log out
              </Link>
            </>
          ) : (
            // whatever you show when logged out (Login / Sign up)
            <Link
              to="/login"
              className="hidden sm:inline text-sm font-semibold text-white/80 hover:text-white transition"
            >
              Log in
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavBar;
