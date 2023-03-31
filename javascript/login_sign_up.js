

/*********************************LOG IN*********************************/
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

function showPassword() {
    const passwordInput = document.getElementById('loginpassword');
    passwordInput.type = 'text';
    document.getElementById('loginpasswordlock').innerHTML = /*html*/ `
        <div class="show-password" onclick="hidePassword()" id="showpassword"></div>
    `;
}

function hidePassword() {
    const passwordInput = document.getElementById('loginpassword');
    passwordInput.type = 'password';
    document.getElementById('loginpasswordlock').innerHTML = /*html*/ `
        <div class="hide-password" onclick="showPassword()" id="showpassword"></div>
    `;
}

async function logInAsGuest() {
    await backend.setItem('username', 'Guest');
}
/*********************************************************************************************************************/

/*********************************SIGN UP*********************************/
function showSignUpLock() {
    const passwordInput = document.getElementById('signuppassword');
    const passwordLock = document.getElementById('signuppasswordlock');

    if (passwordInput.value === '') {
        passwordLock.innerHTML = /*html*/ `
            <img id="lock" src="img/lock_logo.svg" alt="">
        `;
    } else {
        passwordLock.innerHTML = /*html*/ `
            <div class="hide-password" onclick="showSignUpPassword()" id="showpassword"></div>
        `;
    }
}

function showSignUpPassword() {
    const passwordInput = document.getElementById('signuppassword');
    passwordInput.type = 'text';
    document.getElementById('signuppasswordlock').innerHTML = /*html*/ `
        <div class="show-password" onclick="hideSignUpPassword()" id="showpassword"></div>
    `;
}

function hideSignUpPassword() {
    const passwordInput = document.getElementById('signuppassword');
    passwordInput.type = 'password';
    document.getElementById('signuppasswordlock').innerHTML = /*html*/ `
        <div class="hide-password" onclick="showSignUpPassword()" id="showpassword"></div>
    `;
}

function showSignUpErrorMessage(id, message) {
    const errorLabel = document.getElementById(id);
    errorLabel.innerHTML = message;
    errorLabel.style.display = 'block';
}

function hideSignUpErrorMessage(id) {
    const errorLabel = document.getElementById(id);
    errorLabel.style.display = 'none';
}


function validateSignUpForm(event) {
    const nameValue = document.getElementById('signupname').value;
    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

    const emailValue = document.getElementById('signupemail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordValue = document.getElementById('signuppassword').value;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d\w\W]{8,64}$/; // Adjust the regex according to the desired password format.

    let isValid = true;

    if (!nameRegex.test(nameValue)) {
        showSignUpErrorMessage('nameError', 'Please enter a valid name (first and last name).');
        isValid = false;
    } else {
        hideSignUpErrorMessage('nameError');
    }

    if (!emailRegex.test(emailValue)) {
        showSignUpErrorMessage('emailError', 'Please enter a valid email address.');
        isValid = false;
    } else {
        hideSignUpErrorMessage('emailError');
    }

    if (!passwordRegex.test(passwordValue)) {
        showSignUpErrorMessage('passwordError', 'Please enter a valid password (at least 8 characters, including at least 1 uppercase letter, 1 lowercase letter, and 1 number).');
        isValid = false;
    } else {
        hideSignUpErrorMessage('passwordError');
    }

    if (!isValid) {
        event.preventDefault();
    } else {
        signUp();
    }
}


function singUpForm() {
    document.getElementById('login').innerHTML = '';
    document.getElementById('signupheader').classList.add('d-none');
    document.getElementById('login').classList.add('sign-up-height');
    document.getElementById('signupbottomsection').classList.add('d-none');
    document.getElementById('login').innerHTML = /*html*/ `
    <div class="back-btn">
        <img src="img/back_btn.svg" alt="" onclick="goBackToLogIn()">
    </div>
    <h1 class="sign-up-title">Sign Up</h1>
    <div class="log-in-border"></div>
    <div class="input-field user user-margin-top">
        <input type="text" placeholder="Name" id="signupname">
        <img src="img/user.svg" alt="" class="user-img">
    </div>
    <span id="nameError" class="error-message" style="display:none;"></span>
    
    <div class="input-field user">
        <input type="email" placeholder="Email" id="signupemail">
        <img src="img/email_logo.svg" alt="">
    </div>
    <span id="emailError" class="error-message" style="display:none;"></span>
    
    <div class="input-field user">
        <input type="password" placeholder="Password" id="signuppassword">
        <div class="password-lock" id="signuppasswordlock">
                <img id="lock" src="img/lock_logo.svg" alt="">
        </div>
    </div>
    <span id="passwordError" class="error-message" style="display:none;"></span>
    
    <button class="dark-btn sign-up-btn" type="submit" onclick="validateSignUpForm(event)">Sign up</button>
    `;
}

function goBackToLogIn() {
    const signUpName = document.getElementById('signupname');
    const signUpEmail = document.getElementById('signupemail');
    const signUpPassword = document.getElementById('signuppassword');
    signUpName.value = '';
    signUpEmail.value = '';
    signUpPassword.value = '';
    document.getElementById('login').innerHTML = '';
    document.getElementById('login').classList.remove('sign-up-height');
    document.getElementById('signupheader').classList.remove('d-none');
    document.getElementById('signupbottomsection').classList.remove('d-none');
    document.getElementById('login').innerHTML = /*html*/ `
                    <span class="log-in-title">Log in</span>
                <div class="log-in-border"></div>
                <div class="input-field email">
                    <input type="email" placeholder="Email">
                    <img src="img/email_logo.svg" alt="">
                </div>
                <div class="input-field">
                    <input type="password" placeholder="Password" id="loginpassword" oninput="showLoginLock()" required>
                    <div class="password-lock" id="loginpasswordlock">
                        <img id="lock" src="img/lock_logo.svg" alt="">
                    </div>
                </div>
                <div class="options">
                    <div class="remember-me-option">
                        <input type="checkbox" id="myCheckbox" name="myCheckbox" value="on" class="checkbox">
                        <span>Remember me</span>
                    </div>
                    <div class="forgot-pw-option">
                        <a href="#">Forgot my password</a>
                    </div>
                </div>
                <div class="log-in-buttons">
                    <button class="dark-btn log-in-btn">Log in</button>
                    <button class="transparent-btn guest-log-in-btn">Guest Log in</button>
                </div>
            </div>
        </div>
    `;
}

function signUp() {
    const signUpName = document.getElementById('signupname').value;
    const signUpEmail = document.getElementById('signupemail').value;
    const signUpPassword = document.getElementById('signuppassword').value;

    // Check if all fields are filled
    if (!signUpName || !signUpEmail || !signUpPassword) {
        return;
    }

    // Check if email is already registered
    for (let user of users) {
        if (user.email === signUpEmail) {
            alert('This email is already registered.');
            return;
        }
    }

    // Save user data in the array
    const user = {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword, // Caution! Saving passwords in plain text is insecure. Use a secure hashing library before saving passwords.
    };

    users.push(user);
    alert('Registration successful!');
    // Perform redirection or actions after successful registration
}



/*********************************************************************************************************************/