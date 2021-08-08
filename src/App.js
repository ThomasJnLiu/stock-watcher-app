import { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import StockListContainer from "./components/StockListContainer/StockListContainer";
import Header from "./components/Header/Header";

import classes from "./App.module.css";
import axios from "axios";

import loadingSpinner from "./loadingSpinner.gif";

function App() {
  const [userStockList, setUserStockList] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState();
  const [loading, setIsLoading] = useState(false);
  //temp state delete later
  const [updated, setUpdated] = useState(true);

  let today = new Date();

  const addStock = (stockInfo) => {
    console.log(stockInfo);
    setUserStockList((prevState) => {
      let updatedStockList = [...prevState];

      /* add duplicate checking code here */

      updatedStockList.push(stockInfo);
      return updatedStockList;
    });
  };

  const removeStock = (stockSymbolToRemove) => {
    setUserStockList((prevState) => {
      let updatedStockList = [...prevState];
      updatedStockList = updatedStockList.filter(
        (item) => item.stockName !== stockSymbolToRemove
      );
      return updatedStockList;
    });
  };
  const updateStockPrice = (stockInfo, index) => {
    setUserStockList((prevState) => {
      let updatedStockList = [...prevState];
      updatedStockList[index].stockPrice = stockInfo.stockPrice;
      // console.log(updatedStockList);
      return updatedStockList;
    });
  };
  useEffect(() => {
    setTimeout(() => {
      setSeconds((seconds) => seconds + 1);
      if (userStockList.length > 0) {
        const searchStockPrice = async (stockQuery) => {
          const price = await axios(
            `https://finnhub.io/api/v1/quote?symbol=${stockQuery.stockName.displaySymbol}&token=c14ongv48v6st2755it0`
          );
          // new price from api being added into new object
          const updatedStockInfo = {
            stockName: stockQuery.stockName,
            stockPrice: {
              c: price.data.c,
              h: price.data.h,
              l: price.data.l,
              o: price.data.o,
            },
          };

          const indexToReplace = userStockList.findIndex(
            (stock) =>
              stock.stockName.displaySymbol ===
              updatedStockInfo.stockName.displaySymbol
          );

          updateStockPrice(updatedStockInfo, indexToReplace);
        };

        userStockList.forEach((userListStock) =>
          searchStockPrice(userListStock)
        );
      }
      setUpdated((prevState) => {
        return !prevState;
      });

      setTime(
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds()
      );
    }, 10000);
  }, [seconds]);

  return (
    <>
      <Header />

      <div className={classes.main}>
        <Search addStock={addStock} setLoading={setIsLoading} />
        last updated at:{" "}
        {loading && (
          <img
            className={classes["loading-spinner"]}
            src={loadingSpinner}
            alt="loading"
          />
        )}
        <StockListContainer
          stockList={userStockList}
          removeStock={removeStock}
        />
      </div>
    </>
  );
}

export default App;
