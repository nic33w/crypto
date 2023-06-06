// @ts-ignore
import Box from "../Box";
import CryptoChart from "../CryptoChart";
import { formatNum } from "../../utils/numberFormat";
import React from "react";

function ChartTitle(props: { line1: string; line2: string; line3: string }) {
  return (
    <Box padding="10px" fontSize="12px" flexDirection="column">
      <Box>{props.line1}</Box>
      <Box fontSize="18px" fontWeight="bold">
        {props.line2}
      </Box>
      <Box>{props.line3}</Box>
    </Box>
  );
}

export default function BitcoinCharts(props: any) {
  const lastIndex = props.bitcoinObject.prices.length - 1;
  const today = new Date(props.bitcoinObject.prices[lastIndex][0]);

  return (
    <Box width="100%" justifyContent="space-between">
      <Box width="48%" flexDirection="column" borderRadius="10px" bgColor={0}>
        <ChartTitle
          line1="BTC"
          line2={
            props.currencySymbol +
            formatNum(props.bitcoinObject.prices[lastIndex][1])
          }
          line3={today.toDateString()}
        />
        <CryptoChart
          type="area"
          data={props.bitcoinObject.prices}
          showLabels={true}
        />
      </Box>
      <Box width="48%" flexDirection="column" borderRadius="10px" bgColor={0}>
        <ChartTitle
          line1="Volume 24h"
          line2={
            props.currencySymbol +
            formatNum(props.bitcoinObject.volumes[lastIndex][1])
          }
          line3={today.toDateString()}
        />
        <CryptoChart
          type="bar"
          data={props.bitcoinObject.volumes}
          showLabels={true}
        />
      </Box>
    </Box>
  );
}
