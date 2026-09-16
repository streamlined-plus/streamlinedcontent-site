# Streamlined Content — site

Static site for **streamlinedcontent.com**. Two pages, no build step, no dependencies.

```
index.html            homepage
services/index.html   the four service pages (#websites, #local-search, #content-systems, #lead-automation)
CNAME                 tells GitHub Pages to serve at www.streamlinedcontent.com
.nojekyll             serve files as-is
robots.txt, sitemap.xml
```

## Deploy with GitHub Pages (one-time)

1. Push this to the `main` branch.
2. Repo **Settings → Pages** → Source: *Deploy from a branch* → Branch: `main` / `/ (root)` → Save.
3. Under **Custom domain** it should already read `www.streamlinedcontent.com` (from CNAME). Tick **Enforce HTTPS** once the certificate is issued (a few minutes).

## Point the domain at it

At your DNS provider (or in Wix → Domains, switch the domain to *point to another host*):

| Type  | Host | Value |
|-------|------|-------|
| CNAME | www  | `<your-github-username>.github.io` |
| A     | @    | 185.199.108.153 |
| A     | @    | 185.199.109.153 |
| A     | @    | 185.199.110.153 |
| A     | @    | 185.199.111.153 |

Apex (`streamlinedcontent.com`) then redirects to `www`. Propagation is usually under an hour.

## Editing

Every page is a single self-contained HTML file — edit, commit, and it's live in about a minute. No Wix, no publish button.
