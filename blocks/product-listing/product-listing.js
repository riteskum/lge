import { createOptimizedPicture } from '../../scripts/aem.js';

/**
 * Builds the header section from the first row.
 * @param {Element} row The first row element
 * @returns {Element} The header element
 */
function buildHeader(row) {
  const header = document.createElement('div');
  header.className = 'product-listing-header';

  const titleArea = document.createElement('div');
  titleArea.className = 'product-listing-title-area';

  const filterArea = document.createElement('div');
  filterArea.className = 'product-listing-filter-area';

  [...row.children].forEach((cell, i) => {
    if (i === 0) {
      titleArea.append(...cell.childNodes);
    } else {
      filterArea.append(...cell.childNodes);
    }
  });

  header.append(titleArea, filterArea);
  return header;
}

/**
 * Builds a product card from a row.
 * @param {Element} row The row element containing image and content cells
 * @returns {Element} The card element
 */
function buildCard(row) {
  const card = document.createElement('div');
  card.className = 'product-listing-card';

  const cells = [...row.children];
  const imageCell = cells[0];
  const contentCell = cells[1];

  // Image area
  const imageArea = document.createElement('div');
  imageArea.className = 'product-listing-card-image';
  if (imageCell) {
    imageArea.append(...imageCell.childNodes);
  }

  // Body area
  const body = document.createElement('div');
  body.className = 'product-listing-card-body';

  if (contentCell) {
    const children = [...contentCell.children];
    children.forEach((el) => {
      if (el.tagName === 'P' && !el.querySelector('strong') && !el.querySelector('del')) {
        // Check if it's the first p (category tag) or a description
        const isCategory = el === children[0] && el.tagName === 'P';
        if (isCategory) {
          el.className = 'product-listing-card-category';
        } else {
          el.className = 'product-listing-card-description';
        }
      }
    });

    // Build price area from strong and del elements
    const priceContainer = document.createElement('div');
    priceContainer.className = 'product-listing-card-price';
    const strongEl = contentCell.querySelector('p strong');
    const delEl = contentCell.querySelector('p del');

    body.append(...contentCell.childNodes);

    if (strongEl || delEl) {
      if (strongEl) {
        const priceSpan = document.createElement('span');
        priceSpan.className = 'product-listing-price-current';
        priceSpan.textContent = strongEl.textContent;
        priceContainer.append(priceSpan);
        strongEl.closest('p').remove();
      }
      if (delEl) {
        const oldSpan = document.createElement('span');
        oldSpan.className = 'product-listing-price-old';
        oldSpan.textContent = delEl.textContent;
        priceContainer.append(oldSpan);
        delEl.closest('p').remove();
      }
      body.append(priceContainer);
    }
  }

  // Wrap card in link if an anchor exists
  const link = imageArea.querySelector('a') || body.querySelector('a');
  if (link) {
    const wrapper = document.createElement('a');
    wrapper.className = 'product-listing-card-link';
    wrapper.href = link.href;
    wrapper.title = link.title || '';
    wrapper.append(imageArea, body);
    card.append(wrapper);
  } else {
    card.append(imageArea, body);
  }

  return card;
}

/**
 * Loads and decorates the product-listing block.
 * @param {Element} block The block element
 */
export default function decorate(block) {
  const rows = [...block.children];
  if (rows.length === 0) return;

  // First row is the header
  const headerRow = rows.shift();
  const header = buildHeader(headerRow);

  // Remaining rows are product cards
  const grid = document.createElement('div');
  grid.className = 'product-listing-grid';

  rows.forEach((row) => {
    const card = buildCard(row);
    grid.append(card);
  });

  // Optimize images
  grid.querySelectorAll('picture > img').forEach((img) => {
    const pic = img.closest('picture');
    pic.replaceWith(createOptimizedPicture(img.src, img.alt, false, [{ width: '750' }]));
  });

  // Update result count if present
  const resultCount = header.querySelector('.product-listing-title-area p:last-child');
  if (resultCount && !resultCount.classList.contains('product-listing-card-category')) {
    resultCount.className = 'product-listing-result-count';
  }

  block.replaceChildren(header, grid);
}
