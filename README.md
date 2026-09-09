# Marketly

A responsive React + Vite product catalog and shopping cart built with Tailwind CSS and the DummyJSON products API.

## Local development

```powershell
npm install
npm run dev
```

Create a production build with:

```powershell
npm run build
npm run preview
```

For local Django API integration, copy `.env.example` to `.env` before starting Vite:

```powershell
Copy-Item .env.example .env
```

Run the frontend and backend in separate terminals:

```powershell
npm run dev
```

```powershell
cd backend
py manage.py runserver 8000
```

Run the automated tests with:

```powershell
npm test
```

Use watch mode while developing:

```powershell
npm run test:watch
```

## Deployment

### Vercel

1. Import the repository into Vercel.
2. Select the Vite framework preset.
3. Use `npm run build` as the build command.
4. Use `dist` as the output directory.
5. Deploy with no environment variables required.

### Netlify

1. Add the repository as a new site.
2. Use `npm run build` as the build command.
3. Use `dist` as the publish directory.
4. Deploy with no environment variables required.

The app reads product data from `https://dummyjson.com/products?limit=0` and stores the cart in browser `localStorage` under `marketly-cart`.

Product prices from DummyJSON are treated as USD internally and displayed in Nigerian Naira using the `USD_TO_NGN = 1400` exchange-rate constant and the shared `formatCurrency` helper.

## Backend

The Django + Django REST Framework backend lives in `backend/`. See [backend/README.md](backend/README.md) for setup, database migrations, product syncing, order creation, and Paystack initialization.
