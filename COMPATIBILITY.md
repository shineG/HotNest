# Browser compatibility notes

This site is built for **broad downward compatibility**, not bleeding-edge browsers only.

## Technology choices

| Choice | Rationale |
|--------|-----------|
| **Plain CSS** (no Tailwind) | Final output is readable HTML + CSS. No build-time utility framework. Autoprefixer adds vendor prefixes. |
| **Astro static output** | Pages ship as HTML. Almost no client JavaScript. |
| **ES5 `site.js`** | Header scroll, mobile menu, and fade-in work in Firefox 78.15 ESR. |
| **Flexbox + transforms** | Layout and animations use features supported in Firefox 78 (2020) and older WebKit. |
| **No** `:has()`, container queries, `backdrop-filter`, CSS nesting (native), or View Transitions API | These break or behave inconsistently on older engines. |

## CSS features used

- Flexbox (`display: flex`)
- `transform` + `opacity` for animations (GPU-friendly)
- `transition` with `-webkit-` prefixes where needed
- `@media` queries for responsive layout
- `IntersectionObserver` for scroll fade-in (with fallback: show all content if unavailable)

## Primary compatibility target

**macOS 10.9.5 Mavericks + Firefox 78.15.0 ESR**

This is the confirmed minimum environment for Hotnest. All layout, interaction, and animation on this site are chosen to work in Firefox 78:

| Feature | Firefox 78 |
|---------|--------------|
| Flexbox + `gap` | Yes |
| `transform` / `opacity` / `transition` | Yes |
| `@keyframes` | Yes |
| CSS custom properties (`:root`) | Yes |
| `IntersectionObserver` | Yes |
| `:has()` | No (not used on this site) |
| Scroll-driven animations (`animation-timeline`) | No (not used) |
| View Transitions API | No (not used) |

Run a final check in **78.15.0esr** on 10.9.5 before DNS cutover.

For IE11 (listed in `.browserslistrc` as a soft target), flexbox works but some visual polish may differ; core content and navigation remain usable.

## GSAP vs CSS — what can CSS alone do?

**Not all GSAP effects can be replaced with CSS.** GSAP is a JavaScript timeline engine; CSS handles declarative, repeating motion well.

| Effect type | CSS only? | Notes |
|-------------|-----------|--------|
| Fade / slide in on scroll | Yes | This site uses `opacity` + `transform` + `IntersectionObserver` (with no-JS fallback). |
| Hover / button states | Yes | `transition` on colors, borders, background. |
| Sticky header style change | Yes | Scroll listener + class toggle (current `site.js`). |
| Simple stagger (A then B then C) | Partly | `animation-delay` per element; rigid, not interactive. |
| Complex timelines (many steps, seek, pause) | No | GSAP strength; needs JS. |
| ScrollTrigger (pin, scrub, parallax choreography) | Partly / No | True scrubbed parallax and pinned sequences are awkward in pure CSS; FF78 also lacks modern scroll-linked CSS. |
| SVG morph, physics, drag | No | Requires GSAP or other JS libraries. |
| Text split / per-character motion | No | Typically JS (GSAP SplitText, etc.). |

For a **corporate static site** like Hotnest (hero, sections, logo wall, timeline), the original Wix-style motion is mostly **fade-in, scroll reveal, header transition** — **CSS + a small script is enough** and keeps the bundle tiny.

If you later need GSAP-level motion, prefer **GSAP 3 core** (single file, FF78-safe) only for that section — not the whole site — and keep CSS for everything else.

## Animations without JavaScript

If JavaScript is disabled, content remains fully readable. Fade-in elements use a progressive enhancement pattern: without `IntersectionObserver`, the script shows all sections immediately.
