import "./App.css";
import {Navigate, Routes,Route } from "react-router-dom";
import Home from "./pages/Home/Home.jsx";
import Login from './pages/Login/Login.jsx'
import SignUp from './pages/SignUp/SignUp.jsx'
import {Toaster} from "react-hot-toast"
import { useAuthContext } from "./context/Authcontext.jsx";

function App() {
  const {authUser} = useAuthContext();
  return (

    <div className="p-4 h-screen flex items-center justify-center" >
      <Routes>
        <Route path="/" element={authUser ? <Home/>: < Navigate to={"/Login"} />}></Route>
        <Route path="/Login" element={authUser ?< Navigate to = "/" />:<Login/>}></Route>
        <Route path="/SignUp" element={authUser ? < Navigate to="/" />:<SignUp/>}></Route>
      </Routes>
      <Toaster/>
    </div>
  );
}

export default App;
