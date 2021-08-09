import React from "react";
import classes from "./StockListCard.module.css";

const StockListCard = (props) => {
  return (
    <li className={classes["stock-list-card"]}>
      <div className={classes["basic-info"]}>
        <h2>{props.description}</h2>
        Open: {props.stockPrice.o}
        <br />
        High: {props.stockPrice.h}
        <br />
        Low: {props.stockPrice.l}
        <br />
      </div>
      <h3>Price: {props.stockPrice.c}</h3>

      <button
        onClick={() => {
          props.removeStock(props.stockName);
        }}
      >
        Remove
      </button>
    </li>
  );
};

export default StockListCard;
