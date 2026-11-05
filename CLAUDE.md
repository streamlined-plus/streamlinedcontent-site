# Streamlined Content website (www.streamlinedcontent.com)

Plain static HTML site: one `index.html` per page folder, no build step. Wix hosts it (headless static hosting); `sc-wix.js` connects the forms, newsletter, Streamlined+ checkout and analytics to Wix.

The current look is a dark theme (ink #171717 grounds, lime #C1FF72 accent), with its colors as CSS variables on `:root` in each page.

## Current job: add Paper Signal as an ALTERNATE theme
Build a second, light look in the `paper-signal` skill's style (`.claude/skills/paper-signal/`: read SKILL.md and look at its boards first). The current dark theme stays exactly as it is and stays the default.

- **Switching:** the alternate theme turns on with `?theme=paper` in the address (for example `/index.html?theme=paper`). Remember the choice in localStorage so links keep it. Also add a small, discreet theme switch (a paper-dot button) so Jon can flip between the two looks while previewing. Without `?theme=paper` or a saved choice, every page must look exactly like today.
- **How:** put the Paper Signal styles in one shared stylesheet (for example `/assets/theme-paper.css`, starting from the skill's tokens.css), scoped under `:root[data-theme="paper"]`, plus a tiny shared script (for example `/assets/theme.js`) that sets `data-theme="paper"` on `<html>` before the page paints. Link both from every page. Don't rewrite the dark theme's CSS.
- **Look:** warm paper background, embossed cards, mono uppercase labels, dot-matrix for big numbers/stats (use the skill's dot-matrix.js), one orange focal point per section (usually the main call to action). Swap the lime accent for Paper Signal orange in this theme.
- Keep all words, links, page structure, SEO tags and images the same in both themes.
- Keep `sc-wix.js` and every form/checkout hook working: don't rename the ids, classes or data attributes it uses.
- Must look right at phone width (no sideways scrolling) and on desktop, in both themes.

## Rules
- Work only on the `paper-signal-redesign` branch. Never push to `main`.
- **Never run `wix release` or any deploy. Nothing goes live.** Jon previews the alternate on his own computer and decides later.
- Commit in small steps with clear messages. When done, list what changed and the preview address to open.
