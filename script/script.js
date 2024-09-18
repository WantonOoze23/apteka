const hamburger = document.querySelector(".hamburger");
const navMenu = document.querySelector(".nav-menu");

hamburger.addEventListener("click", mobileMenu);

function mobileMenu() {
    hamburger.classList.toggle("active");
    navMenu.classList.toggle("active");
}
const navLink = document.querySelectorAll(".nav-link");

navLink.forEach(n => n.addEventListener("click", closeMenu));

function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
}


//слайдер с ручним переключением

const slider = document.querySelector('.sale-items');
const slides = slider.querySelectorAll('.sale-item');
let slideIndex = 0;

function showSlide(index) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - index)}%)`;
  });
}

function nextSlide() {
  slideIndex = (slideIndex + 1) % 3; 
  showSlide(slideIndex);
}

function prevSlide() {
  slideIndex = (slideIndex - 1 + 3) % 3; 
  showSlide(slideIndex);
}

document.querySelector('.prev').addEventListener('click', prevSlide);
document.querySelector('.next').addEventListener('click', nextSlide);


// Функция для загрузки данных из файла Excel и добавления на страницу
function loadProducts() {
  var fileInput = document.createElement('input');
  fileInput.type = 'file';
  fileInput.accept = '.xlsx';

  fileInput.onchange = function (event) {
      var file = event.target.files[0];

      if (file) {
          var reader = new FileReader();

          reader.onload = function (e) {
              var data = new Uint8Array(e.target.result);
              var workbook = XLSX.read(data, { type: 'array' });

              // Предполагаем, что лист с данными находится в первой позиции
              var sheet = workbook.Sheets[workbook.SheetNames[0]];

              var productList = document.getElementById('productList');
              var htmlCode = '<ul>';

              // Проходимся по строкам таблицы и формируем HTML-код
              XLSX.utils.sheet_to_json(sheet).forEach(function (product) {
                  htmlCode += '<li>';
                  htmlCode += '<strong>Название:</strong> ' + product['Название'] + '<br>';
                  htmlCode += '<strong>Артикул:</strong> ' + product['Артикул'] + '<br>';
                  htmlCode += '<strong>Цена:</strong> ' + product['Цена'] + '<br>';
                  htmlCode += '<strong>Наличие:</strong> ' + product['Наличие'] + '<br>';
                  htmlCode += '</li>';
              });

              htmlCode += '</ul>';
              productList.innerHTML = htmlCode;
          };

          reader.readAsArrayBuffer(file);
      }
  };

  fileInput.click();
}

// Загрузка данных при загрузке страницы
window.onload = loadProducts;




