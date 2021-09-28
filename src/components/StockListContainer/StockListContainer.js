import React from "react";
import StockListCard from "../StockListCard/StockListCard";

const StockListContainer = (props) => {
  return (
    <div>
      {props.stockList.length > 0 && (
        <ul>
          {props.stockList.map((item) => {
            return (
              <StockListCard
                description={item.stockName.description}
                stockPrice={item.stockPrice}
                stockName={item.stockName}
                removeStock={props.removeStock}
                key={item.stockName.description}
                id={item.stockName.description}
              />
            );
          })}
        </ul>
      )}
    </div>
  );
};

export default StockListContainer;
