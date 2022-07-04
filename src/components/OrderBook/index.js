import "./index.css";

const sellArr = [
  {
    prize: "21,731.0",
    size: "2,116",
    total: "29,027",
  },
  {
    prize: "21,729.0",
    size: "1,195",
    total: "26,911",
  },
  {
    prize: "21,727.0",
    size: "836",
    total: "24,916",
  },
  {
    prize: "21,721.5",
    size: "53",
    total: "24,080",
  },
];

const OrderBook = () => {
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
      {sellArr.map((data) => (
        <div className="order-row quote-bar sell-quote" key={data.prize}>
          <div className="order-col sell-text">{data.prize}</div>
          <div className="order-col">{data.size}</div>
          <div className="order-col">{data.total}</div>
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
