import { Outlet } from "react-router-dom";
import NavBar from "./NavBar.jsx";
import Footer from "./Footer.jsx";

function Layout() {
  return (
    <div>
      <NavBar />
      <Outlet />
      <Footer />
    </div>
  );
}

export default Layout;
