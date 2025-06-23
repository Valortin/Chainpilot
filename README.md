# Chainpilot

**Chainpilot** is an AI-powered decentralized application (dApp) built to serve as an in-wallet AI assistant that answers user queries about wallet activity (e.g., "What's my highest gas fee?" or "Show my recent transactions") and supports basic smart contract interactions. Chainpilot leverages **Nodit’s Blockchain Model Context Protocol (MCP)**, **Web3 Data API**, and **Node API** to deliver a seamless, multi-chain Web3 experience.

The frontend is built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion**, featuring a responsive, animated UI with a futuristic Web3 aesthetic. This README provides setup instructions and details on Nodit integration.

---

## 🚀 Features
- **AI Assistant**: Ask natural language questions about wallet activity, processed via Nodit’s MCP.
- **Wallet Insights**: View transaction history and gas fees using Nodit’s Web3 Data API.
- **On-Chain Queries**: Check ETH balance using Nodit’s Node API.
- **Multi-Chain Support**: Designed for Ethereum, with plans for Aptos, XRPL, and more via Nodit.
- **Enhanced UI**: Dark theme with neon accents, animated chat, and wallet sidebar.

---

## 🎯 Wavehack/Buildathon Alignment
Chainpilot addresses the Buildathon’s **AI + Automation** theme by:
- Using **Nodit MCP** to enable AI-driven blockchain queries.
- Leveraging **Web3 Data API** for real-time wallet insights.
- Implementing **Node API** for on-chain interactions.
- Offering an intuitive UI to lower Web3 adoption barriers.

---

## 🛠️ Tech Stack
- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion
- **Wallet**: MetaMask (for user authentication)
- **Nodit Features**:
  - **MCP**: AI query processing
  - **Web3 Data API**: Transaction history
  - **Node API**: ETH balance queries
- **Blockchains**: Ethereum (with future support for Aptos, XRPL)

---

## 📋 Prerequisites
- **Node.js**: v16 or higher
- **npm**: v8 or higher
- **Nodit API Key**: Obtain at [nodit.io](https://nodit.io).
- **MetaMask**: Installed in your browser.
- **Nodit MCP Server**: Running locally (optional for full AI integration).

---

## ⚙️ Installation
1. **Clone the Repository**:
   
```bash
   git clone https://github.com/valortin/chainpilot.git
   cd chainpilot

    Install Dependencies:
    bash

    npm install

    Configure Nodit API Key:
    Replace YOUR_NODIT_API_KEY in src/services/noditService.ts with your actual key.
    (Optional) Set Up Nodit MCP Server:
    bash

    git clone --recurse-submodules https://github.com/noditlabs/nodit-mcp-server.git
    cd nodit-mcp-server
    npm install
    npm run build
    npm run start

    Configure .cursor/mcp.json:
    json

    {
      "mcpServers": {
        "nodit": {
          "command": "npx",
          "args": ["@noditlabs/nodit-mcp-server@latest"],
          "env": { "NODIT_API_KEY": "YOUR_NODIT_API_KEY" }
        }
      }
    }

    Run the App:
    bash

    npm start

    Open http://localhost:3000.

## Project Structure

chainpilot/
├── src/
│   ├── components/
│   │   ├── ChatWindow.tsx      # Chat interface
│   │   ├── InputBox.tsx        # Query input
│   │   ├── Navbar.tsx          # Navigation
│   │   ├── WalletSidebar.tsx   # Wallet and chain selection
│   ├── services/
│   │   ├── noditService.ts     # Nodit API/MCP logic
│   │   ├── walletService.ts    # MetaMask connection
│   ├── types/
│   │   ├── noditTypes.ts       # Nodit response types
│   ├── App.tsx                 # Main component
│   ├── index.tsx               # Entry point
│   ├── index.css               # Tailwind styles
├── tailwind.config.js          # Tailwind config
├── package.json                # Dependencies
├── README.md                   # This file

## UI Enhancements

    Wallet Sidebar: Connect MetaMask and select chains (Ethereum, Aptos, XRPL).
    Chat Window: Loading animations and improved message styling.
    Animations: Smooth transitions using Framer Motion.
    Theme: Dark mode with cyan accents for Web3 aesthetic.

## Nodit Integration

    Nodit MCP:
        Processes queries like “Show recent transactions” or “What’s my ETH balance?”.
        Currently mocked; full integration requires a running MCP server.
    Web3 Data API:
        Endpoint: /transactions/getTransactionHistoryByAccount
        Example: Fetches recent transactions for a wallet address.
    Node API:
        Method: eth_getBalance
        Example: Retrieves ETH balance in real-time.

## Future Enhancements

    Full MCP Integration: Connect to an LLM (e.g., Claude) for advanced query processing.
    Automation: Suggest and execute actions (e.g., token swaps) via Node API.
    Analytics: Visualize wallet data with charts.
    Multi-Chain: Expand to Aptos, XRPL, and other Nodit-supported chains.


### Unique Advantages

    Natural Language Queries: Simplifies Web3 interaction for non-technical users.
    Multi-Chain Insights: Supports multiple blockchains via Nodit.
    Automation Potential: Future features will automate DeFi actions.

📜 License
MIT License. See LICENSE.
🙌 Acknowledgments

    Nodit: For robust Web3 infrastructure.
    Wavehack/Buildathon: For inspiring innovation.
    React, TypeScript, Tailwind CSS, Framer Motion: For a modern frontend.


- **Nodit Integration**: The updated code uses MCP (mocked), Web3 Data API, and Node API, addressing the feedback about missing Nodit features.
- **UI/UX Improvements**: The wallet sidebar, loading animations, and improved chat styling enhance usability and clarity.
- **Unique Advantages**: Chainpilot’s focus on natural language queries and multi-chain support differentiates it as an accessible, AI-driven wallet assistant.
- **Creative Utilization**: The demo showcases Nodit’s real-time data and AI capabilities in a simple, functional way, aligning with the Buildathon’s call for innovation.

---

### Instructions for Next Steps
1. **Test the App**:
   - Replace `YOUR_NODIT_API_KEY` in `noditService.ts` with your actual key from [nodit.io](https://nodit.io).
   - Run `npm start` and connect MetaMask to test queries like “Show recent transactions” or “What’s my ETH balance?”.
   - Note: MCP is mocked due to the complexity of setting up a full LLM. For a real demo, run the MCP server as described.

2. **Deploy for Buildathon**:
   - Deploy to Vercel:
     ```bash
     npm install -g vercel
     vercel
     ```
   - Submit the deployed URL to the Buildathon.

3. **Further Nodit Integration**:
   - For a full MCP demo, integrate an LLM (e.g., via `@anthropic-ai/sdk`) and run the MCP server.
   - Expand Web3 Data API calls to include token transfers or NFT metadata.
   - Add Node API methods for contract interactions (e.g., `eth_call`).
