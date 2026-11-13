# Corfovia — Haute Nutrition & Sport

Site vitrine officiel de **Corfovia** ([corfovia.com](https://corfovia.com)).

## Le Produit : Abadakor
Muffin au chocolat équilibré & gourmand conçu pour les familles et le goûter des enfants :
- **Nutrition & Croissance** : Du fer héminique naturel (15–35% assimilé) et de la vitamine B12 sans arrière-goût.
- **Zéro pic de sucre** : Remplace le sucre raffiné par les fibres prébiotiques douces d'oligofructose.
- **Anti-gaspillage circulaire** : Revalorisation noble de protéines animales de haute densité nutritionnelle.

## Fonctionnalités Clés
- **Design System Apple & Fluid Motion** : Micro-interactions tactiles réactives (`pointerdown`), typographie soignée et animations fluides.
- **Header flottant morphing** : Suivi dynamique du scroll, indicateur de section et dropdown produits en verre dépoli.
- **Bilingue FR / EN dynamique** : Système i18n sans duplication de fichiers HTML, changement de langue instantané.
- **URLs épurées** : Zéro suffixe `.html` ni ancres `#` visibles dans la barre d'adresse.
- **SEO & Réseaux sociaux** : Méta-balises OpenGraph, Twitter Cards et favicon configurés pour `corfovia.com`.

## Structure du Projet
```text
corfovia/
├── index.html                     # Accueil (Vision, 4 Piliers, Équipe, Science)
├── 404.html                       # Page d'erreur 404 personnalisée
├── products/
│   └── abadakor/
│       ├── index.html             # Fiche produit Abadakor (3D, découpe & anatomie interactive)
│       └── images/                # Visuels dédiés au produit Abadakor (hero-muffins.jpg)
├── css/
│   ├── style.css                  # Styles globaux, animations & composants glassmorphism
│   ├── product.css                # Styles spécifiques aux fiches produits
│   └── responsive.css             # Adaptations mobiles & tablettes
├── js/
│   ├── i18n.js                    # Moteur de traduction dynamique FR / EN
│   ├── actualites.js              # Données du carrousel d'actualités
│   ├── main.js                    # Interactions, morphing header, scroll spy & animations
│   └── product.js                 # Logique interactive de la page produit
├── images/
│   ├── brand/                     # Logos officiels, QR code Instagram & visuels OpenGraph
│   ├── icons/                     # Favicons & Apple Touch Icons
│   └── team/                      # Portraits des membres de l'équipe
├── CNAME                          # Configuration domaine GitHub Pages (corfovia.com)
├── sitemap.xml                    # Sitemap SEO
├── robots.txt                     # Indexation moteurs de recherche
└── README.md
```

## Déploiement
Site statique (HTML5 / CSS3 / Vanilla JS). Compatible avec **GitHub Pages**, Vercel, Netlify ou tout serveur statique sans configuration requise.

---
© Corfovia — Tous droits réservés.
