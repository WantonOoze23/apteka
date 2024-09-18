/* Код за подключение к базе данных */

const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'ваш_пользователь',
  password: 'ваш_пароль',
  database: 'ваша_база_данных',
});

connection.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL: ' + err.stack);
    return;
  }
  console.log('Connected to MySQL as id ' + connection.threadId);
});
