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

// Запит для вибору всіх товарів
$sql = "SELECT id, name, image, description, price, category, producer, animal FROM animals";

$result = $conn->query($sql);

$products = array();

if ($result->num_rows > 0) {
    // Зберігаємо дані в масив
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

// Повертаємо дані у форматі JSON
header('Content-Type: application/json');
echo json_encode($products);

$conn->close();
?>
