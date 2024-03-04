import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";
import Layout from "./scenes/Layout";
import Home from "./scenes/Home";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;
axios.defaults.withCredentials = true;


const App = () => {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route exact path="/" element={<Navigate to="/books" />} />
        <Route path="/books" element={<Home/>} />
        <Route path="/books/:id" />
        <Route />
        <Route />
      </Route>
 
    </Routes>
  );

}

export default App