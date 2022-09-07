require("@nomiclabs/hardhat-waffle");
const ALCHEMY_API_KEY = "n_EMFoOch0Dkc-QIjcNQCkfz72XUWJ4L";
const GOERLI_PRIVATE_KEY = "0d0abaaf753aa36737d298c5d2ebfeaf8bb5fffe9fd02790efb014f5b76ca91b";
module.exports = {
  solidity: "0.8.4",
  paths: {
    artifacts: "./src/backend/artifacts",
    sources: "./src/backend/contracts",
    cache: "./src/backend/cache",
    tests: "./src/backend/test"
  },
  networks: {
    goerli: {
      url: `https://eth-goerli.alchemyapi.io/v2/${ALCHEMY_API_KEY}`,
      accounts: [GOERLI_PRIVATE_KEY]
    }
  }

};
