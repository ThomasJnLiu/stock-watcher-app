import React from "react";
import classes from "./Header.module.css";

const Header = () => {
  return (
    <header
      style={{
        display: "flex ",
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <h1>Stock Watcher</h1>
      <h2>
        <a
          href="https://github.com/ThomasJnLiu/stock-watcher-app"
          target="_blank"
          rel="noreferrer"
          style={{ color: "white" }}
        >
          Repository
        </a>
      </h2>
    </header>
  );
};

export default Header;
