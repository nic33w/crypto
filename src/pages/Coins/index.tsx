import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import BitcoinCharts from "../../components/BitcoinCharts";
// @ts-ignore
import Box from "../../components/Box";
// @ts-ignore
import CoinsTable from "../../components/CoinsTable";
// @ts-ignore
import Select from "../../components/Select";
import { getBitcoinObject, getMarketsArray } from "../../utils/coingecko";
// @ts-ignore
import { setOrder } from "../../components/NavigationBar/navigationBarSlice";
import { getCurrencySymbol } from "../../utils/numberFormat";

export default function Coins() {
  const [bitcoinObject, setBitcoinObject] = useState<any>();
  const [marketsArray, setMarketsArray] = useState<any>([]);
  const [currencySymbol, setCurrencySymbol] = useState<any>("$");
  const currency = useSelector(
    (state: { navigationBar: { currency: string } }) =>
      state.navigationBar.currency
  );
  const order = useSelector(
    (state: { navigationBar: { order: string } }) => state.navigationBar.order
  );
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncSetBitcoinObject = async () => {
      const newObject = await getBitcoinObject(currency);
      setBitcoinObject(newObject);
    };
    const asyncSetMarketsArray = async () => {
      const newArray = await getMarketsArray(currency, order);
      setMarketsArray(newArray);
    };
    asyncSetMarketsArray();
    asyncSetBitcoinObject();
    setCurrencySymbol(getCurrencySymbol(currency));
  }, [currency, order]);

  async function handleAddMoreMarketsArray() {
    const n = 1 + marketsArray.length / 50;
    const newArray = await getMarketsArray(currency, order, n);
    setMarketsArray([...marketsArray, ...newArray]);
  }

  return (
    <Box flex="auto">
      {bitcoinObject ? (
        <Box
          width="100vw"
          alignItems="center"
          flexDirection="column"
          bgColor={1}
          flex="auto"
        >
          <Box
            width="90%"
            maxWidth={1070}
            flexDirection="column"
            gridRowGap="20px"
            mt="20px"
            flex="auto"
          >
            <Box justifyContent="flex-start">Your Overview</Box>
            <BitcoinCharts
              bitcoinObject={bitcoinObject}
              currencySymbol={currencySymbol}
            />
            <Box justifyContent="flex-start">Your Overview</Box>
            <Box flexDirection="column" flex="auto">
              <Box maxWidth="120px">
                <Select
                  pt="0px"
                  mt="0px"
                  bgColor={1}
                  onChange={(e: { target: { value: string } }) =>
                    dispatch(setOrder(e.target.value))
                  }
                >
                  <option key="0" value="market_cap_desc">
                    Top Market
                  </option>
                  <option key="1" value="market_cap_asc">
                    Bot Market
                  </option>
                  <option key="2" value="volume_desc">
                    Top Volume
                  </option>
                  <option key="3" value="volume_asc">
                    Bot Volume
                  </option>
                </Select>
              </Box>
              <CoinsTable
                marketsArray={marketsArray}
                handleAddMoreMarketsArray={handleAddMoreMarketsArray}
                currencySymbol={currencySymbol}
              />
            </Box>
          </Box>
        </Box>
      ) : (
        <div></div>
      )}
    </Box>
  );
}
