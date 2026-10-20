# CaratGems - Modern Fine Diamond Jewellery

> A high-fidelity, omnichannel fine jewellery digital storefront recreated from [CaratLane](https://www.caratlane.com/) under the new brand identity **CaratGems**.

Built for GitHub user **Aman22kr** with **Vite + React + Tailwind CSS + React Router + Lucide Icons + Framer Motion**, configured for static deployment to **GitHub Pages**.

---

## 💎 Features & Capabilities

- **Omnichannel Brand Experience**: Signature deep royal plum (`#3D2153` / `#4F3267`), lavender tints, and gold/champagne accents matching CaratLane's visual hierarchy.
- **Try Jewellery at Home (Free)**:
  - 4-step interactive home trial booking flow (choose up to 5 pieces, select date & morning/afternoon/evening time slot, address details, instant booking reference with SMS dispatch simulation).
  - Persisted in local browser storage.
- **Dynamic Fine Jewellery Customization**:
  - Live bullion gold purity toggle: **14KT, 18KT, 22KT**.
  - Diamond clarity grading: **IJ-SI, GH-VS, VVS-EF** with real-time recalculation of Indian fine jewellery prices.
  - Metal tone selector: **Yellow Gold, Rose Gold, White Gold**.
  - Interactive **Ring Size Guide & Virtual Ring Measurer** (measures diameter in mm with live slider & Indian/US size cross-reference).
  - Transparent **Price Breakup Drawer** (Gold weight & rate, Diamond carat weight & rate, Artisan making charges, 3% Indian GST).
- **Interactive 360° Inspection**:
  - Drag-to-rotate 360° viewer simulation on product detail views.
  - Blank square space for YouTube video presentation as required.
- **Store Locator (270+ Boutiques)**:
  - City filtering (Delhi NCR, Mumbai, Bengaluru, Hyderabad, Chennai, Pune) and postal PIN code search.
  - Interactive "Book In-Store Visit" consultation scheduler.
- **Shopping Bag & Coupon Engine**:
  - Real-time slide-over cart drawer and dedicated Cart page.
  - Promo code discounts (`SPARKLE10` for 10% off diamonds, `FIRSTGIFT` for ₹1,500 off, `CARATGEMS` for 5% off).
  - Free insured express delivery calculation.
- **Checkout & Order Tracking**:
  - Multi-option payment simulation: Instant UPI (GPay/PhonePe), Credit/Debit Card EMI, Cash on Delivery.
  - Confetti celebration and invoice generation.
  - Visual 5-stage shipment tracker (`CG-######`) with timestamps.
- **Ad Placement Banner**:
  - Discrete promotional partner banner at the bottom of each page as requested.
- **Quick Settings & Animation Control**:
  - Toggle animation speeds: **NORMAL** (default), **SLOW**, **FAST**, or **OFF**.
  - LocalStorage reset and cache management.

---

## 🚀 Local Development

1. **Clone the repository**:
   ```bash
   git clone https://github.com/Aman22kr/caratgems.git
   cd caratgems
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local Vite development server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

4. **Run type-check / lint**:
   ```bash
   npm run lint
   ```

---

## 📦 Deployment to GitHub Pages

This project is configured with `base: './'` in `vite.config.ts` and React `HashRouter` to ensure all direct URLs, subpages, and browser page refreshes work reliably on GitHub Pages without server-side rewrite rules.

### Method 1: Deploying via `gh-pages` (Recommended)

1. In your GitHub repository settings:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, choose **Deploy from a branch**.
   - Select branch `gh-pages` and folder `/ (root)`.
   - Under **Settings** > **Actions** > **General** > **Workflow permissions**, ensure **Read and write permissions** are granted.

2. Run the deployment command in your terminal:
   ```bash
   npm run deploy
   ```
   This builds the project to `./dist` and automatically pushes it to the `gh-pages` branch.

3. Your website will be live at:
   `https://Aman22kr.github.io/caratgems/`

---

### Method 2: Deploying via GitHub Actions

If you prefer automated CI/CD deployments on every push to `main`:

1. In GitHub repository settings:
   - Navigate to **Settings** > **Pages**.
   - Under **Build and deployment** > **Source**, select **GitHub Actions**.

2. Commit and push the included workflow file:
   `.github/workflows/deploy.yml`

3. GitHub Actions will automatically compile the Vite bundle and publish the static artifacts to GitHub Pages.

---

## 🛠️ Tech Stack

- **Framework**: React 19 + TypeScript
- **Bundler**: Vite 8
- **Styling**: Tailwind CSS v4 (`@import "tailwindcss";`)
- **Routing**: React Router (`HashRouter`)
- **Icons**: Lucide React
- **Animations**: Motion & CSS keyframes
- **Celebration Effects**: Canvas Confetti
- **Persistence**: Browser `localStorage` (Cart, Wishlist, Home Trial Bookings, Orders, Delivery PIN code, User Settings)

---

## ⚠️ Demo & Simulation Disclaimer

CaratGems is a frontend demonstration application. All order placements, payments, home trials, and appointment confirmations are client-side simulations stored safely in your browser's local storage. No real money or bank transactions take place.
