# PNB NFT Marketplace - Smart Contract & DApp Instructions

Welcome to the **PNB NFT Marketplace** project! This repository contains instructions for interacting with the smart contracts and deploying the DApp as part of a **University FYP Project**.

## Overview of PNB NFT Marketplace

**PNB NFT Marketplace** is a decentralized application that allows users to mint ERC721 NFTs and buy or sell these digital assets. Users can also list their minted NFTs for auction. The platform simplifies the buying and selling process and provides seamless integration for auctions.

---

## Key Features

- **Mint NFT**: Users can mint ERC721 tokens and list them for sale in the marketplace.
- **List NFT for Sale**: After minting, NFTs can be directly listed for sale, allowing other users to purchase them anytime.
- **Auction NFTs**: Users have the option to auction their NFTs for competitive bidding.

---

## DApp Instructions

### Prerequisites

- **MetaMask**: Install MetaMask to access the DApp and connect to the Sepolia TestNet.

### Steps to Deploy Smart Contracts on Sepolia

1. Deploy the marketplace contract and the NFT contract on the **Sepolia** TestNet.
2. Make sure the contracts are successfully deployed and the contract addresses are available.

### Configuration for the DApp

#### 1. Copy and Paste ABI

- Obtain the ABI (Application Binary Interface) of the **marketplace** and **NFT contracts**.
- Paste the ABI files into the `src/contractData` folder.

#### 2. Update Contract Addresses

- Update the contract addresses of the marketplace and NFT contracts in the `src/Store.js` file.

## Running the DApp Locally

### 1. Navigate to the Client Directory

```bash
cd frontend
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Start the Development Server

```bash
npm run dev
```

This will launch the development server. Open [http://localhost:3000](http://localhost:3000) to access the DApp.

---

## 🚀 Contact

For any questions, feedback, or inquiries, feel free to reach out to **Mohsin Ali Solangi**. You can connect via the following platforms:

- 🌐 **Linktree**: [Mohsin Ali Solangi](https://linktr.ee/mohsinalisolangi)
- 🔗 **LinkedIn**: [Mohsin Ali Solangi](https://www.linkedin.com/in/mohsinalisolangi/)

Looking forward to hearing from you! 😄
```
