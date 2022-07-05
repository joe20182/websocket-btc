import { useEffect, useState } from "react";
import "./index.css";
import useGetQuote from "../../hooks/useGetQuotes";

// const displayedSellQuotes = [
//   {
//     price: "21,731.0",
//     size: "2,116",
//     total: "29,027",
//   },
// ];

// mapping quotes which have been displayed before
const sellQuotesShowed = new Set();

const totalArr = [];

const OrderBook = () => {
  const { sellQuotes } = useGetQuote();

  // const displayedSellQuotes = sellQuotes.slice(0, 8);
  const displayedSellQuotes = sellQuotes
    .filter((item) => item.size !== "0")
    .slice(0, 8);

  useEffect(() => {
    // console.log(displayedSellQuotes);
    displayedSellQuotes.forEach((item, i) => {
      // caculate total size
      totalArr[i] = i === 0 ? +item.size : totalArr[i - 1] + +item.size;
      // see if the price showed before
      sellQuotesShowed.add(item.price);
    });
  }, [displayedSellQuotes]);

  return (
    <div className="order-book">
      {/* title */}
      <h2>Order Book</h2>
      <div className="order-row quote-td">
        <div className="order-col">Price (USD)</div>
        <div className="order-col">Size</div>
        <div className="order-col">Total</div>
      </div>
      {/* sell */}
      {displayedSellQuotes.map((data, i) => (
        <div className="order-row quote-bar sell-quote" key={data.price}>
          <div className="order-col sell-text">{data.price}</div>
          <div className="order-col">{data.size}</div>
          <div className="order-col">{totalArr[i]}</div>
        </div>
      ))}
      <h3 className="current-price">21,678.0</h3>
      {/* buy */}
      <div className="order-row quote-bar buy-quote">
        <div className="order-col buy-text">21,731.0</div>
        <div className="order-col">2,116</div>
        <div className="order-col">29,027</div>
      </div>
    </div>
  );
};

export default OrderBook;
