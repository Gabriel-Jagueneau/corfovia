/**
 * ============================================================================
 * ACTUALITÉS CORFOVIA — CARROUSEL DE LA PAGE D’ACCUEIL
 * ----------------------------------------------------------------------------
 * Pour ajouter, modifier ou supprimer une actualité :
 * ajoutez simplement un bloc { image, title, desc } dans CORFOVIA_NEWS ci-dessous.
 *
 * Champs disponibles :
 * - image      : chemin de l'image (ex: '/images/mon-actu.jpg')
 * - title      : titre court de l'actualité
 * - desc       : mini description (1 à 2 phrases)
 * - tag        : (optionnel) petit badge affiché en haut à gauche
 * - link       : (optionnel) URL ou ancre ouverte au clic (ex: '/products/abadakor/')
 * - titleEn / descEn / tagEn : (optionnel) version anglaise
 * - imagePos   : (optionnel) cadrage CSS object-position (ex: '50% 60%')
 * - imageScale : (optionnel) léger zoom d'appoint (ex: 1.15)
 * ============================================================================
 */
window.CORFOVIA_NEWS_DURATION_MS = 5500;

window.CORFOVIA_NEWS = [
  {
    image: 'images/actuality/yepday18112026.jpeg',
    tag: 'YEP day',
    tagEn: 'YEP day',
    title: 'Notre YEP day',
    titleEn: 'Our YEP day',
    desc: 'Une journée avec LJE à la HEPL pour rencontrer des experts.',
    descEn: 'A day with LJE at HEPL to meet with experts.',
    link: 'https://lje.be/fr/news'
  },
  {
    image: '/images/brand/corfovia-meta.jpg',
    tag: 'Le Projet',
    tagEn: 'The Project',
    title: 'Six étudiants réunis contre le gaspillage',
    titleEn: 'Six students united against food waste',
    desc: 'Redonner de la valeur à des protéines animales délaissées dans un goûter sain que les enfants adorent.',
    descEn: 'Giving value back to overlooked animal proteins inside a healthy snack children love.',
    link: '#routine',
    imagePos: '50% 50%'
  },
  {
    image: '/products/abadakor/images/hero-muffins.jpg',
    tag: 'Fournée R&D',
    tagEn: 'R&D Batch',
    title: '6 ingrédients simples et 100 % transparents',
    titleEn: '6 simple and fully transparent ingredients',
    desc: 'Des essais pâtissiers centrés sur le moelleux, l’assimilation du fer naturel et zéro pic glycémique.',
    descEn: 'Bakery trials focused on softness, natural iron absorption and zero sugar spikes.',
    link: '/products/abadakor/#ingredients-section',
    imagePos: '48% 64%',
    imageScale: 1.24
  }
];

