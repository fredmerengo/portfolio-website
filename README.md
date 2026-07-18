# portfolio-website
my personal portfolio website

---
Site scaffold: simple static church website added (index, about, ministries, contact, styles, logo).

This scaffold uses the church name "Maranatha Praise Center" and the contact email `maranathapraisecenter@gmail.com`.

To preview, open [index.html](index.html) in a browser.

Local preview
```
python -m http.server 8000
# open http://localhost:8000
```

Contact form
- The contact form posts to Formspree. Replace the form action `REPLACE_WITH_YOUR_FORM_ID` in `contact.html` with your Formspree form ID (read Formspree docs).

Map consent
- The contact page uses a consent-controlled placeholder for the embedded Google Map. On first visit you'll be asked to load the map; your choice is stored in `localStorage` under `mpc_map_consent`.
- To reset consent in your browser, run `localStorage.removeItem('mpc_map_consent')` in the console and reload the page.

Cookie banner
- The site shows a cookie consent banner on first visit. Your choice is stored in `localStorage` under `mpc_cookies_consent`.
- To reset, run `localStorage.removeItem('mpc_cookies_consent')`.

Deployment
- This repo includes a GitHub Actions workflow `.github/workflows/deploy.yml` that will publish the repository root to the `gh-pages` branch on push to `main`. After first push, enable GitHub Pages to serve from `gh-pages` in your repository settings.

Accessibility audit
- There's a manual workflow `.github/workflows/a11y.yml` you can run from the Actions tab. Provide your site URL (e.g. `https://<username>.github.io/<repo>`) to run a Lighthouse accessibility audit.
