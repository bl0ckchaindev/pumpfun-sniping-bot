import { VersionedTransaction, Connection, Keypair } from '@solana/web3.js';
import bs58 from "bs58";
import fs from "fs";
import dotenv from "dotenv"
dotenv.config()

const web3Connection = new Connection(
    process.env.RPC_ENDPOINT,
    'confirmed',
);

async function sendLocalCreateTx(){
    const signerKeyPair = Keypair.fromSecretKey(bs58.decode(process.env.WPK));

    // Generate a random keypair for token
    const mintKeypair = Keypair.generate(); 

    // Define token metadata
    const formData = new FormData();
    const file = await fs.openAsBlob("./logo.jpg");
    const file2 = fs.createReadStream("./logo.jpg")
    console.log('log->file', file, file2)
    formData.append("file", fs.createReadStream("./logo.jpg")), // Image file
    formData.append("name", "MIZUKI"),
    formData.append("symbol", "MIZUKI"),
    formData.append("description", "Mizuki Ninja Mom with a neiro and a cat"),
    formData.append("twitter", "https://x.com/MizukiOnETH"),
    formData.append("telegram", "https://t.me/MizukiOnETH"),
    formData.append("website", "https://mizukimom.com"),
    formData.append("showName", "true");
    console.log('log->formData', formData)
    // Create IPFS metadata storage
    const metadataResponse = await fetch("https://pump.fun/api/ipfs", {
        method: "POST",
        headers: {
            "Cookie": "__cf_bm=0T9ZJqZLB0v.YHdtAYsNWgvuuWWdOSmamVdVg8sCa44-1724355916-1.0.1.1-rXTph1YqF3.qPW035pU7q33XUjnG7EGX3khEinvay3W3gCa7iiOGpi05lWN9lDtHVmYDDH6_yIHE_Vz85i0wcg"
        },
        body: formData
    }).then((response) => response.text())
    .then((result) => console.log('result----------->>>>>>', result))
    .catch((error) => console.log('error----------->>>>>>', error));

    const metadataResponseJSON = await metadataResponse.json();
    console.log('log->metadataResponseJSON', metadataResponseJSON)
    return false
    // Get the create transaction
    const response = await fetch(`https://pumpportal.fun/api/trade-local`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "publicKey": signerKeyPair.publicKey.toBase58(),
            "action": "create",
            "tokenMetadata": {
                name: 'MIZUKI',
                symbol: 'MIZUKI',
                uri: 'https://cf-ipfs.com/ipfs/QmRvmbLBHTc63Z3Bjf2z5H9WyumBVWuR5d2uAMhnCDZGLn'
            },
            "mint": mintKeypair.publicKey.toBase58(),
            "denominatedInSol": "true",
            "amount": 0.01, // dev buy of 1 SOL
            "slippage": 10, 
            "priorityFee": 0.0005,
            "pool": "pump"
        })
    });
    if(response.status === 200){ // successfully generated transaction
        const data = await response.arrayBuffer();
        const tx = VersionedTransaction.deserialize(new Uint8Array(data));
        tx.sign([mintKeypair, signerKeyPair]);
        const signature = await web3Connection.sendTransaction(tx)
        console.log("Transaction: https://solscan.io/tx/" + signature);
    } else {
        console.log(response.statusText); // log error
    }
}

sendLocalCreateTx();