require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config();

/** @type import('hardhat/config').HardhatUserConfig */
module.exports = {
  solidity: {
    version: "0.8.26",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200,
      },
      evmVersion: "cancun",
      viaIR: true,
    },
  },
  networks: {
    amoy: {
      url: process.env.NEXT_PUBLIC_RPC_URL || "https://rpc-amoy.polygon.technology",
      accounts: process.env.PRIV_KEY ? [process.env.PRIV_KEY] : [],
    },
  },
};
