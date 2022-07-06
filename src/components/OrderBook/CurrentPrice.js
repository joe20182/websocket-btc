import { memo } from "react";
import { addComma } from "../../utils/format";
import useGetCurrentPrice from "../../hooks/useGetCurrentPrice";

const CurrentPrice = () => {
  const { currentPrice, previousPrice } = useGetCurrentPrice();

  return (
    <h3 className="current-price">
      {addComma(currentPrice && currentPrice.toFixed(1))} - {previousPrice}
    </h3>
  );
};

export default memo(CurrentPrice);
