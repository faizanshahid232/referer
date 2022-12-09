import React, { useEffect, useState } from "react";
import {
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  Row,
  Col,
  Container,
} from "reactstrap";
import Logo from "./images/titlelogo.png";
import { useWeb3React } from "@web3-react/core";
import { connectors } from "./connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";
import metamax from "./images/metamaxicon.png";
import trustwall from "./images/trustwallet.png";
import bcwall from "./images/binanceicon.png";
import { Spinner } from '@chakra-ui/react'
import spwall from "./images/safewallet.png";
import wcwall from "./images/walletconnecticon.png";
import TreasuryABI from './treasuryAbi.json';
import tpwall from "./images/tokenpocketicon.png";
import otwall from "./images/webwalleticon.png";
import "../App.css";

export default function Header() {
  const {
    library,
    account,
    active,
    deactivate,
    activate: activateNetwork,
  } = useWeb3React();
  const Web3 = require("web3");
  const [modalV, setmodalV] = useState(false);
  const [acctADDR, setacctADDR] = useState(localStorage.getItem("acct"));

  //
  const [referValid, setreferValid] = useState(null);
    
    const [refer, setRefer] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const CONTRACT_ADDRESS = '0x59a7Dc57EF280a69408a17F064721fB664ec9c31';     
    const CONTRACT_ABI = TreasuryABI;     
    const web3 = new Web3("https://bsc-dataseed.binance.org/");
    const contractInstance = new web3.eth.Contract( CONTRACT_ABI, CONTRACT_ADDRESS );  
    
    useEffect(() => {
        checkParent();
    },[account]);
    //

    const checkParent = async() => {
      var wAddress = account;
      if(wAddress) {
          await contractInstance.methods         
          .fetchUserDetails(wAddress)
          .call({}, async function (error, res) {           
              console.log(res);
              if (res.parent === "0x0000000000000000000000000000000000000000") {   
                  console.log("No parent Found:"); 
                  setreferValid(0);         
                  return 0;
              } else {
                  console.log("Parent Found: "+res.parent);
                  setreferValid(1);
                  return 1;
              }
          });
      }
  }
  //
  const loadingFunction = () => {
    return (
            <div style={{ textAlign: "center" }}>
                <div role="status">
                    
                    <span className="sr-only" style={{ color: "white" }}>Loading...</span>
                </div>
            </div>
    );
}
  let handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ referer: refer, email: email, wallet_address: account })
        };
        const response = await fetch('https://ec2-18-183-182-156.ap-northeast-1.compute.amazonaws.com/registerairdrop', requestOptions);
        const data = await response.json();
        console.log("data: "+data);
        if (data.code === 200) {
            setRefer("");
            setEmail("");
            setMessage(data.message);
            console.log("Success");
        } else {
            setMessage(data.detail);
            console.log("Some error occured: "+ data.detail);
        }
        setLoading(false);
    }  catch(err) {
        console.log(err);
    }
};
//
  const toggleModal = () => {
    setmodalV(!modalV);
  };
  const { activate } = useWeb3React();
  const setProvider = (type) => {
    window.localStorage.setItem("provider", type);
  };
  if (window.ethereum) {
    window.ethereum
      .request({
        method: "eth_chainId",
      })
      .then((res) => {
        if (res != "0x38")
          window.ethereum
            .request({
              method: "wallet_addEthereumChain",
              params: [
                {
                  chainId: process.env.REACT_APP_CHAINIDHEX,
                  chainName: "Binance Smart Chain",
                  nativeCurrency: {
                    name: "BNB",
                    symbol: "BNB",
                    decimals: 18,
                  },
                  rpcUrls: [process.env.REACT_APP_RPC],
                  blockExplorerUrls: ["https://bscscan.io/"],
                },
              ],
            })
            .then(() => {
              console.log("BSC Added");
            })
            .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
  }
  function addBscChain() {
    if (window.ethereum) {
      handleEthereum();
    } else {
      window.addEventListener("ethereum#initialized", handleEthereum, {
        once: true,
      });
      setTimeout(handleEthereum, 3000);
    }

    function handleEthereum() {
      const { ethereum } = window;
      if (ethereum) {
        console.log("Ethereum successfully detected!");
      } else {
        console.error("Ethereum not detected.");
      }
    }
    const BSC_MAINNET_PARAMS = {
      chainId: process.env.REACT_APP_CHAINIDHEX,
      chainName: "Binance Smart Chain",
      nativeCurrency: {
        name: "BNB",
        symbol: "BNB",
        decimals: 18,
      },
      rpcUrls: [process.env.REACT_APP_RPC],
      blockExplorerUrls: ["https://bscscan.io/"],
    };
    if (window.ethereum) {
      window.ethereum
        .request({
          method: "eth_chainId",
        })
        .then((res) => {
          if (res != "0x38")
            window.ethereum
              .request({
                method: "wallet_addEthereumChain",
                params: [BSC_MAINNET_PARAMS],
              })
              .then(() => {
                console.log("BSC Added");
                wallet.connect();
              })
              .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }
  }
  const changeNetwork = async (wallet) => {
    try {
      addBscChain();
      if (wallet == "Metamask") {
        localStorage.setItem("wallettype", "Metamask");
        activate(connectors.injected);
        setmodalV(!modalV);
        window.localStorage.setItem("isWalletConnected", true);
        setacctADDR(account);
      }
      if (wallet == "WalletConnect") {
        localStorage.setItem("wallettype", "WalletConnect");
        let bridge = "https://bridge.walletconnect.org";
        let qrcode = true;
        let rpc = "https://bsc-dataseed1.binance.org";
        let chainId = 56;
        const provider = new WalletConnectConnector({
          rpc: {
            56: "https://bsc-dataseed1.binance.org",
            // ...
          },
          qrcodeModalOptions: {
            mobileLinks: ["trust"],
          },
          bridge: "https://bridge.walletconnect.org",
          qrcode: true,
          chainId: 56,
          pollingInterval: 8000,
        });
        activate(provider);

        setmodalV(!modalV);
        window.localStorage.setItem("isWalletConnected", true);
        setacctADDR(account);
      }
      if (wallet == "Coinbase") {
        localStorage.setItem("wallettype", "Coinbase");
        activate(connectors.coinbaseWallet);
        setmodalV(!modalV);
        window.localStorage.setItem("isWalletConnected", true);
        setacctADDR(account);
      }
      if (wallet == "Trustwallet") {
        localStorage.setItem("wallettype", "Trustwallet");
        activate(connectors.injected);
        setmodalV(!modalV);
        window.localStorage.setItem("isWalletConnected", true);
        setacctADDR(account);
      }
      if (wallet == "Others") {
        localStorage.setItem("wallettype", "Others");
        activate(connectors.injected);
        setmodalV(!modalV);
        window.localStorage.setItem("isWalletConnected", true);
        setacctADDR(account);
      }
      if (wallet == "TokenPocket") {
        localStorage.setItem("wallettype", "TokenPocket");
        activate(connectors.injected);
        setmodalV(!modalV);
        window.localStorage.setItem("isWalletConnected", true);
        setacctADDR(account);
      }
      if (wallet == "SafePal") {
        localStorage.setItem("wallettype", "SafePal");
        let bridge = "https://bridge.walletconnect.org";
        let qrcode = true;
        let rpc = "https://bsc-dataseed1.binance.org";
        let chainId = 56;
        const provider = new WalletConnectConnector({
          rpc: {
            56: "https://bsc-dataseed1.binance.org",
            // ...
          },
          qrcodeModalOptions: {
            mobileLinks: ["trust"],
          },
          bridge: "https://bridge.walletconnect.org",
          qrcode: true,
          chainId: 56,
          pollingInterval: 8000,
        });
        activate(provider);
        setmodalV(!modalV);
        window.localStorage.setItem("isWalletConnected", true);
        setacctADDR(account);
      }
    } catch (err) {
      console.log("ERROR");
    }
  };
  useEffect(() => {
    if (account) {
      window.localStorage.setItem("isWalletConnected", true);
      console.log("!~~~~Acccount");
      window.localStorage.setItem("acct", account);
      setacctADDR(account);
    } else {
      setacctADDR("");
    }
  }, [account]);
  useEffect(() => {
    if (localStorage.getItem("isWalletConnected") == true) {
      localStorage.setItem("acct", acctADDR);
    }
  }, [acctADDR]);

  useEffect(() => {
    setacctADDR(localStorage.getItem("acct"));
    if (!active) {
      changeNetwork(localStorage.getItem("wallettype"));
      setmodalV(false);
    }
  }, []);


  const refreshState = () => {
    localStorage.setItem("provider", "");
    localStorage.setItem("acct", "");
    localStorage.setItem("isWalletConnected", false);
    localStorage.setItem("wallettype", "");
    setMessage("");
    setreferValid(null);
    setacctADDR("");
    deactivate();
  };

  //to not round values while showing balance
  function noround(val, x) {
    if (!val) return 0;
    var float = parseFloat(val).toFixed(18);
    var num = float.toString();
    var n = num.slice(0, num.indexOf(".") + (x + 1));
    return n;
  }
  return (
    <>
    <Container className="headcont">
    
      <Row md={12} style={{ background: "#0F1016"}}>
      <Col md={12} xs={12} sm={12} style={{ marginTop: "20px", marginBottom: "20px", display: "flex", flexDirection: "column", alignItems: "center" }}>
          <div
            style={{ display: "flex", flexDirection: "column", alignContent: "center",  marginTop: "10px", marginLeft: "10px" }}
          >
            <img src={Logo} alt="" height="40px" />
          </div>
        </Col>
      </Row>
      <Row style={{ marginTop: "20px" }}>
        <Col md={2} xs={2} sm={2}></Col>
        <Col style={{ background: "#25252f",padding: "20px", borderRadius: "20px", display: "flex", flexDirection: "column", alignItems: "center" }} md={8} xs={8} sm={8}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
            <div>
              {localStorage.getItem("acct") ? (
                <div
                  style={{ textAlign: "right", float: "right", width: "100%" }}
                  // sgjshs
                >
                  <div className="usraccmod">
                    Wallet :{" "}
                    {acctADDR
                      ? acctADDR.substring(0, 4) +
                        "...." +
                        acctADDR.substring(acctADDR.length - 3)
                      : ""}
                  </div>
                </div>
              ) : (
                ""
              )}
            </div>

            <div>
              {localStorage.getItem("acct") ? (
                <Button
                  style={{
                    float: "right",
                    "margin-right": "10px",
                    border: "1px solid rgb(105, 105, 174)",
                    "background-color": "rgb(61 61 115)",
                    fontSize: "12px",
                    marginTop: "16px",
                    cursor: "pointer",
                    fontWeight: 600,
                  }}
                  onClick={() => {
                    refreshState();
                    console.log("ACCOUT AFTER", account);
                  }}
                >
                  Disconnect
                </Button>
              ) : (
                <Button
                  className="connectbutton"
                  style={{
                    float: "right",
                    "margin-right": "10px",
                    border: "1px solid rgb(105, 105, 174)",
                    "background-color": "rgb(61 61 115)",
                    fontSize: "13px",
                    marginTop: "16px",
                    fontWeight: 600,
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    setmodalV(true);
                  }}
                >
                  CONNECT WALLET
                </Button>
              )}
            </div>
            <div style={{  marginTop: "20px" }}>
              {
                referValid == 1 ? (
                  <h3 style={{ color: "#c4d2fa" }}>ACCESS DENIED</h3>
                  ) : null
              }
            </div>
            <div>
              {
                referValid == 0 ? (
                  <>
                    <form onSubmit={handleSubmit}>
                          <div style={{ display: "flex", flexDirection: "column" }}>
                              <input 
                              value={refer}
                              type="text" 
                              id="refer_code" 
                              onChange={(e) => setRefer(e.target.value)}
                              style={{ color: "#c4d2fa", background: "#383855", borderRadius: "5px", border: "0px" }}
                              className='p-2' placeholder="Enter your refer code" required />
                              <input 
                              value={email}
                              type="email" 
                              id="email" 
                              onChange={(e) => setEmail(e.target.value)}
                              style={{ color: "#c4d2fa", background: "#383855", borderRadius: "5px", border: "0px" }}
                              className='p-2 mt-4' placeholder="Enter your email" required />
                              <button type="submit" style={{ marginBottom: "20px", color: "#c4d2fa", background: "#383855", borderRadius: "5px", border: "0px" }} className='text-white px-6 py-2 mt-4'>Submit</button>
                          </div>
                      </form>
                
                </>
                ) : null
              }
            </div>
          </div>
        </Col>
      </Row>
      <Row style={{  marginTop: "20px" }}>
        <Col style={{  display: "flex", flexDirection: "column", alignItems: "center" }}>
          <h3 style={{ color: "#c4d2fa" }} className='text-center mt-4'>{loading ? loadingFunction() : message}</h3>
        </Col>
      </Row>
      <Modal
        isOpen={modalV}
        toggle={toggleModal}
        size="sm"
        backdrop="static"
        backdropClassName="connectmodalbg"
      >
        <ModalHeader
          toggle={toggleModal}
          style={{
            backgroundColor: "white",
            color: "black",
            padding: "0.8rem",
          }}
        >
          <h5
            style={{
              "font-size": "14px",
              textTransform: "uppercase",
              fontWeight: "600",
              color: "#d4d4d4",
            }}
          >
            Connect Using :
          </h5>
        </ModalHeader>
        <ModalBody
          style={{ background: "rgb(69 69 139)", "border-radius": "25px" }}
        >
          <div>
            <ul className="wallet-lists">
              <li>
                <a
                  href="#"
                  onClick={() => {
                    changeNetwork("Metamask");
                    setProvider("injected");
                  }}
                >
                  Metamask <img src={metamax} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    changeNetwork("WalletConnect");
                    setProvider("walletConnect");
                  }}
                >
                  WalletConnect <img src={wcwall} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    changeNetwork("Trustwallet");
                    setProvider("injected");
                  }}
                >
                  TrustWallet <img src={trustwall} />
                </a>
              </li>
              <li>
                <a href="#">
                  Binance chain Wallet <img src={bcwall} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    changeNetwork("SafePal");
                    setProvider("injected");
                  }}
                >
                  SafePal Wallet <img src={spwall} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    changeNetwork("TokenPocket");
                    setProvider("injected");
                  }}
                >
                  TokenPocket <img src={tpwall} />
                </a>
              </li>
              <li>
                <a
                  href="#"
                  onClick={() => {
                    changeNetwork("Others");
                    setProvider("injected");
                  }}
                >
                  Other Web3 Wallets <img src={otwall} />
                </a>
              </li>
            </ul>
          </div>
        </ModalBody>
      </Modal>
      <div className="partnersect">
      <a href="https://twitter.com/egold_farm" target="_blank">
        <div>
          <div class="landingmediaicon">
            <img src="/twitter.png" />
          </div>
          <label>Twitter</label>
        </div>
      </a>
      <a href="https://t.me/egold_farm" target="_blank">
        <div>
          <div class="landingmediaicon">
            <img src="/telegram.png" />
          </div>
          <label>Telegram</label>
        </div>
      </a>
      </div>
    </Container>
    </>
  );
}
