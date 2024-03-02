import { Routes, Route, Navigate } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = import.meta.env.VITE_REACT_APP_API_URL;
axios.defaults.withCredentials = true;


const App = () => {
  return (
    <Routes>
      <Route>
        <Route />
        <Route />
        <Route />
        <Route />
      </Route>
    </Routes>
  );

}

export default App