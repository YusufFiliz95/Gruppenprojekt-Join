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
    <form class="form-sign-up" action="">
    <div class="input-field user user-margin-top">
        <input type="text" placeholder="Name">
        <img src="img/user.svg" alt="" class="user-img">
    </div>
    <div class="input-field user">
        <input type="email" placeholder="Email">
        <img src="img/email_logo.svg" alt="">
    </div>
    <div class="input-field user">
        <input type="password" placeholder="Password" id="inputpassword" oninput="showLock()" required>
        <div class="password-lock" id="passwordlock">
                <img id="lock" src="img/lock_logo.svg" alt="">
        </div>
    </div>
    </form>
    <button class="dark-btn sign-up-btn">Sign up</button>
    `;
}

function goBackToLogIn(){
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
                    <input type="password" placeholder="Password" id="inputpassword" oninput="showLock()" required>
                    <div class="password-lock" id="passwordlock">
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