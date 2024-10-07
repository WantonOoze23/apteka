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

// Отримуємо параметри з запиту
$animal = isset($_GET['animal']) ? $_GET['animal'] : '';
$types = isset($_GET['types']) ? explode(',', $_GET['types']) : [];
$companies = isset($_GET['companies']) ? explode(',', $_GET['companies']) : [];

// Базовий SQL-запит
$sql = "SELECT id, name, image, description, price, category, producer, animal FROM animals WHERE 1=1";

// Фільтрація по тварині
if ($animal) {
    $sql .= " AND animal = ?";
}

// Фільтрація по типу товару
if (!empty($types)) {
    $placeholders = implode(',', array_fill(0, count($types), '?'));
    $sql .= " AND category IN ($placeholders)";
}

// Фільтрація по виробнику
if (!empty($companies)) {
    $placeholders = implode(',', array_fill(0, count($companies), '?'));
    $sql .= " AND producer IN ($placeholders)";
}

$stmt = $conn->prepare($sql);

// Масив для зберігання параметрів
$params = [];
if ($animal) {
    $params[] = $animal;
}
if (!empty($types)) {
    $params = array_merge($params, $types);
}
if (!empty($companies)) {
    $params = array_merge($params, $companies);
}

// Динамічне прив'язування типів змінних
// Зміна на 's' для кожного параметра
$types_string = str_repeat('s', count($params));
$stmt->bind_param($types_string, ...$params);

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
