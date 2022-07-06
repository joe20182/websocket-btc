import { useEffect, useState, useMemo } from "react";
import "./index.css";
import useGetQuote from "../../hooks/useGetQuotes";
import useGetCurrentPrice from "../../hooks/useGetCurrentPrice";
import { addComma } from "../../utils/format";

// const displayedSellQuotes = [
//   {
//     price: "21,731.0",
//     size: "2,116",
//     total: "29,027",
//   },
// ];

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

  const { currentPrice, previousPrice } = useGetCurrentPrice();

  useEffect(() => {
    console.log(currentPrice, previousPrice);
  }, [currentPrice, previousPrice]);

  // const displayedSellQuotes = sellQuotes.slice(0, 8);
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
    // console.log(displayedSellQuotes);
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
    // console.log(totalArr);

    // displayedSellQuotes.forEach((item, i) => {
    //   // caculate total size
    //   totalArr[i] = i === 0 ? +item.size : totalArr[i - 1] + +item.size;
    //   // see if the price showed before
    //   sellQuotesShowed.add(item.price);
    // });
  }, [displayedSellQuotes]);

  useEffect(() => {
    // console.log(displayedSellQuotes);
    const totalArr = [];
    // for (let i = displayedSellQuotes.length - 1; i >= 0; i--) {
    //   // caculate total size
    //   totalArr[i] =
    //     i === displayedSellQuotes.length - 1
    //       ? +displayedSellQuotes[i].size
    //       : totalArr[i + 1] + +displayedSellQuotes[i].size;
    //   // see if the price showed before
    //   sellQuotesShowed.add(displayedSellQuotes[i].price);
    // }
    // setTotalSellSizeArr(totalArr);
    // console.log(totalArr);

    displayedBuyQuotes.forEach((item, i) => {
      // caculate total size
      totalArr[i] = i === 0 ? +item.size : totalArr[i - 1] + +item.size;
      // see if the price showed before
      sellQuotesShowed.add(item.price);
    });
    setTotalBuySizeArr(totalArr);
  }, [displayedBuyQuotes]);

  const getSellWidthPercentage = (value) => {
    const p = Math.ceil((value / totalSellSizeArr[0]) * 100);
    // console.log(value / totalSellSizeArr[0]);
    return { width: `${p}%` };
  };

  const getBuyWidthPercentage = (value) => {
    const p = Math.ceil(
      (value / totalBuySizeArr[totalBuySizeArr.length - 1]) * 100
    );
    // console.log(value / totalSellSizeArr[0]);
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
      <h3 className="current-price">
        {addComma(currentPrice && currentPrice.toFixed(1))}
      </h3>
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
      {/* <div className="order-row quote-bar buy-quote">
        <div className="order-col buy-text">21,731.0</div>
        <div className="order-col">2,116</div>
        <div className="order-col">29,027</div>
      </div> */}
    </div>
  );
};

export default OrderBook;
