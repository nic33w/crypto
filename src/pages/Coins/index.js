import React, { useState, useEffect } from "react";
import BitcoinCharts from "../../components/BitcoinCharts";
import Box from "../../components/Box";
import CoinsTable from "../../components/CoinsTable";
import { getBitcoinObject, getMarketsArray } from "../../utils/coingecko";

export default function Coins(props) {
  const [bitcoinObject, setBitcoinObject] = useState();
  const [marketsArray, setMarketsArray] = useState([]);

  useEffect(() => {
    const asyncSetBitcoinObject = async () => {
      const newObject = await getBitcoinObject(props.currency);
      console.log("Bitcoin Obj: ", newObject);
      setBitcoinObject(newObject);
    };
    const asyncSetMarketsArray = async () => {
      const newArray = await getMarketsArray(props.currency);
      console.log("Markets Array: ", newArray);
      setMarketsArray(newArray);
      //
    };
    asyncSetBitcoinObject();
    asyncSetMarketsArray();
  }, [props.currency]);

  async function handleAddMoreMarketsArray() {
    const n = 1 + marketsArray.length / 50;
    console.log("n: ", n);
    const newArray = await getMarketsArray(props.currency, n);
    setMarketsArray([...marketsArray, ...newArray]);
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
