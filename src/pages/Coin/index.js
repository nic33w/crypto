"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
const react_1 = __importStar(require("react"));
const react_router_dom_1 = require("react-router-dom");
// @ts-ignore
const Box_1 = __importDefault(require("../../components/Box"));
const coingecko_1 = require("../../utils/coingecko");
const numberFormat_1 = require("../../utils/numberFormat");
const react_redux_1 = require("react-redux");
function Coin() {
    const [coinObject, setCoinObject] = (0, react_1.useState)();
    const params = (0, react_router_dom_1.useParams)();
    const currency = (0, react_redux_1.useSelector)((state) => state.navigationBar.currency);
    (0, react_1.useEffect)(() => {
        const asyncSetCoinObject = () => __awaiter(this, void 0, void 0, function* () {
            if (params.coin != undefined) {
                const newObject = yield (0, coingecko_1.getCoinObject)(params.coin);
                console.log("Coin Obj: ", newObject);
                setCoinObject(newObject);
            }
        });
        asyncSetCoinObject();
    }, []);
    return (react_1.default.createElement("div", null, coinObject ? (react_1.default.createElement("div", null,
        react_1.default.createElement(Box_1.default, { alignItems: "center", justifyContent: "center", flexDirection: "column", bgColor: 1, fontSize: "12px" },
            react_1.default.createElement(Box_1.default, { width: "80%", height: "100%", flexDirection: "column", justifyContent: "space-evenly" },
                react_1.default.createElement(Box_1.default, null, "Your Summary"),
                react_1.default.createElement(Box_1.default, { justifyContent: "space-between" },
                    react_1.default.createElement(Box_1.default, { width: "15%", bgColor: 0, p: "15px", borderRadius: "10px", flexDirection: "column", alignItems: "center", justifyContent: "space-between" },
                        react_1.default.createElement(Box_1.default, { flexDirection: "column", alignItems: "center" },
                            react_1.default.createElement(Box_1.default, { bgColor: 1, padding: "10px" },
                                react_1.default.createElement("img", { src: coinObject.image.thumb, height: "15px" })),
                            react_1.default.createElement(Box_1.default, null, coinObject.name +
                                " (" +
                                coinObject.symbol.toUpperCase() +
                                ")")),
                        react_1.default.createElement(Box_1.default, { fontSize: "10px", padding: "5px" }, coinObject.links.homepage[0])),
                    react_1.default.createElement(Box_1.default, { width: "30%", bgColor: 0, p: "15px", borderRadius: "10px", flexDirection: "column", alignItems: "center", justifyContent: "space-between", fontSize: "10px" },
                        react_1.default.createElement(Box_1.default, { fontSize: "20px", fontWeight: "bold" },
                            "$",
                            (0, numberFormat_1.formatNumExact)(coinObject.market_data.current_price[currency])),
                        react_1.default.createElement(Box_1.default, { flexDirection: "column" },
                            react_1.default.createElement(Box_1.default, null,
                                "All Time High: $",
                                (0, numberFormat_1.formatNumExact)(coinObject.market_data.ath[currency])),
                            react_1.default.createElement(Box_1.default, null, new Date(coinObject.market_data.ath_date[currency]).toDateString())),
                        react_1.default.createElement(Box_1.default, { flexDirection: "column" },
                            react_1.default.createElement(Box_1.default, null,
                                "All Time Low: $",
                                (0, numberFormat_1.formatNumExact)(coinObject.market_data.atl[currency])),
                            react_1.default.createElement(Box_1.default, null, new Date(coinObject.market_data.atl_date[currency]).toDateString()))),
                    react_1.default.createElement(Box_1.default, { width: "30%", bgColor: 0, p: "15px", fontSize: "10px", borderRadius: "10px", flexDirection: "column" },
                        react_1.default.createElement(Box_1.default, null,
                            "Market Cap:",
                            " $",
                            (0, numberFormat_1.formatNum)(coinObject.market_data.market_cap[currency])),
                        react_1.default.createElement(Box_1.default, null,
                            "Fully Dilluted Valuation:",
                            " $",
                            (0, numberFormat_1.formatNum)(coinObject.market_data.fully_diluted_valuation[currency])),
                        react_1.default.createElement(Box_1.default, null,
                            "Volume 24h:",
                            " $",
                            (0, numberFormat_1.formatNum)(coinObject.market_data.total_volume[currency])),
                        react_1.default.createElement(Box_1.default, null,
                            "Volume / Market:",
                            " ",
                            (0, numberFormat_1.formatNum)(coinObject.market_data.total_volume[currency] /
                                coinObject.market_data.market_cap[currency])),
                        react_1.default.createElement(Box_1.default, null,
                            "Total Volume:",
                            " ",
                            (0, numberFormat_1.formatNum)(coinObject.market_data.total_supply),
                            " ",
                            coinObject.symbol.toUpperCase()),
                        react_1.default.createElement(Box_1.default, null,
                            "Circulating Supply:",
                            " ",
                            (0, numberFormat_1.formatNum)(coinObject.market_data.circulating_supply),
                            " ",
                            coinObject.symbol.toUpperCase()),
                        react_1.default.createElement(Box_1.default, null,
                            "Max Supply: ",
                            (0, numberFormat_1.formatNum)(coinObject.market_data.max_supply),
                            " ",
                            coinObject.symbol.toUpperCase()))),
                react_1.default.createElement(Box_1.default, null, "Description"),
                react_1.default.createElement(Box_1.default, { bgColor: 0, p: "15px", borderRadius: "10px", fontSize: "10px" }, coinObject.description.en))))) : (react_1.default.createElement("div", null))));
}
exports.default = Coin;
