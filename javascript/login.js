function showLock() {
    const passwordInput = document.getElementById('inputpassword');
    const passwordLock = document.getElementById('passwordlock');

    if (passwordInput.value === '') {
        passwordLock.innerHTML = /*html*/ `
            <img id="lock" src="img/lock-logo.svg" alt="">
        `;
    } else {
        passwordLock.innerHTML = /*html*/ `
            <div class="hide-password" onclick="showPassword()" id="showpassword"></div>
        `;
    }
}

function showPassword() {
    const passwordInput = document.getElementById('inputpassword');
    passwordInput.type = 'text';
    document.getElementById('passwordlock').innerHTML = /*html*/ `
        <div class="show-password" onclick="hidePassword()" id="showpassword"></div>
    `;
}

function hidePassword() {
    const passwordInput = document.getElementById('inputpassword');
    passwordInput.type = 'password';
    document.getElementById('passwordlock').innerHTML = /*html*/ `
        <div class="hide-password" onclick="showPassword()" id="showpassword"></div>
    `;
}

function singUpForm() {
    document.getElementById('login').innerHTML = '';
    document.getElementById('signupheader').innerHTML = '';
    document.getElementById('login').classList.add('sign-up-height');
    document.getElementById('login').innerHTML = /*html*/ `
        <h1 class="sign-up-title">Sign Up</h1>
        <div class="log-in-border"></div>
        <div class="input-field user user-margin-top">
            <input type="text" placeholder="Name">
            <img src="img/user.svg" alt="" class="user-img">
        </div>
        <div class="input-field user">
            <input type="email" placeholder="Email">
            <img src="img/email-logo.svg" alt="">
        </div>
        <div class="input-field user">
            <input type="password" placeholder="Password" id="inputpassword" oninput="showLock()" required>
            <div class="password-lock" id="passwordlock">
                <img id="lock" src="img/lock-logo.svg" alt="">
            </div>
        </div>
        <button class="dark-btn sign-up-btn">Sign up</button>
    `;
}

function goBackToLogIn(){
    
}
