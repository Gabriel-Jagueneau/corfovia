/**
 * CORFOVIA — Client Interactions, Morphing Header, Uncompressed Pirouette SVG Scroll Path & Modal
 * Respecte les 17 Lois d'Implémentation (60/120fps, requestAnimationFrame, pointerdown, reduced-motion)
 */

(() => {
  'use strict';

  const prefersReducedMotion = () =>
    typeof window !== 'undefined' &&
    window.matchMedia &&
    window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // =========================================================================
  // 1. DYNAMIC HEADER SCROLL & SCROLL-LINKED SVG PATH (1:1 RATIO, TOP TO BOTTOM)
  // =========================================================================
  const initScrollEngine = () => {
    const nav = document.querySelector('.site-nav');
    const currentLabel = document.querySelector('.nav-current-label');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    const siteWrapper = document.querySelector('.site-wrapper');

    // Éléments SVG animés en fonction de la position du scroll (discret, sans pointillés, sous le hero)
    const svgEl = document.getElementById('scrollThreadSvg');
    const mainScrollPath = document.getElementById('mainScrollPath');
    const threadGradient = document.getElementById('threadGradient');
    const spreadGradient = document.getElementById('spreadGradient');
    const spreadLeftPath = document.getElementById('scrollSpreadLeft');
    const spreadRightPath = document.getElementById('scrollSpreadRight');
    const heroEl = document.querySelector('.hero-glorious');
    const footerEl = document.querySelector('.footer-glorious');
    const sectionDrawPaths = Array.from(document.querySelectorAll('.scroll-draw-path'));
    const parallaxEls = Array.from(document.querySelectorAll('[data-scroll-parallax]'));
    const dialHeme = document.getElementById('dialHemeCircle');
    const dialNonHeme = document.getElementById('dialNonHemeCircle');
    const routineSection = document.getElementById('routine');

    let mainPathLength = 0;
    let spreadLeftLength = 0;
    let spreadRightLength = 0;
    let heroBottomY = 0;
    let targetPathProgress = 0;
    let pathYTable = [];
    let pathEndY = 0;
    const smoothStep01 = (t) => { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };
    let smoothedPathProgress = 0;
    let pathRafId = null;

    // Vagues ornementales : 6 dessins paramétriques très lissés, tous différents,
    // distribués dans un ordre aléatoire (sans doublon) à chaque chargement
    const R = (lo, hi) => lo + Math.random() * (hi - lo);
    const ornamentDesigns = [
      // Houle douce (fréquence et phase variables)
      () => { const f = R(2, 3.6), ph = R(0, Math.PI * 2); return (t) => [t, Math.sin(t * Math.PI * f + ph)]; },
      // Onde qui s'amortit
      () => { const f = R(3, 5), ph = R(0, 1.2), dec = R(0.6, 0.9); return (t) => [t, Math.sin(t * Math.PI * f + ph) * (1 - t * dec)]; },
      // Une boucle (position et taille variables)
      () => {
        const k = R(1.5, 2.1), c = R(0.3, 0.7), w = R(0.9, 1.3), flip = Math.random() < 0.5 ? 1 : -1;
        return (t) => { const u = (t - c) * Math.PI * 2 * w; return [u - k * Math.sin(u), flip * -k * Math.cos(u)]; };
      },
      // Deux boucles
      () => {
        const k = R(1.4, 1.9), flip = Math.random() < 0.5 ? 1 : -1;
        return (t) => { const u = t * Math.PI * 4; return [u - k * Math.sin(u), flip * -k * Math.cos(u)]; };
      },
      // Onde qui grandit ou qui diminue
      () => {
        const f = R(2.5, 4), ph = R(0, Math.PI * 2), grow = Math.random() < 0.5;
        return (t) => [t, Math.sin(t * Math.PI * f + ph) * (grow ? 0.25 + t * 0.75 : 1 - t * 0.75)];
      },
      // Deux fréquences superposées
      () => {
        const a1 = R(0.55, 0.85), a2 = R(0.25, 0.45), f1 = R(1.5, 2.5), f2 = R(4, 6), ph = R(0, Math.PI * 2);
        return (t) => [t, a1 * Math.sin(t * Math.PI * f1 + ph) + a2 * Math.sin(t * Math.PI * f2 + ph * 0.5)];
      }
    ];
    const buildOrnament = (design) => {
      const N = 90;
      const raw = [];
      const fn = design();
      for (let i = 0; i <= N; i++) raw.push(fn(i / N));
      const xs = raw.map((p) => p[0]);
      const ys = raw.map((p) => p[1]);
      const x0 = Math.min(...xs), x1 = Math.max(...xs);
      const y0 = Math.min(...ys), y1 = Math.max(...ys);
      const sx = 168 / Math.max(1e-6, x1 - x0);
      const sy = Math.min(sx, 20 / Math.max(1e-6, y1 - y0));
      const pts = raw.map((p) => [6 + (p[0] - x0) * sx, 14 + (p[1] - (y0 + y1) / 2) * sy]);
      const f = (n) => n.toFixed(2);
      let d = `M ${f(pts[0][0])} ${f(pts[0][1])}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
        d += ` C ${f(p1[0] + (p2[0] - p0[0]) / 6)} ${f(p1[1] + (p2[1] - p0[1]) / 6)}, ${f(p2[0] - (p3[0] - p1[0]) / 6)} ${f(p2[1] - (p3[1] - p1[1]) / 6)}, ${f(p2[0])} ${f(p2[1])}`;
      }
      return d;
    };
    const shuffledDesigns = ornamentDesigns.slice().sort(() => Math.random() - 0.5);
    document.querySelectorAll('.section-scroll-ornament .scroll-draw-path').forEach((path, i) => {
      path.setAttribute('d', buildOrnament(shuffledDesigns[i % shuffledDesigns.length]));
    });

    // Initialisation des petites vagues animées au-dessus des sections
    const drawPathMeta = sectionDrawPaths.map((path) => {
      const len = typeof path.getTotalLength === 'function' ? path.getTotalLength() : 200;
      path.style.strokeDasharray = `${len}`;
      path.style.strokeDashoffset = prefersReducedMotion() ? '0' : `${len}`;
      return { path, len };
    });

    /**
     * Génère un tracé SVG fluide aux courbes très larges et douces (sans virages secs),
     * commençant juste en dessous du Hero (y = y0) avec un petit fondu, s'arrêtant pile
     * contre le Footer (y = yEnd), puis s'étalant horizontalement le long de la bordure du Footer.
     */
    const updateSvgGeometry = () => {
      if (!svgEl || !mainScrollPath || !siteWrapper) return;
      const W = Math.max(320, siteWrapper.clientWidth || window.innerWidth || 1440);
      const H = Math.max(1200, siteWrapper.scrollHeight || document.documentElement.scrollHeight || 3600);

      svgEl.setAttribute('viewBox', `0 0 ${W} ${H}`);
      svgEl.setAttribute('preserveAspectRatio', 'none');

      // Helper pour calculer la position Y exacte non-transformée par CSS au sein de siteWrapper
      const getUntransformedTop = (el) => {
        let top = 0;
        let curr = el;
        while (curr && curr !== siteWrapper && curr !== document.body) {
          top += curr.offsetTop;
          curr = curr.offsetParent;
        }
        return top;
      };

      // Départ juste en dessous du Hero et jonction au sommet exact du Footer
      const y0 = heroEl ? Math.round(getUntransformedTop(heroEl) + heroEl.offsetHeight) : 0;
      const yEnd = footerEl ? Math.round(getUntransformedTop(footerEl)) : H;
      heroBottomY = y0;
      const yFooterLine = Math.round(yEnd - 1.5);
      const spanH = Math.max(700, yFooterLine - y0);

      // Amplitude horizontale ultra-douce pour éviter tout virage brusque
      const xStart = Math.round(W * 0.62);
      const xRight = Math.round(W * 0.66);
      const xLeft = Math.round(W * 0.34);
      const xEnd = Math.round(W * 0.50);

      // Positionnées au cœur des grilles de cartes (et non sur les titres de sections)
      const creationEl = document.getElementById('creation');
      const routineEl = document.getElementById('routine');
      const communauteEl = document.getElementById('communaute');
      const cardEl = communauteEl ? communauteEl.querySelector('.subscribe-card-glorious') : null;

      // Calage des dégradés (fondu au départ sous le Hero, trait blanc crème au contact exact de la boîte, étalement horizontal sur le Footer)
      if (threadGradient) {
        threadGradient.setAttribute('y1', `${y0}`);
        threadGradient.setAttribute('y2', `${yFooterLine}`);
        if (cardEl) {
          const cardTop = getUntransformedTop(cardEl);
          const cardBottom = cardTop + cardEl.offsetHeight;
          const pIn = Math.max(0, Math.min(100, ((cardTop - y0) / spanH) * 100));
          const pOut = Math.max(0, Math.min(100, ((cardBottom - y0) / spanH) * 100));
          threadGradient.innerHTML = `
            <stop offset="0%" stop-color="#8e1937" stop-opacity="0" />
            <stop offset="5%" stop-color="#7a142e" stop-opacity="1" />
            <stop offset="${pIn.toFixed(2)}%" stop-color="#7a142e" stop-opacity="1" />
            <stop offset="${pIn.toFixed(2)}%" stop-color="#fcf9f5" stop-opacity="1" />
            <stop offset="${pOut.toFixed(2)}%" stop-color="#fcf9f5" stop-opacity="1" />
            <stop offset="${pOut.toFixed(2)}%" stop-color="#7a142e" stop-opacity="1" />
            <stop offset="100%" stop-color="#7a142e" stop-opacity="1" />
          `;
        }
      }
      if (spreadGradient) {
        spreadGradient.setAttribute('x1', '0');
        spreadGradient.setAttribute('x2', `${W}`);
      }

      // Boucle #1 : placée sous les cartes des 4 Piliers, bien avant le titre de Notre Équipe
      let y1 = Math.round(y0 + spanH * 0.19);
      if (creationEl && creationEl.offsetTop > y0 + 260) {
        y1 = Math.round(y0 + (creationEl.offsetTop - y0) * 0.66);
      }

      // Boucle #2 : placée au niveau des jauges/cartes de Notre Science (bien en dessous du titre)
      let y2 = Math.round(y0 + spanH * 0.69);
      if (routineEl && communauteEl && communauteEl.offsetTop > routineEl.offsetTop + 260) {
        y2 = Math.round(routineEl.offsetTop + (communauteEl.offsetTop - routineEl.offsetTop) * 0.56);
      } else if (routineEl && routineEl.offsetTop > y1 + 360) {
        y2 = Math.round(routineEl.offsetTop + 260);
      }

      // Tracé harmonieux : onde sinusoïdale ample + 2 boucles élégantes (C1, échantillonné puis Catmull-Rom)
      const sc1 = y1 - y0;
      const sc2 = Math.max(sc1 + 500, y2 - y0);
      const lambda = 2 * (sc2 - sc1);
      const amp = W * 0.17;
      const xm = W * 0.5;
      const R = Math.round(Math.min(95, Math.max(60, W * 0.065)));
      const halfW = Math.min(190, (sc2 - sc1) * 0.4);
      const smooth = (t) => { t = Math.min(1, Math.max(0, t)); return t * t * (3 - 2 * t); };
      const loopExtra = (s, sc, dirX) => {
        const u = (s - sc) / halfW;
        if (u <= -1 || u >= 1) return null;
        const phi = 2 * Math.PI * smooth((u + 1) / 2);
        return { x: dirX * R * (1 - Math.cos(phi)), y: R * Math.sin(phi) };
      };
      const pointAt = (s) => {
        const env = smooth(s / (spanH * 0.12)) * (1 - smooth((s - spanH * 0.82) / (spanH * 0.18)));
        let x = xm + amp * env * Math.cos((2 * Math.PI * (s - sc1)) / lambda);
        // Départ (s=0) aligné doucement sur xStart
        x += (xStart - xm) * (1 - smooth(s / (spanH * 0.14))) * (1 - env * 0);
        let y = y0 + s;
        const e1 = loopExtra(s, sc1, -1);
        const e2 = loopExtra(s, sc2, 1);
        if (e1) { x += e1.x; y += e1.y; }
        if (e2) { x += e2.x; y += e2.y; }
        return [x, y];
      };
      const step = 20;
      const pts = [];
      for (let s = 0; s < spanH - 12; s += step) pts.push(pointAt(s));
      pts.push([xEnd, yFooterLine]);
      let d = `M ${pts[0][0].toFixed(1)} ${pts[0][1].toFixed(1)}`;
      for (let i = 0; i < pts.length - 1; i++) {
        const p0 = pts[Math.max(0, i - 1)], p1 = pts[i], p2 = pts[i + 1], p3 = pts[Math.min(pts.length - 1, i + 2)];
        const c1x = p1[0] + (p2[0] - p0[0]) / 6, c1y = p1[1] + (p2[1] - p0[1]) / 6;
        const c2x = p2[0] - (p3[0] - p1[0]) / 6, c2y = p2[1] - (p3[1] - p1[1]) / 6;
        d += ` C ${c1x.toFixed(1)} ${c1y.toFixed(1)}, ${c2x.toFixed(1)} ${c2y.toFixed(1)}, ${p2[0].toFixed(1)} ${p2[1].toFixed(1)}`;
      }

      mainScrollPath.setAttribute('d', d);

      if (typeof mainScrollPath.getTotalLength === 'function') {
        mainPathLength = mainScrollPath.getTotalLength();
        // Table longueur -> progression scroll strictement fluide et continue :
        // Alloue une distance de scroll dédiée aux boucles (au lieu d'un plateau y qui se débloquait d'un coup)
        pathYTable = [];
        const samples = 800;
        const rawPoints = [];
        for (let i = 0; i <= samples; i++) {
          const len = (mainPathLength * i) / samples;
          rawPoints.push({ len, pt: mainScrollPath.getPointAtLength(len) });
        }
        const virtualY = [y0];
        for (let i = 1; i <= samples; i++) {
          const dlen = rawPoints[i].len - rawPoints[i - 1].len;
          const dy = rawPoints[i].pt.y - rawPoints[i - 1].pt.y;
          // Dans les boucles (où dy devient nul ou négatif), on alloue une vitesse de défilement constante
          // pour que le dessin tourne posément sans aucune précipitation ni à-coup
          const stepScroll = Math.max(dy, dlen * 0.48);
          virtualY.push(virtualY[i - 1] + stepScroll);
        }
        const totalVirtualSpan = virtualY[samples] - y0;
        const targetSpan = Math.max(1, yFooterLine - y0);
        for (let i = 0; i <= samples; i++) {
          const scaledY = y0 + ((virtualY[i] - y0) / totalVirtualSpan) * targetSpan;
          pathYTable.push({ len: rawPoints[i].len, y: scaledY });
        }
        pathEndY = yFooterLine;
        mainScrollPath.style.strokeDasharray = `${mainPathLength}`;
      }

      // Deux branches d'étalement horizontal en fondu total jusqu'aux bords de l'écran (0 et W)
      const xSpreadLeft = 0;
      const xSpreadRight = W;

      if (spreadLeftPath) {
        spreadLeftPath.setAttribute('d', `M ${xEnd} ${yFooterLine} L ${xSpreadLeft} ${yFooterLine}`);
        if (typeof spreadLeftPath.getTotalLength === 'function') {
          spreadLeftLength = spreadLeftPath.getTotalLength();
          spreadLeftPath.style.strokeDasharray = `${spreadLeftLength}`;
        }
      }

      if (spreadRightPath) {
        spreadRightPath.setAttribute('d', `M ${xEnd} ${yFooterLine} L ${xSpreadRight} ${yFooterLine}`);
        if (typeof spreadRightPath.getTotalLength === 'function') {
          spreadRightLength = spreadRightPath.getTotalLength();
          spreadRightPath.style.strokeDasharray = `${spreadRightLength}`;
        }
      }

      applyPathProgress(Math.min(1, Math.max(0, smoothedPathProgress)));
    };

    // Applique l'état du tracé principal puis, UNIQUEMENT après son arrivée contre le Footer, son étalement horizontal
    const applyPathProgress = (clamped) => {
      const splitPoint = 0.84; // 0 -> 0.84 : descente jusqu'au Footer ; 0.84 -> 1.0 : étalement sur le Footer
      const mainProg = Math.min(1, Math.max(0, clamped / splitPoint));
      const spreadProg = clamped <= splitPoint ? 0 : Math.min(1, Math.max(0, (clamped - splitPoint) / (1 - splitPoint)));

      const drawnMain = mainPathLength * mainProg;
      mainScrollPath.style.strokeDashoffset = (mainPathLength - drawnMain).toFixed(1);

      if (spreadLeftPath && spreadLeftLength > 0) {
        spreadLeftPath.style.strokeDashoffset = (spreadLeftLength * (1 - spreadProg)).toFixed(1);
        spreadLeftPath.style.opacity = spreadProg > 0.001 ? '1' : '0';
      }
      if (spreadRightPath && spreadRightLength > 0) {
        spreadRightPath.style.strokeDashoffset = (spreadRightLength * (1 - spreadProg)).toFixed(1);
        spreadRightPath.style.opacity = spreadProg > 0.001 ? '1' : '0';
      }
    };

    // Réponse réactive au scroll (sans délai perceptible)
    const animatePathLerp = () => {
      if (!mainScrollPath || mainPathLength <= 0) {
        pathRafId = null;
        return;
      }
      const diff = targetPathProgress - smoothedPathProgress;
      if (Math.abs(diff) > 0.0005) {
        smoothedPathProgress += diff * 0.22;
        const clamped = Math.min(1, Math.max(0, smoothedPathProgress));
        applyPathProgress(clamped);
        pathRafId = requestAnimationFrame(animatePathLerp);
      } else {
        smoothedPathProgress = targetPathProgress;
        const clamped = Math.min(1, Math.max(0, smoothedPathProgress));
        applyPathProgress(clamped);
        pathRafId = null;
      }
    };

    const sections = [
      { id: 'vision', labelKey: 'nav.vision', fallback: 'La Vision', navSection: 'vision' },
      { id: 'piliers', labelKey: 'nav.vision', fallback: 'Les 4 Piliers', navSection: 'vision' },
      { id: 'creation', labelKey: 'nav.innovation', fallback: 'Notre Équipe', navSection: 'creation' },
      { id: 'routine', labelKey: 'nav.science', fallback: 'Notre Science', navSection: 'routine' },
      { id: 'communaute', labelKey: 'footer.link.contact', fallback: 'Contact', navSection: 'routine' }
    ];

    let isScrolled = false;
    let ticking = false;
    let lastSectionId = '';

    const updateScrollState = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const winH = window.innerHeight || 800;
      const docHeight = Math.max(1, document.documentElement.scrollHeight - winH);
      const globalProgress = Math.min(1, Math.max(0, scrollY / docHeight));

      // A. Morphing d'état îlot flottant
      if (nav) {
        if (!isScrolled && scrollY > 40) {
          nav.classList.add('is-scrolled');
          isScrolled = true;
        } else if (isScrolled && scrollY < 15) {
          nav.classList.remove('is-scrolled');
          isScrolled = false;
        }
      }

      // B. Fil conducteur SVG principal (commence sous le Hero, rythme très doux et progressif)
      if (mainScrollPath && mainPathLength > 0 && !prefersReducedMotion()) {
        const maxScroll = Math.max(1, document.documentElement.scrollHeight - winH);
        const splitPoint = 0.84;
        // Le front suit le centre/bas de l'écran avec une avance fluide pour se révéler sous la pancarte contact
        const spreadStart = Math.max(0, maxScroll - 160);
        const easeStart = Math.max(0, spreadStart - 2000);
        const leadFactor = 0.62;
        const f0 = Math.min(pathEndY, easeStart + winH * leadFactor);
        let frontY = scrollY + winH * leadFactor;
        if (scrollY > easeStart) {
          const t = Math.min(1, (scrollY - easeStart) / Math.max(1, spreadStart - easeStart));
          frontY = f0 + (pathEndY - f0) * t;
        }
        let lenAtCenter = 0;
        if (pathYTable.length) {
          lenAtCenter = mainPathLength;
          for (let i = 0; i < pathYTable.length; i++) {
            if (pathYTable[i].y >= frontY) {
              const prev = pathYTable[Math.max(0, i - 1)];
              const cur = pathYTable[i];
              const t = cur.y > prev.y ? (frontY - prev.y) / (cur.y - prev.y) : 0;
              lenAtCenter = prev.len + (cur.len - prev.len) * Math.min(1, Math.max(0, t));
              break;
            }
          }
        }
        const mainFrac = Math.min(1, Math.max(0, lenAtCenter / mainPathLength));
        let prog = mainFrac * splitPoint;
        if (mainFrac >= 1) {
          const spreadFrac = Math.min(1, Math.max(0, (scrollY - spreadStart) / Math.max(1, maxScroll - spreadStart)));
          prog = splitPoint + (1 - splitPoint) * smoothStep01(spreadFrac);
        }
        targetPathProgress = prog;
        if (!pathRafId) {
          pathRafId = requestAnimationFrame(animatePathLerp);
        }
      }

      // C. Petites vagues au-dessus des sections + Jauges radiales & parallaxe
      if (!prefersReducedMotion()) {
        drawPathMeta.forEach(({ path, len }) => {
          const rect = path.getBoundingClientRect();
          const start = winH * 0.92;
          const end = winH * 0.35;
          const prog = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
          path.style.strokeDashoffset = (len * (1 - prog)).toFixed(1);
        });

        if (routineSection && dialHeme && dialNonHeme) {
          const rect = routineSection.getBoundingClientRect();
          const start = winH * 0.88;
          const end = winH * 0.25;
          const prog = Math.min(1, Math.max(0, (start - rect.top) / (start - end)));
          const fullCircle = 276.5;
          const hemeTarget = 185; // ~33% arc
          const nonHemeTarget = 254; // ~8% arc
          dialHeme.style.strokeDashoffset = (fullCircle - (fullCircle - hemeTarget) * prog).toFixed(1);
          dialNonHeme.style.strokeDashoffset = (fullCircle - (fullCircle - nonHemeTarget) * prog).toFixed(1);
        }

        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-scroll-parallax') || '0');
          if (speed !== 0 && scrollY < winH * 1.5) {
            const yOffset = scrollY * speed;
            el.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0)`;
          }
        });
      }

      // D. Détection dynamique de la section visible
      const triggerPoint = scrollY + 160;
      let activeSection = null;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= triggerPoint) {
          activeSection = sections[i];
          break;
        }
      }

      if (!activeSection && sections.length > 0) {
        activeSection = sections[0];
      }

      if (scrollY >= docHeight - 30 && sections.length > 0) {
        activeSection = sections[sections.length - 1];
      }

      if (activeSection && activeSection.id !== lastSectionId) {
        lastSectionId = activeSection.id;

        if (currentLabel && document.getElementById(activeSection.id)) {
          const t = window.CorfoviaI18n ? window.CorfoviaI18n.t(activeSection.labelKey) : activeSection.fallback;
          currentLabel.textContent = t || activeSection.fallback;
        }

        if (navLinks.length > 0) {
          navLinks.forEach((link) => {
            const sec = link.getAttribute('data-section');
            if (sec && sec === activeSection.navSection) {
              link.classList.add('active');
            } else if (sec) {
              link.classList.remove('active');
            }
          });
        }
      }

      ticking = false;
    };

    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(updateScrollState);
    };

    const onResize = () => {
      updateSvgGeometry();
      updateScrollState();
    };

    updateSvgGeometry();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('load', onResize, { passive: true });
    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(onResize);
    }
    updateScrollState();
  };

  // =========================================================================
  // 2. SCROLL REVEAL OBSERVER
  // =========================================================================
  const initScrollReveal = () => {
    const revealEls = Array.from(document.querySelectorAll('[data-scroll-reveal]'));
    if (!revealEls.length) return;

    if (prefersReducedMotion()) {
      revealEls.forEach((el) => el.style.setProperty('--rp', '1'));
      return;
    }

    // Nombre de mots par titre (pour caler la cascade des mots sur la progression)
    document.querySelectorAll('h2').forEach((h2) => {
      const n = h2.querySelectorAll('.title-word').length;
      if (n) h2.style.setProperty('--n', String(n));
    });

    const clamp01 = (v) => Math.min(1, Math.max(0, v));
    const last = new Map();
    let ticking = false;

    // Éléments frères dans un même conteneur de cartes (ex: piliers, équipe) : ils apparaissent l'un après l'autre
    // Les blocs de titres (contenant un h2) restent autonomes pour piloter directement leur animation mot par mot
    const groups = new Map();
    revealEls.forEach((el) => {
      if (el.querySelector('h2')) return; // Ne pas grouper les titres avec des éléments frères
      const parent = el.parentElement;
      if (!parent) return;
      if (!groups.has(parent)) groups.set(parent, []);
      groups.get(parent).push(el);
    });
    const groupInfo = new Map(); // el -> { parent, index, count, lastEl }
    groups.forEach((list, parent) => {
      if (list.length < 2) return;
      list.forEach((el, index) => groupInfo.set(el, { parent, index, count: list.length, lastEl: list[list.length - 1] }));
    });

    // Progression 0 -> 1 liée directement à la position à l'écran :
    // seul -> basée sur son propre haut ; en groupe -> progression du conteneur répartie en cascade.
    const update = () => {
      ticking = false;
      const H = window.innerHeight || 800;
      const start = H * 0.98;       // l'élément commence à apparaître en entrant par le bas
      const defaultEnd = H * 0.70;  // achèvement standard

      revealEls.forEach((el) => {
        let p;
        const g = groupInfo.get(el);
        if (g) {
          // Groupe : tous les éléments sont complets quand le DERNIER atteint la ligne de fin
          const range = start - defaultEnd;
          const top = g.parent.getBoundingClientRect().top;
          const lastTop = g.lastEl.getBoundingClientRect().top;
          const span = range + Math.max(0, lastTop - top);
          const gp = clamp01((start - top) / span);
          const overlap = 1.6;
          p = clamp01((gp * (g.count - 1 + overlap) - g.index) / overlap);
        } else {
          // Titres ou blocs individuels : tous suivent rigoureusement la règle (début à 0.98, achèvement à 0.70)
          const range = start - defaultEnd;
          const anchor = el.querySelector('h2') || el;
          p = clamp01((start - anchor.getBoundingClientRect().top) / range);
        }
        p = Math.round(p * 1000) / 1000;
        if (last.get(el) !== p) {
          last.set(el, p);
          el.style.setProperty('--rp', String(p));
        }
      });
    };

    const request = () => {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(update);
      }
    };

    window.addEventListener('scroll', request, { passive: true });
    window.addEventListener('resize', request);
    window.addEventListener('corfoviaLanguageChange', request);
    update();
  };

  // =========================================================================
  // 3. MODAL SOURCES DOCUMENTAIRES & SCIENTIFIQUES
  // =========================================================================
  const initSourcesModal = () => {
    const modal = document.getElementById('sourcesModal');
    if (!modal) return;

    const openBtns = document.querySelectorAll('[data-open-sources-modal]');
    const closeBtns = modal.querySelectorAll('[data-close-sources-modal]');
    let lastFocusedEl = null;

    const openModal = (e) => {
      if (e) e.preventDefault();
      lastFocusedEl = document.activeElement;
      modal.classList.add('is-open');
      modal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      modal.classList.remove('is-open');
      modal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
      }
    };

    openBtns.forEach((btn) => {
      btn.addEventListener('click', openModal);
    });

    closeBtns.forEach((btn) => {
      btn.addEventListener('click', closeModal);
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) {
        closeModal();
      }
    });
  };

  // =========================================================================
  // 4. DROPDOWN PRODUITS CUSTOM
  // =========================================================================
  const initProductsDropdown = () => {
    const wrapper = document.querySelector('.nav-dropdown-wrapper');
    const trigger = document.getElementById('navProductsTrigger');
    const menu = document.getElementById('navProductsMenu');
    if (!wrapper || !trigger || !menu) return;

    let closeTimer = null;

    const openDropdown = () => {
      clearTimeout(closeTimer);
      wrapper.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    };

    const closeDropdown = () => {
      clearTimeout(closeTimer);
      wrapper.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains('is-open');
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    wrapper.addEventListener('mouseenter', () => {
      if (window.matchMedia('(min-width: 881px)').matches) {
        openDropdown();
      }
    });

    wrapper.addEventListener('mouseleave', () => {
      if (window.matchMedia('(min-width: 881px)').matches) {
        closeTimer = setTimeout(closeDropdown, 180);
      }
    });

    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        closeDropdown();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && wrapper.classList.contains('is-open')) {
        closeDropdown();
        trigger.focus();
      }
    });
  };

  // =========================================================================
  // 5. TACTILE RESPONSE (Zero Latence & Hysteresis - Loi #1 & #10)
  // =========================================================================
  const initTactileResponse = () => {
    const interactiveSelectors = [
      '.btn-clay',
      '.btn-sources-modal-trigger',
      '.perspective-pill-btn',
      '.nav-link'
    ];

    document.addEventListener('pointerdown', (e) => {
      const target = e.target.closest(interactiveSelectors.join(','));
      if (!target) return;

      const startX = e.clientX;
      const startY = e.clientY;
      target.classList.add('is-pressed');

      const onPointerMove = (moveEvent) => {
        const dx = moveEvent.clientX - startX;
        const dy = moveEvent.clientY - startY;
        if (Math.hypot(dx, dy) > 10) {
          target.classList.remove('is-pressed');
        }
      };

      const onPointerUp = () => {
        target.classList.remove('is-pressed');
        document.removeEventListener('pointermove', onPointerMove);
        document.removeEventListener('pointerup', onPointerUp);
        document.removeEventListener('pointercancel', onPointerUp);
      };

      document.addEventListener('pointermove', onPointerMove, { passive: true });
      document.addEventListener('pointerup', onPointerUp, { passive: true });
      document.addEventListener('pointercancel', onPointerUp, { passive: true });
    }, { passive: true });
  };

  // =========================================================================
  // 6. ACCORDIONS
  // =========================================================================
  const initAccordions = () => {
    const tabs = document.querySelectorAll('.accordion-tab-glorious');
    tabs.forEach((tab) => {
      const head = tab.querySelector('.accordion-head-glorious');
      if (!head) return;

      head.addEventListener('pointerdown', () => {
        const isOpen = tab.classList.contains('open');
        tabs.forEach((t) => {
          if (t !== tab) t.classList.remove('open');
        });
        tab.classList.toggle('open', !isOpen);
      });
    });
  };

  // =========================================================================
  // 7. SÉLECTEUR DE POINTS DE VUE (Product Detail — Différents Angles)
  // =========================================================================
  const initPerspectiveViewer = () => {
    const perspectivePills = document.querySelectorAll('.perspective-pill-btn');
    const pedestal = document.getElementById('productStagePedestal');
    const angleTag = document.getElementById('productAngleTag');
    const stageBadge = document.getElementById('productStageBadge');
    const stageSub = document.getElementById('productStageSub');

    if (!perspectivePills.length || !pedestal) return;

    const viewKeys = {
      face: {
        tag: 'product.pill.face',
        title: 'product.view.face.title',
        sub: 'product.view.face.sub'
      },
      dessus: {
        tag: 'product.pill.dessus',
        title: 'product.view.dessus.title',
        sub: 'product.view.dessus.sub'
      },
      coupe: {
        tag: 'product.pill.coupe',
        title: 'product.view.coupe.title',
        sub: 'product.view.coupe.sub'
      },
      profil: {
        tag: 'product.pill.profil',
        title: 'product.view.profil.title',
        sub: 'product.view.profil.sub'
      }
    };

    const applyView = (viewKey) => {
      const keys = viewKeys[viewKey] || viewKeys.face;
      pedestal.setAttribute('data-active-view', viewKey);

      if (window.CorfoviaI18n) {
        if (angleTag) {
          angleTag.setAttribute('data-i18n', keys.tag);
          angleTag.textContent = window.CorfoviaI18n.t(keys.tag);
        }
        if (stageBadge) {
          stageBadge.setAttribute('data-i18n', keys.title);
          stageBadge.textContent = window.CorfoviaI18n.t(keys.title);
        }
        if (stageSub) {
          stageSub.setAttribute('data-i18n', keys.sub);
          stageSub.textContent = window.CorfoviaI18n.t(keys.sub);
        }
      }
    };

    perspectivePills.forEach((pill) => {
      pill.addEventListener('pointerdown', () => {
        perspectivePills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');
        const viewKey = pill.getAttribute('data-view') || 'face';
        applyView(viewKey);
      });
    });
  };

  // =========================================================================
  // 8. SMOOTH IN-PAGE & CROSS-PAGE ANCHOR SCROLL
  // =========================================================================
  const scrollToSectionElement = (targetId, smooth = true) => {
    if (!targetId) return false;
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return false;

    const targetOffset = Math.max(0, targetEl.getBoundingClientRect().top + window.pageYOffset - 68);
    window.scrollTo({
      top: targetOffset,
      behavior: smooth ? 'smooth' : 'auto'
    });
    return true;
  };

  const initSmoothAnchors = () => {
    document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
      if (anchor.hasAttribute('data-open-sources-modal')) return;
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const urlParts = href.split('#');
        const targetId = urlParts[1];
        if (!targetId) return;

        const targetEl = document.getElementById(targetId);

        if (targetEl) {
          // La section existe sur la page actuelle : scroll fluide immédiat
          e.preventDefault();
          scrollToSectionElement(targetId, true);

          if (window.history && window.history.replaceState) {
            let cleanPath = window.location.pathname;
            if (cleanPath.endsWith('/index.html')) cleanPath = cleanPath.slice(0, -10);
            if (!cleanPath) cleanPath = '/';
            window.history.replaceState(null, document.title, cleanPath + window.location.search);
          }
        } else {
          // Changement de page : mémorise la section cible pour scroller dès l'arrivée sur la nouvelle page
          try {
            sessionStorage.setItem('corfovia_pending_scroll', targetId);
          } catch (_) { }
        }
      });
    });
  };

  // =========================================================================
  // 9. NETTOYAGE D'URL & SCROLL AUTOMATIQUE APRÈS CHANGEMENT DE PAGE
  // =========================================================================
  const initCleanURLAndPendingScroll = () => {
    const loc = window.location;
    const rawHash = loc.hash ? loc.hash.replace(/^#/, '') : '';
    let pendingTarget = rawHash;

    try {
      const storedTarget = sessionStorage.getItem('corfovia_pending_scroll');
      if (storedTarget) {
        if (!pendingTarget) pendingTarget = storedTarget;
        sessionStorage.removeItem('corfovia_pending_scroll');
      }
    } catch (_) { }

    if (window.history && window.history.replaceState) {
      if (loc.pathname.endsWith('index.html') || loc.hash) {
        let clean = loc.pathname.replace(/\/index\.html$/, '/').replace(/index\.html$/, '');
        if (!clean) clean = '/';
        window.history.replaceState(null, document.title, clean + loc.search);
      }
    }

    if (pendingTarget) {
      // Scroll vers la section cible dès que le layout est prêt
      requestAnimationFrame(() => {
        setTimeout(() => {
          scrollToSectionElement(pendingTarget, true);
        }, 60);
      });
    }
  };

  // =========================================================================
  // BOOTSTRAP
  // =========================================================================
  // Découpe un titre en mots (chaque mot reçoit --i pour la cascade ; la classe donne l'animation)
  const splitIntoWords = (title, className) => {
    // Étape 1 : déballer les spans existants pour éviter tout double-emboîtement (qui doublait la vitesse et les transformations)
    title.querySelectorAll('.' + className).forEach((span) => {
      span.replaceWith(span.textContent);
    });
    title.normalize();

    let idx = 0;
    const walk = (node) => {
      Array.from(node.childNodes).forEach((child) => {
        if (child.nodeType === 3) {
          const parts = child.textContent.split(/(\s+)/);
          const frag = document.createDocumentFragment();
          parts.forEach((part) => {
            if (!part) return;
            if (/^\s+$/.test(part)) {
              frag.appendChild(document.createTextNode(' '));
            } else {
              const span = document.createElement('span');
              span.className = className;
              span.style.setProperty('--i', String(idx++));
              span.textContent = part;
              frag.appendChild(span);
            }
          });
          node.replaceChild(frag, child);
        } else if (child.nodeType === 1) {
          walk(child);
        }
      });
    };
    walk(title);
  };

  // Titre du hero : animation d'ouverture ; titres de sections : même animation au scroll
  const splitTitles = () => {
    if (prefersReducedMotion()) return;
    const hero = document.querySelector('.hero-glorious-title');
    if (hero) {
      // Nettoie d'éventuels anciens spans de mots avant de redécouper
      splitIntoWords(hero, 'hero-word');
    }
    document.querySelectorAll('h2').forEach((h2) => {
      if (h2.closest('[data-scroll-reveal]')) {
        splitIntoWords(h2, 'title-word');
        const words = h2.querySelectorAll('.title-word');
        const n = words.length;
        if (n) h2.style.setProperty('--n', String(n));
      }
    });
  };

  // Réapplique le découpage des titres lors de tout changement de langue pour garder le scroll reveal synchrone
  window.addEventListener('corfoviaLanguageChange', () => {
    splitTitles();
    // Recalcule la géométrie SVG au cas où la hauteur de texte ait changé les coordonnées des sections
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event('resize'));
    });
  });

  document.addEventListener('DOMContentLoaded', () => {
    // Note: splitTitles est déjà invoqué via l'événement corfoviaLanguageChange initial d'i18n
    splitTitles(false);
    initScrollEngine();
    initScrollReveal();
    initSourcesModal();
    initProductsDropdown();
    initTactileResponse();
    initAccordions();
    initPerspectiveViewer();
    initSmoothAnchors();
    initCleanURLAndPendingScroll();
  });

})();
