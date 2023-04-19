import { Routes, Route } from "react-router-dom";
import Coins from "./pages/Coins";
import Coin from "./pages/Coin";
import logo from "./logo.svg";
import "./App.css";
import Portfolio from "./pages/Portfolio";
import NavigationBar from "./components/NavigationBar";
import { ThemeProvider } from "styled-components";
import { useState } from "react";
import { useSelector } from "react-redux";

const darkTheme = {
  backgroundColor: ["#191b1f", "#1f2128", "#2c2f36"],
  fontColor: "#ffffff",
};

const lightTheme = {
  backgroundColor: ["#ffffff", "#f0f0f0", "#e0e0e0"],
  fontColor: "#000000",
};

function App() {
  const isDarkTheme = useSelector((state) => state.navigationBar.darkTheme);
  return (
    <ThemeProvider theme={isDarkTheme ? darkTheme : lightTheme}>
      <div className="App">
        <div>
          <NavigationBar />
          <Routes>
            <Route path="/" element={<Coins />} />
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
