// Подключение необходимых модулей
const express = require('express');
const { read } = require('exceljs/dist/exceljs.min.js');

// Создание экземпляра приложения Express
const app = express();
const port = 3000;

// Маршрут для обработки запросов на получение данных из Excel файла
app.get('/api/products', async (req, res) => {
    try {
        // Чтение данных из Excel файла
        const workbook = await read('products.xlsx');
        const sheet = workbook.getWorksheet(1);
        const data = [];

        sheet.eachRow((row, rowNumber) => {
            const rowData = {};
            row.eachCell((cell, colNumber) => {
                rowData[`column_${colNumber}`] = cell.value;
            });
            data.push(rowData);
        });

        res.json(data);
    } catch (error) {
        console.error('Ошибка чтения Excel файла:', error);
        res.status(500).json({ error: 'Ошибка чтения Excel файла' });
    }
});

// Запуск веб-сервера
app.listen(port, () => {
    console.log(`Сервер запущен на порту ${port}`);
});
