import { useEffect } from 'react';
import { SITE } from '../data';

function absoluteUrl(base, path) {
  if (!path) return base;
  if (/^https?:\/\//i.test(path)) return path;
  const normalized = path.startsWith('/') ? path : `/${path}`;
  return `${base}${normalized}`;
}

function setMeta(attr, key, value) {
  if (!value) return;
  let el = document.head.querySelector(`meta[${attr}="${key}"]`);
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', value);
}

function setLink(rel, href) {
  if (!href) return;
  let el = document.head.querySelector(`link[rel="${rel}"]`);
  if (!el) {
    el = document.createElement('link');
    el.setAttribute('rel', rel);
    document.head.appendChild(el);
  }
  el.setAttribute('href', href);
}

/**
 * Keeps document title, canonical, Open Graph, Twitter, and JSON-LD
 * in sync with SITE data. Uses SITE.url when set, otherwise the current origin.
 */
export default function Seo() {
  useEffect(() => {
    const base = (SITE.url || window.location.origin).replace(/\/$/, '');
    const pageUrl = `${base}/`;
    const imageUrl = absoluteUrl(base, SITE.ogImage || SITE.photo);
    const title = SITE.title || `${SITE.name} | ${SITE.role}`;
    const description = SITE.description;
    const keywords = Array.isArray(SITE.keywords) ? SITE.keywords.join(', ') : SITE.keywords;

    document.title = title;

    setMeta('name', 'description', description);
    setMeta('name', 'keywords', keywords);
    setMeta('name', 'author', SITE.name);
    setMeta('name', 'theme-color', '#050505');

    setMeta('property', 'og:type', 'website');
    setMeta('property', 'og:site_name', SITE.name);
    setMeta('property', 'og:locale', SITE.locale || 'en_US');
    setMeta('property', 'og:title', title);
    setMeta('property', 'og:description', description);
    setMeta('property', 'og:url', pageUrl);
    setMeta('property', 'og:image', imageUrl);
    setMeta('property', 'og:image:alt', `${SITE.name} — ${SITE.role} portfolio`);

    setMeta('name', 'twitter:card', 'summary_large_image');
    setMeta('name', 'twitter:site', SITE.twitterHandle);
    setMeta('name', 'twitter:creator', SITE.twitterHandle);
    setMeta('name', 'twitter:title', title);
    setMeta('name', 'twitter:description', description);
    setMeta('name', 'twitter:image', imageUrl);

    setLink('canonical', pageUrl);

    const jsonLd = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'WebSite',
          '@id': `${pageUrl}#website`,
          name: SITE.name,
          url: pageUrl,
          description,
          inLanguage: 'en',
        },
        {
          '@type': 'Person',
          '@id': `${pageUrl}#person`,
          name: SITE.name,
          url: pageUrl,
          image: imageUrl,
          jobTitle: SITE.role,
          email: `mailto:${SITE.email}`,
          sameAs: [SITE.linkedin, SITE.github, SITE.medium, SITE.twitter].filter(Boolean),
          knowsAbout: [
            'Web Application Security',
            'VAPT',
            'OWASP Top 10',
            'Penetration Testing',
            'CTF',
          ],
        },
      ],
    };

    let script = document.getElementById('json-ld');
    if (!script) {
      script = document.createElement('script');
      script.type = 'application/ld+json';
      script.id = 'json-ld';
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(jsonLd);
  }, []);

  return null;
}
