import WebSocket from "ws";
import { VersionedTransaction, Connection, Keypair, LAMPORTS_PER_SOL, PublicKey } from '@solana/web3.js';
import bs58 from "bs58"
import dotenv from "dotenv"

dotenv.config()

const connection = new Connection(
    process.env.RPC_ENDPOINT,
    'confirmed',
)
const keyPair = Keypair.fromSecretKey(bs58.decode(process.env.WPK));

async function getTokenBalance(publicKey, tokenAddress) {
    const tokenAccounts = await connection.getParsedTokenAccountsByOwner(publicKey, { mint: new PublicKey(tokenAddress) });
    const tokenAccountInfo = tokenAccounts && tokenAccounts.value[0] && tokenAccounts.value[0].account;
    if(tokenAccountInfo) {
        const tokenTokenAccount = tokenAccountInfo.data.parsed.info;
        return tokenTokenAccount.tokenAmount.uiAmount;
    }
    return 0;
}

async function buy(mint, amount=process.env.SNIPE_AMOUNT, type='buy', slippage=90, priorityFee=0.001) {
    const response = await fetch(`https://pumpportal.fun/api/trade-local`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "publicKey": keyPair.publicKey.toBase58(),                  // Your wallet public key
            "action": type,                                             // "buy" or "sell"
            "mint": mint,                                               // contract address of the token you want to trade
            "denominatedInSol": type === "buy" ? "true" : "false",      // "true" if amount is amount of SOL, "false" if amount is number of tokens
            "amount": amount,                                           // amount of SOL or tokens
            "slippage": slippage,                                       // percent slippage allowed
            "priorityFee": priorityFee,                                 // priority fee
            "pool": "pump"                                              // exchange to trade on. "pump" or "raydium"
        })
    });
    if(response.status === 200){ // successfully generated transaction
        const data = await response.arrayBuffer();
        const tx = VersionedTransaction.deserialize(new Uint8Array(data));
        tx.sign([keyPair]);
        const signature = await connection.sendTransaction(tx)
        console.log("Transaction: https://solscan.io/tx/" + signature);
        console.log('-----------------Bought-----------------');
    } else {
        console.log(response.statusText); // log error
    }
}

async function main() {

    const balance = await connection.getBalance(keyPair.publicKey)
    console.log('Sol Balance: ', balance/LAMPORTS_PER_SOL)
    // buy('2DRZ84serQjNAeUBgErhzCYyqvbnVrcM8qgYB8Czpump')
    // const tokenBalance = await getTokenBalance(keyPair.publicKey, '2DRZ84serQjNAeUBgErhzCYyqvbnVrcM8qgYB8Czpump')
    // console.log('Token Balance: ', tokenBalance)
    // buy('2DRZ84serQjNAeUBgErhzCYyqvbnVrcM8qgYB8Czpump', tokenBalance, 'sell');
    // return false

    if(balance/LAMPORTS_PER_SOL < process.env.SNIPE_AMOUNT) {
        console.log('Current balance is less than required ', process.env.SNIPE_AMOUNT)
        return false
    }
    
    const ws = new WebSocket('wss://pumpportal.fun/api/data');
    ws.on('open', function open() {
        // Subscribing to token creation events
        let payload = {
            method: "subscribeNewToken",
        }
        ws.send(JSON.stringify(payload));

        // // Subscribing to trades made by accounts
        // payload = {
        //     method: "subscribeAccountTrade",
        //     keys: ["AArPXm8JatJiuyEffuC1un2Sc835SULa4uQqDcaGpAjV"] // array of accounts to watch
        // }
        // ws.send(JSON.stringify(payload));

        // Subscribing to trades on tokens
        // payload = {
        //     method: "subscribeTokenTrade",
        //     keys: ["BNjM3GFeuayFsEZxbSG9NujrpgSTwqDEcXeSjwBipump"] // array of token CAs to watch
        // }
        // ws.send(JSON.stringify(payload));
    });

    ws.on('message', async function message(data) {
        console.log(JSON.parse(data));
        let newToken = JSON.parse(data);
        if(newToken.traderPublicKey === process.env.DEV || (newToken.name === process.env.NAME  && newToken.symbol === process.env.SYMBOL) ) {
            ws.send(JSON.stringify({
                method: "unsubscribeNewToken", 
            }));
            await buy(newToken.mint)
            console.log('-----------------Buy-----------------');
        }
    });
}

main()