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
  const [currency, setCurrency] = useState("usd");
  function handleSetCurrency(newCurrency) {
    //console.log("setting currency to ", newCurrency);
    setCurrency(newCurrency);
  }
  return (
    <ThemeProvider theme={darkTheme}>
      <div className="App">
        <div>
          <NavigationBar
            currency={currency}
            handleSetCurrency={handleSetCurrency}
          />
          <Routes>
            <Route path="/" element={<Portfolio currency={currency} />} />
            <Route path="/coin/:coin" element={<Coin currency={currency} />} />
            <Route path="/coins/" element={<Coins currency={currency} />} />
            <Route
              path="/portfolio/"
              element={<Portfolio currency={currency} />}
            />
          </Routes>
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
