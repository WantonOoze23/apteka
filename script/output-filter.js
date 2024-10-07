document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedAnimal = urlParams.get('animal') || 'dog'; // По умолчанию 'dog', если параметр не задан

    fetchProducts(selectedAnimal); // Загружаем товары для выбранного животного

    document.getElementById('applyFilters').addEventListener('click', () => {
        const selectedTypes = Array.from(document.querySelectorAll('.filter-type:checked')).map(checkbox => checkbox.value);
        const selectedProducers = Array.from(document.querySelectorAll('.filter-producer:checked')).map(checkbox => checkbox.value);

        fetchProducts(selectedAnimal, selectedTypes, selectedProducers); // Загружаем товары с фильтрами
    });

    function fetchProducts(animal, types = [], producers = []) {
        const typeParam = types.length ? `&types=${types.join(',')}` : '';
        const producerParam = producers.length ? `&companies=${producers.join(',')}` : ''; // Changed parameter name to companies

        fetch(`../api/products.php?animal=${animal}${typeParam}${producerParam}`) // Запрос на сервер с переданными параметрами
            .then(response => response.json())
            .then(data => {
                const productsContainer = document.getElementById('productsContainer');
                productsContainer.innerHTML = ''; // Очищаем контейнер перед добавлением новых данных

                data.forEach(product => {
                    const productDiv = document.createElement('div');
                    productDiv.classList.add('container');
                    productDiv.innerHTML = `
                        <div id="${product.id}">
                            <img src="${product.image}" alt="${product.name}" sizes="" srcset="">
                            <h3>${product.name}</h3>
                            <h4>${product.price} грн</h4>
                            <p>${product.description}</p>
                            <button class="add-to-cart">Купити</button>
                        </div>
                    `;
                    productsContainer.appendChild(productDiv);
                });
            })
            .catch(error => {
                console.error('Помилка:', error);
                alert("Не вдалося завантажити товари.");
            });
    }
});
