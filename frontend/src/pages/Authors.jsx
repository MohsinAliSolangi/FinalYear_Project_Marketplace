import React , { useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import { Tab, Tabs, TabList, TabPanel  } from 'react-tabs';
import 'react-tabs/style/react-tabs.css';
import Header from '../components/header/Header';
import Footer from '../components/footer/Footer';
import NbftCard from './NftCard'
import avt from '../assets/images/avatar/avt-auth.jpg'
import NFTAbi from "../contractsData/NFT.json"
import NFTAddress from "../contractsData/NFT-address.json"
import marketPlaceAddress from "../contractsData/MarketPlace-address.json"
import marketplaceAbi from  "../contractsData/MarketPlace.json"
import { ethers } from 'ethers';
import { Button, Modal } from 'react-bootstrap';
import Loader from '../components/share/Loader';

const { ethereum } = window;

const SetNFTContract = () => {
  if(typeof window.ethereum !== "undefined"){
    const provider = new ethers.providers.Web3Provider(ethereum);
    const signer = provider.getSigner();
    const nftcontract = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    return nftcontract
}
else {
    const providers = process.env.REACT_APP_RPCADDRESS;
    const provider = new ethers.providers.JsonRpcProvider(providers);
    const nftcontract = new ethers.Contract(NFTAddress.address, NFTAbi.abi, provider)
    return nftcontract
}
}


  const SetTransactionSigner = () => {
    if(typeof window.ethereum !== "undefined"){
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const marketplace = new ethers.Contract(marketPlaceAddress.address, marketplaceAbi.abi, signer)
  return marketplace
    }
    else {
        const providers = process.env.REACT_APP_RPCADDRESS;
        const provider = new ethers.providers.JsonRpcProvider(providers);
         const marketplace = new ethers.Contract(marketPlaceAddress.address, marketplaceAbi.abi, provider)
  return marketplace
    }
  }
  
 
const Authors02 = ({checkIsWalletConnected, account,loding,changeNetwork ,setloding}) => {
    const [modalShow, setModalShow] = useState(false);
    const [BidModalShow, setBidModalShow] = useState(false);
    const [FixModalShow, setFixModalShow] = useState(false);
    const [price, setPrice] = useState(null)
    const [purchases, setPurchases] = useState([])
    const [time, setTime] = useState(null)
    const [chainId,setChainId] = useState()
    const [name, setName] = useState('');
    

    const loadPurchasedItems = async () => {
      try {
        const tokenCount = await SetNFTContract().tokenCount()
        let purchasedItem = [];
        for (let i = 1; i <= tokenCount; i++) {
          const ownerof = await SetNFTContract().ownerOf(i)
       if (account?.toString().toLowerCase() == ownerof.toString().toLowerCase()) {
  
            const uri = await SetNFTContract().tokenURI(i)
            // console.log("++++++++++++++++++++++uri",uri)
            // use uri to fetch the nft metadata stored on ipfs 
            const response = await fetch(uri)
            const metadata = await response.json()
            // get Royality fees 
            const royality = await SetNFTContract().getRoyalityFees(i);
            const res = Number(royality.toString()) / 100
            // define listed item object
            // console.log("&&&&&&&&",uri,res);       
          purchasedItem.push({
              nft: SetNFTContract().address,
              itemId: i,
              marketplace: SetTransactionSigner().address,
              name: metadata.name,
              description: metadata.description,
              image: metadata.image,
              Royality: res
            })
            setPurchases(purchasedItem)
          }
        }
  
      }
  
      catch (error) {
        console.log(error)
      }
    }
  
    useEffect(() => {
      loadPurchasedItems();
      checkIsWalletConnected();
     },[account])

     useEffect(() => {
      // Retrieve the stored name from local storage
      const storedName = localStorage.getItem('name');
      if (storedName) {
        setName(storedName);
      }
    }, []);

    /// this function for set username
    const handleNameChange = (event) => {
      const newName = event.target.value;
      setName(newName);
      // Store the name in local storage
      localStorage.setItem('name', newName);
    };


    // console.log("nfts",purchases);


  
  
    const [visible , setVisible] = useState(8);
    const showMoreItems = () => {
        setVisible((prevValue) => prevValue + 4);
    }

    return (
      <>
      {loding ?
      <Loader/>
      :
      <div className='authors-2'>
      <Header account={account} changeNetwork={changeNetwork}/>
      <section className="flat-title-page inner">
          <div className="overlay"></div>
          <div className="themesflat-container">
              <div className="row">
                  <div className="col-md-12">
                      <div className="page-title-heading mg-bt-12">
                          <h1 className="heading text-center">Author</h1>
                      </div>
                      <div className="breadcrumbs style2">
                          <ul>
                              <li><Link to="/">Home</Link></li>
                              <li><Link to="#">Pages</Link></li>
                              <li>Author</li>
                          </ul>
                      </div>
                  </div>
              </div>
          </div>                    
      </section>
      <section className="tf-section authors">
          <div className="themesflat-container">
              <div className="flat-tabs tab-authors">
                  <div className="author-profile flex" style={{height: "47vh"}}>
                      <div className="feature-profile">
                          <img src={avt} alt="Axies" className="avatar" />
                      </div>
                      <div className="infor-profile">
                          <span>Author Address</span>
                          {/* <h2 className="title">Trista Francis</h2> */}
                          {/* <p className="content">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum obcaecati dignissimos quae quo ad iste ipsum officiis deleniti asperiores sit.</p> */}
                          
                          {account ? 
                             <h2 className="title"> {account}  </h2>
                              :
                              <h2 className="title"> Address </h2>
                              }
                        
                          {/* <form>
                              <input type="text" className="" readOnly />
                              {account ? 
                              <button type="button" className="btn-copycode">{account.slice(0,36)}<i className="icon-fl-file-1"></i></button>
                              :
                              <button type="button" className="btn-copycode"><i className="icon-fl-file-1"></i></button>
                              }
                          </form> */}
                      </div>
                      <div className="widget-social style-3">
                          <ul>
                              <li><Link to="#"><i className="fab fa-twitter"></i></Link></li>
                              <li className="style-2"><Link to="#"><i className="fab fa-telegram-plane"></i></Link></li>
                              <li><Link to="#"><i className="fab fa-youtube"></i></Link></li>
                              <li className="mgr-none"><Link to="#"><i className="icon-fl-tik-tok-2"></i></Link></li>
                          </ul>
                          <div className="btn-profile"><Link to="/login" className="sc-button style-1 follow">Follow</Link></div>
                      </div>
                  </div>
      
                      <div style={{marginLeft: "700px"}}>
                        <h2 className="title" style={{marginTop:"25px"}}>Your NFT's</h2>
                        </div>
                      <div className="content-tab">
                          <div className="content-inner">
                              <div className="row">
                              {
                              purchases.map((item, index) => (
                                  <NbftCard loding={loding} setloding={setloding}  item={item} index={index} />
                                 ))
                              }
                              </div>
                          </div>
                      </div>
  
              </div>
          </div>
      </section>

      <Footer />
  </div>
    }
      </>
    );
}

export default Authors02;
