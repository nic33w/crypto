import React, { useState, useEffect } from "react";
import Box from "../../components/Box";
import SelectCoins from "../../components/SelectCoins";
import { getMarketsArray } from "../../utils/coingecko";

export default function Portfolio() {
  const [marketsArray, setMarketsArray] = useState([]);

  useEffect(() => {
    const asyncSetMarketsArray = async () => {
      const newArray = await getMarketsArray();
      console.log("Markets Array: ", newArray);
      setMarketsArray(newArray);
      //
    };
    asyncSetMarketsArray();
  }, []);

  return (
    <div>
      <Box
        width="98vw"
        height="48vh"
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        bgColor={1}
      >
        <Box>Add Asset</Box>
        <Box width="100%">Your statistics</Box>
      </Box>
      <SelectCoins marketsArray={marketsArray} />
    </div>
  );
}
