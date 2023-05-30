import React, { useRef, useState, useEffect } from 'react';
import { Link, useLocation } from "react-router-dom";
import menus from "../../pages/menu";
import DarkMode from './DarkMode';
import logoheader from '../../assets/images/logo/logo.png'
import logoheader2x from '../../assets/images/logo/logo@2x.png'
import logodark from '../../assets/images/logo/logo_dark.png'
import logodark2x from '../../assets/images/logo/logo_dark@2x.png'
import imgsun from '../../assets/images/icon/sun.png'
import avt from '../../assets/images/avatar/avt-2.jpg'
import { ethers } from 'ethers';
const { ethereum } = window;


const Header = () => {
    const { pathname } = useLocation();
    const [account, setAccount] = useState(null)
    const [loading, setLoading] = useState(true)

    ethereum.on("accountsChanged", async (account) => {
        setAccount(account[0]);
        window.location.reload()
    })

    const changeNetwork = async () => {
        try {
            setLoading(true)
            if (!ethereum) throw new Error("No crypto wallet found");
            await ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{
                    chainId: "0x7A69"
                    // chainId: "0x05"
                }]
            });
            await web3Handler();
            setLoading(false)
        } catch (err) {
            setLoading(false)
            console.log(err.message);
        }
    };
    window.ethereum && ethereum.on("chainChanged", async () => {
        window.location.reload();
    });

    const checkIsWalletConnected = async () => {
        try {
            if (!ethereum) return alert("please install MetaMask");
            const accounts = await ethereum.request({ method: "eth_accounts" });
            if (accounts.length) {
                setAccount(accounts[0]);
                // Get provider from Metamask
                const provider = new ethers.providers.Web3Provider(window.ethereum)
                // Set signer
                const signer = provider.getSigner()
                // loadContracts(signer)

            } else {
                console.log("No account Found");
            }
        } catch (err) {

            throw new Error("No ethereum Object");
        }
    }

    // MetaMask Login/Connect
    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(accounts[0])
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Set signer
        const signer = provider.getSigner()


        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        })

        window.ethereum.on('accountsChanged', async function (accounts) {
            setAccount(accounts[0])
            await web3Handler()
        })
        // loadContracts(signer)
    }

    //   const loadContracts = async (signer) => {
    //     // Get deployed copies of contracts
    //     const marketplace = new ethers.Contract(MarketplaceAddress.address, MarketplaceAbi.abi, signer)
    //     setMarketplace(marketplace)
    //     const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer)
    //     setNFT(nft)
    //     setLoading(false)
    //   }






    const headerRef = useRef(null);
    useEffect(() => {
      window.addEventListener("scroll", isSticky);
      return () => {
        window.removeEventListener("scroll", isSticky);
      };
    });
    const isSticky = (e) => {
      const header = document.querySelector(".js-header");
      const scrollTop = window.scrollY;
      scrollTop >= 300
        ? header.classList.add("is-fixed")
        : header.classList.remove("is-fixed");
      scrollTop >= 400
        ? header.classList.add("is-small")
        : header.classList.remove("is-small");
    };
  
    const menuLeft = useRef(null);
    const btnToggle = useRef(null);
    const btnSearch = useRef(null);
  
    const menuToggle = () => {
      menuLeft.current.classList.toggle("active");
      btnToggle.current.classList.toggle("active");
    };
  
    const searchBtn = () => {
      btnSearch.current.classList.toggle("active");
    };
  
    const [activeIndex, setActiveIndex] = useState(null);
    const handleOnClick = (index) => {
      setActiveIndex(index);
    };

    useEffect(()=>{
        checkIsWalletConnected();
    },[])
  
      return (
          <header id="header_main" className="header_1 js-header" ref={headerRef}>
              <div className="themesflat-container">
                  <div className="row">
                      <div className="col-md-12">                              
                          <div id="site-header-inner"> 
                              <div className="wrap-box flex">
                                  <div id="site-logo" className="clearfix">
                                      <div id="site-logo-inner">
                                          <Link to="/" rel="home" className="main-logo">
                                              <img className='logo-dark'  id="logo_header" src={logodark} srcSet={`${logodark2x}`} alt="nft-gaming" />
                                              <img className='logo-light'  id="logo_header" src={logoheader} srcSet={`${logoheader2x}`} alt="nft-gaming" />
                                          </Link>
                                      </div>
                                  </div>
                                  <div className="mobile-button" ref={btnToggle} onClick={menuToggle}><span></span></div>
                                  <nav id="main-nav" className="main-nav" ref={menuLeft} >
                                      <ul id="menu-primary-menu" className="menu">
                                          {
                                              menus.map((data,index) => (
                                                  <li key={index} onClick={()=> handleOnClick(index)} className={`menu-item ${data.namesub ? 'menu-item-has-children' : '' } ${activeIndex === index ? 'active' : ''} ` }   >
                                                      <Link to={data.links}>{data.name}</Link>
                                                      {
                                                           data.namesub &&
                                                           <ul className="sub-menu" >
                                                              {
                                                                  data.namesub.map((submenu) => (
                                                                      <li key={submenu.id} className={
                                                                          pathname === submenu.links
                                                                          ? "menu-item current-item"
                                                                          : "menu-item"
                                                                      }><Link to={submenu.links}>{submenu.sub}</Link></li>
                                                                  ))
                                                              }
                                                          </ul>
                                                      }
                                                      
                                                  </li>
                                              ))
                                          }
                                      </ul>
                                  </nav>
                                  <div className="flat-search-btn flex">
                                      <div className="header-search flat-show-search" id="s1">
                                          <Link to="#" className="show-search header-search-trigger" onClick={searchBtn}>
                                              <i className="far fa-search"></i>
                                          </Link>
                                          <div className="top-search" ref={btnSearch}>
                                              <form action="#" method="get" role="search" className="search-form">
                                                  <input type="search" id="s" className="search-field" placeholder="Search..." name="s" title="Search for" required="" />
                                                  <button className="search search-submit" type="submit" title="Search">
                                                      <i className="icon-fl-search-filled"></i>
                                                  </button>
                                              </form>
                                          </div>
                                      </div>

                                      {account ? 
                                       <div className="sc-btn-top mg-r-12" id="site-header"> 
                                       <button>Account {account.slice(0,6)}</button>
                                   </div>
                                   :
                                    <button onClick={changeNetwork}>Connect with Metamask</button>
                                    }
                                     
                       <div className="admin_active" id="header_admin">
                                          <div className="header_avatar">
                                              <div className="price">
                                                  <span>2.45 <strong>ETH</strong> </span>
                                              </div>
                                              <img
                                                  className="avatar"
                                                  src={avt}
                                                  alt="avatar"
                                                  />
                                              <div className="avatar_popup mt-20">
                                                  <div className="d-flex align-items-center copy-text justify-content-between">
                                                      <span> 13b9ebda035r178... </span>
                                                      <Link to="/" className="ml-2">
                                                          <i className="fal fa-copy"></i>
                                                      </Link>
                                                  </div>
                                                  <div className="d-flex align-items-center mt-10">
                                                      <img
                                                          className="coin"
                                                          src={imgsun}
                                                          alt="/"
                                                          />
                                                      <div className="info ml-10">
                                                          <p className="text-sm font-book text-gray-400">Balance</p>
                                                          <p className="w-full text-sm font-bold text-green-500">16.58 ETH</p>
                                                      </div>
                                                  </div>
                                                  <div className="hr"></div>
                                                  <div className="links mt-20">
                                                      <Link to="#">
                                                          <i className="fab fa-accusoft"></i> <span> My items</span>
                                                      </Link>
                                                      <a className="mt-10" href="/edit-profile">
                                                          <i className="fas fa-pencil-alt"></i> <span> Edit Profile</span>
                                                      </a>
                                                      <a className="mt-10" href="/login" id="logout">
                                                          <i className="fal fa-sign-out"></i> <span> Logout</span>
                                                      </a>
                                                  </div>
                                              </div>
                                          </div>
                                      </div>
                                  </div>
                              </div> 
                          </div>
                      </div>
                  </div>
              </div>
              <DarkMode />
          </header>
      );
  }
  
  export default Header;
  