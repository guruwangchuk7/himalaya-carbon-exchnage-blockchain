# Running the Application

You can execute the Himalaya Carbon Exchange rapidly inside a Next.js 15 local environment.

## 🚀 Execution Command
```bash
npm install
npm run dev
```
The application will boot successfully natively on `http://localhost:3000`.

---

## 🔀 Simulating Role Access
Without interacting heavily with the Supabase OAuth systems or actively constructing databases through the public interface, use dynamic override configurations to quickly evaluate routing restrictions.

- Access **`http://localhost:3000/dashboard?bypass=buyer`** to emulate a functional Institutional Buyer acquiring metrics into their `/buyer/dashboard`.
- Access **`http://localhost:3000/dashboard?bypass=admin`** to drop natively into the Government issuer sequence at `/admin/dashboard`.

*(Note: These simulations interact directly with Prisma, meaning any acquisitions run inside `bypass=buyer` will successfully alter `totalVolume` states inside the MySQL server!)*

---

## 🔎 Verifying Backend State
To visualize the impacts your tests make inside the schema, initialize Prisma Studio on a secondary terminal window natively:

```bash
npx prisma studio
```
This runs heavily on port `5555` permitting direct visualization into `Profile`, `RegistryProject`, `AuditLog`, and the critically connected `UserBalance`.
