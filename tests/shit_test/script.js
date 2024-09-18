document.addEventListener('DOMContentLoaded', function () {
    // Загрузка данных из Excel
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = '.xlsx';
    fileInput.addEventListener('change', handleFile);

    document.body.appendChild(fileInput);

    function handleFile(event) {
        const file = event.target.files[0];

        if (file) {
            const reader = new FileReader();
            reader.onload = function (e) {
                const data = new Uint8Array(e.target.result);
                const workbook = XLSX.read(data, { type: 'array' });

                displayProducts(workbook);
            };

            reader.readAsArrayBuffer(file);
        }
    }

    // Отображение товаров на странице
    function displayProducts(workbook) {
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];

        const productsContainer = document.getElementById('products-container');
        productsContainer.innerHTML = '';

        const products = XLSX.utils.sheet_to_json(sheet, { header: 1 });

        for (let i = 1; i < products.length; i++) {
            const [category, name, article, price, status] = products[i];

            const productDiv = document.createElement('div');
            productDiv.classList.add('product');
            productDiv.innerHTML = `
                <h3>${name}</h3>
                <p>Категория: ${category}</p>
                <p>Артикул: ${article}</p>
                <p>Цена: ${price}</p>
                <p>Статус: ${status}</p>
            `;

            productsContainer.appendChild(productDiv);
        }
    }
});
