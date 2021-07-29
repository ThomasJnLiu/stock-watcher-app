import React from "react";
import classes from "./StockListContainer.module.css";

const StockListContainer = (props) => {
  return (
    <div>
      {props.stockList.length > 0 && (
        <ul>
          {props.stockList.map((item) => {
            return (
              <li>
                {item.stockName.description} price: {item.stockPrice.c}
                <br />
                high: {item.stockPrice.h}
                <br />
                low: {item.stockPrice.l}
                <br />
                open: {item.stockPrice.o}
                <button
                  onClick={() => {
                    props.removeStock(item.stockName);
                  }}
                >
                  Remove
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StockListContainer;
