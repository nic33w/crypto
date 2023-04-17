import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { setCurrency } from "./navigationBarSlice";
import Box from "../../components/Box";
import StyledInput from "../StyledInput";
import Select from "../../components/Select";
import { useEffect, useState } from "react";
import { getAllCurrencies, getMarketsArray } from "../../utils/coingecko";
import { setMarketsArray } from "../../pages/Coins/coinsSlice";

export default function NavigationBar() {
  const [currencyArray, setCurrencyArray] = useState([]);
  const currency = useSelector((state) => state.navigationBar.currency);
  const dispatch = useDispatch();
  useEffect(() => {
    const asyncSetCurrencyArray = async () => {
      const newArray = await getAllCurrencies();
      setCurrencyArray(newArray);
    };
    asyncSetCurrencyArray();
  }, []);
  useEffect(() => {
    const asyncSetMarketsArray = async () => {
      const newArray = await getMarketsArray(currency);
      dispatch(setMarketsArray(newArray));
    };
    asyncSetMarketsArray();
  }, [currency]);

  return (
    <Box bgColor={0}>
      <Box justifyContent="space-between" width="100vw">
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
          >
            O
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
