import { useEffect, useState } from "react";
import useWebSocket from "react-use-websocket";

const useGetQuote = () => {
  const [sellQuotes, setSellQuotes] = useState([]);
  const [buyQuotes, setBuyQuotes] = useState([]);
  const { sendJsonMessage, getWebSocket } = useWebSocket(
    "wss://ws.btse.com/ws/oss/futures",
    {
      onOpen: () => console.log("opened"),
      onClose: () => console.log("closed"),
      shouldReconnect: () => true,
      onMessage: (e) => messageHandler(JSON.parse(e.data)),
    }
  );

  const messageHandler = (data) => {
    if (data.topic === "update:BTCPFC") {
      // console.log(data.data.asks, data.data.bids);

      // sell
      setSellQuotes((oldQuotes) => {
        const newQuotes = [...oldQuotes];
        data.data.asks.forEach((ask) => {
          const i = newQuotes.findIndex((q) => q.price === ask[0]);
          if (i >= 0) {
            // price existed -> replace
            newQuotes[i] = {
              price: ask[0],
              size: ask[1],
              trend:
                ask[1] === newQuotes[i].size
                  ? "none"
                  : ask[1] > newQuotes[i].size
                  ? "up"
                  : "down",
            };
          } else {
            // new price
            newQuotes.push({
              price: ask[0],
              size: ask[1],
              trend: "none",
            });
          }
        });
        newQuotes.sort((a, b) => a.price - b.price);
        return newQuotes;
      });

      // buy
      setBuyQuotes((oldQuotes) => {
        const newQuotes = [...oldQuotes];
        data.data.bids.forEach((bid) => {
          const i = newQuotes.findIndex((q) => q.price === bid[0]);
          if (i >= 0) {
            // price existed -> replace
            newQuotes[i] = {
              price: bid[0],
              size: bid[1],
              trend:
                bid[1] === newQuotes[i].size
                  ? "none"
                  : bid[1] > newQuotes[i].size
                  ? "up"
                  : "down",
            };
          } else {
            // new price
            newQuotes.push({
              price: bid[0],
              size: bid[1],
              trend: "none",
            });
          }
        });
        newQuotes.sort((a, b) => a.price - b.price);
        return newQuotes;
      });
    }
  };

  useEffect(() => {
    sendJsonMessage({
      op: "subscribe",
      args: ["update:BTCPFC"],
    });
  }, [getWebSocket, sendJsonMessage]);

  return {
    sellQuotes,
    buyQuotes,
  };
};

export default useGetQuote;
