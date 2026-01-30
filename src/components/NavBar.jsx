import { Link, Outlet } from "react-router-dom";

function NavBar() {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          <li>
            <Link to="/fundraiser">Fundraiser</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
