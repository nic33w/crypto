import React, { useState, useEffect } from "react";
import BitcoinCharts from "../../components/BitcoinCharts";
import Box from "../../components/Box";
import CoinsTable from "../../components/CoinsTable";
import { getBitcoinObject, getMarketsArray } from "../../utils/coingecko";

export default function Coins() {
  const [bitcoinObject, setBitcoinObject] = useState();
  const [marketsArray, setMarketsArray] = useState([]);

  useEffect(() => {
    const asyncSetBitcoinObject = async () => {
      const newObject = await getBitcoinObject();
      console.log("Bitcoin Obj: ", newObject);
      setBitcoinObject(newObject);
    };
    const asyncSetMarketsArray = async () => {
      const newArray = await getMarketsArray();
      console.log("Markets Array: ", newArray);
      setMarketsArray(newArray);
      //
    };
    asyncSetBitcoinObject();
    asyncSetMarketsArray();
  }, []);

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
            <CoinsTable marketsArray={marketsArray} />
          </Box>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
