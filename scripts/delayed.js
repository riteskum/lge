// load editor support
if (window.location.hostname === 'localhost'
  || document.querySelector('[data-aue-resource]')) {
  // eslint-disable-next-line import/no-cycle
  import('./editor-support.js');
}

// add delayed functionality here
