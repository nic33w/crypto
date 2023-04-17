import { Routes, Route } from "react-router-dom";
import Coins from "./pages/Coins";
import Coin from "./pages/Coin";
import logo from "./logo.svg";
import "./App.css";
import Portfolio from "./pages/Portfolio";
import NavigationBar from "./components/NavigationBar";
import { ThemeProvider } from "styled-components";
import { useState } from "react";

const darkTheme = {
  c1: "#191b1f",
  c2: "#1f2128",
  c3: "#2c2f36",
};

function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <div>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Portfolio />} />
            <Route path="/coin/:coin" element={<Coin />} />
            <Route path="/coins/" element={<Coins />} />
            <Route path="/portfolio/" element={<Portfolio />} />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
