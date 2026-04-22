export default function decorate(block) {
  const slides = [...block.children];
  const totalSlides = slides.length;

  // Wrap each slide
  slides.forEach((slide, index) => {
    slide.classList.add('hero-carousel-slide');
    if (index === 0) slide.classList.add('active');

    // Structure: first cell = image, second cell = content
    const cells = [...slide.children];
    if (cells[0]) cells[0].classList.add('hero-carousel-image');
    if (cells[1]) cells[1].classList.add('hero-carousel-content');
  });

  // Create carousel indicators
  if (totalSlides > 1) {
    let current = 0;
    const indicators = document.createElement('div');
    indicators.classList.add('hero-carousel-indicators');

    const goToSlide = (n) => {
      slides[current].classList.remove('active');
      indicators.children[current].classList.remove('active');
      current = n;
      slides[current].classList.add('active');
      indicators.children[current].classList.add('active');
    };

    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.classList.add('hero-carousel-indicator');
      if (index === 0) dot.classList.add('active');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      dot.addEventListener('click', () => goToSlide(index));
      indicators.append(dot);
    });
    block.append(indicators);

    setInterval(() => {
      goToSlide((current + 1) % totalSlides);
    }, 5000);
  }
}
