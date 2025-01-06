<?php
session_start(); // Стартуем сессию

// Удаляем все сессионные переменные
session_unset();

// Уничтожаем сессию
session_destroy();

// Перенаправляем на страницу логина
header("Location: ../manager/login.html");
exit;
?>
