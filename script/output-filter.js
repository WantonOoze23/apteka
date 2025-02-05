document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const selectedAnimal = urlParams.get('animal') || 'dog'; // По умолчанию 'dog', если параметр не задан

    fetchProducts(selectedAnimal); // Загружаем товары для выбранного животного

    // Изначально считываем значения фильтров
    const initialTypes = Array.from(document.querySelectorAll('.filter-type:checked')).map(checkbox => checkbox.value);
    const initialProducers = Array.from(document.querySelectorAll('.filter-producer:checked')).map(checkbox => checkbox.value);

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
                    const productDiv = document.createElement('a');
                    productDiv.classList.add('container');
                    productDiv.href = `../product/product-details.html?id=${product.id}`; // Ссылка на страницу с деталями товара
                    productDiv.innerHTML = `
                        <div id="${product.id}">
                            <p class="code">Код: ${product.code}</p>
                            <img src="${product.image}" alt="${product.name}" sizes="" srcset="">
                            <h3>Назва: ${product.name}</h3>
                            <h4>Ціна: ${product.price} грн</h4>
                            <p>Опис: ${product.description}</p>
                            <!---<button class="add-to-cart">Купити</button>-->
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

    const filterToggle = document.querySelector('.filter-toggle');
    const leftSideFilter = document.querySelector('.left-side-filter');

    // Изначально скрыть фильтры
    leftSideFilter.style.display = 'none';

    filterToggle.addEventListener('click', () => {
        // Переключение видимости фильтра
        if (leftSideFilter.style.display === 'block') {
            leftSideFilter.style.display = 'none';
            filterToggle.textContent = 'Показати фільтри'; // Изменение текста на "Показать фильтры"
            filterToggle.classList.remove('is-active'); // Убираем активный класс
        } else {
            leftSideFilter.style.display = 'block';
            filterToggle.textContent = 'Закрити фільтр'; // Изменение текста на "Закрыть"
            filterToggle.classList.add('is-active'); // Добавляем активный класс
        }

        // Плавный переход
        leftSideFilter.classList.toggle('filter-visible');
    });
});
