<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Подключение к базе данных
require_once 'db_connection.php';
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}

// Отримуємо параметр 'id' з запиту
$id = isset($_GET['id']) ? $_GET['id'] : '';

// Створюємо запит з фільтрацією, якщо вибрано id
$sql = "SELECT id, name, image, description, price, code, category, producer, animal FROM animals
        WHERE id = ?";

$stmt = $conn->prepare($sql);

if ($id) {
    $stmt->bind_param("s", $id);
}

$stmt->execute();
$result = $stmt->get_result();

$product = null;
if ($result->num_rows > 0) {
    $product = $result->fetch_assoc();
}

header('Content-Type: application/json');
echo json_encode($product);

$conn->close();
?>
