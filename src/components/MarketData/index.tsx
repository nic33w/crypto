import { useSelector } from "react-redux";
// @ts-ignore
import Box from "../../components/Box";
import { useEffect, useState } from "react";
// @ts-ignore
import { getGlobalObject, getCoinObject } from "../../utils/coingecko.tsx";
import { getCurrencySymbol, formatNum } from "../../utils/numberFormat";
import React from "react";
import PercentageBar from "../PercentageBar";

export default function MarketData() {
  const [globalObject, setGlobalObject] = useState<any>({});
  const [btcObject, setBtcObject] = useState<any>({});
  const [ethObject, setEthObject] = useState<any>({});
  const currency = useSelector(
    (state: { navigationBar: { currency: string } }) =>
      state.navigationBar.currency
  );
  useEffect(() => {
    const asyncSetGlobalObject = async () => {
      const newObject = await getGlobalObject();
      setGlobalObject(newObject);
      setBtcObject(await getCoinObject("bitcoin"));
      setEthObject(await getCoinObject("ethereum"));
    };
    asyncSetGlobalObject();
  }, []);

  return (
    <Box width="100vw" justifyContent="center" alignItems="center">
      {globalObject ? (
        <Box
          width="100%"
          maxWidth="720px"
          bgColor={0}
          borderRadius="20px"
          borderTopLeftRadius="0px"
          borderTopRightRadius="0px"
          justifyContent="space-between"
          py="15px"
          px="10px"
          fontSize="12px"
        >
          <Box>Coins {globalObject.active_cryptocurrencies}</Box>
          <Box>Exchange {globalObject.markets}</Box>
          <Box>
            &#x2022;
            {" " +
              getCurrencySymbol(currency) +
              formatNum(globalObject.total_market_cap?.[currency])}
          </Box>
          <Box alignItems="center">
            <Box pr="5px">
              &#x2022;
              {" " +
                getCurrencySymbol(currency) +
                formatNum(globalObject.total_volume?.[currency])}
            </Box>
            <Box width="50px">
              <PercentageBar />
            </Box>
          </Box>
          <Box alignItems="center">
            <img src={btcObject.image?.thumb} height="15px" />
            <Box px="5px">
              {globalObject.market_cap_percentage?.btc.toFixed()}%
            </Box>
            <Box width="50px">
              <PercentageBar
                percent={globalObject.market_cap_percentage?.btc.toFixed()}
              />
            </Box>
          </Box>
          <Box alignItems="center">
            <img src={ethObject.image?.thumb} height="15px" />
            <Box pr="5px">
              {globalObject.market_cap_percentage?.eth.toFixed()}%
            </Box>
            <Box width="50px">
              <PercentageBar
                percent={globalObject.market_cap_percentage?.eth.toFixed()}
              />
            </Box>
          </Box>{" "}
        </Box>
      ) : (
        <Box></Box>
      )}
    </Box>
  );
}
