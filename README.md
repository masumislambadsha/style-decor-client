# ⚜️ STYLE DECOR — CLIENT — THE SHOWROOM

![SHOWROOM READY](https://img.shields.io/badge/SHOWROOM-OPEN-brightgreen?style=for-the-badge&logo=shopify)

> A cinematic, conversion‑driven storefront UI for Style Decor — glossy visuals, tactile micro‑interactions, and ruthless UX for customers who buy.


---

## 💥 THIS README IS FOR PEOPLE WHO WHAT TO LEARN ABOUT HOW IT LOOKS AND SELLS

- If you love bland, leave now.
- If you obsess over typography, motion, and conversion, stay — you belong here.

---

## ✨ QUICK PITCH — WHAT THIS IS
Style Decor — Client is the production‑ready React + Vite frontend that pairs with the Style Decor Server. It showcases products with cinematic galleries, handles cart & checkout UX, connects to payments and auth, and is optimized for speed and conversions.

Audience: merchants, designers, and frontend engineers who ship beautiful UIs.

---

## 🔗 LIVE DEMO
- Production : [https://style-decor.app](https://style-decor-5b2fb.web.app/)
- Preview / Vercel: [preview link](https://style-decor-5b2fb.web.app/)

---

## ⚔️ FEATURES — THE SHOWROOM ARSENAL

- 🖼️ Cinematic Product Galleries & Carousels — desktop and mobile ready
- 🛒 Robust Cart & Checkout UX — Stripe-ready hooks and graceful error handling
- 🔐 Auth-ready — Firebase or JWT friendly, social login friendly
- 🎨 Themeable UI — TailwindCSS + DaisyUI (dark/light support)
- 🎞️ Micro-interactions — Framer Motion + Lottie for delightful polish
- 🗺️ Maps & Pickup — React-Leaflet integration for store locations
- 📊 Admin Dashboards — Recharts for sales and product analytics
- ♿ Accessibility-minded components & keyboard navigation
- ⚡ Blazing fast HMR (Vite) + optimized production builds

---

## 🧰 TECHNOLOGY STACK — THE ARMORY

| Area | Weaponry |
| --- | --- |
| Framework | React 19 |
| Bundler | Vite |
| Styling | TailwindCSS + DaisyUI |
| Data | Axios, React Query (@tanstack/react-query) |
| Animations | Framer Motion, Lottie |
| Maps | Leaflet, React-Leaflet |
| Payments | Stripe |
| UI icons | react-icons, lucide-react |
| Dev tooling | ESLint, vite-plugin-react |

---

## 📦 EXACT NPM PACKAGES (from package.json)

Dependencies:
- @tailwindcss/vite
- @tanstack/react-query
- aos
- axios
- daisyui
- firebase
- firebase-admin
- framer-motion
- leaflet
- lottie-react
- lucide-react
- react
- react-dom
- react-fast-marquee
- react-hook-form
- react-hot-toast
- react-icons
- react-leaflet
- react-loader-spinner
- react-responsive-carousel
- react-router
- stripe
- sweetalert2
- swiper
- tailwindcss

DevDependencies:
- @eslint/js
- @types/react
- @types/react-dom
- @vitejs/plugin-react
- eslint
- eslint-plugin-react-hooks
- eslint-plugin-react-refresh
- globals
- vite

(Keep this list synced with package.json — run `cat package.json | jq -r '.dependencies + .devDependencies | keys[]'`)

---

## 🚦 QUICKSTART — NO HAND‑HOLDING

```bash
git clone https://github.com/masumislambadsha/style-decor-client.git
cd style-decor-client
npm install
cp .env.example .env
# edit .env with VITE_API_URL, Firebase keys, STRIPE keys, etc.
npm run dev
# open http://localhost:5173
```

Build:
```bash
npm run build
npm run preview
```

---

## ⚙️ ENVIRONMENT (Vite IMPORTANT NOTES)
Vite exposes env vars starting with VITE_. Example `.env`:
```
VITE_API_URL=https://api.style-decor.example.com
VITE_FIREBASE_API_KEY=...
VITE_FIREBASE_AUTH_DOMAIN=...
VITE_FIREBASE_PROJECT_ID=...
VITE_STRIPE_PK=pk_live_...
```
Do not commit secrets. Use Vercel/Netlify/GH Actions secrets for production.

---

## 🗺 ROUTES / PAGES (EXPECTED)
- / — Home / hero & featured products
- /products — Listing with search & filters
- /products/:id — Product details & variants
- /cart — Cart preview
- /checkout — Payment flow (Stripe)
- /auth/login — Login / Register
- /account — Orders & profile
- /admin — Admin dashboard (protected)

Replace with actual router export when you want this table exact.

---

## 📁 FULL EXPANDED FOLDER SNAPSHOT — MATCHING YOUR PROJECT

(Updated to reflect the file tree in your screenshots — capitalization and folder names preserved.)

style-decor-client
├── .firebase/
├── dist/
├── node_modules/
├── public/
│   ├── favicon.svg
│   ├── FooterImg.jpg
│   └── vite.svg
├── src/
│   ├── assets/
│   ├── Components/
│   │   ├── Error/
││   │   │   └── ErrorPage.jsx
│   │   ├── Footer/
│   │   │   └── Footer.jsx
│   │   ├── ForbiddenPage/
│   │   │   └── Forbidden.jsx
│   │   ├── Logo/
│   │   │   ├── CollapsedLogo.jsx
│   │   │   └── Logo.jsx
│   │   ├── Navbar/
│   │   │   └── Navbar.jsx
│   │   ├── ServiceCard/
│   │   │   └── ServiceCard.jsx
│   │   └── Spinner/
│   │       └── LoadingSpinner.jsx
│   ├── Context/
│   │   ├── AuthContext/
│   │   │   └── AuthContext.jsx
│   │   └── AuthProvider/
│   │       └── AuthProvider.jsx
│   ├── Firebase/
│   │   └── firebase.init.js
│   ├── Hooks/
│   │   ├── useAuth.jsx
│   │   ├── useAxiosSecure.jsx
│   │   ├── useDecorators.jsx
│   │   ├── useRole.jsx
│   │   ├── useServices.jsx
│   │   └── useUserProfile.jsx
│   ├── layouts/
│   │   ├── DashboardLayout/
│   │   │   ├── AdminDashboard/
│   │   │   │   ├── Analytics/Analytics.jsx
│   │   │   │   ├── DecoratorApplications/DecoratorApplications.jsx
│   │   │   │   ├── ManageBookings/ManageBookings.jsx
│   │   │   │   ├── ManageDecorators/ManageDecorators.jsx
│   │   │   │   ├── ManageServices/ManageServices.jsx
│   │   │   │   └── ManageUser/ManageUser.jsx
│   │   │   ├── Dashboard/
│   │   │   │   ├── MyBookings/MyBookings.jsx
│   │   │   │   ├── MyProfile/MyProfile.jsx
│   │   │   ├── Payment/
│   │   │   │   ├── PaymentCancelled.jsx
│   │   │   │   └── PaymentSuccess.jsx
│   │   │   ├── PaymentHistory/PaymentHistory.jsx
│   │   │   ├── UserDashboard/UserDashboard.jsx
│   │   │   ├── UserProfile/
│   │   │   ├── DecoratorDashboard/
│   │   │   │   ├── AssignedProjects/AssignedProjects.jsx
│   │   │   │   ├── Earnings/Earnings.jsx
│   │   │   │   └── TodaySchedule/TodaySchedule.jsx
│   │   │   ├── Sidebar/
│   │   │   │   ├── Sidebar.jsx
│   │   │   └── DashboardLayout.jsx
│   │   ├── RootLayout/RootLayout.jsx
│   │   └── RootLayout.jsx
│   ├── pages/
│   ├── routes/
│   ├── App.css
│   ├── App.jsx
│   ├── index.css
│   └── main.jsx
├── .env
├── .firebaserc
├── .gitignore
├── eslint.config.js
├── firebase.json
├── index.html
├── package.json
├── package-lock.json
├── README.md
├── tailwind.config.js
└── vite.config.js

> Notes:
> - I capitalized "Components", "Context", "Firebase", "Hooks", and "layouts" to match your screenshots.
> - Key files you highlighted: `src/layouts/DashboardLayout/Sidebar/Sidebar.jsx`, `src/Firebase/firebase.init.js`, `src/Components/Footer/Footer.jsx`, `src/App.jsx`, `src/main.jsx`.

If that tree still differs, run the command below in project root and paste the result back here — I will replace the curated tree with the exact output.

```bash
npx tree-cli -a -I 'node_modules|dist'
# or
tree -a -I 'node_modules|dist' -L 4
```

---

## 🖼 SHOWROOM IMAGES
Add high‑quality screenshots to `/docs` and reference them here:

<p align="center">
  <img src="/heroSS.png" alt="Hero" width="820"/>
</p>

<p align="center">
  <img src="/serviSS.png" alt="Product detail" width="820"/>
</p>

---

## 🧭 DESIGN PHILOSOPHY — BEAUTY SELLS
- Every pixel earns its place.
- Micro‑animations explain affordances — not distract.
- Performance is design: faster = better conversion.
- Accessibility is non‑negotiable.

---

## 🛠 CONTRIBUTING — SHIP OR SHAME
Contribute if you can improve the product:

- Fork → Branch (`feature/<name>` / `fix/<name>`) → Commit → PR
- Run `npm run lint` before pushing
- Keep PRs focused and document UX changes
- Add tests where applicable

Small, deliberate changes > giant unfocused PRs.

---

## 🤝 Connect
- GitHub: [masumislambadsha](https://github.com/masumislambadsha)
- Email: <mohammadbadsha468@example.com>
- Linkedin :  [Masum Islam Badsha](https://www.linkedin.com/in/masum-islam-badsha/)

---

> “Design is the silent ambassador of your brand.” — Paul Rand

---

## 📜 LICENSE
MIT © masumislambadsha — See [LICENSE](./LICENSE)

---

## 🏁 FINAL WORD
This README now reflects your real project layout (Sidebar, DashboardLayout, Components, Hooks, Firebase init file, etc.). Want me to:
