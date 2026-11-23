# Streamlined Content website — LIVE branch

This branch (`live`) matches www.streamlinedcontent.com exactly (synced 2026-11-22, after the testimonials update).
Start every website change from here, not from `main` (main contains an old revert to the v1 site) and not from a stale copy.

- Plain static HTML, one `index.html` per page folder, no build step.
- Hosted by Wix (headless static hosting). `sc-wix.js` connects forms, newsletter, Streamlined+ checkout and analytics: don't rename the ids, classes or data attributes it uses.
- Publishing replaces the whole site with this folder. Jon publishes himself. Never run `wix release` without Jon's go-ahead.
- Publish (Jon runs it): `npx @wix/cli@latest release -t minor -c "<what changed>"` from this folder. Needs Node 24.22.1+.
- Before publishing: back up the live site, compare file by file, and make sure no notes/tool files (like this one) are in the upload folder. Use a clean copy of only the site files.
- Testimonials: the tagged library lives in ~/AI/career/testimonials/testimonials-library.md.
- Paper Signal light theme: separate work on the `paper-signal-redesign` branch (not live).
