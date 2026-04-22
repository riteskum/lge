export default function decorate(block) {
  const rows = [...block.children];
  const headerRow = rows.shift();

  // Build header
  const header = document.createElement('div');
  header.className = 'promo-cards-header';

  const headerContent = headerRow.firstElementChild;
  const headerTitle = headerContent.querySelector('h2');
  const headerSubtitle = headerContent.querySelector('p:not(.button-container)');
  const headerLink = headerContent.querySelector('a');

  const headerLeft = document.createElement('div');
  headerLeft.className = 'promo-cards-header-left';
  if (headerTitle) headerLeft.append(headerTitle);
  if (headerSubtitle) headerLeft.append(headerSubtitle);

  const headerRight = document.createElement('div');
  headerRight.className = 'promo-cards-header-right';
  if (headerLink) {
    headerLink.className = 'promo-cards-header-link';
    headerRight.append(headerLink);
  }

  header.append(headerLeft, headerRight);

  // Build grid
  const grid = document.createElement('div');
  grid.className = 'promo-cards-grid';

  rows.forEach((row, index) => {
    const card = document.createElement('div');
    card.className = index === 0 ? 'promo-card promo-card-large' : 'promo-card promo-card-small';

    const cells = [...row.children];
    const imageCell = cells[0];
    const contentCell = cells[1];

    const imageWrapper = document.createElement('div');
    imageWrapper.className = 'promo-card-image';
    const picture = imageCell.querySelector('picture');
    if (picture) imageWrapper.append(picture);

    const content = document.createElement('div');
    content.className = 'promo-card-content';
    if (contentCell) {
      [...contentCell.children].forEach((child) => {
        content.append(child);
      });
      const link = content.querySelector('a');
      if (link) {
        link.classList.add('promo-card-link');
        const arrow = document.createElement('span');
        arrow.className = 'promo-card-arrow';
        arrow.textContent = ' \u2192';
        link.append(arrow);
      }
    }

    card.append(imageWrapper, content);
    grid.append(card);
  });

  block.replaceChildren(header, grid);
}
