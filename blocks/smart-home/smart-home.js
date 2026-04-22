export default function decorate(block) {
  const row = block.firstElementChild;
  if (!row) return;

  const [imageCell, contentCell] = [...row.children];

  if (imageCell) {
    imageCell.classList.add('smart-home-image');
  }

  if (contentCell) {
    contentCell.classList.add('smart-home-content');

    /* Wrap each feature item (icon + text group) after the heading */
    const heading = contentCell.querySelector('h2');
    const features = [];

    let current = heading ? heading.nextElementSibling : null;
    while (current) {
      const next = current.nextElementSibling;
      const pic = current.querySelector('picture');
      if (pic) {
        /* Start a new feature group: icon paragraph + following text paragraphs */
        const feature = document.createElement('div');
        feature.classList.add('smart-home-feature');

        const iconWrap = document.createElement('div');
        iconWrap.classList.add('smart-home-feature-icon');
        iconWrap.append(pic);
        feature.append(iconWrap);

        const textWrap = document.createElement('div');
        textWrap.classList.add('smart-home-feature-text');

        /* Collect subsequent non-icon siblings as feature text */
        let sibling = next;
        while (sibling && !sibling.querySelector('picture')) {
          const nextSibling = sibling.nextElementSibling;
          textWrap.append(sibling);
          sibling = nextSibling;
        }
        feature.append(textWrap);
        features.push({ anchor: current, element: feature, nextStart: sibling });
      }
      current = features.length ? features[features.length - 1].nextStart : next;
    }

    /* Insert features container */
    if (features.length) {
      const container = document.createElement('div');
      container.classList.add('smart-home-features');
      features.forEach((f) => {
        f.anchor.remove();
        container.append(f.element);
      });
      contentCell.append(container);
    }
  }
}
