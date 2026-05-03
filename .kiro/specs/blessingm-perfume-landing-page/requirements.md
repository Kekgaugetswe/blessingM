# Requirements Document

## Introduction

BlessingM is a perfume brand landing page that replaces the existing MusiqHeart DJ/music website. The transformation repurposes the current HTML/CSS/JS codebase into an elegant, luxury-focused single-page experience designed to showcase the BlessingM perfume, communicate its brand identity, and drive purchase or inquiry conversions. The existing dark aesthetic and component-based architecture (navbar, footer, dynamic content loading) will be retained and restyled to suit a premium fragrance brand.

## Glossary

- **BlessingM**: The perfume brand and product being showcased on the landing page.
- **Landing_Page**: The single-page website (index.html) that serves as the primary web presence for BlessingM.
- **Hero_Section**: The full-width introductory section at the top of the Landing_Page featuring the brand name, tagline, and primary call-to-action.
- **Scent_Profile_Section**: The section describing the fragrance notes (top, middle, base) of BlessingM.
- **Story_Section**: The section communicating the brand origin, inspiration, and values behind BlessingM.
- **Gallery_Section**: The visual showcase section displaying product and lifestyle imagery.
- **CTA_Button**: A call-to-action button that directs the visitor toward a purchase or inquiry action.
- **Navbar**: The top navigation component loaded dynamically from components/navbar.html.
- **Footer**: The bottom component loaded dynamically from components/footer.html.
- **Visitor**: A person browsing the BlessingM Landing_Page.

---

## Requirements

### Requirement 1: Brand Identity Transformation

**User Story:** As a brand owner, I want the website to fully reflect the BlessingM perfume brand, so that visitors immediately understand this is a luxury fragrance product and not a DJ/music service.

#### Acceptance Criteria

1. THE Landing_Page SHALL display "BlessingM" as the primary brand name in the Navbar logo, replacing "MusiqHeart".
2. THE Landing_Page SHALL remove all DJ, music, and MusiqHeart-specific content including DJ set cards, remix sections, appreciation mix carousels, and YouTube embeds.
3. THE Footer SHALL display "© 2025 BlessingM" replacing the MusiqHeart copyright text.
4. THE Landing_Page SHALL update the HTML `<title>` tag to "BlessingM | Luxury Perfume".
5. THE Navbar SHALL remove the "DJ Sets", "Lessons", and "Hire & Filming" navigation links and replace them with perfume-relevant navigation links (e.g., "Our Scent", "Story", "Gallery", "Contact").

---

### Requirement 2: Hero Section

**User Story:** As a Visitor, I want to see a compelling hero section when I first land on the page, so that I am immediately drawn into the BlessingM brand experience.

#### Acceptance Criteria

1. THE Hero_Section SHALL display the brand name "BlessingM" as the primary heading.
2. THE Hero_Section SHALL display a tagline that communicates the essence of the perfume (e.g., "Wear Your Blessing").
3. THE Hero_Section SHALL contain a CTA_Button that scrolls the Visitor to the purchase or inquiry section of the Landing_Page.
4. WHEN the Visitor hovers over the CTA_Button, THE CTA_Button SHALL change its visual appearance to indicate interactivity.
5. THE Hero_Section SHALL use a full-viewport-height layout so that it occupies the entire visible screen on load.

---

### Requirement 3: Scent Profile Section

**User Story:** As a Visitor, I want to read about the fragrance notes of BlessingM, so that I can understand what the perfume smells like before purchasing.

#### Acceptance Criteria

1. THE Scent_Profile_Section SHALL display the perfume's top notes, middle (heart) notes, and base notes as distinct, labelled items.
2. THE Scent_Profile_Section SHALL present each note category with a descriptive label and at least one example ingredient.
3. THE Scent_Profile_Section SHALL use a card or grid layout consistent with the existing `.grid` CSS pattern.
4. WHEN the Visitor hovers over a scent note card, THE Scent_Profile_Section SHALL apply a subtle visual highlight effect to that card.

---

### Requirement 4: Brand Story Section

**User Story:** As a Visitor, I want to learn the story and inspiration behind BlessingM, so that I feel an emotional connection to the brand before making a purchase decision.

#### Acceptance Criteria

1. THE Story_Section SHALL display a heading titled "Our Story" or equivalent brand-appropriate title.
2. THE Story_Section SHALL contain a paragraph of brand narrative text describing the inspiration, origin, or values of BlessingM.
3. THE Story_Section SHALL be visually distinct from adjacent sections through spacing, background contrast, or typographic treatment.

---

### Requirement 5: Product Gallery Section

**User Story:** As a Visitor, I want to see images of the BlessingM perfume bottle and lifestyle photography, so that I can visualise the product and its aesthetic.

#### Acceptance Criteria

1. THE Gallery_Section SHALL display at least one product image of the BlessingM perfume bottle.
2. THE Gallery_Section SHALL use a responsive grid layout that adapts to both desktop and mobile screen widths.
3. WHEN a Gallery_Section image fails to load, THE Gallery_Section SHALL display a styled placeholder so that the layout is not broken.
4. THE Gallery_Section SHALL include descriptive `alt` text on all images for accessibility compliance.

---

### Requirement 6: Contact / Purchase Call-to-Action Section

**User Story:** As a Visitor, I want a clear way to purchase or enquire about BlessingM, so that I can take action after being convinced by the page content.

#### Acceptance Criteria

1. THE Landing_Page SHALL include a dedicated contact or purchase section positioned near the bottom of the page.
2. THE Landing_Page SHALL display at least one contact method (e.g., email address, WhatsApp link, or social media link) for purchase enquiries.
3. WHEN the Visitor clicks a contact link, THE Landing_Page SHALL open the contact method in a new browser tab or the appropriate native application.
4. THE Landing_Page SHALL include a CTA_Button in this section with a label such as "Order Now" or "Get Yours".

---

### Requirement 7: Visual Design and Theme

**User Story:** As a brand owner, I want the landing page to have a luxury perfume aesthetic, so that the visual design reinforces the premium positioning of BlessingM.

#### Acceptance Criteria

1. THE Landing_Page SHALL retain the dark background (`#000` or near-black) as the base colour to maintain the existing luxury feel.
2. THE Landing_Page SHALL replace the red (`#e50914`) accent colour with a gold or warm-tone accent colour (e.g., `#c9a84c` or equivalent) appropriate for a luxury fragrance brand.
3. THE Landing_Page SHALL use elegant, serif or refined sans-serif typography for headings to convey luxury.
4. THE Landing_Page SHALL maintain smooth CSS transitions and hover effects consistent with the existing codebase patterns.
5. THE Landing_Page SHALL be fully responsive and render correctly on viewport widths from 320px to 1440px.

---

### Requirement 8: Navigation and Page Structure

**User Story:** As a Visitor, I want to navigate smoothly between sections of the landing page, so that I can explore the content without confusion.

#### Acceptance Criteria

1. THE Navbar SHALL use smooth scroll anchor links to navigate to named sections within the Landing_Page.
2. THE Landing_Page SHALL preserve the existing dynamic component-loading pattern (utils.js) for the Navbar and Footer.
3. WHEN the Visitor is on a mobile viewport (width ≤ 768px), THE Navbar SHALL display a responsive layout that does not overflow or obscure page content.

---

### Requirement 9: Performance and Accessibility

**User Story:** As a Visitor, I want the landing page to load quickly and be accessible, so that I have a smooth experience regardless of my device or ability.

#### Acceptance Criteria

1. THE Landing_Page SHALL load without JavaScript errors in the browser console on initial page load.
2. THE Landing_Page SHALL include a `lang` attribute on the `<html>` element set to the appropriate language code.
3. THE Landing_Page SHALL provide `alt` attributes on all `<img>` elements.
4. THE Landing_Page SHALL use semantic HTML elements (`<section>`, `<nav>`, `<footer>`, `<h1>`–`<h3>`) to structure content.
5. IF an external font fails to load, THEN THE Landing_Page SHALL fall back to a system serif or sans-serif font so that text remains readable.
