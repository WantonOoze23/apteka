document.getElementById('deleteCarForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Запобігаємо стандартному надсиланню форми

    const formData = new FormData(this);

    fetch('../api/remove.php', { 
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            alert(data.message || "Товар успішно видалено.");
            window.location.reload(); // Перезавантажуємо сторінку, щоб оновити список товарів
        } else {
            alert('Сталася помилка: ' + (data.error || 'Невідомий помилковий стан'));
        }
    })
    .catch(error => {
        console.error('Помилка:', error);
        alert("Не вдалося видалити товар через помилку з'єднання.");
    });
});
