import axios from "axios";

async function f1() {
  const data = await getData(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
  );
  //console.log("data: ", data);
  const newData = data.map((element) => {
    const {
      market_cap_rank: rank,
      image,
      name,
      current_price: price,
      price_change_percentage_1h_in_currency: price_change_1h,
      price_change_percentage_24h_in_currency: price_change_24h,
      price_change_percentage_7d_in_currency: price_change_7d,
      total_volume,
      market_cap,
      circulating_supply,
      total_supply,
      sparkline_in_7d,
    } = element;
    return {
      rank,
      image,
      name,
      price,
      price_change_1h,
      price_change_24h,
      price_change_7d,
      total_volume,
      market_cap,
      circulating_supply,
      total_supply,
      sparkline_in_7d,
    };
  });
  console.log("newData: ", newData);
}

async function getData(link) {
  try {
    const response = await axios(link);
    return response.data;
  } catch (error) {
    console.log(error);
  }
}

async function getBitcoinObject() {
  const data = await getData(
    "https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=usd&days=180&interval=daily"
  );
  const { prices, total_volumes: volumes } = data;
  const newData = { prices, volumes };
  console.log("BitcoinObject: ", newData);
  return newData;
}

async function getMarketsArray() {
  const data = await getData(
    "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=50&page=1&sparkline=true&price_change_percentage=1h%2C24h%2C7d"
  );
  const newData = data.map((element) => {
    const {
      id,
      market_cap_rank: rank,
      image,
      name,
      symbol,
      current_price: price,
      price_change_percentage_1h_in_currency: price_change_1h,
      price_change_percentage_24h_in_currency: price_change_24h,
      price_change_percentage_7d_in_currency: price_change_7d,
      total_volume,
      market_cap,
      circulating_supply,
      total_supply,
      sparkline_in_7d,
    } = element;
    return {
      id,
      rank,
      image,
      name,
      symbol,
      price,
      price_change_1h,
      price_change_24h,
      price_change_7d,
      total_volume,
      market_cap,
      circulating_supply,
      total_supply,
      sparkline_in_7d,
    };
  });
  console.log("MarketsArray: ", newData);
  return newData;
}

async function getCoinObject(coinName) {
  const link =
    "https://api.coingecko.com/api/v3/coins/" +
    coinName +
    "?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false";
  const data = await getData(link);
  const { image, name, symbol, links, market_data, description } = data;
  const newData = { image, name, symbol, links, market_data, description };
  return newData;
}

async function getCoinPriceByDate(coinName, date) {
  const link =
    "https://api.coingecko.com/api/v3/coins/" +
    coinName +
    "/history?date=" +
    date +
    "localization=false";
  const data = await getData(link);
  const price = data.market_data.current_price.usd;
  return price;
}

export {
  f1,
  getBitcoinObject,
  getMarketsArray,
  getCoinObject,
  getCoinPriceByDate,
};
