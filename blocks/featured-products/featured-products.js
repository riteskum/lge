import { createOptimizedPicture } from '../../scripts/aem.js';

const cartIconSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
  <circle cx="9" cy="21" r="1"/>
  <circle cx="20" cy="21" r="1"/>
  <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"/>
</svg>`;

const buildCartButton = (link) => {
  const btn = document.createElement('a');
  btn.className = 'featured-product-cart-btn';
  btn.href = link?.href || '#';
  btn.title = link?.textContent || 'Add to cart';
  btn.innerHTML = cartIconSvg;
  return btn;
};

export default function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;

  /* first row is the header */
  const headerRow = rows.shift();
  const header = document.createElement('div');
  header.className = 'featured-products-header';
  while (headerRow.firstElementChild) header.append(headerRow.firstElementChild);
  headerRow.remove();

  /* remaining rows are product cards */
  const grid = document.createElement('div');
  grid.className = 'featured-products-grid';

  rows.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'featured-product-card';

    const cells = [...row.children];
    const imageCell = cells[0];
    const contentCell = cells[1];

    /* image */
    if (imageCell) {
      imageCell.className = 'featured-product-card-image';
      card.append(imageCell);
    }

    /* content */
    if (contentCell) {
      contentCell.className = 'featured-product-card-body';

      const paragraphs = [...contentCell.querySelectorAll('p')];
      if (paragraphs.length) {
        paragraphs[0].className = 'featured-product-category';
      }

      const link = contentCell.querySelector('a');
      const cartBtn = buildCartButton(link);
      link?.closest('p')?.remove();

      contentCell.append(cartBtn);
      card.append(contentCell);
    }

    grid.append(card);
    row.remove();
  });

  /* optimize images */
  grid.querySelectorAll('picture > img').forEach((img) => {
    const pic = img.closest('picture');
    pic.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });

  block.replaceChildren(header, grid);
}
