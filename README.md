# Chainpilot

**Chainpilot** is an AI-powered decentralized application (dApp). It serves as an in-wallet AI assistant that answers queries about wallet activity (e.g., "Show my token transfers" or "What’s my ETH balance?") and monitors transactions in real-time. **Nodit APIs** (`/token/getTokenTransfersByAccount`, Node API, Stream API), integrating a mock MCP with LLM, and enhancing UX with a gamified onboarding, interactive dashboard, and predictive query suggestions.

---

## 🚀 Features
- **AI Assistant**: Processes natural language queries via Nodit’s MCP (mocked LLM).
- **Real-Time Updates**: Streams transaction events using Nodit’s Webhook/Stream API.[](https://developer.nodit.io/reference/how-to-use-stream)
- **Wallet Insights**: Fetches token transfers and ETH balances with Nodit’s Web3 Data API and Node API.[](https://developer.nodit.io/docs/building-a-simple-token-explorer-using-web3-data-apis)
- **Multi-Chain Ready**: Supports Ethereum, with plans for Aptos and XRPL.
- **Enhanced UX**: Gamified onboarding, interactive transaction dashboard, and query suggestions.

---

## 🎯 Wavehack/Buildathon Alignment
This submission addresses Wave 2 feedback:
- **Supported Nodit APIs**: Uses `/token/getTokenTransfersByAccount` instead of the invalid `getTransactionHistoryByAccount`.[](https://developer.nodit.io/docs/building-a-simple-token-explorer-using-web3-data-apis)
- **Deep Integration**: Leverages MCP, Web3 Data API, Node API, and Stream API for a fundamental use case.
- **UX Improvements**: Adds onboarding, dashboard, and query suggestions for accessibility and engagement.

---

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion, Chart.js
- **Wallet**: MetaMask
- **Nodit Features**:
  - **MCP**: Mock LLM for query processing
  - **Web3 Data API**: `/token/getTokenTransfersByAccount`
  - **Node API**: `eth_getBalance`
  - **Stream API**: Real-time transaction monitoring
- **Blockchains**: Ethereum (future: Aptos, XRPL)

---

## 📋 Prerequisites
- **Node.js**: v16+
- **npm**: v8+
- **Nodit API Key**: Obtain at [nodit.io](https://nodit.io).
- **MetaMask**: Installed in browser.

---

## ⚙️ Installation
1. **Clone the Repository**:
```bash
   git clone https://github.com/valortin/chainpilot.git
   cd chainpilot
```

2. **Install Dependencies**:
   ```bash
   npm install
   ```

3. **Configure Nodit API Key**:
   Replace `YOUR_NODIT_API_KEY` in `src/services/noditService.ts` with your key.

4. **Run the App**:
```bash
   npm start
```
   Open [http://localhost:3000](http://localhost:3000).

---

## 📂 Project Structure
```
chainpilot/
├── src/
│   ├── components/
│   │   ├── ChatWindow.tsx          # Chat interface
│   │   ├── InputBox.tsx            # Query input with suggestions
│   │   ├── Navbar.tsx              # Navigation
│   │   ├── WalletSidebar.tsx       # Wallet and chain selection
│   │   ├── OnboardingModal.tsx     # Gamified onboarding
│   │   ├── TransactionDashboard.tsx # Interactive chart
│   ├── services/
│   │   ├── noditService.ts         # Nodit API/Stream logic
│   │   ├── walletService.ts        # MetaMask connection
│   ├── types/
│   │   ├── noditTypes.ts           # API response types
│   ├── App.tsx                     # Main component
│   ├── index.tsx                   # Entry point
│   ├── index.css                   # Tailwind styles
├── tailwind.config.js              # Tailwind config
├── package.json                    # Dependencies
├── README.md                       # This file
```

---

## 🎨 UX Enhancements
- **Onboarding Modal**: Gamified tutorial to guide new users.
- **Transaction Dashboard**: Interactive Chart.js visualizations of token transfers.
- **Query Suggestions**: Predictive dropdown for common queries.
- **Accessibility**: Keyboard navigation and screen reader support.

---

## 🔗 Nodit Integration
1. **MCP**: Mock LLM processes queries like “Show token transfers” or “Most profitable token”.
2. **Web3 Data API**: Fetches token transfers via `/token/getTokenTransfersByAccount`.[](https://developer.nodit.io/docs/building-a-simple-token-explorer-using-web3-data-apis)
3. **Node API**: Retrieves ETH balance with `eth_getBalance`.
4. **Stream API**: Monitors transactions in real-time.[](https://developer.nodit.io/reference/how-to-use-stream)

---

## 🚧 Future Enhancements
- **Full MCP**: Integrate Claude for advanced query processing.
- **Cross-Chain**: Add Aptos/XRPL support and asset bridging.
- **Community Hub**: Share anonymized wallet insights via IPFS.
- **Predictions**: Add token price trend analysis.

---

## 🌟 Unique Advantages
- **Natural Language**: Simplifies Web3 with AI-driven queries.
- **Real-Time**: Streams transaction updates for proactive insights.
- **Accessible UX**: Gamified onboarding and visualizations lower barriers.

---

## 📜 License
MIT License. See [LICENSE](LICENSE).

## 🙌 Acknowledgments
- **Nodit**: For robust APIs and documentation.[](https://nodit.io)
- **Wavehack/Buildathon**: For inspiring innovation.
- **React, TypeScript, Chart.js**: For modern frontend tools.
```

Replace `YOUR_NODIT_API_KEY` and deploy via Vercel/Netlify. For issues, open a GitHub issue at [valortin](https://github.com/valortin/chainpilot).
```

---

**Supported APIs**: 

`getTransactionHistoryByAccount` with `/token/getTokenTransfersByAccount`, ensuring all API calls are valid per Nodit’s documentation.[](https://developer.nodit.io/docs/building-a-simple-token-explorer-using-web3-data-apis)
- **Deeper Nodit Integration**: Added Stream API for real-time transaction monitoring and mocked MCP for query processing, with plans for full LLM integration.[](https://developer.nodit.io/reference/how-to-use-stream)
- **UX Improvements**: Introduced gamified onboarding, an interactive dashboard, and query suggestions to enhance accessibility and engagement.
- **Fundamental Use Case**: Chainpilot’s AI assistant leverages Nodit’s APIs to provide wallet insights and real-time updates, aligning with the core Nodit use case.
- **Noticeable Progress**: The new features (dashboard, Stream API, onboarding) build significantly on Wave 2, addressing the limited progress concern.

---

### Instructions for Testing
1. **Set Up Nodit API Key**:
   - Sign up at [nodit.io](https://nodit.io) and replace `YOUR_NODIT_API_KEY` in `noditService.ts`.
2. **Run the App**:
   - `npm start` and open [http://localhost:3000](http://localhost:3000).
   - Connect MetaMask, complete onboarding, and test queries like “Show my token transfers” or “What’s my ETH balance?”.
3. **Verify Stream API**:
   - Ensure real-time transaction notifications appear in the chat when new transactions occur (requires testnet activity for demo).
