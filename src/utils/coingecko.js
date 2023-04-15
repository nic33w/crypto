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

// coins page - top chart
async function getBitcoinObject(currency) {
  const link = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=180&interval=daily`;
  const data = await getData(link);
  const { prices, total_volumes: volumes } = data;
  const newData = { prices, volumes };
  console.log("BitcoinObject: ", newData);
  return newData;
}

// coins page coins list & portfolio
async function getMarketsArray(currency, page = 1) {
  const link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=market_cap_desc&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
  const data = await getData(link);
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

// coin page
async function getCoinObject(coinName) {
  const link = `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;
  const data = await getData(link);
  const { image, name, symbol, links, market_data, description } = data;
  const newData = { image, name, symbol, links, market_data, description };
  return newData;
}

// portfolio page - select coin
async function getCoinPriceByDate(coinName, date, currency) {
  const link = `https://api.coingecko.com/api/v3/coins/${coinName}/history?date=${date}&localization=false`;
  const data = await getData(link);
  const price = data.market_data.current_price[currency];
  return price;
}

// navbar
async function getAllCurrencies() {
  const link =
    "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";
  const data = await getData(link);
  console.log(data);
  return data;
}

export {
  f1,
  getBitcoinObject,
  getMarketsArray,
  getCoinObject,
  getCoinPriceByDate,
  getAllCurrencies,
};
