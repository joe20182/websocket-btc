import { memo } from "react";
import classNames from "classnames";
import { addComma } from "../../utils/format";
import useGetCurrentPrice from "../../hooks/useGetCurrentPrice";
import ArrowImg from "./ArrowImg";

const CurrentPrice = () => {
  const { currentPrice, previousPrice } = useGetCurrentPrice();

  return (
    <h3
      className={classNames("current-price", {
        same: currentPrice === previousPrice,
        increase: currentPrice > previousPrice,
        decrease: currentPrice < previousPrice,
      })}
    >
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
