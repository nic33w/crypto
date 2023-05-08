import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import { setCurrency, setDarkTheme } from "./navigationBarSlice";
// @ts-ignore
import Box from "../../components/Box";
// @ts-ignore
import StyledInput from "../StyledInput";
// @ts-ignore
import Select from "../../components/Select";
import { useEffect, useState } from "react";
// @ts-ignore
import { getAllCurrencies } from "../../utils/coingecko.tsx";
import React from "react";

export default function NavigationBar() {
  const [currencyArray, setCurrencyArray] = useState([]);
  const darkTheme = useSelector(
    (state: { navigationBar: { darkTheme: boolean } }) =>
      state.navigationBar.darkTheme
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const asyncSetCurrencyArray = async () => {
      const newArray = await getAllCurrencies();
      setCurrencyArray(newArray);
    };
    asyncSetCurrencyArray();
  }, []);

  return (
    <Box bgColor={0}>
      <Box justifyContent="space-between" width="100vw" bgColor={0}>
        <nav>
          <Box>
            <Link to="/coins/">
              <Box
                p="15px"
                m="10px"
                fontWeight="bold"
                bgColor={2}
                borderRadius="10px"
              >
                Coins
              </Box>
            </Link>
            <Link to="/portfolio/">
              <Box
                p="15px"
                m="10px"
                fontWeight="bold"
                bgColor={2}
                borderRadius="10px"
              >
                Portfolio
              </Box>
            </Link>
          </Box>
        </nav>
        <Box>
          <StyledInput
            type="text"
            p="15px"
            m="10px"
            fontWeight="bold"
            bgColor={2}
            borderRadius="10px"
          ></StyledInput>
          <Select
            p="15px"
            m="10px"
            fontWeight="bold"
            bgColor={2}
            borderRadius="10px"
            defaultValue="usd"
            onChange={(e: { target: { value: string } }) =>
              dispatch(setCurrency(e.target.value))
            }
          >
            {currencyArray.map((currency: string) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </Select>
          <Box
            p="15px"
            m="10px"
            fontWeight="bold"
            bgColor={2}
            borderRadius="10px"
            onClick={() => dispatch(setDarkTheme(!darkTheme))}
          >
            {darkTheme ? "DARK" : "LIGHT"}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
