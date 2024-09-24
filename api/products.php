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

// Отримуємо параметр 'animal' з запиту
$animal = isset($_GET['animal']) ? $_GET['animal'] : '';

// Створюємо запит з фільтрацією, якщо вибрано тварину
$sql = "SELECT id, name, image, description, price, category, producer, animal FROM animals";
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

// Встановлюємо заголовок для JSON-відповіді
header('Content-Type: application/json');
echo json_encode($products);

$stmt->close();
$conn->close();
?>
