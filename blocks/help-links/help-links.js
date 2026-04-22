export default function decorate(block) {
  const rows = [...block.children];
  const headerRow = rows.shift();

  // Build header
  const header = document.createElement('div');
  header.className = 'help-links-header';
  while (headerRow.firstElementChild) header.append(headerRow.firstElementChild);
  block.replaceChildren(header);

  // Build grid
  const grid = document.createElement('div');
  grid.className = 'help-links-grid';

  rows.forEach((row) => {
    const card = document.createElement('div');
    card.className = 'help-link-card';

    const cells = [...row.children];
    const iconCell = cells[0];
    const textCell = cells[1];

    if (iconCell) {
      const iconWrap = document.createElement('div');
      iconWrap.className = 'help-link-card-icon';
      while (iconCell.firstElementChild) iconWrap.append(iconCell.firstElementChild);
      card.append(iconWrap);
    }

    if (textCell) {
      const textWrap = document.createElement('div');
      textWrap.className = 'help-link-card-text';
      while (textCell.firstElementChild) textWrap.append(textCell.firstElementChild);
      card.append(textWrap);
    }

    grid.append(card);
  });

  block.append(grid);
}
