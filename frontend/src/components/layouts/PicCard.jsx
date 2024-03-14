import React, { useState, Fragment, useEffect } from "react";
import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import CardModal from "../layouts/CardModal";
import marketPlaceAddress from "../../contractsData/MarketPlace-address.json";
import marketplaceAbi from "../../contractsData/MarketPlace.json";
import NFTAbi from "../../contractsData/NFT.json";
import NFTAddress from "../../contractsData/NFT-address.json";
import { ethers } from "ethers";
import { Button, Modal } from "react-bootstrap";
import Countdown from "react-countdown";
import Loader from "../share/Loader";

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

const PicCard = ({ item, index, loding, setloding }) => {

console.log(item,"dadadadad")

  const [modalShow, setModalShow] = useState(false);
  const [modal, setmodal] = useState(false);
  const [price, setPrice] = useState(null);
  const [Time, setTime] = useState(0);
  const [bid, setbid] = useState(0);
  const [bidder, setbidder] = useState(null);
  const [NowTime, setNowTime] = useState(0);
  const [account, setAccount] = useState(null);
  const [Placebid, setplacebid] = useState(false);
  const navigate = useNavigate();

  const checkIsWalletConnected = async () => {
    try {
      if (!ethereum) return alert("please install MetaMask");
      const accounts = await ethereum.request({ method: "eth_accounts" });
      if (accounts.length) {
        setAccount(accounts[0]);
      } else {
        console.log("No account Found");
      }
    } catch (err) {
      throw new Error("No ethereum Object");
    }
  };

  const getLastTime = async () => {
    try {
      const time = await SetTransactionSigner().getLastTime(
        item.itemId.toString()
      );
      const temp = Number(time.toString());
      const nowDate = Math.floor(new Date().getTime() / 1000);
      setTime(temp);
      setNowTime(nowDate);
    } catch (error) {
      console.log(error);
    }
  };

  const getHigestBid = async () => {
    try {
      let bid = await SetTransactionSigner().getHighestBid(item.itemId);
      setbid(ethers.utils.formatEther(bid));
      // console.log("this is bid", bid.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const getHigestBidder = async () => {
    try {
      let bidder = await SetTransactionSigner().getHighestBidder(item.itemId);
      setbidder(bidder);
      // console.log("this is bid", bidder.toString());
    } catch (error) {
      console.log(error);
    }
  };

  const CancelListing = async () => {
    try {
      setloding(true);
      await (await SetTransactionSigner().cancelListing(item.itemId)).wait();
      setloding(false);
      navigate("/");
    } catch (error) {
      setloding(false);
      console.log(error);
    }
  };

  const concludeAuction = async () => {
    try {
      setloding(true);
      await (
        await SetTransactionSigner().concludeAuction(item.itemId, account)
      ).wait();
      setloding(false);
      navigate("/");
    } catch (error) {
      setloding(false);
      console.log(error);
    }
  };

  const cancellAuction = async () => {
    try {
      setloding(true);
      await (
        await SetTransactionSigner().cancellAuction(item.itemId, account)
      ).wait();
      setloding(false);
      navigate("/");
    } catch (error) {
      setloding(false);
      console.log(error);
    }
  };

  const buyMarketItem = async () => {
    try {
      setloding(true);
      console.log("this is item id ", item);
      await (
        await SetTransactionSigner().purchaseItem(item, {
          value: item.totalPrice,
        })
      ).wait();
      setloding(false);
      navigate("/");
    } catch (error) {
      console.log(error);
      setloding(false);
    }
  };

  const placeBid = async () => {
    try {
      setloding(true);
      const bidding = ethers.utils.parseEther(price);
      await (
        await SetTransactionSigner().bid(item.itemId, { value: bidding })
      ).wait();
      setmodal(false);
      setloding(false);
      window.location.reload();
    } catch (error) {
      setloding(false);
      console.log(error);
    }
  };

  function getData(val) {
    setPrice(val.target.value);
  }

  useEffect(() => {
    checkIsWalletConnected();
    getLastTime();
    getHigestBid();
    getHigestBidder();
  }, [bidder, bid, account]);

  const renderer = ({ hours, minutes, seconds, completed }) => {
    if (completed) {
      // Render a completed state
      return "completed";
    } else {
      // Render a countdown
      return (
        <span>
          {hours}:{minutes}:{seconds}
        </span>
      );
    }
  };

  return (
    <>
      {/* start from here */}
      <div className="fl-item col-xl-3 col-lg-4 col-md-6 col-sm-6">
        <div
          className={`sc-card-product ${item?.feature ? "comingsoon" : ""} `}
        >
          <div className="card-media">
            <Link
              to={`/item-details/${encodeURIComponent(JSON.stringify(item))}`}
            >
              <img src={item?.image} alt="axies" />
            </Link>
          </div>
          <div className="card-title">
            <h5 className="style2">
              <Link>"{item?.name}"</Link>
            </h5>
            <div className="tags">{item?.Royality} %</div>
          </div>
          <div className="meta-info">
            <div className="author">
              <div className="info">
                <span>Owned By</span>
                <h6>{item?.seller.slice(0, 8)}</h6>
              </div>
            </div>
            {item?.auction ? (
              <div className="price">
                <span>Countdown</span>
                {<Countdown date={Time * 1000} renderer={renderer} />}
              </div>
            ) : (
              <div className="price">
                <span>ETH Price</span>
                <h5>
                  {ethers?.utils?.formatEther(item?.totalPrice?.toString())}{" "}
                </h5>
              </div>
            )}
          </div>

          {item?.auction ? (
            NowTime < Time ? (
              <div style={{ marginLeft: "80px" }} className="card-bottom">
                <button
                  onClick={() => setplacebid(true)}
                  className="sc-button style bag fl-button pri-3 no-bg"
                >
                  <span> palce Bid</span>
                </button>
              </div>
            ) : (
              <div style={{ marginLeft: "100px" }} className="card-bottom">
                <button className="sc-button style bag fl-button pri-3 no-bg">
                  <span> Auction has Ended </span>
                </button>
              </div>
            )
          ) : (
            <div style={{ marginLeft: "100px" }} className="card-bottom">
              <button
                onClick={() => buyMarketItem(item?.itemId)}
                className="sc-button style bag fl-button pri-3 no-bg"
              >
                <span> Buy </span>
              </button>
            </div>
          )}
          {/* <div style={{ marginLeft: "100px" }} className="card-bottom">
                  <button onClick={()=>buyMarketItem(item.itemId)}
                    className="sc-button style bag fl-button pri-3 no-bg">
                    <span> Buy </span>
                  </button>
                </div> */}
        </div>
      </div>

      {/* Auction Model */}
      <Modal show={Placebid} onHide={() => setplacebid(false)}>
        <Modal.Header closeButton></Modal.Header>

        <div className="modal-body space-y-20 pd-40">
          <h3>Ether Bid Amount</h3>
          <p className="text-center">
            Bid amount<span className="price color-popup"></span>
          </p>
          <input
            type="text"
            className="form-control"
            onChange={(e) => setPrice(e.target.value)}
            placeholder="00.00 ETH"
          />

          <Button
            onClick={() => placeBid(item)}
            className="btn btn-primary"
            data-toggle="modal"
            data-target="#popup_bid_success"
            data-dismiss="modal"
            aria-label="Close"
          >
            {" "}
            Place Bid{" "}
          </Button>
        </div>
      </Modal>
      <CardModal show={modalShow} onHide={() => setModalShow(false)} />
    </>
  );
};

export default PicCard;
