# Marketly Django API

Django + Django REST Framework backend for the Marketly storefront.

## Setup

From the `backend` directory:

```powershell
py -m pip install -r requirements.txt
Copy-Item .env.example .env
py manage.py migrate
py manage.py sync_products
py manage.py runserver 8000
```

The API is available at `http://127.0.0.1:8000/api/`.

## Endpoints

- `GET /api/products/`
- `GET /api/products/<slug>/`
- `POST /api/orders/`
- `POST /api/orders/<id>/payment/`

Product search and ordering are supported with `?search=phone` and `?ordering=-rating`.

Orders store USD source prices, while Paystack initialization converts the order amount to NGN using the same `1400` USD-to-NGN rate used by the frontend.

For this test site, the payment endpoint falls back to a demo reference when `PAYSTACK_SECRET_KEY` is empty, so no live verification is required. Set `PAYSTACK_SECRET_KEY` in `.env` only if you later want production live payment initialization. Never commit `.env` or production secrets.

## Validation

```powershell
py manage.py check
py manage.py test shop
```