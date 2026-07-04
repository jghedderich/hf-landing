# HF Software Landing Site

Marketing site for HF Software — built with Astro 7, Tailwind CSS, and deployed to Cloudflare Workers.

**Requirements:** Node.js `>=22.15.0`, pnpm

## Setup

```bash
pnpm install
cp .env.example .env
```

Configure `.env`:

- `RESEND_API_KEY` — API key from [Resend](https://resend.com)
- `CONTACT_EMAIL` — where form submissions are delivered
- `CONTACT_FROM` — verified sender address in Resend

## Development

```bash
pnpm dev
```

Visit `http://localhost:4321/en/`

## Build

```bash
pnpm build
pnpm preview
```

## Deploy (Cloudflare Workers)

Set secrets in Cloudflare:

```bash
pnpm exec wrangler secret put RESEND_API_KEY
```

Update `CONTACT_EMAIL` and `CONTACT_FROM` in `wrangler.toml` or via dashboard vars.

Deploy with your preferred Cloudflare Workers/Pages workflow for Astro SSR output.

## Adding a case study

1. Add images to `src/assets/<project>/`
2. Register imports in `src/data/case-study-images.ts`
3. Add `src/content/case-studies/<slug>.json` with `en` and `es` copy

See `CONTEXT.md` for domain language and content guidelines.
