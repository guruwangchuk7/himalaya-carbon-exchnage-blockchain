# User Manual - Himalaya Carbon Exchange Blockchain

This manual explains how to run the project locally from scratch.

## 1. Prerequisites
Install these first:
- Node.js 18+ (Node.js 20 LTS recommended)
- npm (comes with Node.js)
- MySQL 8+ (default Prisma datasource)
- Git

## 2. Get the Project
```bash
git clone <your-repo-url>
cd himalaya-carbon-exchnage-blockchain
```

## 3. Install Dependencies
```bash
npm install
```

## 4. Configure Environment Variables
1. Copy the sample environment file.
2. Edit values for your machine.

```bash
copy .env.example .env
```

Minimum values to verify in `.env`:
- `NEXT_PUBLIC_RPC_URL`
- `NEXT_PUBLIC_CHAIN_ID`
- `NEXT_PUBLIC_REGISTRY_ADDRESS`
- `PRIV_KEY`
- `REGISTRY_BRIDGE_AUTH`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

Example database variable (if your local setup needs one):
```env
DATABASE_URL="mysql://root:password@localhost:3306/himalaya_db"
```

## 5. Initialize the Database (Prisma)
Run these commands in the project root:

```bash
npx prisma db push
npx prisma generate
```

Optional DB viewer:
```bash
npx prisma studio
```
Then open: `http://localhost:5555`

## 6. (Optional) Start Local Blockchain + Deploy Contracts
If you want fully local contract testing:

Terminal 1:
```bash
npx hardhat node
```

Terminal 2:
```bash
npx hardhat run scripts/deploy.ts --network localhost
```

After deployment, update contract address in:
- `NEXT_PUBLIC_REGISTRY_ADDRESS` inside `.env`
- `REGISTRY_ADDRESS` in `src/constants/index.ts` (if you are using this constant directly)

## 7. Start the App
```bash
npm run dev
```

Open:
- `http://localhost:3000`

## 8. Validate Main Screens
### 8.1 Home Page
Open `http://localhost:3000`.

![Home Screen](../src/assets/images/home.png)

### 8.2 Dashboard Mock View
Open dashboard routes after login/bypass.

![Dashboard Mock](../public/images/mock-dashboard.svg)

### 8.3 Payment Mock View
Used in payment flow validation.

![Payments Mock](../public/images/mock-payments.svg)

### 8.4 Invoice Mock View
Used in invoice/checkout validation.

![Invoice Mock](../public/images/mock-invoice.svg)

## 9. Role Simulation for Fast Testing
Use these URLs for quick role checks:
- Buyer simulation: `http://localhost:3000/dashboard?bypass=buyer`
- Admin simulation: `http://localhost:3000/dashboard?bypass=admin`

## 10. Useful Commands Reference
```bash
npm run dev          # Start local dev server
npm run build        # Production build
npm run start        # Run production server after build
npm run compile      # Compile smart contracts
npm run deploy-amoy  # Deploy to Polygon Amoy
npm run harmony-watch # CAD Trust harmony watcher
```

## 11. Common Troubleshooting
- `Port 3000 is busy`: run on another port with `npm run dev -- -p 3001`.
- Prisma client errors: run `npx prisma generate` again.
- DB connection errors: verify `DATABASE_URL` and ensure MySQL is running.
- Contract read/write fails: verify `NEXT_PUBLIC_RPC_URL`, `NEXT_PUBLIC_CHAIN_ID`, and deployed registry address.
- Wallet connection issues: verify `NEXT_PUBLIC_RAINBOW_PROJECT_ID`.

## 12. Quick Success Checklist
- Dependencies installed (`npm install`)
- `.env` configured
- Prisma schema pushed and client generated
- App loads on `http://localhost:3000`
- Buyer/Admin bypass routes open successfully
