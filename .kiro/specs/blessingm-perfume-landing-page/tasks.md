# Implementation Plan: BlessingM Perfume Landing Page

## Overview

Transform the existing MusiqHeart DJ/music website into a luxury perfume landing page for the BlessingM brand. The implementation follows an in-place refactor approach: CSS custom properties and gold accent theme first, then component updates (navbar, footer), followed by the full index.html section rewrite, main.js simplification, and finally testing setup with property-based tests. Each step builds incrementally on the previous one so the site remains functional throughout.

## Tasks

- [x] 1. Refactor CSS with custom properties and gold accent theme
  - [x] 1.1 Add CSS custom properties and update colour palette
    - Add `:root` block with `--accent`, `--accent-hover`, `--accent-glow`, `--accent-glow-light`, `--bg-primary`, `--bg-secondary`, `--bg-story`, `--text-primary`, `--text-muted`, `--font-heading`, `--font-body`
    - Replace all `#e50914` colour values with the corresponding `var(--accent*)` custom properties
    - Update `body { font-family }` to use `var(--font-body)`
    - Add `h1, h2, h3 { font-family: var(--font-heading) }` rule for serif headings
    - Update `.navbar .logo`, `.navbar a:hover`, `.hero`, `.hero::before`, `.hero h1`, `.cta`, `.cta:hover`, `.card:hover` to use gold accent variables
    - _Requirements: 7.1, 7.2, 7.3, 7.4_

  - [x] 1.2 Add new CSS sections for perfume landing page layout
    - Add `.hero` full-viewport-height styles (`min-height: 100vh`, flexbox centering)
    - Add `#story` distinct background with gold border accents
    - Add `.gallery-placeholder` styles for image fallback placeholders
    - Add `.scent-card` hover highlight effect
    - Add `#contact` section styles
    - Add `@media (max-width: 768px)` responsive navbar rules (`flex-wrap`, reduced font size, gap)
    - _Requirements: 2.5, 3.4, 4.3, 5.3, 7.5, 8.3_

- [x] 2. Update navbar and footer components
  - [x] 2.1 Update `components/navbar.html` with BlessingM branding
    - Replace logo text from `🎧 MusiqHeart` to `BlessingM`
    - Replace nav links with anchor links: `Our Scent (#scent)`, `Story (#story)`, `Gallery (#gallery)`, `Contact (#contact)`
    - _Requirements: 1.1, 1.5, 8.1_

  - [x] 2.2 Update `components/footer.html` with BlessingM copyright
    - Replace footer text with `© 2025 BlessingM. All rights reserved.`
    - _Requirements: 1.3_

- [x] 3. Transform `index.html` into BlessingM landing page
  - [x] 3.1 Update HTML head and add Cormorant Garamond font
    - Change `<title>` to `BlessingM | Luxury Perfume`
    - Add Google Fonts link for `Cormorant Garamond` (weights 300, 400, 600) alongside existing Poppins
    - Ensure `<html lang="en">` is present
    - _Requirements: 1.4, 7.3, 9.2_

  - [x] 3.2 Replace body content with five perfume sections
    - Remove all DJ-specific sections (`#djSets`, `#appreciationMix`, `#featuredRemix`)
    - Add Hero section (`#hero`): `<h1>BlessingM</h1>`, tagline paragraph, CTA anchor linking to `#contact`
    - Add Scent Profile section (`#scent`): heading "The Scent", three cards (Top Notes, Heart Notes, Base Notes) in a `.grid` layout, each with label and example ingredients
    - Add Story section (`#story`): heading "Our Story", brand narrative paragraph
    - Add Gallery section (`#gallery`): heading "Gallery", responsive `.grid` with at least one product image, `alt` text on all images, `onerror` fallback handlers with `.gallery-placeholder` siblings
    - Add Contact section (`#contact`): heading "Get Yours", email (`mailto:`) and WhatsApp (`https://wa.me/`) links with `target="_blank" rel="noopener noreferrer"`, CTA button labelled "Order Now" or similar
    - Use semantic HTML elements (`<section>`, `<nav>`, `<footer>`, `<h1>`–`<h3>`)
    - _Requirements: 1.2, 2.1, 2.2, 2.3, 2.4, 3.1, 3.2, 3.3, 4.1, 4.2, 5.1, 5.2, 5.3, 5.4, 6.1, 6.2, 6.3, 6.4, 9.3, 9.4_

- [x] 4. Rewrite `scripts/main.js` for smooth scroll only
  - Remove all DJ data-fetching logic (`fetch`, `renderSets`, `renderCarousel`)
  - Add `DOMContentLoaded` listener that attaches smooth-scroll behaviour to all `a[href^="#"]` anchor links with `e.preventDefault()` and null-check before `scrollIntoView`
  - _Requirements: 8.1, 8.2, 9.1_

- [x] 5. Checkpoint — Verify site renders correctly
  - Ensure all sections render without JavaScript errors
  - Verify navbar and footer load dynamically via `utils.js`
  - Confirm anchor links scroll smoothly to target sections
  - Ensure all tests pass, ask the user if questions arise.

- [x] 6. Set up testing framework and write property-based tests
  - [x] 6.1 Set up Vitest with jsdom and fast-check
    - Initialise `package.json` if not present
    - Install `vitest`, `jsdom`, and `fast-check` as dev dependencies
    - Configure Vitest with jsdom environment
    - Create test helper that loads `index.html` into jsdom for DOM-based tests
    - _Requirements: 9.1_

  - [x] 6.2 Write property test: All content images have non-empty alt text
    - **Property 1: All content images have non-empty alt text**
    - Use `fc.constantFrom` over all `<img>` elements, assert `alt` is present and non-empty
    - **Validates: Requirements 5.4, 9.3**

  - [ ]* 6.3 Write property test: Gallery images have error fallback handlers
    - **Property 2: Gallery images have error fallback handlers**
    - Use `fc.constantFrom` over `#gallery img` elements, assert `onerror` attribute is present
    - **Validates: Requirements 5.3**

  - [ ]* 6.4 Write property test: Contact links open via appropriate scheme or new tab
    - **Property 3: Contact links open via appropriate scheme or new tab**
    - Use `fc.constantFrom` over `#contact a` elements, assert `mailto:`/`wa.me` scheme or `target="_blank"`
    - **Validates: Requirements 6.3**

  - [ ]* 6.5 Write property test: Navbar anchor links resolve to existing section IDs
    - **Property 5: Navbar anchor links resolve to existing section IDs**
    - Use `fc.constantFrom` over `.navbar a[href^="#"]`, assert each fragment ID exists in the DOM
    - **Validates: Requirements 8.1**

  - [ ]* 6.6 Write unit tests for static content requirements
    - Test `<title>` equals "BlessingM | Luxury Perfume"
    - Test navbar logo contains "BlessingM"
    - Test no DJ-specific elements present (`#djSets`, `.video-wrapper iframe`)
    - Test footer contains "© 2025 BlessingM"
    - Test hero heading, tagline, and CTA exist
    - Test three scent note cards with correct labels
    - Test story section heading and paragraph are non-empty
    - Test gallery has at least one image
    - Test contact section has email/WhatsApp link and CTA button
    - Test `lang` attribute is set on `<html>`
    - Test semantic elements (`<section>`, `<nav>`, `<footer>`) are present
    - **Validates: Requirements 1.1, 1.2, 1.3, 1.4, 1.5, 2.1, 2.2, 2.3, 3.1, 3.2, 4.1, 4.2, 5.1, 6.1, 6.2, 6.4, 9.2, 9.4**

- [x] 7. Final checkpoint — Ensure all tests pass
  - Run full test suite and confirm all tests pass
  - Ensure all tests pass, ask the user if questions arise.

## Notes

- Tasks marked with `*` are optional and can be skipped for faster MVP
- Each task references specific requirements for traceability
- Checkpoints ensure incremental validation
- Property tests validate universal correctness properties from the design document
- Unit tests validate specific examples and edge cases
- `utils.js` is intentionally unchanged — the existing component loader works as-is
- Property 4 (horizontal overflow at viewport widths 320–1440px) requires Playwright and is excluded from the jsdom test suite; it can be added as a follow-up with a browser-based test runner
- Existing files `teaching.html`, `hire-filming.html`, and `data/*.json` are left in place but unlinked — they can be cleaned up separately
