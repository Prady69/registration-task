(function () {
    window.onload = function () {
        var form = document.getElementById('reg-form'),
        formBox = document.querySelector('#validation-box');

        // Setting a mapper for password with regex for validating password
        const passwordMapper = [
            {key: 'characters', value: '.{9,}'},
            {key: 'lowercase', value: '(?=.*[a-z])'},
            {key: 'uppercase', value: '(?=.*[A-Z])'},
            {key: 'number', value: '(?=.*\\d)'},
            {key: 'special_char', value: '(?=.*[!#$%&?@ "])'},
        ];

        form.addEventListener('submit', () => {
            formBox.classList = [];
            if (!validatePassword()) {
                event.preventDefault();
                // Delegating a keyup event only if password doesn't satisfy all the validations
                // Keyup event will be effective after 1st incorrect form submission
                let pwdInput = document.querySelector('input.password');
                pwdInput.addEventListener('keyup', (e) => {
                    validatePassword();
                });
            } else {
                // Redirecting to login or route after registration success
                window.location.href = '#login';
            }
        });

        /*
        Validation method to check for various validation regex with mapper already defined
        Appropriate classes will be appended depending on the form status (valid/invalid
         */
        function validatePassword() {
            let passwordEntered = document.querySelector('.password').value,
                isFormValid = true;
            passwordMapper.forEach((regex) => {
                if (passwordEntered.match(regex.value) !== null) {
                    changeValidationElement(regex.key, 'valid');
                } else {
                    isFormValid = false;
                    changeValidationElement(regex.key, 'invalid');
                }
            });

            //These classes will have corresponding bg color to be applied for alert box
            if(!isFormValid){
                formBox.classList.add('alert','alert-danger','invalid');
            } else {
                formBox.classList.add('alert','alert-success', 'valid');
            }
            return isFormValid;
        }

        //Method to change the status of element and according show tick or cross mark
        function changeValidationElement(name, status) {
            let ele =  document.querySelector('#validation-box li#' + name);
            ele.classList = [];
            ele.classList.add(status);
        }
    };
})();