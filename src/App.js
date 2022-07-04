import { useEffect } from "react";
// import useWebSocket from "react-use-websocket";
import "./App.css";
import OrderBook from "./components/OrderBook";

function App() {
  // const {
  //   sendMessage,
  //   sendJsonMessage,
  //   lastMessage,
  //   lastJsonMessage,
  //   readyState,
  //   getWebSocket,
  // } = useWebSocket("wss://ws.btse.com/ws/oss/futures", {
  //   onOpen: () => console.log("opened"),
  //   onClose: () => console.log("closed"),
  //   //Will attempt to reconnect on all close events, such as server shutting down
  //   shouldReconnect: (closeEvent) => true,
  //   onMessage: (e) => console.log(JSON.parse(e.data)),
  // });

  // useEffect(() => {
  //   // console.log(getWebSocket);
  //   // sendJsonMessage({
  //   //   op: "subscribe",
  //   //   args: ["update:BTCPFC"],
  //   // });
  // }, [getWebSocket, sendJsonMessage]);

  return (
    <div className="App">
      <OrderBook />
    </div>
  );
}

export default App;
