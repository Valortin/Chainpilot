# Chainpilot

**Chainpilot** is an AI-powered decentralized application (dApp) designed as an in-wallet assistant. It answers user queries like:  
> “What's my highest gas fee in the past month?”  
> “Which token has been most profitable?”  

It also suggests or automates smart contract interactions. 

Chainpilot leverages **Nodit’s Blockchain Model Context Protocol (MCP)**, **Web3 Data API**, and **Node API** to deliver a seamless, multi-chain Web3 experience.

The frontend is built with **React**, **TypeScript**, **Tailwind CSS**, and **Framer Motion** to provide a responsive, animated interface with a futuristic Web3 aesthetic.

---

## ✨ Features

- **AI-Powered Assistant**: Ask natural language questions powered by Nodit’s MCP.
- **Wallet Insights**: Query historical data such as gas fees and token transfers using Nodit’s Web3 Data API.
- **Automation**: Suggest or trigger smart contract interactions via Nodit’s Node API.
- **Sleek UI**: Responsive dark mode UI with neon accents and smooth animations.
- **Multi-Chain Support**: Compatible with Ethereum, XRPL, Aptos, and more via Nodit.

---

## 🎯 Buildathon Alignment

Chainpilot aligns with the Wavehack/Buildathon’s **AI + Automation** theme by:

- Integrating Nodit’s MCP for AI-driven, real-time blockchain querying.
- Using Web3 Data API for wallet analytics.
- Automating smart contract interactions with the Node API.
- Delivering an interactive, animated, and modern frontend UI.

---

## 🛠 Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS, Framer Motion  
- **Backend (Planned)**: Nodit MCP, Web3 Data API, Node API  
- **Chains**: Ethereum, XRPL, Aptos (via Nodit)  
- **AI**: Integration placeholder for LLMs (e.g., Claude, ChatGPT) via Nodit MCP

---

## 📋 Prerequisites

- **Node.js**: v16 or higher  
- **npm**: v8 or higher  
- **Nodit API Key**: Get one at [nodit.io](https://nodit.io)  
- **Web3 Wallet**: MetaMask or compatible wallet (for interaction features)

---

## ⚙️ Installation

1. **Clone the Repository**

```bash
   git clone https://github.com/Valortin/Chainpilot.git
   cd chainpilot
````

2. **Install Dependencies**

   ```bash
   npm install
   ```

3. **Set Up Tailwind CSS**

   **`tailwind.config.js`**

   ```javascript
   /** @type {import('tailwindcss').Config} */
   module.exports = {
     content: ["./src/**/*.{js,jsx,ts,tsx}"],
     theme: { extend: {} },
     plugins: [],
   }
   ```

   **`src/index.css`**

   ```css
   @tailwind base;
   @tailwind components;
   @tailwind utilities;

   body {
     margin: 0;
     font-family: 'Inter', sans-serif;
     background-color: #1a202c;
     color: #e2e8f0;
   }
   ```

4. **Run the Development Server**

   ```bash
   npm start
   ```

   Visit `http://localhost:3000` to view the app.

---

---

## 🎨 UI Features

* **Navbar**: Branded “Chainpilot” logo with animated entry.
* **Chat Window**: Fade-in responses and history of wallet queries.
* **Input Box**: Clean, intuitive input with smooth UX.
* **Theme**: Dark mode with cyan/glow accents for Web3 vibes.

---

## 🔗 Nodit Integration (Planned)

### Nodit MCP

Setup example:

```json
{
  "mcpServers": {
    "nodit": {
      "command": "npx",
      "args": ["@noditlabs/nodit-mcp-server@latest"],
      "env": { "NODIT_API_KEY": "YOUR_API_KEY" }
    }
  }
}
```

Run the MCP server:

```bash
git clone --recurse-submodules https://github.com/noditlabs/nodit-mcp-server.git
cd nodit-mcp-server
npm install
npm run start
```

### Web3 Data API

Example: Query token transfers

```bash
curl --request POST \
  --url https://web3.nodit.io/v1/ethereum/mainnet/token/getTokenTransfersByAccount \
  --header 'X-API-KEY: YOUR_API_KEY' \
  --data '{
    "accountAddress": "0xd8dA6BF26964aF9D7eEd9e03E53415D37aA96045",
    "fromDate": "2025-01-01T00:00:00+00:00",
    "toDate": "2025-01-31T00:00:00+00:00"
  }'
```

### Node API

Planned support for JSON-RPC based smart contract interactions (e.g., token swaps).

---

## 🚧 Future Enhancements

* 🔗 **AI Integration**: Use LLMs (Claude, ChatGPT) via Nodit MCP.
* 🦊 **Wallet Integration**: MetaMask login + TX signing.
* 📊 **Analytics Dashboard**: Charts for gas usage, token trends.
* 🌊 **Wave Animations**: Visual themes to match “Wavehack” branding.

---

## 🌟 Why Chainpilot?

Chainpilot lowers Web3 barriers with natural language interfaces, smart automation, and powerful analytics—all from inside your wallet. Perfectly aligned with the **Wavehack/Buildathon** spirit of innovation at the intersection of AI and blockchain.

---

## 📜 License

[MIT](LICENSE)

---

## 🙌 Acknowledgments

* **Nodit**: APIs + infrastructure
* **Wavehack/Buildathon**: The inspiration
* **React, TypeScript, Tailwind, Framer Motion**: Frontend tech stack

> 🔑 **Note**: Replace `YOUR_API_KEY` with your actual Nodit API key. For deployment, consider platforms like **Vercel** or **Netlify**.
