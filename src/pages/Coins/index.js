import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import BitcoinCharts from "../../components/BitcoinCharts";
import Box from "../../components/Box";
import CoinsTable from "../../components/CoinsTable";
import Select from "../../components/Select";
import { getBitcoinObject, getMarketsArray } from "../../utils/coingecko";
import { setOrder } from "../../components/NavigationBar/navigationBarSlice";

export default function Coins() {
  const [bitcoinObject, setBitcoinObject] = useState();
  const [marketsArray, setMarketsArray] = useState([]);
  const currency = useSelector((state) => state.navigationBar.currency);
  const order = useSelector((state) => state.navigationBar.order);
  const dispatch = useDispatch();

  useEffect(() => {
    const asyncSetBitcoinObject = async () => {
      const newObject = await getBitcoinObject(currency);
      setBitcoinObject(newObject);
    };
    const asyncSetMarketsArray = async () => {
      const newArray = await getMarketsArray(currency, order);
      setMarketsArray(newArray);
    };
    asyncSetMarketsArray();
    asyncSetBitcoinObject();
  }, [currency, order]);

  async function handleAddMoreMarketsArray() {
    const n = 1 + marketsArray.length / 50;
    const newArray = await getMarketsArray(currency, order, n);
    setMarketsArray([...marketsArray, ...newArray]);
    //dispatch(setMarketsArray([...marketsArray, ...newArray]));
  }

  return (
    <div>
      {bitcoinObject ? (
        <div>
          <Box
            width="100vw"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
            bgColor={1}
          >
            <Box width="90%">
              <Box justifyContent="flex-start">Your Overview</Box>
            </Box>
            <BitcoinCharts bitcoinObject={bitcoinObject} />
            <Box width="90%">
              <Box justifyContent="flex-start">Your Overview</Box>
            </Box>
            <Box width="90%">
              <Box justifyContent="flex-start">
                <Select
                  bgColor={1}
                  onChange={(e) => dispatch(setOrder(e.target.value))}
                >
                  <option key="0" value="market_cap_desc">
                    Top Market
                  </option>
                  <option key="1" value="market_cap_asc">
                    Bot Market
                  </option>
                  <option key="2" value="volume_desc">
                    Top Volume
                  </option>
                  <option key="3" value="volume_asc">
                    Bot Volume
                  </option>
                </Select>
              </Box>
            </Box>
            <CoinsTable
              marketsArray={marketsArray}
              handleAddMoreMarketsArray={handleAddMoreMarketsArray}
            />
          </Box>
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}
