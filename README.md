# Naveen Sekhar Portfolio

This site is built with React, Vite, Tailwind CSS, and Framer Motion.

## Local Development

```bash
npm install
npm run dev
```

## Production Build

```bash
npm run build
```

## GitHub Pages Deployment

The app is configured for the `/naveensekhar-portfolio/` GitHub Pages subpath in `vite.config.js`.

Pushes to `main` automatically build the site and publish the `dist/` folder through `.github/workflows/deploy.yml`.

In GitHub repository settings, make sure Pages is set to deploy from the `gh-pages` branch root.
