document.getElementById('filterAnimal').addEventListener('change', function() {
    const selectedAnimal = this.value;

    // Відправляємо запит до products.php з вибраним значенням фільтра
    fetch(`../api/get_products.php?animal=${selectedAnimal}`)
        .then(response => response.json())
        .then(data => {
            const tableBody = document.getElementById('TableBody');
            tableBody.innerHTML = ''; // Очищуємо таблицю перед додаванням нових даних

            data.forEach(product => {
                const row = document.createElement('tr');
                
                row.innerHTML = `
                    <td>${product.id}</td>
                    <td>${product.code}</td>
                    <td><img src="${product.image}" alt="${product.name}" style="width: 300px;"></td>
                    <td>${product.name}</td>
                    <td>${product.producer}</td>
                    <td>${product.category}</td>
                    <td>${product.description}</td>
                    <td>${product.price} грн</td>
                    <td>${product.animal || 'Не вказано'}</td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert("Не вдалося завантажити товари.");
        });
});