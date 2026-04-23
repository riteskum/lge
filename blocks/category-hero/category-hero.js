/**
 * loads and decorates the category-hero block
 * @param {Element} block The category-hero block element
 */
export default function decorate(block) {
  const [imageCell, contentCell] = block.children[0].children;

  if (imageCell) {
    imageCell.classList.add('category-hero-image');
  }

  if (contentCell) {
    contentCell.classList.add('category-hero-content');
  }
}
