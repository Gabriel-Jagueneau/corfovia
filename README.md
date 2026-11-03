# Corfovia — Haute Nutrition Cellulaire

> Site vitrine officiel de la marque **Corfovia** ([corfovia.com](https://corfovia.com)).  
> Conçu selon les principes de l'**Apple Design System** et de la méthodologie **Fluid Motion** (interactions tactiles ultra-réactives, morphing header, palette chaleureuse velours & crème).

---

## ✨ Création Signature : Abadakor

**Abadakor** réinvente l'assimilation du fer au quotidien :
- **Plaisir sans compromis** : Un véritable muffin au chocolat bio, sans arrière-goût métallique.
- **Efficacité nutritionnelle** : Fer héminique naturel et vitamine B12 bio-disponibles.
- **Circuit court** : Ingrédients 100% bio et locaux, filières anti-gaspillage.

---

## 🚀 Fonctionnalités & Expérience Utilisateur

- **Header flottant à morphing fluide** : Transition dynamique en îlot compact lors du défilement, avec jauge de progression intégrée et badge de section en direct.
- **Menu déroulant sur mesure** : Dropdown produits en verre dépoli (*backdrop-filter blur*) avec voile d'arrière-plan immersif.
- **Jauges comparatives interactives** : Visualisation scientifique de la biodisponibilité (assimilation à 94% vs compléments synthétiques à 18%).
- **Design System tactile** : Rendu Apple moderne, micro-interactions instantanées sans latence (`pointerdown`), typographie soignée (*Playfair Display* & *Plus Jakarta Sans*).
- **SEO & Réseaux sociaux** : Métadonnées OpenGraph, Twitter Cards, PWA theme-color, Sitemap XML et Robots.txt configurés pour `corfovia.com`.

---

## 📁 Architecture du Projet

```text
corfovia/
├── index.html                     # Page d'accueil (Vision, Piliers, Innovation, Science)
├── products/
│   └── muffin-vitalite/
│       └── index.html             # Page produit détaillée Abadakor
├── css/
│   ├── style.css                  # Design System, typographie, composants, animations
│   └── responsive.css             # Adaptations mobiles & tablettes
├── js/
│   └── main.js                    # Interactions, morphing header, scroll spy, accordéons
├── images/                        # Emblème circulaire, photographies & QR code
├── CNAME                          # Domaine personnalisé GitHub Pages (corfovia.com)
├── sitemap.xml                    # Plan du site SEO
├── robots.txt                     # Directives pour moteurs de recherche
└── README.md                      # Documentation du projet
```

---

## 🛠️ Déploiement

Le site est statique (HTML5 / CSS3 / JavaScript Vanilla ES6+), sans dépendances complexes, et optimisé pour être servi directement via **GitHub Pages**, Vercel, Netlify ou tout serveur web moderne.

---

© Corfovia — Tous droits réservés.

---

## 🌐 Internationalisation (i18n) & URLs Épurées

Le site est architecturé pour une expérience de navigation pure (zéro suffixe  ni hash  visibles) et prêt pour le multi-langue :
- **Français (défaut)** :  ou 
- **Anglais (prévu)** : 
- **Pages produits** : 
- **Gestionnaire d'URL dynamique ()** : Nettoie automatiquement les URLs à la volée via l'API HTML5 History ( / ), garantissant une barre d'adresse sobre et élégante.
