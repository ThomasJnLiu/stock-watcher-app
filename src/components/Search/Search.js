import React, { useState } from "react";
import axios from "axios";

import classes from "./Search.module.css";

const Search = (props) => {
  const [userInput, setUserInput] = useState();

  const searchHandler = async (event) => {
    event.preventDefault();
    if (props.isLoading) {
      return;
    }
    props.setLoading(true);
    const info = await axios.get(
      `https://finnhub.io/api/v1/search?q=${userInput}&token=c14ongv48v6st2755it0`
    );

    const price = await axios.get(
      `https://finnhub.io/api/v1/quote?symbol=${userInput}&token=c14ongv48v6st2755it0`
    );
    props.addStock({
      stockName: info.data.result[0],
      stockPrice: price.data,
    });
    props.setLoading(false);
  };
  return (
    <div className={classes["search-form"]}>
      <form>
        <input
          type="text"
          onChange={(event) => setUserInput(event.target.value)}
          placeholder="Enter a stock symbol... (ie AAPL, GME)"
          maxlength="5"
        />
        <button onClick={searchHandler}>Search</button>
      </form>
    </div>
  );
};

export default Search;
