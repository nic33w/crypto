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

function TableHeader(props) {
  return (
    <Box width="100%" justifyContent="space-between">
      <Box width="1%">#</Box>
      <Box width="20%">Name</Box>
      <Box width="4%">Price</Box>
      <Box width="4%">1h%</Box>
      <Box width="4%">24h%</Box>
      <Box width="4%">7d%</Box>
      <Box width="20%">24h Volume/Market Cap</Box>
      <Box width="20%">Circulating/Total Supply</Box>
      <Box width="10%">Last 7d</Box>
    </Box>
  );
}

function TableRow(props) {
  return (
    <Box width="100%" justifyContent="space-between" alignItems="center">
      <Box width="1%">{props.coin.rank}</Box>
      <Box width="20%">
        <img src={props.coin.image} height="15px" />
        {props.coin.name + " (" + props.coin.symbol.toUpperCase() + ")"}
      </Box>
      <Box width="4%">{formatNum(props.coin.price)}</Box>
      <Box width="4%">{props.coin.price_change_1h.toFixed(2)}</Box>
      <Box width="4%">{props.coin.price_change_24h.toFixed(2)}</Box>
      <Box width="4%">{props.coin.price_change_7d.toFixed(2)}</Box>
      <Box width="20%">
        {formatNum(props.coin.total_volume) +
          " / " +
          formatNum(props.coin.market_cap)}
      </Box>
      <Box width="20%">
        {formatNum(props.coin.circulating_supply) +
          " / " +
          formatNum(props.coin.total_supply)}
      </Box>
      <Box width="10%">
        <CryptoChart
          type="line"
          data={props.coin.sparkline_in_7d.price.map((element) => [0, element])}
          showLabels={false}
        />
      </Box>
    </Box>
  );
}

export default function CoinsTable(props) {
  return (
    <Box
      fontSize="12px"
      width="90%"
      flexDirection="column"
      alignItems="center"
      borderRadius="10px"
      bgColor={0}
    >
      <TableHeader />
      {props.marketsArray.map((coin) => (
        <TableRow key={coin.rank} coin={coin} />
      ))}
    </Box>
  );
}
