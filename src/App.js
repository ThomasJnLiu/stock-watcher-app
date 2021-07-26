import { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import StockListContainer from "./components/StockListContainer/StockListContainer";
import classes from "./App.module.css";
import axios from "axios";

function App() {
  const [userStockList, setUserStockList] = useState([]);
  const [seconds, setSeconds] = useState(0);
  const [time, setTime] = useState();
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
            stockPrice: price.data.c + seconds,
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
    }, 5000);
  }, [seconds]);

  return (
    <div className="App">
      <Search addStock={addStock} />
      <StockListContainer stockList={userStockList} />
      <p className={updated ? `${classes["blink-on"]}` : undefined}>
        {seconds}
      </p>
      {time}
    </div>
  );
}

export default App;
