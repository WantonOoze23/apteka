<?php
$servername = "localhost";
$username = "root"; // Ваш логін MySQL
$password = ""; // Ваш пароль MySQL
$dbname = "apteka";

// Підключення до бази даних
$conn = new mysqli($servername, $username, $password, $dbname);

// Перевірка підключення
if ($conn->connect_error) {
    die("Помилка підключення: " . $conn->connect_error);
}
?>