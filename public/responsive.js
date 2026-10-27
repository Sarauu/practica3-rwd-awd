/**
 * RWD Client-side Interactions
 * - Fluid mobile filter drawer / accordion toggle without page reload.
 * - Dynamic category filtering on client side.
 * - Viewport indicator badge for real-time demonstration.
 */
document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('toggleFiltersBtn');
  const sidebar = document.getElementById('filtersSidebar');
  const closeBtn = document.getElementById('closeFiltersBtn');
  const overlay = document.getElementById('drawerOverlay');

  function openSidebar() {
    if (sidebar) sidebar.classList.add('is-open');
    if (overlay) overlay.classList.add('is-visible');
    document.body.style.overflow = window.innerWidth < 1024 ? 'hidden' : '';
  }

  function closeSidebar() {
    if (sidebar) sidebar.classList.remove('is-open');
    if (overlay) overlay.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      if (sidebar && sidebar.classList.contains('is-open')) {
        closeSidebar();
      } else {
        openSidebar();
      }
    });
  }

  if (closeBtn) {
    closeBtn.addEventListener('click', closeSidebar);
  }

  if (overlay) {
    overlay.addEventListener('click', closeSidebar);
  }

  // Category Filtering
  const filterInputs = document.querySelectorAll('input[name="categoryFilter"]');
  const productCards = document.querySelectorAll('.product-card');
  const productCountDisplay = document.getElementById('visibleCount');

  filterInputs.forEach((input) => {
    input.addEventListener('change', () => {
      const selected = Array.from(filterInputs)
        .filter((i) => i.checked)
        .map((i) => i.value);

      let visible = 0;
      productCards.forEach((card) => {
        const cat = card.getAttribute('data-category');
        if (selected.includes('all') || selected.includes(cat)) {
          card.style.display = '';
          visible++;
        } else {
          card.style.display = 'none';
        }
      });

      if (productCountDisplay) {
        productCountDisplay.textContent = visible;
      }
    });
  });

  // Real-time viewport debugger badge in the corner for auditing
  const viewportTag = document.getElementById('viewportLiveTag');
  function updateViewportTag() {
    if (!viewportTag) return;
    const w = window.innerWidth;
    let mode = 'Desktop (> 1024px)';
    if (w < 640) mode = 'Móvil (< 640px)';
    else if (w <= 1024) mode = 'Tablet (640px - 1024px)';
    viewportTag.textContent = `${w}px — ${mode}`;
  }

  window.addEventListener('resize', updateViewportTag);
  updateViewportTag();
});
