<?php
session_start();
session_destroy(); // Завершуємо сесію
echo json_encode(['success' => true]);
?>
