import Box from "../Box";
import CryptoChart from "../CryptoChart";

// I will move this function into a separate util class
function formatNum(number) {
  if (number === null) {
    return "NA";
  } else if (number < 1000) {
    return number.toFixed(2);
  } else if (number < 1000000) {
    return (number * 0.001).toFixed(1) + "K";
  } else if (number < 1000000000) {
    return (number * 0.000001).toFixed(1) + "M";
  } else if (number < 1000000000000) {
    return (number * 0.000000001).toFixed(1) + "B";
  } else {
    return (number * 0.000000000001).toFixed(1) + "T";
  }
}

function ChartTitle(props) {
  return (
    <Box fontSize="12px" flexDirection="column">
      <Box>{props.line1}</Box>
      <Box fontSize="16px">{props.line2}</Box>
      <Box>{props.line3}</Box>
    </Box>
  );
}

export default function BitcoinCharts(props) {
  const lastIndex = props.bitcoinObject.prices.length - 1;
  const today = new Date(props.bitcoinObject.prices[lastIndex][0]);

  return (
    <Box width="90%" justifyContent="space-between">
      <Box width="48%" flexDirection="column" borderRadius="10px" bgColor={0}>
        <ChartTitle
          line1="BTC"
          line2={"$" + formatNum(props.bitcoinObject.prices[lastIndex][1])}
          line3={today.toDateString()}
        />
        <CryptoChart
          type="line"
          data={props.bitcoinObject.prices}
          showLabels={true}
        />
      </Box>
      <Box width="48%" flexDirection="column" borderRadius="10px" bgColor={0}>
        <ChartTitle
          line1="Volume 24h"
          line2={"$" + formatNum(props.bitcoinObject.volumes[lastIndex][1])}
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
