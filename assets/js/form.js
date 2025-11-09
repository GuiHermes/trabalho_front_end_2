document.addEventListener('DOMContentLoaded', () => {

    const form = document.querySelector('#registro');
    const nome = document.querySelector('#nome');
    const sobrenome = document.querySelector('#sobrenome');
    const email = document.querySelector('#email');
    const idade = document.querySelector('#idade');

    const showsError = (input, message) => {
        const formField = input.parentElement;
        formField.classList.remove('success');
        formField.classList.add('error');
        const error = formField.querySelector('small');
        if (error) error.textContent = message;
    };

    const showsSuccess = (input) => {
        const formField = input.parentElement;
        formField.classList.remove('error');
        formField.classList.add('success');
        const error = formField.querySelector('small');
        if (error) error.textContent = '';
    };

    const isRequired = (value) => value.trim() !== '';
    const isBetween = (length, min, max) => !(length < min || length > max);
    const isEmailValid = (emailStr) => {
        const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(emailStr);
    };

    const checkNome = () => {
        if (!nome) return false;
        let valid = false;
        const min = 3, max = 50;
        const nomeVal = nome.value.trim();
        if (!isRequired(nomeVal)) {
            showsError(nome, 'Nome não pode ficar em branco.');
        } else if (!isBetween(nomeVal.length, min, max)) {
            showsError(nome, `Nome deve ter entre ${min} e ${max} caracteres.`);
        } else {
            showsSuccess(nome);
            valid = true;
        }
        return valid;
    };

    const checkSobrenome = () => {
        if (!sobrenome) return false;
        let valid = false;
        const min = 3, max = 50;
        const sobrenomeVal = sobrenome.value.trim();
        if (!isRequired(sobrenomeVal)) {
            showsError(sobrenome, 'Sobrenome não pode ficar em branco.');
        } else if (!isBetween(sobrenomeVal.length, min, max)) {
            showsError(sobrenome, `Sobrenome deve ter entre ${min} e ${max} caracteres.`);
        } else {
            showsSuccess(sobrenome);
            valid = true;
        }
        return valid;
    };

    const checkEmail = () => {
        if (!email) return false;
        let valid = false;
        const emailVal = email.value.trim();
        if (!isRequired(emailVal)) {
            showsError(email, 'E-mail não pode ficar em branco.');
        } else if (!isEmailValid(emailVal)) {
            showsError(email, 'E-mail inválido.');
        } else {
            showsSuccess(email);
            valid = true;
        }
        return valid;
    };

    const checkIdade = () => {
        if (!idade) return false;
        let valid = false;
        const min = Number(idade.min) || 1;
        const max = Number(idade.max) || 120;
        const idadeValRaw = idade.value.trim();

        if (!isRequired(idadeValRaw)) {
            showsError(idade, 'Idade não pode ficar em branco.');
            return false;
        }

        const idadeNum = Number(idadeValRaw);
        if (!Number.isFinite(idadeNum) || Number.isNaN(idadeNum)) {
            showsError(idade, 'Idade inválida.');
        } else if (idadeNum < min || idadeNum > max) {
            showsError(idade, `Idade deve estar entre ${min} e ${max}.`);
        } else {
            showsSuccess(idade);
            valid = true;
        }

        return valid;
    };

    nome.addEventListener('input', checkNome);
    sobrenome.addEventListener('input', checkSobrenome);
    email.addEventListener('input', checkEmail);
    idade.addEventListener('input', checkIdade);

    if (form) {
        form.addEventListener('submit', function (e) {
            e.preventDefault();

            const isNomeValid = checkNome();
            const isSobrenomeValid = checkSobrenome();
            const isEmailValidField = checkEmail();
            const isIdadeValid = checkIdade();

            if (isNomeValid && isSobrenomeValid && isEmailValidField && isIdadeValid) {

                const dados = {
                    nome: nome.value.trim(),
                    sobrenome: sobrenome.value.trim(),
                    email: email.value.trim(),
                    idade: idade.value.trim()
                };
                try {
                    sessionStorage.setItem('registroDados', JSON.stringify(dados));
                } catch (err) {
                    console.warn('Não foi possível salvar sessionStorage:', err);
                }
                window.location.href = "./confirmation.html";
            }
        });
    }
});
