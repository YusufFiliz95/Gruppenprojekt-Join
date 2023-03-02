function showLock() {
    const passwordInput = document.getElementById('inputpassword');
    const passwordLock = document.getElementById('passwordlock');

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
