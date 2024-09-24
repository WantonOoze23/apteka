fetch('api/check_session.php')
    .then(response => response.json())
    .then(data => {
        if (!data.loggedin) {
            // Якщо не залогінений, перенаправляємо на сторінку авторизації
            window.location.href = 'login.html';
        }
    })
    .catch(error => {
        console.error('Помилка перевірки сесії:', error);
        window.location.href = 'login.html'; // Якщо сталася помилка, перенаправляємо на сторінку входу
    });