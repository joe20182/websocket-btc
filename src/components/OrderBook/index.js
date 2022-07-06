import { useEffect, useState, useMemo } from "react";
import "./index.css";
import useGetQuote from "../../hooks/useGetQuotes";
import { addComma } from "../../utils/format";
import CurrentPrice from "./CurrentPrice";

// mapping quotes which have been displayed before
const sellQuotesShowed = new Set();
const buyQuotesShowed = new Set();
const getSellQuoteClass = (price) => {
  let classes = "order-row quote-bar sell-quote";
  if (!sellQuotesShowed.has(price)) classes += " flash-red";
  return classes;
};
const getBuyQuoteClass = (price) => {
  let classes = "order-row quote-bar buy-quote";
  if (!buyQuotesShowed.has(price)) classes += " flash-green";
  return classes;
};

const getSizeClass = (data) => {
  let classes = "order-col";
  if (data.trend === "up") classes += " flash-red";
  else if (data.trend === "down") classes += " flash-green";
  return classes;
};

const OrderBook = () => {
  const { sellQuotes, buyQuotes } = useGetQuote();
  const [totalSellSizeArr, setTotalSellSizeArr] = useState([]);
  const [totalBuySizeArr, setTotalBuySizeArr] = useState([]);

  const displayedSellQuotes = useMemo(
    () =>
      sellQuotes
        .filter((item) => item.size !== "0")
        .slice(0, 8)
        .sort((a, b) => b.price - a.price),
    [sellQuotes]
  );

  const displayedBuyQuotes = useMemo(
    () =>
      buyQuotes
        .filter((item) => item.size !== "0")
        .slice(0, 8)
        .sort((a, b) => b.price - a.price),
    [buyQuotes]
  );

  useEffect(() => {
    const totalArr = [];

    for (let i = displayedSellQuotes.length - 1; i >= 0; i--) {
      // caculate total size
      totalArr[i] =
        i === displayedSellQuotes.length - 1
          ? +displayedSellQuotes[i].size
          : totalArr[i + 1] + +displayedSellQuotes[i].size;
      // see if the price showed before
      sellQuotesShowed.add(displayedSellQuotes[i].price);
    }
    setTotalSellSizeArr(totalArr);
  }, [displayedSellQuotes]);

  useEffect(() => {
    const totalArr = [];

    displayedBuyQuotes.forEach((item, i) => {
      // caculate total size
      totalArr[i] = i === 0 ? +item.size : totalArr[i - 1] + +item.size;
      // see if the price showed before
      buyQuotesShowed.add(item.price);
    });
    setTotalBuySizeArr(totalArr);
  }, [displayedBuyQuotes]);

  const getSellWidthPercentage = (value) => {
    const p = Math.ceil((value / totalSellSizeArr[0]) * 100);
    return { width: `${p}%` };
  };

  const getBuyWidthPercentage = (value) => {
    const p = Math.ceil(
      (value / totalBuySizeArr[totalBuySizeArr.length - 1]) * 100
    );
    return { width: `${p}%` };
  };

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
        <div className={getSellQuoteClass(data.price)} key={data.price}>
          <div className="order-col sell-text">{addComma(data.price)}</div>
          <div className={getSizeClass(data)}>{addComma(data.size)}</div>
          <div className="order-col">
            {addComma(totalSellSizeArr[i])}
            <div
              className="percentage-bar"
              style={getSellWidthPercentage(totalSellSizeArr[i])}
            />
          </div>
        </div>
      ))}
      {/* current price */}
      <CurrentPrice />
      {/* buy */}
      {displayedBuyQuotes.map((data, i) => (
        <div className={getBuyQuoteClass(data.price)} key={data.price}>
          <div className="order-col buy-text">{addComma(data.price)}</div>
          <div className={getSizeClass(data)}>{addComma(data.size)}</div>
          <div className="order-col">
            {addComma(totalBuySizeArr[i])}
            <div
              className="percentage-bar"
              style={getBuyWidthPercentage(totalBuySizeArr[i])}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default OrderBook;
