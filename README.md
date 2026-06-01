# Let Us Play 🙏 — Book Promo Site

A single-page, interactive promotional website for **_Let Us Play — The Play Revolution_** by Jeff Dollins. Static HTML/CSS/JS, designed to be hosted free on **GitHub Pages**.

## ✅ Two things to set before launch

Open **`script.js`** and edit the two values at the very top:

```js
// 1) The Amazon page where the book is sold:
const AMAZON_URL = "https://www.amazon.com/dp/XXXXXXXXX";

// 2) Your Formspree form ID (for the email signup):
const FORMSPREE_ID = "xyzabcde";
```

- **Amazon link** — Every "Get Your Copy / Get the Book" button points here. Until you set it, those buttons just scroll to the buy section (nothing breaks).
- **Email signup (Formspree)** — Free at <https://formspree.io>. Create a form, copy the ID from its endpoint (`https://formspree.io/f/**xyzabcde**`), and paste it in. Submissions get emailed to whatever address you set in Formspree. Until set, the form shows a friendly "not connected yet" message instead of failing.

> The email-capture incentive (free Introduction) is set up — in Formspree you can configure an autoresponder that emails the PDF, or have it forward signups to Jeff.

## Local preview

```bash
cd let-us-play-site
python3 -m http.server 8000
# then open http://localhost:8000
```

## Deploy to GitHub Pages

1. Create a new repo on GitHub (e.g. `let-us-play`).
2. From this folder:
   ```bash
   git init
   git add .
   git commit -m "Let Us Play promo site"
   git branch -M main
   git remote add origin https://github.com/<your-username>/let-us-play.git
   git push -u origin main
   ```
3. On GitHub: **Settings → Pages → Build and deployment → Source: Deploy from a branch**, branch `main`, folder `/ (root)`. Save.
4. The site goes live at `https://<your-username>.github.io/let-us-play/` within a minute or two.

### Custom domain (letusplaybook.com)

The domain is registered. To point it at GitHub Pages:

1. In **Settings → Pages → Custom domain**, enter `letusplaybook.com` and save (this creates a `CNAME` file).
2. At your domain registrar, add DNS records:
   - Four `A` records for the apex domain → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - One `CNAME` record for `www` → `<your-username>.github.io`
3. Back in Settings → Pages, tick **Enforce HTTPS** once the certificate is issued.

## Files

| File | Purpose |
|------|---------|
| `index.html` | All page content & sections |
| `styles.css` | Sunset-toned, book-like styling |
| `script.js`  | Config + scroll animations, nav, free-chapter reader, form |
| `assets/hero.jpg` | The Mojo sunset photo (hero background) |

## Sections

Hero · About the Book · What's Inside (chapters) · Free Chapter (full Introduction) · Buy on Amazon · About the Author · Email signup · Footer — matching Jeff's website copy.
