# Himalaya Carbon Exchange - Manual Testing Guide

This document outlines the steps required to manually verify the features and functionality of the Himalaya Carbon Exchange platform.

## 📋 Prerequisites

Before starting the manual tests, ensure you have:
1.  **Node.js & NPM**: Installed on your system.
2.  **MetaMask (or any Web3 Wallet)**: Installed as a browser extension.
3.  **Testnet Tokens**: (Optional, depending on environment) If testing on a live testnet, ensure you have native gas tokens (e.g., Sepolia ETH).
4.  **Local Environment**: Run `npm install` and `npm run dev` to start the local server at `http://localhost:3000`.

---

## 🏗️ 1. Environment Verification

### Step 1.1: `.env` Configuration
- Ensure `.env` contains valid values for:
  - `DATABASE_URL` (PostgreSQL)
  - `NEXT_PUBLIC_WC_PROJECT_ID` (WalletConnect Project ID)
  - `REGISTRY_SECRET` (For HMAC signatures in simulator)
  - Supabase credentials if applicable.

---

## 🔐 2. Institutional Session (Required for Marketplace)

The Carbon Marketplace requires an active institutional session. 

### Step 2.1: Register & Login
1.  Navigate to `http://localhost:3000/login`.
2.  Select **"Need to register your organization?"** at the bottom.
3.  Fill in the details and click **"Create Account"**.
4.  Once created, **Sign In** to establish your session.
5.  **Verification**: You will be redirected to the dashboard. You can now use Marketplace features.

---

## 🌐 3. Frontend & Navigation

### Step 3.1: Landing Page (Hero & Layout)
1.  Navigate to `http://localhost:3000`.
2.  Verify the **Hero Section** loads with smooth animations.
3.  Check the **Navbar** links: Home, Marketplace, Projects, Transparency, Architecture.
4.  Click **"Access Platform"** - should navigate to `/marketplace`.
5.  Click **"Access Architecture"** - should navigate to `/architecture`.

### Step 2.2: Responsive Design
1.  Open Browser DevTools (F12).
2.  Toggle device toolbar and test on **Mobile** (e.g., iPhone 12) and **Tablet**.
3.  Verify the hamburger menu works and layout remains clean.

---

## 🔑 4. Authentication & Wallet

### Step 4.1: Connect Wallet (RainbowKit)
1.  Click the **"Connect Wallet"** button in the Navbar.
2.  Select **MetaMask** from the RainbowKit modal.
3.  Approve the connection in your wallet extension.
4.  **Verification**: Navbar should now show your abbreviated wallet address and balance.

### Step 4.2: Wallet State Persistence
1.  Refresh the page while connected.
2.  **Verification**: The wallet should remain connected (if supported by the provider) or prompt for reconnect.

---

## 🛒 5. Marketplace & RFQ

### Step 5.1: Browsing Projects
1.  Go to `/marketplace`.
2.  Verify the **Project Cards** display correct metadata (ID, Vintage, Price, Risk Score).
3.  Use the **Search Bar** to filter projects by name (e.g., "Hydro").
4.  Use the **Methodology Filter** to filter by "Nature-Based" or "Renewable Energy".

### Step 5.2: Request for Quote (RFQ)
1.  On a project card, click **"Institutional RFQ"**.
2.  Enter an amount (e.g., `15000`).
3.  Click **"Submit Quote Request"**.
4.  **Verification**: You should see a success message: "Your institutional request has been logged."

---

## 🧪 6. Registry Simulator (Core Flow)

This tests the sovereign bridge integration from government registry to on-chain minting.

### Step 6.1: Payload Preparation
1.  Navigate to `/simulator`.
2.  Ensure your wallet is connected.
3.  Verify the **Recipient Address** field is pre-filled with your wallet address.
4.  Update **Amount** and **Project Name** if desired.

### Step 6.2: Trigger Sovereign Bridge
1.  Click **"Lock in Registry & Trigger Bridge"**.
2.  Observe the **Interoperability Console** (terminal log):
    - Should show "Prepared JSON Metadata Payload."
    - Should show "Signing payload with Sovereign Secret."
    - Should show "Transmitting payload to /api/registry/lock."
3.  **Verification**: The console should return "Sovereign Mint Successful!" with a transaction hash.

---

## 📊 7. Transparency & Architecture

### Step 7.1: Transparency Logs
1.  Navigate to `/transparency`.
2.  Verify the **Transaction Table** loads data.
3.  Check if filters work (e.g., filtering by "Mint" or "Retire").

### Step 7.2: System Architecture
1.  Navigate to `/architecture`.
2.  Verify the technical diagrams and descriptions render correctly.
3.  Test the scroll-triggered animations.

---

## 🔧 7. API and Backend Verification

- **Postman/Curl Test**:
  - Test `/api/projects` to ensure it returns JSON data.
  - Test `/api/registry/lock` with an invalid signature to verify security rejection.

## 🐞 Reporting Issues
If any of these steps fail, please report the issue with:
1. The Step Number.
2. Error message in the Browser Console (F12).
3. Network tab response for failed API calls.
