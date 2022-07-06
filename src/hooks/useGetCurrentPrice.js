import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";
import usePrevious from "./usePrevious";

const useGetCurrentPrice = () => {
  const [currentPrice, setCurrentPrice] = useState(null);
  const previousPrice = usePrevious(currentPrice);
  const { sendJsonMessage, getWebSocket } = useWebSocket(
    "wss://ws.btse.com/ws/futures",
    {
      onOpen: () => console.log("opened"),
      onClose: () => console.log("closed"),
      shouldReconnect: () => true,
      onMessage: (e) => messageHandler(JSON.parse(e.data)),
    }
  );

  const messageHandler = (data) => {
    // console.log(data);
    if (data.topic === "tradeHistoryApi") {
      // console.log(data.data);
      setCurrentPrice(data.data[0].price);
    }
  };

  useEffect(() => {
    sendJsonMessage({
      op: "subscribe",
      args: ["tradeHistoryApi:BTCPFC"],
    });
  }, [getWebSocket, sendJsonMessage]);

  return {
    currentPrice,
    previousPrice,
  };
};

export default useGetCurrentPrice;
