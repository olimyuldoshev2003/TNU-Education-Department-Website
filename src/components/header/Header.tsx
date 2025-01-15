import React, { useRef } from "react";
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css"

import Switcher from "../switch-ui/Switcher";

//Images
import logoHeader from "../../assets/logo_tnu.png";

export function Header() {
  const [openNav, setOpenNav] = React.useState<boolean>(false);
  const navRef = useRef<HTMLDivElement>(null);

  const location = useLocation()

  React.useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 960) setOpenNav(false);
    };

    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setOpenNav(false);
      }
    };

    window.addEventListener("resize", handleResize);
    // document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("click", handleClickOutside);

    return () => {
      window.removeEventListener("resize", handleResize);
      // document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  const navList = (
    <ul className="mt-2 mb-4 flex flex-col gap-2 lg:mb-0 lg:mt-0 lg:flex-row lg:items-center lg:gap-6">
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link
          to={`/`}
          className={`flex items-center hover:underline hover:text-red-600 dark:text-white duration-300 ${
            location.pathname === "/" && `underline text-red-600 dark:text-red-600`
          }`}
          onClick={() => setOpenNav(false)}
        >
          Home
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link
          to={`/faculties`}
          className={`flex items-center hover:underline hover:text-red-600 dark:text-white duration-300 ${
            location.pathname === "/faculties" && `underline text-red-600 dark:text-red-600`
          }`}
          onClick={() => setOpenNav(false)}
        >
          Faculties
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link
          to={`/departments`}
          className={`flex items-center hover:underline hover:text-red-600 dark:text-white duration-300 ${
            location.pathname === "/departments" && `underline text-red-600 dark:text-red-600`
          }`}
          onClick={() => setOpenNav(false)}
        >
          Departments
        </Link>
      </Typography>
      <Typography
        as="li"
        variant="small"
        color="blue-gray"
        className="flex items-center gap-x-2 p-1 font-medium"
      >
        <Link
          to={`/teachers`}
          className={`fle items-center hover:underline hover:text-red-600 dark:text-white duration-300 ${
            location.pathname === "/teachers" && `underline text-red-600 dark:text-red-600`
          }`}
          onClick={() => setOpenNav(false)}
        >
          Teachers
        </Link>
      </Typography>
    </ul>
  );

  return (
    <Navbar
      className="sticky top-0 z-10 h-max max-w-full rounded-none px-4 py-2 lg:px-8 lg:py-4 dark:bg-black duration-300"
      ref={navRef}
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between text-blue-gray-900">
        <Link to={`/`} onClick={() => setOpenNav(false)}>
          <img src={logoHeader} alt="" className="logo w-12 rounded-full" />
        </Link>
        <div className="hidden lg:block">{navList}</div>
        <div className="flex items-center gap-x-2">
            <Switcher/>
          <Button variant="filled" color="blue" size="sm" className="hidden lg:inline-block">
            <span>Admin</span>
          </Button>
        <IconButton
          variant="text"
          className="ml-auto h-6 w-6 text-inherit hover:bg-transparent focus:bg-transparent active:bg-transparent lg:hidden outline-none"
          ripple={false}
          onClick={() => setOpenNav(!openNav)}
        >
          <div className={`menu-button ${openNav ? "open" : ""}`}>
            <span className="bg-black dark:bg-white" />
            <span className="bg-black dark:bg-white" />
            <span className="bg-black dark:bg-white" />
          </div>
        </IconButton>
        </div>
      </div>
      <MobileNav open={openNav}>
        <div className="max-w-6xl mx-auto">
          {navList}
          <div className="flex items-center gap-x-3 justify-center">
            <Button fullWidth  variant="gradient" color="blue" size="sm">
              <span>Admin</span>
            </Button>

          </div>
        </div>
      </MobileNav>
    </Navbar>
  );
}
