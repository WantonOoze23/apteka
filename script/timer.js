
let timeoutMinutes = 60; // Час в хвилинах до закінчення сесії
let checkInterval = 60000; // Перевіряємо сесію кожну хвилину (60000 мс)
let sessionTimeout = timeoutMinutes * 60000; // Переводимо в мілісекунди

// Перевіряємо, чи сесія ще активна
function checkSession() {
    fetch('api/check_session.php')
        .then(response => response.json())
        .then(data => {
            if (!data.loggedin || data.timeout) {
                alert('Сесія закінчилася, будь ласка, увійдіть знову.');
                window.location.href = 'login.html'; // Перенаправляємо на сторінку логіну
            }
        })
        .catch(error => console.error('Помилка перевірки сесії:', error));
}

// Періодично перевіряємо активність сесії
setInterval(checkSession, checkInterval);

// Відстеження дій користувача для оновлення часу активності
function resetSessionTimer() {
    clearTimeout(sessionTimeoutHandle);
    sessionTimeoutHandle = setTimeout(() => {
        alert('Сесія завершилась через неактивність.');
        window.location.href = 'login.html';
    }, sessionTimeout);
}

let sessionTimeoutHandle = setTimeout(() => {
    alert('Сесія завершилась через неактивність.');
    window.location.href = 'login.html';
}, sessionTimeout);

// Відстежуємо будь-які дії користувача
document.addEventListener('mousemove', resetSessionTimer);
document.addEventListener('keypress', resetSessionTimer);
document.addEventListener('click', resetSessionTimer);
document.addEventListener('scroll', resetSessionTimer);
document.addEventListener('keydown', resetSessionTimer);
document.addEventListener('focus', resetSessionTimer); // Якщо користувач повернувся до сторінки

