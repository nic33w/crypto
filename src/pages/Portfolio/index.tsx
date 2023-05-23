import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
// @ts-ignore
import { addAsset, deleteAsset } from "./portfolioSlice";
// @ts-ignore
import Box from "../../components/Box";
// @ts-ignore
import SelectCoins from "../../components/SelectCoins";
// @ts-ignore
import { formatNum } from "../../utils/numberFormat.tsx";
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
                {100 *
                  Number(formatNum(market.total_volume / market.market_cap))}
                %
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
    <div>
      <Box
        width="100vw"
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        bgColor={1}
        p="40px"
        boxSizing="border-box"
        gridRowGap="20px"
        mt="20px"
      >
        <Box>
          <StyledButton
            width="250px"
            isPrimary={true}
            onClick={() => setShowModal(true)}
          >
            Add Asset
          </StyledButton>
        </Box>
        <Box width="100%" maxWidth={1024}>
          Your statistics
        </Box>
        <Box
          width="100%"
          maxWidth={1024}
          flexDirection="column"
          gridRowGap="10px"
        >
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
