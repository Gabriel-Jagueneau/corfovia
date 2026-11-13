/**
 * CORFOVIA — Système Internationalisation (i18n)
 * Dictionnaire complet FR / EN : Vision, Équipe, Projet & Produit Abadakor
 */

(() => {
  'use strict';

  const STORAGE_KEY = 'corfovia_language';
  const VALID_LANGS = ['fr', 'en'];

  const translations = {
    fr: {
      // Header & Navigation
      'nav.vision': 'Vision',
      'nav.innovation': 'Équipe',
      'nav.science': 'Projet',
      'nav.products': 'Produit',
      'nav.badge.abadakor': 'Prot & fibres',
      'nav.dropdown.desc': `Le premier muffin qui met tout le monde d'accord`,

      // Hero
      'hero.pill': 'Goûter Malin, Moins de Sucre',
      'hero.title.em': 'Corfovia :',
      'hero.title.after': 'le goûter gourmand,',
      'hero.title.highlight': "sans excès de sucre.",
      'hero.subtitle': 'Un muffin au chocolat moelleux, riche en protéines et en fer, rassasiant pour les enfants.',
      'hero.cta.discover': 'L’équipe →',
      'hero.cta.science': 'Découvrir Abadakor',

      // Piliers
      'pillars.title': '4 Piliers',
      'pillars.title.span': 'Corfovia',
      'pillars.subtitle': 'Anti-gaspi, chicorée douce et fer naturel.',
      'pillar1.kpi': 'Anti-Gaspi',
      'pillar1.title': 'Économie Circulaire',
      'pillar1.desc': 'Revaloriser des protéines animales délaissées.',
      'pillar2.kpi': 'Sans Pic',
      'pillar2.title': 'Chicorée Douce',
      'pillar2.desc': 'Fibres douces à la place du sucre raffiné.',
      'pillar3.kpi': 'Fer & B12',
      'pillar3.title': 'Assimilation ×3',
      'pillar3.desc': 'Fer héminique naturel (15–35 % absorbé).',
      'pillar4.kpi': '90 g Goûter',
      'pillar4.title': 'Satiété Saine',
      'pillar4.desc': '11,2 g de protéines et 13,1 g de fibres.',

      // Notre Équipe
      'inno.title': "L'Équipe",
      'inno.title.span': 'Corfovia',
      'inno.subtitle': '6 étudiants, 1 création commune.',
      'team.m1.role': 'Financier & administration',
      'team.m1.name': 'Arnaud BENZAROUR',
      'team.m2.role': 'Gestion qualité',
      'team.m2.name': 'Liliane Carole CHIMOU',
      'team.m3.role': 'Développement numérique',
      'team.m3.name': 'Gabriel JAGUENEAU',
      'team.m4.role': 'Marketing commercial',
      'team.m4.name': 'Gaspard VANDE PUTTE',
      'team.m5.role': 'Responsable production',
      'team.m5.name': 'Aurélien ROISEUX',
      'team.m6.role': 'Logistique',
      'team.m6.name': 'Florian LECLERCQ',
      'inno.invite.title': 'Notre création : Abadakor',
      'inno.invite.desc': '90 g de chocolat, chicorée & 11,2 g de protéines valorisées.',
      'inno.invite.btn': 'Voir le produit →',

      // Le Projet Corfovia (Pourquoi nous sommes là)
      'project.card.title': 'Corfovia',
      'project.card.badge': 'Projet Étudiant',
      'project.m1.label': 'Le constat',
      'project.m1.text': 'Des goûters trop sucrés qui nourissent mal les enfants.', // Des goûters trop sucrés et peu nutritif.
      'project.m2.label': 'La ressource',
      'project.m2.text': 'Des protéines animales riches trop souvent écartées.',
      'project.m3.label': 'La réponse',
      'project.m3.text': 'Un vrai muffin chocolat que les enfants réclament.',
      'project.lead': 'Six étudiants convaincus qu’on peut mieux nourrir les enfants sans gaspiller ce que nos filières produisent déjà.',

      // Editorial Projet
      'routine.title': 'Pourquoi',
      'routine.title.span': 'nous sommes là',
      'routine.p1.title': 'Une démarche étudiante',
      'routine.p1.desc': 'Née d’un projet d’école pour réconcilier plaisir sucré et vraie nutrition.',
      'routine.p2.title': 'Zéro gaspillage de matière',
      'routine.p2.desc': 'Revaloriser des co-produits riches plutôt que les laisser de côté.',
      'routine.p3.title': 'Pensé pour les familles',
      'routine.p3.desc': 'Parler vrai aux parents, régaler simplement les enfants.',
      'routine.btn': 'Découvrir Abadakor →',
      'routine.btn.contact': 'Échanger avec nous',

      // Communauté & Contact
      'comm.title': 'Échanger avec',
      'comm.title.span': "l'équipe",
      'comm.subtitle': 'Une question sur le projet ou Abadakor ?',
      'comm.cta.title': 'Instagram & Email',
      'comm.desc': 'Coulisses et échanges directs.',
      'comm.qr': 'Scannez le QR Code',
      'comm.btn': '@corfovia',

      // Footer
      'footer.baseline': 'Innovation alimentaire & goûter sain pour enfants.',
      'footer.col1.title': 'Corfovia',
      'footer.col2.title': 'Produit',
      'footer.col3.title': 'Engagements',
      'footer.link.contact': 'Contact',
      'footer.link.abadakor': 'Abadakor 90 g',
      'footer.link.recipe': 'Recette',
      'footer.exigence1': 'Protéines Valorisées',
      'footer.exigence2': 'Anti-Gaspillage',
      'footer.exigence3': 'Moins de Sucre',
      'footer.exigence4': 'Projet Étudiant',
      'footer.copy': '© 2026 Corfovia — Projet étudiant d’innovation alimentaire.',
      'footer.mention': 'Projet étudiant d’innovation alimentaire.',

      // Page Produit Abadakor
      'product.breadcrumb.home': 'Accueil',
      'product.hero.pill': 'Muffin Chocolat 90 g',
      'product.hero.title.1': 'Abadakor :',
      'product.hero.short': 'le goûter qui réconcilie.',
      'product.hero.sub.short': 'Plaisir chocolat pour eux. Équilibre total pour vous.',
      'product.chip.sugar': 'Sucre raffiné',
      'product.chip.protein': 'Protéines',
      'product.chip.iron': 'Fer héminique',
      'product.chip.fiber': 'Fibres',
      'product.chip.portion': 'Goûter nomade',
      'product.mini.curve': 'Énergie douce',
      'product.mini.sub': 'Zéro pic de sucre',
      'product.desc.short': 'Moelleux chocolat noir 85 %, sans sucre raffiné. Pensé pour les enfants, validé pour les parents.',
      'product.macro.energy': 'Énergie',
      'product.macro.protein': 'Protéines',
      'product.macro.fiber': 'Fibres',
      'product.macro.sugar': 'Sucre raffiné',
      'product.split.title': 'Un muffin.',
      'product.split.title.span': 'Deux regards.',
      'product.split.sub': 'Glissez pour révéler la transparence parent sous la gourmandise enfant.',
      'product.split.kid.label': 'Pour l’enfant',
      'product.split.kid.title': 'Chocolat 85 %',
      'product.split.kid.sub': 'Croûte craquelée, cœur fondant.',
      'product.split.parent.label': 'Pour le parent',
      'product.split.parent.spec': '90 g · ~233 kcal · 0 g sucre raffiné',
      'product.split.parent.title': 'Zéro pic de sucre',
      'product.split.parent.sub': '11,2 g protéines · 13,1 g fibres · Fer ×3',
      'product.split.parent.spec.a': '90 g',
      'product.split.parent.spec.b': '~233 kcal',
      'product.split.parent.spec.c': '0 g sucre raffiné',
      'product.split.parent.sub.a': '11,2 g protéines',
      'product.split.parent.sub.b': '13,1 g fibres',
      'product.split.parent.sub.c': 'Fer ×3',
      'product.split.btn.kid': 'Regard Enfant',
      'product.split.btn.mid': '50 / 50',
      'product.split.btn.parent': 'Regard Parent',
      'product.hero.tagline': '<span>Abadakor :</span> Le premier muffin qui vous fait dire <em>Ah bah d’accord !</em>',
      'product.hero.title.2': 'le muffin chocolat',
      'product.hero.title.3': 'qui réconcilie enfants & parents.',
      'product.hero.subtitle': 'Moelleux au chocolat noir, 0 % sucre raffiné et 11,2 g de protéines riches en fer.',
      'product.hero.scroll': 'Explorer le muffin',
      'product.orbit.1': '0 % Sucre Raffiné',
      'product.orbit.2': '11,2 g Protéines',
      'product.orbit.3': '13,1 g Fibres',
      'product.orbit.4': 'Fer Héminique ×3',
      'product.orbit.5': 'Portion 90 g',
      'product.orbit.6': 'Anti-Gaspi',
      'product.story.eyebrow': 'Recette',
      'product.story.title': 'L’anatomie',
      'product.story.title.span': 'd’Abadakor',
      'product.story.sub': '4 couches pensées pour l’énergie des enfants.',
      'product.step1.badge': 'Dôme',
      'product.step1.title': 'Chocolat noir 85 %',
      'product.step1.desc': 'Croûte craquelée, vrai chocolat et beurre doux.',
      'product.step2.badge': 'Chicorée',
      'product.step2.title': 'Zéro pic de sucre',
      'product.step2.desc': 'Fibres douces de chicorée pour une énergie stable sans coup de barre.',
      'product.step3.badge': 'Vitalité',
      'product.step3.title': '11,2 g de protéines & fer',
      'product.step3.desc': 'Protéines animales valorisées, fer héminique (×3 mieux absorbé) et vitamine B12.',
      'product.step4.badge': 'Anti-gaspi',
      'product.step4.title': 'Protéines animales valorisées',
      'product.step4.desc': 'Récupération anti-gaspi de protéines animales non valorisées, transformées en nutrition utile sans compromis sur le goût.',
      'product.pin.1': 'Dôme cacao 85 %',
      'product.pin.2': 'Mie & chicorée 10 g',
      'product.pin.3': '11,2 g prot. & fer ×3',
      'product.pin.4': 'Anti-gaspi & filière',
      'product.ing.title': '6 Ingrédients',
      'product.ing.title.span': 'transparents',
      'product.ing.sub': 'Rien de superflu, que du bon.',
      'product.ing1.qty': '11,2 g',
      'product.ing1.name': 'Protéines valorisées',
      'product.ing1.role': '11,2 g de protéines nettes par muffin, fer héminique & B12.',
      'product.ing2.qty': '10 g',
      'product.ing2.name': 'Chicorée prébiotique',
      'product.ing2.role': 'Remplace le sucre, nourrit le microbiote.',
      'product.ing3.qty': '85 %',
      'product.ing3.name': 'Chocolat noir',
      'product.ing3.role': 'Goût intense adoré des enfants, magnésium.',
      'product.ing4.qty': 'Base',
      'product.ing4.name': 'Farine & Levure',
      'product.ing4.role': 'Dôme aéré et glucides lents.',
      'product.ing5.qty': 'Fondant',
      'product.ing5.name': 'Beurre doux & Lait',
      'product.ing5.role': 'Texture fondante et calcium.',
      'product.ing6.qty': 'Liant',
      'product.ing6.name': 'Œufs & Sel',
      'product.ing6.role': 'Moelleux aérien et liant naturel.',
      'product.duel.title': 'Goûter Classique vs',
      'product.duel.title.span': 'Abadakor',
      'product.duel.sub': 'L’énergie du goûter, sans le coup de barre.',
      'product.duel.classic': 'Goûter classique',
      'product.duel.abadakor': 'Abadakor 90 g',
      'product.duel.m1.title': 'Sucres Simples',
      'product.duel.m1.benefit': 'Zéro pic de sucre',
      'product.duel.m2.title': 'Fibres Douces',
      'product.duel.m2.benefit': '10× plus de fibres',
      'product.duel.m3.title': 'Protéines',
      'product.duel.m3.benefit': 'Satiété durable',
      'product.duel.m4.title': 'Fer Assimilé',
      'product.duel.m4.benefit': 'Fer héminique naturel',
      'product.duel.ours': 'Abadakor',
      'product.duel.key.classic': 'Goûter classique : portion équivalente de 90 g',
      'product.duel.key.ours': 'Abadakor : nos données, 1 muffin de 90 g',
      'product.duel.u1': '1 morceau de sucre ≈ 5 g',
      'product.duel.u2': '1 feuille = 1 g de fibres',
      'product.duel.u3': '1 icône = 1 g de protéines',
      'product.duel.u4': 'Part du fer réellement absorbée par l’organisme',
      'product.nutri.title': 'Repères',
      'product.nutri.title.span': 'nutritionnels',
      'product.nutri.sub': 'Pour 1 muffin Abadakor (90 g).',
      'product.nutri.kcal.label': 'Énergie',
      'product.nutri.kcal.sub': '~233 kcal',
      'product.nutri.prot.label': 'Protéines',
      'product.nutri.prot.sub': '11,2 g',
      'product.nutri.fiber.label': 'Fibres',
      'product.nutri.fiber.sub': '13,1 g',
      'product.nutri.sugar.label': 'Sucres ajoutés',
      'product.nutri.sugar.sub': '0 g',
      'product.perspectives.label': 'Angle :',
      'product.pill.face': 'Plateau',
      'product.pill.dessus': 'Croûte 85 %',
      'product.pill.coupe': 'Craquelé',
      'product.pill.profil': 'Portion 90 g',
      'product.view.face.title': 'Vue d’ensemble, sortie du four',
      'product.view.face.sub': 'Fournée artisanale de muffins Abadakor 90 g.',
      'product.view.dessus.title': 'Dôme craquelé, cacao 85 %',
      'product.view.dessus.sub': 'Croûte riche en vrai chocolat noir et beurre doux.',
      'product.view.coupe.title': 'Cœur fondant, fibres de chicorée',
      'product.view.coupe.sub': 'Mie aérée sans sucre raffiné, douce pour les enfants.',
      'product.view.profil.title': 'Équilibre & anti-gaspillage, 90 g',
      'product.view.profil.sub': 'Portion individuelle équilibrée pour le goûter.',
      'product.weight.badge': 'Portion 90 g, 11,2 g de protéines',
      'product.desc': 'Un muffin au chocolat gourmand où la chicorée remplace le sucre raffiné et apporte 11,2 g de protéines riches en fer.',
      'product.recipe.box.title': 'Ingrédients',
      'product.tag.protein': 'Protéines valorisées (11,2 g)',
      'product.tag.beneo': 'Chicorée prébiotique (10 g)',
      'product.tag.choc': 'Chocolat noir 85 %',
      'product.tag.butter': 'Beurre doux',
      'product.tag.yeast': 'Levure',
      'product.tag.flour': 'Farine',
      'product.tag.eggs': 'Œufs',
      'product.tag.salt': 'Sel',
      'product.tag.milk': 'Lait',
      'product.contact.desc': 'Une question sur Abadakor ? Contactez l’équipe :',
      'product.btn.contact': 'Écrire sur @corfovia →',
      'product.acc1.title': 'Valeurs & Composition (90 g)',
      'product.acc1.content': '<strong>Énergie :</strong> ~233 kcal.<br><strong>Protéines :</strong> 11,2 g.<br><strong>Fibres :</strong> 13,1 g (chicorée + cacao).<br><strong>Glucides nets :</strong> 16,3 g (farine).<br><strong>Lipides :</strong> 11,4 g (chocolat 85 % & beurre).<br><strong>Sucres raffinés :</strong> 0 g.',
      'product.acc2.title': 'Biodisponibilité & Digestion (EFSA)',
      'product.acc2.content': '<strong>Fer héminique & B12 :</strong> 15 à 35 % absorbé vs 2 à 10 % pour le fer végétal (Hurrell 2010).<br><strong>Glycémie stable :</strong> réduction de la hausse postprandiale grâce à l’oligofructose (EFSA 2014).',
      'product.acc3.title': 'Démarche Anti-Gaspi Circulaire',
      'product.acc3.content': 'Revalorisation noble de protéines animales délaissées, intégrées au cœur d’une matrice chocolatée familière sans compromis de goût.',

      // Page 404
      'error404.badge': 'Erreur 404',
      'error404.title': 'Aucune miette',
      'error404.title.span': 'à cette adresse.',
      'error404.desc': 'Cette page a été déplacée ou n’existe pas.',
      'error404.btn.home': 'Accueil →',
      'error404.btn.product': 'Voir Abadakor',
      'error404.links.label': 'Accès :'
    },

    en: {
      // Header & Navigation
      'nav.vision': 'Vision',
      'nav.innovation': 'Team',
      'nav.science': 'Project',
      'nav.products': 'Product',
      'nav.badge.abadakor': '90 g',
      'nav.dropdown.desc': '90 g chocolate muffin, recipe & views.',
      'nav.badge.abadakor': 'Prot & fiber',
      'nav.dropdown.desc': `The first muffin that everyone can agree on`,

      // Hero
      'hero.pill': 'Smart Snack, Low Sugar',
      'hero.title.em': 'Corfovia:',
      'hero.title.after': 'the gourmet snack,',
      'hero.title.highlight': 'without excess sugar.',
      'hero.subtitle': 'A soft, filling chocolate muffin rich in protein and iron for children.',
      'hero.cta.discover': 'Team →',
      'hero.cta.science': 'Discover Abadakor',

      // Piliers
      'pillars.title': '4 Pillars',
      'pillars.title.span': 'Corfovia',
      'pillars.subtitle': 'Anti-waste, chicory root and natural iron.',
      'pillar1.kpi': 'Anti-Waste',
      'pillar1.title': 'Circular Economy',
      'pillar1.desc': 'Upcycling overlooked animal proteins.',
      'pillar2.kpi': 'No Crash',
      'pillar2.title': 'Gentle Chicory',
      'pillar2.desc': 'Prebiotic fibres instead of refined sugar.',
      'pillar3.kpi': 'Iron & B12',
      'pillar3.title': '3× Absorption',
      'pillar3.desc': 'Natural heme iron (15–35% absorbed).',
      'pillar4.kpi': '90 g Snack',
      'pillar4.title': 'Healthy Satiety',
      'pillar4.desc': '11.2 g protein and 13.1 g fibre.',

      // Our Team
      'inno.title': 'The Team',
      'inno.title.span': 'Corfovia',
      'inno.subtitle': '6 students, 1 shared creation.',
      'team.m1.role': 'Finance & Administration',
      'team.m1.name': 'Arnaud BENZAROUR',
      'team.m2.role': 'Quality Management',
      'team.m2.name': 'Liliane Carole CHIMOU',
      'team.m3.role': 'Digital Development',
      'team.m3.name': 'Gabriel JAGUENEAU',
      'team.m4.role': 'Commercial Marketing',
      'team.m4.name': 'Gaspard VANDE PUTTE',
      'team.m5.role': 'Production Manager',
      'team.m5.name': 'Aurélien ROISEUX',
      'team.m6.role': 'Logistics',
      'team.m6.name': 'Florian LECLERCQ',
      'inno.invite.title': 'Our creation: Abadakor',
      'inno.invite.desc': '90 g of chocolate, chicory & 11.2 g upcycled protein.',
      'inno.invite.btn': 'View product →',

      // The Corfovia Project (Why we are here)
      'project.card.title': 'Corfovia',
      'project.card.badge': 'Student Project',
      'project.m1.label': 'The observation',
      'project.m1.text': 'Snacks that are too sugary and provide poor nutrition for children.',
      'project.m2.label': 'The resource',
      'project.m2.text': 'Rich animal proteins left aside in food chains.',
      'project.m3.label': 'The answer',
      'project.m3.text': 'A moist chocolate muffin children genuinely ask for.',
      'project.lead': 'Six students convinced we can nourish children better without wasting what food chains already produce.',

      // Editorial Project
      'routine.title': 'Why we',
      'routine.title.span': 'are here',
      'routine.p1.title': 'A Student Initiative',
      'routine.p1.desc': 'Born at school to bring baking pleasure and honest nutrition together.',
      'routine.p2.title': 'Zero Wasted Matter',
      'routine.p2.desc': 'Giving value back to rich co-products instead of leaving them aside.',
      'routine.p3.title': 'Built for Families',
      'routine.p3.desc': 'Speak plainly to parents, delight children effortlessly.',
      'routine.btn': 'Discover Abadakor →',
      'routine.btn.contact': 'Talk with us',

      // Communauté & Contact
      'comm.title': 'Connect with',
      'comm.title.span': 'the team',
      'comm.subtitle': 'Questions about the project or Abadakor?',
      'comm.cta.title': 'Instagram & Email',
      'comm.desc': 'Direct team contact.',
      'comm.qr': 'Scan the QR Code',
      'comm.btn': '@corfovia',

      // Footer
      'footer.baseline': 'Food innovation & healthy snacking for kids.',
      'footer.col1.title': 'Corfovia',
      'footer.col2.title': 'Product',
      'footer.col3.title': 'Commitments',
      'footer.link.contact': 'Contact',
      'footer.link.abadakor': 'Abadakor 90 g',
      'footer.link.recipe': 'Recipe',
      'footer.exigence1': 'Upcycled Protein',
      'footer.exigence2': 'Anti-Waste',
      'footer.exigence3': 'Low Sugar',
      'footer.exigence4': 'Student Project',
      'footer.copy': '© 2026 Corfovia — Student food innovation project.',
      'footer.mention': 'Student food-innovation project.',

      // Page Produit Abadakor
      'product.breadcrumb.home': 'Home',
      'product.hero.pill': 'Chocolate Muffin 90 g',
      'product.hero.title.1': 'Abadakor:',
      'product.hero.short': 'the snack both love.',
      'product.hero.sub.short': 'Chocolate joy for kids. Peace of mind for parents.',
      'product.chip.sugar': 'Refined sugar',
      'product.chip.protein': 'Proteins',
      'product.chip.iron': 'Heme iron',
      'product.chip.fiber': 'Fibre',
      'product.chip.portion': 'On-the-go snack',
      'product.mini.curve': 'Steady energy',
      'product.mini.sub': 'Zero sugar crash',
      'product.desc.short': 'Soft 85% dark chocolate, zero refined sugar. Made for kids, trusted by parents.',
      'product.macro.energy': 'Energy',
      'product.macro.protein': 'Proteins',
      'product.macro.fiber': 'Fibre',
      'product.macro.sugar': 'Refined sugar',
      'product.split.title': 'One muffin.',
      'product.split.title.span': 'Two perspectives.',
      'product.split.sub': 'Drag to reveal parent transparency beneath kids’ indulgence.',
      'product.split.kid.label': 'For kids',
      'product.split.kid.title': '85% Chocolate',
      'product.split.kid.sub': 'Crackled dome, soft melting core.',
      'product.split.parent.label': 'For parents',
      'product.split.parent.spec': '90 g · ~233 kcal · 0 g refined sugar',
      'product.split.parent.title': 'Zero sugar spike',
      'product.split.parent.sub': '11.2 g protein · 13.1 g fibre · Iron ×3',
      'product.split.parent.spec.a': '90 g',
      'product.split.parent.spec.b': '~233 kcal',
      'product.split.parent.spec.c': '0 g refined sugar',
      'product.split.parent.sub.a': '11.2 g protein',
      'product.split.parent.sub.b': '13.1 g fibre',
      'product.split.parent.sub.c': 'Iron ×3',
      'product.split.btn.kid': 'Kid View',
      'product.split.btn.mid': '50 / 50',
      'product.split.btn.parent': 'Parent View',
      'product.hero.tagline': '<span>Abadakor:</span> The first muffin that makes you say <em>“Ah bah d’accord!”</em>',
      'product.hero.title.2': 'the chocolate muffin',
      'product.hero.title.3': 'delighting kids & parents alike.',
      'product.hero.subtitle': 'Soft dark chocolate, 0% refined sugar, and 11.2 g of iron-rich protein.',
      'product.hero.scroll': 'Explore the muffin',
      'product.orbit.1': '0% Refined Sugar',
      'product.orbit.2': '11.2 g Protein',
      'product.orbit.3': '13.1 g Fibre',
      'product.orbit.4': 'Heme Iron ×3',
      'product.orbit.5': '90 g Portion',
      'product.orbit.6': 'Anti-Waste',
      'product.story.eyebrow': 'Recipe',
      'product.story.title': 'Abadakor’s',
      'product.story.title.span': 'anatomy',
      'product.story.sub': '4 layers designed for children’s lasting energy.',
      'product.step1.badge': 'Dome',
      'product.step1.title': '85% Dark Chocolate',
      'product.step1.desc': 'Cracked crust, real cocoa and sweet butter.',
      'product.step2.badge': 'Chicory',
      'product.step2.title': 'Zero Sugar Spike',
      'product.step2.desc': 'Gentle chicory fibre for steady energy without crashes.',
      'product.step3.badge': 'Vitality',
      'product.step3.title': '11.2 g Protein & Iron',
      'product.step3.desc': 'Upcycled animal proteins, heme iron (3× better absorbed), and vitamin B12.',
      'product.step4.badge': 'Zero waste',
      'product.step4.title': 'Upcycled animal proteins',
      'product.step4.desc': 'Anti-waste recovery of undervalued animal proteins, turned into purposeful nutrition without compromising taste.',
      'product.pin.1': '85% cocoa dome',
      'product.pin.2': 'Crumb & chicory',
      'product.pin.3': '11.2 g prot. & iron ×3',
      'product.pin.4': 'Zero waste',
      'product.ing.title': '6 Ingredients',
      'product.ing.title.span': 'pure & simple',
      'product.ing.sub': 'Nothing superfluous, only the good stuff.',
      'product.ing1.qty': '11.2 g',
      'product.ing1.name': 'Upcycled protein',
      'product.ing1.role': '11.2 g net protein per muffin, heme iron & B12.',
      'product.ing2.qty': '10 g',
      'product.ing2.name': 'Chicory prebiotic',
      'product.ing2.role': 'Replaces sugar, nourishes the gut.',
      'product.ing3.qty': '85%',
      'product.ing3.name': 'Dark chocolate',
      'product.ing3.role': 'Rich cocoa taste loved by kids, natural magnesium.',
      'product.ing4.qty': 'Base',
      'product.ing4.name': 'Flour & Yeast',
      'product.ing4.role': 'Light dome rise and slow carbohydrates.',
      'product.ing5.qty': 'Melting',
      'product.ing5.name': 'Butter & Milk',
      'product.ing5.role': 'Melting texture and natural calcium.',
      'product.ing6.qty': 'Binder',
      'product.ing6.name': 'Eggs & Salt',
      'product.ing6.role': 'Airy softness and natural bind.',
      'product.duel.title': 'Standard Snack vs',
      'product.duel.title.span': 'Abadakor',
      'product.duel.sub': 'Sustained energy, zero sugar crash.',
      'product.duel.classic': 'Standard snack',
      'product.duel.abadakor': 'Abadakor 90 g',
      'product.duel.m1.title': 'Simple Sugars',
      'product.duel.m1.benefit': 'Zero sugar spike',
      'product.duel.m2.title': 'Prebiotic Fiber',
      'product.duel.m2.benefit': '10× more fiber',
      'product.duel.m3.title': 'Protein',
      'product.duel.m3.benefit': 'Long-lasting fullness',
      'product.duel.m4.title': 'Absorbed Iron',
      'product.duel.m4.benefit': 'Natural heme iron',
      'product.duel.ours': 'Abadakor',
      'product.duel.key.classic': 'Standard snack: equivalent 90 g portion',
      'product.duel.key.ours': 'Abadakor: our data, one 90 g muffin',
      'product.duel.u1': '1 sugar cube ≈ 5 g',
      'product.duel.u2': '1 leaf = 1 g of fibre',
      'product.duel.u3': '1 icon = 1 g of protein',
      'product.duel.u4': 'Share of iron actually absorbed by the body',
      'product.nutri.title': 'Nutrition',
      'product.nutri.title.span': 'facts',
      'product.nutri.sub': 'Per 1 Abadakor muffin (90 g).',
      'product.nutri.kcal.label': 'Energy',
      'product.nutri.kcal.sub': '~233 kcal',
      'product.nutri.prot.label': 'Protein',
      'product.nutri.prot.sub': '11.2 g',
      'product.nutri.fiber.label': 'Fibre',
      'product.nutri.fiber.sub': '13.1 g',
      'product.nutri.sugar.label': 'Added sugar',
      'product.nutri.sugar.sub': '0 g',
      'product.perspectives.label': 'Angle:',
      'product.pill.face': 'Tray view',
      'product.pill.dessus': '85% Crust',
      'product.pill.coupe': 'Crackle',
      'product.pill.profil': '90 g Portion',
      'product.view.face.title': 'Full tray, oven fresh',
      'product.view.face.sub': 'Small-batch 90 g Abadakor chocolate muffins.',
      'product.view.dessus.title': 'Crackled dome, 85% cocoa',
      'product.view.dessus.sub': 'Rich crust crafted with real dark chocolate and butter.',
      'product.view.coupe.title': 'Soft core, chicory fibre',
      'product.view.coupe.sub': 'Airy crumb with zero refined sugar for steady energy.',
      'product.view.profil.title': 'Balanced zero-waste snack, 90 g',
      'product.view.profil.sub': 'Individual balanced portion ready for snack time.',
      'product.weight.badge': '90 g portion, 11.2 g protein',
      'product.desc': 'A gourmet chocolate muffin where chicory replaces refined sugar and delivers 11.2 g of iron-rich protein.',
      'product.recipe.box.title': 'Ingredients',
      'product.tag.protein': 'Upcycled protein (11.2 g)',
      'product.tag.beneo': 'Chicory prebiotic (10 g)',
      'product.tag.choc': '85% dark chocolate',
      'product.tag.butter': 'Sweet butter',
      'product.tag.yeast': 'Baking powder',
      'product.tag.flour': 'Flour',
      'product.tag.eggs': 'Eggs',
      'product.tag.salt': 'Salt',
      'product.tag.milk': 'Milk',
      'product.contact.desc': 'Questions about Abadakor? Reach our team:',
      'product.btn.contact': 'Message on @corfovia →',
      'product.acc1.title': 'Nutrition & Recipe (90 g)',
      'product.acc1.content': '<strong>Energy:</strong> ~233 kcal.<br><strong>Protein:</strong> 11.2 g.<br><strong>Fibre:</strong> 13.1 g (chicory + cocoa).<br><strong>Net carbs:</strong> 16.3 g (flour).<br><strong>Fat:</strong> 11.4 g (chocolate & butter).<br><strong>Refined sugar:</strong> 0 g.',
      'product.acc2.title': 'Bioavailability & Digestion (EFSA)',
      'product.acc2.content': '<strong>Heme iron & B12:</strong> 15–35% absorbed vs 2–10% for plant iron (Hurrell 2010).<br><strong>Stable blood sugar:</strong> reduced glycemic peak thanks to oligofructose (EFSA 2014).',
      'product.acc3.title': 'Circular Anti-Waste Approach',
      'product.acc3.content': 'Noble upcycling of overlooked animal proteins into a familiar, beloved chocolate matrix with zero taste compromise.',

      // Page 404
      'error404.badge': 'Error 404',
      'error404.title': 'No crumbs',
      'error404.title.span': 'at this address.',
      'error404.desc': 'This page has moved or does not exist.',
      'error404.btn.home': 'Home →',
      'error404.btn.product': 'View Abadakor',
      'error404.links.label': 'Links:'
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

  const getSiteRootUrl = () => {
    if (typeof document !== 'undefined') {
      const scriptEl = document.currentScript || document.querySelector('script[src*="js/i18n.js"]');
      if (scriptEl && scriptEl.src) {
        try {
          return new URL('..', scriptEl.src);
        } catch (_) { }
      }
    }
    if (typeof window !== 'undefined') {
      return new URL('/', window.location.href);
    }
    return null;
  };

  /**
   * Change la langue active et synchronise l'URL (/fr/... ou /en/...)
   */
  const setLanguage = (langCode, syncUrl = true, isUserClick = false) => {
    if (!VALID_LANGS.includes(langCode)) return;
    try {
      localStorage.setItem(STORAGE_KEY, langCode);
    } catch (_) { }

    // Mémorise toujours un éventuel hash de section avant toute synchronisation d'URL
    if (typeof window !== 'undefined' && window.location.hash) {
      const hashId = window.location.hash.replace(/^#/, '');
      if (hashId) {
        window.__corfoviaPendingScroll = hashId;
        try {
          sessionStorage.setItem('corfovia_pending_scroll', hashId);
        } catch (_) { }
      }
    }

    const siteRootUrl = getSiteRootUrl();
    const canRewriteLangPath = syncUrl
      && typeof window !== 'undefined'
      && window.location.protocol !== 'file:'
      && window.history
      && window.history.replaceState
      && siteRootUrl
      && siteRootUrl.pathname === '/';

    if (canRewriteLangPath) {
      const rawSegments = window.location.pathname
        .split('/')
        .filter((seg) => seg && seg !== 'index.html');
      const pagePath = rawSegments.length > 0 && VALID_LANGS.includes(rawSegments[0])
        ? rawSegments.slice(1).join('/')
        : rawSegments.join('/');

      // Construit l'URL propre : /fr/ ou /en/ ou /fr/products/abadakor/ (et supprime tout ?lang= éventuel)
      const newUrl = '/' + langCode + '/' + (pagePath ? pagePath + '/' : '');
      const params = new URLSearchParams(window.location.search);
      params.delete('lang');
      const cleanSearch = params.toString() ? '?' + params.toString() : '';

      const targetFullUrl = newUrl + cleanSearch;
      const currentFullUrl = window.location.pathname + window.location.search + window.location.hash;

      if (currentFullUrl !== targetFullUrl) {
        try {
          window.history.replaceState(null, document.title, targetFullUrl);
        } catch (_) { }
      }
    }

    applyTranslations(langCode, isUserClick);
    updateLanguageButtons(langCode);
    document.documentElement.lang = langCode;
    window.dispatchEvent(new CustomEvent('corfoviaLanguageChange', { detail: { lang: langCode, isUserClick: !!isUserClick } }));
  };

  const applyTranslations = (langCode, animate = false) => {
    const dict = translations[langCode] || translations.fr;
    let animIdx = 0;

    const translateEl = (el, isHtml) => {
      const key = el.getAttribute(isHtml ? 'data-i18n-html' : 'data-i18n');
      if (!dict[key]) return;
      if (isHtml) {
        el.innerHTML = dict[key];
      } else {
        el.textContent = dict[key];
      }

      // Animation douce et fluide (flou + élévation) sur TOUS les textes et titres lors du changement de langue
      if (animate) {
        el.classList.remove('i18n-reveal');
        void el.offsetWidth; // force reflow pour relancer l'animation
        el.style.animationDelay = `${(animIdx++ % 14) * 35}ms`;
        el.classList.add('i18n-reveal');
        setTimeout(() => {
          el.classList.remove('i18n-reveal');
          el.style.animationDelay = '';
        }, 1200);
      }
    };

    document.querySelectorAll('[data-i18n]').forEach((el) => translateEl(el, false));
    document.querySelectorAll('[data-i18n-html]').forEach((el) => translateEl(el, true));
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
          setLanguage(targetLang, true, true);
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
