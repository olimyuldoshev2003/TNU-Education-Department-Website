import { Outlet } from "react-router-dom";
import { Header } from "../components/header/Header";
import Footer from "../components/footer/Footer";

const Layout = () => {
  return (
    <>
      <div className="layout_component">
        <Header />
        <Outlet />
        <Footer />
      </div>
    </>
  );
};

export default Layout;
