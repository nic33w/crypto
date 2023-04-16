import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BitcoinCharts from "../../components/BitcoinCharts";
import Box from "../../components/Box";
import CoinsTable from "../../components/CoinsTable";
import { getBitcoinObject, getMarketsArray } from "../../utils/coingecko";
import { setMarketsArray } from "./coinsSlice";

export default function Coins() {
  const [bitcoinObject, setBitcoinObject] = useState();
  const marketsArray = useSelector((state) => state.coins.marketsArray);
  const currency = useSelector((state) => state.navigationBar.currency);
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncSetBitcoinObject = async () => {
      const newObject = await getBitcoinObject(currency);
      setBitcoinObject(newObject);
    };
    asyncSetBitcoinObject();
  }, [currency]);

  async function handleAddMoreMarketsArray() {
    const n = 1 + marketsArray.length / 50;
    const newArray = await getMarketsArray(currency, n);
    dispatch(setMarketsArray([...marketsArray, ...newArray]));
  }

  return (
    <div>
      {bitcoinObject ? (
        <div>
          <Box
            width="98vw"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            bgColor={1}
          >
            <Box width="90%">
              <Box justifyContent="flex-start">Your Overview</Box>
            </Box>
            <BitcoinCharts bitcoinObject={bitcoinObject} />
            <Box width="90%">
              <Box justifyContent="flex-start">Your Overview</Box>
            </Box>
            <CoinsTable
              marketsArray={marketsArray}
              handleAddMoreMarketsArray={handleAddMoreMarketsArray}
            />
          </Box>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
