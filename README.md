# Bijou — bijouai.co

Custom lab-grown diamond engagement rings. Next.js (App Router) site with Stripe Checkout, Resend email and a Calendly booking embed.

## Pages

| URL | What it does |
|---|---|
| `/` | Homepage: hero, ways to start, signature settings, how it works, gallery, lab-grown, FAQ |
| `/design` | Ring builder with live price estimate, customer stories, and "Start from a photo" upload |
| `/session` | Book a complimentary Zoom design session (Calendly embed) |
| `/model` | Pay $100 for the 3D-printed model, then request changes or approve |
| `/checkout` | Pay for the ring in full (Stripe Checkout collects address, card and tax) |
| `/checkout/success` | Order confirmation |
| `/contact` | Email, phone, hours and FAQ |
| `/policies` | Shipping, returns, warranty, terms, privacy |

The design a customer builds is saved in their browser and carried through `/model` and `/checkout`. Prices are always recalculated on the server (`lib/pricing.js`), so they can't be edited in the browser.

## Run it on your computer

```bash
npm install
cp .env.example .env.local   # then fill in your keys
npm run dev                  # http://localhost:3000
```

## Launch checklist

### 1. GitHub
Create an empty repo (e.g. `bijou`), then from this folder:
```bash
git init && git add . && git commit -m "Bijou site"
git branch -M main
git remote add origin https://github.com/<you>/bijou.git
git push -u origin main
```

### 2. Vercel
1. vercel.com → **Add New → Project** → import the GitHub repo. Framework is detected as Next.js; keep the defaults.
2. **Settings → Environment Variables**: add everything from `.env.example` (use Stripe *test* keys first).
3. Deploy. You get a `*.vercel.app` preview link to test with.
4. Note: Vercel's free Hobby plan is for non-commercial use; a store should be on Pro.

### 3. Stripe
1. dashboard.stripe.com → create your account and complete business verification.
2. **Developers → API keys** → copy the secret key into `STRIPE_SECRET_KEY`.
3. **Developers → Webhooks → Add endpoint**: `https://bijouai.co/api/webhook`, event `checkout.session.completed`. Copy the signing secret into `STRIPE_WEBHOOK_SECRET`. You'll get an order email every time someone pays.
4. Test with card `4242 4242 4242 4242`, any future date and CVC.
5. **Sales tax:** turn on Stripe Tax, add the states where you're registered, then set `STRIPE_TAX=true`.
6. When everything works, switch to your **live** keys in Vercel and redeploy.

### 4. Point bijouai.co at the site (GoDaddy)
1. Vercel → Project → **Settings → Domains** → add `bijouai.co` (and accept adding `www.bijouai.co`). Vercel shows the exact records to use.
2. GoDaddy → **My Products → bijouai.co → DNS**:
   - Edit the **A** record named `@` → value from Vercel (usually `76.76.21.21`). Delete any other `@` A records (GoDaddy's "Parked" one).
   - Edit the **CNAME** named `www` → value from Vercel (e.g. `cname.vercel-dns.com` or the one shown).
   - If **Forwarding** is turned on for the domain, turn it off. Don't change nameservers.
3. Wait for Vercel to show **Valid Configuration** (minutes to a few hours). The SSL certificate is added automatically.
4. Set `NEXT_PUBLIC_SITE_URL=https://bijouai.co` in Vercel and redeploy.

### 5. Email: help@bijouai.co
- **Inbox:** sign up for Google Workspace (or Zoho Mail) with bijouai.co and add the MX records it gives you in the same GoDaddy DNS page.
- **Form emails (Resend):** resend.com → **Domains → Add bijouai.co** → add the DNS records it shows in GoDaddy → once verified, create an API key and set `RESEND_API_KEY`. `EMAIL_FROM` must use the verified domain.

### 6. Booking
Create a Calendly event "Design session" (60 min, Zoom location), then put its link in `NEXT_PUBLIC_CALENDLY_URL`. Until it's set, the page shows email and phone instead.

### 7. Before taking real orders
- Have a lawyer complete Terms of Sale and Privacy on `/policies` (placeholders are marked).
- Check prices in `lib/pricing.js` against your real diamond and casting costs.
- Confirm sales-tax registration with an accountant.
- Replace stock photos with your own rings and real customer photos (with permission) as you get them.

## Editing content

| What | Where |
|---|---|
| Prices and builder options | `lib/pricing.js` |
| Signature settings, customer stories, gallery, studio photos | `lib/data.js` (images in `public/images`) |
| Contact details, policies, FAQs | `lib/content.js` |
| Colors, fonts, spacing | `app/globals.css` |
