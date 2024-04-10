import { useEffect, useState } from "react";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { Link, NavLink, Outlet, redirect, useNavigate } from "react-router-dom";
import { SidebarData } from "./SidebarData.js";
import "./Sidebar.css";
import { IconContext } from "react-icons";
import Logo from "../../assets/images/logo.png";
import { BiSolidLogInCircle } from 'react-icons/bi'
import ScrollToTop from "../../hooks/scroll-to-top";
import AdminAccordion from "../../components/AdminAccordion";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../../store/authSlice.js";
import { IoIosArrowForward } from "react-icons/io";
import Footer from "../../components/Footer";

const Layout = () => {
  const [sidebar, setSidebar] = useState(true);
  const [scrolled, setScrolled] = useState(false);
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
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 50) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);


  const logout = () => {
    dispatch(authActions.logout());
    navigate("/books");
  };
  return (
    <div className='relative flex flex-col gap-[20vh]'>
      <div className="grid grid-cols-12 justify-center ">
        <IconContext.Provider value={{ color: "#000" }}>
          <div className={`navbar  drop-shadow-lg transition-all w-full col-span-12 fixed ${scrolled && !sidebar ? 'bg-dim-blue' : 'bg-white'}`}>
            <Link to="#" className="menu-bars">
              <FaIcons.FaBars color="#bac1c9" onClick={showSidebar} />
            </Link>
            <>
              {user ? <Link to={"/library"} className="flex justify-between items-center text-base m-[1vh] gap-3 ">
                <div className="text-left">
                  <p className={`font-semi text-[2vh] ${scrolled && !sidebar ? 'text-[#bac1c9]' : ''} `}>
                    {user.name}
                  </p>
                </div>
                <img
                  className="w-10 h-10 rounded-full object-cover"
                  src={user.image}
                  alt="pfp"
                />
              </Link> : <NavLink className='btn-3 flex items-center border-none shadow-xl bg-gray-200 text-dim-blue' to="/auth/login" >
                <span className="m-0">Login</span>
              </NavLink>}
            </>
          </div>
          <nav className={sidebar ? "nav-menu active-menu col-span-3" : "nav-menu col-span-3"}>
            <ul className="nav-menu-items" onClick={showSidebar}>
              <li className="navbar-toggle flex-end flex-row-reverse items-center justify-between ">
                <Link to="#" className=" flex items-center justify-center bg-white shadow-md menu-bars pr-4 !border-none  rounded-l-full">
                  <span className="m-0 flex transform transition-transform duration-500 hover:rotate-180 bg-gray-100 shadow-md rounded-full text-[3vh]">
                    <IoIosArrowForward color="dim-blue" />
                  </span>
                </Link>
              </li>
              <li className="navbar-toggle items-center justify-center ">
                <img className="w-20 h-20" src={Logo} alt="logo" />
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
              {user?.role === "admin" && <AdminAccordion />}
              {!user ? <li key={10} className="nav-text ">
              </li> : <>
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
          <div className={`${sidebar ? "content col-span-9 ml-[3vh] transform translate-x-64 transition-transform duration-200 " : "content lg:col-end-12 lg:col-start-2 lg:col-span-10 col-span-10 col-start-2 col-end-12"}  bg-gray-100 rounded-lg shadow-lg  bg-opacity-30 mt-[90px] w-full h-full  `}>
            <ScrollToTop />
            <Outlet />
            <Footer />
          </div>
        </IconContext.Provider>
      </div>
    </div>
  );
};

export default Layout;
