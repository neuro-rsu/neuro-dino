export { FactoryForm };

function FactoryForm() {
    const htmlTemplate = `
        <div id="sittings-form" class="modal-form">
            <form class="modal-form-content animate" method="post" id="form-settings">
                <div class="form-header">
                    <span id="close2" class="close" title="Close Modal">&times;</span>
                </div>

                <div class="form-body">
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required>

                    <button type="submit">Login</button>

                    <div class="checkboxes-settings">
                        <label><input type="checkbox" checked="checked" name="cloud">Облака</label>
                        <label><input type="checkbox" checked="checked" name="night">Ночь</label>
                        <label><input type="checkbox" checked="checked" name="horizon">Горизонт</label>
                        <label><input type="checkbox" checked="checked" name="stars">Звезды</label>
                        <label><input type="checkbox" checked="checked" name="ground">Кочки</label>
                        <label><input type="checkbox" checked="checked" name="moon">Луна</label>
                        <label><input type="checkbox" checked="checked" name="ground">Земля</label>
                        <label><input type="checkbox" checked="checked" name="pterodactyl">Птеродактиль</label>
                        <label><input type="checkbox" checked="checked" name="big-cactus">Большой кактус</label>
                        <label><input type="checkbox" checked="checked" name="small-cactus">Маленький кактус</label>
                        <label><input type="checkbox" checked="checked" name="two-cactus">Два кактуса</label>
                        <label><input type="checkbox" checked="checked" name="three-cactus">Три кактуса</label>
                    </div>
                </div>

                <div class="form-footer">
                    <div class="footer-buttons">
                        <button type="button" id="cancel" class="footer-button cancel-button">Cancel</button>
                        <button type="button" id="save" class="footer-button">Save</button>
                        <button type="button" id="delete" class="footer-button">Delete</button>
                        <button type="button" id="close1" class="footer-button">Закрыть</button>
                    </div>
                    <!-- <span class="psw">Forgot <a href="#">password?</a></span> -->
                </div>
            </form>
        </div>
    `;

    const style = `

    `;

    class SettingsForm extends HTMLElement {

        constructor () {
            super();

            this.attachShadow({mode: 'open'});

            const template = document.createElement('template');
            template.innerHTML = htmlTemplate;
            this.shadowRoot.append(template.content.cloneNode(true));

        }

        settingsFormOpen() {
            this.style.display = "block";
            console.log('1');
        }
    }

    function regForm() {
        if (window.customElements.get('settings-form') !== undefined)
            return;
        customElements.define("settings-form", SettingsForm);
    }

    regForm();
}

FactoryForm();
