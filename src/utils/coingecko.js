"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAllCurrencies = exports.getCoinPriceByDate = exports.getCoinObject = exports.getMarketsArray = exports.getBitcoinObject = void 0;
const axios_1 = __importDefault(require("axios"));
function getData(link) {
    return __awaiter(this, void 0, void 0, function* () {
        try {
            const response = yield (0, axios_1.default)(link);
            return response.data;
        }
        catch (error) {
            console.log(error);
        }
    });
}
// coins page - top chart
function getBitcoinObject(currency) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = `https://api.coingecko.com/api/v3/coins/bitcoin/market_chart?vs_currency=${currency}&days=180&interval=daily`;
        const data = yield getData(link);
        const { prices, total_volumes: volumes } = data;
        const newData = { prices, volumes };
        console.log("BitcoinObject: ", newData);
        return newData;
    });
}
exports.getBitcoinObject = getBitcoinObject;
// coins page coins list & portfolio
function getMarketsArray(currency, order = "market_cap_desc", page = 1) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=${currency}&order=${order}&per_page=50&page=${page}&sparkline=true&price_change_percentage=1h%2C24h%2C7d`;
        const data = yield getData(link);
        const newData = data.map((element) => {
            const { id, market_cap_rank: rank, image, name, symbol, current_price: price, price_change_percentage_1h_in_currency: price_change_1h, price_change_percentage_24h_in_currency: price_change_24h, price_change_percentage_7d_in_currency: price_change_7d, total_volume, market_cap, circulating_supply, total_supply, sparkline_in_7d, } = element;
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
    });
}
exports.getMarketsArray = getMarketsArray;
// coin page
function getCoinObject(coinName) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = `https://api.coingecko.com/api/v3/coins/${coinName}?localization=false&tickers=false&market_data=true&community_data=true&developer_data=false&sparkline=false`;
        const data = yield getData(link);
        const { image, name, symbol, links, market_data, description } = data;
        const newData = { image, name, symbol, links, market_data, description };
        return newData;
    });
}
exports.getCoinObject = getCoinObject;
// portfolio page - select coin
function getCoinPriceByDate(coinName, date, currency) {
    return __awaiter(this, void 0, void 0, function* () {
        const link = `https://api.coingecko.com/api/v3/coins/${coinName}/history?date=${date}&localization=false`;
        const data = yield getData(link);
        const price = data.market_data.current_price[currency];
        return price;
    });
}
exports.getCoinPriceByDate = getCoinPriceByDate;
// navbar
function getAllCurrencies() {
    return __awaiter(this, void 0, void 0, function* () {
        const link = "https://api.coingecko.com/api/v3/simple/supported_vs_currencies";
        const data = yield getData(link);
        console.log(data);
        return data;
    });
}
exports.getAllCurrencies = getAllCurrencies;
