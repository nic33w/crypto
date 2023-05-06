import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addAsset, deleteAsset } from "./portfolioSlice";
import Box from "../../components/Box";
import SelectCoins from "../../components/SelectCoins";
import { formatNum } from "../../utils/numberFormat.tsx";
import StyledButton from "../../components/StyledButton";
import { getMarketsArray } from "../../utils/coingecko";

export default function Portfolio() {
  const [showModal, setShowModal] = useState(false);
  const assetsArray = useSelector((state) => state.portfolio.assetsArray);
  const [marketsArray, setMarketsArray] = useState([]);
  const currency = useSelector((state) => state.navigationBar.currency);

  const dispatch = useDispatch();

  useEffect(() => {
    // for portfolio page
    const asyncSetPortfolioMarketsArray = async () => {
      const newArray = await getMarketsArray(currency);
      setMarketsArray(newArray);
    };
    asyncSetPortfolioMarketsArray();
  }, [currency]);

  function handleAddAsset(newAsset) {
    dispatch(addAsset(newAsset));
  }

  function handleCloseModal() {
    setShowModal(false);
  }

  const PortoflioAsset = (props) => {
    if (marketsArray) {
      const asset = props.asset;
      const market = marketsArray.find((element) => element.id === asset.id);
      return (
        <Box
          width="100%"
          key={market.id}
          justifyContent="space-between"
          margin="10px"
        >
          <Box
            bgColor={0}
            flexDirection="column"
            justifyContent="center"
            p="10px"
            borderRadius="10px"
            width="10%"
            alignItems="center"
          >
            <Box justifyContent="center">
              <img src={market.image} height="30px" />
            </Box>
            <Box>{market.name}</Box>
          </Box>
          <Box width="85%" flexDirection="column" fontSize="10px">
            <Box>Market Price:</Box>
            <Box
              bgColor={0}
              p="10px"
              borderRadius="10px"
              justifyContent="space-between"
            >
              <Box>Current Price: ${formatNum(market.price)}</Box>
              <Box>Price Change 24h: ${formatNum(market.price_change_24h)}</Box>
              <Box>
                Market Cap vs Volume:{" "}
                {100 * formatNum(market.total_volume / market.market_cap)}%
              </Box>
              <Box>
                Circ supply vs max supply:{" "}
                {formatNum(market.total_supply - market.circulating_supply)}
              </Box>
            </Box>
            <Box>Your Coin: </Box>
            <Box
              bgColor={0}
              p="10px"
              borderRadius="10px"
              justifyContent="space-between"
            >
              <Box>Coin Amount: {asset.purchasedAmount}</Box>
              <Box>
                Amount Value: ${formatNum(asset.purchasedAmount * market.price)}
              </Box>
              <Box>
                Amount price change since purchase:{" $"}
                {formatNum(market.price - asset.purchasedPrice)}
              </Box>
              <Box>Purchase date: {asset.purchasedDate}</Box>
            </Box>
            <Box>
              <StyledButton onClick={() => dispatch(deleteAsset(asset))}>
                Delete Asset
              </StyledButton>
            </Box>
          </Box>
        </Box>
      );
    }
  };

  return (
    <div>
      <Box
        width="100vw"
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        bgColor={1}
        p="40px"
        boxSizing="border-box"
      >
        <Box>
          <StyledButton isPrimary={true} onClick={() => setShowModal(true)}>
            Add Asset
          </StyledButton>
        </Box>
        <Box width="100%">Your statistics</Box>
        <Box width="100%" flexDirection="column">
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
    </div>
  );
}
