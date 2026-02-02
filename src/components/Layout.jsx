import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <footer>By Arrianne O&apos;Shea</footer>
    </div>
  );
}

export default Layout;
