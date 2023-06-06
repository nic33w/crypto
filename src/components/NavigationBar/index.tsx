import { useLocation } from "react-router-dom";
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
import { getCurrencySymbol } from "../../utils/numberFormat";
import React from "react";
import StyledLink from "../StyledLink";

export default function NavigationBar() {
  const [currencyArray, setCurrencyArray] = useState([]);
  const currencyArray2 = ["usd", "gbp", "eur", "btc", "eth"];
  const [currentPathname, setCurrentPathname] = useState(
    window.location.pathname
  );
  const location = useLocation();
  const darkTheme = useSelector(
    (state: { navigationBar: { darkTheme: boolean } }) =>
      state.navigationBar.darkTheme
  );
  const currentCurrency = useSelector(
    (state: { navigationBar: { currency: string } }) =>
      state.navigationBar.currency
  );
  const dispatch = useDispatch();
  useEffect(() => {
    const asyncSetCurrencyArray = async () => {
      const newArray = await getAllCurrencies();
      setCurrencyArray(newArray);
    };
    asyncSetCurrencyArray();
  }, []);

  useEffect(() => {
    setCurrentPathname(location.pathname);
  }, [location.pathname]);

  return (
    <Box bgColor={0} justifyContent="center">
      <Box
        justifyContent="space-between"
        width="100vw"
        maxWidth="1070px"
        bgColor={0}
      >
        <nav>
          <Box>
            <StyledLink to="/coins/">
              <Box
                width="100px"
                p="15px"
                m="10px"
                mx="5px"
                fontWeight="bold"
                bgColor={
                  currentPathname === "/coins/" || currentPathname === "/"
                    ? 2
                    : 0
                }
                borderRadius="10px"
                isHoverable={true}
                justifyContent="center"
              >
                Coins
              </Box>
            </StyledLink>
            <StyledLink to="/portfolio/">
              <Box
                width="100px"
                p="15px"
                m="10px"
                mx="5px"
                fontWeight="bold"
                bgColor={currentPathname === "/portfolio/" ? 2 : 0}
                borderRadius="10px"
                isHoverable={true}
                justifyContent="center"
              >
                Portfolio
              </Box>
            </StyledLink>
          </Box>
        </nav>
        <Box>
          <StyledInput
            type="text"
            p="10px"
            m="10px"
            mx="5px"
            pl="40px"
            fontWeight="bold"
            bgColor={2}
            borderRadius="10px"
            placeholder="Search..."
          ></StyledInput>
          <Box
            p="10px"
            pr="0px"
            m="10px"
            mr="0px"
            fontWeight="bold"
            bgColor={2}
            borderRadius="10px"
            borderTopRightRadius="0px"
            borderBottomRightRadius="0px"
          >
            <Box
              backgroundColor="black"
              color="lime"
              borderRadius="50px"
              px="10px"
              py="5px"
            >
              {getCurrencySymbol(currentCurrency)}
            </Box>
          </Box>
          <Select
            p="10px"
            m="10px"
            ml="0px"
            width="80px"
            fontWeight="bold"
            bgColor={2}
            borderRadius="10px"
            borderTopLeftRadius="0px"
            borderBottomLeftRadius="0px"
            onChange={(e: { target: { value: string } }) =>
              dispatch(setCurrency(e.target.value))
            }
            value={currentCurrency}
          >
            {currencyArray2.map((currency: string) => (
              <option key={currency} value={currency}>
                {currency.toUpperCase()}
              </option>
            ))}
          </Select>
          <Box
            p="10px"
            m="10px"
            mx="5px"
            fontWeight="bold"
            bgColor={2}
            borderRadius="10px"
            alignItems="center"
            isHoverable={true}
            onClick={() => dispatch(setDarkTheme(!darkTheme))}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={2}
              stroke="currentColor"
              width="20"
              height="20"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.383a14.406 14.406 0 01-3 0M14.25 18v-.192c0-.983.658-1.823 1.508-2.316a7.5 7.5 0 10-7.517 0c.85.493 1.509 1.333 1.509 2.316V18"
              />
            </svg>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
