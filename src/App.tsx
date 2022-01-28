import { WalletAdapterNetwork, WalletNotConnectedError } from '@solana/wallet-adapter-base';
import { ConnectionProvider, WalletProvider, useConnection, useWallet } from '@solana/wallet-adapter-react';
import { WalletModalProvider, WalletMultiButton, WalletDisconnectButton } from '@solana/wallet-adapter-react-ui';
import Button from '@mui/material/Button';
import {
    LedgerWalletAdapter,
    PhantomWalletAdapter,
    SlopeWalletAdapter,
    SolflareWalletAdapter,
    SolletExtensionWalletAdapter,
    SolletWalletAdapter,
    TorusWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { clusterApiUrl, Keypair, PublicKey, SystemProgram, Transaction } from '@solana/web3.js';
import React, { Children, FC, ReactNode, useMemo, useCallback } from 'react';

export const App: FC = () => {
    return (
        <Context>
            <Content />
        </Context>
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
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider  wallets={wallets} autoConnect>
                <WalletModalProvider >{children}
                <WalletDisconnectButton />
                <SendOneLamportToRandomAddress />
                    
                </WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
        
    );
};

const Content: FC = () => {
   
    // console.log(data,"////////////////");
    // console.log(<WalletMultiButton/>);
      phantomWallet.on('connect', () => {
       let data=   phantomWallet.connect()
        console.log(data,"hii");
    });
       phantomWallet.on('disconnect', () => {
        console.log(phantomWallet);
    })


    return <WalletMultiButton />;
};

export const SendOneLamportToRandomAddress: FC = () => {
    const { connection } = useConnection();
    const { publicKey, sendTransaction } = useWallet();

    const onClick = useCallback(async () => {
        if (!publicKey) throw new WalletNotConnectedError();
        
        const toAddress = Keypair.generate().publicKey;

        console.log("New Generated Address => ", toAddress.toBase58());
        
        const transaction = new Transaction().add(
            SystemProgram.transfer({
                fromPubkey: publicKey,
                toPubkey: toAddress,
                lamports: 1,
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
