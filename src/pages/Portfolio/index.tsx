import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import { addAsset, deleteAsset } from "./portfolioSlice";
// @ts-ignore
import Box from "../../components/Box";
// @ts-ignore
import SelectCoins from "../../components/SelectCoins";
// @ts-ignore
import { formatNum, getCurrencySymbol } from "../../utils/numberFormat.tsx";
// @ts-ignore
import StyledButton from "../../components/StyledButton";
// @ts-ignore
import { getMarketsArray } from "../../utils/coingecko.tsx";

export default function Portfolio() {
  const [showModal, setShowModal] = useState<boolean>(false);
  const assetsArray = useSelector(
    (state: { portfolio: { assetsArray: any[] } }) =>
      state.portfolio.assetsArray
  );
  const [marketsArray, setMarketsArray] = useState([]);
  const currency = useSelector(
    (state: { navigationBar: { currency: string } }) =>
      state.navigationBar.currency
  );

  const dispatch = useDispatch();

  useEffect(() => {
    // for portfolio page
    const asyncSetPortfolioMarketsArray = async () => {
      const newArray = await getMarketsArray(currency);
      setMarketsArray(newArray);
    };
    asyncSetPortfolioMarketsArray();
  }, [currency]);

  function handleAddAsset(newAsset: any) {
    dispatch(addAsset(newAsset));
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const PortoflioAsset = (props: any) => {
    if (marketsArray) {
      const asset = props.asset;
      const market: any = marketsArray.find(
        (element: any) => element.id === asset.id
      );
      return (
        <Box width="100%" key={market.id} justifyContent="space-between">
          <Box
            bgColor={0}
            flexDirection="column"
            justifyContent="center"
            p="10px"
            borderRadius="10px"
            width="13%"
            alignItems="center"
          >
            <Box
              justifyContent="center"
              bgColor={2}
              borderRadius="5px"
              height="50px"
              width="50px"
              alignItems="center"
            >
              <img src={market.image} height="25px" />
            </Box>
            <Box fontSize="13px">
              {market.name + " (" + market.symbol.toUpperCase() + ")"}
            </Box>
          </Box>
          <Box width="85%" flexDirection="column" fontSize="12px">
            <Box>Market Price:</Box>
            <Box
              bgColor={0}
              p="10px"
              borderRadius="10px"
              justifyContent="space-between"
            >
              <Box>
                Current Price:{" "}
                <Box color="lime" pl="5px">
                  {" " + getCurrencySymbol(currency) + formatNum(market.price)}
                </Box>
              </Box>
              <Box>
                Price Change 24h:{" "}
                <Box color="lime" pl="5px">
                  {" " +
                    getCurrencySymbol(currency) +
                    formatNum(market.price_change_24h)}
                </Box>
              </Box>
              <Box>
                Market Cap vs Volume:{" "}
                <Box color="lime" pl="5px">
                  {100 *
                    Number(formatNum(market.total_volume / market.market_cap))}
                  %
                </Box>
              </Box>
              <Box>
                Circ supply vs max supply:{" "}
                <Box color="lime" pl="5px">
                  {formatNum(market.total_supply - market.circulating_supply)}
                </Box>
              </Box>
            </Box>
            <Box>Your Coin: </Box>
            <Box
              bgColor={0}
              p="10px"
              borderRadius="10px"
              justifyContent="space-between"
            >
              <Box>
                Coin Amount:{" "}
                <Box color="lime" pl="5px">
                  {asset.purchasedAmount}
                </Box>
              </Box>
              <Box>
                Amount Value:{" "}
                <Box color="lime" pl="5px">
                  <Box color="lime" pl="5px">
                    {" " +
                      getCurrencySymbol(currency) +
                      formatNum(asset.purchasedAmount * market.price)}
                  </Box>
                </Box>
              </Box>
              <Box>
                Amount price change since purchase:
                <Box color="lime" pl="5px">
                  {" " +
                    getCurrencySymbol(currency) +
                    formatNum(market.price - asset.purchasedPrice)}
                </Box>
              </Box>
              <Box>
                Purchase date:{" "}
                <Box color="lime" pl="5px">
                  {asset.purchasedDate}
                </Box>
              </Box>
            </Box>
            <Box mt="5px">
              <StyledButton
                width="100px"
                padding="5px"
                onClick={() => dispatch(deleteAsset(asset))}
              >
                Delete Asset
              </StyledButton>
            </Box>
          </Box>
        </Box>
      );
    } else {
      return null;
    }
  };

  return (
    <Box justifyContent="center">
      <Box
        width="100vw"
        maxWidth={1070}
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        bgColor={1}
        py="40px"
        gridRowGap="20px"
        mt="20px"
      >
        <Box>
          <StyledButton
            width="400px"
            height="70px"
            isPrimary={true}
            onClick={() => setShowModal(true)}
          >
            Add Asset
          </StyledButton>
        </Box>
        <Box width="100%">Your statistics</Box>
        <Box width="100%" flexDirection="column" gridRowGap="10px">
          {marketsArray?.length !== 0 ? (
            assetsArray?.map((asset) => (
              <PortoflioAsset
                key={`${asset.id}${asset.purchasedAmount}${asset.purchasedDate}`}
                asset={asset}
              />
            ))
          ) : (
            <div></div>
          )}
        </Box>
      </Box>
      {showModal ? (
        <SelectCoins
          marketsArray={marketsArray}
          handleAddAsset={handleAddAsset}
          handleCloseModal={handleCloseModal}
          currency={currency}
        />
      ) : (
        <></>
      )}
    </Box>
  );
}
