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
    $id = intval($_POST['id']); // Отримуємо ID з POST-запиту

    if ($id === -100) {
        // Якщо введено -100, видаляємо всі записи з таблиці та відповідні зображення
        $sql = "SELECT image FROM animals"; // Отримуємо всі назви файлів зображень
        $result = $conn->query($sql);

        if ($result->num_rows > 0) {
            while ($row = $result->fetch_assoc()) {
                // Видаляємо файли з папки images/
                $imagePath = '../images/' . $row['image'];
                if (file_exists($imagePath)) {
                    unlink($imagePath); // Видаляємо файл
                }
            }
        }

        // Видаляємо всі записи з таблиці
        $sql = "DELETE FROM animals"; // Заміни animals на потрібну таблицю
        if ($conn->query($sql) === TRUE) {
            echo json_encode(['success' => true, 'message' => "Всі товари та зображення успішно видалено."]);
        } else {
            echo json_encode(['success' => false, 'error' => "Помилка при видаленні всіх товарів: " . $conn->error]);
        }
    } else {
        // Спочатку отримуємо назву зображення за ID
        $sql = "SELECT image FROM animals WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);
        $stmt->execute();
        $stmt->bind_result($image);
        $stmt->fetch();
        $stmt->close();

        // Видаляємо товар за конкретним ID
        $sql = "DELETE FROM animals WHERE id = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("i", $id);

        // Виконання запиту
        if ($stmt->execute()) {
            if ($stmt->affected_rows > 0) {
                // Видаляємо файл зображення
                $imagePath = '../images/' . $image;
                if (file_exists($imagePath)) {
                    unlink($imagePath); // Видаляємо файл
                }
                echo json_encode(['success' => true, 'message' => "Товар та зображення успішно видалено."]);
            } else {
                echo json_encode(['success' => false, 'error' => "Товар не знайдено."]);
            }
        } else {
            echo json_encode(['success' => false, 'error' => $stmt->error]);
        }

        $stmt->close();
    }
}

$conn->close();
?>
