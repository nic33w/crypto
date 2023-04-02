import { Routes, Route } from "react-router-dom";
import Coins from "./pages/Coins";
import Coin from "./pages/Coin";
import logo from "./logo.svg";
import "./App.css";
import Portfolio from "./pages/Portfolio";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Portfolio />} />
          <Route path="/coin/:coin" element={<Coin />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
