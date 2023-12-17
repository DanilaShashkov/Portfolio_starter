const hamburger = document.querySelector('.hamburger'),
    menu = document.querySelector('.menu'),
    closeElement = document.querySelector('.menu__close');

hamburger.addEventListener('click', () => {
    menu.classList.add('active')
})

closeElement.addEventListener('click', () => {
    menu.classList.remove('active')
})

const counters = document.querySelectorAll('.skills__percent-value'),
      lines = document.querySelectorAll('.skills__percent-indicator');

counters.forEach((item,i) => {
    lines[i].style.width = item.innerHTML;
});


function validateForm() {
    var form = document.querySelector('.contacts__form');
    var nameInput = form.querySelector('[name="name"]');
    var emailInput = form.querySelector('[name="email"]');
    var textInput = form.querySelector('[name="text"]');
    var checkboxInput = form.querySelector('.contacts__policy input[type="checkbox"]');
    const rowGap = document.querySelector('.contacts__form');

    form.addEventListener('submit', function(event) {
        var errors = [];
        if (nameInput.value.trim().length < 2) {
            showError(nameInput, "Пожалуйста, введите свое имя (минимум 2 символа).");
            errors.push("name");
            rowGap.style.rowGap = "50px";

        } else {
            hideError(nameInput);
        }

        var emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(emailInput.value.trim())) {
            showError(emailInput, "Неправильно введен адрес почты.");
            errors.push("email");
            rowGap.style.rowGap = "50px";
        } else {
            hideError(emailInput);
        }

        if (textInput.value.trim() === '') {
            showError(textInput, "Пожалуйста, введите ваше сообщение.");
            errors.push("text");
            rowGap.style.rowGap = "50px";
        } else {
            hideError(textInput);
        }

        if (!checkboxInput.checked) {
            showError(checkboxInput, "Для отправки сообщения необходимо согласиться с политикой конфиденциальности.");
            errors.push("checkbox");
            rowGap.style.rowGap = "50px";
        } else {
            hideError(checkboxInput);
        }

        if (errors.length > 0) {
            event.preventDefault();
            console.log('Форма невалидирована!');
        } else {
            console.log('Форма успешно валидирована!');
            rowGap.style.rowGap = "27px";

            fetch('../mailer/smart.php', {
                method: 'POST',
                body: new FormData(form)
            })
            .then(response => {
                if (response.ok) {
                    console.log('Данные успешно отправлены на почту!');
                } else {
                    console.error('Ошибка при отправке данных на почту');
                }
            })
            .catch(error => {
                console.error('Произошла ошибка:', error);
            });
            // Действие при успешной валидации (например, отправка данных)
            // Например, можно добавить здесь код для отправки данных формы на сервер
        }
    });

    function showError(input, message) {
        var errorElement = input.nextElementSibling;
        if (!errorElement || !errorElement.classList.contains('error-message')) {
            errorElement = document.createElement('span');
            errorElement.classList.add('error-message');
            input.parentNode.insertBefore(errorElement, input.nextSibling);
        }
        errorElement.textContent = message;
    }

    function hideError(input) {
        var errorElement = input.nextElementSibling;
        if (errorElement && errorElement.classList.contains('error-message')) {
            errorElement.textContent = '';
        }
    }
}

validateForm('.contacts__form');