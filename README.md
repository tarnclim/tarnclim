# Tarn Clim – Site vitrine

Site one-page pour **Tarn Clim**, entreprise spécialisée dans l'installation et la maintenance de :
- Climatisation (monosplit, multisplit, gainable)
- VMC (simple flux, double flux, hygro)
- Pompes à chaleur (air/air, air/eau, géothermique)
- Ballons thermodynamiques
- Mises en service

## Stack

HTML5 · CSS3 (custom properties, Grid, Flexbox) · Vanilla JS (Intersection Observer, scroll animations)

Aucune dépendance externe. Zéro framework.

## Déploiement sur GitHub Pages

```bash
git init
git add .
git commit -m "Initial commit – Tarn Clim website"
git branch -M main
git remote add origin https://github.com/<votre-compte>/tarnclim.git
git push -u origin main
```

Ensuite dans **Settings → Pages** :
- Source : `Deploy from a branch`
- Branch : `main` / `/ (root)`

Le site sera accessible à `https://<votre-compte>.github.io/tarnclim/`

## Personnalisation

| Ce qu'il faut changer | Où |
|---|---|
| Numéro de téléphone | `index.html` lignes contact |
| Adresse email | `index.html` lignes contact |
| SIRET | `index.html` footer |
| Formulaire de contact | `script.js` – remplacer le `setTimeout` par un appel [FormSpree](https://formspree.io) ou [Netlify Forms](https://www.netlify.com/products/forms/) |
| Photos | Remplacer les URLs Unsplash par vos propres photos |
| Couleurs | Variables CSS dans `style.css` bloc `:root` |

## Crédits photos

Photos libres de droit issues de [Unsplash](https://unsplash.com).
