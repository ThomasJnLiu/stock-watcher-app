import { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import StockListContainer from "./components/StockListContainer/StockListContainer";
import Header from "./components/Header/Header";

import classes from "./App.module.css";
import axios from "axios";

import loadingSpinner from "./loadingSpinner.gif";
// import instance from "./firebase/instance";

function App() {
  const [userStockList, setUserStockList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  let today = new Date();
  let curTime =
    today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();

  // useEffect(() => {
  //   instance.get("/results.json").then((response) => {
  //     console.log(response.data);

  //     const databaseStocks = response.data;
  //     const loadedStocks = [];

  //     for (const key in databaseStocks) {
  //       loadedStocks.push({
  //         stockName: databaseStocks[key].stockName,
  //         stockPrice: databaseStocks[key].stockPrice,
  //         id: key,
  //       });
  //     }
  //     console.log(loadedStocks);
  //     setUserStockList(loadedStocks);
  //   });
  // }, []);
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

  // Retrieve saved user stock list from localStorage
  useEffect(() => {
    const localStorageUserStocks = JSON.parse(
      localStorage.getItem("userStocks")
    );
    console.log(localStorageUserStocks);
    setUserStockList(localStorageUserStocks);
  }, []);
  const addStock = async (stockInfo) => {
    const data = {
      stockName: stockInfo.stockName,
      stockPrice: stockInfo.stockPrice,
    };

    // add results obj to state array
    setUserStockList((prevState) => {
      let updatedStockList = [...prevState];

      // duplicate checking code
      if (
        updatedStockList.some(
          (stock) =>
            stock.stockName.description === stockInfo.stockName.description
        )
      ) {
        console.log("stock already added");
      } else {
        updatedStockList.unshift(data);
      }
      localStorage.setItem("userStocks", JSON.stringify(updatedStockList));

      return updatedStockList;
    });
  };

  const removeStock = async (stockIdToRemove) => {
    console.log(userStockList);

    setUserStockList((prevState) => {
      let updatedStockList = [...prevState];
      updatedStockList = updatedStockList.filter(
        (item) => item.stockName.description !== stockIdToRemove
      );
      localStorage.setItem("userStocks", JSON.stringify(updatedStockList));

      return updatedStockList;
    });
  };

  const updateStockPrice = (stockInfo, index) => {
    setUserStockList((prevState) => {
      let updatedStockList = [...prevState];
      updatedStockList[index].stockPrice = stockInfo.stockPrice;
      return updatedStockList;
    });
  };

  useEffect(() => {
    const updateInterval = setInterval(() => {
      console.log("updating stocks...");
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
    }, 10000);

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
