import logo from './logo.svg';
import {Login} from "./components/login";
import {Register} from "./components/register";
import {Home} from "./components/home"
import './App.css';
import { Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={ <Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
      </Routes>
       
    </div>
  );
}

export default App;
