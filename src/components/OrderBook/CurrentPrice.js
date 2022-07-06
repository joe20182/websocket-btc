import { memo } from "react";
import { addComma } from "../../utils/format";
import useGetCurrentPrice from "../../hooks/useGetCurrentPrice";
import ArrowImg from "./ArrowImg";

const CurrentPrice = () => {
  const { currentPrice, previousPrice } = useGetCurrentPrice();

  const arrowType =
    currentPrice === null
      ? ""
      : currentPrice === previousPrice
      ? "same"
      : currentPrice > previousPrice
      ? "increase"
      : "decrease";

  return (
    <h3 className={`current-price ${arrowType}`}>
      <span>
        {currentPrice === null
          ? ""
          : addComma(currentPrice && currentPrice.toFixed(1))}
      </span>
      <ArrowImg />
    </h3>
  );
};

export default memo(CurrentPrice);
