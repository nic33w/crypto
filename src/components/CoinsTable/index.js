import { Link } from "react-router-dom";
import Box from "../Box";
import CryptoChart from "../CryptoChart";
import { formatNum } from "../../utils/numberFormat";

function getColor(number) {
  return number < 0 ? "red" : "lime";
}

function TableHeader(props) {
  return (
    <Box width="100%" justifyContent="space-between" fontWeight="bold">
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
    <Box
      width="100%"
      justifyContent="space-between"
      alignItems="center"
      borderTop="1px solid"
      borderColor="grey"
    >
      <Box width="1%">{props.coin.rank}</Box>
      <Box width="20%">
        <img src={props.coin.image} height="15px" />
        <Box pr="5px"></Box>
        <Link to={"/coin/" + props.coin.id}>
          {props.coin.name + " (" + props.coin.symbol.toUpperCase() + ")"}
        </Link>
      </Box>
      <Box width="4%">${formatNum(props.coin.price)}</Box>
      <Box width="4%" color={getColor(props.coin.price_change_1h)}>
        {props.coin.price_change_1h.toFixed(2)}%
      </Box>
      <Box width="4%" color={getColor(props.coin.price_change_24h)}>
        {props.coin.price_change_24h.toFixed(2)}%
      </Box>
      <Box width="4%" color={getColor(props.coin.price_change_7d)}>
        {props.coin.price_change_7d.toFixed(2)}%
      </Box>
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
      p="10px"
    >
      <TableHeader />
      {props.marketsArray.map((coin) => (
        <TableRow key={coin.rank} coin={coin} />
      ))}
    </Box>
  );
}

/*
<Link key={coin.rank} to={"/coin/" + coin.name}>
</Link>
*/
