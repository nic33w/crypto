import { Routes, Route } from "react-router-dom";
import Coins from "./pages/Coins";
import logo from "./logo.svg";
import "./App.css";

function App() {
  return (
    <div className="App">
      <div>
        <Routes>
          <Route path="/" element={<Coins />} />
        </Routes>
      </div>
    </div>
  );
}

export default App;
