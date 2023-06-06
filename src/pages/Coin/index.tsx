import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import parse from "html-react-parser";
// @ts-ignore
import Box from "../../components/Box";
import { getCoinObject } from "../../utils/coingecko";
import {
  formatNum,
  formatNumExact,
  getCurrencySymbol,
} from "../../utils/numberFormat";
import { useSelector } from "react-redux";
import ColorPair from "../../components/ColorPair";

export default function Coin() {
  const [coinObject, setCoinObject] = useState<any>();
  const params = useParams<{ coin: string }>();
  const currency = useSelector(
    (state: { navigationBar: { currency: string } }) =>
      state.navigationBar.currency
  );

  useEffect(() => {
    const asyncSetCoinObject = async () => {
      if (params.coin != undefined) {
        const newObject = await getCoinObject(params.coin);
        console.log("Coin Obj: ", newObject);
        setCoinObject(newObject);
      }
    };
    asyncSetCoinObject();
  }, []);

  function formatLink(link: string): string {
    let newLink = link;
    if (link.startsWith("https://")) {
      newLink = link.replace("https://", "");
    }
    if (link.startsWith("http://")) {
      newLink = link.replace("http://", "");
    }
    if (!newLink.startsWith("www.")) {
      newLink = "www.".concat(newLink);
    }
    return newLink;
  }

  function createPair(
    total_supply: number | string,
    circulating_supply: number | string
  ): [number, number] {
    if (
      typeof total_supply === "number" &&
      typeof circulating_supply === "number"
    ) {
      const percentage2 = Math.round((100 * circulating_supply) / total_supply);
      const percentage1 = 100 - percentage2;
      return [percentage1, percentage2];
    } else {
      return [1, 2];
    }
  }

  return (
    <div>
      {coinObject ? (
        <div>
          <Box
            height="80vh"
            alignItems="center"
            justifyContent="center"
            flexDirection="column"
            bgColor={1}
            fontSize="15px"
          >
            <Box
              width="90%"
              maxWidth="1070px"
              height="100%"
              flexDirection="column"
              gridRowGap="20px"
              mt="40px"
            >
              <Box>Your Summary</Box>
              <Box justifyContent="space-between">
                <Box
                  width="20%"
                  borderRadius="5px"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Box
                    flexDirection="column"
                    justifyContent="center"
                    alignItems="center"
                    bgColor={0}
                    width="100%"
                    height="80%"
                    borderRadius="5px"
                  >
                    <Box bgColor={1} padding="10px">
                      <img src={coinObject.image.thumb} height="25px" />
                    </Box>
                    <Box>
                      {coinObject.name +
                        " (" +
                        coinObject.symbol.toUpperCase() +
                        ")"}
                    </Box>
                  </Box>
                  <Box
                    fontSize="12px"
                    justifyContent="center"
                    alignItems="center"
                    padding="5px"
                    bgColor={0}
                    width="100%"
                    height="15%"
                    borderRadius="5px"
                  >
                    <a href={coinObject.links.homepage[0]}>
                      <Box isHoverable={true}>
                        {formatLink(coinObject.links.homepage[0])}
                      </Box>
                    </a>
                  </Box>
                </Box>
                <Box
                  width="35%"
                  bgColor={0}
                  p="15px"
                  borderRadius="5px"
                  flexDirection="column"
                  alignItems="center"
                  justifyContent="space-between"
                  fontSize="12px"
                >
                  <Box fontSize="20px" fontWeight="bold">
                    {getCurrencySymbol(currency) +
                      formatNumExact(
                        coinObject.market_data.current_price[currency]
                      )}
                  </Box>
                  <Box flexDirection="column">
                    <Box>
                      All Time High:
                      {" " +
                        getCurrencySymbol(currency) +
                        formatNumExact(coinObject.market_data.ath[currency])}
                    </Box>
                    <Box>
                      {new Date(
                        coinObject.market_data.ath_date[currency]
                      ).toDateString()}
                    </Box>
                  </Box>
                  <Box flexDirection="column">
                    <Box>
                      All Time Low:
                      {" " +
                        getCurrencySymbol(currency) +
                        formatNumExact(coinObject.market_data.atl[currency])}
                    </Box>
                    <Box>
                      {new Date(
                        coinObject.market_data.atl_date[currency]
                      ).toDateString()}
                    </Box>
                  </Box>
                </Box>
                <Box
                  width="35%"
                  bgColor={0}
                  p="15px"
                  fontSize="12px"
                  borderRadius="5px"
                  flexDirection="column"
                >
                  <Box>
                    Market Cap:
                    {" " +
                      getCurrencySymbol(currency) +
                      formatNum(coinObject.market_data.market_cap[currency])}
                  </Box>
                  <Box>
                    Fully Dilluted Valuation:
                    {" " +
                      getCurrencySymbol(currency) +
                      formatNum(
                        coinObject.market_data.fully_diluted_valuation[currency]
                      )}
                  </Box>
                  <Box>
                    Volume 24h:
                    {" " +
                      getCurrencySymbol(currency) +
                      formatNum(coinObject.market_data.total_volume[currency])}
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
                  <ColorPair
                    pair={createPair(
                      coinObject.market_data.total_supply,
                      coinObject.market_data.circulating_supply
                    )}
                    colorNumber={coinObject.market_cap_rank}
                    isPercent={true}
                  />
                </Box>
              </Box>
              <Box>Description</Box>
              <Box
                bgColor={0}
                p="15px"
                borderRadius="5px"
                fontSize="12px"
                display="inline"
              >
                {parse(coinObject.description.en)}
              </Box>
              <Box
                fontSize="12px"
                justifyContent="space-between"
                gridColumnGap="10px"
              >
                <Box
                  justifyContent="center"
                  alignItems="center"
                  padding="10px"
                  bgColor={0}
                  borderRadius="5px"
                  width="100%"
                >
                  <a href={coinObject.links.blockchain_site?.[0]}>
                    <Box isHoverable={true}>
                      {formatLink(coinObject.links.blockchain_site?.[0])}
                    </Box>
                  </a>
                </Box>
                <Box
                  justifyContent="center"
                  alignItems="center"
                  padding="10px"
                  bgColor={0}
                  borderRadius="5px"
                  width="100%"
                >
                  <a href={coinObject.links.blockchain_site?.[1]}>
                    <Box isHoverable={true}>
                      {formatLink(coinObject.links.blockchain_site?.[1])}
                    </Box>
                  </a>
                </Box>
                <Box
                  justifyContent="center"
                  alignItems="center"
                  padding="10px"
                  bgColor={0}
                  borderRadius="5px"
                  width="100%"
                >
                  <a href={coinObject.links.blockchain_site?.[2]}>
                    <Box isHoverable={true}>
                      {formatLink(coinObject.links.blockchain_site?.[2])}
                    </Box>
                  </a>
                </Box>
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
