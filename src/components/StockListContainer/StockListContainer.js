import React from "react";

const StockListContainer = (props) => {
  return (
    <div>
      {props.stockList.length > 0 && (
        <ul>
          {props.stockList.map((item) => {
            return (
              <li>
                {item.stockName.description} price: {item.stockPrice}
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StockListContainer;
