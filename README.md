# BAC Contracting and Design

Marketing website for BAC Contracting and Design, deck and porch repair,
rehab, and restoration serving the Greater St. Louis metro area.

## Pages

| File | Live URL |
| --- | --- |
| `index.html` | `/` |
| `deck-repair-st-louis.html` | `/deck-repair-st-louis` |
| `deck-rehab-st-louis.html` | `/deck-rehab-st-louis` |
| `deck-inspections-st-louis.html` | `/deck-inspections-st-louis` |
| `historic-porch-repair-st-louis.html` | `/historic-porch-repair-st-louis` |
| `service-area.html` | `/service-area` |
| `work.html` | `/work.html` |

GitHub Pages serves `foo.html` at `/foo`, so the five service pages use clean,
extensionless canonical URLs. Internal links point at those canonical URLs.

## Structure

- `assets/site.css` shared styles for every page
- `assets/site.js` shared behavior: sticky header, mobile nav, services
  dropdown, scroll reveals, and the estimate form (FormSubmit AJAX with a
  mailto fallback)
- `images/` photography and logos, referenced relatively
- `sitemap.xml` and `robots.txt` submitted to Google Search Console

No build step. Plain static files.

## SEO notes

- Every page has a canonical link, keyword-first title, meta description,
  Open Graph and Twitter tags, exactly one `<h1>`, and JSON-LD.
- Site-wide `HomeAndConstructionBusiness` schema carries the phone, email,
  hours, service area, and rating. Keep those values truthful and in sync
  with the Google Business Profile.
- `FAQPage` schema lives on the home page and the deck repair page.
- Copy style rules for this site: no prices or dollar figures (savings
  percentages only), no en or em dashes, positive framing.
- After changing page URLs or adding pages, update `sitemap.xml` and
  resubmit it in Google Search Console.

## Hosting

Served via GitHub Pages from the `main` branch, with DNS through Cloudflare.
