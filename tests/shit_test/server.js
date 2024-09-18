const express = require('express');
const exceljs = require('exceljs');
const app = express();
const port = 3000;

app.use(express.static('public'));

app.get('/api/products', async (req, res) => {
    try {
        const workbook = new exceljs.Workbook();
        await workbook.xlsx.readFile('products.xlsx');

        const worksheet = workbook.getWorksheet(1);

        const productsData = [];

        worksheet.eachRow({ includeEmpty: false }, (row, rowNumber) => {
            if (rowNumber !== 1) { // Пропускаем заголовок
                const product = {
                    name: row.getCell(1).value,
                    price: row.getCell(2).value,
                    image: row.getCell(3).value,
                    description: row.getCell(4).value
                };
                productsData.push(product);
            }
        });

        res.json(productsData);
    } catch (error) {
        console.error('Error reading Excel file:', error.message);
        res.status(500).send('Internal Server Error');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
