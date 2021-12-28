/**
 * @type import('hardhat/config').HardhatUserConfig
 */
require("dotenv").config();
require('@nomiclabs/hardhat-waffle');

module.exports = {
    solidity: {
        settings: {
            optimizer: {
                enabled: true,
                runs: 200,
            },
        },
        compilers: [
            {
                version: "0.8.0",
            },
            {
                version: "0.8.2",
            },
            {
                version: "0.6.6",
            },
            {
                version: "0.5.16",
            }
        ],
        
    },
    networks: {
        hardhat: {
            forking: {
                url: process.env.MAINNET_URL,
                blockNumber: 13874697
            },
        },
      }
};
