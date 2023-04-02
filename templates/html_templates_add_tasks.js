function greateHtmlRenderCategory(i) {
    return /*html*/`
    <div class="category">
        <div onclick="addToInput(${i}), toggleMenuCategory('toggle-1')" class="category-name">
            <span >${categorys[i]['name']}</span>
            <div class="color-circle" style="background-color: ${'' + categorys[i]['color']}"></div>
        </div>
        <img onclick="deleteCategory(${i})"src="./img/black-x.svg" >
    </div>`
}


function greateHtmladdNewCategoryToInput(categoryInput) {
    return /*html*/`
    <div class="category">
        <div class="category-name">
            <span id="selected-category-name">${categoryInput}</span>
            <div class="color-circle" style="background-color: ${'' + currentColor}"></div>
        </div>
    </div>`
}

function greateHtmlAddInput(selectedCategoryColor, selectedCategoryName) {
    return /*html*/`
    <div class="category">
        <div class="category-name">
            <span id="selected-category-name">${selectedCategoryName}</span>
            <div class="color-circle" style="background-color: ${'' + selectedCategoryColor}"></div>
        </div>
    </div>`
}


function greateHtmlRenderAddContactsOverlay() {
    return /*html*/` <div class="add-new-contact-section d-none" id="newcontactformsection" onclick="closeForm()">
    <div class="add-new-contact-container" onclick="doNotClose(event)">
        <div class="add-new-contact-headline">
            <div class="add-new-contact-headline-height">
                <img src="img/join_logo_menu.svg" alt="">
                <h1>Add contact</h1>
                <p>Tasks are better with a team!</p>
                <div class="add-contact-border"></div>
            </div>
        </div>
        <div class="add-new-contact-form-section">
            <div class="empty-profile-picutre">
                <img src="img/empty_profile_picture.svg" alt="">
            </div>
            <div class="add-new-contact-form">
                <div class="close-form-btn">
                    <img src="img/close_btn.svg" alt="" onclick="closeForm()">
                </div>
                <div>
                    <form action="" class="input-form">
                        <div class="input-field add-contact" onclick="focusInputField(this)">
                            <input type="text" placeholder="Name" id="newContactName" required>
                            <img src="img/person_icon.svg" alt="">
                        </div>
                        <div class="error-message">
                            <label for="newContactName" id="nameError" style="display:none;"></label>
                        </div>
                        <div class="input-field add-contact" onclick="focusInputField(this)">
                            <input type="email" placeholder="Email" id="newContactEmail"
                                pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$" required>
                            <img src="img/email_logo.svg" alt="">
                        </div>
                        <div class="error-message">
                            <label for="newContactEmail" id="emailError" style="display:none;"></label>
                        </div>
                        <div class="input-field add-contact" onclick="focusInputField(this)">
                            <input type="number" placeholder="Phone" id="newContactPhone" step="any" required>
                            <img src="img/phone_icon.svg" alt="">
                        </div>
                        <div class="error-message">
                            <label for="newContactPhone" id="phoneError" style="display:none;"></label>
                        </div>
                    </form>
                </div>
                <div class="form-buttons">
                    <div class="transparent-btn cancel-btn" onclick="closeForm()">
                        <p>Cancel</p>
                        <div class="cancel-btn-img"></div>
                    </div>
                    <div class="dark-btn create-contact-btn"
                        onclick="validateContact(), loadAndRenderContacts()" type="submit">
                        <p>Create Contact</p>
                        <img src="img/tick_white.svg">
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<!-------------------------------------------------->
<!-- confirmation-popup -->
<div class="confirmation-popup">
    <p id="confirmationpopuptext"></p>
</div>
`
}