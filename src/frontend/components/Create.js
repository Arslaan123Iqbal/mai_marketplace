import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'

import { NFTStorage } from "nft.storage";
const NFT_STORAGE_KEY =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDJkZDk4NWQyNTlEMUJkNzdiQ0E3MDA1NjcyZGNjMjc1NTZCODk2ZGUiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY2MjQ1NjcyMjIyNywibmFtZSI6ImRlbW8ifQ._Z5ComdmZGR37eMpUvId80EgGA0s6m9vMkBUD7o9mKM"
const Create = ({ marketplace, nft, account }) => {
  const [image, setImage] = useState();
  const [price, setPrice] = useState(null);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const uploadToIPFS = async () => {
    if (typeof image !== "undefined") {
      try {
        const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
        const { url } = await nftstorage.store({
          image,
          name,
          description,
        });
        console.log(url);
        mintThenList(url);
      } catch (err) {
        console.log(err);
      }
    }
  };
  const mintThenList = async (url) => {
    const id = await nft.tokenCount()
    
    // mint the nft
    await (await nft.mint(url)).wait();
    // get tokenId of the new NFT
    await (await nft.approve(marketplace.address, id)).wait();
    const listingPrice = ethers.utils.parseEther(price);

        // approve marketplace to spend nft
    await(await nft.setApprovalForAll(marketplace.address, true)).wait()
        // add nft to marketplace
      
    // list the item in marketplace
    await (await marketplace.makeItem(nft.address, id, listingPrice));
    //await (await marketplace.initialMint(id, "", "", "")).wait();
  };
  return (
    <div className="container-fluid mt-5">
         <h2>{account}</h2>
      <form
        className="form"
        onSubmit={(e) => {
          e.preventDefault();
          // createNFT();
          uploadToIPFS();
        }}
      >
        <div className="form-input">
          <input
            type="file"
            name="file"
            onChange={(event) => {
              event.preventDefault();
              setImage(event.target.files[0]);
            }}
          />
        </div>

        <div className="form-input">
          <input
            type="text"
            name="name"
            value={name}
            placeholder="Name"
            onChange={({ target }) => setName(target.value)}
          />
        </div>

        <div className="form-input">
          <input
            type="number"
            name="price"
            value={price ? price : ""}
            placeholder="Price"
            onChange={({ target }) => setPrice(target.value)}
          />
        </div>

        <div className="form-input">
          <input
            type="text"
            name="description"
            value={description}
            placeholder="Description"
            onChange={({ target }) => setDescription(target.value)}
          />
        </div>

        <div className="form-input">
          <input type="submit" name="description" value="Create NFT" />
        </div>
      </form>

 
     
    </div>
  );
}

export default Create