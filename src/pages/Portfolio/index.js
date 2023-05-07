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
const portfolioSlice_1 = require("./portfolioSlice");
// @ts-ignore
const Box_1 = __importDefault(require("../../components/Box"));
// @ts-ignore
const SelectCoins_1 = __importDefault(require("../../components/SelectCoins"));
// @ts-ignore
const numberFormat_tsx_1 = require("../../utils/numberFormat.tsx");
// @ts-ignore
const StyledButton_1 = __importDefault(require("../../components/StyledButton"));
// @ts-ignore
const coingecko_tsx_1 = require("../../utils/coingecko.tsx");
function Portfolio() {
    const [showModal, setShowModal] = (0, react_1.useState)(false);
    const assetsArray = (0, react_redux_1.useSelector)((state) => state.portfolio.assetsArray);
    const [marketsArray, setMarketsArray] = (0, react_1.useState)([]);
    const currency = (0, react_redux_1.useSelector)((state) => state.navigationBar.currency);
    const dispatch = (0, react_redux_1.useDispatch)();
    (0, react_1.useEffect)(() => {
        // for portfolio page
        const asyncSetPortfolioMarketsArray = () => __awaiter(this, void 0, void 0, function* () {
            const newArray = yield (0, coingecko_tsx_1.getMarketsArray)(currency);
            setMarketsArray(newArray);
        });
        asyncSetPortfolioMarketsArray();
    }, [currency]);
    function handleAddAsset(newAsset) {
        dispatch((0, portfolioSlice_1.addAsset)(newAsset));
    }
    function handleCloseModal() {
        setShowModal(false);
    }
    const PortoflioAsset = (props) => {
        if (marketsArray) {
            const asset = props.asset;
            const market = marketsArray.find((element) => element.id === asset.id);
            return (react_1.default.createElement(Box_1.default, { width: "100%", key: market.id, justifyContent: "space-between", margin: "10px" },
                react_1.default.createElement(Box_1.default, { bgColor: 0, flexDirection: "column", justifyContent: "center", p: "10px", borderRadius: "10px", width: "10%", alignItems: "center" },
                    react_1.default.createElement(Box_1.default, { justifyContent: "center" },
                        react_1.default.createElement("img", { src: market.image, height: "30px" })),
                    react_1.default.createElement(Box_1.default, null, market.name)),
                react_1.default.createElement(Box_1.default, { width: "85%", flexDirection: "column", fontSize: "10px" },
                    react_1.default.createElement(Box_1.default, null, "Market Price:"),
                    react_1.default.createElement(Box_1.default, { bgColor: 0, p: "10px", borderRadius: "10px", justifyContent: "space-between" },
                        react_1.default.createElement(Box_1.default, null,
                            "Current Price: $",
                            (0, numberFormat_tsx_1.formatNum)(market.price)),
                        react_1.default.createElement(Box_1.default, null,
                            "Price Change 24h: $",
                            (0, numberFormat_tsx_1.formatNum)(market.price_change_24h)),
                        react_1.default.createElement(Box_1.default, null,
                            "Market Cap vs Volume:",
                            " ",
                            100 *
                                Number((0, numberFormat_tsx_1.formatNum)(market.total_volume / market.market_cap)),
                            "%"),
                        react_1.default.createElement(Box_1.default, null,
                            "Circ supply vs max supply:",
                            " ",
                            (0, numberFormat_tsx_1.formatNum)(market.total_supply - market.circulating_supply))),
                    react_1.default.createElement(Box_1.default, null, "Your Coin: "),
                    react_1.default.createElement(Box_1.default, { bgColor: 0, p: "10px", borderRadius: "10px", justifyContent: "space-between" },
                        react_1.default.createElement(Box_1.default, null,
                            "Coin Amount: ",
                            asset.purchasedAmount),
                        react_1.default.createElement(Box_1.default, null,
                            "Amount Value: $",
                            (0, numberFormat_tsx_1.formatNum)(asset.purchasedAmount * market.price)),
                        react_1.default.createElement(Box_1.default, null,
                            "Amount price change since purchase:",
                            " $",
                            (0, numberFormat_tsx_1.formatNum)(market.price - asset.purchasedPrice)),
                        react_1.default.createElement(Box_1.default, null,
                            "Purchase date: ",
                            asset.purchasedDate)),
                    react_1.default.createElement(Box_1.default, null,
                        react_1.default.createElement(StyledButton_1.default, { onClick: () => dispatch((0, portfolioSlice_1.deleteAsset)(asset)) }, "Delete Asset")))));
        }
        else {
            return null;
        }
    };
    return (react_1.default.createElement("div", null,
        react_1.default.createElement(Box_1.default, { width: "100vw", justifyContent: "space-evenly", alignItems: "center", flexDirection: "column", bgColor: 1, p: "40px", boxSizing: "border-box" },
            react_1.default.createElement(Box_1.default, null,
                react_1.default.createElement(StyledButton_1.default, { isPrimary: true, onClick: () => setShowModal(true) }, "Add Asset")),
            react_1.default.createElement(Box_1.default, { width: "100%" }, "Your statistics"),
            react_1.default.createElement(Box_1.default, { width: "100%", flexDirection: "column" }, (marketsArray === null || marketsArray === void 0 ? void 0 : marketsArray.length) !== 0 ? (assetsArray === null || assetsArray === void 0 ? void 0 : assetsArray.map((asset) => (react_1.default.createElement(PortoflioAsset, { key: `${asset.id}${asset.purchasedAmount}${asset.purchasedDate}`, asset: asset })))) : (react_1.default.createElement("div", null)))),
        showModal ? (react_1.default.createElement(SelectCoins_1.default, { marketsArray: marketsArray, handleAddAsset: handleAddAsset, handleCloseModal: handleCloseModal, currency: currency })) : (react_1.default.createElement(react_1.default.Fragment, null))));
}
exports.default = Portfolio;
