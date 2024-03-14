import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Authors02 from "./pages/Authors";
import CreateItem from "./pages/CreateItem";
import EditProfile from "./pages/EditProfile";
import Explore01 from "./pages/Explore";
import Home01 from "./pages/Home";
import ItemDetails from "./pages/ItemDetails";
import { ethers } from "ethers";
import "./App.css";

const { ethereum } = window;

function App() {
  const [account, setCurrentAccount] = useState(null);
  const [loding, setLoading] = useState(false);


  const connectWallet = async () => {
    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        navigator.userAgent
      );

    // Check if MetaMask is installed
    if (typeof window.ethereum !== "undefined") {
      try {
        // Check if the wallet is already connected
        if (!isMobile && !loding) {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                chainId: process.env.REACT_APP_CHAIN_ID, // Replace with your desired chain ID
              },
            ],
          });

          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });

          setCurrentAccount(accounts[0]);
          // setLoading(false);
        } else if (isMobile) {
          const accounts = await window.ethereum.request({
            method: "eth_requestAccounts",
          });
          setCurrentAccount(accounts[0]);
          // setLoading(false);
        }
      } catch (err) {
        // setLoading(false);
        // toast.error(err.message);
        console.error(err.message);
      }
    } else {
      if (isMobile) {
        // Metamask app is not installed, redirect to installation page
        window.open(
          "https://metamask.app.link/dapp/https://staking-dapp-project.vercel.app/"
        );
        return;
      } else {
        // if no window.ethereum and no window.web3, then MetaMask or Trust Wallet is not installed
        alert(
          "MetaMask or Trust Wallet is not installed. Please consider installing one of them."
        );
        return;
      }
    }
  };

  const checkIsWalletConnected = async () => {
    try {
      window.ethereum.on("accountsChanged", async function (accounts) {
        setCurrentAccount(accounts[0]);
        // setLoading(false);
      });
      window.ethereum.on("chainChanged", async (chainId) => {
        if (chainId != process.env.REACT_APP_CHAIN_ID) {
          await ethereum.request({
            method: "wallet_switchEthereumChain",
            params: [
              {
                // chainId: "0x5" //Goerli
                // chainId: "0x89", //PolygonMainnet
                // chainId: "0xaa36a7", //sepolia
                // chainId: "0x1", //Miannet
                chainId: process.env.REACT_APP_CHAIN_ID, //localHost TODO
                // chainId:"0x13881" //mumbai
                // chainId:"0x61"//bnb
              },
            ],
          });
        }
      });
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setCurrentAccount(accounts[0]);
        // setLoading(false);
      } else {
        console.log("No account Found");
        // setLoading(false);
      }
    } catch (err) {
      console.log(err.message);
      // setLoading(false);
    }
  };

  
  useEffect(() => {
    checkIsWalletConnected();
  }, [account]);

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          exact
          element={
            <Home01
            setCurrentAccount={setCurrentAccount}
              account={account}
              changeNetwork={connectWallet}
              loding={loding}
              setloding={setLoading}
            />
          }
        />
        <Route
          path="/explore"
          exact
          element={<Explore01 setCurrentAccount={setCurrentAccount} account={account} changeNetwork={connectWallet} loding={loding} setloding={setLoading} />}
        />

        <Route
          path="/item-details/:item"
          exact
          element={<ItemDetails checkIsWalletConnected={checkIsWalletConnected} account={account} changeNetwork={connectWallet} loding={loding} setloding={setLoading} />}
        />

        <Route
          path="/authors"
          exact
          element={
            <Authors02
            checkIsWalletConnected={checkIsWalletConnected}
              account={account}
              changeNetwork={connectWallet}
              loding={loding}
              setloding={setLoading}
            />
          }
        />

        {/* <Route path='/wallet-connect' exact element={<WalletConnect loding={loding} setloding={setLoading} />} /> */}

        <Route
          path="/create-item"
          exact
          element={
            <CreateItem
            checkIsWalletConnected={checkIsWalletConnected}
              account={account}
              changeNetwork={connectWallet}
              loding={loding}
              setloding={setLoading}
            />
          }
        />

        <Route
          path="/edit-profile"
          exact
          element={<EditProfile  checkIsWalletConnected={checkIsWalletConnected} account={account} changeNetwork={connectWallet} loding={loding} setloding={setLoading} />}
        />
      </Routes>
    </Router>
  );
}

export default App;
