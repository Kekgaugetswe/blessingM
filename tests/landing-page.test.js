import { describe, it, expect, beforeAll } from 'vitest';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import { JSDOM } from 'jsdom';
import fc from 'fast-check';

let document;

function loadPage() {
  const html = readFileSync(resolve(__dirname, '../index.html'), 'utf-8');
  const dom = new JSDOM(html);
  const doc = dom.window.document;

  // Inject navbar component (utils.js uses fetch which won't work in jsdom)
  const navbarHtml = readFileSync(resolve(__dirname, '../components/navbar.html'), 'utf-8');
  doc.getElementById('navbar').innerHTML = navbarHtml;

  // Inject footer component
  const footerHtml = readFileSync(resolve(__dirname, '../components/footer.html'), 'utf-8');
  doc.getElementById('footer').innerHTML = footerHtml;

  return { dom, document: doc };
}

beforeAll(() => {
  const page = loadPage();
  document = page.document;
});

// ============================================================
// Property-Based Tests
// ============================================================

describe('Property-Based Tests', () => {
  // Feature: blessingm-perfume-landing-page, Property 1: All content images have non-empty alt text
  it('Property 1: All content images have non-empty alt text', () => {
    /** Validates: Requirements 5.4, 9.3 */
    const images = Array.from(document.querySelectorAll('img'));
    expect(images.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.constantFrom(...images),
        (img) => {
          const alt = img.getAttribute('alt');
          return alt !== null && alt.trim().length > 0;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: blessingm-perfume-landing-page, Property 2: Gallery images have error fallback handlers
  it('Property 2: Gallery images have error fallback handlers', () => {
    /** Validates: Requirements 5.3 */
    const galleryImages = Array.from(document.querySelectorAll('#gallery img'));
    expect(galleryImages.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.constantFrom(...galleryImages),
        (img) => {
          return img.getAttribute('onerror') !== null;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: blessingm-perfume-landing-page, Property 3: Contact links open via appropriate scheme or new tab
  it('Property 3: Contact links open via appropriate scheme or new tab', () => {
    /** Validates: Requirements 6.3 */
    const contactLinks = Array.from(document.querySelectorAll('#contact a'));
    expect(contactLinks.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.constantFrom(...contactLinks),
        (link) => {
          const href = link.getAttribute('href') || '';
          const isNativeScheme = href.startsWith('mailto:') || href.startsWith('https://wa.me/');
          const opensNewTab = link.getAttribute('target') === '_blank';
          return isNativeScheme || opensNewTab;
        }
      ),
      { numRuns: 100 }
    );
  });

  // Feature: blessingm-perfume-landing-page, Property 5: Navbar anchor links resolve to existing section IDs
  it('Property 5: Navbar anchor links resolve to existing section IDs', () => {
    /** Validates: Requirements 8.1 */
    const navLinks = Array.from(document.querySelectorAll('.navbar a[href^="#"]'));
    expect(navLinks.length).toBeGreaterThan(0);

    fc.assert(
      fc.property(
        fc.constantFrom(...navLinks),
        (link) => {
          const id = link.getAttribute('href').slice(1);
          return document.getElementById(id) !== null;
        }
      ),
      { numRuns: 100 }
    );
  });
});

// ============================================================
// Unit Tests
// ============================================================

describe('Unit Tests — Static Content', () => {
  it('Title equals "BlessingM | Luxury Perfume"', () => {
    expect(document.title).toBe('BlessingM | Luxury Perfume');
  });

  it('Navbar logo contains "BlessingM"', () => {
    const logo = document.querySelector('.navbar .logo');
    expect(logo).not.toBeNull();
    expect(logo.textContent).toContain('BlessingM');
  });

  it('No DJ-specific elements (#djSets, .video-wrapper iframe)', () => {
    expect(document.querySelector('#djSets')).toBeNull();
    expect(document.querySelector('.video-wrapper iframe')).toBeNull();
  });

  it('Footer contains "© 2025 BlessingM"', () => {
    const footer = document.querySelector('footer');
    expect(footer).not.toBeNull();
    expect(footer.textContent).toContain('© 2025 BlessingM');
  });

  it('Hero heading contains brand tagline', () => {
    const heroH1 = document.querySelector('#hero h1');
    expect(heroH1).not.toBeNull();
    expect(heroH1.textContent).toContain('Blessing');
  });

  it('Hero tagline is non-empty', () => {
    const heroP = document.querySelector('#hero p');
    expect(heroP).not.toBeNull();
    expect(heroP.textContent.trim().length).toBeGreaterThan(0);
  });

  it('Hero CTA exists with href="#contact"', () => {
    const cta = document.querySelector('#hero a.cta');
    expect(cta).not.toBeNull();
    expect(cta.getAttribute('href')).toBe('#contact');
  });

  it('Five product cards in collection section', () => {
    const cards = document.querySelectorAll('#scent .scent-card');
    expect(cards.length).toBe(5);

    const labels = Array.from(cards).map((c) => c.querySelector('h3').textContent.trim());
    expect(labels).toContain('Bombshell');
    expect(labels).toContain('Ombre Nomade');
    expect(labels).toContain("La Nuit De L'Homme");
    expect(labels).toContain('Oud Satin Mood');
    expect(labels).toContain('Aqua Vision');
  });

  it('Story section heading and paragraph are non-empty', () => {
    const heading = document.querySelector('#story h2');
    expect(heading).not.toBeNull();
    expect(heading.textContent.trim().length).toBeGreaterThan(0);

    const paragraph = document.querySelector('#story p');
    expect(paragraph).not.toBeNull();
    expect(paragraph.textContent.trim().length).toBeGreaterThan(0);
  });

  it('Gallery has at least one image', () => {
    const images = document.querySelectorAll('#gallery img');
    expect(images.length).toBeGreaterThanOrEqual(1);
  });

  it('Contact section exists', () => {
    const contact = document.querySelector('#contact');
    expect(contact).not.toBeNull();
  });

  it('Contact section has mailto or wa.me link', () => {
    const links = Array.from(document.querySelectorAll('#contact a'));
    const hasContactLink = links.some((a) => {
      const href = a.getAttribute('href') || '';
      return href.startsWith('mailto:') || href.includes('wa.me');
    });
    expect(hasContactLink).toBe(true);
  });

  it('Contact CTA button label contains "Order"', () => {
    const cta = document.querySelector('#contact a.cta');
    expect(cta).not.toBeNull();
    expect(cta.textContent).toMatch(/order/i);
  });

  it('lang attribute is set on html element', () => {
    const lang = document.documentElement.getAttribute('lang');
    expect(lang).not.toBeNull();
    expect(lang.trim().length).toBeGreaterThan(0);
  });

  it('Semantic elements (section, nav, footer) are present', () => {
    expect(document.querySelector('section')).not.toBeNull();
    expect(document.querySelector('nav')).not.toBeNull();
    expect(document.querySelector('footer')).not.toBeNull();
  });
});
