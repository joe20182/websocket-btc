import "./index.css";
import useGetQuote from "../../hooks/useGetQuotes";
import CurrentPrice from "./CurrentPrice";
import SellQuotes from "./SellQuotes";
import BuyQuotes from "./BuyQuotes";

const OrderBook = () => {
  const { sellQuotes, buyQuotes } = useGetQuote();

  return (
    <div className="order-book">
      {/* title */}
      <h2>Order Book</h2>
      {/* table head */}
      <div className="order-row quote-td">
        <div className="order-col">Price (USD)</div>
        <div className="order-col">Size</div>
        <div className="order-col">Total</div>
      </div>
      {/* sell */}
      <SellQuotes quotes={sellQuotes} />
      {/* current price */}
      <CurrentPrice />
      {/* buy */}
      <BuyQuotes quotes={buyQuotes} />
    </div>
  );
};

export default OrderBook;
