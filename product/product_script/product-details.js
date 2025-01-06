document.addEventListener('DOMContentLoaded', function() {
    const urlParams = new URLSearchParams(window.location.search);
    const productId = urlParams.get('id');

    fetch(`/api/product-details.php?id=${productId}`)
        .then(response => response.json())
        .then(product => {
            const container = document.getElementById('productDetailContainer');
            container.innerHTML = `
                <img src="${product.image}" alt="${product.name}">
                <h1>${product.name}</h1>
                <h4>Код: ${product.code}</h4>
                <h4>Ціна: ${product.price}</h4>
                <h4>Виробник: ${product.producer}</h4>
                <p>${product.description}</p>
                <!---<button class="add-to-cart">Купити</button>-->
            `;
        })
        .catch(error => {
            console.error('Помилка:', error);
            alert("Не вдалося завантажити деталі товару.");
        });
});