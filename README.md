# Maranatha Praise Center Website

A simple static church website for Maranatha Praise Center, built with HTML, CSS, and JavaScript.

## What’s included
- Home page with welcome content and events
- About page
- Ministries page
- Contact page with location links and a consent-based map
- Privacy and cookie information page
- GitHub Pages deployment workflow
- Accessibility audit workflow
- SEO metadata and sitemap

## Preview locally
Open [index.html](index.html) in a browser, or run:

```bash
python -m http.server 8000
```

Then open http://localhost:8000

## Deployment
This repository includes a GitHub Actions workflow in [.github/workflows/deploy.yml](.github/workflows/deploy.yml) that publishes the site using the GitHub Pages Actions workflow on pushes to `main`.

After the first push, enable GitHub Pages in the repository settings and use the GitHub Actions deployment source.

## Search and indexing
The site includes:
- SEO meta tags
- Open Graph tags
- a sitemap at [sitemap.xml](sitemap.xml)
- a robots file at [robots.txt](robots.txt)

## Accessibility audit
A manual Lighthouse workflow is available in [.github/workflows/a11y.yml](.github/workflows/a11y.yml). Run it from the GitHub Actions tab and provide the published site URL.
