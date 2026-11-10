const menuToggle = document.querySelector('.menu-toggle');
const topbar = document.querySelector('.topbar');

menuToggle.addEventListener('click', () => {
  const expanded = topbar.classList.toggle('open');
  menuToggle.setAttribute('aria-expanded', String(expanded));
});

document.querySelectorAll('.topbar nav a').forEach((link) => {
  link.addEventListener('click', () => {
    topbar.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
  });
});

// Organize the menu into the requested main categories.
const originalMenuGrid = document.querySelector('.menu-grid');
if (originalMenuGrid) {
  const categories = [
    { id: 'napoli', title: 'النابولي', cards: ['.musakhan-card', '.fitateen-card', '.sparilla-card', '.napoli-card'] },
    { id: 'sweets', title: 'الحلى', cards: ['.basbousa-cheese-card', '.maamoul-card'] },
    { id: 'babka', title: 'البابكا', cards: ['.zaatar-babka-card', '.chocolate-babka-card'] },
    { id: 'tea', title: 'الشاي', cards: ['.tea-pot-set-card', '.tea-card', '.tea-steeping-card'] },
    { id: 'winter-drinks', title: 'مشروبات شتوية', cards: ['.karak-card', '.lemonas-card'] },
    { id: 'saudi-coffee', title: 'قهوة سعودية', cards: ['.saudi-coffee-card', '.dallah-hospitality-card'] },
    { id: 'iced', title: 'ايس', cards: ['.iced-tea-card', '.iced-hibiscus-card'] },
    { id: 'focaccia', title: 'الفوكاشيا', cards: ['.tuna-card', '.food-card'] },
    { id: 'nuts', title: 'مكسرات', cards: ['.smoked-nuts-card', '.japanese-nuts-card'] }
  ];
  const categoryList = document.createElement('div');
  categoryList.className = 'menu-categories';
  const categoryNav = document.createElement('nav');
  categoryNav.className = 'menu-category-nav';
  categoryNav.setAttribute('aria-label', 'أقسام القائمة');
  let menuItemIndex = 1;

  categories.forEach((category) => {
    const section = document.createElement('section');
    section.className = 'menu-category';
    section.id = `category-${category.id}`;
    const heading = document.createElement('h3');
    heading.className = 'menu-category-title';
    heading.textContent = category.title;
    const grid = document.createElement('div');
    grid.className = 'menu-grid category-grid';
    category.cards.forEach((selector) => {
      const card = originalMenuGrid.querySelector(selector);
      if (card) {
        grid.append(card);
        const number = card.querySelector('.item-number');
        if (number) number.textContent = `${String(menuItemIndex++).padStart(2, '0')} / ${category.title}`;
      }
    });
    section.append(heading, grid);
    categoryList.append(section);

    const link = document.createElement('a');
    link.href = `#${section.id}`;
    link.textContent = category.title;
    categoryNav.append(link);
  });

  const unassignedCards = [...originalMenuGrid.querySelectorAll('.menu-card')];
  if (unassignedCards.length) {
    const section = document.createElement('section');
    section.className = 'menu-category';
    section.id = 'category-other';
    const heading = document.createElement('h3');
    heading.className = 'menu-category-title';
    heading.textContent = 'أصناف أخرى';
    const grid = document.createElement('div');
    grid.className = 'menu-grid category-grid';
    unassignedCards.forEach((card) => grid.append(card));
    section.append(heading, grid);
    categoryList.append(section);
  }
  originalMenuGrid.replaceWith(categoryNav, categoryList);
}

const menuPrices = [
  ['.musakhan-card', [['السعر', '16 ر.س']]],
  ['.fitateen-card', [['السعر', '16 ر.س']]],
  ['.sparilla-card', [['السعر', '16 ر.س']]],
  ['.napoli-card', [['السعر', '79 ر.س']]],
  ['.basbousa-cheese-card', [['السعر', '18 ر.س']]],
  ['.tea-card', [['كوب ورق', '5 ر.س'], ['كوب زجاج', '7 ر.س']]],
  ['.tea-steeping-card', [['كوب ورق', '5 ر.س'], ['كوب زجاج', '7 ر.س']]],
  ['.tea-pot-set-card', [['السعر', '22 ر.س']]],
  ['.dallah-hospitality-card', [['السعر', '30 ر.س']]],
  ['.zaatar-babka-card', [['السعر', '10 ر.س']]],
  ['.chocolate-babka-card', [['السعر', '10 ر.س']]],
  ['.iced-tea-card', [['السعر', '10 ر.س']]],
  ['.iced-hibiscus-card', [['السعر', '10 ر.س']]],
  ['.karak-card', [['كوب ورق', '6 ر.س'], ['كوب زجاج', '8 ر.س']]],
  ['.lemonas-card', [['كوب ورق', '6 ر.س'], ['كوب زجاج', '8 ر.س']]],
  ['.smoked-nuts-card', [['السعر', '8 ر.س']]],
  ['.japanese-nuts-card', [['السعر', '6 ر.س']]],
  ['.maamoul-card', [['6 حبات', '9 ر.س'], ['بوكس 18 حبة', '25 ر.س']]],
  ['.saudi-coffee-card', [['السعر', '7 ر.س']]],
  ['.food-card', [['السعر', '16 ر.س']]],
  ['.tuna-card', [['السعر', '14 ر.س']]]
];

menuPrices.forEach(([selector, options]) => {
  const card = document.querySelector(selector);
  const details = card?.querySelector('.item-details > div');
  if (!details) return;
  const prices = document.createElement('div');
  prices.className = 'item-prices';
  options.forEach(([label, amount]) => {
    const option = document.createElement('span');
    option.className = 'price-option';
    const labelText = document.createElement('span');
    labelText.textContent = label;
    const value = document.createElement('b');
    value.textContent = amount;
    option.append(labelText, value);
    prices.append(option);
  });
  details.append(prices);
});

document.querySelectorAll('[data-product-viewer]').forEach((viewer) => {
  const image = viewer.querySelector('img');
  let startX = 0;
  let startAngle = 0;

  image.addEventListener('pointerdown', (event) => {
    if (event.button !== 0) return;
    startX = event.clientX;
    startAngle = Number(viewer.dataset.angle || 0);
    image.setPointerCapture(event.pointerId);
    viewer.classList.add('dragging');
  });

  image.addEventListener('pointermove', (event) => {
    if (!viewer.classList.contains('dragging')) return;
    const angle = startAngle + (event.clientX - startX) * 0.8;
    viewer.dataset.angle = String(angle);
    viewer.style.setProperty('--product-angle', `${angle}deg`);
  });

  const release = () => viewer.classList.remove('dragging');
  image.addEventListener('pointerup', release);
  image.addEventListener('pointercancel', release);

  viewer.querySelector('.spin-trigger').addEventListener('click', () => {
    if (viewer.classList.contains('spinning')) return;
    viewer.classList.add('spinning');
    image.addEventListener('animationend', () => viewer.classList.remove('spinning'), { once: true });
  });
});
