const menuToggle = document.getElementById('menuToggle');
const navMenu = document.getElementById('navMenu');

// Функция для скрытия меню
function hideMenu() {
    navMenu.classList.remove('active'); // Убирает класс 'active'
}

// Обработчик нажатия на кнопку меню
menuToggle.addEventListener('click', function(event) {
    event.stopPropagation(); // Останавливает событие, чтобы клик не сработал на документе
    navMenu.classList.toggle('active'); // Переключает класс 'active'
});

// Обработчик нажатия на ссылки меню
const navLinks = navMenu.querySelectorAll('a'); // Получаем все ссылки в меню
navLinks.forEach(link => {
    link.addEventListener('click', hideMenu); // Скрывает меню при нажатии на любую ссылку
});

// Обработчик прокрутки страницы
window.addEventListener('scroll', hideMenu); // Скрывает меню при прокрутке

// Обработчик нажатия на документ
document.addEventListener('click', hideMenu); // Скрывает меню при нажатии в любое место документа
