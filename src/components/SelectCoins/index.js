import React, { useState, useEffect } from "react";
import { getCoinPriceByDate } from "../../utils/coingecko";
import Box from "../../components/Box";
import Select from "../../components/Select";

import "react-datepicker/dist/react-datepicker.css";
import StyledInput from "../StyledInput";
import StyledDatePicker from "../StyledDatePicker";
import StyledButton from "../StyledButton";

export default function SelectCoins(props) {
  const [selectedCoin, setSelectedCoin] = useState(props.marketsArray?.[0]);
  const [purchasedAmount, setPurchasedAmount] = useState(1);
  const [purchasedDate, setPurchasedDate] = useState(new Date());

  useEffect(() => {
    setSelectedCoin(props.marketsArray[0]);
  }, [props.marketsArray]);

  async function handleClick() {
    const today = new Date();

    const isAmountValid =
      Number.isInteger(purchasedAmount) && purchasedAmount > 0;
    const isDateValid = purchasedDate <= today;
    if (isAmountValid && isDateValid) {
      console.log("info is valid!");
      const json = purchasedDate.toJSON();
      const coingeckoDate = json.split("T")[0].split("-").reverse().join("-");
      const purchasedPrice = await getCoinPriceByDate(
        selectedCoin.id,
        coingeckoDate,
        props.currency
      );
      const newAsset = {
        ...selectedCoin,
        purchasedAmount,
        purchasedDate,
        purchasedPrice,
      };
      props.handleAddAsset(newAsset);
    } else {
      if (!isAmountValid) {
        console.log("Purchased Amount is invalid");
      }
      if (!isDateValid) {
        console.log("Purchased Date is invalid");
      }
    }
  }

  return (
    <div>
      <Box
        width="50vw"
        height="50vh"
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        bgColor={2}
        borderRadius="5px"
        position="absolute"
        top="25%"
        left="25%"
      >
        <Box fontWeight="bold">Select Coins</Box>
        <Box width="90%" justifyContent="space-evenly">
          <Box
            bgColor={0}
            flexDirection="column"
            justifyContent="center"
            p="10px"
            borderRadius="10px"
            width="30%"
            alignItems="center"
          >
            <Box justifyContent="center">
              <img src={selectedCoin?.image} height="30px" />
            </Box>
            <Box>{selectedCoin?.name}</Box>
          </Box>
          <Box flexDirection="column" width="50%">
            <Box width="100%">
              <Select
                bgColor={0}
                value={selectedCoin?.id}
                onChange={(e) =>
                  setSelectedCoin(
                    props.marketsArray?.find(
                      (coin) => coin.id === e.target.value
                    )
                  )
                }
              >
                {props.marketsArray?.map((coin) => {
                  const selectOptionValue =
                    coin.name + " (" + coin.symbol.toUpperCase() + ")";
                  return (
                    <option key={coin.id} value={coin.id}>
                      {selectOptionValue}
                    </option>
                  );
                })}
              </Select>
            </Box>
            <Box width="100%">
              <StyledInput
                bgColor={0}
                type="number"
                onChange={(e) => setPurchasedAmount(parseInt(e.target.value))}
              />
            </Box>
            <Box width="85%">
              <StyledDatePicker
                selected={purchasedDate}
                onChange={(date) => setPurchasedDate(date)}
              />
            </Box>
          </Box>
        </Box>
        <Box width="50%" alignItems="center" justifyContent="space-evenly">
          <StyledButton onClick={() => props.handleCloseModal()}>
            Close
          </StyledButton>
          <StyledButton isPrimary={true} onClick={() => handleClick()}>
            Save and Continue
          </StyledButton>
        </Box>
      </Box>
    </div>
  );
}
