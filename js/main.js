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
            <stop offset="0%" stop-color="#e94b4b" stop-opacity="0" />
            <stop offset="5%" stop-color="#c41818" stop-opacity="1" />
            <stop offset="${pIn.toFixed(2)}%" stop-color="#c41818" stop-opacity="1" />
            <stop offset="${pIn.toFixed(2)}%" stop-color="#fffdf9" stop-opacity="1" />
            <stop offset="${pOut.toFixed(2)}%" stop-color="#fffdf9" stop-opacity="1" />
            <stop offset="${pOut.toFixed(2)}%" stop-color="#c41818" stop-opacity="1" />
            <stop offset="100%" stop-color="#c41818" stop-opacity="1" />
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
      { id: 'routine', labelKey: 'nav.science', fallback: 'Le Projet', navSection: 'routine' },
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

        parallaxEls.forEach((el) => {
          const speed = parseFloat(el.getAttribute('data-scroll-parallax') || '0');
          if (speed !== 0 && scrollY < winH * 1.5) {
            const yOffset = scrollY * speed;
            el.style.transform = `translate3d(0, ${yOffset.toFixed(1)}px, 0)`;
          }
        });
      }

      // D. Détection dynamique de la section visible
      const triggerPoint = scrollY + winH * 0.42;
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
      const defaultEnd = H * 0.82;  // achèvement complet dans le bas visible de l'écran

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
  // 3. DROPDOWN PRODUITS CUSTOM
  // =========================================================================
  const initProductsDropdown = () => {
    const wrapper = document.querySelector('.nav-dropdown-wrapper');
    const trigger = document.getElementById('navProductsTrigger');
    const menu = document.getElementById('navProductsMenu');
    if (!wrapper || !trigger || !menu) return;

    const openDropdown = () => {
      wrapper.classList.add('is-open');
      trigger.setAttribute('aria-expanded', 'true');
    };

    const closeDropdown = () => {
      wrapper.classList.remove('is-open');
      trigger.setAttribute('aria-expanded', 'false');
    };

    // Ouvre/ferme uniquement au clic pour éviter les conflits hover+clic
    // et empêcher le menu de s'ouvrir tout seul quand le header rétrécit au scroll.
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (wrapper.classList.contains('is-open')) {
        closeDropdown();
      } else {
        openDropdown();
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
  const closeNavDropdown = () => {
    const wrapper = document.querySelector('.nav-dropdown-wrapper');
    const trigger = document.getElementById('navProductsTrigger');
    if (wrapper) wrapper.classList.remove('is-open');
    if (trigger) trigger.setAttribute('aria-expanded', 'false');
  };

  const getSiteRootUrl = () => {
    const scriptEl = document.currentScript || document.querySelector('script[src*="js/main.js"]');
    if (scriptEl && scriptEl.src) {
      try {
        return new URL('..', scriptEl.src);
      } catch (_) { }
    }
    return new URL('/', window.location.href);
  };

  const SITE_ROOT_URL = getSiteRootUrl();

  const normalizeRoutePath = (pathname) => {
    let rel = pathname || '/';
    const rootPath = SITE_ROOT_URL.pathname;
    if (rel.startsWith(rootPath)) {
      rel = rel.slice(rootPath.length);
    }
    const segs = rel.split('/').filter((s) => s && s !== 'index.html');
    if (segs.length > 0 && (segs[0] === 'fr' || segs[0] === 'en')) {
      segs.shift();
    }
    return '/' + (segs.length ? segs.join('/') + '/' : '');
  };

  const resolveSiteHref = (rawHref) => {
    if (!rawHref) return SITE_ROOT_URL.href;
    if (rawHref.startsWith('#')) {
      return new URL(rawHref, window.location.href).href;
    }
    const cleanRel = rawHref.startsWith('/') ? rawHref.slice(1) : rawHref;
    const url = new URL(cleanRel, SITE_ROOT_URL);
    if (window.location.protocol === 'file:' && url.pathname.endsWith('/')) {
      url.pathname += 'index.html';
    }
    return url.href;
  };

  const computeSectionScrollOffset = (targetId) => {
    if (!targetId) return null;
    const targetEl = document.getElementById(targetId);
    if (!targetEl) return null;

    if (targetId === 'vision') return 0;

    const winH = window.innerHeight || document.documentElement.clientHeight || 800;
    // Zone utile sous le header flottant en position scrollée (~64px + 12px de respiration)
    const safeTop = 76;
    const availH = Math.max(220, winH - safeTop - 16);

    // Sur les pistes sticky de la page produit, se caler directement sur l'état verrouillé et lisible
    const stickyTrack = targetEl.matches('.p-split-section, .p-story-section')
      ? targetEl.querySelector('.p-split-track, .p-story-track')
      : null;
    if (stickyTrack && stickyTrack.offsetHeight > winH) {
      const trackTop = stickyTrack.getBoundingClientRect().top + window.pageYOffset;
      const trackSpan = Math.max(0, stickyTrack.offsetHeight - winH);
      return Math.max(0, Math.round(trackTop + Math.min(120, trackSpan * 0.12)));
    }

    // Pour les sections standard à grand padding vertical, cibler le .container intérieur
    // afin de centrer l'objet utile à l'écran plutôt que son padding supérieur vide.
    const innerContainer = targetEl.tagName === 'SECTION'
      ? targetEl.querySelector(':scope > .container')
      : null;
    const focusEl = innerContainer || targetEl;
    const focusRect = focusEl.getBoundingClientRect();
    const focusAbsTop = focusRect.top + window.pageYOffset;
    const focusH = focusRect.height;

    const desiredViewportTop = (focusH > 0 && focusH <= availH)
      ? safeTop + Math.round((availH - focusH) / 2)
      : safeTop + 14;

    return Math.max(0, Math.round(focusAbsTop - desiredViewportTop));
  };

  const scrollToSectionElement = (targetId, smooth = true) => {
    const targetOffset = computeSectionScrollOffset(targetId);
    if (targetOffset === null) return false;
    const useSmooth = smooth && !prefersReducedMotion();
    window.scrollTo({
      top: targetOffset,
      behavior: useSmooth ? 'smooth' : 'auto'
    });
    return true;
  };

  const cleanCurrentUrlHash = () => {
    if (!window.history || !window.history.replaceState) return;
    if (window.location.protocol === 'file:') return;
    let cleanPath = window.location.pathname;
    if (cleanPath.endsWith('/index.html')) cleanPath = cleanPath.slice(0, -10);
    if (!cleanPath) cleanPath = '/';
    try {
      window.history.replaceState(null, document.title, cleanPath + window.location.search);
    } catch (_) { }
  };

  const initSmoothAnchors = () => {
    // Sous-répertoire / file:// : garde les liens racines et images fonctionnels
    if (SITE_ROOT_URL.pathname !== '/' || window.location.protocol === 'file:') {
      document.querySelectorAll('a[href^="/"]').forEach((link) => {
        const rawHref = link.getAttribute('href');
        if (rawHref && !rawHref.startsWith('//')) {
          link.setAttribute('href', resolveSiteHref(rawHref));
        }
      });
      document.querySelectorAll('img[src^="/"]').forEach((img) => {
        const rawSrc = img.getAttribute('src');
        if (rawSrc && !rawSrc.startsWith('//')) {
          img.style.display = '';
          if (img.nextElementSibling && img.nextElementSibling.classList.contains('team-member-fallback')) {
            img.nextElementSibling.style.display = 'none';
          }
          img.setAttribute('src', resolveSiteHref(rawSrc));
        }
      });
    }

    document.addEventListener('click', (e) => {
      if (e.defaultPrevented || e.button !== 0 || e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;

      const brandLink = e.target.closest('.site-nav .nav-brand');
      if (brandLink && document.getElementById('vision')) {
        e.preventDefault();
        closeNavDropdown();
        scrollToSectionElement('vision', true);
        return;
      }

      const anchor = e.target.closest('a[href*="#"]');
      if (!anchor) return;

      closeNavDropdown();
      const rawHref = anchor.getAttribute('href');
      if (!rawHref || rawHref === '#') return;

      const hashIdx = rawHref.indexOf('#');
      if (hashIdx === -1) return;

      let targetId = '';
      try {
        targetId = decodeURIComponent(rawHref.slice(hashIdx + 1));
      } catch (_) {
        targetId = rawHref.slice(hashIdx + 1);
      }
      if (!targetId) return;

      const pathPart = rawHref.slice(0, hashIdx);
      const isPureHash = pathPart === '';
      let isSameRoute = isPureHash;
      let targetUrlHref = rawHref;

      if (!isPureHash) {
        try {
          const resolved = new URL(resolveSiteHref(rawHref));
          targetUrlHref = resolved.href;
          isSameRoute = normalizeRoutePath(resolved.pathname) === normalizeRoutePath(window.location.pathname);
        } catch (_) { }
      }

      const targetEl = document.getElementById(targetId);

      if (isSameRoute && targetEl) {
        // La section existe sur la page actuelle : scroll fluide immédiat
        e.preventDefault();
        scrollToSectionElement(targetId, true);
        cleanCurrentUrlHash();
      } else {
        // Changement de page : mémorise la section cible pour scroller dès l'arrivée sur la nouvelle page
        try {
          sessionStorage.setItem('corfovia_pending_scroll', targetId);
        } catch (_) { }

        if (!isSameRoute && targetUrlHref && targetUrlHref !== rawHref) {
          e.preventDefault();
          window.location.assign(targetUrlHref);
        }
      }
    });
  };

  // =========================================================================
  // 9. NETTOYAGE D'URL & SCROLL AUTOMATIQUE APRÈS CHANGEMENT DE PAGE
  // =========================================================================
  const initCleanURLAndPendingScroll = () => {
    const loc = window.location;
    const rawHash = loc.hash ? loc.hash.replace(/^#/, '') : '';
    let pendingTarget = rawHash || window.__corfoviaPendingScroll || '';

    try {
      const storedTarget = sessionStorage.getItem('corfovia_pending_scroll');
      if (storedTarget) {
        if (!pendingTarget) pendingTarget = storedTarget;
        sessionStorage.removeItem('corfovia_pending_scroll');
      }
    } catch (_) { }
    window.__corfoviaPendingScroll = '';

    if (loc.pathname.endsWith('index.html') || loc.hash) {
      cleanCurrentUrlHash();
    }

    if (pendingTarget && document.getElementById(pendingTarget)) {
      if (window.history && 'scrollRestoration' in window.history) {
        try {
          window.history.scrollRestoration = 'manual';
        } catch (_) { }
      }

      let userInteracted = false;
      const stopAutoScroll = () => { userInteracted = true; };
      window.addEventListener('wheel', stopAutoScroll, { once: true, passive: true });
      window.addEventListener('touchstart', stopAutoScroll, { once: true, passive: true });
      window.addEventListener('keydown', stopAutoScroll, { once: true, passive: true });

      // Scroll vers la section cible dès que le layout est prêt
      requestAnimationFrame(() => {
        setTimeout(() => {
          if (!userInteracted) {
            scrollToSectionElement(pendingTarget, true);
          }
        }, 80);
      });

      // Réajuste doucement après chargement complet des polices/images si la hauteur a bougé
      window.addEventListener('load', () => {
        setTimeout(() => {
          if (userInteracted) return;
          const expected = computeSectionScrollOffset(pendingTarget);
          const currentY = window.scrollY || window.pageYOffset || 0;
          if (expected !== null && Math.abs(currentY - expected) > 36) {
            scrollToSectionElement(pendingTarget, true);
          }
        }, 420);
      }, { once: true });
    }
  };

  // =========================================================================
  // 10. PRODUCT HERO PHOTO (Interaction tactile & tilt 3D sur photo)
  // =========================================================================
  const initProductHeroPhoto = () => {
    const wrapper = document.getElementById('muffinPhotoWrapper');
    const frame = wrapper ? wrapper.querySelector('.muffin-photo-frame') : null;
    if (!wrapper || !frame) return;

    wrapper.addEventListener('pointermove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      frame.style.transform = `translateY(-6px) perspective(700px) rotateY(${x * 14}deg) rotateX(${-y * 14}deg) scale(1.025)`;
    });

    wrapper.addEventListener('pointerleave', () => {
      frame.style.transform = '';
    });
  };

  // =========================================================================
  // 10-bis. PRODUCT HERO 3D MUFFIN (THREE.JS AVEC FALLBACK VECTORIEL)
  // =========================================================================
  const initProductHero3D = () => {
    const canvas = document.getElementById('muffin3DCanvas');
    const wrap = document.querySelector('.muffin-3d-canvas-wrap');
    if (!canvas || !wrap) return;

    if (typeof THREE === 'undefined') {
      // Si Three.js n'est pas encore présent, on laisse le fallback SVG s'animer gracieusement
      return;
    }

    try {
      const scene = new THREE.Scene();
      const w = wrap.clientWidth || 360;
      const h = wrap.clientHeight || 360;

      const camera = new THREE.PerspectiveCamera(40, w / h, 0.1, 50);
      camera.position.set(0, 3.8, 8.5);

      const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
      renderer.setSize(w, h);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.15;
      renderer.shadowMap.enabled = true;
      renderer.shadowMap.type = THREE.PCFSoftShadowMap;

      // Masque le fallback SVG si WebGL s'initialise
      const svgFallback = wrap.querySelector('.muffin-svg-visual-fallback');
      if (svgFallback) svgFallback.style.display = 'none';

      // Éclairage chaleureux pâtissier
      const ambientLight = new THREE.AmbientLight(0xfff7ed, 1.1);
      scene.add(ambientLight);

      const keyLight = new THREE.DirectionalLight(0xffffff, 2.2);
      keyLight.position.set(5, 9, 6);
      keyLight.castShadow = true;
      keyLight.shadow.mapSize.width = 1024;
      keyLight.shadow.mapSize.height = 1024;
      scene.add(keyLight);

      const warmFill = new THREE.DirectionalLight(0xf59e0b, 0.9);
      warmFill.position.set(-6, 3, -4);
      scene.add(warmFill);

      const rimLight = new THREE.DirectionalLight(0xe94b4b, 0.6);
      rimLight.position.set(0, -4, -5);
      scene.add(rimLight);

      const muffinGroup = new THREE.Group();
      muffinGroup.position.y = -0.5;

      // Caissette plissée (Paper Cup fluting)
      const cupHeight = 1.85;
      const cupBottomR = 1.3;
      const cupTopR = 1.9;
      const cupSegments = 28;

      const cupGeo = new THREE.CylinderGeometry(cupTopR, cupBottomR, cupHeight, cupSegments, 24, true);
      const cupPos = cupGeo.attributes.position;
      const cupV3 = new THREE.Vector3();

      for (let i = 0; i < cupPos.count; i++) {
        cupV3.fromBufferAttribute(cupPos, i);
        const angle = Math.atan2(cupV3.z, cupV3.x);
        const rOffset = Math.sin(angle * cupSegments) * 0.045;
        const currentR = Math.sqrt(cupV3.x * cupV3.x + cupV3.z * cupV3.z);
        const scale = (currentR + rOffset) / currentR;
        cupPos.setXYZ(i, cupV3.x * scale, cupV3.y, cupV3.z * scale);
      }
      cupGeo.computeVertexNormals();

      // Matériau caissette papier bordeaux noble & crème
      const cupMat = new THREE.MeshStandardMaterial({
        color: 0x8a1111,
        roughness: 0.75,
        metalness: 0.05,
        side: THREE.DoubleSide
      });
      const cupMesh = new THREE.Mesh(cupGeo, cupMat);
      cupMesh.position.y = cupHeight / 2;
      cupMesh.castShadow = true;
      cupMesh.receiveShadow = true;
      muffinGroup.add(cupMesh);

      const baseBottomGeo = new THREE.CircleGeometry(cupBottomR, cupSegments);
      const baseBottomMesh = new THREE.Mesh(baseBottomGeo, cupMat);
      baseBottomMesh.rotation.x = Math.PI / 2;
      muffinGroup.add(baseBottomMesh);

      // Bruit pseudo-aléatoire pour les crevasses du dôme chocolat
      function pseudoNoise(x, y, z) {
        return Math.sin(x * 2.8 + y * 1.5) * Math.cos(y * 3.1 + z * 2.7) * Math.sin(z * 3.3 + x * 1.2);
      }

      // Dôme au chocolat noir craquelé (85% cacao)
      const topGeo = new THREE.SphereGeometry(2.3, 48, 36, 0, Math.PI * 2, 0, Math.PI / 2);
      topGeo.scale(1.0, 0.65, 1.0);
      const topPos = topGeo.attributes.position;
      const topV3 = new THREE.Vector3();

      for (let i = 0; i < topPos.count; i++) {
        topV3.fromBufferAttribute(topPos, i);
        const n1 = pseudoNoise(topV3.x * 1.3, topV3.y * 1.3, topV3.z * 1.3) * 0.17;
        const n2 = pseudoNoise(topV3.x * 3.5, topV3.y * 3.5, topV3.z * 3.5) * 0.05;
        const totalDisplacement = 1.0 + n1 + n2;
        const rimBulge = (1.0 - (topV3.y / 1.5)) * 0.12;
        topPos.setXYZ(
          i,
          topV3.x * (totalDisplacement + rimBulge),
          topV3.y * totalDisplacement,
          topV3.z * (totalDisplacement + rimBulge)
        );
      }
      topGeo.computeVertexNormals();

      const topMat = new THREE.MeshStandardMaterial({
        color: 0x3d1c0a, // Chocolat noir intense
        roughness: 0.94,
        metalness: 0.03
      });
      const topMesh = new THREE.Mesh(topGeo, topMat);
      topMesh.position.y = cupHeight * 0.95;
      topMesh.castShadow = true;
      topMesh.receiveShadow = true;
      muffinGroup.add(topMesh);

      // Pépites de chocolat noir éparpillées
      const chipGeo = new THREE.DodecahedronGeometry(0.12, 1);
      chipGeo.scale(1.2, 0.6, 1.0);
      const chipMat = new THREE.MeshStandardMaterial({
        color: 0x1f0d05,
        roughness: 0.32,
        metalness: 0.12
      });

      const chipCount = 32;
      const chipsInstanced = new THREE.InstancedMesh(chipGeo, chipMat, chipCount);
      chipsInstanced.castShadow = true;
      chipsInstanced.receiveShadow = true;

      const dummy = new THREE.Object3D();
      for (let i = 0; i < chipCount; i++) {
        const phi = Math.acos(1 - 2 * (Math.random() * 0.45));
        const theta = Math.random() * Math.PI * 2;
        const r = 2.18;
        const x = r * Math.sin(phi) * Math.cos(theta);
        const y = (r * Math.cos(phi) * 0.65) + (cupHeight * 0.95);
        const z = r * Math.sin(phi) * Math.sin(theta);

        dummy.position.set(x, y, z);
        dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
        const sc = 0.7 + Math.random() * 0.65;
        dummy.scale.set(sc, sc, sc);
        dummy.updateMatrix();
        chipsInstanced.setMatrixAt(i, dummy.matrix);
      }
      chipsInstanced.instanceMatrix.needsUpdate = true;
      muffinGroup.add(chipsInstanced);

      scene.add(muffinGroup);

      // Ombre portée sous le muffin
      const shadowGeo = new THREE.PlaneGeometry(8, 8);
      const shadowMat = new THREE.ShadowMaterial({ opacity: 0.28 });
      const shadowMesh = new THREE.Mesh(shadowGeo, shadowMat);
      shadowMesh.rotation.x = -Math.PI / 2;
      shadowMesh.position.y = -0.01;
      shadowMesh.receiveShadow = true;
      scene.add(shadowMesh);

      // Interaction tactile et curseur (suivi fluide & loi #1 de réponse)
      let targetRotY = 0;
      let targetRotX = 0;
      let isDragging = false;
      let prevPointerX = 0;
      let prevPointerY = 0;

      wrap.addEventListener('pointerdown', (e) => {
        isDragging = true;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;
      });

      window.addEventListener('pointermove', (e) => {
        if (!isDragging) {
          const rect = wrap.getBoundingClientRect();
          const centerX = rect.left + rect.width / 2;
          const centerY = rect.top + rect.height / 2;
          const dx = (e.clientX - centerX) / (window.innerWidth / 2);
          const dy = (e.clientY - centerY) / (window.innerHeight / 2);
          targetRotX = dy * 0.18;
          return;
        }
        const deltaX = e.clientX - prevPointerX;
        const deltaY = e.clientY - prevPointerY;
        prevPointerX = e.clientX;
        prevPointerY = e.clientY;

        targetRotY += deltaX * 0.015;
        targetRotX = Math.max(-0.4, Math.min(0.4, targetRotX + deltaY * 0.01));
      });

      const stopDrag = () => { isDragging = false; };
      window.addEventListener('pointerup', stopDrag);
      window.addEventListener('pointercancel', stopDrag);

      let animId = null;
      const renderLoop = () => {
        animId = requestAnimationFrame(renderLoop);
        if (!isDragging) {
          targetRotY += 0.0035; // Rotation douce automatique
        }
        muffinGroup.rotation.y += (targetRotY - muffinGroup.rotation.y) * 0.08;
        muffinGroup.rotation.x += (targetRotX - muffinGroup.rotation.x) * 0.08;

        // Légère lévitation respirante
        muffinGroup.position.y = -0.5 + Math.sin(Date.now() * 0.0016) * 0.06;

        renderer.render(scene, camera);
      };

      renderLoop();

      window.addEventListener('resize', () => {
        const nw = wrap.clientWidth || 360;
        const nh = wrap.clientHeight || 360;
        camera.aspect = nw / nh;
        camera.updateProjectionMatrix();
        renderer.setSize(nw, nh);
      });
    } catch (err) {
      console.warn('Three.js initialization skipped, fallback active', err);
    }
  };

  // =========================================================================
  // 11. SCROLL-DRIVEN PRODUCT STORY & 3D THREE.JS ANATOMY INSPECTION
  // =========================================================================
  const initProductScrollStory = () => {
    const storySection = document.getElementById('muffin-story');
    const anatomyCard = document.getElementById('muffinAnatomyCard');
    const canvas = document.getElementById('muffinAnatomyCanvas');
    const stepCards = Array.from(document.querySelectorAll('.story-step-card'));
    const phasePill = document.querySelector('.phase-step-pill');
    const phaseDots = Array.from(document.querySelectorAll('.phase-dot'));
    const calloutPills = Array.from(document.querySelectorAll('.anatomy-callout-pill'));

    if (!storySection || !anatomyCard || !stepCards.length) return;

    const stepConfigs = [
      {
        domeY: 0.0,
        domeRotX: 0.0,
        crumbY: 0.0,
        crumbScale: 1.0,
        cupY: 0.0,
        cupRotX: 0.0,
        camY: 1.1,
        camZ: 7.6,
        particlesSpread: 0.0,
        label: 'Dôme'
      },
      {
        domeY: 1.45,
        domeRotX: -0.16,
        crumbY: 0.38,
        crumbScale: 1.06,
        cupY: -0.65,
        cupRotX: 0.05,
        camY: 1.4,
        camZ: 8.3,
        particlesSpread: 0.55,
        label: 'Chicorée'
      },
      {
        domeY: 2.65,
        domeRotX: -0.28,
        crumbY: 0.92,
        crumbScale: 1.14,
        cupY: -1.35,
        cupRotX: 0.1,
        camY: 1.65,
        camZ: 9.0,
        particlesSpread: 1.15,
        label: 'Vitalité'
      },
      {
        domeY: 3.15,
        domeRotX: -0.32,
        crumbY: 1.25,
        crumbScale: 1.05,
        cupY: -2.05,
        cupRotX: 0.18,
        camY: 0.85,
        camZ: 8.5,
        particlesSpread: 0.7,
        label: 'Cartable'
      }
    ];

    let currentStepIdx = 0;
    let targetScrollProgress = 0;

    // Construction de la scène 3D Three.js Anatomie Éclatée
    if (typeof THREE !== 'undefined' && canvas) {
      try {
        const wrap = document.getElementById('muffin3DAnatomyWrap') || canvas.parentElement;
        const width = wrap.clientWidth || 360;
        const height = wrap.clientHeight || 420;

        const scene = new THREE.Scene();

        const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
        camera.position.set(0, 1.1, 7.6);

        const renderer = new THREE.WebGLRenderer({
          canvas,
          alpha: true,
          antialias: true,
          powerPreference: 'high-performance'
        });
        renderer.setSize(width, height);
        renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
        renderer.shadowMap.enabled = true;
        renderer.shadowMap.type = THREE.PCFSoftShadowMap;

        // Lumières Studio Pâtisserie
        const ambientLight = new THREE.AmbientLight(0xfff9f2, 0.95);
        scene.add(ambientLight);

        const keyLight = new THREE.DirectionalLight(0xffffff, 1.25);
        keyLight.position.set(4, 9, 6);
        keyLight.castShadow = true;
        keyLight.shadow.mapSize.width = 1024;
        keyLight.shadow.mapSize.height = 1024;
        keyLight.shadow.bias = -0.001;
        scene.add(keyLight);

        // Lumière d'accentuation rubis (palette corfovia)
        const rubyRim = new THREE.PointLight(0xe94b4b, 1.8, 18);
        rubyRim.position.set(-5, 3, -4);
        scene.add(rubyRim);

        // Lumière d'accentuation dorée chicorée
        const honeyRim = new THREE.PointLight(0xf59e0b, 1.4, 18);
        honeyRim.position.set(5, -2, -3);
        scene.add(honeyRim);

        // Groupe Racine
        const muffinRoot = new THREE.Group();
        muffinRoot.position.y = -0.2;
        scene.add(muffinRoot);

        // ===================================================================
        // COUCHE 1 : CAISSETTE PLISSÉE (CUP GROUP)
        // ===================================================================
        const cupGroup = new THREE.Group();
        const cupHeight = 1.8;
        const cupTopR = 1.95;
        const cupBottomR = 1.42;
        const flutesCount = 32;

        const cupGeo = new THREE.CylinderGeometry(cupTopR, cupBottomR, cupHeight, flutesCount, 16, true);
        const cPos = cupGeo.attributes.position;
        const cVec = new THREE.Vector3();
        for (let i = 0; i < cPos.count; i++) {
          cVec.fromBufferAttribute(cPos, i);
          const angle = Math.atan2(cVec.z, cVec.x);
          const fluteOffset = Math.sin(angle * flutesCount) * 0.055;
          const r = Math.sqrt(cVec.x * cVec.x + cVec.z * cVec.z);
          const newR = (r + fluteOffset) / r;
          cPos.setXYZ(i, cVec.x * newR, cVec.y, cVec.z * newR);
        }
        cupGeo.computeVertexNormals();

        const cupMat = new THREE.MeshStandardMaterial({
          color: 0x751212,
          roughness: 0.68,
          metalness: 0.08,
          side: THREE.DoubleSide
        });
        const cupMesh = new THREE.Mesh(cupGeo, cupMat);
        cupMesh.castShadow = true;
        cupMesh.receiveShadow = true;
        cupMesh.position.y = cupHeight / 2;
        cupGroup.add(cupMesh);

        // Fond plat de la caissette
        const cupBaseGeo = new THREE.CircleGeometry(cupBottomR, flutesCount);
        const cupBaseMat = new THREE.MeshStandardMaterial({ color: 0x5a0b0b, roughness: 0.8 });
        const cupBaseMesh = new THREE.Mesh(cupBaseGeo, cupBaseMat);
        cupBaseMesh.rotation.x = Math.PI / 2;
        cupGroup.add(cupBaseMesh);

        // Rebord plissé replié doré/bordeaux
        const cupRimGeo = new THREE.TorusGeometry(cupTopR, 0.045, 12, flutesCount);
        const cupRimMat = new THREE.MeshStandardMaterial({ color: 0xa81c1c, roughness: 0.5, metalness: 0.15 });
        const cupRimMesh = new THREE.Mesh(cupRimGeo, cupRimMat);
        cupRimMesh.rotation.x = Math.PI / 2;
        cupRimMesh.position.y = cupHeight;
        cupGroup.add(cupRimMesh);

        muffinRoot.add(cupGroup);

        // ===================================================================
        // COUCHE 2 : CŒUR MOELLEUX 28G PROTÉINES & CHICORÉE (CRUMB GROUP)
        // ===================================================================
        const crumbGroup = new THREE.Group();
        const crumbHeight = 1.7;
        const crumbTopR = 1.92;
        const crumbBottomR = 1.44;

        const crumbGeo = new THREE.CylinderGeometry(crumbTopR, crumbBottomR, crumbHeight, 32, 12);
        const crPos = crumbGeo.attributes.position;
        const crVec = new THREE.Vector3();
        for (let i = 0; i < crPos.count; i++) {
          crVec.fromBufferAttribute(crPos, i);
          const noise = (Math.sin(crVec.x * 12) + Math.cos(crVec.y * 14) + Math.sin(crVec.z * 12)) * 0.025;
          crPos.setXYZ(i, crVec.x * (1 + noise), crVec.y, crVec.z * (1 + noise));
        }
        crumbGeo.computeVertexNormals();

        const crumbMat = new THREE.MeshStandardMaterial({
          color: 0x482110,
          roughness: 0.94,
          metalness: 0.02
        });
        const crumbMesh = new THREE.Mesh(crumbGeo, crumbMat);
        crumbMesh.castShadow = true;
        crumbMesh.receiveShadow = true;
        crumbMesh.position.y = cupHeight * 0.72;
        crumbGroup.add(crumbMesh);

        // Perles de fer héminique & fibres de chicorée qui gravitent
        const pearlsCount = 28;
        const pearlGeo = new THREE.SphereGeometry(0.08, 10, 10);
        const rubyPearlMat = new THREE.MeshStandardMaterial({
          color: 0xe94b4b,
          emissive: 0x8a1111,
          emissiveIntensity: 0.4,
          roughness: 0.3
        });
        const goldPearlMat = new THREE.MeshStandardMaterial({
          color: 0xf59e0b,
          emissive: 0x92400e,
          emissiveIntensity: 0.35,
          roughness: 0.3
        });

        const pearls = [];
        for (let i = 0; i < pearlsCount; i++) {
          const mat = i % 2 === 0 ? rubyPearlMat : goldPearlMat;
          const pMesh = new THREE.Mesh(pearlGeo, mat);
          const theta = (i / pearlsCount) * Math.PI * 2;
          const radiusBase = 1.1 + Math.random() * 0.7;
          const yBase = (cupHeight * 0.72) + (Math.random() - 0.5) * 1.1;
          pMesh.userData = {
            theta,
            radiusBase,
            yBase,
            speed: 0.008 + Math.random() * 0.012,
            phase: Math.random() * Math.PI * 2
          };
          pMesh.position.set(
            Math.cos(theta) * radiusBase,
            yBase,
            Math.sin(theta) * radiusBase
          );
          crumbGroup.add(pMesh);
          pearls.push(pMesh);
        }

        muffinRoot.add(crumbGroup);

        // ===================================================================
        // COUCHE 3 : DÔME CRAQUELÉ CHOCOLAT NOIR 85% (DOME GROUP)
        // ===================================================================
        const domeGroup = new THREE.Group();
        const domeRadius = 2.15;
        const domeGeo = new THREE.SphereGeometry(domeRadius, 36, 18, 0, Math.PI * 2, 0, Math.PI * 0.45);
        const dPos = domeGeo.attributes.position;
        const dVec = new THREE.Vector3();
        for (let i = 0; i < dPos.count; i++) {
          dVec.fromBufferAttribute(dPos, i);
          const crackNoise = Math.sin(dVec.x * 6 + dVec.z * 5) * 0.055;
          dPos.setXYZ(i, dVec.x * (1 + crackNoise), dVec.y * 0.78, dVec.z * (1 + crackNoise));
        }
        domeGeo.computeVertexNormals();

        const domeMat = new THREE.MeshStandardMaterial({
          color: 0x2b1005,
          roughness: 0.65,
          metalness: 0.12
        });
        const domeMesh = new THREE.Mesh(domeGeo, domeMat);
        domeMesh.castShadow = true;
        domeMesh.receiveShadow = true;
        domeMesh.position.y = cupHeight * 0.95;
        domeGroup.add(domeMesh);

        // Pépites de chocolat noir 85% sur le dôme
        const chipCount = 20;
        const chipGeo = new THREE.BoxGeometry(0.3, 0.16, 0.24);
        const chipMat = new THREE.MeshStandardMaterial({
          color: 0x140602,
          roughness: 0.32,
          metalness: 0.22
        });
        const chipsInstanced = new THREE.InstancedMesh(chipGeo, chipMat, chipCount);
        chipsInstanced.castShadow = true;
        const dummy = new THREE.Object3D();

        for (let i = 0; i < chipCount; i++) {
          const phi = Math.acos(1 - 2 * (Math.random() * 0.42));
          const theta = Math.random() * Math.PI * 2;
          const r = domeRadius * 1.01;
          const cx = r * Math.sin(phi) * Math.cos(theta);
          const cy = (r * Math.cos(phi) * 0.78) + (cupHeight * 0.95);
          const cz = r * Math.sin(phi) * Math.sin(theta);

          dummy.position.set(cx, cy, cz);
          dummy.rotation.set(Math.random() * Math.PI, Math.random() * Math.PI, Math.random() * Math.PI);
          const sc = 0.75 + Math.random() * 0.5;
          dummy.scale.set(sc, sc, sc);
          dummy.updateMatrix();
          chipsInstanced.setMatrixAt(i, dummy.matrix);
        }
        chipsInstanced.instanceMatrix.needsUpdate = true;
        domeGroup.add(chipsInstanced);

        muffinRoot.add(domeGroup);

        // Ombre douce portée sous le muffin
        const shadowPlaneGeo = new THREE.PlaneGeometry(8, 8);
        const shadowPlaneMat = new THREE.ShadowMaterial({ opacity: 0.25 });
        const shadowPlane = new THREE.Mesh(shadowPlaneGeo, shadowPlaneMat);
        shadowPlane.rotation.x = -Math.PI / 2;
        shadowPlane.position.y = -0.01;
        shadowPlane.receiveShadow = true;
        scene.add(shadowPlane);

        // Variables d'interpolation physique et interaction tactile
        let curDomeY = 0;
        let curDomeRotX = 0;
        let curCrumbY = 0;
        let curCrumbScale = 1;
        let curCupY = 0;
        let curCupRotX = 0;
        let curCamY = 1.1;
        let curCamZ = 7.6;
        let curParticlesSpread = 0;

        let targetRotY = 0;
        let targetRotX = 0;
        let curRotY = 0;
        let curRotX = 0;
        let isDragging = false;
        let prevPointerX = 0;
        let prevPointerY = 0;

        wrap.addEventListener('pointerdown', (e) => {
          isDragging = true;
          prevPointerX = e.clientX;
          prevPointerY = e.clientY;
        });

        window.addEventListener('pointermove', (e) => {
          if (!isDragging) {
            const rect = wrap.getBoundingClientRect();
            const cx = rect.left + rect.width / 2;
            const cy = rect.top + rect.height / 2;
            const dx = (e.clientX - cx) / (window.innerWidth / 2);
            const dy = (e.clientY - cy) / (window.innerHeight / 2);
            targetRotX = dy * 0.2;
            return;
          }
          const deltaX = e.clientX - prevPointerX;
          const deltaY = e.clientY - prevPointerY;
          prevPointerX = e.clientX;
          prevPointerY = e.clientY;

          targetRotY += deltaX * 0.015;
          targetRotX = Math.max(-0.45, Math.min(0.45, targetRotX + deltaY * 0.01));
        });

        const stopDrag = () => { isDragging = false; };
        window.addEventListener('pointerup', stopDrag);
        window.addEventListener('pointercancel', stopDrag);

        // Animation Loop 60/120 fps
        let isStoryVisible = true;
        if ('IntersectionObserver' in window) {
          const obs = new IntersectionObserver((entries) => {
            isStoryVisible = entries[0].isIntersecting;
          }, { threshold: 0.05 });
          obs.observe(storySection);
        }

        const renderLoop = () => {
          requestAnimationFrame(renderLoop);
          if (!isStoryVisible) return;

          // Rotation automatique continue
          if (!isDragging) {
            targetRotY += 0.0035;
          }

          curRotY += (targetRotY - curRotY) * 0.07;
          curRotX += (targetRotX - curRotX) * 0.07;
          muffinRoot.rotation.y = curRotY;
          muffinRoot.rotation.x = curRotX;

          // Calcul des cibles interpolées à partir du scroll progress
          const progress = Math.max(0, Math.min(3, targetScrollProgress));
          const baseIdx = Math.floor(progress);
          const nextIdx = Math.min(3, baseIdx + 1);
          const t = progress - baseIdx;

          const fromCfg = stepConfigs[baseIdx];
          const toCfg = stepConfigs[nextIdx];

          const destDomeY = fromCfg.domeY + (toCfg.domeY - fromCfg.domeY) * t;
          const destDomeRotX = fromCfg.domeRotX + (toCfg.domeRotX - fromCfg.domeRotX) * t;
          const destCrumbY = fromCfg.crumbY + (toCfg.crumbY - fromCfg.crumbY) * t;
          const destCrumbScale = fromCfg.crumbScale + (toCfg.crumbScale - fromCfg.crumbScale) * t;
          const destCupY = fromCfg.cupY + (toCfg.cupY - fromCfg.cupY) * t;
          const destCupRotX = fromCfg.cupRotX + (toCfg.cupRotX - fromCfg.cupRotX) * t;
          const destCamY = fromCfg.camY + (toCfg.camY - fromCfg.camY) * t;
          const destCamZ = fromCfg.camZ + (toCfg.camZ - fromCfg.camZ) * t;
          const destSpread = fromCfg.particlesSpread + (toCfg.particlesSpread - fromCfg.particlesSpread) * t;

          // Interpolation fluide vers les positions éclatées
          curDomeY += (destDomeY - curDomeY) * 0.085;
          curDomeRotX += (destDomeRotX - curDomeRotX) * 0.085;
          curCrumbY += (destCrumbY - curCrumbY) * 0.085;
          curCrumbScale += (destCrumbScale - curCrumbScale) * 0.085;
          curCupY += (destCupY - curCupY) * 0.085;
          curCupRotX += (destCupRotX - curCupRotX) * 0.085;
          curCamY += (destCamY - curCamY) * 0.075;
          curCamZ += (destCamZ - curCamZ) * 0.075;
          curParticlesSpread += (destSpread - curParticlesSpread) * 0.085;

          // Application aux couches 3D
          domeGroup.position.y = curDomeY;
          domeGroup.rotation.x = curDomeRotX;

          crumbGroup.position.y = curCrumbY;
          crumbGroup.scale.set(curCrumbScale, curCrumbScale, curCrumbScale);

          cupGroup.position.y = curCupY;
          cupGroup.rotation.x = curCupRotX;

          camera.position.y = curCamY;
          camera.position.z = curCamZ;
          camera.lookAt(0, 0.4, 0);

          // Animation orbitale des perles d'énergie
          const now = Date.now() * 0.0015;
          pearls.forEach((pMesh) => {
            const ud = pMesh.userData;
            const currentTheta = ud.theta + now * ud.speed * 20;
            const curR = ud.radiusBase + curParticlesSpread * 1.35;
            pMesh.position.x = Math.cos(currentTheta) * curR;
            pMesh.position.z = Math.sin(currentTheta) * curR;
            pMesh.position.y = ud.yBase + Math.sin(now * 2 + ud.phase) * 0.15;
          });

          renderer.render(scene, camera);
        };

        renderLoop();

        const handleResize = () => {
          const nw = wrap.clientWidth || 360;
          const nh = wrap.clientHeight || 420;
          camera.aspect = nw / nh;
          camera.updateProjectionMatrix();
          renderer.setSize(nw, nh);
        };
        window.addEventListener('resize', handleResize, { passive: true });
      } catch (err) {
        console.warn('Three.js anatomy initialization skipped', err);
      }
    }

    // Gestion du scroll et de l'activation des cartes étapes
    const updateScrollDrivenStep = () => {
      const winH = window.innerHeight || 800;
      const centerTrigger = winH * 0.5;

      let activeIdx = 0;
      let totalProgress = 0;

      // Calcul de la position continue entre les cartes étapes
      const firstCard = stepCards[0];
      const lastCard = stepCards[stepCards.length - 1];
      if (firstCard && lastCard) {
        const firstRect = firstCard.getBoundingClientRect();
        const lastRect = lastCard.getBoundingClientRect();
        const totalDist = lastRect.top - firstRect.top;
        if (totalDist > 0) {
          const curr = centerTrigger - firstRect.top;
          totalProgress = Math.max(0, Math.min(3, (curr / totalDist) * 3));
        }
      }
      targetScrollProgress = totalProgress;

      stepCards.forEach((card, idx) => {
        const rect = card.getBoundingClientRect();
        if (rect.top <= centerTrigger) {
          activeIdx = idx;
        }
      });

      if (activeIdx !== currentStepIdx) {
        currentStepIdx = activeIdx;
        const config = stepConfigs[activeIdx] || stepConfigs[0];

        // Classes sur la carte anatomie
        [0, 1, 2, 3].forEach((i) => anatomyCard.classList.remove(`step-${i}`));
        anatomyCard.classList.add(`step-${activeIdx}`);

        // Cartes étapes actives
        stepCards.forEach((c, i) => {
          c.classList.toggle('is-active', i === activeIdx);
        });

        // Callout pills 3D
        calloutPills.forEach((pill, i) => {
          pill.classList.toggle('active', i === activeIdx);
        });

        // Indicateur de phase & points
        if (phasePill) {
          phasePill.textContent = config.label;
        }
        phaseDots.forEach((dot, i) => {
          dot.classList.toggle('active', i === activeIdx);
        });
      }
    };

    window.addEventListener('scroll', updateScrollDrivenStep, { passive: true });
    window.addEventListener('resize', updateScrollDrivenStep, { passive: true });
    updateScrollDrivenStep();
  };

  // =========================================================================
  // CARROUSEL D'ACTUALITÉS DU HERO (INDICATORS FILL-UP + BILINGUE FR/EN)
  // =========================================================================
  const initHeroNewsCarousel = () => {
    const card = document.getElementById('heroNewsCarousel');
    const stage = document.getElementById('heroNewsStage');
    const tagEl = document.getElementById('heroNewsTag');
    const stageLink = document.getElementById('heroNewsStageLink');
    const captionsEl = document.getElementById('heroNewsCaptions');
    const footerEl = document.getElementById('heroNewsFooter');
    const indicatorsEl = document.getElementById('heroNewsIndicators');
    const arrowsWrap = document.getElementById('heroNewsArrows');
    const prevBtn = document.getElementById('heroNewsPrev');
    const nextBtn = document.getElementById('heroNewsNext');
    if (!card || !stage || !captionsEl || !indicatorsEl) return;

    const dock = card.querySelector('.hero-news-dock') || card;
    const rawItems = Array.isArray(window.CORFOVIA_NEWS) ? window.CORFOVIA_NEWS : [];
    const items = rawItems.filter((item) => item && item.image && item.title);
    if (!items.length) return;

    const durationMs = Math.max(2500, Number(window.CORFOVIA_NEWS_DURATION_MS) || 5500);
    card.style.setProperty('--news-duration', `${durationMs}ms`);

    const normalizeSrc = (src) => {
      if (/^(https?:)?\/\//.test(src)) return src;
      const rel = src.replace(/^\.?\//, '');
      return resolveSiteHref('/' + rel);
    };
    const getLang = () => (window.CorfoviaI18n && typeof window.CorfoviaI18n.getLanguage === 'function'
      ? window.CorfoviaI18n.getLanguage()
      : (document.documentElement.lang || 'fr'));

    const textFor = (item, field) => {
      if (getLang() === 'en') {
        const enVal = item[field + 'En'];
        if (enVal) return enVal;
      }
      return item[field] || '';
    };

    const existingImgs = Array.from(stage.querySelectorAll('.hero-news-slide-img'));
    const imgEls = items.map((item, idx) => {
      const targetSrc = normalizeSrc(item.image);
      const reused = idx === 0 && existingImgs[0] ? existingImgs[0] : null;
      const img = reused || document.createElement('img');
      img.className = 'hero-news-slide-img' + (idx === 0 ? ' is-active' : '');
      if (img.getAttribute('src') !== targetSrc) {
        img.src = targetSrc;
      }
      img.alt = textFor(item, 'title');
      if (idx > 0) {
        img.decoding = 'async';
        img.loading = 'eager';
      }
      img.style.objectPosition = item.imagePos || '50% 50%';
      if (item.imageScale) {
        img.style.setProperty('--img-scale', String(item.imageScale));
      } else {
        img.style.removeProperty('--img-scale');
      }
      if (!reused) {
        stage.appendChild(img);
      }
      return img;
    });
    existingImgs.slice(1).forEach((el) => el.remove());

    captionsEl.innerHTML = '';
    const captionEls = items.map((item, idx) => {
      const wrap = document.createElement('div');
      wrap.className = 'hero-news-caption' + (idx === 0 ? ' is-active' : '');
      wrap.setAttribute('aria-hidden', idx === 0 ? 'false' : 'true');

      const h3 = document.createElement('h3');
      h3.className = 'hero-news-title';
      h3.textContent = textFor(item, 'title');

      const p = document.createElement('p');
      p.className = 'hero-news-desc';
      p.textContent = textFor(item, 'desc');

      wrap.appendChild(h3);
      wrap.appendChild(p);
      captionsEl.appendChild(wrap);
      return { wrap, h3, p };
    });

    indicatorsEl.innerHTML = '';
    const dotEls = items.map((_, idx) => {
      const btn = document.createElement('button');
      btn.type = 'button';
      btn.className = 'hero-news-dot' + (idx === 0 ? ' is-active' : '');
      btn.setAttribute('role', 'tab');
      btn.setAttribute('aria-selected', idx === 0 ? 'true' : 'false');
      btn.setAttribute('aria-label', `Actualité ${idx + 1}`);

      const fill = document.createElement('span');
      fill.className = 'hero-news-dot-fill';
      btn.appendChild(fill);
      indicatorsEl.appendChild(btn);
      return { btn, fill };
    });

    const multi = items.length > 1;
    if (footerEl) footerEl.hidden = !multi;
    if (arrowsWrap) arrowsWrap.hidden = !multi;

    let activeIdx = 0;

    const syncTagAndLink = (idx) => {
      const item = items[idx];
      if (tagEl) {
        const tagText = textFor(item, 'tag');
        if (tagText) {
          tagEl.textContent = tagText;
          tagEl.hidden = false;
        } else {
          tagEl.hidden = true;
        }
      }
      if (stageLink) {
        if (item.link) {
          stageLink.setAttribute('href', item.link.startsWith('/') ? resolveSiteHref(item.link) : item.link);
          stageLink.setAttribute('aria-label', textFor(item, 'title'));
          stageLink.hidden = false;
        } else {
          stageLink.hidden = true;
        }
      }
    };

    const syncIndicators = () => {
      dotEls.forEach(({ btn }, i) => {
        btn.classList.toggle('is-done', i < activeIdx);
        btn.classList.toggle('is-active', i === activeIdx);
        btn.setAttribute('aria-selected', i === activeIdx ? 'true' : 'false');
      });
    };

    const restartActiveFill = () => {
      syncIndicators();
      const dot = dotEls[activeIdx];
      if (!dot || prefersReducedMotion() || !multi) return;
      dot.btn.classList.remove('is-active');
      void dot.btn.offsetWidth;
      dot.btn.classList.add('is-active');
    };

    const goTo = (nextIndex) => {
      const target = ((nextIndex % items.length) + items.length) % items.length;
      if (target === activeIdx) {
        if (multi && !prefersReducedMotion()) restartActiveFill();
        return;
      }

      imgEls[activeIdx].classList.remove('is-active');
      captionEls[activeIdx].wrap.classList.remove('is-active');
      captionEls[activeIdx].wrap.setAttribute('aria-hidden', 'true');

      activeIdx = target;

      imgEls[activeIdx].classList.add('is-active');
      captionEls[activeIdx].wrap.classList.add('is-active');
      captionEls[activeIdx].wrap.setAttribute('aria-hidden', 'false');
      restartActiveFill();
      syncTagAndLink(activeIdx);
    };

    syncIndicators();
    syncTagAndLink(0);

    if (multi) {
      indicatorsEl.addEventListener('animationend', (e) => {
        if (prefersReducedMotion()) return;
        const fillEl = e.target;
        if (!fillEl.classList.contains('hero-news-dot-fill')) return;
        const parentDot = fillEl.closest('.hero-news-dot');
        if (parentDot && parentDot === dotEls[activeIdx].btn) {
          goTo(activeIdx + 1);
        }
      });

      dotEls.forEach(({ btn }, idx) => {
        btn.addEventListener('click', () => goTo(idx));
      });

      if (prevBtn) prevBtn.addEventListener('click', () => goTo(activeIdx - 1));
      if (nextBtn) nextBtn.addEventListener('click', () => goTo(activeIdx + 1));

      let hoverPaused = false;
      let focusPaused = false;
      const syncPausedState = () => {
        card.classList.toggle('is-paused', hoverPaused || focusPaused || document.hidden);
      };

      dock.addEventListener('pointerenter', () => {
        hoverPaused = true;
        syncPausedState();
      });
      dock.addEventListener('pointerleave', () => {
        hoverPaused = false;
        syncPausedState();
      });
      dock.addEventListener('focusin', () => {
        focusPaused = true;
        syncPausedState();
      });
      dock.addEventListener('focusout', (e) => {
        if (!dock.contains(e.relatedTarget)) {
          focusPaused = false;
          syncPausedState();
        }
      });
      document.addEventListener('visibilitychange', syncPausedState);

      let swipeX = null;
      const onTouchStart = (e) => {
        if (e.pointerType === 'touch') swipeX = e.clientX;
      };
      const onTouchEnd = (e) => {
        if (swipeX === null) return;
        const dx = e.clientX - swipeX;
        swipeX = null;
        if (Math.abs(dx) > 42) {
          goTo(activeIdx + (dx < 0 ? 1 : -1));
        }
      };
      dock.addEventListener('pointerdown', onTouchStart, { passive: true });
      dock.addEventListener('pointerup', onTouchEnd, { passive: true });
      stage.addEventListener('pointerdown', onTouchStart, { passive: true });
      stage.addEventListener('pointerup', onTouchEnd, { passive: true });
    }

    window.addEventListener('corfoviaLanguageChange', () => {
      items.forEach((item, idx) => {
        imgEls[idx].alt = textFor(item, 'title');
        captionEls[idx].h3.textContent = textFor(item, 'title');
        captionEls[idx].p.textContent = textFor(item, 'desc');
      });
      syncTagAndLink(activeIdx);
    });
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
    initHeroNewsCarousel();
    splitTitles(false);
    initScrollEngine();
    initScrollReveal();
    initProductsDropdown();
    initTactileResponse();
    initAccordions();
    initPerspectiveViewer();
    initSmoothAnchors();
    initCleanURLAndPendingScroll();
    initProductHeroPhoto();
    initProductHero3D();
    initProductScrollStory();
  });

})();
