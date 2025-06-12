# PumpFun Sniping Bot

A sniping bot built on the Solana blockchain to snipe tokens created from Pump.fun. This bot leverages Solana's fast transaction speeds and Web3.js for seamless integration with the blockchain.

## Features

- **Token Sniping**: Automatically detects and snipes newly created tokens on Pump.fun
- **High Performance**: Optimized for low latency and fast execution
- **Customizable**: Easily configurable for different token sniping strategies
- **Secure**: Uses private keys securely with environment variables

## Prerequisites

Before running the bot, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)
- A Solana wallet with sufficient funds for transactions

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/yourusername/pumpfun-sniping-bot.git
   cd pumpfun-sniping-bot
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and add your environment variables:

   ```env
   # Solana Configuration
   PRIVATE_KEY=your_solana_private_key_here
   RPC_URL=https://api.mainnet-beta.solana.com
   
   # Bot Configuration
   SLIPPAGE_TOLERANCE=5
   MAX_BUY_AMOUNT=0.1
   MIN_LIQUIDITY=1000
   
   # PumpFun Configuration
   PUMPFUN_API_KEY=your_pumpfun_api_key
   ```

## Configuration

Edit the `config.json` file to customize your sniping strategy:

```json
{
  "slippageTolerance": 5,
  "maxBuyAmount": 0.1,
  "minLiquidity": 1000,
  "gasPrice": "auto",
  "priorityFee": 0.001
}
```

## Usage

To start the bot, run:

```bash
npm run start
```

Or for development mode:

```bash
npm run dev
```

The bot will connect to the Solana blockchain and begin monitoring Pump.fun for new token launches.

## Scripts

- `npm run start` - Start the production bot
- `npm run dev` - Start the bot in development mode with hot reload
- `npm run test` - Run test suite
- `npm run build` - Build the project for production

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `PRIVATE_KEY` | Your Solana wallet private key | Yes |
| `RPC_URL` | Solana RPC endpoint URL | Yes |
| `SLIPPAGE_TOLERANCE` | Maximum slippage percentage | No (default: 5) |
| `MAX_BUY_AMOUNT` | Maximum SOL amount per transaction | No (default: 0.1) |
| `MIN_LIQUIDITY` | Minimum liquidity requirement | No (default: 1000) |
| `PUMPFUN_API_KEY` | PumpFun API key for monitoring | Yes |

## Dependencies

This project uses the following libraries:

- **[@solana/web3.js](https://www.npmjs.com/package/@solana/web3.js)** - Solana JavaScript API
- **[axios](https://www.npmjs.com/package/axios)** - HTTP client for API requests
- **[bs58](https://www.npmjs.com/package/bs58)** - Base58 encoding/decoding
- **[dotenv](https://www.npmjs.com/package/dotenv)** - Environment variable management
- **[ws](https://www.npmjs.com/package/ws)** - WebSocket library

## Project Structure

```
pumpfun-sniping-bot/
├── src/
│   ├── bot/
│   │   ├── sniping.js
│   │   └── monitor.js
│   ├── utils/
│   │   ├── solana.js
│   │   └── helpers.js
│   ├── config/
│   │   └── settings.js
│   └── index.js
├── tests/
├── .env.example
├── config.json
├── package.json
└── README.md
```

## Security

- Never share your private keys
- Use environment variables for sensitive data
- Consider using a dedicated wallet for bot operations
- Test on devnet before using on mainnet

## Troubleshooting

### Common Issues

1. **Connection Issues**
   - Check your RPC URL is correct
   - Ensure you have a stable internet connection
   - Verify your API keys are valid

2. **Transaction Failures**
   - Ensure sufficient SOL balance for transactions and fees
   - Adjust slippage tolerance if needed
   - Check if the token is still available

3. **Permission Errors**
   - Verify your private key format is correct
   - Ensure wallet has sufficient permissions

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Disclaimer

⚠️ **Important Notice**: This bot is for educational purposes only. Use it responsibly and at your own risk. 

- Cryptocurrency trading involves substantial risk of loss
- Past performance does not guarantee future results
- The developers are not responsible for any financial losses or damages
- Always test on devnet before using real funds
- Comply with all applicable laws and regulations in your jurisdiction
- Sniping strategies may violate some platform terms of service

## Support

If you encounter any issues or have questions:

1. Check the [Issues](https://github.com/yourusername/pumpfun-sniping-bot/issues) page
2. Create a new issue with detailed information
3. Join our [Discord community](https://discord.gg/your-server) for real-time support

---

**⭐ If this project helped you, please consider giving it a star!**