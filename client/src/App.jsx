import { Routes, Route, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import Layout from "./scenes/Layout";
import Home from "./scenes/Home";
import EntryLayout from "./scenes/EntryLayout";
import Login from "./scenes/Auth/Login";
import Signup from "./scenes/Auth/Signup";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authActions } from "./store/authSlice";
import AddBook from "./scenes/AddBook";
import AddCategory from "./scenes/AddCategory";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;
axios.defaults.withCredentials = true;


let logoutTimer;

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.data);
  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("userData"));
    if (
      storedData &&
      storedData.token &&
      new Date(storedData.expiration) > new Date()
    ) {
      dispatch(
        authActions.login({
          userId: storedData.userId,
          token: storedData.token,
          data: storedData.data,
          expirationDate: new Date(storedData.expiration),
        })
      );
    }
  }, [dispatch]);
  var tokenExpirationDate = useSelector(
    (state) => state.auth.tokenExpirationDate
  );
  useEffect(() => {
    const checkDate = async () => {
      try {
        if (tokenExpirationDate) {
          const remainingTime =
            new Date(tokenExpirationDate).getTime() - new Date().getTime();
          logoutTimer = setTimeout(() => {
            dispatch(authActions.logout());
            navigate('/')
          }, remainingTime);

        } else {
          clearTimeout(logoutTimer);
        }
      } catch (err) {
        console.log(err);
      }
    };
    checkDate();
  }, [dispatch, tokenExpirationDate, navigate]);

  return (
    <Routes>
      <Route element={<Layout />}>
        <Route exact path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<Home />} />
        <Route path="/books/:id" />
        <Route path="/admin/addBook" element={user?.role === "admin" ?
          <AddBook /> : <Navigate to="/books" />} />
        <Route path="/admin/addCategories" element={user?.role === "admin" ?
          <AddCategory /> : <Navigate to="/books" />} />
      </Route>
      <Route
        element={<EntryLayout />}
      >
        <Route path="/auth/login" element={<Login />} />
        <Route path="/auth/signup" element={<Signup />} />
      </Route>
    </Routes>
  );

}

export default App