# 🚀 Project Setup & Credentials Guide

This guide outlines where to obtain the necessary credentials for the Himalaya Carbon Exchange project.

## 1. Blockchain RPC Settings
*   **NEXT_PUBLIC_RPC_URL**: Currently set to the public Amoy RPC. For better performance, get a private URL from [Alchemy](https://www.alchemy.com/) or [Infura](https://www.infura.io/).
*   **NEXT_PUBLIC_RPC_URL_MAINNET**: Also obtained from Alchemy or Infura by creating a "Polygon Mainnet" app.

## 2. Smart Contract Address
*   **NEXT_PUBLIC_REGISTRY_ADDRESS**: Found in your `.env` as `0x82aCd...`. This is the `HimalayaCarbonRegistry` on Polygon Amoy.
*   *Note*: To deploy your own, use Hardhat/Foundry with the logic in `/contracts/`.

## 3. Private Key (Relayer)
*   **PRIV_KEY**: Key for the account managing the registry (whitelisting/minting).
*   **How to get**: MetaMask -> Account Details -> Show Private Key.
*   **Warning**: Never commit this key! The account needs **Amoy MATIC** for gas.

## 4. Supabase (Database & Auth)
*   **NEXT_PUBLIC_SUPABASE_URL** & **NEXT_PUBLIC_SUPABASE_ANON_KEY**:
    1. Sign up at [supabase.com](https://supabase.com).
    2. Go to **Project Settings -> API**.
    3. Copy the URL and 'anon' key.

## 5. CAD Trust (Global Tracking)
*   **NEXT_PUBLIC_CAD_TRUST_API_URL** & **CAD_TRUST_AUTH_TOKEN**:
    *   Simulated for this prototype. Use dummy values or contact the CAD Trust team for real integration details.

## 6. HMAC Auth (Security)
*   **REGISTRY_BRIDGE_AUTH**:
    *   A custom secret (like a password) you create to secure internal API calls. Set it to a long random string.

---

## 📅 Tasks for Tomorrow
- [ ] Export MetaMask Private Key to `.env`.
- [ ] Set up Alchemy/Infura for custom RPC URLs.
- [ ] Fund Relayer Wallet with Amoy MATIC.
- [ ] Set up Supabase project and sync Prisma (`npx prisma db push`).
- [ ] Refresh Dev Server (`npm run dev`).
