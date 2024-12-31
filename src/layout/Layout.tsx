import {  Outlet } from "react-router-dom"
import { Header } from "../components/Header"

const Layout = () => {
  return (
      <>
          <div className="layout_component">
              <Header />
              <Outlet/>
              {/* <footer className="footer"></footer> */}
          </div>
    </>
  )
}

export default Layout