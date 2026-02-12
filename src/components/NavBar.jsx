import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import { useAuth } from "../hooks/use-auth"; // ✅ named import

const linkBase =
  "text-sm font-semibold tracking-wide text-white/80 hover:text-white transition";

const linkActive = "text-white";

function NavBar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { auth, setAuth } = useAuth();
  const username = auth?.username;

  const handleLogout = () => {
    window.localStorage.removeItem("token");
    setAuth({ token: null });
    setIsMenuOpen(false);
  };

  const closeMenu = () => setIsMenuOpen(false);
  const isLoggedIn = Boolean(auth?.token);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  const navLinks = (
    <>
      <NavLink
        to="/"
        end
        onClick={closeMenu}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : ""}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to="/about"
        onClick={closeMenu}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : ""}`
        }
      >
        About
      </NavLink>

      <NavLink
        to="/strata-communities"
        onClick={closeMenu}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : ""}`
        }
      >
        Strata Communities
      </NavLink>

      <NavLink
        to="/contact"
        onClick={closeMenu}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : ""}`
        }
      >
        Contact
      </NavLink>

      <NavLink
        to="/user"
        onClick={closeMenu}
        className={({ isActive }) =>
          `${linkBase} ${isActive ? linkActive : ""}`
        }
      >
        Dashboard
      </NavLink>
    </>
  );

  return (
    <header className="sticky top-0 left-0 right-0 z-50 bg-blueDeep shadow-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">
        {/* Logo / Brand */}
        <Link
          to="/"
          className="text-lg font-extrabold tracking-wider text-white"
        >
          STRATABOOST
        </Link>

        {/* Desktop nav links */}
        <nav className="hidden md:flex items-center gap-7">{navLinks}</nav>

        {/* Right actions - desktop */}
        <div className="hidden md:flex items-center gap-3">
          {isLoggedIn ? (
            <>
              {username && (
                <span className="text-sm font-semibold text-white/90">
                  Hi, {username}
                </span>
              )}

              <Link
                to="/"
                className="text-sm font-semibold text-white/80 hover:text-white transition"
                onClick={handleLogout}
              >
                Log out
              </Link>
            </>
          ) : (
            <Link
              to="/login"
              className="text-sm font-semibold text-white/80 hover:text-white transition"
            >
              Log in
            </Link>
          )}
        </div>

        {/* Burger button - mobile only */}
        <button
          type="button"
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
          aria-expanded={isMenuOpen}
          className="relative z-[60] flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-md md:hidden"
          onClick={() => setIsMenuOpen((prev) => !prev)}
        >
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              isMenuOpen ? "translate-y-2 rotate-45" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              isMenuOpen ? "opacity-0 scale-0" : ""
            }`}
          />
          <span
            className={`block h-0.5 w-6 bg-white transition-all duration-300 ${
              isMenuOpen ? "-translate-y-2 -rotate-45" : ""
            }`}
          />
        </button>
      </div>

      {/* Full-screen slide-in menu - mobile */}
      <div
        className={`fixed inset-0 z-40 md:hidden transition-transform duration-300 ease-out ${
          isMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
        aria-hidden={!isMenuOpen}
      >
        {/* Backdrop */}
        <div
          className={`absolute inset-0 bg-black/80 transition-opacity duration-300 ${
            isMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
          onClick={closeMenu}
        />

        {/* Menu panel - slides from right */}
        <div
          className={`absolute inset-y-0 right-0 w-full max-w-full bg-zinc-900 shadow-2xl transition-transform duration-300 ease-out ${
            isMenuOpen ? "translate-x-0" : "translate-x-full"
          }`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className="flex min-h-full flex-col items-center justify-center gap-8 px-6 py-16">
            <nav className="flex flex-col items-center gap-6 text-lg">
              {navLinks}
            </nav>

            <div className="flex flex-col items-center gap-4 pt-4 border-t border-white/20">
              {isLoggedIn ? (
                <>
                  {username && (
                    <span className="text-sm font-semibold text-white/90">
                      Hi, {username}
                    </span>
                  )}
                  <Link
                    to="/"
                    className={`${linkBase} text-base`}
                    onClick={handleLogout}
                  >
                    Log out
                  </Link>
                </>
              ) : (
                <Link
                  to="/login"
                  className={`${linkBase} text-base`}
                  onClick={closeMenu}
                >
                  Log in
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default NavBar;
