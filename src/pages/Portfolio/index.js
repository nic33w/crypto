import React, { useState, useEffect } from "react";
import Box from "../../components/Box";
import SelectCoins from "../../components/SelectCoins";
import { getMarketsArray } from "../../utils/coingecko";
import { formatNum } from "../../utils/numberFormat";
import StyledButton from "../../components/StyledButton";

export default function Portfolio() {
  const [marketsArray, setMarketsArray] = useState([]);
  const [assetsArray, setAssetsArray] = useState([]);

  useEffect(() => {
    const asyncSetMarketsArray = async () => {
      const newArray = await getMarketsArray();
      console.log("Markets Array: ", newArray);
      setMarketsArray(newArray);
    };
    asyncSetMarketsArray();
  }, []);

  function handleAddAsset(newAsset) {
    setAssetsArray([...assetsArray, newAsset]);
  }

  const PortoflioAsset = (props) => {
    const asset = props.asset;
    return (
      <Box
        width="100%"
        key={asset.id}
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
            <img src={asset.image} height="30px" />
          </Box>
          <Box>{asset.name}</Box>
        </Box>
        <Box width="85%" flexDirection="column" fontSize="10px">
          <Box>Market Price:</Box>
          <Box
            bgColor={0}
            p="10px"
            borderRadius="10px"
            justifyContent="space-between"
          >
            <Box>Current Price: ${formatNum(asset.price)}</Box>
            <Box>Price Change 24h: ${formatNum(asset.price_change_24h)}</Box>
            <Box>
              Market Cap vs Volume:{" "}
              {100 * formatNum(asset.total_volume / asset.market_cap)}%
            </Box>
            <Box>
              Circ supply vs max supply:{" "}
              {formatNum(asset.total_supply - asset.circulating_supply)}
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
              Amount Value: ${formatNum(asset.purchasedAmount * asset.price)}
            </Box>
            <Box>
              Amount price change since purchase:{" $"}
              {formatNum(asset.price - asset.purchasedPrice)}
            </Box>
            <Box>Purchase date: {asset.purchasedDate.toLocaleDateString()}</Box>
          </Box>
        </Box>
      </Box>
    );
  };
  return (
    <div>
      <Box
        width="90vw"
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        bgColor={1}
        p="40px"
      >
        <Box>
          <StyledButton isPrimary={true}>Add Asset</StyledButton>
        </Box>
        <Box width="100%">Your statistics</Box>
        <Box width="100%" flexDirection="column">
          {assetsArray.map((asset) => (
            <PortoflioAsset key={asset.id} asset={asset} />
          ))}
        </Box>
      </Box>
      <SelectCoins
        marketsArray={marketsArray}
        handleAddAsset={handleAddAsset}
      />
    </div>
  );
}
