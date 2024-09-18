const sliderContent = document.getElementById('slider-content');
const prevBtn = document.getElementById('prev-btn');
const nextBtn = document.getElementById('next-btn');
let currentIndex = 0;

function showSlide(index) {
  currentIndex = index;
  const translateValue = -index * 100 + '%';
  sliderContent.style.transform = 'translateX(' + translateValue + ')';
}

function nextSlide() {
  currentIndex = (currentIndex + 1) % sliderContent.children.length;
  showSlide(currentIndex);
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + sliderContent.children.length) % sliderContent.children.length;
  showSlide(currentIndex);
}

nextBtn.addEventListener('click', nextSlide);
prevBtn.addEventListener('click', prevSlide);

// Автоматическое переключение слайдов каждые 3 секунды
setInterval(nextSlide, 3000);