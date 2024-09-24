document.addEventListener("DOMContentLoaded", function() {
    fetch('../api/get_products.php') // Заміни на свій шлях до PHP файлу
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('TableBody');
            tableBody.innerHTML = ''; // Очищуємо таблицю перед додаванням нових даних

            data.forEach(product => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td><img src="${product.image}" alt="${product.name}" style="width: 300px; height: auto;"></td>
                    <td>${product.name}</td>
                    <td>${product.producer}</td> <!-- Відображаємо виробника -->
                    <td>${product.category}</td> <!-- Відображаємо категорію -->
                    <td>${product.description}</td> <!-- Додаємо опис -->
                    <td>${product.price} грн</td>
                    <td>${product.animal || 'Не вказано'}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert("Не вдалося завантажити товари через помилку з'єднання.");
        });
});
