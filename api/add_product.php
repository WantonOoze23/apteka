<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);

// Подключение к базе данных
require_once 'db_connection.php';
if ($conn->connect_error) {
    die("Ошибка подключения: " . $conn->connect_error);
}


if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $conn->real_escape_string($_POST['name']);
    $description = $conn->real_escape_string($_POST['description']);
    $price = $conn->real_escape_string($_POST['price']);
    $code = $conn->real_escape_string($_POST['code']);
    $category = $conn->real_escape_string($_POST['category']);
    $producer = $conn->real_escape_string($_POST['producer']);
    $animal = $conn->real_escape_string($_POST['animal']);

    if (isset($_FILES['image']) && $_FILES['image']['error'] == 0) {
        $target_dir = "../images/";
        $target_file = $target_dir . basename($_FILES["image"]["name"]);
        $imageFileType = strtolower(pathinfo($target_file, PATHINFO_EXTENSION));

        if ($_FILES["image"]["size"] > 10000000) {
            echo json_encode(['success' => false, 'error' => "Файл занадто великий."]);
            exit;
        }

        $allowed_types = array('jpg', 'jpeg', 'png', 'gif');
        if (!in_array($imageFileType, $allowed_types)) {
            echo json_encode(['success' => false, 'error' => "Тільки JPG, JPEG, PNG та GIF файли дозволені."]);
            exit;
        }

        if (move_uploaded_file($_FILES["image"]["tmp_name"], $target_file)) {
            $sql = "INSERT INTO animals (name, image, description, code, price, category, producer,  animal)

                    VALUES ('$name', '$target_file', '$description', '$price', '$code','$category', '$producer',  '$animal')";


            if ($conn->query($sql) === TRUE) {
                echo json_encode(['success' => true]);
            } else {
                echo json_encode(['success' => false, 'error' => $conn->error]);
            }
        } else {
            echo json_encode(['success' => false, 'error' => "Помилка при завантаженні зображення."]);
        }
    } else {
        echo json_encode(['success' => false, 'error' => "Файл не було завантажено."]);
    }
}

$conn->close();
?>
