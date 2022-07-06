import { useEffect, useState, useMemo } from "react";
import { addComma } from "../../utils/format";
import { getSizeClass } from "../../utils/quote";

// mapping quotes which have been displayed before
const buyQuotesShowed = new Set();
const getBuyQuoteClass = (price) => {
  let classes = "order-row quote-bar buy-quote";
  if (!buyQuotesShowed.has(price)) classes += " flash-green";
  return classes;
};

const BuyQuotes = ({ quotes }) => {
  const [totalBuySizeArr, setTotalBuySizeArr] = useState([]);

  const displayedBuyQuotes = useMemo(
    () =>
      quotes
        .filter((item) => item.size !== "0")
        .slice(0, 8)
        .sort((a, b) => b.price - a.price),
    [quotes]
  );

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

  const getBuyWidthPercentage = (value) => {
    const p = Math.ceil(
      (value / totalBuySizeArr[totalBuySizeArr.length - 1]) * 100
    );
    return { width: `${p}%` };
  };

  return (
    <>
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
    </>
  );
};

export default BuyQuotes;
