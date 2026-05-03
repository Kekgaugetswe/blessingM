# Design Document

## BlessingM Perfume Landing Page

---

## Overview

This design transforms the existing MusiqHeart DJ/music website into a luxury perfume landing page for the BlessingM brand. The approach is a targeted in-place refactor: the existing HTML/CSS/JS architecture is preserved and restyled rather than rebuilt from scratch. The component-based loading pattern (`utils.js`), dark background aesthetic, grid/card layout system, and CSS transition patterns are all retained — only the content, colour palette, typography, and copy are replaced.

The result is a single-page experience with five primary sections: Hero, Scent Profile, Story, Gallery, and Contact. Navigation is handled via smooth-scroll anchor links in the navbar. No backend, database, or build tooling is required — the site remains a static HTML/CSS/JS deployment.

### Key Design Decisions

1. **Gold accent (`#c9a84c`) replaces red (`#e50914`)** — gold communicates luxury and warmth appropriate for a premium fragrance brand, while maintaining the high-contrast dark-background aesthetic.
2. **Cormorant Garamond for headings** — a refined, elegant serif that signals luxury without sacrificing legibility. Poppins is retained as the body/UI font for readability.
3. **`main.js` is rewritten** — all DJ-specific data fetching and rendering logic is removed. The new `main.js` contains only smooth-scroll initialisation.
4. **Placeholder images** — since no real product photography exists yet, the gallery uses styled placeholder `div` elements with CSS backgrounds. These are designed to be swapped out by replacing `src` attributes.
5. **No new pages** — `teaching.html` and `hire-filming.html` are left in place but unlinked. They can be deleted separately once confirmed safe.
6. **CSS custom properties** — the accent colour and font stacks are promoted to CSS custom properties (`--accent`, `--font-heading`) to make future brand updates a single-line change.

---

## Architecture

The site remains a static, zero-build-step architecture. All files are served directly from the filesystem or a static host (e.g. GitHub Pages, given the existing `CNAME` file).

```
index.html                  ← Single page, all sections
components/
  navbar.html               ← Dynamically injected navbar
  footer.html               ← Dynamically injected footer
scripts/
  utils.js                  ← Component loader (unchanged)
  main.js                   ← Rewritten: smooth scroll only
styles/
  style.css                 ← Refactored: gold accent, serif headings, new sections
assets/
  images/                   ← Placeholder images (existing files retained as fallbacks)
data/                       ← All JSON files become unused (can be deleted later)
```

### Data Flow

```
Browser loads index.html
  └─ <link> loads styles/style.css
  └─ DOMContentLoaded fires
       └─ utils.js: loadComponent("navbar", "components/navbar.html")
       └─ utils.js: loadComponent("footer", "components/footer.html")
       └─ main.js: attaches smooth-scroll listeners to CTA buttons
```

No external API calls. No JSON data fetching. No dynamic card rendering.

---

## Components and Interfaces

### 1. `index.html` — Page Shell

Replaces all DJ-specific sections with five perfume sections. Retains the `#navbar` and `#footer` injection points for `utils.js`.

**Section structure:**

| Section ID     | Heading           | Purpose                                      |
|----------------|-------------------|----------------------------------------------|
| `#hero`        | BlessingM         | Brand introduction, tagline, primary CTA     |
| `#scent`       | The Scent         | Top / heart / base note cards                |
| `#story`       | Our Story         | Brand narrative paragraph                    |
| `#gallery`     | Gallery           | Product and lifestyle image grid             |
| `#contact`     | Get Yours         | Contact methods, order CTA                   |

**HTML `<head>` changes:**
- `<title>` → `BlessingM | Luxury Perfume`
- `<html lang="en">` — already correct, retained
- Google Fonts: add `Cormorant+Garamond:wght@300;400;600` alongside Poppins
- Remove no other `<link>` or `<meta>` tags

### 2. `components/navbar.html`

**Changes:**
- Logo: `🎧 MusiqHeart` → `✦ BlessingM` (or a text-only logo without emoji for cleaner luxury feel — see CSS note)
- Nav links: replace with four anchor links targeting page sections

```html
<nav class="navbar">
  <div class="logo">BlessingM</div>
  <ul>
    <li><a href="#scent">Our Scent</a></li>
    <li><a href="#story">Story</a></li>
    <li><a href="#gallery">Gallery</a></li>
    <li><a href="#contact">Contact</a></li>
  </ul>
</nav>
```

**Mobile behaviour:** At ≤768px, the `<ul>` wraps below the logo using `flex-wrap: wrap` and reduced font size. No hamburger menu is required at this stage — the four short links fit on a second line without overflow.

### 3. `components/footer.html`

**Changes:**
- Copyright text: `© 2025 MusiqHeart | Created with ❤️ by MusiqHeart` → `© 2025 BlessingM. All rights reserved.`

### 4. `scripts/main.js` — Rewritten

All DJ data-fetching and rendering functions are removed. The new file contains only:

```javascript
document.addEventListener("DOMContentLoaded", () => {
  // Smooth scroll for CTA buttons targeting section anchors
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({ behavior: "smooth" });
      }
    });
  });
});
```

> **Note:** `utils.js` is unchanged. It continues to load navbar and footer components via `fetch`.

### 5. `scripts/utils.js` — Unchanged

No modifications required. The `loadComponent` function and `DOMContentLoaded` listener remain as-is.

### 6. `styles/style.css` — Refactored

See the Data Models section for the full CSS change specification.

---

## Data Models

### CSS Custom Properties

Introduced at the `:root` level to centralise brand tokens:

```css
:root {
  --accent: #c9a84c;
  --accent-hover: #a8893a;
  --accent-glow: rgba(201, 168, 76, 0.35);
  --accent-glow-light: rgba(201, 168, 76, 0.25);
  --bg-primary: #000;
  --bg-secondary: #111;
  --bg-story: #0a0a0a;
  --text-primary: #fff;
  --text-muted: #ccc;
  --font-heading: 'Cormorant Garamond', Georgia, serif;
  --font-body: 'Poppins', sans-serif;
}
```

### CSS Changes by Rule

| Selector / Property         | Old Value                        | New Value                              |
|-----------------------------|----------------------------------|----------------------------------------|
| `body { font-family }`      | `'Poppins', sans-serif`          | `var(--font-body)` (Poppins retained)  |
| `h1, h2, h3 { font-family }`| (inherited Poppins)              | `var(--font-heading)` (Cormorant)      |
| `.navbar .logo { color }`   | `#e50914`                        | `var(--accent)`                        |
| `.navbar a:hover { color }` | `#e50914`                        | `var(--accent)`                        |
| `.hero { background }`      | `radial-gradient(...#e50914...)` | `radial-gradient(...var(--accent-glow-light)...)` |
| `.hero::before { background }`| `rgba(229,9,20,0.35)`          | `rgba(201,168,76,0.35)`                |
| `.hero h1 { text-shadow }`  | `rgba(229,9,20,0.6)`             | `rgba(201,168,76,0.6)`                 |
| `.cta { background }`       | `#e50914`                        | `var(--accent)`                        |
| `.cta:hover { background }` | `#b00710`                        | `var(--accent-hover)`                  |
| `.card:hover { box-shadow }`| `rgba(229,9,20,0.25)`            | `var(--accent-glow)`                   |

### New CSS Sections Added

**Hero — full viewport height:**
```css
.hero {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
```

**Story section — distinct background:**
```css
#story {
  background: var(--bg-story);
  border-top: 1px solid rgba(201, 168, 76, 0.15);
  border-bottom: 1px solid rgba(201, 168, 76, 0.15);
}
```

**Gallery placeholder images:**
```css
.gallery-placeholder {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #1a1a1a 0%, #2a2510 50%, #1a1a1a 100%);
  border-radius: 12px 12px 0 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: var(--accent);
  font-size: 2rem;
  letter-spacing: 0.1em;
}
```

**Mobile navbar (≤768px):**
```css
@media (max-width: 768px) {
  .navbar {
    flex-wrap: wrap;
    gap: 0.5rem;
  }
  .navbar ul {
    gap: 1rem;
    font-size: 0.85rem;
  }
}
```

### Scent Note Data (Static HTML)

The three scent note cards are hardcoded in `index.html` (no JSON required):

| Card       | Label        | Ingredient Example         |
|------------|--------------|----------------------------|
| Top Notes  | Top Notes    | Bergamot, Fresh Citrus     |
| Heart Notes| Heart Notes  | Rose, Jasmine              |
| Base Notes | Base Notes   | Sandalwood, Amber, Musk    |

### Gallery Image Data (Static HTML)

Four placeholder cards in the gallery grid. Each `<img>` has:
- A `src` pointing to a placeholder (existing asset or CSS background fallback)
- A descriptive `alt` attribute
- An `onerror` handler that swaps to a styled placeholder div

```html
<img
  src="assets/images/perfume-bottle.jpg"
  alt="BlessingM perfume bottle on a dark surface"
  onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
/>
<div class="gallery-placeholder" style="display:none;">✦</div>
```

### Contact Data (Static HTML)

| Method    | Value                          | Link scheme                        |
|-----------|--------------------------------|------------------------------------|
| Email     | hello@blessingm.com (placeholder) | `mailto:hello@blessingm.com`    |
| WhatsApp  | +27 XX XXX XXXX (placeholder)  | `https://wa.me/27XXXXXXXXX`        |

Both links use `target="_blank" rel="noopener noreferrer"`.

---

## Correctness Properties

*A property is a characteristic or behavior that should hold true across all valid executions of a system — essentially, a formal statement about what the system should do. Properties serve as the bridge between human-readable specifications and machine-verifiable correctness guarantees.*

This feature is a static HTML/CSS/JS landing page. Most acceptance criteria are static content checks (EXAMPLE or SMOKE). However, several criteria express universal requirements that hold across all instances of a given element type — these are suitable for property-based testing using a DOM-querying test runner (e.g. Vitest + jsdom or Playwright).

### Property 1: All content images have non-empty alt text

*For any* `<img>` element rendered on the BlessingM landing page that serves as content (not purely decorative), the `alt` attribute SHALL be present and non-empty.

**Validates: Requirements 5.4, 9.3**

---

### Property 2: Gallery images have error fallback handlers

*For any* `<img>` element within the Gallery section, an `onerror` handler SHALL be present that prevents layout breakage when the image fails to load.

**Validates: Requirements 5.3**

---

### Property 3: Contact links open via appropriate scheme or new tab

*For any* anchor element (`<a>`) within the contact section, the element SHALL either have `target="_blank"` set (for external URLs) or use an appropriate href scheme (`mailto:`, `https://wa.me/`) that opens in the native application.

**Validates: Requirements 6.3**

---

### Property 4: Page layout does not overflow horizontally at any supported viewport width

*For any* viewport width in the range [320px, 1440px], the page body's `scrollWidth` SHALL NOT exceed its `clientWidth`, ensuring no horizontal scrollbar appears and no content is clipped.

**Validates: Requirements 7.5, 8.3**

---

### Property 5: Navbar anchor links resolve to existing section IDs

*For any* anchor link (`<a href="#...">`) in the navbar, the fragment identifier SHALL correspond to an element `id` that exists in the rendered DOM of `index.html`.

**Validates: Requirements 8.1**

---

## Error Handling

### Image Load Failures

Gallery images use an `onerror` inline handler to gracefully degrade:

```html
onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
```

The sibling `.gallery-placeholder` div is hidden by default and revealed on error. This ensures the grid layout is never broken by a missing image file.

### Component Load Failures

`utils.js` already wraps `fetch` calls in `try/catch` and logs errors to the console. No change is needed. If `navbar.html` or `footer.html` fails to load, the `#navbar` and `#footer` divs remain empty — the page remains functional without navigation.

### Font Load Failures

The CSS font stack for headings is:
```css
font-family: 'Cormorant Garamond', Georgia, serif;
```

If the Google Fonts CDN is unavailable, headings fall back to `Georgia` (a widely available serif) and then to the browser's generic `serif` family. Body text falls back from `Poppins` to `sans-serif`.

### JavaScript Errors

The new `main.js` uses `document.querySelectorAll` with a `forEach` loop and a null-check (`if (target)`) before calling `scrollIntoView`. This prevents errors if an anchor's target section is missing. `utils.js` is unchanged and already handles fetch errors gracefully.

---

## Testing Strategy

### Overview

This is a static HTML/CSS/JS site with no build step, no framework, and no server-side logic. The testing strategy uses lightweight DOM-based tests that can run in a jsdom environment (Vitest) or a real browser (Playwright).

**PBT applicability assessment:** Most acceptance criteria are static content checks (EXAMPLE/SMOKE) that do not benefit from property-based testing. However, five criteria express universal requirements over collections of DOM elements or a range of viewport widths — these are suitable for property-based testing using [fast-check](https://github.com/dubzzz/fast-check) with Vitest + jsdom (for DOM element properties) and Playwright (for viewport-width properties).

### Unit / Example Tests

These verify specific, concrete requirements:

| Test | Requirement |
|------|-------------|
| `<title>` equals "BlessingM \| Luxury Perfume" | 1.4 |
| Navbar logo text contains "BlessingM" | 1.1 |
| No DJ-specific elements present (#djSets, .video-wrapper iframe) | 1.2 |
| Footer contains "© 2025 BlessingM" | 1.3 |
| Navbar links are: Our Scent, Story, Gallery, Contact | 1.5 |
| `.hero h1` contains "BlessingM" | 2.1 |
| `.hero p` is non-empty | 2.2 |
| Hero CTA button exists and has href targeting `#contact` | 2.3 |
| Three scent note cards exist with labels Top / Heart / Base | 3.1, 3.2 |
| Story section heading and paragraph are non-empty | 4.1, 4.2 |
| At least one `<img>` in gallery section | 5.1 |
| Contact section exists in DOM | 6.1 |
| At least one `mailto:` or `wa.me` link in contact section | 6.2 |
| Contact CTA button label contains "Order" or "Yours" | 6.4 |
| `document.documentElement.lang` is set | 9.2 |
| `<section>`, `<nav>`, `<footer>`, `<h1>` elements present | 9.4 |

### Smoke Tests

These verify CSS configuration and one-time setup:

| Test | Requirement |
|------|-------------|
| `.hero` has `min-height: 100vh` in stylesheet | 2.5 |
| `.cta:hover` CSS rule changes background-color | 2.4 |
| `.card:hover` CSS rule changes box-shadow | 3.4 |
| Scent section uses `.grid` class | 3.3 |
| Story section has distinct background-color | 4.3 |
| Gallery uses `.grid` class | 5.2 |
| `body` background-color is `#000` | 7.1 |
| No `#e50914` colour value appears in stylesheet | 7.2 |
| Heading `font-family` includes a serif font | 7.3 |
| Interactive elements have `transition` property | 7.4 |
| `font-family` declarations include `serif` or `sans-serif` fallback | 9.5 |

### Property-Based Tests

Using **fast-check** with **Vitest + jsdom**. Each test runs a minimum of **100 iterations**.

**Tag format:** `Feature: blessingm-perfume-landing-page, Property {N}: {property_text}`

#### Property 1: All content images have non-empty alt text
```
// Feature: blessingm-perfume-landing-page, Property 1: All content images have non-empty alt text
fc.assert(fc.property(
  fc.constantFrom(...Array.from(document.querySelectorAll('img'))),
  (img) => img.alt !== undefined && img.alt.trim().length > 0
), { numRuns: 100 });
```

#### Property 2: Gallery images have error fallback handlers
```
// Feature: blessingm-perfume-landing-page, Property 2: Gallery images have error fallback handlers
fc.assert(fc.property(
  fc.constantFrom(...Array.from(document.querySelectorAll('#gallery img'))),
  (img) => typeof img.onerror === 'function' || img.getAttribute('onerror') !== null
), { numRuns: 100 });
```

#### Property 3: Contact links open via appropriate scheme or new tab
```
// Feature: blessingm-perfume-landing-page, Property 3: Contact links open via appropriate scheme or new tab
fc.assert(fc.property(
  fc.constantFrom(...Array.from(document.querySelectorAll('#contact a'))),
  (link) => {
    const href = link.getAttribute('href') || '';
    const isNativeScheme = href.startsWith('mailto:') || href.startsWith('https://wa.me/');
    const opensNewTab = link.getAttribute('target') === '_blank';
    return isNativeScheme || opensNewTab;
  }
), { numRuns: 100 });
```

#### Property 4: Page layout does not overflow horizontally at any supported viewport width
```
// Feature: blessingm-perfume-landing-page, Property 4: No horizontal overflow at any supported viewport width
// (Playwright test — runs in real browser)
fc.assert(fc.asyncProperty(
  fc.integer({ min: 320, max: 1440 }),
  async (width) => {
    await page.setViewportSize({ width, height: 800 });
    const overflow = await page.evaluate(
      () => document.body.scrollWidth <= document.body.clientWidth
    );
    return overflow;
  }
), { numRuns: 100 });
```

#### Property 5: Navbar anchor links resolve to existing section IDs
```
// Feature: blessingm-perfume-landing-page, Property 5: Navbar anchor links resolve to existing section IDs
fc.assert(fc.property(
  fc.constantFrom(...Array.from(document.querySelectorAll('.navbar a[href^="#"]'))),
  (link) => {
    const id = link.getAttribute('href').slice(1);
    return document.getElementById(id) !== null;
  }
), { numRuns: 100 });
```

### Integration Tests

| Test | Requirement |
|------|-------------|
| Page loads without console errors (Playwright) | 9.1 |
| `utils.js` is referenced in `index.html` and `loadComponent` is called for navbar and footer | 8.2 |

