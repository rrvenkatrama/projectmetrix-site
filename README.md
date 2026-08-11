# projectmetrix.dev — marketing site

Static site. No build step, no dependencies — `index.html`, `style.css`, and
the screenshots in `img/`. Open `index.html` locally to preview.

## Audience

Primarily **recruiters and hiring managers**, secondarily prospective
customers. That drives the content: a clear product story with real
screenshots, then an "engineering depth" section, because for a hiring
audience *how* decisions were made is the persuasive part.

Nothing on the page claims traction that doesn't exist — no customer logos,
no testimonials, no "trusted by". The roadmap section states plainly what is
Built, In progress, Designed and Planned. That honesty is deliberate: an
overstated claim discovered in an interview costs more than it gains.

## Screenshots

Captured automatically from the running prototype, so they can be
regenerated whenever the UI changes:

```bash
# from the capture script (see scratchpad/shots/capture.mjs)
node capture.mjs /path/to/site/img
```

The capture hides development-only chrome (the prototype badge, demo reset,
the load-test button, the perf overlay) and the internal design-log notes.
The product UI and all data shown are otherwise untouched — the schedule,
the impact preview and the rollups are genuinely computed by the engine.

Images are downscaled to 1600px wide. Only the hero loads eagerly; the rest
are lazy-loaded.

## Deploying to Cloudflare Pages

The domain is registered at GoDaddy. Because GoDaddy does not support
ALIAS/ANAME records, the apex `projectmetrix.dev` cannot point at Pages
while DNS stays there — so move the nameservers to Cloudflare (registration
stays at GoDaddy).

1. **Cloudflare → Add a site** → `projectmetrix.dev` → Free plan. Cloudflare
   scans existing DNS records; check the imported list before continuing.
2. **⚠ Email first.** If the domain has email (Microsoft 365 via GoDaddy, or
   GoDaddy email forwarding), confirm the MX records came across. Forwarding
   rules configured inside GoDaddy's panel do **not** transfer and must be
   recreated, or inbound mail stops when the nameservers change.
3. **GoDaddy → DNS → Nameservers → Change** to the two Cloudflare
   nameservers shown. Propagation is usually minutes to a few hours.
4. **Cloudflare → Workers & Pages → Create → Pages**. Either connect the Git
   repo (set build output directory to `site`, no build command) or upload
   the `site/` folder directly.
5. **Custom domains** → add `projectmetrix.dev` and `www.projectmetrix.dev`.
   TLS is issued automatically — required, since `.dev` is HSTS-preloaded
   and browsers refuse plain HTTP.

`_headers` sets long cache lifetimes for images and basic security headers;
Cloudflare Pages applies it automatically.

## Before going live

- Replace the contact email in `index.html` if `rrvenkatrama@gmail.com`
  isn't the right address for inbound enquiries.
- Consider recording a 60–90 second narrated walkthrough for the hero — for
  a hiring audience, hearing you explain the trade-offs is worth more than
  any screenshot.
