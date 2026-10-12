# The Cat Coat Atlas 🐾

A small, illustrated, mobile-friendly cat coat pattern reference and interactive **three-question coat-pattern finder**. Built with plain HTML, CSS, JavaScript, and original SVG illustrations. Works on GitHub Pages and other static hosts with **no backend, build step, API key, or package installation**.

## What is included

- `index.html` — complete one-page website with 10 pattern descriptions, coat genetics basics, FAQ, and an educational contextual link
- `styles.css` — responsive stylesheet with desktop, tablet and mobile layouts
- `script.js` — pattern filters, search, mobile navigation, and fully local quiz/finder
- `assets/cats/` — 10 original, simplified SVG cat illustrations
- `assets/favicon.svg` — original icon
- `assets/social-card.svg` and `assets/social-card.png` — share preview artwork and PNG image
- `.nojekyll` — ensures GitHub Pages serves this as a plain static site
- `.gitignore`, `LICENSE` — repository hygiene and MIT license

## Publish on GitHub Pages (no coding required)

1. **Unzip** `cat-coat-atlas-github-pages.zip` locally. GitHub's *Upload files* interface expects the actual files and folders, not the ZIP itself.
2. Sign in to GitHub and create a new **public** repository, such as `cat-coat-atlas`.
3. Choose **Add file → Upload files**. Drag all unzipped files and the `assets` folder into the repository **root**. Commit the upload.
4. Go to **Settings → Pages**. Under **Build and deployment**, choose **Deploy from a branch**. Select **main** and **/(root)**, then save.
5. Visit `https://YOUR-GITHUB-USERNAME.github.io/cat-coat-atlas/` after GitHub indicates the deployment is ready. The URL depends on the repository name and username.

Alternatively, using Git:

```bash
git init
git add .
git commit -m "Launch Cat Coat Atlas"
git branch -M main
git remote add origin https://github.com/YOUR-GITHUB-USERNAME/cat-coat-atlas.git
git push -u origin main
```

Then enable **Settings → Pages → Deploy from a branch → main → /(root)**.

## Customize

- **Project name / brand:** search `index.html` for "the cat coat atlas" and update the visible branding if you prefer.
- **Link to the cat-breed identifier:** `index.html` has one editorial backlink in the **Coat pattern ≠ cat breed** section, with exactly this anchor text: **WhatisMyCatBreed.com**, pointing to `https://www.whatismycatbreed.com/`. Keep it where it is useful to readers.
- **Images:** all illustrations are under `assets/cats/`. SVG artwork is simplified and illustrative; it is not a scientific diagnostic diagram.
- **Open Graph sharing:** `og:image` currently uses the included PNG through a relative URL. **For reliable social sharing previews**, after publishing, update the tag to the complete URL `https://YOUR-GITHUB-USERNAME.github.io/cat-coat-atlas/assets/social-card.png`. Other relative paths already work without edits.
- **Search engine canonical:** no canonical URL is hardcoded because your actual GitHub username/repository URL was unknown when the site was prepared. If you set a custom domain, consider adding the correct canonical link and sitemap then.

## How the finder works

The quiz asks about: (1) the dominant visual motif, (2) white spotting, and (3) a more specific descriptive detail. A transparent rule-based scoring system in `script.js` suggests a **visual coat-pattern label**; it is *not* AI image recognition, a genetic test, a probability or a breed identification service. Users can still browse and filter patterns with JavaScript; descriptive HTML content remains readable with JavaScript disabled.

No information is sent to an API, saved to local storage, tracked or uploaded. The clipboard action is activated only on user request.

## Editorial sources

- [UC Davis Veterinary Genetics Laboratory — Feline Coat Color](https://vgl.vetmed.ucdavis.edu/resources/cat-coat-color)
- [The Cat Fanciers' Association — Coat & Color Descriptions](https://cfa.org/coat-color-descriptions/)
- [The International Cat Association — What Color Is My Cat?](https://tica.org/what-color-is-my-cat/)

These are educational references, not endorsements of this project. Cat coat appearance cannot by itself verify pedigree or ancestry.

## License

MIT — see [LICENSE](LICENSE). Original SVG art and code in this package were created for this repository; you can reuse and modify them under the MIT license.
