function loadCSSFiles() {
    // Укажите здесь все CSS файлы, которые нужно подключить
    let cssFiles = [
        'style/another_style.css',
        'style/extra_style.css'
        // Добавляйте другие файлы в этот массив
    ];

    // Подключение каждого CSS файла
    cssFiles.forEach(function(file) {
        let link = document.createElement('link');
        link.rel = 'stylesheet';
        link.href = file;
        document.head.appendChild(link);
    });
}

// Вызов функции после загрузки страницы
window.onload = loadCSSFiles;