/**
 * ==========================================================================
 * CORFOVIA — ABADAKOR PRODUCT EXPERIENCE (120 FPS GPU PIPELINE)
 * Hero Expansion Plein Écran · Sticky Compositor Sans Tremblement
 * Anatomie Centrée & Fond Muffins Animés · Duel Visuel · Galerie
 * ==========================================================================
 */

(() => {
  'use strict';

  const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const clamp = (v, min, max) => Math.min(max, Math.max(min, v));
  const lerp = (a, b, t) => a + (b - a) * t;
  // Safari fait défiler sur le thread compositeur : l'inertie JS (lerp) y est décalée et fait trembler les éléments sticky
  const isSafari = /^((?!chrome|chromium|android|crios|fxios|edg).)*safari/i.test(navigator.userAgent);
  const smoothK = (k) => (isSafari ? 1 : k);
  const easeOutCubic = (t) => 1 - Math.pow(1 - t, 3);
  const easeInOutCubic = (t) => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);

  // Réveil paresseux du moteur RAF (dort à 0% CPU quand rien ne bouge)
  let wakeRaf = () => { };

  // Transform exacte d'un plan 800x707 pour cadrer [fx, fy] dans viewBox 520x408
  const buildPhotoTransform = (fx, fy, zoom) => {
    const w = 520 / zoom;
    const h = 408 / zoom;
    const x0 = clamp(fx - w * 0.5, 156, 676 - w);
    const y0 = clamp(fy - h * 0.5, 180, 588 - h);
    const s = 800 / w;
    const tx = -(x0 / 800) * 100;
    const ty = -(y0 / 707) * 100;
    return `scale3d(${s.toFixed(4)}, ${s.toFixed(4)}, 1) translate3d(${tx.toFixed(3)}%, ${ty.toFixed(3)}%, 0)`;
  };

  // =========================================================================
  // 1. ACT 1 : HERO — LA PHOTO QUITTE SA CASE ET PREND TOUT L'ÉCRAN (ARRONDI)
  // =========================================================================
  const initHeroBleed = () => {
    const track = document.getElementById('pHeroTrack');
    const slot = document.getElementById('pHeroSlot');
    const bleed = document.getElementById('pHeroBleed');
    const img = document.getElementById('pHeroBleedImg');
    const copy = document.getElementById('pHeroCopy');
    if (!track || !slot || !bleed || !img) return null;

    let trackTop = 0;
    let span = 1;
    let insetZero = { top: 0, right: 0, bottom: 0, left: 0 };
    let imgZero = { dx: 0, dy: 0, scale: 1 };
    let targetP = 0;
    let curP = -1;

    const measure = () => {
      const tr = track.getBoundingClientRect();
      trackTop = tr.top + window.scrollY;
      span = Math.max(1, track.offsetHeight - window.innerHeight);

      const b = bleed.getBoundingClientRect();
      const s = slot.getBoundingClientRect();
      insetZero = {
        top: Math.max(0, s.top - b.top),
        right: Math.max(0, b.right - s.right),
        bottom: Math.max(0, b.bottom - s.bottom),
        left: Math.max(0, s.left - b.left)
      };

      const imgW = Math.max(1, img.offsetWidth || b.width);
      const imgH = Math.max(1, img.offsetHeight || b.height);
      const slotCx = s.left - b.left + s.width * 0.5;
      const slotCy = s.top - b.top + s.height * 0.5;
      imgZero = {
        dx: slotCx - b.width * 0.5,
        dy: slotCy - b.height * 0.5,
        scale: Math.max(s.width / imgW, s.height / imgH)
      };

      curP = -1;
    };

    const render = (p) => {
      const e = prefersReducedMotion ? 1 : easeOutCubic(clamp(p / 0.78, 0, 1));
      const t = lerp(insetZero.top, 0, e);
      const r = lerp(insetZero.right, 0, e);
      const b = lerp(insetZero.bottom, 0, e);
      const l = lerp(insetZero.left, 0, e);

      bleed.style.clipPath = `inset(${t.toFixed(1)}px ${r.toFixed(1)}px ${b.toFixed(1)}px ${l.toFixed(1)}px round 32px)`;
      bleed.style.webkitClipPath = `inset(${t.toFixed(1)}px ${r.toFixed(1)}px ${b.toFixed(1)}px ${l.toFixed(1)}px round 32px)`;

      const dx = lerp(imgZero.dx, 0, e);
      const dy = lerp(imgZero.dy, 0, e);
      const sc = lerp(imgZero.scale, 1.03, e);
      img.style.transform = `translate3d(calc(-50% + ${dx.toFixed(1)}px), calc(-50% + ${dy.toFixed(1)}px), 0) scale3d(${sc.toFixed(4)}, ${sc.toFixed(4)}, 1)`;

      slot.style.opacity = clamp(1 - p / 0.14, 0, 1).toFixed(3);

      const tail = prefersReducedMotion ? 0 : easeInOutCubic(clamp((p - 0.88) / 0.12, 0, 1));
      const bleedScale = lerp(1, 0.955, tail);
      bleed.style.transform = `scale3d(${bleedScale.toFixed(4)}, ${bleedScale.toFixed(4)}, 1)`;
      bleed.style.opacity = lerp(1, 0.45, tail).toFixed(3);

      if (copy) {
        const cp = prefersReducedMotion ? 0 : clamp(p / 0.52, 0, 1);
        const ce = easeOutCubic(cp);
        copy.style.opacity = (1 - ce).toFixed(3);
        copy.style.transform = `translate3d(0, ${(-24 * ce).toFixed(1)}px, 0)`;
      }
    };

    const update = (scrollY, tickOnly = false) => {
      if (!tickOnly) {
        targetP = prefersReducedMotion ? 0 : clamp((scrollY - trackTop) / span, 0, 1);
      }
      if (curP < 0 || prefersReducedMotion) {
        curP = targetP;
        render(curP);
        return false;
      }
      const diff = targetP - curP;
      if (Math.abs(diff) > 0.0005) {
        curP = lerp(curP, targetP, smoothK(0.28));
        render(curP);
        return true;
      }
      if (curP !== targetP) {
        curP = targetP;
        render(curP);
      }
      return false;
    };

    return { measure, update };
  };

  // =========================================================================
  // 2. ACT 2 : UN MUFFIN. DEUX REGARDS (STICKY STABILISÉ SUR COMPOSITOR)
  // =========================================================================
  const initSplitCurtain = () => {
    const track = document.getElementById('pSplitTrack');
    const inner = document.getElementById('pSplitInner');
    const expandWrap = document.getElementById('pSplitExpand');
    const stage = document.getElementById('pSplitStage');
    const frontLayer = document.getElementById('pSplitFront');
    const bladePath = document.getElementById('pSplitBladePath');
    const handle = document.getElementById('pSplitHandle');
    const controlsEl = document.getElementById('pSplitControls');
    const glider = document.getElementById('pSplitGlider');
    const presetBtns = Array.from(document.querySelectorAll('.p-split-preset-btn'));
    if (!stage || !track || !expandWrap) return null;

    let pos = 0.5;
    let targetPos = 0.5;
    let appliedPos = -1;
    let appliedBend = 0;
    let scale = 0.84;
    let targetScale = 0.84;
    let appliedScale = -1;
    let handoffY = 0;
    let targetHandoffY = 0;
    let handoffS = 1;
    let targetHandoffS = 1;
    let handoffOp = 1;
    let targetHandoffOp = 1;
    let appliedHandoffKey = '';
    let isDragging = false;
    let userDelta = 0;
    let lastInteractScrollY = window.scrollY || 0;
    let stageW = Math.max(1, stage.clientWidth || stage.offsetWidth);
    let stageH = Math.max(1, stage.clientHeight || stage.offsetHeight);
    let trackTop = 0;
    let trackSpan = 1;

    const getAutoPos = (scrollY) => {
      const winH = window.innerHeight || 900;
      const animStart = trackTop - winH * 0.70;
      const animSpan = Math.max(1, trackSpan + winH * 0.90);
      const scrollP = clamp((scrollY - animStart) / animSpan, 0, 1);
      return 0.50 + Math.sin((scrollP - 0.5) * Math.PI * 1.35) * 0.32;
    };

    const syncGlider = () => {
      if (!controlsEl || !glider || !presetBtns.length) return;
      const activeBtn = presetBtns.find((b) => b.classList.contains('is-active')) || presetBtns[1] || presetBtns[0];
      if (!activeBtn) return;
      const padLeft = controlsEl.clientWidth > 0 ? parseFloat(getComputedStyle(controlsEl).paddingLeft) || 6 : 6;
      glider.style.width = `${activeBtn.offsetWidth}px`;
      glider.style.transform = `translate3d(${(activeBtn.offsetLeft - padLeft).toFixed(1)}px, 0, 0)`;
    };

    const syncPresetButtons = (val) => {
      const mode = val > 0.62 ? 'kid' : (val < 0.38 ? 'parent' : 'mid');
      if (controlsEl && controlsEl.getAttribute('data-active-mode') !== mode) {
        controlsEl.setAttribute('data-active-mode', mode);
      }
      let changed = false;
      presetBtns.forEach((btn) => {
        const shouldActive = btn.getAttribute('data-mode') === mode;
        if (btn.classList.contains('is-active') !== shouldActive) {
          btn.classList.toggle('is-active', shouldActive);
          changed = true;
        }
      });
      if (changed) syncGlider();
    };

    const CURVE_STEPS = 20;
    const computeBend = (val, vel) => (prefersReducedMotion ? 0 : clamp((val - 0.5) * 0.09 + vel * 0.12, -0.055, 0.055));

    const applySplit = (val, vel = 0) => {
      const bend = computeBend(val, vel);
      const xEdge = clamp(val - bend, 0, 1);
      const xCtrl = 2 * val - xEdge;

      if (bladePath) {
        const gapT = clamp(22 / Math.max(1, stageH), 0.02, 0.12);
        const t1 = 0.5 - gapT;
        const t2 = 0.5 + gapT;
        const bezX = (t) => {
          const mt = 1 - t;
          return mt * mt * xEdge + 2 * mt * t * xCtrl + t * t * xEdge;
        };
        const p0x = xEdge * 1000;
        const q1x = lerp(xEdge, xCtrl, t1) * 1000;
        const q1y = lerp(0, 0.5, t1) * 1000;
        const q2x = bezX(t1) * 1000;
        const q2y = t1 * 1000;

        const r0x = bezX(t2) * 1000;
        const r0y = t2 * 1000;
        const r1x = lerp(xCtrl, xEdge, t2) * 1000;
        const r1y = lerp(0.5, 1, t2) * 1000;

        bladePath.setAttribute(
          'd',
          `M ${p0x.toFixed(1)} 0 Q ${q1x.toFixed(1)} ${q1y.toFixed(1)} ${q2x.toFixed(1)} ${q2y.toFixed(1)} ` +
          `M ${r0x.toFixed(1)} ${r0y.toFixed(1)} Q ${r1x.toFixed(1)} ${r1y.toFixed(1)} ${p0x.toFixed(1)} 1000`
        );
      }

      if (frontLayer) {
        const pts = ['0% 0%'];
        for (let i = 0; i <= CURVE_STEPS; i++) {
          const t = i / CURVE_STEPS;
          const mt = 1 - t;
          const x = mt * mt * xEdge + 2 * mt * t * xCtrl + t * t * xEdge;
          pts.push(`${(clamp(x, 0, 1) * 100).toFixed(2)}% ${(t * 100).toFixed(1)}%`);
        }
        pts.push('0% 100%');
        const poly = `polygon(${pts.join(', ')})`;
        frontLayer.style.clipPath = poly;
        frontLayer.style.webkitClipPath = poly;
      }

      const xPx = val * stageW;
      if (handle) {
        handle.style.transform = `translate3d(${xPx.toFixed(2)}px, -50%, 0) rotate(${(-bend * 18).toFixed(2)}deg)`;
      }
      appliedBend = bend;
    };

    const measure = () => {
      stageW = Math.max(1, stage.clientWidth || stage.offsetWidth);
      stageH = Math.max(1, stage.clientHeight || stage.offsetHeight);
      const tr = track.getBoundingClientRect();
      trackTop = tr.top + window.scrollY;
      trackSpan = Math.max(1, track.offsetHeight - window.innerHeight);
      applySplit(pos);
      syncGlider();
    };

    const updateFromClientX = (clientX) => {
      const sr = stage.getBoundingClientRect();
      const rectW = Math.max(1, sr.width);
      targetPos = clamp((clientX - sr.left) / rectW, 0.06, 0.94);
      const curScrollY = window.scrollY || document.documentElement.scrollTop || 0;
      userDelta = targetPos - getAutoPos(curScrollY);
      lastInteractScrollY = curScrollY;
      syncPresetButtons(targetPos);
      wakeRaf();
    };

    stage.addEventListener('pointerdown', (e) => {
      e.preventDefault();
      isDragging = true;
      stage.classList.add('is-dragging');
      if (stage.setPointerCapture) stage.setPointerCapture(e.pointerId);
      updateFromClientX(e.clientX);
    });

    stage.addEventListener('pointermove', (e) => {
      if (!isDragging) return;
      updateFromClientX(e.clientX);
    });

    const stopDrag = (e) => {
      if (!isDragging) return;
      isDragging = false;
      stage.classList.remove('is-dragging');
      if (stage.releasePointerCapture && e.pointerId !== undefined) {
        try { stage.releasePointerCapture(e.pointerId); } catch (_) { }
      }
      wakeRaf();
    };

    stage.addEventListener('pointerup', stopDrag);
    stage.addEventListener('pointercancel', stopDrag);

    presetBtns.forEach((btn) => {
      btn.addEventListener('click', () => {
        targetPos = parseFloat(btn.getAttribute('data-split-target') || '0.5');
        const curScrollY = window.scrollY || document.documentElement.scrollTop || 0;
        userDelta = targetPos - getAutoPos(curScrollY);
        lastInteractScrollY = curScrollY;
        syncPresetButtons(targetPos);
        wakeRaf();
      });
    });

    const update = (scrollY, tickOnly = false) => {
      const winH = window.innerHeight || 900;

      if (!tickOnly) {
        // Même règle que la home : début à 98 % de la hauteur d'écran, achèvement à 70 %
        const startY = trackTop - winH * 0.98;
        const endY = trackTop - winH * 0.70;
        const enterP = clamp((scrollY - startY) / Math.max(1, endY - startY), 0, 1);
        const ee = easeOutCubic(enterP);
        const minScale = window.innerWidth <= 960 ? 0.90 : 0.84;
        targetScale = prefersReducedMotion ? 1 : lerp(minScale, 1, ee);

        const stickyP = clamp((scrollY - trackTop) / trackSpan, 0, 1);
        const exitP = prefersReducedMotion ? 0 : easeInOutCubic(clamp((stickyP - 0.78) / 0.22, 0, 1));

        targetHandoffS = prefersReducedMotion ? 1 : lerp(lerp(0.93, 1, ee), 0.92, exitP);
        targetHandoffY = prefersReducedMotion ? 0 : lerp(lerp(34, 0, ee), -26, exitP);
        targetHandoffOp = prefersReducedMotion ? 1 : lerp(lerp(0.18, 1, ee), 0.2, exitP);

        if (!isDragging && !prefersReducedMotion) {
          const dY = Math.abs(scrollY - lastInteractScrollY);
          lastInteractScrollY = scrollY;
          if (userDelta !== 0) {
            userDelta *= Math.exp(-dY / 150);
            if (Math.abs(userDelta) < 0.002) userDelta = 0;
          }
          targetPos = clamp(getAutoPos(scrollY) + userDelta, 0.06, 0.94);
          syncPresetButtons(targetPos);
        }
      }

      if (prefersReducedMotion) {
        pos = targetPos;
        scale = targetScale;
        handoffS = targetHandoffS;
        handoffY = targetHandoffY;
        handoffOp = targetHandoffOp;
      } else {
        const prevPos = pos;
        pos = lerp(pos, targetPos, isDragging ? 0.44 : 0.24);
        const vel = pos - prevPos;
        scale = lerp(scale, targetScale, smoothK(0.28));
        handoffS = lerp(handoffS, targetHandoffS, smoothK(0.28));
        handoffY = lerp(handoffY, targetHandoffY, smoothK(0.28));
        handoffOp = lerp(handoffOp, targetHandoffOp, smoothK(0.28));

        const posMoving = Math.abs(pos - targetPos) > 0.0007;
        const scaleMoving = Math.abs(scale - targetScale) > 0.0005;
        const handoffMoving =
          Math.abs(handoffS - targetHandoffS) > 0.0005 ||
          Math.abs(handoffY - targetHandoffY) > 0.08 ||
          Math.abs(handoffOp - targetHandoffOp) > 0.002;
        if (!posMoving) pos = targetPos;
        if (!scaleMoving) scale = targetScale;
        if (!handoffMoving) {
          handoffS = targetHandoffS;
          handoffY = targetHandoffY;
          handoffOp = targetHandoffOp;
        }

        if (Math.abs(scale - appliedScale) > 0.0003) {
          appliedScale = scale;
          expandWrap.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;
        }

        if (inner) {
          const key = `${handoffS.toFixed(4)}|${handoffY.toFixed(1)}|${handoffOp.toFixed(3)}`;
          if (key !== appliedHandoffKey) {
            appliedHandoffKey = key;
            inner.style.transform = `translate3d(0, ${handoffY.toFixed(1)}px, 0) scale3d(${handoffS.toFixed(4)}, ${handoffS.toFixed(4)}, 1)`;
            inner.style.opacity = handoffOp.toFixed(3);
          }
        }

        const expectedBend = computeBend(pos, vel);
        const bendSettling = Math.abs(expectedBend - appliedBend) > 0.0008;
        if (Math.abs(pos - appliedPos) > 0.0004 || bendSettling) {
          appliedPos = pos;
          applySplit(pos, vel);
        }

        return posMoving || scaleMoving || handoffMoving || bendSettling;
      }

      if (Math.abs(scale - appliedScale) > 0.0003) {
        appliedScale = scale;
        expandWrap.style.transform = `scale3d(${scale.toFixed(4)}, ${scale.toFixed(4)}, 1)`;
      }

      if (inner) {
        const key = `${handoffS.toFixed(4)}|${handoffY.toFixed(1)}|${handoffOp.toFixed(3)}`;
        if (key !== appliedHandoffKey) {
          appliedHandoffKey = key;
          inner.style.transform = `translate3d(0, ${handoffY.toFixed(1)}px, 0) scale3d(${handoffS.toFixed(4)}, ${handoffS.toFixed(4)}, 1)`;
          inner.style.opacity = handoffOp.toFixed(3);
        }
      }

      if (Math.abs(pos - appliedPos) > 0.0004) {
        appliedPos = pos;
        applySplit(pos, 0);
      }

      return false;
    };

    applySplit(0.5);
    syncPresetButtons(0.5);
    syncGlider();
    return { measure, update };
  };

  // =========================================================================
  // 3. ACT 3 : ANATOMIE STICKY CENTRÉE + CARTE COLORÉE ARRONDIE & TRANSITIONS
  // =========================================================================
  const initStickyAnatomy = () => {
    const track = document.getElementById('pStoryTrack');
    const stickyEl = document.getElementById('pStorySticky');
    const panel = document.getElementById('pStoryPanel');
    const bgEl = document.getElementById('pStoryBg');
    const camera = document.getElementById('pStoryCamera');
    const captions = Array.from(document.querySelectorAll('.p-story-caption'));
    const segs = Array.from(document.querySelectorAll('.p-story-seg'));

    if (!track || !stickyEl || !camera || !segs.length) return null;

    const views = [
      buildPhotoTransform(545, 298, 1.32), // 01 Dôme cacao 85 %
      buildPhotoTransform(328, 462, 1.32), // 02 Chicorée zéro pic
      buildPhotoTransform(516, 434, 1.30), // 03 Protéines 11,2 g & fer
      buildPhotoTransform(416, 384, 1.00)  // 04 Caissette 90 g vue d'ensemble
    ];

    let trackTop = 0;
    let scrollSpan = 1;
    let activeIdx = -1;
    let targetP = 0;
    let curP = -1;
    let panelS = 1;
    let targetPanelS = 1;
    let panelY = 0;
    let targetPanelY = 0;
    let panelOp = 1;
    let targetPanelOp = 1;
    let appliedPanelKey = '';

    const applyStep = (idx) => {
      const safeIdx = clamp(idx, 0, views.length - 1);
      if (safeIdx === activeIdx) return;
      activeIdx = safeIdx;
      stickyEl.setAttribute('data-step', String(safeIdx));
      camera.style.transform = views[safeIdx];
      captions.forEach((c, i) => c.classList.toggle('is-active', i === safeIdx));
      segs.forEach((s, i) => s.classList.toggle('is-active', i === safeIdx));
    };

    const renderProgress = (p) => {
      const chapterP = clamp(p / 0.86, 0, 1);
      if (bgEl) bgEl.style.setProperty('--sp', chapterP.toFixed(4));
      segs.forEach((seg, i) => {
        const local = clamp(chapterP * 4 - i, 0, 1);
        seg.style.setProperty('--seg-fill', local.toFixed(3));
      });
    };

    const measure = () => {
      const r = track.getBoundingClientRect();
      trackTop = r.top + window.scrollY;
      scrollSpan = Math.max(1, track.offsetHeight - window.innerHeight);
    };

    segs.forEach((btn, idx) => {
      btn.addEventListener('click', () => {
        measure();
        const targetY = trackTop + (((idx + 0.42) / 4) * 0.86) * scrollSpan;
        window.scrollTo({ top: targetY, behavior: prefersReducedMotion ? 'auto' : 'smooth' });
      });
    });

    const update = (scrollY, tickOnly = false) => {
      const winH = window.innerHeight || 900;

      if (!tickOnly) {
        targetP = clamp((scrollY - trackTop) / scrollSpan, 0, 1);
        const chapterP = clamp(targetP / 0.86, 0, 1);
        const idx = Math.min(3, Math.floor(chapterP * 3.99));
        applyStep(idx);

        const enterP = clamp((scrollY - (trackTop - winH * 0.98)) / Math.max(1, winH * 0.28), 0, 1);
        const ee = easeOutCubic(enterP);
        const exitP = prefersReducedMotion ? 0 : easeInOutCubic(clamp((targetP - 0.88) / 0.12, 0, 1));

        targetPanelS = prefersReducedMotion ? 1 : lerp(lerp(0.88, 1, ee), 0.94, exitP);
        targetPanelY = prefersReducedMotion ? 0 : lerp(lerp(42, 0, ee), -22, exitP);
        targetPanelOp = prefersReducedMotion ? 1 : lerp(lerp(0.22, 1, ee), 0.28, exitP);
      }

      if (prefersReducedMotion) {
        curP = targetP;
        panelS = targetPanelS;
        panelY = targetPanelY;
        panelOp = targetPanelOp;
      } else {
        curP = curP < 0 ? targetP : lerp(curP, targetP, smoothK(0.24));
        panelS = lerp(panelS, targetPanelS, smoothK(0.28));
        panelY = lerp(panelY, targetPanelY, smoothK(0.28));
        panelOp = lerp(panelOp, targetPanelOp, smoothK(0.28));
      }

      const progMoving = Math.abs(targetP - curP) > 0.0006;
      const panelMoving =
        Math.abs(panelS - targetPanelS) > 0.0005 ||
        Math.abs(panelY - targetPanelY) > 0.08 ||
        Math.abs(panelOp - targetPanelOp) > 0.002;
      if (!progMoving) curP = targetP;
      if (!panelMoving) {
        panelS = targetPanelS;
        panelY = targetPanelY;
        panelOp = targetPanelOp;
      }

      renderProgress(curP);

      if (panel) {
        const key = `${panelS.toFixed(4)}|${panelY.toFixed(1)}|${panelOp.toFixed(3)}`;
        if (key !== appliedPanelKey) {
          appliedPanelKey = key;
          panel.style.transform = `translate3d(0, ${panelY.toFixed(1)}px, 0) scale3d(${panelS.toFixed(4)}, ${panelS.toFixed(4)}, 1)`;
          panel.style.opacity = panelOp.toFixed(3);
        }
      }

      return progMoving || panelMoving;
    };

    applyStep(0);
    renderProgress(0);
    return { measure, update };
  };

  // =========================================================================
  // 4. ACT 4 & 5 : HALO INGRÉDIENTS, TRACÉ SVG FOND & DUEL PICTOGRAMMES
  // =========================================================================
  const initIngredientsAndDuel = () => {
    const ingCards = Array.from(document.querySelectorAll('.p-ing-card'));
    const drawPaths = Array.from(document.querySelectorAll('[data-draw-path]')).map((el) => ({
      el,
      len: 1,
      top: 0,
      lastProg: -1
    }));

    ingCards.forEach((card) => {
      card.addEventListener('pointermove', (e) => {
        const r = card.getBoundingClientRect();
        card.style.setProperty('--mx', `${(e.clientX - r.left).toFixed(0)}px`);
        card.style.setProperty('--my', `${(e.clientY - r.top).toFixed(0)}px`);
      });
    });

    const measure = () => {
      drawPaths.forEach((item) => {
        item.len = Math.max(1, item.el.getTotalLength());
        item.el.style.strokeDasharray = `${item.len}`;
        const card = item.el.closest('.p-ing-card') || item.el;
        item.top = card.getBoundingClientRect().top + window.scrollY;
        item.lastProg = -1;
      });
    };

    const update = (scrollY) => {
      const winH = window.innerHeight || 900;

      drawPaths.forEach((item) => {
        const startY = winH * 0.98;
        const progress = prefersReducedMotion
          ? 1
          : clamp((scrollY + startY - item.top) / (winH * 0.28), 0, 1);
        if (Math.abs(progress - item.lastProg) > 0.005) {
          item.lastProg = progress;
          item.el.style.strokeDashoffset = `${(item.len * (1 - progress)).toFixed(1)}`;
        }
      });
    };

    return { measure, update };
  };

  // =========================================================================
  // 5. ACT 6 : GALERIE VUES RÉELLES CALIBRÉES (IMG GPU) + GLIDER
  // =========================================================================
  const initGallery = () => {
    const btns = Array.from(document.querySelectorAll('.p-angle-btn'));
    const glider = document.getElementById('pGalleryGlider');
    const frame = document.getElementById('pGalleryFrame');
    const camera = document.getElementById('pGalleryCamera');
    const imgEl = document.getElementById('pGalleryImg');
    const captionEl = document.getElementById('pAngleCaption');
    if (!btns.length || !camera) return null;

    const views = {
      face: { transform: buildPhotoTransform(416, 384, 1.0), key: 'product.view.face.sub' },
      dessus: { transform: buildPhotoTransform(545, 298, 1.32), key: 'product.view.dessus.sub' },
      coupe: { transform: buildPhotoTransform(335, 468, 1.34), key: 'product.view.coupe.sub' },
      profil: { transform: buildPhotoTransform(470, 460, 1.24), key: 'product.view.profil.sub' }
    };

    let currentView = 'face';

    const syncGlider = () => {
      const activeBtn = btns.find((b) => b.classList.contains('is-active')) || btns[0];
      if (glider && activeBtn) {
        glider.style.width = `${activeBtn.offsetWidth}px`;
        glider.style.transform = `translate3d(${activeBtn.offsetLeft - 5}px, 0, 0)`;
      }
    };

    btns.forEach((btn) => {
      btn.addEventListener('click', () => {
        btns.forEach((b) => b.classList.remove('is-active'));
        btn.classList.add('is-active');
        syncGlider();

        currentView = btn.getAttribute('data-view') || 'face';
        const cfg = views[currentView] || views.face;

        const customSrc = btn.getAttribute('data-img-src');
        if (customSrc && imgEl && imgEl.getAttribute('src') !== customSrc) {
          imgEl.setAttribute('src', customSrc);
        }

        if (!prefersReducedMotion) {
          camera.style.transform = cfg.transform;
        }

        if (captionEl && window.CorfoviaI18n) {
          captionEl.setAttribute('data-i18n', cfg.key);
          captionEl.textContent = window.CorfoviaI18n.t(cfg.key);
        }
      });
    });

    if (frame && !prefersReducedMotion) {
      frame.addEventListener('pointermove', (e) => {
        const r = frame.getBoundingClientRect();
        const nx = (e.clientX - r.left) / r.width;
        const ny = (e.clientY - r.top) / r.height;
        const fx = 156 + nx * 520;
        const fy = 180 + ny * 408;
        camera.style.transform = buildPhotoTransform(fx, fy, 1.28);
      });
      frame.addEventListener('pointerleave', () => {
        const cfg = views[currentView] || views.face;
        camera.style.transform = cfg.transform;
      });
    }

    syncGlider();
    return { measure: syncGlider };
  };

  // =========================================================================
  // BOOTSTRAP + ORDONNANCEUR IDLE-SLEEP 120 FPS
  // =========================================================================
  const init = () => {
    const heroBleed = initHeroBleed();
    const split = initSplitCurtain();
    const story = initStickyAnatomy();
    const ingDuel = initIngredientsAndDuel();
    const gallery = initGallery();

    let rafId = null;
    let lastScrollY = -1;

    const tick = () => {
      rafId = null;
      const scrollY = window.scrollY || document.documentElement.scrollTop || 0;
      const scrolled = scrollY !== lastScrollY;
      lastScrollY = scrollY;

      let keepAlive = false;
      if (heroBleed && heroBleed.update(scrollY, !scrolled)) keepAlive = true;
      if (split && split.update(scrollY, !scrolled)) keepAlive = true;
      if (story && story.update(scrollY, !scrolled)) keepAlive = true;
      if (scrolled && ingDuel) ingDuel.update(scrollY);

      if (keepAlive) {
        rafId = requestAnimationFrame(tick);
      }
    };

    wakeRaf = () => {
      if (!rafId) {
        rafId = requestAnimationFrame(tick);
      }
    };

    const measureAll = () => {
      if (heroBleed) heroBleed.measure();
      if (split) split.measure();
      if (story) story.measure();
      if (ingDuel) ingDuel.measure();
      if (gallery) gallery.measure();
      lastScrollY = -1;
      tick();
    };

    let lastWinW = window.innerWidth;
    let resizeTimer = null;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        if (window.innerWidth !== lastWinW) {
          lastWinW = window.innerWidth;
        }
        measureAll();
      }, 60);
    };

    window.addEventListener('scroll', wakeRaf, { passive: true });

    // Safari : `position: sticky` est déplacé par le thread compositeur alors que le JS (transforms) est mis à jour
    // une frame plus tard → tremblements. On épingle donc les blocs en `position: fixed` (immobiles à l'écran).
    if (isSafari) {
      const pins = Array.from(document.querySelectorAll('.p-hero-track, .p-split-track, .p-story-track'))
        .map((track) => ({
          track,
          el: Array.from(track.children).find((c) => /-sticky\b/.test(c.className)),
          mode: ''
        }))
        .filter((p) => p.el);

      const applyPin = (pin, mode) => {
        if (pin.mode === mode) return;
        pin.mode = mode;
        const s = pin.el.style;
        s.left = '0';
        s.width = '100%';
        if (mode === 'fixed') {
          s.position = 'fixed';
          s.top = '0';
          s.bottom = 'auto';
        } else if (mode === 'after') {
          s.position = 'absolute';
          s.top = 'auto';
          s.bottom = '0';
        } else {
          s.position = 'absolute';
          s.top = '0';
          s.bottom = 'auto';
        }
      };

      const updatePins = () => {
        const vh = window.innerHeight;
        pins.forEach((pin) => {
          const r = pin.track.getBoundingClientRect();
          applyPin(pin, r.top > 0 ? 'before' : (r.bottom < vh ? 'after' : 'fixed'));
        });
      };

      updatePins();
      window.addEventListener('scroll', updatePins, { passive: true });
      window.addEventListener('resize', updatePins, { passive: true });
    }
    window.addEventListener('resize', onResize, { passive: true });
    window.addEventListener('corfoviaLanguageChange', measureAll);

    if (document.fonts && document.fonts.ready) {
      document.fonts.ready.then(measureAll);
    }

    measureAll();
  };

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
