

function focusInputField(container) {
    const input = container.querySelector('input');
    input.focus();
}

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


function showSignUpErrorMessage(id, message) {
    const errorLabel = document.getElementById(id);
    errorLabel.innerHTML = message;
    errorLabel.style.display = 'block';
}

function hideSignUpErrorMessage(id) {
    const errorLabel = document.getElementById(id);
    errorLabel.style.display = 'none';
}


function validateSignUpForm() {
    const nameValue = document.getElementById('signupname').value;
    const nameRegex = /^[a-zA-Z]+\s[a-zA-Z]+$/;

    const emailValue = document.getElementById('signupemail').value;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    const passwordValue = document.getElementById('signuppassword').value;
    const passwordRegex = /^(?=.*\d)[a-zA-Z0-9]{8,64}$/;

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
        showSignUpErrorMessage('passwordError', 'Please enter a valid password (at least 8 characters and 1 number).');
        isValid = false;
    } else {
        hideSignUpErrorMessage('passwordError');
    }

    if (isValid) {
        signUp();
    }

}

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

function showSignUpPassword() {
    const passwordInput = document.getElementById('signuppassword');
    passwordInput.type = 'text';
    document.getElementById('signuppasswordlock').innerHTML = /*html*/ `
        <div class="show-password" onclick="hideSignUpPassword()" id="showsignuppassword"></div>
    `;
}

function hideSignUpPassword() {
    const passwordInput = document.getElementById('signuppassword');
    passwordInput.type = 'password';
    document.getElementById('signuppasswordlock').innerHTML = /*html*/ `
        <div class="hide-password" onclick="showSignUpPassword()" id="showsignuppassword"></div>
    `;
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
                <div class="input-field email" onclick="focusInputField(this)">
                    <input type="email" placeholder="Email">
                    <img src="img/email_logo.svg" alt="">
                </div>
                <div class="input-field" onclick="focusInputField(this)">
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
                    <button class="transparent-btn guest-log-in-btn" onclick="location.href = 'summary.html'">Guest Log in</button>
                </div>
            </div>
        </div>
    `;
}

async function signUp() {
    const signUpName = document.getElementById('signupname').value;
    const signUpEmail = document.getElementById('signupemail').value;
    const signUpPassword = document.getElementById('signuppassword').value;

    // Check if all fields are filled
    if (!signUpName || !signUpEmail || !signUpPassword) {
        return;
    }

    // Save user data in the array
    await loadSignedInUserfromBackend();
    const newUser = {
        name: signUpName,
        email: signUpEmail,
        password: signUpPassword
    };

    users.push(newUser);        
    await saveSignedInUserToBackend();
    await loadSignedInUserfromBackend();

}



/*********************************************************************************************************************/