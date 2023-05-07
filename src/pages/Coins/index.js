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
const react_redux_1 = require("react-redux");
// @ts-ignore
const BitcoinCharts_1 = __importDefault(require("../../components/BitcoinCharts"));
// @ts-ignore
const Box_1 = __importDefault(require("../../components/Box"));
// @ts-ignore
const CoinsTable_1 = __importDefault(require("../../components/CoinsTable"));
// @ts-ignore
const Select_1 = __importDefault(require("../../components/Select"));
const coingecko_1 = require("../../utils/coingecko");
// @ts-ignore
const navigationBarSlice_1 = require("../../components/NavigationBar/navigationBarSlice");
function Coins() {
    const [bitcoinObject, setBitcoinObject] = (0, react_1.useState)();
    const [marketsArray, setMarketsArray] = (0, react_1.useState)([]);
    const currency = (0, react_redux_1.useSelector)((state) => state.navigationBar.currency);
    const order = (0, react_redux_1.useSelector)((state) => state.navigationBar.order);
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        const asyncSetBitcoinObject = () => __awaiter(this, void 0, void 0, function* () {
            const newObject = yield (0, coingecko_1.getBitcoinObject)(currency);
            setBitcoinObject(newObject);
        });
        const asyncSetMarketsArray = () => __awaiter(this, void 0, void 0, function* () {
            const newArray = yield (0, coingecko_1.getMarketsArray)(currency, order);
            setMarketsArray(newArray);
        });
        asyncSetMarketsArray();
        asyncSetBitcoinObject();
    }, [currency, order]);
    function handleAddMoreMarketsArray() {
        return __awaiter(this, void 0, void 0, function* () {
            const n = 1 + marketsArray.length / 50;
            const newArray = yield (0, coingecko_1.getMarketsArray)(currency, order, n);
            setMarketsArray([...marketsArray, ...newArray]);
        });
    }
    return (react_1.default.createElement("div", null, bitcoinObject ? (react_1.default.createElement("div", null,
        react_1.default.createElement(Box_1.default, { width: "100vw", justifyContent: "center", alignItems: "center", flexDirection: "column", bgColor: 1 },
            react_1.default.createElement(Box_1.default, { width: "90%" },
                react_1.default.createElement(Box_1.default, { justifyContent: "flex-start" }, "Your Overview")),
            react_1.default.createElement(BitcoinCharts_1.default, { bitcoinObject: bitcoinObject }),
            react_1.default.createElement(Box_1.default, { width: "90%" },
                react_1.default.createElement(Box_1.default, { justifyContent: "flex-start" }, "Your Overview")),
            react_1.default.createElement(Box_1.default, { width: "90%" },
                react_1.default.createElement(Box_1.default, { justifyContent: "flex-start" },
                    react_1.default.createElement(Select_1.default, { bgColor: 1, onChange: (e) => dispatch((0, navigationBarSlice_1.setOrder)(e.target.value)) },
                        react_1.default.createElement("option", { key: "0", value: "market_cap_desc" }, "Top Market"),
                        react_1.default.createElement("option", { key: "1", value: "market_cap_asc" }, "Bot Market"),
                        react_1.default.createElement("option", { key: "2", value: "volume_desc" }, "Top Volume"),
                        react_1.default.createElement("option", { key: "3", value: "volume_asc" }, "Bot Volume")))),
            react_1.default.createElement(CoinsTable_1.default, { marketsArray: marketsArray, handleAddMoreMarketsArray: handleAddMoreMarketsArray })))) : (react_1.default.createElement("div", null))));
}
exports.default = Coins;
