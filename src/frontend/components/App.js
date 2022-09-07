import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import Navigation from './Navbar';
import Home from './Home.js'
import Create from './Create.js'
import MyListedItems from './MyListedItems.js'
import MyPurchases from './MyPurchases.js'
import MarketplaceAbi from '../contractsData/Marketplace.json'
import MarketplaceAddress from '../contractsData/Marketplace-address.json'
import NFTAbi from '../contractsData/NFT.json'
import NFTAddress from '../contractsData/NFT-address.json'
import { useEffect, useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'



import './App.css';

function App() {
  const [account, setAccount] = useState();
  const [nft, setNft] = useState();
  const [marketplace, setMarketplace] = useState();



  const handleAccount = async (accounts) => {
    setAccount(accounts[0]);
  };

  const web3Handler = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const nft = new ethers.Contract(NFTAddress.address, NFTAbi.abi, signer);
    const marketplace = new ethers.Contract(
      MarketplaceAddress.address,
      MarketplaceAbi.abi,
      signer
    );

    const accounts = await provider.send("eth_requestAccounts", []);

    setNft(nft);
    setMarketplace(marketplace);
    setAccount(accounts[0]);
  };

  useEffect(() => {
    web3Handler();
    window.ethereum.on("accountsChanged", handleAccount);
  }, []);



 

  return (
    <div className="App">
      <BrowserRouter>
      <Navigation  web3Handler={web3Handler} account={account}/>
      <Routes>
        <Route path="/" element={  <Home marketplace={marketplace} nft={nft}/>} />
        <Route path="/create" element={  <Create marketplace={marketplace} nft={nft} account={account}/>} />
        <Route path="/my-listed-items" element={  <MyListedItems marketplace={marketplace} nft={nft} account={account}/>} />
        <Route path="/my-purchases" element={  <MyPurchases marketplace={marketplace} nft={nft} account={account}/>} />
      
      </Routes>
      </BrowserRouter>
  

    </div>
  );
}

export default App;