// ---------------------------------------------------------------------------
// Geminol Lubes Corporation — shared front-end behaviour
// ---------------------------------------------------------------------------

document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.querySelector('.nav-menu');

  // Mobile nav: open/close, close on link click, outside click, and Escape
  if (toggle && menu) {
    const closeMenu = () => {
      menu.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    };
    const openMenu = () => {
      menu.classList.add('is-open');
      toggle.setAttribute('aria-expanded', 'true');
    };

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      menu.classList.contains('is-open') ? closeMenu() : openMenu();
    });

    menu.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));

    document.addEventListener('click', (e) => {
      if (menu.classList.contains('is-open') && !menu.contains(e.target) && e.target !== toggle) {
        closeMenu();
      }
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && menu.classList.contains('is-open')) {
        closeMenu();
        toggle.focus();
      }
    });
  }

  // Sticky header gains a hairline shadow once the page scrolls
  if (header) {
    const setScrolled = () => header.classList.toggle('is-scrolled', window.scrollY > 4);
    setScrolled();
    window.addEventListener('scroll', setScrolled, { passive: true });
  }

  // Hero viscosity chart: hovering/focusing a legend item highlights its curve
  const legendItems = document.querySelectorAll('.legend-item');
  if (legendItems.length) {
    const curves = Array.from(legendItems).map(item => document.getElementById(item.dataset.curve));
    const highlight = (activeId) => {
      legendItems.forEach(item => item.classList.toggle('is-dimmed', activeId && item.dataset.curve !== activeId));
      curves.forEach(curve => {
        if (!curve) return;
        const isActive = !activeId || curve.id === activeId;
        curve.style.opacity = isActive ? '1' : '0.25';
        curve.style.strokeWidth = (activeId && curve.id === activeId) ? '3.5' : curve.getAttribute('stroke-width');
      });
    };
    legendItems.forEach(item => {
      item.addEventListener('mouseenter', () => highlight(item.dataset.curve));
      item.addEventListener('focus', () => highlight(item.dataset.curve));
      item.addEventListener('mouseleave', () => highlight(null));
      item.addEventListener('blur', () => highlight(null));
    });
  }
});

// ---------------------------------------------------------------------------
// Catalog data — the 71 formulations, tagged by segment for filtering.
// Segment labels are inferred from product naming conventions for
// navigation purposes only.
// ---------------------------------------------------------------------------
const GEMINOL_CATALOG = [
  { name: 'ENGINE OIL ELB SAE 20W/40', category: 'Automotive', segment: 'Engine Oil' },
  { name: 'ENGINE OIL ELC SAE 20W/40', category: 'Automotive', segment: 'Engine Oil' },
  { name: 'ENGINE OIL CF4 SAE 15W/40', category: 'Automotive', segment: 'Engine Oil' },
  { name: 'ENGINE OIL 4T+ SAE 20W/40', category: 'Automotive', segment: 'Engine Oil' },
  { name: 'ENGINE OIL ELX SAE 10W/30', category: 'Automotive', segment: 'Engine Oil' },
  { name: 'ENGINE OIL ELB SAE 20W/50', category: 'Automotive', segment: 'Engine Oil' },
  { name: 'ENGINE OIL BLX SAE 15W/50', category: 'Automotive', segment: 'Engine Oil' },
  { name: 'TT OIL', category: 'Automotive', segment: 'Transmission Oil' },
  { name: 'SYN TT', category: 'Automotive', segment: 'Transmission Oil' },
  { name: 'GEAREX SAE 90', category: 'Automotive', segment: 'Gear Oil' },
  { name: 'GEAREX SAE 140', category: 'Automotive', segment: 'Gear Oil' },
  { name: 'GEAREX SAE 80W/90', category: 'Automotive', segment: 'Gear Oil' },
  { name: 'GEAREX SAE 85W/140', category: 'Automotive', segment: 'Gear Oil' },
  { name: 'GEAREX SAE 80W', category: 'Automotive', segment: 'Gear Oil' },
  { name: 'GEAREX TQ', category: 'Automotive', segment: 'Gear Oil' },
  { name: 'FRONT FORK OIL 24', category: 'Automotive', segment: 'Fork Oil' },

  { name: 'MACHINETEK 32', category: 'Industrial', segment: 'Machine Oil' },
  { name: 'MACHINETEK 46', category: 'Industrial', segment: 'Machine Oil' },
  { name: 'MACHINETEK 68', category: 'Industrial', segment: 'Machine Oil' },
  { name: 'MACHINETEK 100', category: 'Industrial', segment: 'Machine Oil' },
  { name: 'MACHINETEK 150', category: 'Industrial', segment: 'Machine Oil' },
  { name: 'MACHINETEK 220', category: 'Industrial', segment: 'Machine Oil' },
  { name: 'MACHINETEK 320', category: 'Industrial', segment: 'Machine Oil' },
  { name: 'MACHINETEK 460', category: 'Industrial', segment: 'Machine Oil' },
  { name: 'MACHINETEK 680', category: 'Industrial', segment: 'Machine Oil' },
  { name: 'HYDROTEK 32', category: 'Industrial', segment: 'Hydraulic Oil' },
  { name: 'HYDROTEK 68', category: 'Industrial', segment: 'Hydraulic Oil' },
  { name: 'HYDROTEK 100', category: 'Industrial', segment: 'Hydraulic Oil' },
  { name: 'HYDROTEK 150', category: 'Industrial', segment: 'Hydraulic Oil' },
  { name: 'HYDROTEK 220', category: 'Industrial', segment: 'Hydraulic Oil' },
  { name: 'HYDROTEK 320', category: 'Industrial', segment: 'Hydraulic Oil' },
  { name: 'HYDROTEK 460', category: 'Industrial', segment: 'Hydraulic Oil' },
  { name: 'HYDROTEK AW 32', category: 'Industrial', segment: 'Hydraulic Oil (AW)' },
  { name: 'HYDROTEK AW 46', category: 'Industrial', segment: 'Hydraulic Oil (AW)' },
  { name: 'HYDROTEK AW 68', category: 'Industrial', segment: 'Hydraulic Oil (AW)' },
  { name: 'HYDROTEK AW 100', category: 'Industrial', segment: 'Hydraulic Oil (AW)' },
  { name: 'HYDROTEK AW 150', category: 'Industrial', segment: 'Hydraulic Oil (AW)' },
  { name: 'HYDROTEK AW 220', category: 'Industrial', segment: 'Hydraulic Oil (AW)' },
  { name: 'HYDROTEK AW 320', category: 'Industrial', segment: 'Hydraulic Oil (AW)' },
  { name: 'HYDROTEK AW 460', category: 'Industrial', segment: 'Hydraulic Oil (AW)' },
  { name: 'GEARTEC 68', category: 'Industrial', segment: 'Gear Oil' },
  { name: 'GEARTEC 100', category: 'Industrial', segment: 'Gear Oil' },
  { name: 'GEARTEC 150', category: 'Industrial', segment: 'Gear Oil' },
  { name: 'GEARTEC 220', category: 'Industrial', segment: 'Gear Oil' },
  { name: 'GEARTEC 320', category: 'Industrial', segment: 'Gear Oil' },
  { name: 'GEARTEC 460', category: 'Industrial', segment: 'Gear Oil' },
  { name: 'GEARTEC 680', category: 'Industrial', segment: 'Gear Oil' },
  { name: 'SPINFAST 12', category: 'Industrial', segment: 'Spindle Oil' },
  { name: 'SPINFAST 22', category: 'Industrial', segment: 'Spindle Oil' },
  { name: 'SPINFAST EE 10', category: 'Industrial', segment: 'Spindle Oil' },
  { name: 'THERMTRAK 32', category: 'Industrial', segment: 'Heat Transfer Oil' },
  { name: 'THERMTRAK 100', category: 'Industrial', segment: 'Heat Transfer Oil' },
  { name: 'FREEZEX 22', category: 'Industrial', segment: 'Refrigeration Oil' },
  { name: 'FREEZEX 68', category: 'Industrial', segment: 'Refrigeration Oil' },
  { name: 'COMPRESSTEC 100', category: 'Industrial', segment: 'Compressor Oil' },
  { name: 'COMPRESSTEC 150', category: 'Industrial', segment: 'Compressor Oil' },
  { name: 'COMPRESSTEC 220', category: 'Industrial', segment: 'Compressor Oil' },
  { name: 'COMPRESSTEC 320', category: 'Industrial', segment: 'Compressor Oil' },
  { name: 'COMPRESSTEC 460', category: 'Industrial', segment: 'Compressor Oil' },
  { name: 'RUBBER PROCESSING OIL – RUBEX A', category: 'Industrial', segment: 'Rubber Process Oil' },
  { name: 'RUBBER PROCESSING OIL – RUBEX N', category: 'Industrial', segment: 'Rubber Process Oil' },
  { name: 'RUBBER PROCESSING OIL – RUBEX P', category: 'Industrial', segment: 'Rubber Process Oil' },
  { name: 'LUMEX OIL', category: 'Industrial', segment: 'General Purpose Oil' },
  { name: 'ST CUT 32X', category: 'Industrial', segment: 'Cutting Oil' },
  { name: 'ST CUT 46X', category: 'Industrial', segment: 'Cutting Oil' },
  { name: 'EMULCUT 40', category: 'Industrial', segment: 'Soluble Cutting Oil' },
  { name: 'EMULCUT 40 SS', category: 'Industrial', segment: 'Soluble Cutting Oil' },
  { name: 'TRANSFORMER OIL', category: 'Industrial', segment: 'Transformer Oil' },
  { name: 'AP3 GREASE (Ca) — 180 kg', category: 'Industrial', segment: 'Grease' },
  { name: 'MP GREASE (Li) — 180 kg', category: 'Industrial', segment: 'Grease' },
  { name: 'TOOLWAY M 68/220', category: 'Industrial', segment: 'Way Oil' },
];