<?php
session_start();

// Максимальний час сесії (60 хвилин = 3600 секунд)
$inactive = 3600;

if (isset($_SESSION['last_activity'])) {
    $session_life = time() - $_SESSION['last_activity'];
    if ($session_life > $inactive) {
        session_destroy();
        echo json_encode(['loggedin' => false, 'timeout' => true]); // Сесія закінчилася
        exit();
    }
}

$_SESSION['last_activity'] = time(); // Оновлюємо час активності

// Перевіряємо, чи користувач залогінений
if (isset($_SESSION['loggedin']) && $_SESSION['loggedin'] === true) {
    echo json_encode(['loggedin' => true]);
} else {
    echo json_encode(['loggedin' => false]);
}
?>
