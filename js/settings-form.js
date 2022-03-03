import {settings} from './settings.js';

import {compactDb, deleteDb} from './dino-brain.js';

export { FactoryForm };

function FactoryForm() {
    const formHTML = `
        <div id="form" class="modal-form" style="display: none">
            <form class="modal-form-content animate" method="post" id="form-settings">
                <div class="form-header">
                    <ul class="form-tabs">
                        <li class="form-tab">
                            <a href="#managers" class="form-tab-link">Managers</a>
                        <!-- Omitting the end tag is valid HTML and removes the space in-between inline blocks. -->
                        <li class="form-tab">
                            <a href="#designers" class="form-tab-link">Designers</a>
                        <li class="form-tab">
                            <a href="#developers" class="form-tab-link">Developers</a>
                    </ul>
                    <span id="close" class="close" title="Close Modal">&times;</span>
                </div>

                <div class="form-body">
                <ol class="widget-list" id="designers">
      <li>
        <a class="widget-list-link">
          <img src="http://www.gravatar.com/avatar/5?f=y&amp;s=64&amp;d=identicon">
          Designer #1 <span>481 followers</span>
        </a>
      </li>
      <li>
        <a class="widget-list-link">
          <img src="http://www.gravatar.com/avatar/5?f=y&amp;s=64&amp;d=identicon">
          Designer #2 <span>5162 followers</span>
        </a>
      </li>
      <li>
        <a class="widget-list-link">
          <img src="http://www.gravatar.com/avatar/5?f=y&amp;s=64&amp;d=identicon">
          Designer #3 <span>342 followers</span>
        </a>
      </li>
    </ol>

    <ol class="widget-list" id="developers">
      <li>
        <a class="widget-list-link">
          <img src="http://www.gravatar.com/avatar/6?f=y&amp;s=64&amp;d=identicon">
          Developer #1 <span>481 followers</span>
        </a>
      </li>
      <li>
        <a class="widget-list-link">
          <img src="http://www.gravatar.com/avatar/6?f=y&amp;s=64&amp;d=identicon">
          Developer #2 <span>5162 followers</span>
        </a>
      </li>
      <li>
        <a class="widget-list-link">
          <img src="http://www.gravatar.com/avatar/6?f=y&amp;s=64&amp;d=identicon">
          Developer #3 <span>342 followers</span>
        </a>
      </li>
    </ol>
                    <label for="uname"><b>Username</b></label>
                    <input type="text" placeholder="Enter Username" name="uname" required>

                    <label for="psw"><b>Password</b></label>
                    <input type="password" placeholder="Enter Password" name="psw" required>

                    <button type="submit">Login</button>

                    <div class="checkboxes-settings">
                        <label><input type="checkbox" checked="checked" name="cloud">Облака</label>
                        <label><input type="checkbox" checked="checked" name="night">Ночь</label>
                        <label><input type="checkbox" checked="checked" name="horizon">Горизонт</label>
                        <label><input type="checkbox" checked="checked" name="star">Звезды</label>
                        <label><input type="checkbox" checked="checked" name="bumps">Кочки</label>
                        <label><input type="checkbox" checked="checked" name="moon">Луна</label>
                        <label><input type="checkbox" checked="checked" name="ground">Земля</label>
                        <label><input type="checkbox" checked="checked" name="pterodactyl">Птеродактиль</label>
                        <label><input type="checkbox" checked="checked" name="cactus">Большой кактус</label>
                        <label><input type="checkbox" checked="checked" name="small-cactus">Маленький кактус</label>
                        <label><input type="checkbox" checked="checked" name="two-cactus">Два кактуса</label>
                        <label><input type="checkbox" checked="checked" name="three-cactus">Три кактуса</label>
                    </div>
                </div>

                <div class="form-footer">
                    <div class="footer-buttons">
                        <button type="button" id="cancel" class="footer-button cancel-button">Cancel</button>
                        <button type="button" id="delete" class="footer-button">Удалить</button>
                        <button type="button" id="compact" class="footer-button">Сжать</button>
                        <button type="button" id="default" class="footer-button">По умолчанию</button>
                        <button type="button" id="save" class="footer-button">Сохранить</button>
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
            max-width: 800px;
            border-radius: 10px;
        }

        .form-tabs {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            padding: 9px 12px 0;
            margin: 0;
            text-align: left;
            direction: rtl;
            background: #f5f5f5;
            border-bottom: 1px solid #ddd;
            border-radius: 3px 3px 0 0;
        }

        .form-tab,
        .form-list:target:first-of-type ~ .form-tabs > .form-tab:first-child ~ .form-tab,
        .form-list:target:nth-of-type(2) ~ .form-tabs > .form-tab:nth-child(2) ~ .form-tab,
        .form-list:target:last-of-type ~ .form-tabs > .form-tab:last-child ~ .form-tab {
            position: relative;
            display: inline-block;
            vertical-align: top;
            margin-top: 3px;
            line-height: 36px;
            font-weight: normal;
            color: #999;
            background: #fcfcfc;
            border: solid #ddd;
            border-width: 1px 1px 0;
            border-radius: 5px 5px 0 0;
            padding-bottom: 0;
            bottom: auto;
        }

        .form-tab > .form-tab-link,
        .form-list:target:first-of-type ~ .form-tabs > .form-tab:first-child ~ .form-tab > .form-tab-link,
        .form-list:target:nth-of-type(2) ~ .form-tabs > .form-tab:nth-child(2) ~ .form-tab > .form-tab-link,
        .form-list:target:last-of-type ~ .form-tabs > .form-tab:last-child ~ .form-tab > .form-tab-link {
            margin: 0;
            border-top: 0;
        }

        .form-tab + .form-tab {
            margin-right: -1px;
        }

        .form-tab:last-child,
        .form-list:target:first-of-type ~ .form-tabs > .form-tab:first-child,
        .form-list:target:nth-of-type(2) ~ .form-tabs > .form-tab:nth-child(2),
        .form-list:target:last-of-type ~ .form-tabs > .form-tab:last-child {
            bottom: -1px;
            margin-top: 0;
            padding-bottom: 2px;
            line-height: 34px;
            font-weight: bold;
            color: #555;
            background: white;
            border-top: 0;
        }

        .form-tab:last-child > .form-tab-link,
        .form-list:target:first-of-type ~ .form-tabs > .form-tab:first-child > .form-tab-link,
        .form-list:target:nth-of-type(2) ~ .form-tabs > .form-tab:nth-child(2) > .form-tab-link,
        .form-list:target:last-of-type ~ .form-tabs > .form-tab:last-child > .form-tab-link {
            margin: 0 -1px;
            border-top: 4px solid #4cc8f1;
        }

        .form-tab-link {
            display: block;
            min-width: 60px;
            padding: 0 15px;
            color: inherit;
            text-align: center;
            text-decoration: none;
            border-radius: 4px 4px 0 0;
        }

        .form-list {
            display: none;
            padding-top: 50px;
        }

        .form-list > li + li {
            border-top: 1px solid #e8e8e8;
        }

        .form-list:last-of-type {
            display: block;
        }

        .form-list:target {
            display: block;
        }

        .form-list:target ~ .form-list {
            display: none;
        }

        .form-list-link {
            display: block;
            line-height: 18px;
            padding: 10px 12px;
            font-weight: bold;
            color: #555;
            text-decoration: none;
            cursor: pointer;
        }

        .form-list-link:hover {
            background: #f7f7f7;
        }

        li:last-child > .form-list-link {
            border-radius: 0 0 3px 3px;
        }

        .form-list-link > img {
            float: left;
            width: 32px;
            height: 32px;
            margin: 2px 12px 0 0;
        }

        .form-list-link > span {
            display: block;
            font-size: 11px;
            font-weight: normal;
            color: #999;
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
            this.shadowRoot.getElementById('cancel').onclick = this.cancel.bind(this);
            this.shadowRoot.getElementById('save').onclick = this.save.bind(this);
            this.shadowRoot.getElementById('delete').onclick = this.delete.bind(this);
            this.shadowRoot.getElementById('compact').onclick = this.compact.bind(this);
            this.shadowRoot.getElementById('close').onclick = this.close.bind(this);
            this.shadowRoot.getElementById('default').onclick = this.default.bind(this);
        }

        static pdb = new PouchDB('settings')

        saveSettings() {

        }

        getSettings() {

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
            const form = this.shadowRoot.getElementById('form-settings');
            form.cloud.checked = !settings.cloud.hidden;
            form.horizon.checked = !settings.horizon.hidden;
            form.cactus.checked = !settings.cactus.hidden;
            form.ground.checked = !settings.ground.hidden;
            form.bumps.checked = !settings.bumps.hidden;
            form.pterodactyl.checked = !settings.pterodactyl.hidden;
            form.moon.checked = !settings.moon.hidden;
            form.star.checked = !settings.star.hidden;
            form.night.checked = !settings.night.hidden;
            this.form.style.display = "block";
        }

        close() {
            this.form.style.display = "none";
        }

        cancel() {
            this.form.style.display = "none";
        }

        save() {
            const form = this.shadowRoot.getElementById('form-settings');
            settings.cloud.hidden = !form.cloud.checked;
            settings.horizon.hidden = !form.horizon.checked;
            settings.horizon.hidden ? this.hideHorizon() : this.showHorizon();
            // if (settings.horizon.hidden) {
            //     hideHorizon();
            // }
            // else {
            //     showHorizon();
            // }
            settings.cactus.hidden = !form.cactus.checked;
            settings.ground.hidden = !form.ground.checked;
            settings.bumps.hidden = !form.bumps.checked;
            settings.pterodactyl.hidden = !form.pterodactyl.checked;
            settings.moon.hidden = !form.moon.checked;
            settings.star.hidden = !form.star.checked;
            settings.night.hidden = !form.night.checked;
            this.form.style.display = "none";
        }

        default() {
            defaultSettings
            const form = this.shadowRoot.getElementById('form-settings');
            form.cloud.checked = !settings.cloud.hidden;
            form.horizon.checked = !settings.horizon.hidden;
            form.cactus.checked = !settings.cactus.hidden;
            form.ground.checked = !settings.ground.hidden;
            form.bumps.checked = !settings.bumps.hidden;
            form.pterodactyl.checked = !settings.pterodactyl.hidden;
            form.moon.checked = !settings.moon.hidden;
            form.star.checked = !settings.star.hidden;
            form.night.checked = !settings.night.hidden;
            this.form.style.display = "block";
        }

        delete() {
            deleteDb();
        }

        compact() {
            compactDb();
        }

        hideHorizon() {
            const horizon = document.querySelector('.horizon');
            horizon.style.display = 'none';
        }

        showHorizon(){
            const horizon = document.querySelector('.horizon');
            horizon.style.display = 'block';
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
