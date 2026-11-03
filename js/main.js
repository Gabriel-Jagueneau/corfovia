/**
 * CORFOVIA — Client Interactions & Morphing Header
 */

(() => {
  'use strict';

  // =========================================================================
  // 1. DYNAMIC HEADER SCROLL & REAL-TIME SECTION SPY
  // =========================================================================
  const initHeaderMorph = () => {
    const nav = document.querySelector('.site-nav');
    const progressBar = document.querySelector('.nav-progress-bar');
    const currentLabel = document.querySelector('.nav-current-label');
    const navLinks = document.querySelectorAll('.nav-links .nav-link');
    if (!nav) return;

    // Mapping des sections pour le suivi dynamique en temps réel
    const sections = [
      { id: 'vision', label: 'La Vision', navSection: 'vision' },
      { id: 'piliers', label: 'Les 4 Piliers', navSection: 'vision' },
      { id: 'creation', label: "L'Innovation", navSection: 'creation' },
      { id: 'routine', label: 'Notre Science', navSection: 'routine' },
      { id: 'communaute', label: 'Communauté', navSection: 'routine' }
    ];

    let isScrolled = false;
    let ticking = false;
    let lastSectionLabel = '';

    const updateScrollState = () => {
      const scrollY = window.scrollY || document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;

      // A. Jauge de progression ultra-fine au bas du header
      if (progressBar && docHeight > 0) {
        const progress = Math.min(100, Math.max(0, (scrollY / docHeight) * 100));
        progressBar.style.width = progress.toFixed(1) + '%';
      }

      // B. Morphing d'état îlot flottant (hystérésis : 40px entrée / 15px sortie)
      if (!isScrolled && scrollY > 40) {
        nav.classList.add('is-scrolled');
        isScrolled = true;
      } else if (isScrolled && scrollY < 15) {
        nav.classList.remove('is-scrolled');
        isScrolled = false;
      }

      // C. Détection dynamique de la section visible
      const triggerPoint = scrollY + 140;
      let activeSection = null;

      for (let i = sections.length - 1; i >= 0; i--) {
        const el = document.getElementById(sections[i].id);
        if (el && el.offsetTop <= triggerPoint) {
          activeSection = sections[i];
          break;
        }
      }

      // Si tout en haut de page
      if (!activeSection && sections.length > 0) {
        activeSection = sections[0];
      }

      // Si tout en bas de page
      if (docHeight > 0 && scrollY >= docHeight - 30) {
        activeSection = sections[sections.length - 1];
      }

      if (activeSection && activeSection.label !== lastSectionLabel) {
        lastSectionLabel = activeSection.label;

        // Mise à jour de l'indicateur textuel
        if (currentLabel) {
          currentLabel.textContent = activeSection.label;
        }

        // Mise à jour du lien actif dans le menu de navigation
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

    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    updateScrollState(); // Vérification au chargement initial
  };


  // =========================================================================
  // DROPDOWN PRODUITS CUSTOM
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

    // Clic / Tap sur le bouton
    trigger.addEventListener('click', (e) => {
      e.stopPropagation();
      const isOpen = wrapper.classList.contains('is-open');
      if (isOpen) {
        closeDropdown();
      } else {
        openDropdown();
      }
    });

    // Hover gracieux sur desktop avec délai tampon
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

    // Clic à l'extérieur pour fermer
    document.addEventListener('click', (e) => {
      if (!wrapper.contains(e.target)) {
        closeDropdown();
      }
    });

    // Fermeture avec la touche Échap
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && wrapper.classList.contains('is-open')) {
        closeDropdown();
        trigger.focus();
      }
    });
  };

  // =========================================================================
  // 2. TACTILE RESPONSE (Zero Latence & Hysteresis)
  // =========================================================================
  const initTactileResponse = () => {
    const interactiveSelectors = [
      '.btn-clay',
      '.pack-pill-glorious',
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
        if (Math.hypot(dx, dy) > 12) {
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
  // 3. ACCORDIONS
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
  // 4. PACK SELECTOR & PERSPECTIVE PILLS (Product Detail)
  // =========================================================================
  const initSelectors = () => {
    // Pack selector
    const packPills = document.querySelectorAll('.pack-pill-glorious');
    const priceDisplay = document.querySelector('.detail-glorious-price');

    packPills.forEach((pill) => {
      pill.addEventListener('pointerdown', () => {
        packPills.forEach((p) => p.classList.remove('active'));
        pill.classList.add('active');

        const price = pill.getAttribute('data-price');
        if (priceDisplay && price) {
          priceDisplay.textContent = price;
        }
      });
    });

    // Perspective pills
    const perspectivePills = document.querySelectorAll('.perspective-pill-btn');
    const stageBadge = document.querySelector('.product-stage-badge');

    if (perspectivePills.length > 0 && stageBadge) {
      const badgeMap = {
        'cacao': 'Bon Chocolat Fondant • Fleur de Sel',
        'nutriments': 'Ingrédients Bio & Locaux • Fer Héminique',
        'bio': 'Absorption Naturelle Record',
        'etui': 'Étui Fraîcheur Hermétique'
      };

      perspectivePills.forEach((pill) => {
        pill.addEventListener('pointerdown', () => {
          perspectivePills.forEach((p) => p.classList.remove('active'));
          pill.classList.add('active');

          const viewKey = pill.getAttribute('data-view');
          if (badgeMap[viewKey]) {
            stageBadge.textContent = badgeMap[viewKey];
          }
        });
      });
    }

    // Add to cart button
    const addCartBtn = document.querySelector('.btn-add-cart-glorious');
    if (addCartBtn) {
      addCartBtn.addEventListener('pointerdown', () => {
        const originalHtml = addCartBtn.innerHTML;
        addCartBtn.textContent = 'Ajouté au Panier ✓';
        addCartBtn.style.background = 'linear-gradient(135deg, #2e7d32 0%, #1b5e20 100%)';

        setTimeout(() => {
          addCartBtn.innerHTML = originalHtml;
          addCartBtn.style.background = '';
        }, 2000);
      });
    }
  };

  // =========================================================================
  // 5. SMOOTH IN-PAGE ANCHOR SCROLL
  // =========================================================================
  // =========================================================================
  // GESTION DU DÉFILEMENT DOUX SANS POLLUTION DE L'URL (ZÉRO HASH # DANS L'ADRESSE)
  // =========================================================================
  const initSmoothAnchors = () => {
    document.querySelectorAll('a[href*="#"]').forEach((anchor) => {
      anchor.addEventListener('click', (e) => {
        const href = anchor.getAttribute('href');
        if (!href || href === '#') return;

        const urlParts = href.split('#');
        const targetId = urlParts[1];
        if (!targetId) return;

        const targetEl = document.getElementById(targetId);
        const pagePath = urlParts[0];

        // Vérifie si la cible se trouve sur la page courante
        const isCurrentPage = !pagePath || 
                              pagePath === '' || 
                              pagePath === './' || 
                              pagePath === 'index.html' || 
                              pagePath === '/' || 
                              pagePath === '../../' || 
                              (targetEl !== null);

        if (targetEl && isCurrentPage) {
          e.preventDefault();
          const targetOffset = targetEl.getBoundingClientRect().top + window.pageYOffset - 68;
          window.scrollTo({
            top: targetOffset,
            behavior: 'smooth'
          });

          // Nettoyage immédiat de l'URL pour ne jamais afficher de #... dans la barre d'adresse
          if (window.history && window.history.replaceState) {
            let cleanPath = window.location.pathname;
            if (cleanPath.endsWith('/index.html')) cleanPath = cleanPath.slice(0, -10);
            if (!cleanPath) cleanPath = '/';
            window.history.replaceState(null, document.title, cleanPath + window.location.search);
          }
        }
      });
    });
  };

  // =========================================================================
  // NETTOYAGE D'URL (ÉLIMINATION DE index.html ET DU HASH AU CHARGEMENT)
  // =========================================================================
  const initCleanURL = () => {
    // Si index.html ou un hash est présent dans l'adresse, le nettoyer
    if (window.history && window.history.replaceState) {
      const loc = window.location;
      if (loc.pathname.endsWith('index.html') || loc.hash) {
        let clean = loc.pathname.replace(/\/index\.html$/, '/').replace(/index\.html$/, '');
        if (!clean) clean = '/';
        window.history.replaceState(null, document.title, clean + loc.search);
      }
    }
  };

  // =========================================================================
  // BOOTSTRAP
  // =========================================================================
  document.addEventListener('DOMContentLoaded', () => {
    initCleanURL();
    initHeaderMorph();
    initProductsDropdown();
    initTactileResponse();
    initAccordions();
    initSelectors();
    initSmoothAnchors();
  });

})();
