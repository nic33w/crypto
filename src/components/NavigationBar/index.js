import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency, setDarkTheme } from "./navigationBarSlice";
import Box from "../../components/Box";
import StyledInput from "../StyledInput";
import Select from "../../components/Select";
import { useEffect, useState } from "react";
import { getAllCurrencies } from "../../utils/coingecko";

export default function NavigationBar() {
  const [currencyArray, setCurrencyArray] = useState([]);
  const darkTheme = useSelector((state) => state.navigationBar.darkTheme);
  const currency = useSelector((state) => state.navigationBar.currency);
  const order = useSelector((state) => state.navigationBar.order);
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
            onChange={(e) => dispatch(setCurrency(e.target.value))}
          >
            {currencyArray.map((currency) => (
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
