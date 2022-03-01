export { FactoryForm };

function FactoryForm() {
    const formHTML = `
        <div id="form" class="modal-form" style="display: none">
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

    const formStyle = `
        /* Full-width input fields */
        input[type="text"],
        input[type="password"] {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }

        /* Set a style for all buttons */
        button {
            background-color: #04aa6d;
            color: white;
            padding: 14px 20px;
            margin: 8px 0;
            border: none;
            cursor: pointer;
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
        }

        button:hover {
            opacity: 0.8;
        }

        .footer-button {
            width: auto;
            flex: none;
            padding: 10px 18px;
            margin: 4px;
            background-color: #04aa6d;
        }

        .footer-buttons {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
        }

        /* Extra styles for the cancel button */
        .checkboxes-settings {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            justify-content: start;
        }

        .checkboxes-settings label{
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }


        /* Extra styles for the cancel button */
        .cancel-button {
            margin-right: auto;
            background-color: #f44336;
        }

        /* Center the image and position the close button */
        .form-header {
            text-align: center;
            padding: 24px 0 16px 0;
            border-radius: 10px 10px 0 0;
            position: relative;
            background-color: #f1f1f1;
        }

        .form-body {
            padding: 16px;
        }

        .form-footer {
            padding: 16px;
            border-radius: 0 0 10px 10px;
            background-color: #f1f1f1;
            overflow: hidden;
        }

        span.psw {
            float: right;
            padding-top: 16px;
        }

        /* The Modal (background) */
        .modal-form {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            z-index: 10000; /* Sit on top */
            left: 0;
            top: 0;
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0, 0, 0); /* Fallback color */
            background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
            padding-top: 60px;
        }

        /* Modal Content/Box */
        .modal-form-content {
            background-color: #fefefe;
            margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
            border: 1px solid #888;
            width: 80%; /* Could be more or less, depending on screen size */
            border-radius: 10px;
        }

        /* The Close Button (x) */
        .close {
            position: absolute;
            right: 20px;
            top: 0;
            color: #000;
            font-size: 35px;
            font-weight: bold;
        }

        .title {
            position: absolute;
            right: 20px;
            top: 0;
            color: #000;
            font-size: 35px;
            font-weight: bold;
        }

        .close:hover,
        .close:focus {
            color: red;
            cursor: pointer;
        }

        /* Add Zoom Animation */
        .animate {
            -webkit-animation: animatezoom 0.6s;
            animation: animatezoom 0.6s;
        }

        @-webkit-keyframes animatezoom {
            from {
                -webkit-transform: scale(0);
            }
            to {
                -webkit-transform: scale(1);
            }
        }

        @keyframes animatezoom {
            from {
                transform: scale(0);
            }
            to {
                transform: scale(1);
            }
        }

        /* Change styles for span and cancel button on extra small screens */
        @media screen and (max-width: 300px) {
            span.psw {
                display: block;
                float: none;
            }
            .footer-button {
                width: 100%;
            }
        }

        @media screen and (max-width: 400px) {
            .checkboxes-settings label{
                width: 100%;
            }
        }
    `;

    class SettingsForm extends HTMLElement {

        static get observedAttributes() {
            return ['show'];
        }

        constructor () {
            super();

            this.attachShadow({mode: 'open'});

            const template = document.createElement('template');
            template.innerHTML = formHTML;
            this.shadowRoot.append(template.content.cloneNode(true));

            let style = document.createElement('style');
            style.textContent = formStyle;
            this.shadowRoot.append(style);

        }

        attributeChangedCallback(name, oldValue, newValue) {
            // if (name === "show") {
            //     if (oldValue === null) {
            //         this.show();
            //     }
            //     else {
            //         this.close();
            //     }
            // }
        }

        get form() {
            return this.shadowRoot.getElementById("form");
        }

        show() {
            this.form.style.display = "block";
        }

        close() {
            this.form.style.display = "none";
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
