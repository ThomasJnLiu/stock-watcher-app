import { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import StockListContainer from "./components/StockListContainer/StockListContainer";
import Header from "./components/Header/Header";

import classes from "./App.module.css";
import axios from "axios";

import loadingSpinner from "./loadingSpinner.gif";

function App() {
  const [userStockList, setUserStockList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let today = new Date();
  let curTime =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  const fetchStocks = () => {
    axios
      .get(
        `https://stock-watcher-app-edfee-default-rtdb.firebaseio.com/stocks.json`
      )
      .then((response) => {
        // console.log(response.data);
        // updateLocalStocks(response);
      });
  };

  // const updateLocalStocks = (response) => {
  //   const databaseStocks = response.data;
  //   const loadedStocks = [];

  //   for (const key in databaseStocks) {
  //     loadedStocks.push({
  //       stockName: databaseStocks[key].stockName,
  //       stockPrice: databaseStocks[key].stockPrice,
  //     });
  //   }
  //   console.log(loadedStocks);
  //   setUserStockList(loadedStocks);
  // };

  const addStock = async (stockInfo) => {
    // const response = await axios.post(
    //   "https://stock-watcher-app-edfee-default-rtdb.firebaseio.com/stocks.json",
    //   {
    //     stockName: stockInfo.stockName,
    //     stockPrice: 0,
    //   }
    // );
    setUserStockList((prevState) => {
      let updatedStockList = [...prevState];

      /* add duplicate checking code here */

      updatedStockList.push(stockInfo);

      return updatedStockList;
    });
  };

  const removeStock = async (stockSymbolToRemove) => {
    // const response = await axios.delete(
    //   "https://stock-watcher-app-edfee-default-rtdb.firebaseio.com/stocks.json",
    //   {
    //     stockName: {
    //       displaySymbol: stockSymbolToRemove,
    //     },
    //   }
    // );
    // setUserStockList([]);

    // await console.log(response);

    setUserStockList((prevState) => {
      let updatedStockList = [...prevState];
      updatedStockList = updatedStockList.filter(
        (item) => item.stockName !== stockSymbolToRemove
      );
      return updatedStockList;
    });
    console.log(userStockList);
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
    var effectId = Math.random();
    console.log("timeout set " + effectId);
    const updateInterval = setInterval(() => {
      console.log("effect id " + effectId);
      console.log("cur length " + userStockList.length);
      console.log(userStockList);
      if (userStockList.length > 0) {
        //function to query all stocks in list to update prices
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

          // get index of stock whose price has been updated
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
    }, 5000);

    // clear interval on unmount or next render, prevents multiple intervals existing at once
    return () => {
      clearInterval(updateInterval);
    };
  }, [userStockList]);

  return (
    <>
      <Header />
      <div className={classes.main}>
        <Search
          addStock={addStock}
          setLoading={setIsLoading}
          isLoading={isLoading}
        />
        last updated at: {curTime}
        {isLoading && (
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
