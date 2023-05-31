import React, { useEffect, useState } from 'react';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import heroSliderData from '../assets/fake-data/data-slider';
import Slider from '../components/slider/Slider';
import liveAuctionData from '../assets/fake-data/data-live-auction';
import LiveAuction from '../components/layouts/LiveAuction';
import TopSeller from '../components/layouts/TopSeller';
import topSellerData from '../assets/fake-data/data-top-seller'
import TodayPicks from '../components/layouts/TodayPicks';
import todayPickData from '../assets/fake-data/data-today-pick';
import PopularCollection from '../components/layouts/PopularCollection';
import popularCollectionData from '../assets/fake-data/data-popular-collection';
import Create from '../components/layouts/Create';
import Expolore from './Explore'
import marketPlaceAddress from "../contractsData/MarketPlace-address.json";
import marketplaceAbi from  "../contractsData/MarketPlace.json"
import NFTAbi from "../contractsData/NFT.json"
import NFTAddress from "../contractsData/NFT-address.json"
import { ethers } from 'ethers';


const SetTransactionSigner = ()=>{
    //Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()
    const marketplace = new ethers.Contract(marketPlaceAddress.address, marketplaceAbi.abi, signer)
    return marketplace
  }

const SetNFTContract = ()=>{
    //Get provider from Metamask
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    // Set signer
    const signer = provider.getSigner()
    const nftcontract = new ethers.Contract(NFTAddress.address,NFTAbi.abi,signer)
    return nftcontract
  }
  
  const { ethereum } = window;

const Home01 = () => {
    const [loding,setloding] = useState(false)
    const [Items, setItems]= useState([])
  
 
    
const getCollection = async()=>{
    const getListing = await SetTransactionSigner().getListing();
    
        console.log("getListing",getListing);
        // for (let i=0; i<getNftId.length; i++){
        //    const auction = await SetTransactionSigner()?.isAuction(data.productId,getNftId[i])
        //    console.log("this is nft ", auction)
        //     const time = await SetTransactionSigner()?.getLastTime(data.productId,getNftId[i])
        //     const temp = Number(time)
        //   const getNFTs = await SetTransactionSigner()?.listing(data.productId,getNftId[i])
        //   const tokenuri = await SetNFTContract()?.tokenURI(getNftId[i]);
          
        //   if(tokenuri.slice(tokenuri.length - 4) == "json") {  
        //     const response = await fetch(tokenuri)
        //     const metadata = await response.json()
            
         
        //     if (!getNFTs.sale) {         
        //       items.push({
        //         auction: auction,
        //         time: temp,
        //         totalPrice: getNFTs.price,
        //         seller: getNFTs.seller,
        //         startTime:getNFTs.startTime,
        //         endTime: getNFTs.endTime,
        //         cancelListing: getNFTs.cancelListing,
        //         sale: getNFTs.sale,
        //         listed: getNFTs.listed,
        //         TokenId: getNftId[i],
        //         nftContract: data.productId,
        //         tokenUri: metadata?.image,
        //         description: metadata?.description,
        //         name: metadata?.name,
        //         attributes:metadata?.attributes
        //       })
        //   } 
          
        //   }else {
        //     const link =  `https://ipfs.io/ipfs/${tokenuri.slice(tokenuri.length - 46)}`;
        //     const response = await fetch(link)
        //     console.log("++++++++++",response)
        //     const metadata = await response?.json()  
        //   if (!getNFTs.sale) {         
        //       items.push({
        //         auction: auction,
        //         time: temp,
        //         totalPrice: getNFTs.price,
        //         seller: getNFTs.seller,
        //         startTime:getNFTs.startTime,
        //         endTime: getNFTs.endTime,
        //         cancelListing: getNFTs.cancelListing,
        //         sale: getNFTs.sale,
        //         listed: getNFTs.listed,
        //         TokenId: getNftId[i],
        //         nftContract: data.productId,
        //         tokenUri: metadata?.image,
        //         description: metadata?.description,
        //         name: metadata?.name,
        //         attributes:metadata?.attributes
        //       })
        //   } 
        // }
        // }
        // console.log("Items",Items);
        // setItems(items)   
        // setloding(true);

        }   
    
    console.log("mny nft ",Items)
        useEffect(()=>{
        // if(!loding)  {
        getCollection();
        // }     
        },[])




    return (
        <div className='home-1'>
            <Header />
            <Slider data={heroSliderData} />
            <LiveAuction data={liveAuctionData} />
            <TopSeller data={topSellerData} />
            <TodayPicks data={todayPickData} />
            <PopularCollection data={popularCollectionData} />
            <Create />
            <Footer />
        </div>
    );
}

export default Home01;
