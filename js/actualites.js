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
window.CORFOVIA_NEWS_DURATION_MS = 5000;

window.CORFOVIA_NEWS = [
  {
    image: 'images/actuality/yepday18112026.jpeg',
    link: 'https://lje.be/fr/news',

    tag: 'YEP day',
    title: 'Notre YEP day',
    desc: 'Une journée avec LJE à la HEPL pour rencontrer des experts.',

    tagEn: 'YEP day',
    titleEn: 'Our YEP day',
    descEn: 'A day with LJE at HEPL to meet with experts.'
  },
  {
    image: '/images/brand/corfovia-meta.jpg',
    link: '#routine',
    imagePos: '50% 50%',

    tag: 'Le Projet',
    title: 'Six étudiants réunis contre le gaspillage',
    desc: 'Redonner de la valeur à des protéines animales délaissées dans un goûter sain que les enfants adorent.',

    tagEn: 'The Project',
    titleEn: 'Six students united against food waste',
    descEn: 'Giving value back to overlooked animal proteins inside a healthy snack children love.',
  },
  {
    image: '/products/abadakor/images/hero-muffins.jpg',
    link: '/products/abadakor/#ingredients-section',
    imagePos: '48% 64%',
    imageScale: 1.24,

    tag: 'Fournée R&D',
    title: '6 ingrédients simples et 100 % transparents',
    desc: 'Des essais pâtissiers centrés sur le moelleux, l’assimilation du fer naturel et zéro pic glycémique.',

    tagEn: 'R&D Batch',
    titleEn: '6 simple and fully transparent ingredients',
    descEn: 'Bakery trials focused on softness, natural iron absorption and zero sugar spikes.',
  }
];

