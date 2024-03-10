import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { BrowserRouter } from "react-router-dom";
// import { configureChains, mainnet, WagmiConfig, createClient } from "wagmi";
import { publicProvider } from "wagmi/providers/public";

const root = ReactDOM.createRoot(document.getElementById("root"));
// const { provider, webSocketProvider } = configureChains(
//   [mainnet],
//   [publicProvider()]
// );
// const client = createClient({
//   autoConnect: true,
//   provider,
//   webSocketProvider,
// });

root.render(
  <>
      <App />
</>
);
