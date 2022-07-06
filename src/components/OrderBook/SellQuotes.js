import { useEffect, useState, useMemo } from "react";
import classNames from "classnames";
import { addComma } from "../../utils/format";

// memorize quotes which have been displayed before
const sellQuotesShowed = new Set();

const SellQuotes = ({ quotes }) => {
  const [totalSellSizeArr, setTotalSellSizeArr] = useState([]);

  const displayedSellQuotes = useMemo(
    () =>
      quotes
        .filter((item) => item.size !== "0")
        .slice(0, 8)
        .sort((a, b) => b.price - a.price),
    [quotes]
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

  const getSellWidthPercentage = (value) => {
    const p = Math.ceil((value / totalSellSizeArr[0]) * 100);
    return { width: `${p}%` };
  };

  return (
    <>
      {displayedSellQuotes.map((data, i) => (
        <div
          className={classNames("order-row quote-bar sell-quote", {
            "flash-red": !sellQuotesShowed.has(data.price),
          })}
          key={data.price}
        >
          <div className="order-col sell-text">{addComma(data.price)}</div>
          <div
            className={classNames("order-col", {
              "flash-red": data.trend === "up",
              "flash-green": data.trend === "down",
            })}
          >
            {addComma(data.size)}
          </div>
          <div className="order-col">
            {addComma(totalSellSizeArr[i])}
            <div
              className="percentage-bar"
              style={getSellWidthPercentage(totalSellSizeArr[i])}
            />
          </div>
        </div>
      ))}
    </>
  );
};

export default SellQuotes;
