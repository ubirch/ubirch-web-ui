window.onload = function WindowLoad(event) {
    console.log("Page is loaded");
    let accountPlan = localStorage.getItem('account_plan');
    if( accountPlan !== null) {
        setInput("user.attributes.account_plan", accountPlan);
        checkCompanySelection();
    }
}


document.addEventListener("DOMContentLoaded", function () {
    setDataIntoForm();
});


/**
 * put params into form fields
 */
function setDataIntoForm() {
    setInput("agb_version", "1");
    setInput("dpa_version", "1");
}

function setInput(key, value) {
    value = sanitizeInput(value);

    const elementKey = "user.attributes." + key;
    const defaultKey = key;

    const element = document.getElementById(elementKey);
    const defaultElement = document.getElementById(defaultKey);

    if (value && element) {
        document.getElementById(elementKey).value = value;
    } else if (value && defaultElement) {
        document.getElementById(defaultKey).value = value;
    } else {
        console.warn("missing element with id " + elementKey);
    }
}

function sanitizeInput(value) {
    // remove all characters that are not part of allowed_characters
    value = String(value).replace(/[<>`"{}]/g, "");
    console.log(value);
    return value;
}

function checkCompanySelection() {
    let form = document.querySelector('#kc-register-form');
    let data = new FormData(form);

    let accountPlan = data.get('user.attributes.account_plan');

    let input = document.querySelector('#companyName');
    let label = document.querySelector('#companyLabel');
    let div = document.querySelector('#companyDiv');

    if (accountPlan === 'private') {
        input.required = false;
        input.value = '';
        input.style.display = 'none';
        label.style.display = 'none';
        div.style.display = 'none';

    } else {
        input.required = true;
        input.style.display = 'block';
        label.style.display = 'block';
        div.style.display = 'block';
    }
}

function validateForm(form) {
    let invalidFields = [];
    let formData = new FormData(form);
    let phone = formData.get('user.attributes.phone');
    let accountPlan = formData.get('user.attributes.account_plan');
    let company = formData.get('user.attributes.company_name');
    let agb = formData.get('agb');
    let dpa = formData.get('dpa');
    let firstName = formData.get('firstName');
    let lastName = formData.get('lastName');
    let email = formData.get('email');

    let allFields = ['user.attributes.phone', 'user.attributes.account_plan', 'companyName', 'agb', 'dpa', 'firstName', 'lastName', 'email'];

    if (accountPlan === 'private') {
        formData.set('user.attributes.company_name', '');
    }

    if (accountPlan === 'company' && company === '') {
        invalidFields.push('companyName');
    }

    let phoneRegex = new RegExp("([0-9])\\w+");

    if (phone === '' || !phoneRegex.test(String(phone))) {
        invalidFields.push('user.attributes.phone');
    }

    if (!agb) {
        invalidFields.push('agbLabel');
    }

    if (!dpa) {
        invalidFields.push('dpaLabel');
    }

    if (firstName === '') {
        invalidFields.push('firstName');
    }

    if (lastName === '') {
        invalidFields.push('lastName');
    }

    let emailRegex = new RegExp("(?:[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*|\"(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21\x23-\x5b\x5d-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])*\")@(?:(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?|\\[(?:(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)\\.){3}(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?|[a-z0-9-]*[a-z0-9]:(?:[\x01-\x08\x0b\x0c\x0e-\x1f\x21-\x5a\x53-\x7f]|\\\\[\x01-\x09\x0b\x0c\x0e-\x7f])+)\\])")

    if (email === '' || !emailRegex.test(String(email))) {
        invalidFields.push('email');
    }

    updateErrors(invalidFields, allFields);
    return invalidFields.length === 0;
}

function updateErrors(invalidFields, allFields) {
    allFields.forEach(field => {document.getElementById(field).classList.remove('invalid')});

    invalidFields.forEach(error => {
        let element = document.getElementById(error);
        element.classList.add('invalid');
    });
}

function submitForm(form) {
    if(validateForm(form)) {
        form.submit();
    }
}

function removeInvalid(element) {
    element.classList.remove('invalid');
}

function saveAccountTypeValue(element) {
    let key = "account_plan";
    let value = element.value;
    localStorage.setItem(key, value);
}
