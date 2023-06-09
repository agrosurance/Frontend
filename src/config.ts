export const defaultCacheTimeout = 3 * 60 * 1000;

export const networkConfig = {
  chainId: "0x13881", // Hardhat Chain ID
  chainName: "Polygon Mumbai Testnet",
  nativeCurrency: {
    name: "MATIC",
    symbol: "MATIC",
    decimals: 18,
  },
  rpcUrls: ["https://rpc.ankr.com/polygon_mumbai"],
};
