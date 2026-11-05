/**
 * CORFOVIA — Système Internationalisation (i18n)
 * Dictionnaire complet FR / EN : Vision, Équipe, Science (Modal Sources) & Produit Abadakor
 */

(() => {
  'use strict';

  const STORAGE_KEY = 'corfovia_language';
  const VALID_LANGS = ['fr', 'en'];

  const translations = {
    fr: {
      // Header & Navigation
      'nav.vision': 'La Vision',
      'nav.innovation': 'Notre Équipe',
      'nav.science': 'Notre Science',
      'nav.products': 'Produit',
      'nav.badge.abadakor': '90 – 100 g',
      'nav.dropdown.desc': 'Découvrez le muffin au chocolat, sa composition complète et ses différents points de vue.',

      // Hero (Présentation de Corfovia & Vision)
      'hero.title.em': 'Corfovia :',
      'hero.title.after': 'la gourmandise engagée,',
      'hero.title.highlight': "sans l'excès de sucre.",
      'hero.subtitle': 'Substituer les collations trop sucrées et revaloriser des protéines animales non valorisées à haute densité nutritionnelle au sein de la pâtisserie gourmande.',
      'hero.cta.discover': 'Découvrir notre équipe →',
      'hero.cta.science': 'Voir notre création Abadakor',

      // Piliers de la Vision Corfovia (Concis & Pertinents)
      'pillars.title': 'Les 4 Piliers',
      'pillars.title.span': 'Corfovia',
      'pillars.subtitle': 'Anti-gaspillage, densité nutritionnelle et gourmandise sans sucre raffiné.',
      'pillar1.kpi': 'Anti-Gaspi',
      'pillar1.title': 'Économie Circulaire',
      'pillar1.desc': "Réintégrer dans l'alimentation des protéines animales délaissées.",
      'pillar2.kpi': 'Indice Glycémique',
      'pillar2.title': 'Substitut au Sucre',
      'pillar2.desc': 'Remplacer les collations trop sucrées par des fibres de chicorée.',
      'pillar3.kpi': 'Fer & Vitamine B12',
      'pillar3.title': 'Haute Biodisponibilité',
      'pillar3.desc': 'Privilégier le fer héminique naturellement assimilable (15–35 %).',
      'pillar4.kpi': 'Zéro Frein Gustatif',
      'pillar4.title': 'Acceptabilité Gourmande',
      'pillar4.desc': 'Intégrer des nutriments délaissés sans jamais altérer le goût.',

      // Notre Équipe (6 Membres & 6 Rôles — Épuré)
      'inno.title': "L'Équipe",
      'inno.title.span': 'Corfovia',
      'inno.subtitle': "6 étudiants, 6 expertises complémentaires autour d'une même création.",
      'team.m1.role': 'Direction & Stratégie',
      'team.m1.name': 'Membre 1',
      'team.m2.role': 'R&D & Formulation',
      'team.m2.name': 'Membre 2',
      'team.m3.role': 'Nutrition & Sciences',
      'team.m3.name': 'Membre 3',
      'team.m4.role': 'Qualité & Procédés',
      'team.m4.name': 'Membre 4',
      'team.m5.role': 'Sourcing & Filières',
      'team.m5.name': 'Membre 5',
      'team.m6.role': 'Design & Digital',
      'team.m6.name': 'Gabriel Jagueneau',
      'inno.invite.title': 'Notre création : le muffin Abadakor',
      'inno.invite.desc': '90–100 g • Chocolat, Oligofructose & 30 g de protéines animales non valorisées.',
      'inno.invite.btn': 'Voir la recette & le produit →',

      // Science & Jauges (UI réduite & visuelle)
      'science.header.title': 'Biodisponibilité du Fer',
      'science.header.badge': '×3 à ×4 plus assimilé',
      'science.dial.corfovia.title': 'Fer Héminique',
      'science.dial.corfovia.desc': 'Protéines animales valorisées',
      'science.dial.synthetic.title': 'Fer Non-Héminique',
      'science.dial.synthetic.desc': 'Freiné par les phytates',
      'science.dial.absorbed': 'Absorbé',
      'science.footnote': 'Absorption moyenne ~25 % vs ~5 % (Hurrell & Egli, 2010 • EFSA, 2015)',
      'comp.synthetic.badge': 'Classique',
      'comp.natural.badge': 'Corfovia',

      // Modal Sources Scientifiques
      'science.sources.title': 'Sources Scientifiques & Réglementaires',
      'science.sources.modal.sub': 'Références officielles appuyant notre démarche nutritionnelle et fonctionnelle.',
      'science.source1.text': "Scientific Opinion on Dietary Reference Values for iron. EFSA Journal 2015;13(10):4254. Documente les différences d'absorption entre le fer héminique d'origine animale et le fer non-héminique.",
      'science.source2.text': "Iron bioavailability and dietary reference values. Am J Clin Nutr, 91(5), 1461S–1467S. Établit un taux d'absorption de 15 % à 35 % pour le fer héminique contre 2 % à 10 % pour le fer non-héminique.",
      'science.source3.text': 'Scientific Opinion on the substantiation of a health claim related to non-digestible carbohydrates (oligofructose) and a reduction of post-prandial glycaemic responses. EFSA Journal 2014;12(1):3513.',
      'science.source4.text': 'Base de données de référence sur la composition nutritionnelle des aliments en France, détaillant les teneurs naturelles des protéines animales en fer héminique et en vitamine B12.',

      // Editorial Science (3 repères visuels)
      'routine.title': 'La science',
      'routine.title.span': 'en 3 repères',
      'routine.p1.title': 'Fer Héminique & Vitamine B12',
      'routine.p1.desc': "Transport de l'oxygène & réduction de la fatigue (UE 432/2012).",
      'routine.p2.title': 'Substitut aux Collations Trop Sucrées',
      'routine.p2.desc': 'Oligofructose : pic glycémique réduit après le repas (EFSA, 2014).',
      'routine.p3.title': 'Protéines Animales Valorisées',
      'routine.p3.desc': "Intégrées au cœur d'un muffin au chocolat moelleux de 90–100 g.",
      'routine.btn': 'Voir le produit →',
      'routine.btn.sources': 'Sources scientifiques (4)',

      // Communauté & Contact
      'comm.title': 'Échanger avec',
      'comm.title.span': "l'équipe Corfovia",
      'comm.subtitle': 'Une question sur notre projet ou le muffin Abadakor ? Écrivez-nous directement.',
      'comm.cta.title': 'Direct sur Instagram & Email',
      'comm.desc': "Coulisses du projet, essais pâtissiers et échanges directs avec l'équipe.",
      'comm.qr': 'Scannez le QR Code',
      'comm.btn': 'Nous contacter sur @corfovia',

      // Footer
      'footer.baseline': "Projet d'innovation alimentaire revalorisant des protéines animales non valorisées au sein de créations pâtissières gourmandes.",
      'footer.col1.title': 'Maison Corfovia',
      'footer.col2.title': 'Produit',
      'footer.col3.title': 'Engagements',
      'footer.link.contact': 'Nous Contacter',
      'footer.link.abadakor': 'Le Muffin Abadakor',
      'footer.link.recipe': 'Composition & Recette',
      'footer.link.sources': 'Sources Documentaires',
      'footer.exigence1': 'Protéines Animales Valorisées',
      'footer.exigence2': 'Démarche Anti-Gaspillage',
      'footer.exigence3': 'Savoir-Faire Pâtissier',
      'footer.exigence4': 'Sources Scientifiques',
      'footer.copy': "© 2026 Corfovia. Tous droits réservés.",
      'footer.mention': `Projet d'innovation alimentaire & anti - gaspillage.`,

      // Page Produit Abadakor (Composition réservée à cette page + Points de vue)
      'product.breadcrumb.home': 'Accueil',
      'product.perspectives.label': 'Sélectionner un point de vue :',
      'product.pill.face': 'Vue de face',
      'product.pill.dessus': 'Vue de dessus',
      'product.pill.coupe': 'Vue en coupe',
      'product.pill.profil': 'Vue de profil',
      'product.view.face.title': 'Vue de Face • Dôme Pâtissier Généreux (90–100 g)',
      'product.view.face.sub': "Silhouette traditionnelle d'un muffin au chocolat fraîchement sorti du four",
      'product.view.dessus.title': 'Vue de Dessus • Croûte Chocolatée Craquelée',
      'product.view.dessus.sub': 'Aspect gourmand obtenu grâce à la cuisson de la pâte au chocolat et au beurre',
      'product.view.coupe.title': 'Vue en Coupe • Mie Moelleuse & Homogène',
      'product.view.coupe.sub': 'Intégration fine des 30 g de protéines animales non valorisées au sein de la mie',
      'product.view.profil.title': 'Vue de Profil • Format Individuel 90 à 100 g',
      'product.view.profil.sub': 'Une portion généreuse pensée pour allier plaisir pâtissier et densité nutritionnelle',
      'product.weight.badge': 'Muffin total : 90 à 100 g • 30 g de protéines animales non valorisées',
      'product.desc': "« Valoriser 30 g de protéines animales non valorisées dans un vrai muffin pâtissier au chocolat ? » Dès la première bouchée : <em>« Ah bah d'accord ! »</em> Une recette gourmande où l'oligofructose remplace le sucre raffiné.",
      'product.recipe.box.title': 'La Recette du Muffin',
      'product.tag.protein': 'Protéines animales non valorisées (30 g / muffin)',
      'product.tag.beneo': 'Oligofructose',
      'product.tag.choc': 'Chocolat',
      'product.tag.butter': 'Beurre',
      'product.tag.yeast': 'Levure chimique',
      'product.tag.flour': 'Farine',
      'product.tag.eggs': 'Œufs',
      'product.tag.salt': 'Sel',
      'product.tag.milk': 'Lait',
      'product.contact.desc': "Ce produit est présenté dans le cadre du projet Corfovia. Pour toute question, dégustation ou demande d'information, contactez notre équipe :",
      'product.btn.contact': 'Nous contacter sur @corfovia →',
      'product.btn.science': 'Voir les sources documentaires',
      'product.acc1.title': 'Recette & Composition (Muffin de 90 à 100 g)',
      'product.acc1.content': '• <strong>Oligofructose :</strong> fibre prébiotique issue de la racine de chicorée qui remplace le sucre.<br>• <strong>Protéines animales non valorisées :</strong> 30 g par muffin.<br>• <strong>Ingrédients pâtissiers :</strong> Beurre, levure chimique, farine, œufs, sel, lait, chocolat.<br>• <strong>Poids total :</strong> 90 à 100 g par muffin.',
      'product.acc2.title': 'Intérêt Nutritionnel Documenté (ANSES / EFSA)',
      'product.acc2.content': "• <strong>Fer héminique & Vitamine B12 :</strong> selon la table ANSES-Ciqual, ces protéines animales non valorisées sont naturellement riches en fer héminique (biodisponibilité de 15 à 35 % selon Hurrell & Egli, 2010) et en vitamine B12.<br>• <strong>Réduction de la réponse glycémique :</strong> le remplacement des sucres par l'oligofructose dans les aliments induit une hausse plus faible de la glycémie postprandiale (Avis EFSA Journal 2014;12(1):3513).",
      'product.acc3.title': 'Démarche Anti-Gaspillage Alimentaire',
      'product.acc3.content': "Bien que très riches sur le plan nutritionnel, ces protéines animales non valorisées sont aujourd'hui délaissées. Abadakor les intègre directement au sein d'une matrice pâtissière au chocolat familière et gourmande afin de les revaloriser sans compromis sur le plaisir.",

      // Page 404
      'error404.badge': 'Erreur 404 • Hors Recette',
      'error404.title': 'Aucune miette',
      'error404.title.span': 'à cette adresse.',
      'error404.desc': 'Chez Corfovia, rien ne se perd… sauf peut-être cette page. Elle a été déplacée, revalorisée ailleurs ou n’a jamais existé.',
      'error404.btn.home': 'Retourner à l’accueil →',
      'error404.btn.product': 'Découvrir le muffin Abadakor',
      'error404.links.label': 'Accès directs :'
    },

    en: {
      // Header & Navigation
      'nav.vision': 'The Vision',
      'nav.innovation': 'Our Team',
      'nav.science': 'Our Science',
      'nav.products': 'Product',
      'nav.badge.abadakor': '90 – 100 g',
      'nav.dropdown.desc': 'Discover the chocolate muffin, its full recipe composition and its different angles.',

      // Hero
      'hero.title.em': 'Corfovia:',
      'hero.title.after': 'committed pastry indulgence,',
      'hero.title.highlight': 'without the excess sugar.',
      'hero.subtitle': 'Replacing overly sugary snacks and upcycling nutrient-dense unvalued animal proteins at the heart of gourmet pastry.',
      'hero.cta.discover': 'Meet our team →',
      'hero.cta.science': 'View our creation Abadakor',

      // Piliers
      'pillars.title': 'The 4 Pillars',
      'pillars.title.span': 'of Corfovia',
      'pillars.subtitle': 'Anti-waste, nutritional density and indulgence without refined sugar.',
      'pillar1.kpi': 'Anti-Waste',
      'pillar1.title': 'Circular Economy',
      'pillar1.desc': 'Reintegrating overlooked animal proteins into everyday nutrition.',
      'pillar2.kpi': 'Glycemic Impact',
      'pillar2.title': 'Sugar Substitute',
      'pillar2.desc': 'Replacing overly sugary snacks with chicory root fibers.',
      'pillar3.kpi': 'Iron & Vitamin B12',
      'pillar3.title': 'High Bioavailability',
      'pillar3.desc': 'Prioritizing naturally absorbable heme iron (15–35% absorbed).',
      'pillar4.kpi': 'Zero Taste Barrier',
      'pillar4.title': 'Gourmet Acceptability',
      'pillar4.desc': 'Integrating overlooked nutrients without ever compromising on taste.',

      // Our Team (6 Members & 6 Roles)
      'inno.title': 'The Corfovia',
      'inno.title.span': 'Team',
      'inno.subtitle': '6 students, 6 complementary areas of expertise around a shared creation.',
      'team.m1.role': 'Direction & Strategy',
      'team.m1.name': 'Member 1',
      'team.m2.role': 'R&D & Formulation',
      'team.m2.name': 'Member 2',
      'team.m3.role': 'Nutrition & Science',
      'team.m3.name': 'Member 3',
      'team.m4.role': 'Quality & Processes',
      'team.m4.name': 'Member 4',
      'team.m5.role': 'Sourcing & Supply',
      'team.m5.name': 'Member 5',
      'team.m6.role': 'Design & Digital',
      'team.m6.name': 'Gabriel Jagueneau',
      'inno.invite.title': 'Our creation: the Abadakor muffin',
      'inno.invite.desc': '90–100 g • Chocolate, Oligofructose & 30 g unvalued animal proteins.',
      'inno.invite.btn': 'View recipe & product →',

      // Science & Jauges
      'science.header.title': 'Iron Bioavailability',
      'science.header.badge': '×3 to ×4 more absorbed',
      'science.dial.corfovia.title': 'Heme Iron',
      'science.dial.corfovia.desc': 'Upcycled animal proteins',
      'science.dial.synthetic.title': 'Non-Heme Iron',
      'science.dial.synthetic.desc': 'Inhibited by phytates',
      'science.dial.absorbed': 'Absorbed',
      'science.footnote': 'Average absorption ~25% vs ~5% (Hurrell & Egli, 2010 • EFSA, 2015)',
      'comp.synthetic.badge': 'Standard',
      'comp.natural.badge': 'Corfovia',

      // Modal Sources Scientifiques
      'science.sources.title': 'Scientific & Regulatory Sources',
      'science.sources.modal.sub': 'Official references supporting our nutritional and functional approach.',
      'science.source1.text': 'Scientific Opinion on Dietary Reference Values for iron. EFSA Journal 2015;13(10):4254. Documents absorption differences between animal-derived heme iron and non-heme iron.',
      'science.source2.text': 'Iron bioavailability and dietary reference values. Am J Clin Nutr, 91(5), 1461S–1467S. Establishes a 15% to 35% absorption rate for heme iron versus 2% to 10% for non-heme iron.',
      'science.source3.text': 'Scientific Opinion on the substantiation of a health claim related to non-digestible carbohydrates (oligofructose) and a reduction of post-prandial glycaemic responses. EFSA Journal 2014;12(1):3513.',
      'science.source4.text': 'French reference database on the nutritional composition of foods, detailing natural heme iron and vitamin B12 levels in animal proteins.',

      // Editorial Science
      'routine.title': 'Science',
      'routine.title.span': 'in 3 key facts',
      'routine.p1.title': 'Heme Iron & Vitamin B12',
      'routine.p1.desc': 'Normal oxygen transport & reduction of tiredness (EU 432/2012).',
      'routine.p2.title': 'Substitute for Overly Sugary Snacks',
      'routine.p2.desc': 'Oligofructose: lower blood glucose rise after meals (EFSA, 2014).',
      'routine.p3.title': 'Upcycled Animal Proteins',
      'routine.p3.desc': 'Integrated at the heart of a soft 90–100 g chocolate muffin.',
      'routine.btn': 'View product →',
      'routine.btn.sources': 'Scientific sources (4)',

      // Communauté & Contact
      'comm.title': 'Connect with',
      'comm.title.span': 'the Corfovia team',
      'comm.subtitle': 'Have a question about our project or the Abadakor muffin? Message us directly.',
      'comm.cta.title': 'Direct on Instagram & Email',
      'comm.desc': 'Behind the scenes, baking trials and direct messages with our team.',
      'comm.qr': 'Scan the QR Code',
      'comm.btn': 'Contact us on @corfovia',

      // Footer
      'footer.baseline': 'Food innovation project upcycling unvalued animal proteins into gourmet pastry creations.',
      'footer.col1.title': 'Corfovia House',
      'footer.col2.title': 'Product',
      'footer.col3.title': 'Commitments',
      'footer.link.contact': 'Contact Us',
      'footer.link.abadakor': 'The Abadakor Muffin',
      'footer.link.recipe': 'Composition & Recipe',
      'footer.link.sources': 'Documentary Sources',
      'footer.exigence1': 'Upcycled Animal Proteins',
      'footer.exigence2': 'Anti-Waste Approach',
      'footer.exigence3': 'Pastry Craftsmanship',
      'footer.exigence4': 'Scientific Sources',
      'footer.copy': '© 2026 Corfovia. All rights reserved.',
      'footer.mention': 'Food innovation & anti-waste project.',

      // Page Produit Abadakor (Composition réservée à cette page + Points de vue)
      'product.breadcrumb.home': 'Home',
      'product.perspectives.label': 'Select a point of view:',
      'product.pill.face': 'Front view',
      'product.pill.dessus': 'Top view',
      'product.pill.coupe': 'Cross-section',
      'product.pill.profil': 'Side view',
      'product.view.face.title': 'Front View • Generous Bakery Dome (90–100 g)',
      'product.view.face.sub': 'Traditional silhouette of a freshly baked chocolate muffin',
      'product.view.dessus.title': 'Top View • Cracked Chocolate Crust',
      'product.view.dessus.sub': 'Gourmet appearance achieved by baking the rich chocolate and butter batter',
      'product.view.coupe.title': 'Cross-Section • Soft & Homogeneous Crumb',
      'product.view.coupe.sub': 'Fine integration of 30 g of unvalued animal proteins inside the crumb',
      'product.view.profil.title': 'Side View • Individual 90 to 100 g Portion',
      'product.view.profil.sub': 'A generous portion designed to combine pastry indulgence with nutritional density',
      'product.weight.badge': 'Total muffin: 90 to 100 g • 30 g unvalued animal proteins',
      'product.desc': '“Upcycling 30 g of unvalued animal proteins in a real chocolate bakery muffin?” From the first bite: <em>“Ah, got it!”</em> A gourmet recipe where oligofructose replaces refined sugar.',
      'product.recipe.box.title': 'The Muffin Recipe',
      'product.tag.protein': 'Unvalued animal proteins (30 g / muffin)',
      'product.tag.beneo': 'Oligofructose',
      'product.tag.choc': 'Chocolate',
      'product.tag.butter': 'Butter',
      'product.tag.yeast': 'Baking powder',
      'product.tag.flour': 'Flour',
      'product.tag.eggs': 'Eggs',
      'product.tag.salt': 'Salt',
      'product.tag.milk': 'Milk',
      'product.contact.desc': 'This product is presented as part of the Corfovia project. For any questions, tasting inquiries or information, contact our team:',
      'product.btn.contact': 'Contact us on @corfovia →',
      'product.btn.science': 'View documentary sources',
      'product.acc1.title': 'Recipe & Composition (90 to 100 g Muffin)',
      'product.acc1.content': '• <strong>Oligofructose:</strong> prebiotic fiber from chicory root replacing refined sugar.<br>• <strong>Unvalued animal proteins:</strong> 30 g per muffin.<br>• <strong>Pastry ingredients:</strong> Butter, baking powder, flour, eggs, salt, milk, chocolate.<br>• <strong>Total weight:</strong> 90 to 100 g per muffin.',
      'product.acc2.title': 'Documented Nutritional Interest (ANSES / EFSA)',
      'product.acc2.content': '• <strong>Heme iron & Vitamin B12:</strong> according to the ANSES-Ciqual database, these unvalued animal proteins are naturally rich in heme iron (15–35% bioavailability according to Hurrell & Egli, 2010) and vitamin B12.<br>• <strong>Lower glycemic response:</strong> replacing sugars with oligofructose in foods induces a lower post-prandial blood glucose rise (EFSA Journal 2014;12(1):3513).',
      'product.acc3.title': 'Anti-Food-Waste Approach',
      'product.acc3.content': 'Although nutritionally dense, these unvalued animal proteins are often overlooked today. Abadakor incorporates them directly into a familiar, indulgent chocolate muffin matrix to upcycle them without compromising on taste.',

      // Page 404
      'error404.badge': 'Error 404 • Off Recipe',
      'error404.title': 'Not a single crumb',
      'error404.title.span': 'at this address.',
      'error404.desc': 'At Corfovia, nothing goes to waste… except maybe this page. It may have been moved, upcycled elsewhere, or never existed.',
      'error404.btn.home': 'Back to homepage →',
      'error404.btn.product': 'Discover the Abadakor muffin',
      'error404.links.label': 'Quick links:'
    }
  };

  const getLanguageFromPath = () => {
    if (typeof window === 'undefined') return null;
    const pathSegments = window.location.pathname.split('/').filter(Boolean);
    if (pathSegments.length > 0 && VALID_LANGS.includes(pathSegments[0])) {
      return pathSegments[0];
    }
    return null;
  };

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
   * Change la langue active et synchronise l'URL (/fr/... ou /en/...)
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

      // Construit l'URL propre : /fr/ ou /en/ ou /fr/products/muffin-vitalite/ (et supprime tout ?lang= éventuel)
      const newUrl = '/' + langCode + '/' + (pagePath ? pagePath + '/' : '');
      const params = new URLSearchParams(window.location.search);
      params.delete('lang');
      const cleanSearch = params.toString() ? '?' + params.toString() : '';

      // Si un hash de section est présent au chargement initial, on le mémorise pour le scroll automatique
      if (window.location.hash) {
        const hashId = window.location.hash.replace(/^#/, '');
        if (hashId) {
          try {
            sessionStorage.setItem('corfovia_pending_scroll', hashId);
          } catch (_) { }
        }
      }

      const targetFullUrl = newUrl + cleanSearch;
      const currentFullUrl = window.location.pathname + window.location.search + window.location.hash;

      if (currentFullUrl !== targetFullUrl) {
        window.history.replaceState(null, document.title, targetFullUrl);
      }
    }

    applyTranslations(langCode);
    updateLanguageButtons(langCode);
    document.documentElement.lang = langCode;
    window.dispatchEvent(new CustomEvent('corfoviaLanguageChange', { detail: { lang: langCode } }));
  };

  const applyTranslations = (langCode) => {
    const dict = translations[langCode] || translations.fr;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const key = el.getAttribute('data-i18n');
      if (dict[key]) {
        el.textContent = dict[key];
      }
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const key = el.getAttribute('data-i18n-html');
      if (dict[key]) {
        el.innerHTML = dict[key];
      }
    });
  };

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
