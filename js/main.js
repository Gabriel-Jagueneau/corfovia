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
    let smoothedPathProgress = 0;
    let pathRafId = null;

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

      // Départ juste en dessous de la section Hero et arrêt au sommet du Footer
      const y0 = heroEl ? Math.round(heroEl.offsetTop + heroEl.offsetHeight) : 0;
      const yEnd = footerEl ? Math.round(footerEl.offsetTop) : H;
      heroBottomY = y0;
      const spanH = Math.max(700, yEnd - y0);

      // Amplitude horizontale ultra-douce pour éviter tout virage brusque
      const xStart = Math.round(W * 0.62);
      const xRight = Math.round(W * 0.66);
      const xLeft = Math.round(W * 0.34);
      const xEnd = Math.round(W * 0.50);

      // Calage des dégradés (fondu au départ sous le Hero + étalement horizontal sur le Footer)
      if (threadGradient) {
        threadGradient.setAttribute('y1', `${y0}`);
        threadGradient.setAttribute('y2', `${yEnd}`);
      }
      if (spreadGradient) {
        spreadGradient.setAttribute('x1', '0');
        spreadGradient.setAttribute('x2', `${W}`);
      }

      // 2 grandes boucles ultra-lissées (continuité C1 stricte, rayon ample, zéro cassure)
      // Positionnées au cœur des grilles de cartes (et non sur les titres de sections)
      const creationEl = document.getElementById('creation');
      const routineEl = document.getElementById('routine');
      const communauteEl = document.getElementById('communaute');

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

      const R = Math.round(Math.min(185, Math.max(105, W * 0.13)));
      const dy = 145;
      const cy = 265;
      const k = 0.92; // Tangentes longues alignées C1 pour une courbure ultra-lissée
      const tx = Math.round(R * k);
      const ty = Math.round((cy + dy) * k);

      const d = [
        // Départ juste en dessous du Hero (y = y0)
        `M ${xStart} ${y0}`,
        // Descente ample et ultra-lissée vers la Boucle #1 (côté droit, sous les cartes Piliers)
        `C ${xStart + 25} ${Math.round(y0 + (y1 - dy - y0) * 0.45)}, ${xRight + tx} ${y1 - dy - ty}, ${xRight} ${y1 - dy}`,
        // Boucle #1 très ronde et ouverte (vers la gauche)
        `C ${xRight - R} ${y1 + cy}, ${xRight - R} ${y1 - cy}, ${xRight} ${y1 + dy}`,
        // Longue traversée fluide en S derrière les cartes Équipe vers la Boucle #2 (côté gauche)
        `C ${xRight + tx} ${y1 + dy + ty}, ${xLeft - tx} ${y2 - dy - ty}, ${xLeft} ${y2 - dy}`,
        // Boucle #2 très ronde et ouverte (vers la droite, sous les cartes Science)
        `C ${xLeft + R} ${y2 + cy}, ${xLeft + R} ${y2 - cy}, ${xLeft} ${y2 + dy}`,
        // Arrivée verticale ultra-douce pile contre la bordure supérieure du Footer (y = yEnd)
        `C ${xLeft - tx} ${y2 + dy + ty}, ${xEnd} ${yEnd - 220}, ${xEnd} ${yEnd}`
      ].join(' ');

      mainScrollPath.setAttribute('d', d);

      if (typeof mainScrollPath.getTotalLength === 'function') {
        mainPathLength = mainScrollPath.getTotalLength();
        mainScrollPath.style.strokeDasharray = `${mainPathLength}`;
      }

      // Deux branches d'étalement horizontal en fondu total jusqu'aux bords de l'écran (0 et W)
      const xSpreadLeft = 0;
      const xSpreadRight = W;

      if (spreadLeftPath) {
        spreadLeftPath.setAttribute('d', `M ${xEnd} ${yEnd} L ${xSpreadLeft} ${yEnd}`);
        if (typeof spreadLeftPath.getTotalLength === 'function') {
          spreadLeftLength = spreadLeftPath.getTotalLength();
          spreadLeftPath.style.strokeDasharray = `${spreadLeftLength}`;
        }
      }

      if (spreadRightPath) {
        spreadRightPath.setAttribute('d', `M ${xEnd} ${yEnd} L ${xSpreadRight} ${yEnd}`);
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
        smoothedPathProgress += diff * 0.32;
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
        const scrollStart = Math.max(0, heroBottomY - winH * 0.6);
        const postHeroRange = Math.max(1, docHeight - scrollStart);
        const rawProg = Math.min(1, Math.max(0, (scrollY - scrollStart) / postHeroRange));
        targetPathProgress = Math.pow(rawProg, 1.38);
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
    updateScrollState();
  };

  // =========================================================================
  // 2. SCROLL REVEAL OBSERVER
  // =========================================================================
  const initScrollReveal = () => {
    const revealEls = document.querySelectorAll('[data-scroll-reveal]');
    if (!revealEls.length) return;

    if (prefersReducedMotion() || typeof IntersectionObserver === 'undefined') {
      revealEls.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    revealEls.forEach((el, idx) => {
      el.style.transitionDelay = `${(idx % 4) * 55}ms`;
      observer.observe(el);
    });
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
          } catch (_) {}
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
    } catch (_) {}

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
  document.addEventListener('DOMContentLoaded', () => {
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
