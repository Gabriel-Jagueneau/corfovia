/**
 * CORFOVIA — Système Internationalisation (i18n)
 * Dictionnaire complet FR / EN
 * Traduction dynamique intégrale de toutes les sections
 */

(() => {
  'use strict';

  const STORAGE_KEY = 'corfovia_language';
  const VALID_LANGS = ['fr', 'en'];

  const translations = {
    fr: {
      // Header & Navigation
      'nav.vision': 'La Vision',
      'nav.innovation': "L'Innovation",
      'nav.science': 'Notre Science',
      'nav.products': 'Produits',
      'nav.badge.abadakor': 'Sport & Vitalité',
      'nav.dropdown.eyebrow': 'Haute Nutrition Santé',
      'nav.dropdown.lead': "Nos créations d'exception",
      'nav.dropdown.desc': 'Muffin au chocolat bio & local, nutriments pour le sport et démarche anti-gaspi.',

      // Hero
      'hero.title.em': 'La vitalité',
      'hero.title.after': 'est un',
      'hero.title.highlight': 'art de vivre.',
      'hero.subtitle': "Le muffin conçu pour le sport et l'énergie active. Recharge naturelle en fer et B12, issue de la valorisation de filières bio et locales :",
      'hero.trust1.title': '100% Bio & Local',
      'hero.trust1.desc': 'Filières courtes et responsables',
      'hero.trust2.title': 'Anti-Gaspillage Engagé',
      'hero.trust2.desc': 'Valorisation de ressources locales',
      'hero.cta.discover': 'Découvrir Abadakor →',
      'hero.cta.science': 'Notre Science',

      // Piliers
      'pillars.title': 'Les 4 Piliers de la',
      'pillars.title.span': 'Vitalité Corfovia',
      'pillars.subtitle': "L'alliance pionnière de la haute nutrition cellulaire et de l'artisanat pâtissier.",
      'pillar1.title': 'Performance Sportive',
      'pillar1.desc': "Optimisation du transport d'oxygène, endurance décuplée et récupération musculaire accélérée.",
      'pillar2.title': 'Éco-Valorisation Circulaire',
      'pillar2.desc': 'Revalorisation vertueuse de ressources locales riches en nutriments, sans gaspillage.',
      'pillar3.title': 'Vrai Chocolat',
      'pillar3.desc': "Un bon chocolat classique et une pointe de sel : le plaisir gourmand d'un vrai muffin moelleux.",
      'pillar4.title': 'Énergie Durable',
      'pillar4.desc': 'Oxygénation cellulaire profonde et tonus stable au quotidien, sans pic ni coup de fatigue.',

      // Innovation
      'inno.title': "L'Innovation :",
      'inno.title.span': 'Abadakor',
      'inno.subtitle': '« Booster son énergie avec un vrai muffin au chocolat ? » Dès la première bouchée : <em>« Ah, bah d\'accord ! »</em>',
      'inno.card1.title': 'Goût Chocolat Parfait',
      'inno.card1.desc': "Le goût classique du bon chocolat. La texture généreuse d'un muffin gourmand.",
      'inno.card2.title': 'Anti-Gaspillage Engagé',
      'inno.card2.desc': 'Revalorisation de ressources locales pour un apport naturel en fer et vitamine B12, zéro gaspillage.',
      'inno.card3.title': 'Confort Intestinal 100%',
      'inno.card3.desc': "Tolérance digestive totale à l'effort, sans nausée ni lourdeur d'estomac.",
      'inno.invite.title': 'Le Muffin qui met tout le monde d’accord',
      'inno.invite.desc': 'Disponible en coffrets 4, 12 ou 24 muffins pour une cure aussi efficace que savoureuse.',
      'inno.invite.btn': 'Commander Abadakor →',

      // Science & Jauges
      'science.header.title': 'Assimilation & Biodisponibilité',
      'science.header.badge': 'Études Cliniques',
      'science.dial.corfovia.title': 'Nutrition Corfovia',
      'science.dial.corfovia.desc': "Assimilation optimale pour le sport & respect total du microbiote",
      'science.dial.synthetic.title': 'Fer de Synthèse',
      'science.dial.synthetic.desc': "82% rejeté sans effet actif & irritations digestives fréquentes",
      'science.dial.absorbed': 'Absorbé',

      // Tableau comparatif
      'comp.synthetic.badge': 'Synthétique',
      'comp.synthetic.title': 'Complément Chimique',
      'comp.synthetic.item1': 'Spasmes & nausées',
      'comp.synthetic.item2': 'Faible absorption (18%)',
      'comp.synthetic.item3': '82% éliminé sans effet',
      'comp.natural.badge': 'Naturel',
      'comp.natural.title': 'Muffin Abadakor',
      'comp.natural.item1': 'Confort digestif 100%',
      'comp.natural.item2': 'Vrai muffin gourmand',
      'comp.natural.item3': 'Énergie & récupération',

      // Editorial Routine
      'routine.title': "Le secret d'une",
      'routine.title.span': 'vitalité active',
      'routine.desc': "Assimilation record pour le muscle et le souffle, zéro inconfort gastrique, dans un bon muffin :",
      'routine.p1.title': 'Oxygénation & Récupération',
      'routine.p1.desc': "14 mg de fer naturel et 100% en B12 active pour l'endurance et le muscle.",
      'routine.p2.title': 'Confort Intestinal Absolu',
      'routine.p2.desc': 'Zéro douleur gastrique, zéro nausée ni constipation. Doux pour votre microbiote.',
      'routine.p3.title': 'Plaisir Chocolat',
      'routine.p3.desc': "Un bon chocolat classique dans un muffin moelleux et réconfortant.",
      'routine.btn': 'Commander Abadakor →',

      // Communauté & Instagram
      'comm.title': 'Rejoignez le',
      'comm.title.span': 'Cercle Corfovia',
      'comm.subtitle': "Découvrez les coulisses de nos fournées artisanales, nos conseils en nutrition cellulaire et l'actualité d'Abadakor sur Instagram.",
      'comm.cta.title': 'Suivez-nous sur Instagram',
      'comm.desc': "Découvrez les coulisses de nos fournées artisanales, nos conseils sport et nutrition, et l'actualité de nos créations gourmandes sur notre compte Instagram officiel.",
      'comm.qr': 'Scannez le QR Code',
      'comm.btn': '@corfovia sur Instagram',

      // Footer
      'footer.baseline': "La nutrition pour le sport et l'énergie active, réinventée dans un délicieux muffin éco-responsable.",
      'footer.col1.title': 'Maison',
      'footer.col2.title': 'Créations',
      'footer.col3.title': 'Exigence',
      'footer.link.abadakor': 'Le Muffin Abadakor',
      'footer.link.pack4': 'Coffret 4 muffins',
      'footer.link.pack12': 'Cure 12 muffins',
      'footer.link.pack24': 'Pack 24 muffins',
      'footer.link.ritual': 'Rituel & Conseils',
      'footer.exigence1': 'Fer Héminique Naturel',
      'footer.exigence2': '100% Bio & Local',
      'footer.exigence3': 'Bon Chocolat Gourmand',
      'footer.exigence4': 'Zéro additif chimique',
      'footer.copy': '© 2026 Corfovia. Tous droits réservés. Haute nutrition cellulaire bio.',
      'footer.mention': 'Façonné avec rigueur scientifique & passion artisanale.',

      // Page Produit Abadakor
      'product.breadcrumb.home': 'Accueil',
      'product.badge': 'Muffin au Chocolat Moelleux • Pointe de Sel',
      'product.pill.cacao': 'Chocolat',
      'product.pill.local': 'Bio & Local',
      'product.pill.sport': 'Sport & B12',
      'product.pill.etui': 'Étui Fraîcheur',
      'product.desc': "« Améliorer son endurance et sa récupération avec un vrai muffin au chocolat ? » Dès la première bouchée : <em>« Ah bah d'accord ! »</em> 14 mg de fer naturel, 100% en vitamine B12 et des nutriments issus de filières bio et locales anti-gaspi.",
      'product.pack.label': 'Choisissez votre format de cure :',
      'product.pack4.title': 'Coffret 4 Muffins',
      'product.pack4.sub': '19,90 € (Découverte)',
      'product.pack12.title': 'Cure 12 Muffins',
      'product.pack12.sub': '49,90 € (-17%)',
      'product.pack24.title': 'Pack 24 Muffins',
      'product.pack24.sub': '89,90 € (-25%)',
      'product.btn.add': 'Ajouter au Panier',
      'product.acc1.title': 'Ingrédients Bio & Locaux',
      'product.acc1.content': "Chocolat classique, farine d'avoine sans gluten, extrait nutritionnel naturel riche en fer et minéraux (filières bio et locales anti-gaspillage), sucre de fleur de coco, œufs bio de plein air, huile de coco vierge, fleur de sel de Guérande.",
      'product.acc2.title': 'Valeurs Micronutritionnelles par Muffin',
      'product.acc2.content': "• <strong>Fer naturel hautement assimilable :</strong> 14 mg (100% VNR - oxygénation et transport d'oxygène)<br>• <strong>Vitamine B12 active :</strong> 2,5 µg (100% VNR - métabolisme énergétique et réduction de la fatigue)<br>• <strong>Coenzyme Q10 & Minéraux d'origine naturelle :</strong> 28 mg (récupération cellulaire)<br>• <strong>Protéines complètes :</strong> 9,4 g • 218 kcal • Zéro troubles gastriques lors de l'effort",
      'product.acc3.title': 'Rituel & Conseils de Dégustation',
      'product.acc3.content': "Idéal 1h30 avant l'entraînement ou après l'effort pour la récupération musculaire. Délicieux également au petit-déjeuner. Réchauffez 10 secondes au micro-ondes pour un cœur encore plus moelleux."
    },

    en: {
      // Header & Navigation
      'nav.vision': 'The Vision',
      'nav.innovation': 'Innovation',
      'nav.science': 'Our Science',
      'nav.products': 'Products',
      'nav.badge.abadakor': 'Sport & Vitality',
      'nav.dropdown.eyebrow': 'Cellular Health Nutrition',
      'nav.dropdown.lead': 'Our signature creations',
      'nav.dropdown.desc': 'Organic & local chocolate muffin, sport nutrients with an eco-conscious upcycling approach.',

      // Hero
      'hero.title.em': 'Vitality',
      'hero.title.after': 'is an',
      'hero.title.highlight': 'art of living.',
      'hero.subtitle': 'The muffin designed for athletic performance and active energy. Natural iron & B12 boost through organic and local upcycled ingredients:',
      'hero.trust1.title': '100% Organic & Local',
      'hero.trust1.desc': 'Short & responsible supply chains',
      'hero.trust2.title': 'Committed Zero-Waste',
      'hero.trust2.desc': 'Upcycling valuable local resources',
      'hero.cta.discover': 'Discover Abadakor →',
      'hero.cta.science': 'Our Science',

      // Piliers
      'pillars.title': 'The 4 Pillars of',
      'pillars.title.span': 'Corfovia Vitality',
      'pillars.subtitle': 'The pioneering blend of high cellular nutrition and artisanal baking craftsmanship.',
      'pillar1.title': 'Sport Performance',
      'pillar1.desc': 'Optimized oxygen transport, enhanced endurance and accelerated muscle recovery.',
      'pillar2.title': 'Circular Upcycling',
      'pillar2.desc': 'Virtuous upcycling of nutrient-dense local resources without food waste.',
      'pillar3.title': 'Real Chocolate',
      'pillar3.desc': 'Pure classic chocolate with a pinch of sea salt: the authentic indulgence of a soft baked muffin.',
      'pillar4.title': 'Sustained Energy',
      'pillar4.desc': 'Deep cellular oxygenation and steady daily vitality, with no energy crash.',

      // Innovation
      'inno.title': 'The Innovation:',
      'inno.title.span': 'Abadakor',
      'inno.subtitle': '“Boost your athletic energy with a real chocolate muffin?” From the very first bite: <em>“Ah, got it!”</em>',
      'inno.card1.title': 'Pure Chocolate Taste',
      'inno.card1.desc': 'Classic chocolate flavor. The generous, rich texture of a true gourmet muffin.',
      'inno.card2.title': 'Committed Zero-Waste',
      'inno.card2.desc': 'Upcycling local nutrient-dense treasures for a natural iron and vitamin B12 supply, zero waste.',
      'inno.card3.title': '100% Gut Comfort',
      'inno.card3.desc': 'Complete digestive tolerance during training, free from nausea or stomach heaviness.',
      'inno.invite.title': 'The muffin that gets everyone on board',
      'inno.invite.desc': 'Available in 4, 12, or 24 muffin boxes for an intake as efficient as it is delicious.',
      'inno.invite.btn': 'Order Abadakor →',

      // Science & Jauges
      'science.header.title': 'Absorption & Bioavailability',
      'science.header.badge': 'Clinical Studies',
      'science.dial.corfovia.title': 'Corfovia Nutrition',
      'science.dial.corfovia.desc': 'Optimal assimilation for sport & gentle on the gut microbiome',
      'science.dial.synthetic.title': 'Synthetic Iron Pills',
      'science.dial.synthetic.desc': '82% wasted unabsorbed & frequent digestive cramps',
      'science.dial.absorbed': 'Absorbed',

      // Tableau comparatif
      'comp.synthetic.badge': 'Synthetic',
      'comp.synthetic.title': 'Chemical Supplement',
      'comp.synthetic.item1': 'Spasms & nausea',
      'comp.synthetic.item2': 'Poor absorption (18%)',
      'comp.synthetic.item3': '82% excreted without effect',
      'comp.natural.badge': 'Natural',
      'comp.natural.title': 'Abadakor Muffin',
      'comp.natural.item1': '100% digestive comfort',
      'comp.natural.item2': 'Real gourmet muffin',
      'comp.natural.item3': 'Energy & muscle recovery',

      // Editorial Routine
      'routine.title': 'The secret to',
      'routine.title.span': 'active vitality',
      'routine.desc': 'Unmatched absorption for muscles and stamina, zero digestive discomfort, packed in a delicious muffin:',
      'routine.p1.title': 'Oxygenation & Recovery',
      'routine.p1.desc': '14 mg of natural iron and 100% NRV active B12 for endurance and muscle regeneration.',
      'routine.p2.title': 'Absolute Gut Comfort',
      'routine.p2.desc': 'Zero gastric pain, zero nausea, zero cramps. Perfectly gentle on your microbiome.',
      'routine.p3.title': 'Chocolate Pleasure',
      'routine.p3.desc': 'Real classic chocolate baked into a comforting, delicious treat.',
      'routine.btn': 'Order Abadakor →',

      // Communauté & Instagram
      'comm.title': 'Join the',
      'comm.title.span': 'Corfovia Circle',
      'comm.subtitle': 'Discover the backstage of our artisanal batches, our sports nutrition tips and the latest Abadakor news on Instagram.',
      'comm.cta.title': 'Follow us on Instagram',
      'comm.desc': 'Go behind the scenes of our artisanal batches, discover sports nutrition tips and the latest creations on our official Instagram account.',
      'comm.qr': 'Scan the QR Code',
      'comm.btn': '@corfovia on Instagram',

      // Footer
      'footer.baseline': 'Active sports nutrition and sustainable energy, reinvented in a delicious eco-conscious muffin.',
      'footer.col1.title': 'House',
      'footer.col2.title': 'Creations',
      'footer.col3.title': 'Standards',
      'footer.link.abadakor': 'Abadakor Muffin',
      'footer.link.pack4': '4 Muffin Box',
      'footer.link.pack12': '12 Muffin Cure',
      'footer.link.pack24': '24 Muffin Pack',
      'footer.link.ritual': 'Ritual & Recommendations',
      'footer.exigence1': 'Natural Heme Iron',
      'footer.exigence2': '100% Organic & Local',
      'footer.exigence3': 'Gourmet Chocolate',
      'footer.exigence4': 'Zero chemical additives',
      'footer.copy': '© 2026 Corfovia. All rights reserved. Organic cellular nutrition.',
      'footer.mention': 'Crafted with scientific rigor & artisanal passion.',

      // Page Produit Abadakor
      'product.breadcrumb.home': 'Home',
      'product.badge': 'Moist Chocolate Muffin • Pinch of Sea Salt',
      'product.pill.cacao': 'Chocolate',
      'product.pill.local': 'Organic & Local',
      'product.pill.sport': 'Sport & B12',
      'product.pill.etui': 'Freshness Case',
      'product.desc': '“Improve your endurance and recovery with a delicious chocolate muffin?” From the very first bite: <em>“Ah, got it!”</em> 14 mg of natural iron, 100% active B12 and nutrient-rich upcycled local ingredients.',
      'product.pack.label': 'Choose your box format:',
      'product.pack4.title': '4 Muffin Box',
      'product.pack4.sub': '€19.90 (Discovery)',
      'product.pack12.title': '12 Muffin Cure',
      'product.pack12.sub': '€49.90 (-17%)',
      'product.pack24.title': '24 Muffin Pack',
      'product.pack24.sub': '€89.90 (-25%)',
      'product.btn.add': 'Add to Cart',
      'product.acc1.title': 'Organic & Local Ingredients',
      'product.acc1.content': 'Classic chocolate, gluten-free oat flour, natural nutrient extract rich in iron and minerals (zero-waste local supply chains), coconut blossom sugar, organic free-range eggs, virgin coconut oil, Guérande sea salt.',
      'product.acc2.title': 'Micronutritional Values per Muffin',
      'product.acc2.content': '• <strong>Highly bioavailable natural iron:</strong> 14 mg (100% NRV - oxygen transport)<br>• <strong>Active Vitamin B12:</strong> 2.5 µg (100% NRV - energy metabolism and fatigue reduction)<br>• <strong>Coenzyme Q10 & natural minerals:</strong> 28 mg (cellular recovery)<br>• <strong>Complete protein:</strong> 9.4 g • 218 kcal • Zero gastric discomfort during exercise',
      'product.acc3.title': 'Ritual & Tasting Recommendations',
      'product.acc3.content': 'Ideal 90 minutes before a workout for steady energy, or right after exercise for muscle recovery. Also delicious for breakfast. Microwave for 10 seconds for an even softer melt-in-the-mouth center.'
    }
  };

  /**
   * Récupère la langue active (Query parameter > localStorage > Navigateur > 'fr')
   */
  const getLanguageFromPath = () => {
    if (typeof window === 'undefined') return null;
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && VALID_LANGS.includes(pathSegments[0])) {
      return pathSegments[0];
    }
    return null;
  };

  /**
   * Récupère la langue active :
   * 1. URL Path (/fr/ ou /en/) exactement comme Plintzy
   * 2. Paramètre ?lang=
   * 3. localStorage
   * 4. Navigateur
   */
  const getLanguage = () => {
    const urlLang = getLanguageFromPath();
    if (urlLang && VALID_LANGS.includes(urlLang)) {
      localStorage.setItem(STORAGE_KEY, urlLang);
      return urlLang;
    }

    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const qLang = params.get('lang');
      if (qLang && VALID_LANGS.includes(qLang.toLowerCase())) {
        const lang = qLang.toLowerCase();
        localStorage.setItem(STORAGE_KEY, lang);
        return lang;
      }
    }

    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && VALID_LANGS.includes(stored)) {
      return stored;
    }

    const browserLang = (typeof navigator !== 'undefined' && navigator.language) 
      ? navigator.language.split('-')[0].toLowerCase() 
      : 'fr';
    return VALID_LANGS.includes(browserLang) ? browserLang : 'fr';
  };

  /**
   * Change la langue active et synchronise l'URL (/fr/ ou /en/) exactement comme Plintzy
   */
  const setLanguage = (langCode, syncUrl = true) => {
    if (!VALID_LANGS.includes(langCode)) return;
    localStorage.setItem(STORAGE_KEY, langCode);

    if (syncUrl && typeof window !== 'undefined' && window.history && window.history.replaceState) {
      const pathSegments = window.location.pathname.split('/').filter(Boolean);
      let pagePath = '';

      if (pathSegments.length > 0 && VALID_LANGS.includes(pathSegments[0])) {
        pagePath = pathSegments.slice(1).join('/');
      } else {
        pagePath = pathSegments.join('/');
      }

      // Construit l'URL propre : /fr/ ou /en/ ou /fr/products/muffin-vitalite/
      const newUrl = '/' + langCode + '/' + (pagePath ? pagePath + '/' : '');
      if (window.location.pathname !== newUrl) {
        window.history.replaceState(null, document.title, newUrl + window.location.search);
      }
    }

    applyTranslations(langCode);
    updateLanguageButtons(langCode);
    document.documentElement.lang = langCode;
    window.dispatchEvent(new CustomEvent('corfoviaLanguageChange', { detail: { lang: langCode } }));
  };

  const applyTranslations = (langCode) => {
    const dict = translations[langCode] || translations.fr;

    // Textes bruts
    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    // Textes avec HTML
    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });
  };

  /**
   * Met à jour l'état visuel du switcher FR / EN
   */
  const updateLanguageButtons = (langCode) => {
    document.querySelectorAll('.lang-switcher-btn').forEach((btn) => {
      const btnLang = btn.getAttribute('data-lang');
      if (btnLang === langCode) {
        btn.classList.add('active');
        btn.setAttribute('aria-pressed', 'true');
      } else {
        btn.classList.remove('active');
        btn.setAttribute('aria-pressed', 'false');
      }
    });
  };

  /**
   * Initialisation au chargement de la page
   */
  const init = () => {
    document.querySelectorAll('.lang-switcher-btn').forEach((btn) => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const targetLang = btn.getAttribute('data-lang');
        if (targetLang) {
          setLanguage(targetLang, true);
        }
      });
    });

    const currentLang = getLanguage();
    setLanguage(currentLang, true);
  };

  window.CorfoviaI18n = {
    getLanguage,
    setLanguage,
    t: (key) => (translations[getLanguage()] || translations.fr)[key] || key
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

})();
