import React, { useState, useEffect } from "react";
import { getCoinPriceByDate } from "../../utils/coingecko";
// @ts-ignore
import Box from "../../components/Box";
// @ts-ignore
import Select from "../../components/Select";

import "react-datepicker/dist/react-datepicker.css";
// @ts-ignore
import StyledInput from "../StyledInput";
import StyledDatePicker from "../StyledDatePicker";
// @ts-ignore
import StyledButton from "../StyledButton";

export default function SelectCoins(props: any) {
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
        purchasedDate: purchasedDate.toLocaleDateString(),
        purchasedPrice,
      };
      props.handleAddAsset(newAsset);
      props.handleCloseModal();
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
        width="100vw"
        height="100vh"
        position="absolute"
        top="0%"
        opacity={0.5}
        bgColor={0}
      ></Box>
      <Box
        width="100vw"
        maxWidth="600px"
        height="100vh"
        maxHeight="300px"
        justifyContent="space-evenly"
        alignItems="center"
        flexDirection="column"
        bgColor={2}
        borderRadius="5px"
        position="absolute"
        top="25%"
        left="50%"
        ml="-300px"
      >
        <Box fontWeight="bold">Select Coins</Box>
        <Box width="90%" justifyContent="center">
          <Box
            bgColor={0}
            flexDirection="column"
            justifyContent="center"
            p="10px"
            borderRadius="10px"
            width="30%"
            maxWidth="120px"
            alignItems="center"
            mr="20px"
          >
            <Box
              justifyContent="center"
              bgColor={2}
              borderRadius="5px"
              height="50px"
              width="50px"
              alignItems="center"
            >
              <img src={selectedCoin?.image} height="25px" />
            </Box>
            <Box fontSize="13px">
              {selectedCoin?.name +
                " (" +
                selectedCoin.symbol.toUpperCase() +
                ")"}
            </Box>
          </Box>
          <Box flexDirection="column" width="50%">
            <Box width="100%">
              <Select
                height="40px"
                bgColor={0}
                value={selectedCoin?.id}
                onChange={(e: { target: { value: string } }) =>
                  setSelectedCoin(
                    props.marketsArray?.find(
                      (coin: { id: string }) => coin.id === e.target.value
                    )
                  )
                }
              >
                {props.marketsArray?.map(
                  (coin: { name: string; symbol: string; id: string }) => {
                    const selectOptionValue =
                      coin.name + " (" + coin.symbol.toUpperCase() + ")";
                    return (
                      <option key={coin.id} value={coin.id}>
                        {selectOptionValue}
                      </option>
                    );
                  }
                )}
              </Select>
            </Box>
            <Box width="100%">
              <StyledInput
                bgColor={0}
                type="number"
                defaultValue={1}
                onChange={(e: { target: { value: string } }) =>
                  setPurchasedAmount(parseInt(e.target.value))
                }
              />
            </Box>
            <Box width="89%">
              <StyledDatePicker
                bgColor={0}
                selected={purchasedDate}
                onChange={(date: any) => setPurchasedDate(date)}
              />
            </Box>
          </Box>
        </Box>
        <Box width="70%" alignItems="center" justifyContent="center">
          <StyledButton
            width="150px"
            mr="10px"
            onClick={() => props.handleCloseModal()}
          >
            Close
          </StyledButton>
          <StyledButton
            width="170px"
            isPrimary={true}
            onClick={() => handleClick()}
          >
            Save and Continue
          </StyledButton>
        </Box>
      </Box>
    </div>
  );
}
