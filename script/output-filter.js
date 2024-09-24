document.addEventListener('DOMContentLoaded', function() {
    // Получаем параметр animal из URL
    const urlParams = new URLSearchParams(window.location.search);
    const selectedAnimal = urlParams.get('animal'); // По умолчанию 'dog', если параметр не задан

    fetchProducts(selectedAnimal); // Загружаем товары для выбранного животного

    function fetchProducts(animal) {
        fetch(`../api/products.php?animal=${animal}`) // Запрос на сервер с переданным параметром
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
