# Slyde storefront POC

Client demo for Slyde school uniforms and customized apparel — catalog, bag, and simulated checkout. Products and images come from the Slyde catalogue.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

Checkout is simulated (any 16-digit card). Catalog is seeded locally so the demo runs without a backend.

Optional: create a Supabase project, run `supabase/schema.sql` then `supabase/seed.sql`, and put the project URL and publishable key in `.env`. Orders will then persist in Supabase.
