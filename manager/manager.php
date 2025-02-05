<?php
session_start(); // Стартуем сессию

// Проверяем, авторизован ли пользователь
if (!isset($_SESSION['logged_in']) || $_SESSION['logged_in'] !== true) {
    // Если нет, перенаправляем на страницу логина
    header("Location: /manager/login.html");
    exit; // Завершаем выполнение скрипта
}
?>

<!DOCTYPE html>
<html lang="ua">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Додати товари</title>

    <link rel="stylesheet" href="../style/mainstyles.css?v=1.4">
	<link rel="stylesheet" href="../style/nav_menu.css?v=1.4">
    <link rel="stylesheet" type="text/css" href="../style/form.css?v=1.3">
    
    <link rel="icon" type="image/x-icon" href="/icons/favicon.ico">

</head>
<body>
    <header class="header">
		<a href="../index.html" class="logo">VetApteka</a>
		
		<button class="menu-toggle" id="menuToggle">☰</button> <!-- Кнопка для открытия меню -->
		
		<ul class="main-nav" id="navMenu">
			<li><a href="../dogs.html?animal=dog" class="nav_btn" id="dogs_link">Собаки</a></li>
			<li><a href="../cats.html?animal=cat" class="nav_btn" id="cats_link">Коти</a></li>
			<li><a href="../rodents.html?animal=rodent" class="nav_btn" id="rodents_link">Гризуни</a></li>
			<li><a href="../birds.html?animal=bird" class="nav_btn" id="birds_link">Птахи</a></li>
			<li><a href="../fish.html?animal=fish" class="nav_btn" id="fish_link">Риби</a></li>
			<li><a href="../others.html?animal=other" class="nav_btn" id="others_link">Інші</a></li>
			<li><a href="/manager.php" class="nav_btn" id="login">Кабінет</a></li>
		</ul>
	</header>

    <main>
            <form action="../api/logout.php" method="POST">
                <button type="submit">Вийти</button>
            </form>
        <section>
            <form action="api/add_product.php" id="addProduct" method="post" enctype="multipart/form-data">
                <h1>Додати товар</h1>
                <div class="input-form">
                    <label for="name">Назва товару:</label>
                    <input type="text" id="name" name="name" required><br>
                </div>
                
                <div class="input-form">
                    <label for="price">Ціна:</label>
                    <input type="number" step="0.01" id="price" name="price" required><br>
                </div>

                <div class="input-form">
                    <label for="description">Опис:</label>
                    <textarea id="description" name="description" required></textarea><br>
                </div>

                <div class="input-form">
                    <label for="code">Код товару:</label>
                    <input type="code" id="code" name="code" required><br>
                </div>

                <div class="input-form">
                    <br><label for="producer">Виробник</label>
                    <select id="producer" name="producer" required>
                        <option value="">Виберіть значення</option>
                        <option value="Royal">Royal</option>
                        <option value="2">Producer 2</option>
                        <option value="3">Producer 3</option>
                        <option value="4">Producer 4</option>
                        <option value="5">Producer 5</option>
                        <option value="6">Producer 6</option>
                    </select>
                </div>
                <div class="input-form">
                    <br><label for="category">Тип/категорія</label>
                    <select id="category" name="category" required>
                        <option value="">Виберіть значення</option>
                        <option value="feed">Корм</option>
                        <option value="vaccine">Вакцина</option>
                        <option value="medecine">Ліки</option>
                        <option value="sweties">Смаколики</option>
                        <option value="vitamins">Вітаміни</option>
                        <option value="accessories">Аксесуари</option>
                    </select>
                </div>

                <div class="input-form">
                    <br><label for="animal">Тварина</label>
                    <select id="animal" name="animal" required>
                        <option value="">Виберіть значення</option>
                        <option value="dog">Собаки</option>
                        <option value="cat">Коти</option>
                        <option value="bird">Птахи</option>
                        <option value="fish">Риби</option>
                        <option value="roudants">Гризуни</option>
                        <option value="others">Інші</option>
                    </select>
                </div>
                
                <div class="input-form">
                    <label for="image">Зображення:</label>
                    <input type="file" id="image" name="image" accept="image/*" required><br>
                </div>
                <button id="add_button" type="submit">Додати товар</button>

            </form>

        </section>
    
        <section id="output_form"> 
            <div id="delete_form">
                <h2>Форма видалення </h2>
                <form id="deleteCarForm">
                    <label for="id">ID :</label>
                    <input type="number" id="id" name="id" required>
                    <button type="submit" >Видалити </button>
                </form>
            </div>

            <div class="filter">
                <label for="animal">Фільтр:</label>
                <select id="filterAnimal" name="animal">
                    <option value="">Виберіть значення</option>
                    <option value="dog">Собаки</option>
                    <option value="cat">Коти</option>
                    <option value="bird">Птахи</option>
                    <option value="fish">Риби</option>
                    <option value="roudants">Гризуни</option>
                    <option value="others">Інші</option>
                </select>
                
            </div>
            <div id="output_list">

                <h2>Список товарів</h2>

                <table id="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Код</th>
                            <th>Зображення</th>
                            <th>Назва</th>
                            <th>Виробник</th>
                            <th>Категорія</th>
                            <th>Опис</th>
                            <th>Ціна</th>
                            <th>Тварина</th>
                        </tr>
                    </thead>
                    <tbody id="TableBody">
                        <!-- Дані будуть додані сюди через JavaScript -->
                    </tbody>
                </table>
            </div>
        </section>
    </main>

    <button id="scrollToTop" class="scroll-to-top">↑</button>

	<script src="../script/scroll-button.js"></script>
	<script src="../script/navigation.js?v=1.2"></script>

    <script src="./manager_script/add-product.js"></script>
    <script src="./manager_script/remove.js"></script>
    <script src="./manager_script/getList.js?v=1.1"></script>
    <script src="../script/filter.js"></script>

</body>
</html>