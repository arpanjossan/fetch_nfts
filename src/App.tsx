import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import Button from '@mui/material/Button';
import { Buffer } from 'buffer';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,    
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Keypair, LAMPORTS_PER_SOL, PublicKey, SystemProgram, Transaction,sendAndConfirmTransaction,TransactionInstruction  } from '@solana/web3.js';
import React, { Children, FC, ReactNode, useMemo, useCallback,useState } from 'react';
import Mint from './mint';
import ButtonAppBar from './Create';
import BasicTextFields from './DataGather';
import { Connection } from '@solana/web3.js';
import {useEffect} from 'react'
import * as anchor from '@project-serum/anchor';

export const App: FC = () => {
    const [connect, setconnect] = useState(false);
    const { connection } = useConnection();
console.log(connection);
const { publicKey, sendTransaction } = useWallet();
console.log(publicKey,"publicKey");

//     if(connection.commitment=="confirmed"){
//  setconnect(true)

//     }
    return (
        <div className='main-conatiner'>

        {/* <div className='conatiner'>   
      <h2>Juntao</h2> */}
             <Context>
            <Content />
        </Context>
        {/* </div> */}
        {/* <div className='sub-container'>
            <ButtonAppBar/>
<Mint/>
</div> */}

{/* <div className='fields'>

<BasicTextFields/>

</div> */}

</div>

        
    );
};
    let phantomWallet: PhantomWalletAdapter 
const Context: FC<{ children: ReactNode }> = ({ children }) => {
   
    
    // The network can be set to 'devnet', 'testnet', or 'mainnet-beta'.
    const network = WalletAdapterNetwork.Devnet;
   
    // You can also provide a custom RPC endpoint.
    const endpoint = useMemo(() => clusterApiUrl(network), [network]);

    // @solana/wallet-adapter-wallets includes all the adapters but supports tree shaking and lazy loading --
    // Only the wallets you configure here will be compiled into your application, and only the dependencies
    // of wallets that your users connect to will be loaded.
    const wallets = useMemo(
        () => [
            phantomWallet =     new PhantomWalletAdapter(),
            new SlopeWalletAdapter(),
            new SolflareWalletAdapter(),
            new TorusWalletAdapter(),
            new LedgerWalletAdapter(),
            new SolletWalletAdapter({ network }),
            new SolletExtensionWalletAdapter({ network }),
        ],
        [network]
    );
   // let data = new PhantomWalletAdapter()
   
    
//console.log(Children,wallets);

    return (  
        <ConnectionProvider endpoint="https://api.devnet.solana.com">
            <WalletProvider  wallets={wallets} >
                <WalletModalProvider >
<Kam/>
                {/* <WalletDisconnectButton /> */}
                {/* <SendOneLamportToRandomAddress /> */}
               </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
      
        
    );
};

const Content: FC = () => {
   
    // console.log(data,"////////////////");
    // console.log(<WalletMultiButton/>);
      phantomWallet.on('connect', () => {
     //  let data=   phantomWallet.connect()
        console.log(phantomWallet,"hii");
    });
       phantomWallet.on('disconnect', () => {
        console.log(phantomWallet);
    })


    return <WalletMultiButton />;
};

export const SendOneLamportToRandomAddress: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();
 console.log(publicKey,"//////////");
 
    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();
        console.log(publicKey);
        let add= "ECi1C2rYA3ysHcUwKqecHwoToFeauzCadkEiqBdQfzLX"
        const send = new PublicKey(add)
        console.log(send.toBase58(),":::::::::::::");
        
        const toAddress = Keypair.generate().publicKey;


        console.log("New Generated Address => ", toAddress);
        
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: send,
                lamports: 10000000,
            })
        );

        const signature = await sendTransaction(transaction, connection);

        await connection.confirmTransaction(signature, 'processed');
    }, [publicKey, sendTransaction, connection]);

    return (
        <Button variant="contained" onClick={onClick} disabled={!publicKey}>
            Send 1 lamport to a random address!
        </Button>
    );
};
import {
  Program, Provider, web3 ,BN
} from '@project-serum/anchor';
import idl from './idl.json';
import { Int } from '@solana/buffer-layout';
import * as bs58 from "bs58";
function Kam() {

//   useEffect(() => {
     
//     const fetch =async()=>{
//           const provider = await getProvider()
// console.log("alert");

//     }
//   fetch();
  
//   }, [])
  

  const { SystemProgram, Keypair } = web3;
  /* create an account  */
  const baseAccount = Keypair.generate();
  console.log(baseAccount,">>>>>>>>");
  
  const opts = {
    preflightCommitment: "processed"
  }
    const programID = new PublicKey(idl.metadata.address);

  const [value, setValue] = useState(null);
  const wallet = useWallet();

  async function getProvider() {
    /* create the provider and return it to the caller */
    /* network set to local network for now */
    // const network = "http://127.0.0.1:8899";
    const network = " https://api.devnet.solana.com";

   
    const connection = new Connection(network, opts.preflightCommitment);

    const provider = new Provider(
      connection, wallet, opts.preflightCommitment,
    );
    return provider;
  }
       

  async function createCounter() {    


   

  alert(">>>>")
  // let keypair = Keypair.generate();
  // while(!keypair.publicKey.toBase58().startsWith("arpanjossan")) {
  //   keypair = Keypair.generate();
  //   console.log(keypair,"inner>>");

  // }
  // console.log(keypair,"keypair//////////>>");
  

  //   const provider = await getProvider()
  //   console.log(provider.wallet.publicKey.toBase58(),"PROVIDER");
    
  //   /* create the program interface combining the idl, program ID, and provider */
  //   const program = new Program(idl, programID, provider);
  //   try {
  //     /* interact with the program via rpc */
  //     let amount   = new BN(6);
  //     await program.rpc.create({
  //       accounts: {
  //         baseAccount: baseAccount.publicKey,
  //         user: provider.wallet.publicKey,
  //         systemProgram: SystemProgram.programId,
  //       },
  //       signers: [baseAccount]
  //     });

  //     const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
  //     console.log('account: ', account);
  //     setValue(account.count.toString());  
  //   } catch (err) {  
  //     console.log("Transaction error: ", err);
  //   }
  }

  async function increment() {
    // const provider = await getProvider();
    // console.log(provider.wallet.publicKey.toBase58(),"PROVIDER---");

    // const program = new Program(idl, programID, provider);
    // await program.rpc.increment({
    //   accounts: {
    //     baseAccount: baseAccount.publicKey
    //   }
    // });

    // const account = await program.account.baseAccount.fetch(baseAccount.publicKey);
    // console.log('account: ', account);
    // setValue(account.count.toString());
  let  connection = new Connection(' https://api.devnet.solana.com', 'confirmed');
    const donator2 =Keypair.fromSecretKey(
      bs58.decode("4tuQjd1M2c5pB3P3u8qLyadm6ZPAVGtjcAbEya1ucoGfXtQoEf2JaKCAtLvFkJYdBUixXRg8HFywDAJtnT9MkQpq")
    );
    const donator = Keypair.fromSecretKey(
      bs58.decode("3v5fGdscVMsQsQSwg2SKtuMsvcDWmJ27FLwQLZidkcrDtBekaCaCpSVzYLyWbZYrxERewiu5UBegjU39AARCninr")
    );
    const owner = Keypair.generate();
   let programId = new PublicKey("4Y8PGKfY7q5hxDA17h6UHk5eACo6k9idy1chiHb7HKsp")

   var name = new TextEncoder().encode("arpan");
   const [listAccount, bump] = await PublicKey.findProgramAddress(
      ['todolist', owner.publicKey.toBytes(),name ],
      programId
    );
    const instruction2 = new TransactionInstruction({
      keys: [{pubkey:donator.publicKey , isSigner: false, isWritable: true}, {pubkey: donator2.publicKey, isSigner: false, isWritable: true}, {pubkey: listAccount, isSigner: false, isWritable: true}],
      programId,
      data: depositInstruction(), // All instructions are hellos
    });
    await sendAndConfirmTransaction(
      connection,
      new Transaction().add(instruction2),
      [donator],
    );
  } 

  function depositInstruction(): Buffer {
    const dataLayout = BufferLayout.struct([
      BufferLayout.u8('A'),BufferLayout.u8('B')
    ],
    );
  
    const data = Buffer.alloc(dataLayout.span);
    dataLayout.encode({
      A: 2,
      B: 1
    }, data);
  // console.log('data:------->', data )
    return data;
  }
async function deposit() {


  //  let keypair = Keypair.generate();
  // while(!keypair.publicKey.toBase58().startsWith("Arpan")) {
  //   keypair = Keypair.generate();
  //   console.log(keypair,"inner>>");

  // }
  // console.log(keypair,"keypair//////////>>");
//   // alert(">>>>>")
  const remainingAccounts=[];
  const provider = await getProvider()
  console.log(provider.connection,"PROVIDER");
  
  // /* create the program interface combining the idl, program ID, and provider */
  const program = new Program(idl, programID, provider);
console.log(program,">>>>>>>IDL");
const myAccount = Keypair.generate();

let amount = new BN(800)

  // const donator = anchor.web3.Keypair.generate();
  const donator2 =Keypair.fromSecretKey(
    bs58.decode("4tuQjd1M2c5pB3P3u8qLyadm6ZPAVGtjcAbEya1ucoGfXtQoEf2JaKCAtLvFkJYdBUixXRg8HFywDAJtnT9MkQpq")
  );
  const donator = Keypair.fromSecretKey(
    bs58.decode("3v5fGdscVMsQsQSwg2SKtuMsvcDWmJ27FLwQLZidkcrDtBekaCaCpSVzYLyWbZYrxERewiu5UBegjU39AARCninr")
  );
  const fromKeypair =Keypair.fromSecretKey(
    bs58.decode("4tuQjd1M2c5pB3P3u8qLyadm6ZPAVGtjcAbEya1ucoGfXtQoEf2JaKCAtLvFkJYdBUixXRg8HFywDAJtnT9MkQpq")
  );
console.log(fromKeypair.publicKey.toBase58()," FROM PUBLICKEY");

 
  console.log(provider ,"Pro");
  
  // const airdropSignature = await connection.requestAirdrop(
  //   fromKeypair.publicKey,
  //  1 * LAMPORTS_PER_SOL,
  // );
  // await connection.confirmTransaction(airdropSignature);
  


  const keypair = Keypair.fromSecretKey(
    bs58.decode("3v5fGdscVMsQsQSwg2SKtuMsvcDWmJ27FLwQLZidkcrDtBekaCaCpSVzYLyWbZYrxERewiu5UBegjU39AARCninr")
  );
  console.log(donator2.publicKey.toBase58() ,"from",donator.publicKey.toBase58() ,">>>>>");

  await provider.connection.confirmTransaction(
      await provider.connection.requestAirdrop(donator.publicKey, 10000000000),
      "confirmed"
    );
    let instructions =[]
    instructions.push(SystemProgram.transfer({
      fromPubkey: keypair.publicKey,
      toPubkey: fromKeypair.publicKey,
      lamports: 1* 10**9
    }));
      // instructions.push(
      //   await program.rpc.sendDonation(amount, {
      //     accounts: {
      //         baseAccount: donator.publicKey ,
      //         user:donator2.publicKey ,
      //         systemProgram: SystemProgram.programId,
      //     },
      //     signers: [donator], 
      //   }));

      await sendTransactionWithRetryWithKeypair(
        program.provider.connection,
        keypair,
        instructions,
        [keypair],
      );
    // const tx = await program.rpc.sendDonation(amount, {
    //   accounts: {
    //       baseAccount: provider.wallet.publicKey,
    //       user: donator.publicKey,
    //       systemProgram: SystemProgram.programId,
    //   },
    //   signers: [donator],
    // });

//     const balance = await program.account.baseAccount.getAccountInfo(donator.publicKey);
//   console.log(balance,">>>>> BALANCE");

//     // expect(balance.lamports.toString()).equal("100");


// //   try {
// //       let Key = new web3.PublicKey("EJdcLY3VzzvV23VLsrbcM66fy9cJ8xuzzU2PGLE83RYS")
// //      console.log(Key.toBase58(),">>>>>KEY");
// //      let amount = new BN(1 **LAMPORTS_PER_SOL)
// //      console.log('Lamports : ', amount);
// // let instructions =[];
// //      instructions.push(
// //       await program.instruction.sendDonation(amount,{
// //         accounts: {
// //           baseAccount: baseAccount.publicKey,
// //           user: provider.wallet.publicKey,
// //           systemProgram: SystemProgram.programId,
// //         },
// //         // remainingAccounts:
// //         // remainingAccounts.length > 0 ? remainingAccounts : undefined,
// //         signers: [],
  
  
// //       }));

    
// //         await sendTransactionWithRetryWithKeypair(
// //           program.provider.connection,
// //           userKeyPair,
// //           instructions,
// //           [],
// //         )
      
// //     }
//     // await program.rpc.sendDonation(amount,{
//     //   accounts: {
//     //     baseAccount: baseAccount.publicKey,
//     //     user: provider.wallet.publicKey,
//     //     systemProgram: SystemProgram.programId,
//     //   },
//     //   // remainingAccounts:
//     //   // remainingAccounts.length > 0 ? remainingAccounts : undefined,
//     //   signers: [],


//     // })
//   // } catch (error) {
//   //  console.log('error', error);
    
//   // }
}

const sendSol = async()=>{
  const connection = new Connection(
    "https://api.devnet.solana.com",
    'confirmed',
  );
  const provider = await getProvider()
  // const fromKeypair = Keypair.generate();
  const fromKeypair =Keypair.fromSecretKey(
    bs58.decode("4tuQjd1M2c5pB3P3u8qLyadm6ZPAVGtjcAbEya1ucoGfXtQoEf2JaKCAtLvFkJYdBUixXRg8HFywDAJtnT9MkQpq")
  );
console.log(fromKeypair.publicKey.toBase58()," FROM PUBLICKEY");

 
  console.log(provider ,"Pro");
  
  // const airdropSignature = await connection.requestAirdrop(
  //   fromKeypair.publicKey,
  //  1 * LAMPORTS_PER_SOL,
  // );
  // await connection.confirmTransaction(airdropSignature);
  


  const keypair = Keypair.fromSecretKey(
    bs58.decode("3v5fGdscVMsQsQSwg2SKtuMsvcDWmJ27FLwQLZidkcrDtBekaCaCpSVzYLyWbZYrxERewiu5UBegjU39AARCninr")
  );
  console.log(keypair.publicKey.toBase58(),"PUBLICKEY");
  let keypair2= Keypair.generate();
  // const airdropSignature2 = await connection.requestAirdrop(
  //   keypair2.publicKey,
  //  2 * LAMPORTS_PER_SOL,
  // );
  // await connection.confirmTransaction(airdropSignature2);
  
  
  const transferTransaction = new Transaction()
  let instructions = [];
  instructions.push(SystemProgram.transfer({
    fromPubkey: keypair.publicKey,
    toPubkey: fromKeypair.publicKey,
    lamports: 1* 10**9
  }));

  instructions.forEach(instruction => transferTransaction.add(instruction));

await web3.sendAndConfirmTransaction(connection, transferTransaction, [keypair]);
}


  if (!wallet.connected) {
    /* If the user's wallet is not connected, display connect wallet button. */
    return (
      <div style={{ display: 'flex', justifyContent: 'center', marginTop:'100px' }}>
        <WalletMultiButton />
      </div>
    )
  } else {
    return (
      <div className="App">
        <div>
          {
            !value && (<button onClick={createCounter}>Create counter</button>)
          }
          {
            value && <button onClick={increment}>Increment counter</button>
          }

          {
            value && value >= Number(0) ? (
              <h2>{value}</h2>
            ) : (
              <h3>Please create the counter.</h3>
            )
          }
          <><Button onClick={deposit }> DEPOSIT</Button></>
          <><Button onClick={sendSol }> Send SOL</Button></>
          <><Button onClick={increment }> increment</Button></>

        </div>
      </div>
    );
  }
}
// import { Connection, PublicKey } from "@solana/web3.js";
// import { Metadata } from "@metaplex-foundation/mpl-token-metadata";
// import { Connection, clusterApiUrl, LAMPORTS_PER_SOL,PublicKey } from "@solana/web3.js";
// import { getParsedNftAccountsByOwner,isValidSolanaAddress, createConnectionConfig,} from "@nfteyez/sol-rayz";
// import axios from "axios"
// import { TOKEN_PROGRAM_ID } from "@solana/spl-token";

// import React, { useEffect, useState } from "react";
// import {Layout} from 'buffer-layout';

// import { Button } from "antd";
// //Import all above libraries
// export const  App = (props) => {
//   const [nftData, setNftData] = useState([]);
//   const [loading, setLoading] = useState(false);
// //Define createConnection function here
// //create a connection of devnet
// const connection = new Connection("https://api.devnet.solana.com");

// const createConnection = () => {
//     return new Connection("https://api.devnet.solana.com");
// };

// // const abc = async () => {
// //     let mintPubkey = new PublicKey("9MwGzSyuQRqmBHqmYwE6wbP3vzRBj4WWiYxWns3rkR7A");
// //     let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);
  
// //     // const tokenmeta = await Metadata.load(connection, tokenmetaPubkey);
// //     console.log("tokenmetadadt");
// //   }
// //   abc()
//   // / (async () => {
// //   let mintPubkey = new PublicKey("HsbfzaDq3uJX5ZhpZHz13pKG1HeiYGyb4DfBS6ieVTNY");
// //   let tokenmetaPubkey = await Metadata.getPDA(mintPubkey);

// //   const tokenmeta = await Metadata.load(connection, tokenmetaPubkey);
// //   console.log(tokenmeta,"tokenmetadadt");
// // })();
//   //Define getProvider function here
//   const getProvider = () => {
//     if ("solana" in window) {
//     const provider = window.solana;
//     // console.log(provider);
    
//     if (provider.isPhantom) {
//         console.log(provider,"........");
//         provider.connect()
//       return provider;
//      }
//     }
//   };
//   //Define getAllNftData function here
//   //get NFT
// const getData =async()=>{

//   let response = await connection.getTokenAccountsByOwner(
//     new PublicKey("27kVX7JpPZ1bsrSckbR76mV6GeRqtrjoddubfg2zBpHZ"), // owner here
//     {
//       programId: TOKEN_PROGRAM_ID,
//     }
//   );
//   console.log(response,">>>RESPONSE");
  
// }


//   const getAllNftData = async () => {
//     try {
//     //   if (connectData === true) {
//         const connect =    createConnectionConfig(clusterApiUrl("devnet"));
//         // console.log(connect,"connect");
//         // let response = await connect.getTokenAccountsByOwner(
//         //   new PublicKey("27kVX7JpPZ1bsrSckbR76mV6GeRqtrjoddubfg2zBpHZ"), // owner here
//         //   {
//         //     programId: TOKEN_PROGRAM_ID,
//         //   }
//         // );
//         const provider = getProvider();
//         let ownerToken = provider.publicKey;
//         console.log(ownerToken.toBase58());
        
//         const result = isValidSolanaAddress(ownerToken);
//         console.log("result", result);
// const nfts = await getParsedNftAccountsByOwner({
//           publicAddress: ownerToken,
//           connection: connect,
//           serialization: true,
//         });
//         console.log(nfts);
//         // getNftTokenData()
//         return nfts;
  
   
//     } catch (error) {
//       console.log(error);
//     }
//   };
//   const getNftTokenData = async () => {
//     try {
//       let nftData:any = await getAllNftData();
//       var data = Object.keys(nftData).map((key) => nftData[key]);                                                                    let arr = [];
//       let n = data.length;
//       for (let i = 0; i < n; i++) {
//         console.log(data[i].data.uri);
//         let val = await axios.get(data[i].data.uri);
//         console.log(val,"vallllllllllll");
        
//         arr.push(val);
//       }
//       return arr;
//     } catch (error) {
//       console.log(error);
//     }
//   };    
// useEffect(() => {
//     async function data() {
//       let res = await getAllNftData();
//       console.log(res,"res");
      
//       setNftData(res);
//       setLoading(true);
//     }
//     data();
//   }, []);

// const fetchNfts =async()=>{
// let data = await getNftTokenData()
// console.log(data,"data");


// }


// return (
//     <>
//           <section className="nft mt-2 my-5">
//             <div className="container">
//               <div className="row text-center">
//                 <div className="col-12">
//                   <h4 className="title">NFT</h4>
//                 </div>
//                 <Button onClick={getProvider }>CONNECT</Button>
//                 <Button onClick={fetchNfts }>GET</Button>

//               </div>
//               <div className="row  d-flex justify-content-center">
//                 {loading ? (
//                   <>
//                   {console.log(nftData,"//////////")
//                   }
//                     {nftData &&
//                       nftData.length > 0 &&
//                       nftData.map((val, ind) => {
//                           console.log(val.data.uri,"vallll");
                          
//                         return (
//                           <div className="col-4 mt-3" key={ind}>
//                             <div className="cart text-center">
//                               <div className="img mt-4 pt-3">
//                                 <img src={val.data.image} alt="loading..." />
//                                 <p className="mt-1">{val.data.name}</p>
//                                 <h6 className=" mt-2">
//                                   {val.data.description}
//                                 </h6>
//                               </div>
//                             </div>
//                           </div>
//                         );
//                       })}
//                   </>
//                 ) : (
//                   <>
//                     <p className="text-center">loading...</p>
//                   </>
//                 )}
//               </div>
//             </div>
//           </section>
//     </>
//   );
// };