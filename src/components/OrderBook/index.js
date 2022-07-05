import { useEffect, useState, useMemo } from "react";
import "./index.css";
import useGetQuote from "../../hooks/useGetQuotes";

// const displayedSellQuotes = [
//   {
//     price: "21,731.0",
//     size: "2,116",
//     total: "29,027",
//   },
// ];

// TODO: 改成用function，不然目前會落後一個render且改用state感覺也不好
const totalArr = [];

// mapping quotes which have been displayed before
const sellQuotesShowed = new Set();
const getSellQuoteClass = (price) => {
  let classes = "order-row quote-bar sell-quote";
  if (!sellQuotesShowed.has(price)) classes += " flash-red";
  return classes;
};

const getSizeClass = (data) => {
  let classes = "order-col";
  if (data.trend === "up") classes += " flash-red";
  else if (data.trend === "down") classes += " flash-green";
  return classes;
};

const OrderBook = () => {
  const { sellQuotes } = useGetQuote();
  const [totalSellSizeArr, setTotalSellSizeArr] = useState([]);

  // const displayedSellQuotes = sellQuotes.slice(0, 8);
  const displayedSellQuotes = useMemo(
    () =>
      sellQuotes
        .filter((item) => item.size !== "0")
        .slice(0, 8)
        .sort((a, b) => b.price - a.price),
    [sellQuotes]
  );

  useEffect(() => {
    // console.log(displayedSellQuotes);
    for (let i = displayedSellQuotes.length - 1; i >= 0; i--) {
      // caculate total size
      totalArr[i] =
        i === displayedSellQuotes.length - 1
          ? +displayedSellQuotes[i].size
          : totalArr[i + 1] + +displayedSellQuotes[i].size;
      setTotalSellSizeArr(totalArr);
      // see if the price showed before
      sellQuotesShowed.add(displayedSellQuotes[i].price);
    }
    // console.log(totalArr);

    // displayedSellQuotes.forEach((item, i) => {
    //   // caculate total size
    //   totalArr[i] = i === 0 ? +item.size : totalArr[i - 1] + +item.size;
    //   // see if the price showed before
    //   sellQuotesShowed.add(item.price);
    // });
  }, [displayedSellQuotes]);

  const getWidthPercentage = (value) => {
    const p = Math.ceil((value / totalSellSizeArr[0]) * 100);
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
          <div className="order-col sell-text">{data.price}</div>
          <div className={getSizeClass(data)}>{data.size}</div>
          <div className="order-col">
            {totalSellSizeArr[i]}
            <div
              className="percentage-bar"
              style={getWidthPercentage(totalSellSizeArr[i])}
            />
          </div>
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
