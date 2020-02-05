const path = require("path");

//Hyperledger Besu Configurations
const PrivateKeyProvider = require("@truffle/hdwallet-provider");
const privateKey = "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"
const mnemonic = "opera stage axis crystal sense table involve afford tooth hole tiny illness"


// Ganache Configurations
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "172.16.1.103",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost",
      provider: function() { 
       return new HDWalletProvider(mnemonic, 
        "rinkeby.infura.io/v3/8d9e210916494a718cd34772d760eb32");
      },
      network_id:1580604704815,
      gas: 4500000,
      gasPrice: 10000000000,
    },
    hyperledger: {
      networkCheckTimeout: 10000000,
      host: "172.16.1.102",
      port: 8545,
      network_id: "*", // Match any network id
      from: 0xfe3b557e8fb62b89f4916b721be55ceb828dbd73
    },
    quickstartWallet: {
      provider: () => new PrivateKeyProvider(privateKey, "http://172.16.1.102:8545"),
      network_id: "*"
    }
  }
};


