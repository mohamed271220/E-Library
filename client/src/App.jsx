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
import AddPost from "./scenes/AddPost";
import AddJournal from "./scenes/AddJournal";
import AddEncyclopedia from "./scenes/AddEncyclopedia";
import AddResearch from "./scenes/AddResearch";
import AddThesis from "./scenes/AddThesis";
import News from "./scenes/News";
import Journals from "./scenes/Journals";
import Encyclopedias from "./scenes/Encyclopedias";
import Researches from "./scenes/Researches";
import Theses from "./scenes/Theses";
import Book from "./scenes/Book";
import Journal from "./scenes/Journal";
import Encyclopedia from "./scenes/Encyclopedia";
import Thesis from "./scenes/Thesis";
import NotFound from "./scenes/404";
import Post from "./scenes/Post";
import Profile from "./scenes/Profile";
import Team from "./scenes/Team"

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
        <Route path="/books/:id" element={<Book />} />
        <Route path="/journals" element={<Journals />} />
        <Route path="/journals/:id" element={<Journal />} />
        <Route path="/encyclopedias" element={<Encyclopedias />} />
        <Route path="/encyclopedias/:id" element={<Encyclopedia />} />
        <Route path="/researches" element={<Researches />} />
        <Route path="/researches/:id" />
        <Route path="/theses" element={<Theses />} />
        <Route path="/theses/:id" element={<Thesis />} />
        <Route path="/news" element={<News />} />
        <Route path="/news/:id" element={<Post />} />
        <Route path="/team" element={<Team />} />
        <Route path="/library" element={user ?
          <Profile /> : <Navigate to="/books" />} />
        {/* Admin routes  */}
        <Route path="/admin/addBook" element={user?.role === "admin" ?
          <AddBook /> : <Navigate to="/books" />} />
        <Route path="/admin/addJournal" element={user?.role === "admin" ?
          <AddJournal /> : <Navigate to="/books" />} />
        <Route path="/admin/addEncyclopedia" element={user?.role === "admin" ?
          <AddEncyclopedia /> : <Navigate to="/books" />} />
        <Route path="/admin/addResearch" element={user?.role === "admin" ?
          <AddResearch /> : <Navigate to="/books" />} />
        <Route path="/admin/addThesis" element={user?.role === "admin" ?
          <AddThesis /> : <Navigate to="/books" />} />
        <Route path="/admin/addCategories" element={user?.role === "admin" ?
          <AddCategory /> : <Navigate to="/books" />} />
        <Route path="/admin/addPost" element={user?.role === "admin" ?
          <AddPost /> : <Navigate to="/books" />} />


        <Route path="*" element={<NotFound />} />
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