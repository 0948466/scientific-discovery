$( document ).ready(function () {
    const valForm = anyForm => {
        const form = anyForm
        const buttonSubmit = form.querySelector('.inputSubmit')

        const inputBirthday = form.querySelector('.inputBirthday')
        const inputTel = form.querySelector('.inputTel')
        const inputEmail = form.querySelector('.inputEmail')
        const checkboxRulesAccept = form.querySelector('.checkboxRulesAccept')

        // Сброс ошибки
        const resetError = container => {
            container.classList.remove('error')
            container.classList.remove('complete')
        }
        // Показ ошибки, создание сообщения
        const showError = (container) => {
            container.classList.add('error')
            container.classList.remove('complete')
        }

        // Успешное прохождение проверки
        const complete = container => {
            container.classList.remove('error')
            container.classList.add('complete')
        }

        // Проверка email
        const validateEmail = input => {
            const val = input.value
            const parent = input.parentNode

            resetError(parent)
            switch (true) {
                case !val:
                    showError(parent, 'Введите ваш email')
                    return false
                case /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(val) === false:
                    showError(parent, 'Email ведён неверно')
                    return false
                default:
                    complete(parent)
                    return true
            }
        }

        // Проверка телефона
        const validateTel = (input) => {
            const val = input.value
            const parent = input.parentNode

            resetError(parent)
            
            switch (true) {
                case !val:
                    showError(parent, 'Введите ваш номер телефона')
                    return false
                case val.replace(/\D+/g, "").length < 11:
                    showError(parent, 'Укажите верный номер телефона')
                    return false
                default:
                    complete(parent)
                    return true
            }
        }

        // Проверка даты рождения
        const validateBirthday = input => {
            const val = input.value
            const parent = input.parentNode.parentNode
            const valArr = val.split('.')

            resetError(parent)
            switch (true) {
                case !val:
                    showError(parent, 'Введите вашу дату рождения')
                    return false
                case val.length < 10:
                    showError(parent, 'Укажите верную дату рождения')
                    return false
                case valArr[0] > 31 || valArr[1] > 12 || valArr[2] < 1920 || valArr[2] > 2001:
                    showError(parent, 'Укажите верную дату рождения')
                    return false
                default:
                    complete(parent)
                    return true
            }
        }

        function isNullTelEmailInput() {
            return !$(inputEmail).val() && !$(inputTel).val()
        }

        // Общая проверка всех инпутов
        const allowSubmit = allowForm => {
            const inputArray = [].slice.call(allowForm.querySelectorAll('.form-item'))
            let activateArrayLength = inputArray.filter(inputComplete => inputComplete.classList.contains('complete')).length

            if (isNullTelEmailInput()) {
                activateArrayLength += 3 - +checkboxRulesAccept.checked
            }
            if (inputArray.length === activateArrayLength) {
                buttonSubmit.classList.remove('disabled')
                buttonSubmit.removeAttribute('disabled')
            } else {
                buttonSubmit.classList.add('disabled')
                buttonSubmit.setAttribute('disabled', 'disabled')
            }
        }

        // Обработчики событий на все инпуты
        if (inputEmail) {
            inputEmail.addEventListener('input', e => {
                validateEmail(e.target)
                allowSubmit(anyForm)
            })
        }

        if (inputTel) {
            inputTel.addEventListener('input', e => {
                validateTel(e.target)
                allowSubmit(anyForm)
            })
        }

        if (inputBirthday) {
            inputBirthday.addEventListener('blur', e => {
                setTimeout(function () {
                    validateBirthday(e.target)
                    allowSubmit(anyForm)
                }, 100)
            })
        }

        if (checkboxRulesAccept) {
            if (checkboxRulesAccept.checked) {
                complete(checkboxRulesAccept.closest('.form-item'))
                allowSubmit(anyForm)
            }
            checkboxRulesAccept.addEventListener('change', e => {
                if (e.target.checked) {
                    complete(checkboxRulesAccept.closest('.form-item'))
                } else {
                    resetError(checkboxRulesAccept.closest('.form-item'))
                }
                allowSubmit(anyForm)
            })
        }
    }

    const validationFormInit = () => {
        const form = document.querySelector('.form-reg')

        if (form) {
            valForm(form)
        }
    }

    validationFormInit()
})
