import React, { useState } from "react";
import axios from "axios";

const Search = (props) => {
  const [userInput, setUserInput] = useState();

  const searchHandler = async (event) => {
    event.preventDefault();
    props.setLoading(true);
    const info = await axios(
      `https://finnhub.io/api/v1/search?q=${userInput}&token=c14ongv48v6st2755it0`
    );

    const price = await axios(
      `https://finnhub.io/api/v1/quote?symbol=${userInput}&token=c14ongv48v6st2755it0`
    );
    props.addStock({
      stockName: info.data.result[0],
      stockPrice: price.data,
    });
    props.setLoading(false);
  };
  return (
    <div>
      <form>
        <input
          type="text"
          onChange={(event) => setUserInput(event.target.value)}
        />
        <button onClick={searchHandler}>Search Stocks</button>
      </form>
    </div>
  );
};

export default Search;
