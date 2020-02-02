const path = require("path");

//Hyperledger Besu Configurations
const PrivateKeyProvider = require("truffle-hdwallet-provider");
// const privateKey = "0xc87509a1c067bbde78beb793e6fa76530b6382a4c0241e5e4a9ec0a0f44dc0d3";
// const privateKey = "0xae6ae8e5ccbfb04590405997ee2d52d2b330726137b875053c36d94e974d162f"
const privateKey = "0x8f2a55949038a9610f50fb23b5883af3b4ecb3c3bb792cbcefbd1542c692be63"

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!

  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
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
    },
  }
};

// Ganache Configurations
module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // for more about customizing your Truffle configuration!
  contracts_build_directory: path.join(__dirname, "client/src/contracts"),
  networks: {
    development: {
      host: "127.0.0.1",
      port: 8545,
      network_id: "*" // Match any network id
    },
    rinkeby: {
      host: "localhost", // Connect to geth on the specified
      port: 8545,
      from: "0x3533b4D3600879B830b7837819F55B69fc3F6cdc", // default address to use for any transaction Truffle makes during migrations
      network_id: 4,
      gas: 4612388 // Gas limit used for deploys
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
    },
  }
};


