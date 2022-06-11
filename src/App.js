import logo from './logo.svg';
import {Login} from "./components/login";
import {Register} from "./components/register";
import {Home} from "./components/home"
import { Watchlist } from './components/watchlist';
import { PublicWatchlist } from './components/publicWatchlist';
import './App.css';
import { Routes, Route, Link,Switch } from "react-router-dom";
function App() {
  return (
    <div className="App">
        <Routes>
          <Route path="/" element={ <Login/>} />
          <Route path="/register" element={<Register/>} />
          <Route path="/home" element={<Home/>} />
          <Route path="/watchlist" element={<Watchlist/>} />
          <Route path="watchlist/:email" element={<PublicWatchlist />}/>
      </Routes>
       
    </div>
  );
}

export default App;
