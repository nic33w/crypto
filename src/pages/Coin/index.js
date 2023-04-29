import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Box from "../../components/Box";
import { getCoinObject } from "../../utils/coingecko";
import { formatNum, formatNumExact } from "../../utils/numberFormat";
import { useSelector } from "react-redux";

export default function Coin() {
  const [coinObject, setCoinObject] = useState();
  const params = useParams();
  const currency = useSelector((state) => state.navigationBar.currency);

  useEffect(() => {
    const asyncSetCoinObject = async () => {
      const newObject = await getCoinObject(params.coin);
      console.log("Coin Obj: ", newObject);
      setCoinObject(newObject);
    };
    asyncSetCoinObject();
  }, []);

  return (
    <div>
      {coinObject ? (
        <div>
          <Box
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            bgColor={1}
            fontSize="12px"
          >
            <Box
              width="80%"
              height="100%"
              flexDirection="column"
              justifyContent="space-evenly"
            >
              <Box>Your Summary</Box>
              <Box justifyContent="space-between">
                <Box
                  width="15%"
                  bgColor={0}
                  p="15px"
                  borderRadius="10px"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box flexDirection="column" alignItems="center">
                    <Box bgColor={1} padding="10px">
                      <img src={coinObject.image.thumb} height="15px" />
                    </Box>
                    <Box>
                      {coinObject.name +
                        " (" +
                        coinObject.symbol.toUpperCase() +
                        ")"}
                    </Box>
                  </Box>
                  <Box fontSize="10px" padding="5px">
                    {coinObject.links.homepage[0]}
                  </Box>
                </Box>
                <Box
                  width="30%"
                  bgColor={0}
                  p="15px"
                  borderRadius="10px"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                  fontSize="10px"
                >
                  <Box fontSize="20px" fontWeight="bold">
                    $
                    {formatNumExact(
                      coinObject.market_data.current_price[currency]
                    )}
                  </Box>
                  <Box flexDirection="column">
                    <Box>
                      All Time High: $
                      {formatNumExact(coinObject.market_data.ath[currency])}
                    </Box>
                    <Box>
                      {new Date(
                        coinObject.market_data.ath_date[currency]
                      ).toDateString()}
                    </Box>
                  </Box>
                  <Box flexDirection="column">
                    <Box>
                      All Time Low: $
                      {formatNumExact(coinObject.market_data.atl[currency])}
                    </Box>
                    <Box>
                      {new Date(
                        coinObject.market_data.atl_date[currency]
                      ).toDateString()}
                    </Box>
                  </Box>
                </Box>
                <Box
                  width="30%"
                  bgColor={0}
                  p="15px"
                  fontSize="10px"
                  borderRadius="10px"
                  flexDirection="column"
                >
                  <Box>
                    Market Cap:{" $"}
                    {formatNum(coinObject.market_data.market_cap[currency])}
                  </Box>
                  <Box>
                    Fully Dilluted Valuation:{" $"}
                    {formatNum(
                      coinObject.market_data.fully_diluted_valuation[currency]
                    )}
                  </Box>
                  <Box>
                    Volume 24h:{" $"}
                    {formatNum(coinObject.market_data.total_volume[currency])}
                  </Box>
                  <Box>
                    Volume / Market:{" "}
                    {formatNum(
                      coinObject.market_data.total_volume[currency] /
                        coinObject.market_data.market_cap[currency]
                    )}
                  </Box>
                  <Box>
                    Total Volume:{" "}
                    {formatNum(coinObject.market_data.total_supply)}{" "}
                    {coinObject.symbol.toUpperCase()}
                  </Box>
                  <Box>
                    Circulating Supply:{" "}
                    {formatNum(coinObject.market_data.circulating_supply)}{" "}
                    {coinObject.symbol.toUpperCase()}
                  </Box>
                  <Box>
                    Max Supply: {formatNum(coinObject.market_data.max_supply)}{" "}
                    {coinObject.symbol.toUpperCase()}
                  </Box>
                </Box>
              </Box>
              <Box>Description</Box>
              <Box bgColor={0} p="15px" borderRadius="10px" fontSize="10px">
                {coinObject.description.en}
              </Box>
            </Box>
          </Box>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
