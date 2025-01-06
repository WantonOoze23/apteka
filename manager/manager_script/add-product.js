document.getElementById('addProduct').addEventListener('submit', function(event) {
    event.preventDefault();
    const formData = new FormData(this);

    fetch('/api/add_product.php', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            this.reset(); // Reset the form fields
            window.location.reload();
        } else {
            alert('Сталася помилка: ' + (data.error || 'Невідомий помилковий стан'));
        }
    })
    .catch(error => {
        console.error('Помилка:', error);
        alert("Не вдалося додати товар через помилку з'єднання.");
    });
});
