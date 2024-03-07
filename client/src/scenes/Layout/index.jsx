import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, NavLink, Outlet, redirect, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData.js";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import Logo from "../../assets/icons/DNSL.svg";
import { BiSolidLogInCircle } from 'react-icons/bi'
import ScrollToTop from "../../hooks/scroll-to-top";
import AdminAccordion from "../../components/AdminAccordion";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice.js";
import { IoIosArrowForward } from "react-icons/io";

const Layout = () => {
  const [sidebar, setSidebar] = useState(true);
  const showSidebar = () => setSidebar(!sidebar);
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const user = useSelector((state) => state.auth.data);
  const navigate = useNavigate();
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (!storedData || !storedData.token) {
      if (token) {
        dispatch(authActions.logout());
        navigate("/");
      }
    }
  }, [dispatch, navigate, token]);

  const logout = () => {
    dispatch(authActions.logout());
    navigate("/books");
  };
  return (
    <div className='relative flex flex-col '>
      <div className="grid grid-cols-12 justify-center">
        <IconContext.Provider value={{ color: "#000" }}>
          <div className="navbar col-span-12 sticky">
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars color="#bac1c9" onClick={showSidebar} />
            </Link>
            <>
              {user ? <div className="flex justify-between items-center text-base m-[1vh] gap-3">
                <div className="text-left">
                  <p className="font-semi text-[2vh] text-secondary-100">
                    {user.name}
                  </p>
                </div>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.image}
                  alt="pfp"
                />
              </div> : <NavLink className='btn-3 flex items-center bg-white text-dim-blue' to="/auth/login" >
                <span className="m-0">Login</span>
              </NavLink>}
            </>
          </div>
          <nav className={sidebar ? "nav-menu active col-span-3" : "nav-menu col-span-3"}>
            <ul className="nav-menu-items justify-between" onClick={showSidebar}>
              <li className="navbar-toggle items-center justify-center px-[3vh]">
                <img className="w-20 h-20" src={Logo} alt="logo" />
                <Link to="#" className="ml-[1rem] menu-bars !border-none">
                  <IoIosArrowForward color="white" />
                </Link>
              </li>
              <ul>
                {SidebarData.map((item, index) => {
                  return (
                    <li key={index} className={item.cName}>
                      <NavLink activeClassName="active" to={item.path}>
                        <span><item.icon color="white" /></span>
                        <span>{item.title}</span>
                      </NavLink>
                    </li>
                  );
                })}
              </ul>

              {
                user?.role === "admin" && <AdminAccordion />
              }

              {
                !user ? <li key={10} className="nav-text ">

                </li>
                  :
                  <>

                    <li key={10} className="nav-text">
                      <button onClick={logout} >
                        <BiSolidLogInCircle color="white" />
                        <span>Logout</span>
                      </button>
                    </li>

                  </>
              }
            </ul>
          </nav>
          <div className={`${sidebar ? "content  col-span-9 ml-[3vh] transform translate-x-64 transition-transform duration-200 " : "content lg:col-end-12 lg:col-start-2 lg:col-span-10 col-span-10 col-start-2 col-end-12"} bg-gray-100 bg-opacity-30 w-full h-full`}>
            <ScrollToTop />
            <Outlet />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Layout;
