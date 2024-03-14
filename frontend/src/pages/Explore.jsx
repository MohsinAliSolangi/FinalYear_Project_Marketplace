import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import TodayPicks from "../components/layouts/TodayPicks";
import todayPickData from "../assets/fake-data/data-today-pick";
import marketPlaceAddress from "../contractsData/MarketPlace-address.json";
import marketplaceAbi from "../contractsData/MarketPlace.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import { ethers } from "ethers";
const { ethereum } = window;

const SetNFTContract = () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftcontract = new ethers.Contract(
      NFTAddress.address,
      NFTAbi.abi,
      signer
    );
    return nftcontract;
  } else {
    const providers = process.env.REACT_APP_RPCADDRESS;
    const provider = new ethers.providers.JsonRpcProvider(providers);
    const nftcontract = new ethers.Contract(
      NFTAddress.address,
      NFTAbi.abi,
      provider
    );
    return nftcontract;
  }
};

const SetTransactionSigner = () => {
  if (typeof window.ethereum !== "undefined") {
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const marketplace = new ethers.Contract(
      marketPlaceAddress.address,
      marketplaceAbi.abi,
      signer
    );
    return marketplace;
  } else {
    const providers = process.env.REACT_APP_RPCADDRESS;
    const provider = new ethers.providers.JsonRpcProvider(providers);
    const marketplace = new ethers.Contract(
      marketPlaceAddress.address,
      marketplaceAbi.abi,
      provider
    );
    return marketplace;
  }
};

const Explore01 = ({
  setCurrentAccount,
  account,
  changeNetwork,
  loding,
  setloding,
}) => {
  
  // const [loding, setloding] = useState(false)
  const [Items, setItems] = useState([]);

  const loadMarketplaceItems = async () => {
    try {
      // Load all unsold items
      const itemCount = await SetTransactionSigner().itemCount();
      console.log(SetNFTContract(), "adadasada");
      let items = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await SetTransactionSigner().items(i);
        if (!item?.sold) {
          const auction = await SetTransactionSigner().isAuction(i);
          // console.log("this is nft ", auction)
          const time = await SetTransactionSigner().getLastTime(
            item?.itemId?.toString()
          );
          const temp = Number(time?.toString());
          console.log("++++++++++++++++++++++")
          // get uri url from nft contract
          const uri = await SetNFTContract().tokenURI(item?.tokenId);
          console.log("++++++++++++++++++++++uri",uri)
          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const metadata = await response?.json();
          // get total price of item (item price + fee)
          //get Royality fees in %%%%%%%%%%
          const royality = await SetNFTContract().getRoyalityFees(
            item?.tokenId
          );
          const res = Number(royality?.toString()) / 100;
          items.push({
            time: temp,
            auction: auction,
            totalPrice: item?.price,
            itemId: item?.itemId,
            seller: item?.seller,
            name: metadata?.name,
            description: metadata?.description,
            image: metadata?.image,
            Royality: res,
          });
        }
      }
      console.log(items,"itemsitemsitemsitemsitems")
      setItems(items);
    } catch (error) {
      console.log(error);
    }
  };

  const checkIsWalletConnected = async () => {
    try {
      console.log(process.env.REACT_APP_CHAIN_ID)
      window.ethereum.on("accountsChanged", async function (accounts) {
        setCurrentAccount(accounts[0]);
        // setLoading(false);
      });
      window.ethereum.on("chainChanged", async (chainId) => {
        console.log(process.env.REACT_APP_CHAIN_ID,"process.env.REACT_APP_CHAIN_ID")
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
    loadMarketplaceItems();
  }, [account]);

  // console.log("Items", Items);
  const location = useLocation();
  const currentPath = location?.pathname;

  return (
    <div>
      {currentPath === "/explore" && (
        <>
          <Header account={account} changeNetwork={changeNetwork} />
          <section className="flat-title-page inner">
            <div className="overlay"></div>
            <div className="themesflat-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="page-title-heading mg-bt-12">
                    <h1 className="heading text-center">Explore</h1>
                  </div>
                  <div className="breadcrumbs style2">
                    <ul>
                      <li>
                        <Link to="/"> Home </Link>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
        <TodayPicks loding={loding} setloding={setloding} Items={Items} />
      {currentPath === "/explore" && <Footer />}
    </div>
  );
};

export default Explore01;
