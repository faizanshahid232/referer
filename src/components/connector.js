import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import { WalletLinkConnector } from "@web3-react/walletlink-connector";

const injected = new InjectedConnector({
  supportedChainIds: [56]
});

const walletconnect = new WalletConnectConnector({ 
  rpcUrl: { 
    '56': "https://bsc-dataseed.binance.org"
  },
  supportedChainIds: [56],
  qrcode: true, 
});
const walletlink = new WalletLinkConnector({
  url: `https://bsc-dataseed1.binance.org/`,
  appName: "web3-react-demo",
  supportedChainIds: [56]
});

export const connectors = {
  injected: injected,
  walletConnect: walletconnect,
  coinbaseWallet: walletlink
};
