const scrollToTopBtn = document.getElementById('scrollToTop');

// Показать или скрыть кнопку при прокрутке
window.addEventListener('scroll', () => {
    if (window.scrollY > 200) {
        scrollToTopBtn.classList.add('show'); // Показываем кнопку
    } else {
        scrollToTopBtn.classList.remove('show'); // Скрываем кнопку
    }
});

// Прокрутка вверх при нажатии на кнопку
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth' // Плавная прокрутка
    });
});
