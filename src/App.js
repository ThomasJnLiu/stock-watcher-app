import { useState, useEffect } from "react";
import Search from "./components/Search/Search";
import StockListContainer from "./components/StockListContainer/StockListContainer";
import classes from "./App.module.css";
import { styles } from "ansi-colors";

function App() {
  const [userStockList, setUserStockList] = useState([]);
  const [seconds, setSeconds] = useState(0);

  //temp state delete later
  const [updated, setUpdated] = useState(true);

  const addStock = (stockInfo) => {
    console.log(stockInfo);
    setUserStockList((prevState) => {
      let updatedStockList = [...prevState];

      /* add duplicate checking code here */

      updatedStockList.push(stockInfo);
      return updatedStockList;
    });
  };

  useEffect(() => {
    setTimeout(() => {
      setSeconds((seconds) => seconds + 1);
      if (userStockList.length > 0) {
        // put api calls here
      }
      setUpdated((prevState) => {
        return !prevState;
      });
    }, 1000);
  }, [seconds]);

  return (
    <div className="App">
      <Search addStock={addStock} />
      <StockListContainer stockList={userStockList} />
      <p className={updated && `${classes["blink-on"]}`}>{seconds}</p>
    </div>
  );
}

export default App;
