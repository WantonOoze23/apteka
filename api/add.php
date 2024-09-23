не удалять, это для  того, чтобы не было возможности использовать их для создания новых зомби. Второй прич

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

// Обробка запиту POST
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $conn->real_escape_string($_POST['name']);
    $description = $conn->real_escape_string($_POST['description']);
    $price = $conn->real_escape_string($_POST['price']);
    $category = $conn->real_escape_string($_POST['category']);
    $producer = $conn->real_escape_string($_POST['producer']);

    // Перевірка наявності зображення
    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $target_dir = "../images/";
        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        // Перевірка розміру файлу
        if ($_FILES["image"]["size"] > 5000000) {
            echo json_encode(['success' => false, 'error' => "Файл занадто великий."]);
            exit;
        }

        // Перевірка типу файлу
        $allowed_types = array('jpg', 'jpeg', 'png', 'gif');
        if (!in_array($imageFileType, $allowed_types)) {
            echo json_encode(['success' => false, 'error' => "Тільки JPG, JPEG, PNG та GIF файли дозволені."]);
            exit;
        }

        // Завантаження файлу
        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            // Підготовлений запит на вставку даних у базу
            $stmt = $conn->prepare("INSERT INTO dogs (name, image, description, price, category, producer) VALUES (?, ?, ?, ?, ?, ?)");
            $stmt->bind_param("ssdsis", $name, $target_file, $description, $price, $category, $producer);

            // Виконання запиту
            if ($stmt->execute()) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => $stmt->error]);
            }
            $stmt->close();
        } else {
            echo json_encode(['success' => false, 'error' => "Помилка при завантаженні зображення."]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => "Файл не було завантажено."]);
    }
}

$conn->close();
?>