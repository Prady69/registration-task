(function () {
    window.onload = function () {
        var form = document.getElementById('reg-form'),
            passwordMapper = [
                {key: 'characters', value: '.{9,}'},
                {key: 'lowercase', value: '(?=.*[a-z])'},
                {key: 'uppercase', value: '(?=.*[A-Z])'},
                {key: 'number', value: '(?=.*\\d)'},
                {key: 'special_char', value: '(?=.*[!#$%&?@ "])'},
            ],
        formBox = document.querySelector('#validation-box');

        form.addEventListener('submit', () => {
            formBox.classList = [];
            if (!validatePassword()) {
                event.preventDefault();
                let pwdInput = document.querySelector('input.password');
                pwdInput.addEventListener('keyup', (e) => {
                    validatePassword();
                });
            } else {
                window.location.href = '#login';
            }
        });

        function validatePassword() {
            let passwordEntered = document.querySelector('.password').value,
                isFormValid = true;
            passwordMapper.forEach((regex) => {
                if (passwordEntered.match(regex.value) !== null) {
                    changeForm(regex.key, 'valid');
                } else {
                    isFormValid = false;
                    changeForm(regex.key, 'invalid');
                }
            });
            if(!isFormValid){
                formBox.classList.add('alert','alert-danger','invalid');
            } else {
                formBox.classList.add('alert','alert-success', 'valid');
            }
            return isFormValid;
        }

        function changeForm(name, status) {
            let ele =  document.querySelector('#validation-box li#' + name);
            ele.classList = [];
            ele.classList.add(status);
        }
    };
})();