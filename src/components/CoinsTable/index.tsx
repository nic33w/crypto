import { Link } from "react-router-dom";
// @ts-ignore
import Box from "../Box";
// @ts-ignore
import CryptoChart from "../CryptoChart";
import InfiniteScroll from "react-infinite-scroll-component";
import { formatNum } from "../../utils/numberFormat";
import React from "react";
import ColorPair from "../ColorPair";
import StyledLink from "../StyledLink";

function getColor(number: number) {
  return number < 0 ? "red" : "lime";
}

function TableHeader() {
  return (
    <Box width="98%" justifyContent="space-between" fontWeight="bold" mb="10px">
      <Box width="1%">#</Box>
      <Box width="20%">Name</Box>
      <Box width="4%">Price</Box>
      <Box width="4%">1h%</Box>
      <Box width="4%">24h%</Box>
      <Box width="4%">7d%</Box>
      <Box width="19%">24h Volume/Market Cap</Box>
      <Box width="19%">Circulating/Total Supply</Box>
      <Box width="10%">Last 7d</Box>
    </Box>
  );
}

function TableRow(props: any) {
  return (
    <Box
      width="100%"
      maxWidth="1024px"
      justifyContent="space-between"
      alignItems="center"
      borderTop="1px solid"
      borderColor="grey"
      padding="20px 0px"
    >
      <Box width="1%">{props.coin.rank}</Box>
      <Box width="20%" alignItems="center">
        <img src={props.coin.image} height="20px" />
        <Box pr="5px"></Box>
        <StyledLink to={"/coin/" + props.coin.id}>
          <Box isHoverable={true}>
            {props.coin.name + " (" + props.coin.symbol.toUpperCase() + ")"}
          </Box>
        </StyledLink>
      </Box>
      <Box width="4%">{props.currencySymbol + formatNum(props.coin.price)}</Box>
      <Box width="4%" color={getColor(props.coin.price_change_1h)}>
        {props.coin.price_change_1h?.toFixed(2)}%
      </Box>
      <Box width="4%" color={getColor(props.coin.price_change_24h)}>
        {props.coin.price_change_24h?.toFixed(2)}%
      </Box>
      <Box width="4%" color={getColor(props.coin.price_change_7d)}>
        {props.coin.price_change_7d?.toFixed(2)}%
      </Box>
      <Box width="19%">
        <ColorPair
          currencySymbol={props.currencySymbol}
          pair={[props.coin.total_volume, props.coin.market_cap]}
          colorNumber={props.index}
        />
      </Box>
      <Box width="19%">
        <ColorPair
          pair={[props.coin.circulating_supply, props.coin.total_supply]}
          colorNumber={props.index}
        />
      </Box>
      <Box width="10%">
        <CryptoChart
          type="line"
          data={props.coin.sparkline_in_7d?.price.map((element: number) => [
            0,
            element,
          ])}
          showLabels={false}
        />
      </Box>
    </Box>
  );
}

export default function CoinsTable(props: any) {
  return (
    <Box
      flexDirection="column"
      fontSize="12px"
      borderRadius="10px"
      bgColor={0}
      p="10px"
      flex="auto"
      height="10vh"
      id="scrollableBox"
    >
      <TableHeader />
      <div
        style={{ display: "flex", overflow: "auto", flexDirection: "column" }}
      >
        <div id="scrollableDiv" style={{ flex: "auto" }}>
          <InfiniteScroll
            dataLength={props.marketsArray.length}
            next={props.handleAddMoreMarketsArray}
            hasMore={true}
            loader={<div>Loading...</div>}
            scrollableTarget="scrollableDiv"
          >
            <Box
              fontSize="12px"
              width="100%"
              maxWidth="1024px"
              flexDirection="column"
              alignItems="center"
            >
              {props.marketsArray.map(
                (coin: { rank: number; id: string }, index: number) => (
                  <TableRow
                    key={`${coin.rank}${coin.id}${index}`}
                    coin={coin}
                    index={index}
                    currencySymbol={props.currencySymbol}
                  />
                )
              )}
            </Box>
          </InfiniteScroll>
        </div>
      </div>
    </Box>
  );
}

//<TableHeader />
