function focusInputField(container) {
    const input = container.querySelector('input');
    input.focus();
}

/**
 * This function loads signed-in user and contacts, and creates a set of used contact IDs.
 */
async function loadUsers() {
    await loadSignedInUserfromBackend();
    await loadContacts();
    usedIds = new Set(contacts.map(contact => parseInt(contact.contactid)));
}

/*********************************LOG IN*********************************/
/**
 * Validates the email input by the user.
 *
 * @param {string} emailValue - The value of the email input field.
 * @returns {boolean} - True if the email input is valid, false otherwise.
 */
function validateEmail(emailValue) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
        loginErrorMessage('emailError', 'Please enter a valid email address.');
        return false;
    } else {
        hideLoginErrorMessage('emailError');
        return true;
    }
}

/**
 * Validates the password input by the user.
 *
 * @param {string} passwordValue - The value of the password input field.
 * @returns {boolean} - True if the password input is valid, false otherwise.
 */
function validatePassword(passwordValue) {
    const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{8,64}$/;

    if (!passwordRegex.test(passwordValue)) {
        loginErrorMessage('passwordError', 'Please enter a valid password (at least 8 characters and 1 number).');
        return false;
    } else {
        hideLoginErrorMessage('passwordError');
        return true;
    }
}

/**
 * The function validates user input for email and password fields and calls the login function if both
 * inputs are valid.
 */
function validateLogin() {
    const emailValue = document.getElementById('loginemail').value;
    const passwordValue = document.getElementById('loginpassword').value;

    const isEmailValid = validateEmail(emailValue);
    const isPasswordValid = validatePassword(passwordValue);

    if (isEmailValid && isPasswordValid) {
        login();
    }
}

/**
 * This function handles the login process by checking the user's email and password, and redirecting
 * them to the summary page if the login is successful.
 */
async function login() {
    let loginemail = document.getElementById('loginemail');
    let loginpassword = document.getElementById('loginpassword');
    let user = users.find(u => u.email == loginemail.value);

    if (user) {
        if (user.password == loginpassword.value) {
            saveUserToLocalStorage(user.name);
            saveUserInitialsToLocalStorage(user.name[0].toUpperCase() + user.surname[0].toUpperCase());
            window.location.href = 'summary.html';
        } else {
            hideLoginErrorMessage('emailError');
            loginErrorMessage('passwordError', 'Incorrect password. Please try again.');
        }
    } else {
        loginErrorMessage('emailError', 'Email not found. Please check your email address.');
        hideLoginErrorMessage('passwordError');
    }
}

/**
 * The function displays an error message on a webpage for a specific element.
 * @param id - The id of the HTML element where the error message will be displayed.
 * @param message - The error message that will be displayed to the user.
 */
function loginErrorMessage(id, message) {
    const errorLabel = document.getElementById(id);
    errorLabel.innerHTML = message;
    errorLabel.style.display = 'block';
}

/**
 * The function hides an error message element with a specified ID.
 * @param id - The parameter "id" is a string that represents the id attribute of an HTML element. This
 * function uses the id to get a reference to the HTML element and then sets its display style to
 * "none", effectively hiding it from view.
 */
function hideLoginErrorMessage(id) {
    const errorLabel = document.getElementById(id);
    errorLabel.style.display = 'none';
}

/**
 * The function shows a lock or a hide password button based on whether the password input field is
 * empty or not.
 */
function showLoginLock() {
    const passwordInput = document.getElementById('loginpassword');
    const passwordLock = document.getElementById('loginpasswordlock');

    if (passwordInput.value === '') {
        passwordLock.innerHTML = /*html*/ `
            <img id="lock" src="img/lock_logo.svg" alt="">
        `;
    } else {
        passwordLock.innerHTML = /*html*/ `
            <div class="hide-password" onclick="showPassword()" id="showpassword"></div>
        `;
    }
}

/**
 * The function shows the password input by changing its type to text and adding a button to hide the
 * password.
 */
function showPassword() {
    const passwordInput = document.getElementById('loginpassword');
    passwordInput.type = 'text';
    document.getElementById('loginpasswordlock').innerHTML = /*html*/ `
        <div class="show-password" onclick="hidePassword()" id="showpassword"></div>
    `;
}

/**
 * The function hides the password input field and replaces it with a lock icon that can be clicked to
 * reveal the password.
 */
function hidePassword() {
    const passwordInput = document.getElementById('loginpassword');
    passwordInput.type = 'password';
    document.getElementById('loginpasswordlock').innerHTML = /*html*/ `
        <div class="hide-password" onclick="showPassword()" id="showpassword"></div>
    `;
}

/**
 * The function logs in the user as a guest and saves their initials and username to local storage.
 */
async function logInAsGuest() {
    saveUserInitialsToLocalStorage("G");
    saveUserToLocalStorage('Guest');
}
/*********************************************************************************************************************/

/*********************************SIGN UP*********************************/
/**
 * The function clears the login section, hides the signup header and bottom section, and renders a
 * sign-up form.
 */
function singUpForm() {
    document.getElementById('login').innerHTML = '';
    document.getElementById('signupheader').classList.add('d-none');
    document.getElementById('login').classList.add('sign-up-height');
    document.getElementById('signupbottomsection').classList.add('d-none');
    renderSignUpForm();
}

/**
 * The function renders a sign-up form with input fields for name, email, and password, and a button to
 * submit the form.
 */
function renderSignUpForm() {
    document.getElementById('login').innerHTML = /*html*/ `
    <div class="back-btn">
        <img src="img/back_btn.svg" alt="" onclick="goBackToLogIn()">
    </div>
    <h1 class="sign-up-title">Sign Up</h1>
    <div class="log-in-border"></div>
    <div class="input-field user user-margin-top" onclick="focusInputField(this)">
        <input type="text" placeholder="Name" id="signupname">
        <img src="img/user.svg" alt="" class="user-img">
    </div>
    <div class="error-message-sign-up">
        <label id="nameError" style="display:none;"></label>
    </div>
    <div class="input-field user" onclick="focusInputField(this)">
        <input type="email" placeholder="Email" id="signupemail">
        <img src="img/email_logo.svg" alt="">
    </div>
    <div class="error-message-sign-up">
        <label id="emailError" style="display:none;"></label>
    </div>
    <div class="input-field user" onclick="focusInputField(this)">
        <input type="password" placeholder="Password" id="signuppassword" oninput="showSignUpLock()">
        <div class="password-lock" id="signuppasswordlock">
                <img id="lock" src="img/lock_logo.svg" alt="">
        </div>
    </div>
    <div class="error-message-sign-up">
        <label id="passwordError" style="display:none;"></label>
    </div>
    
    <button class="dark-btn sign-up-btn" type="submit" onclick="validateSignUpForm(event)">Sign up</button>
    `;
}

/**
 * Gets the value of the name input field and validates it against a regular expression.
 * @return {string} The value of the name input field.
 */
function getAndValidateName() {
    const nameValue = document.getElementById('signupname').value;
    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

    if (!nameRegex.test(nameValue)) {
        showSignUpErrorMessage('nameError', 'Please enter a valid name (first and last name).');
        return null;
    } else {
        hideSignUpErrorMessage('nameError');
        return nameValue;
    }
}

/**
 * Gets the value of the email input field and validates it against a regular expression.
 * @return {string} The value of the email input field.
 */
function getAndValidateEmail() {
    const emailValue = document.getElementById('signupemail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(emailValue)) {
        showSignUpErrorMessage('emailError', 'Please enter a valid email address.');
        return null;
    } else {
        hideSignUpErrorMessage('emailError');
        return emailValue;
    }
}

/**
 * Gets the value of the password input field and validates it against a regular expression.
 * @return {string} The value of the password input field.
 */
function getAndValidatePassword() {
    const passwordValue = document.getElementById('signuppassword').value;
    const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{8,64}$/;

    if (!passwordRegex.test(passwordValue)) {
        showSignUpErrorMessage('passwordError', 'Please enter a valid password (at least 8 characters and 1 number).');
        return null;
    } else {
        hideSignUpErrorMessage('passwordError');
        return passwordValue;
    }
}

/**
 * Validates the sign up form by calling the getAndValidateName(), getAndValidateEmail(), and getAndValidatePassword() functions.
 * If all inputs are valid, calls the signUp() function.
 */
function validateSignUpForm() {
    const name = getAndValidateName();
    const email = getAndValidateEmail();
    const password = getAndValidatePassword();

    if (name && email && password) {
        signUp();
    }
}

/**
 * Creates a new user account and saves the user data to the backend.
 * Also creates a new contact for the user and saves it to the backend.
 */
async function signUp() {
    // Get the input values and logged in user data
    const signUpName = document.getElementById('signupname').value;
    const signUpEmail = document.getElementById('signupemail').value;
    const signUpPassword = document.getElementById('signuppassword').value;
    const loggedInUsername = loadUserFromLocalStorage();

    // Split the name into first and last name
    const [name, surname] = signUpName.split(' ');

    // Create a new user object
    const newUser = {
        name: name,
        surname: surname,
        email: signUpEmail,
        password: signUpPassword
    };

    // Save the user data to the backend
    users.push(newUser);
    await saveSignedInUserToBackend(users);

    // Create a new contact object for the user
    const lastContactId = getNextContactId();
    const usedColors = contacts.map(contact => contact.profilecolor);
    const availableColors = ['#343a40', '#dc3545', '#007bff', '#28a745', '#6c757d', '#ffc107', '#7952b3', '#17a2b8', '#6f42c1'].filter(color => !usedColors.includes(color) && color !== '#FFFFFF');
    const profileColor = availableColors[Math.floor(Math.random() * availableColors.length)];
    const newContact = {
        'name': name,
        'surname': surname,
        'email': signUpEmail,
        'profilecolor': profileColor,
        'Initials': name[0].toUpperCase() + surname[0].toUpperCase(),
        'phonenumber': '',
        'contactid': lastContactId
    };

    // If the user is logged in, update the user's name in the header
    if (loggedInUsername) {
        const nameoflogedinuserElement = document.getElementById('nameoflogedinuser');
        if (nameoflogedinuserElement) {
            nameoflogedinuserElement.innerHTML = loggedInUsername;
        }
    }

    // Save the user's initials to local storage and load the logged in user
    saveUserInitialsToLocalStorage(name[0].toUpperCase() + surname[0].toUpperCase());
    loadLoggedInUser();

    // Save the new contact to the backend and reset the sign up form
    contacts.push(newContact);
    await saveContactstoBackend(contacts);
    document.getElementById('signupname').value = '';
    document.getElementById('signupemail').value = '';
    document.getElementById('signuppassword').value = '';

    // Show a confirmation popup and redirect to the login/sign up page
    showConfirmationPopup('signup');
    setTimeout(() => {
        window.location.href = "login_sign_up.html";
    }, 1500);
}


/**
 * Shows an error message for a sign up form input field by setting the message content and displaying it.
 * @param {string} id - The ID of the error label element.
 * @param {string} message - The error message to be displayed.
 */
function showSignUpErrorMessage(id, message) {
    const errorLabel = document.getElementById(id);
    errorLabel.innerHTML = message;
    errorLabel.style.display = 'block';
}

/**
 * Hides an error message for a sign up form input field by hiding the error label element.
 * @param {string} id - The ID of the error label element.
 */
function hideSignUpErrorMessage(id) {
    const errorLabel = document.getElementById(id);
    errorLabel.style.display = 'none';
}

/**
 * Shows or hides the password lock icon in the sign up form based on whether the password input field is empty or not.
 */
function showSignUpLock() {
    const passwordInput = document.getElementById('signuppassword');
    const passwordLock = document.getElementById('signuppasswordlock');

    if (passwordInput.value === '') {
        passwordLock.innerHTML = /*html*/ `
        <img id="lock" src="img/lock_logo.svg" alt="">
    `;
    } else {
        passwordLock.innerHTML = /*html*/ `
        <div class="hide-password" onclick="showSignUpPassword()" id="showsignuppassword"></div>
    `;
    }
}

/**
 * Shows the password input by changing the type of the password input field to "text".
 * Also updates the password lock icon to show a "hide password" button.
 */
function showSignUpPassword() {
    const passwordInput = document.getElementById('signuppassword');
    passwordInput.type = 'text';
    document.getElementById('signuppasswordlock').innerHTML = /*html*/ `
    <div class="show-password" onclick="hideSignUpPassword()" id="showsignuppassword"></div>
    `;
}

/**
 * Hides the password input by changing the type of the password input field to "password".
 * Also updates the password lock icon to show a "show password" button.
 */
function hideSignUpPassword() {
    const passwordInput = document.getElementById('signuppassword');
    passwordInput.type = 'password';
    document.getElementById('signuppasswordlock').innerHTML = /*html*/ `
    <div class="hide-password" onclick="showSignUpPassword()" id="showsignuppassword"></div>
    `;
}


/**
 * Resets the sign up form values.
 * @param {HTMLElement} signUpName The sign up name input element.
 * @param {HTMLElement} signUpEmail The sign up email input element.
 * @param {HTMLElement} signUpPassword The sign up password input element.
 */
function resetSignUpFormValues(signUpName, signUpEmail, signUpPassword) {
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
}

/**
 * Reverts the login element's content and classes to its initial state.
 */
function revertLoginElement() {
    document.getElementById('login').innerHTML = '';
    document.getElementById('login').classList.remove('sign-up-height');
}

/**
 * Reverts the sign up header and bottom section elements to their initial state.
 */
function revertSignUpElements() {
    document.getElementById('signupheader').classList.remove('d-none');
    document.getElementById('signupbottomsection').classList.remove('d-none');
}

/**
 * Returns the HTML template for the login form.
 * @returns {string} The HTML template for the login form.
 */
function getLoginFormTemplate() {
    return /*html*/ `
                <span class="log-in-title">Log in</span>
                <div class="log-in-border"></div>
                <div class="login-form">
                    <div class="input-field login-email" onclick="focusInputField(this)">
                        <input type="email" placeholder="Email" id="loginemail" required>
                        <img src="img/email_logo.svg" alt="">
                    </div>
                    <div class="error-message-login">
                        <label for="loginemail" id="emailError" style="display:none;"></label>
                    </div>
                    <div class="input-field login-password" onclick="focusInputField(this)">
                        <input type="password" placeholder="Password" id="loginpassword" oninput="showLoginLock()"
                            required>
                        <div class="password-lock" id="loginpasswordlock">
                            <img id="lock" src="img/lock_logo.svg" alt="">
                        </div>
                    </div>
                </div>
                <div class="error-message-login-password">
                    <label for="loginpassword" id="passwordError" style="display:none;"></label>
                </div>
                <div class="options">
                    <div class="remember-me-option">
                        <input type="checkbox" id="myCheckbox" name="myCheckbox" value="on" class="checkbox">
                        <span>Remember me</span>
                    </div>
                    <div class="forgot-pw-option" onclick="forgotMyPw()">
                        <a href="#">Forgot my password</a>
                    </div>
                </div>
                <div class="log-in-buttons">
                    <button class="dark-btn log-in-btn" onclick="validateLogin()">Log in</button>
                    <button class="transparent-btn guest-log-in-btn" onclick="window.location.href='summary.html'"
                        onclick="logInAsGuest()">Guest Log in</button>
                </div>
    `;
}

/**
 * Reverts the sign up form back to the login form.
 */
function goBackToLogIn() {
    const signUpName = document.getElementById('signupname');
    const signUpEmail = document.getElementById('signupemail');
    const signUpPassword = document.getElementById('signuppassword');

    resetSignUpFormValues(signUpName, signUpEmail, signUpPassword);
    revertLoginElement();
    revertSignUpElements();

    document.getElementById('login').innerHTML = getLoginFormTemplate();
}


/*********************************************************************************************************************/

/*********************************SIGN UP*********************************/
/**
 * The function hides login and signup elements and shows the forgot password element.
 */
function forgotMyPw() {
    document.getElementById('loginmain').classList.add('d-none');
    document.getElementById('signupheader').classList.add('d-none');
    document.getElementById('signupbottomsection').classList.add('d-none');
    document.getElementById('forgotmypw').classList.remove('d-none');
}

/**
 * The function redirects the user to the login/sign up page.
 */
function goBackToMainLogin() {
    window.location.href = "login_sign_up.html";
}
/*********************************************************************************************************************/