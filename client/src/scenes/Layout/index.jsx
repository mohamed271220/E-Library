import { useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, NavLink, Outlet } from "react-router-dom";
import { SidebarData } from "./SidebarData.js";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import Logo from "../../assets/icons/DNSL.svg";
import { BiSolidLogInCircle } from 'react-icons/bi'
import ScrollToTop from "../../hooks/scroll-to-top";
import AdminAccordion from "../../components/AdminAccordion";

const Layout = ({ user, userData, logout, cartTotalQuantity, compareQuantity }) => {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);

  return (
    <div className='relative flex flex-col '>
      <div className="grid grid-cols-12">
        <IconContext.Provider value={{ color: "#000" }}>
          <div className="navbar col-span-12">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars color="#bac1c9" onClick={showSidebar} />
            </Link>
            <ul className="flex flex-row space-x-4">
            </ul>
            <img className="w-20 h-20" src={Logo} alt="logo" />
          </div>
          <nav className={sidebar ? "nav-menu active col-span-3" : "nav-menu col-span-3"}>
            <ul className="nav-menu-items justify-between" onClick={showSidebar}>
              <li className="navbar-toggle">
                <Link to="#" className="ml-[1rem] menu-bars">
                  <AiIcons.AiOutlineClose color="#bac1c9" />
                </Link>
              </li>
              <ul>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <NavLink to={item.path}>
                        <span><item.icon color="white"/></span>
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>

              {/* TODO: IS USER ADMIN  */}

              <AdminAccordion />

              {
                !user && <li key={10} className="nav-text ">
                  <NavLink to="/entry" >
                    {" "}
                    <BiSolidLogInCircle color="white" />
                    <span>Login</span>
                  </NavLink>
                </li>
              }
            </ul>
          </nav>
          <div className={sidebar ? "content col-span-9 transform translate-x-64 transition-transform duration-200 px-[3vh]" : "content col-span-9 px-[3vh]"}>
            <ScrollToTop />
            <Outlet />
          </div>
        </IconContext.Provider>

      </div>
    </div>
  );
};

export default Layout;
