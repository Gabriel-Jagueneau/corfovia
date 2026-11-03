# Corfovia — Haute Nutrition & Sport

Site vitrine officiel de **Corfovia** ([corfovia.com](https://corfovia.com)).

## ✨ Le Produit : Abadakor
Muffin au chocolat bio & local conçu pour les sportifs et les personnes actives :
- **Performance & Récupération** : 14 mg de fer naturel hautement assimilable et 100% des VNR en vitamine B12.
- **Confort digestif absolu** : Zéro nausée, zéro brûlure d'estomac pendant l'effort.
- **Anti-gaspillage circulaire** : Revalorisation noble de ressources locales riches en micronutriments.

## 🚀 Fonctionnalités Clés
- **Design System Apple** : Micro-interactions tactiles réactives (`pointerdown`), typographie soignée et animations fluides.
- **Header flottant morphing** : Suivi dynamique du scroll, jauge de progression intégrée et dropdown produits en verre dépoli.
- **Bilingue FR / EN dynamique** : Système i18n sans duplication de fichiers HTML, changement de langue instantané.
- **URLs épurées** : Zéro suffixe `.html` ni ancres `#` visibles dans la barre d'adresse.
- **SEO & Réseaux sociaux** : Méta-balises OpenGraph, Twitter Cards et favicon configurés pour `corfovia.com`.

## 📁 Structure du Projet
```text
corfovia/
├── index.html                     # Accueil (Vision, Piliers, Innovation, Science)
├── products/
│   └── muffin-vitalite/
│       └── index.html             # Fiche détaillée Abadakor
├── css/
│   ├── style.css                  # Styles globaux & composants
│   └── responsive.css             # Adaptations mobiles & tablettes
├── js/
│   ├── i18n.js                    # Moteur de traduction dynamique FR / EN
│   └── main.js                    # Interactions, morphing header, scroll spy
├── images/                        # Logos officiels, visuel fournée et QR code
├── CNAME                          # Configuration domaine GitHub Pages (corfovia.com)
├── sitemap.xml                    # Sitemap SEO
├── robots.txt                     # Indexation moteurs de recherche
└── README.md
```

## 🛠️ Déploiement
Site statique (HTML5 / CSS3 / Vanilla JS). Compatible avec **GitHub Pages**, Vercel, Netlify ou tout serveur statique sans configuration requise.

---
© Corfovia — Tous droits réservés.
