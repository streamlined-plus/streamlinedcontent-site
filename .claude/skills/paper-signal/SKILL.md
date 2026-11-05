---
name: paper-signal
description: Jon's personal design system "Paper Signal" — warm white embossed paper cards, dot-matrix numbers, spaced monospace uppercase labels and one orange accent. Use whenever Jon asks for "my style", "Paper Signal", or builds any screen, web page, app, dashboard, slide or widget for himself, on any device (phone, TV, desktop, Kindle, web).
---

# Paper Signal

Paper Signal is Jon's own design system. It already runs across several of Jon's apps and screens. Anything new should look like it belongs to that family.

**In one sentence:** soft, sculpted *paper* objects (cards, discs, spheres) on warm off-white, with black ink text, dot-matrix numbers, tiny spaced-out uppercase labels, and **one** bright orange "signal" for whatever matters most right now.

Look at the boards in `boards/` before designing. They are the source of truth. Their scores, weather and tasks are sample content.

| File | Shows |
|---|---|
| `boards/palette-light.jpg` | Phone (closed cover + open), light theme: swatch discs, cards, list rows, orange button |
| `boards/palette-dark.jpg` | The same screen in Sculpted Dark |
| `boards/tv-home.jpg` | TV home: big greeting, dot-matrix clock and temperature, sculpted card grid |
| `boards/desktop.jpg` | Ubuntu desktop version |

## Themes

- **White Paper** (light) is the **default**. Use it unless Jon asks for dark.
- **Sculpted Dark** is the same design in charcoal paper. Same orange, same shapes.

## Color tokens

Exact values from the live apps. `tokens.css` has them ready to paste.

### White Paper (default)

| Token | Hex | Use |
|---|---|---|
| `bg` | `#EEEAE3` | Page/screen background (warm paper) |
| `card` | `#F6F3EE` | Cards, sheets, popovers |
| `card-hi` | `#FAF7F2` | Top of the card gradient (light hitting the paper) |
| `card-lo` | `#EFE9E0` | Bottom of the card gradient |
| `ink` | `#1E1B18` | Main text, icons, dot-matrix numbers |
| `soft` | `#6B645B` | Secondary text and the small uppercase labels |
| `faint` | `#B9B1A5` | Disabled text, placeholders |
| `ring` | `#E4DED5` | Borders, dividers, empty ring segments |
| `segment-off` | `#DDD5C9` | Unlit segments in progress rings |
| `rule` | `rgba(120,96,70,0.20)` | Thin divider lines |
| `orange` | `#F2561D` | **The signal.** Primary button, selected item, the clock colon, "done" segments |
| `orange-soft` | `#F7A06B` | Hover/glow around orange things |
| `orange-deep` | `#C9501A` | Orange text on paper (warnings, "late") — readable |
| `shadow` | `#5A4228` | Shadow color (warm brown, never grey or black) |

### Sculpted Dark (sampled from the boards, approximate)

| Token | Hex |
|---|---|
| `bg` | `#21211F` |
| `card` | `#262623` (lifted, with a faint lighter top edge) |
| `sunken` | `#191A18` (pressed buttons, inset wells) |
| `ink` | `#EEEAE3` (paper white text) |
| `soft` | `#9A948B` |
| `orange` | `#F86421` |

### Extra swatches (from the Palette board — for charts or tags only)

Moonlight `#DACFC4` · Coast `#828B95` · Dusk `#363C46` · Charcoal `#3A3937`. Use them sparingly; orange stays the only loud color.

## Type

- **Headlines and body:** a clean sans. Web: `Inter` (fallback `system-ui, Roboto, sans-serif`). Android: `sans-serif` / `sans-serif-medium`. Big greetings are bold, tight (`letter-spacing: -0.03em`, line-height ≈ 0.92), sentence case: *"Your evening, at a glance."*
- **Labels:** monospace, UPPERCASE, small, widely spaced (`letter-spacing: 0.2em`–`0.3em`), color `soft`. Separate parts with a spaced slash: `THURSDAY / NOV 23`, `PAPER SIGNAL / LIGHT`, `4 SWATCHES`. Web: `IBM Plex Mono` or `JetBrains Mono` (fallback `ui-monospace, monospace`).
- **Numbers and screen titles:** **dot-matrix** — each character is a 5×7 grid of round dots (dot radius = 0.42 × dot spacing). Use for clocks, temperatures, scores, counts, money, and big screen titles like `PALETTE`. Clock colon in orange. Don't download a dot font; draw the dots (see `dot-matrix.js`, which has the exact glyph shapes from the apps). Sculpted Dark may use thin numerals instead.
- Card titles: medium weight, sentence case, followed by a small `›` at the right edge.

## Shapes and surfaces

- **Cards** are pieces of thick paper: radius **14–20px** (phones/desktop 14, TV 20), vertical gradient `card-hi → card → card-lo`, a hairline light edge on top (`inset 0 1px 0 rgba(255,255,255,0.9)`), and a soft warm shadow (`0 2px 6px rgba(90,75,60,0.14)`, bigger on TV). Never flat boxes with grey borders.
- **Discs and spheres:** round paper objects with a top-left highlight and a soft shadow below (radial gradient `#FFFFFF → #F8F4EE → #E8E0D4 → #CFC5B6`, highlight at about 30% left / 38% up). Used for icon buttons, swatches, planets in "orbit" layouts, the mic button.
- **Rings:** progress shown as a ring of rounded paper segments with small gaps; lit segments orange, unlit `segment-off`. Optional paper disc in the middle with the number or name.
- **Pills:** fully rounded (`999px`). Primary action = orange pill, white text, an icon on the left (e.g. `→ Open palette`). Secondary = paper pill.
- **Selected/focused item:** orange 1.5–2px outline plus a soft orange glow — or, on TV tabs, a dark ink pill with white bold text (Jon wants focus easy to see from the couch).
- **Icons:** thin line icons in `ink`, inside paper discs. 3D sculpted paper illustrations (cloud + sun, record, books, floor plan) for large tiles.
- **Close button on windows:** an orange dot.
- **Spacing:** generous. Lots of paper showing. Grids of equal cards with even gaps (≈16–24px).
- Small section headers look like `SAVED PALETTES` on the left and `See all ›` on the right, sometimes with a thin rule filling the gap.

## Rules

**Do**
- Keep one orange focal point per view (the most important action, the live thing, the "now").
- Use dot-matrix for any number someone should read at a glance.
- Use warm browns for shadows and rules.
- Make text large and high-contrast enough for a TV across the room or a phone held at arm's length. Prefer big tap targets and buttons over typing.
- Write labels in plain words.

**Don't**
- No pure white `#FFFFFF` pages or pure black `#000000` text on light theme.
- No blue links, no default Material/Bootstrap look, no gradients except the soft paper light.
- No more than one strong accent color. Don't make everything orange.
- No glassy blur, neon, or heavy borders.
- Don't invent fake data and present it as real.

## Device notes

- **Web/HTML:** link `tokens.css`, use `dot-matrix.js` for numbers. Must work at phone width.

## Quick self-check before finishing

1. Background warm paper, not white? 2. Cards look embossed (gradient + light edge + warm shadow)? 3. Labels mono, uppercase, spaced, soft color? 4. Key numbers dot-matrix? 5. Exactly one orange focal point? 6. Looks like it sits next to `boards/tv-home.jpg`?
