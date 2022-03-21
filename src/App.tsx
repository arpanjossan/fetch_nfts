// import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
// import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
// import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
// import Button from '@mui/material/Button';

// import {
//     LedgerWalletAdapter,
//     PhantomWalletAdapter,
//     SlopeWalletAdapter,
//     SolflareWalletAdapter,
//     SolletExtensionWalletAdapter,
//     SolletWalletAdapter,    
//     TorusWalletAdapter,
// } from '@solana/wallet-adapter-wallets';
// import { clusterApiUrl, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
// import React, { Children, FC, ReactNode, useMemo, useCallback,useState } from 'react';
// import Mint from './mint';
// import ButtonAppBar from './Create';
// import BasicTextFields from './DataGather';

// export const App: FC = () => {
//     const [connect, setconnect] = useState(false);
//     const { connection } = useConnection();
// console.log(connection);
// const { publicKey, sendTransaction } = useWallet();
// console.log(publicKey,"publicKey");

// //     if(connection.commitment=="confirmed"){
// //  setconnect(true)

// //     }
//     return (
//         <div className='main-conatiner'>

//         {/* <div className='conatiner'>   
//       <h2>Juntao</h2>
//              <Context>
//             <Content />
//         </Context>
//         </div> */}
//         <div className='sub-container'>
//             <ButtonAppBar/>
// {/* <Mint/> */}
// </div>

// <div className='fields'>

// <BasicTextFields/>

// </div>

// </div>

        
//     );
// };
//     let phantomWallet: PhantomWalletAdapter 
// const Context: FC<{ children: ReactNode }> = ({ children }) => {
   
    
//     // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
//     const network = WalletAdapterNetwork.Devnet;
   
//     // You can also provide a custom RPC endpoint.
//     const endpoint = useMemo(() => clusterApiUrl(network), [network]);

//     // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
//     // Only the wallets you configure here will be compiled into your application, and only the dependencies
//     // of wallets that your users connect to will be loaded.
//     const wallets = useMemo(
//         () => [
//             phantomWallet =     new PhantomWalletAdapter(),
//             new SlopeWalletAdapter(),
//             new SolflareWalletAdapter(),
//             new TorusWalletAdapter(),
//             new LedgerWalletAdapter(),
//             new SolletWalletAdapter({ network }),
//             new SolletExtensionWalletAdapter({ network }),
//         ],
//         [network]
//     );
//    // let data = new PhantomWalletAdapter()
   
    
// //console.log(Children,wallets);

//     return (  
     
//         <ConnectionProvider endpoint={endpoint}>
//             <WalletProvider  wallets={wallets} autoConnect>
//                 <WalletModalProvider >{children}
//                 {/* <WalletDisconnectButton /> */}
//                 {/* <SendOneLamportToRandomAddress /> */}
           
//                </WalletModalProvider>
//             </WalletProvider>
//         </ConnectionProvider>
      
        
//     );
// };

// const Content: FC = () => {
   
//     // console.log(data,"////////////////");
//     // console.log(<WalletMultiButton/>);
//       phantomWallet.on('connect', () => {
//      //  let data=   phantomWallet.connect()
//         console.log(phantomWallet,"hii");
//     });
//        phantomWallet.on('disconnect', () => {
//         console.log(phantomWallet);
//     })


//     return <WalletMultiButton />;
// };

// export const SendOneLamportToRandomAddress: FC = () => {
//     const { connection } = useConnection();
//     const { publicKey, sendTransaction } = useWallet();
//  console.log(publicKey,"//////////");
 
//     const onClick = useCallback(async () => {
//         if (!publicKey) throw new WalletNotConnectedError();
//         console.log(publicKey);
//         let add= "ECi1C2rYA3ysHcUwKqecHwoToFeauzCadkEiqBdQfzLX"
//         const send = new PublicKey(add)
//         console.log(send.toBase58(),":::::::::::::");
        
//         const toAddress = Keypair.generate().publicKey;


//         console.log("New Generated Address => ", toAddress);
        
//         const transaction = new Transaction().add(
//             SystemProgram.transfer({
//                 fromPubkey: publicKey,
//                 toPubkey: send,
//                 lamports: 10000000,
//             })
//         );

//         const signature = await sendTransaction(transaction, connection);

//         await connection.confirmTransaction(signature, 'processed');
//     }, [publicKey, sendTransaction, connection]);

//     return (
//         <Button variant="contained" onClick={onClick} disabled={!publicKey}>
//             Send 1 lamport to a random address!
//         </Button>
//     );
// };

import { Connection, clusterApiUrl, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
import axios from "axios"

import React, { useEffect, useState } from "react";
import { Button } from "antd";
//Import all above libraries
export const  App = (props) => {
  const [nftData, setNftData] = useState([]);
  const [loading, setLoading] = useState(false);
//Define createConnection function here
//create a connection of devnet
const createConnection = () => {
    return new Connection(clusterApiUrl("devnet"));
};
  //Define getProvider function here
  const getProvider = () => {
    if ("solana" in window) {
    const provider = window.solana;
    console.log(provider);
    
    if (provider.isPhantom) {
        console.log(provider,"........");
        provider.connect()
      return provider;
     }
    }
  };
  //Define getAllNftData function here
  //get NFT
  const getAllNftData = async () => {
    try {
    //   if (connectData === true) {
        const connect =    createConnectionConfig(clusterApiUrl("devnet"));
        console.log(connect,"connect");
        
        const provider = getProvider();
        let ownerToken = provider.publicKey;
        console.log(ownerToken.toBase58());
        
        const result = isValidSolanaAddress(ownerToken);
        console.log("result", result);
const nfts = await getParsedNftAccountsByOwner({
          publicAddress: ownerToken,
          connection: connect,
          serialization: true,
        });
        console.log(nfts);
        // getNftTokenData()
        return nfts;
  
   
    } catch (error) {
      console.log(error);
    }
  };
  const getNftTokenData = async () => {
    try {
      let nftData:any = await getAllNftData();
      var data = Object.keys(nftData).map((key) => nftData[key]);                                                                    let arr = [];
      let n = data.length;
      for (let i = 0; i < n; i++) {
        console.log(data[i].data.uri);
        let val = await axios.get(data[i].data.uri);
        console.log(val,"vallllllllllll");
        
        arr.push(val);
      }
      return arr;
    } catch (error) {
      console.log(error);
    }
  };    
useEffect(() => {
    async function data() {
      let res = await getAllNftData();
      setNftData(res);
      setLoading(true);
    }
    data();
  }, []);
return (
    <>
          <section className="nft mt-2 my-5">
            <div className="container">
              <div className="row text-center">
                <div className="col-12">
                  <h4 className="title">NFT</h4>
                </div>
                <Button onClick={getProvider }>CONNECT</Button>
                <Button onClick={getNftTokenData }>GET</Button>

              </div>
              <div className="row  d-flex justify-content-center">
                {loading ? (
                  <>
                  {console.log(nftData,"//////////")
                  }
                    {nftData &&
                      nftData.length > 0 &&
                      nftData.map((val, ind) => {
                          console.log(val.data.uri,"vallll");
                          
                        return (
                          <div className="col-4 mt-3" key={ind}>
                            <div className="cart text-center">
                              <div className="img mt-4 pt-3">
                                <img src={val.data.image} alt="loading..." />
                                <p className="mt-1">{val.data.name}</p>
                                <h6 className=" mt-2">
                                  {val.data.description}
                                </h6>
                              </div>
                            </div>
                          </div>
                        );
                      })}
                  </>
                ) : (
                  <>
                    <p className="text-center">loading...</p>
                  </>
                )}
              </div>
            </div>
          </section>
    </>
  );
};