import React, { useEffect, useState } from "react";
import Header from "../components/header/Header";
import Footer from "../components/footer/Footer";
import heroSliderData from "../assets/fake-data/data-slider";
import Slider from "../components/slider/Slider";
import liveAuctionData from "../assets/fake-data/data-live-auction";
import LiveAuction from "../components/layouts/LiveAuction";
import TopSeller from "../components/layouts/TopSeller";
import topSellerData from "../assets/fake-data/data-top-seller";
// import TodayPicks from "../components/layouts/TodayPicks";
import todayPickData from "../assets/fake-data/data-today-pick";
import PopularCollection from "../components/layouts/PopularCollection";
import popularCollectionData from "../assets/fake-data/data-popular-collection";
import Create from "../components/layouts/Create";
import Expolore from "./Explore";
import marketPlaceAddress from "../contractsData/MarketPlace-address.json";
import marketplaceAbi from "../contractsData/MarketPlace.json";
import NFTAbi from "../contractsData/NFT.json";
import NFTAddress from "../contractsData/NFT-address.json";
import { ethers } from "ethers";
import Loader from "../components/share/Loader";

const { ethereum } = window;

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

const Home01 = ({setCurrentAccount, account, changeNetwork, loding, setloding }) => {
  // console.log("hi",changeNetwork)
  const [Items, setItems] = useState([]);

  const loadMarketplaceItems = async () => {
    console.log("sdlaldajdladlja", await SetTransactionSigner().itemCount());
    try {
      // Load all unsold items
      const itemCount = await SetTransactionSigner().itemCount();
      console.log(itemCount?.toString(), "checccccccch");
      let items = [];
      for (let i = 1; i <= itemCount; i++) {
        const item = await SetTransactionSigner().items(i);
        if (!item.sold) {
          const auction = await SetTransactionSigner().isAuction(i);
          // console.log("this is nft ", auction)
          const time = await SetTransactionSigner().getLastTime(
            item?.itemId?.toString()
          );
          const temp = Number(time?.toString());
          // get uri url from nft contract
          const uri = await SetNFTContract().tokenURI(item?.tokenId);
          console.log("sdasdadaduri",uri)
          // use uri to fetch the nft metadata stored on ipfs
          const response = await fetch(uri);
          const metadata = await response?.json();
          // get total price of item (item price + fee)
          //get Royality fees in %%%%%%%%%%
          const royality = await SetNFTContract().getRoyalityFees(item?.tokenId);
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
      setItems(items);
    } catch (error) {
      console.log(error);
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
    loadMarketplaceItems();
  }, [account]);

  console.log("Items", Items);

  return (
    <>
      {loding && <Loader />}

      <div className="home-1">
        <Header account={account} changeNetwork={changeNetwork} />
        <Slider data={heroSliderData} />
        {/* <LiveAuction data={Items} /> */}
        <Expolore account={account} changeNetwork={changeNetwork} setCurrentAccount={setCurrentAccount} loding={loding} setloding={setloding} />
        <TopSeller data={topSellerData} />
        <PopularCollection data={popularCollectionData} />
        <Create />
        <Footer />
      </div>
    </>
  );
};

export default Home01;
