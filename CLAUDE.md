# Streamlined Content website — LIVE branch

This branch (`live`) matches www.streamlinedcontent.com exactly (synced 2026-11-22, after the testimonials update).
Start every website change from here, not from `main` (main contains an old revert to the v1 site) and not from a stale copy.

- Plain static HTML, one `index.html` per page folder, no build step.
- HOSTED ON GITHUB PAGES since 2026-11-23 (repo streamlined-plus/streamlinedcontent-site, branch `live`, HTTPS enforced; domain records in Wix point apex A to 185.199.108-111.153 and www CNAME to streamlined-plus.github.io). Wix still runs forms, newsletter, Streamlined+ checkout through its APIs. `sc-wix.js` connects forms, newsletter, Streamlined+ checkout and analytics: don't rename the ids, classes or data attributes it uses.
- Publishing = commit and `git push origin live` (GitHub rebuilds in about a minute). Only with Jon's go-ahead. `wix release` is no longer used.
- Note: files in this branch are public (this CLAUDE.md too). Keep private notes elsewhere.
- Testimonials: the tagged library lives in ~/AI/career/testimonials/testimonials-library.md.
- Paper Signal light theme: separate work on the `paper-signal-redesign` branch (not live).
