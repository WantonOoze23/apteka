<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Подключение к базе данных
require_once 'db_connection.php';
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Отримуємо параметр 'animal' з запиту
$animal = isset($_GET['animal']) ? $_GET['animal'] : '';

// Створюємо запит з фільтрацією, якщо вибрано тварину
$sql = "SELECT id, name, image, description, price, code, category, producer, animal FROM animals";

if ($animal) {
    $sql .= " WHERE animal = ?";
}

$stmt = $conn->prepare($sql);

if ($animal) {
    $stmt->bind_param("s", $animal);
}

$stmt->execute();
$result = $stmt->get_result();

$products = [];
if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $products[] = $row;
    }
}

header('Content-Type: application/json');
echo json_encode($products);

$conn->close();
?>
