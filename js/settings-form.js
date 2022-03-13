import {settings, defaultSettings} from './settings.js';

import {factoryModalDialog} from './modal-dialog.js';

import {compactDb, deleteDb} from './dino-brain.js';

export { FactoryForm };

function FactoryForm() {
    const formHTML = `
        <div id="form-background" class="form-background">
            <modal-dialog></modal-dialog>
            <form class="form animate" method="post" id="form">
                <div class="form-header">
                    <div class="form-tabs noselect">
                        <div class="form-tab selected">
                            <span id="lessons-tab" class="form-tab-link noselect">Уроки</span>
                        </div>
                        <div class="form-tab">
                            <span id="settings-tab" class="form-tab-link noselect">Параметры</span>
                        </div>
                        <div class="form-tab">
                            <span id="top-distance-tab" class="form-tab-link noselect">Расположение</span>
                        </div>
                        <div class="form-tab">
                            <span id="db-tab" class="form-tab-link noselect">База данных</span>
                        </div>
                        <div class="form-tab">
                            <span id="options-tab" class="form-tab-link noselect">Настройки</span>
                        </div>
                    </div>
                    <span id="close" class="close-button noselect" title="Закрыть">&times;</span>
                </div>

                <div class="form-body">
                    <div id="lessons-tab-section" class="form-tab-section selected">
                        <label for="lesson" class="noselect"><b>Урок</b></label>
                        <div name="lesson" class="lesson">
                            <input type="text" placeholder="Номер урока" name="lessonnumber" min="1" required>
                            <input type="text" placeholder="Название урока" name="lessonname" required>
                        </div>
                        <label for="topic" class="noselect"><b>Тема урока</b></label>
                        <div name="topic" class="topic">
                            <input type="text" placeholder="Номер темы" name="topicnumber" min="1" required>
                            <input type="text" placeholder="Название темы" name="topicname" required>
                        </div>
                        <label for="topology" class="noselect"><b>Топология</b></label>
                        <input type="text" placeholder="Например, 1-2" name="topology" required>
                        <label for="populationCount" class="noselect"><b>Размер популяции</b></label>
                        <input type="number" placeholder="Введите размер популяции" name="populationCount" min="1" required>
                    </div>

                    <div id="settings-tab-section" class="form-tab-section">
                        <div class="checkboxes-settings">
                            <label class="noselect"><input type="checkbox" checked="checked" name="cloud">Облака</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="night">Ночь</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="horizon">Горизонт</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="star">Звезды</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="bumps">Кочки</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="moon">Луна</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="ground">Земля</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="pterodactyl">Птеродактиль</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="cactus">Большой кактус</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="small-cactus">Маленький кактус</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="two-cactus">Два кактуса</label>
                            <label class="noselect"><input type="checkbox" checked="checked" name="three-cactus">Три кактуса</label>
                        </div>
                    </div>

                    <div id="top-distance-tab-section" class="form-tab-section">
                        <div class="radioboxes-settings">
                            <label class="noselect"><input type="radio" name="radio-setting" value="cloud">Облака</label>
                            <label class="noselect"><input type="radio" name="radio-setting" value="night">Ночь</label>
                            <label class="noselect"><input type="radio" name="radio-setting" value="star">Звезды</label>
                            <label class="noselect"><input type="radio" name="radio-setting" value="bumps">Кочки</label>
                            <label class="noselect"><input type="radio" name="radio-setting" value="moon">Луна</label>
                            <label class="noselect"><input type="radio" name="radio-setting" value="ground">Земля</label>
                            <label class="noselect"><input type="radio" name="radio-setting" value="pterodactyl">Птеродактиль</label>
                            <label class="noselect"><input type="radio" name="radio-setting" value="bigCactus">Большой кактус</label>
                            <label class="noselect"><input type="radio" name="radio-setting" value="cactus">Маленький кактус</label>
                        </div>

                        <label for="top-distance" class="noselect"><b>Расстояние между</b></label>
                        <div name="distance-group" class="top-distance">
                            <input type="text" placeholder="Минимальное" name="distance-min" min="0" required>
                            <input type="text" placeholder="Максимальное" name="distance-max" min="0" required>
                        </div>

                        <label for="lesson" class="noselect"><b>Высота</b></label>
                        <div name="top-group" class="top-distance">
                            <input type="text" placeholder="Минимальная" name="top-min" min="0" required>
                            <input type="text" placeholder="Максимальная" name="top-max" min="0" required>
                        </div>
                    </div>

                    <div id="db-tab-section" class="form-tab-section">
                        <label for="uname"><b>Username</b></label>
                        <input type="text" placeholder="Enter Username" name="uname" required>

                        <label for="psw"><b>Password</b></label>
                        <input type="password" placeholder="Enter Password" name="psw" required>

                        <button type="submit">Login</button>
                    </div>

                    <div id="options-tab-section" class="form-tab-section">
                        <label class="noselect"><input type="checkbox" name="theme">Темная</label>
                    </div>
                </div>

                <div class="form-footer noselect">
                    <div id="lessons-tab-buttons" class="footer-buttons-section selected">
                        <div class="footer-buttons">
                            <button type="button" name="cancel" class="footer-button cancel-button">Отменить</button>
                            <button type="button" name="default" class="footer-button">По умолчанию</button>
                            <button type="button" name="restore" class="footer-button">Восстановить</button>
                            <button type="button" name="save" class="footer-button">Сохранить</button>
                            <button type="button" name="apply" class="footer-button">Применить</button>
                            <button type="button" name="close" class="footer-button">Закрыть</button>
                        </div>
                        <!-- <span class="psw">Forgot <a href="#">password?</a></span> -->
                    </div>
                    <div id="settings-tab-buttons" class="footer-buttons-section">
                        <div class="footer-buttons">
                            <button type="button" name="cancel" class="footer-button cancel-button">Отменить</button>
                            <button type="button" name="default" class="footer-button">По умолчанию</button>
                            <button type="button" name="restore" class="footer-button">Восстановить</button>
                            <button type="button" name="save" class="footer-button">Сохранить</button>
                            <button type="button" name="apply" class="footer-button">Применить</button>
                            <button type="button" name="close" class="footer-button">Закрыть</button>
                        </div>
                        <!-- <span class="psw">Forgot <a href="#">password?</a></span> -->
                    </div>
                    <div id="top-distance-tab-buttons" class="footer-buttons-section">
                        <div class="footer-buttons">
                            <button type="button" name="cancel" class="footer-button cancel-button">Отменить</button>
                            <button type="button" name="default" class="footer-button">По умолчанию</button>
                            <button type="button" name="restore" class="footer-button">Восстановить</button>
                            <button type="button" name="save" class="footer-button">Сохранить</button>
                            <button type="button" name="apply" class="footer-button">Применить</button>
                            <button type="button" name="close" class="footer-button">Закрыть</button>
                        </div>
                        <!-- <span class="psw">Forgot <a href="#">password?</a></span> -->
                    </div>
                    <div id="db-tab-buttons" class="footer-buttons-section">
                        <div class="footer-buttons">
                            <button type="button" name="cancel" class="footer-button cancel-button">Отменить</button>
                            <button type="button" id="delete" class="footer-button">Удалить</button>
                            <button type="button" id="compact" class="footer-button">Сжать</button>
                            <button type="button" id="default" class="footer-button">По умолчанию</button>
                            <button type="button" id="save" class="footer-button">Сохранить</button>
                        </div>
                        <!-- <span class="psw">Forgot <a href="#">password?</a></span> -->
                    </div>
                    <div id="options-tab-buttons" class="footer-buttons-section">
                        <div class="footer-buttons">
                            <button type="button" name="cancel" class="footer-button cancel-button">Отменить</button>
                            <button type="button" name="default" class="footer-button">По умолчанию</button>
                            <button type="button" name="restore" class="footer-button">Восстановить</button>
                            <button type="button" name="save" class="footer-button">Сохранить</button>
                            <button type="button" name="apply" class="footer-button">Применить</button>
                            <button type="button" name="close" class="footer-button">Закрыть</button>

                        </div>
                    </div>
                </div>
            </form>
        </div>
    `;

    const formStyle = `
        /* The Modal (background) */
        .form-background {
            display: none; /* Hidden by default */
            position: fixed; /* Stay in place */
            left: 0;
            top: 0;
            z-index: 10000; /* Sit on top */
            width: 100%; /* Full width */
            height: 100%; /* Full height */
            padding-top: 60px;
            overflow: auto; /* Enable scroll if needed */
            background-color: rgb(0, 0, 0); /* Fallback color */
            background-color: rgba(0, 0, 0, 0.4); /* Black w/ opacity */
        }

        /* Modal Form Box */
        .form {
            width: 80%; /* Could be more or less, depending on screen size */
            max-width: 800px;
            margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
            border: 1px solid var(--form-border-color);
            border-radius: 10px;
            color: var(--form-color);
            background-color: var(--form-background-color);
        }

        .form.dark {
            background-color: var(--dark-background-color);
            color: var(--dark-color);
        }

        /* Center the image and position the close button */
        .form-header {
            display: flex;
            position: relative;
            text-align: center;
            padding: 0px 16px 0 16px;
            border-radius: 10px 10px 0 0;
            background-color: var(--header-background-color);
            border-bottom: solid var(--form-header-border-color) 1px;
        }

        #form.dark .form-header {
            background-color: var(--dark-header-color);
        }

        .form-body {
            margin-top: 16px;
            padding: 16px;
        }

        .form-footer {
            padding: 16px;
            border-radius: 0 0 10px 10px;
            background-color: var(--header-background-color);
            overflow: hidden;
        }

        #form.dark .form-footer {
            background-color: var(--dark-header-color);
            color: var(--dark-color);
        }

        /* Full-width input fields */
        input[type="text"],
        input[type="password"],
        input[type="number"] {
            display: inline-block;
            width: 100%;
            margin: 8px 0;
            padding: 12px 20px;
            border: 1px solid #ccc;
            box-sizing: border-box;
            outline-color: var(--form-outline-color);
            color: var(--form-color);
        }

        #form.dark input[type="text"],
        #form.dark input[type="password"],
        #form.dark input[type="number"] {
            background-color: var(--dark-input-background-color);
            border-color: var(--dark-input-border-color);
            color: var(--dark-input-color);
            outline-color: var(--form-border-color);
        }

        #form.dark input:focus-visible {
            outline-color: var(--dark-input-background-color);
        }

        .lesson,
        .topic {
            display: flex;
        }

        .lesson > input[type="text"],
        .topic > input[type="text"] {
            width: 80%;
        }

        .lesson > input[name="lessonnumber"],
        .topic > input[name="topicnumber"] {
            width: 20%;
            margin-right: 4px;
            text-align: center;
        }

        .top-distance {
            display: flex;
        }

        .top-distance > input[type="text"] {
            width: 50%;
            text-align: center;
            margin-right: 4px;
        }

        .top-distance > input[type="text"]:last-of-type {
            margin-right: 0px;
        }

        /* Set a style for all buttons */
        button {
            width: 100%;
            margin: 8px 0;
            padding: 14px 20px;
            border: none;
            overflow: hidden;
            background-color: var(--button-color);
            color: white;
            white-space: nowrap;
            text-overflow: ellipsis;
            cursor: pointer;
        }

        button:hover {
            opacity: 0.8;
        }

        .footer-buttons {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
        }

        .footer-button {
            width: auto;
            flex: none;
            margin: 4px;
            padding: 10px 18px;
            background-color: var(--button-color);
        }

        /* Extra styles for the cancel button */
        .checkboxes-settings {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            justify-content: start;
        }

        .checkboxes-settings label {
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .checkboxes-settings label > input[type='checkbox']{
            margin-bottom: 10px;
        }

        /* Extra styles for the radiobox settings */
        .radioboxes-settings {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
            justify-content: start;
            margin-bottom: 10px;
        }

        .radioboxes-settings label {
            width: 50%;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }

        .radioboxes-settings label > input[type='radio']{
            margin-bottom: 10px;
        }

        /* Extra styles for the cancel button */
        .cancel-button {
            margin-right: auto;
            background-color: var(--cancel-button-color);
        }

        span.psw {
            float: right;
            padding-top: 16px;
        }

        .form-tabs {
            flex: auto;
            top: 0;
            left: 0;
            right: 0;
            padding: 0 12px;
            margin: 10px 0 0;
            text-align: left;
            border-radius: 3px 3px 0 0;
        }

        .form-tab {
            position: relative;
            display: inline-block;
            vertical-align: top;
            margin-top: 3px;
            line-height: 36px;
            font-weight: normal;
            color: var(--tab-color);
            background: var(--form-background-color);
            border: solid var(--form-header-border-color);
            border-width: 1px 1px 0;
            border-radius: 5px 5px 0 0;
            padding-bottom: 0;
            bottom: auto;
        }

        #form.dark .form-tab {
            background: var(--dark-header-color);
        }

        .form-tab-link {
            margin: 0;
            border-top: 0;
        }

        .form-tab + .form-tab {
            margin-left: -5px;
        }

        .form-tab.selected {
            bottom: -1px;
            margin-top: 0;
            padding-bottom: 2px;
            line-height: 34px;
            font-weight: bold;
            color: var(--tab-selected-color);
            background: var(--form-background-color);
            border-top: 0;
        }

        #form.dark .form-tab.selected {
            background: var(--dark-background-color);
            color: var(--dark-tab-selected-color);
        }

        .form-tab:hover {
            font-weight: bold;
            color: var(--tab-selected-color);
        }

        .form-tab.selected > .form-tab-link{
            margin: 0 -1px;
            border-top: 4px solid var(--tab-select-border-color);
        }

        .form-tab-link {
            display: block;
            min-width: 60px;
            padding: 0 15px;
            color: inherit;
            cursor: pointer;
            text-align: center;
            text-decoration: none;
            border-radius: 4px 4px 0 0;
        }

        .form-tab-section {
            display: none;
        }

        .form-tab-section.selected {
            display: block;
        }

        .footer-buttons-section {
            display: none;
        }

        .footer-buttons-section.selected {
            display: block;
        }

        .noselect {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
        }

        /* The Close Button (x) */
        .close-button {
            flex: none;
            right: 20px;
            top: 0;
            color: var(--form-tab-selected-color);
            font-size: 35px;
            font-weight: bold;
        }

        #form.dark .close-button {
            color: white;
        }

        .title {
            position: absolute;
            right: 20px;
            top: 0;
            color: #000;
            font-size: 35px;
            font-weight: bold;
        }

        .close-button:hover,
        .close-button:focus,
        #form.dark .close-button:hover,
        #form.dark .close-button:focus {
            color: red;
            cursor: pointer;
        }

        /* Add Zoom Animation */
        .animate {
            -webkit-animation: animatezoom 0.6s;
            animation: animatezoom 0.6s;
        }

        .animate-close {
            -webkit-animation: animatezoomreverse 0.6s;
            animation: animatezoomreverse 0.6s;
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

        @-webkit-keyframes animatezoomreverse {
            from {
                background-color: rgba(0, 0, 0, 0.4);
                -webkit-transform: scale(1);
            }
            to {
                background-color: rgba(0, 0, 0, 0);
                -webkit-transform: scale(0);
            }
        }

        @keyframes animatezoomreverse {
            from {
                /* background-color: rgba(0, 0, 0, 0.4); */
                transform: scale(1);
            }
            to {
                /* background-color: rgba(0, 0, 0, 0); */
                transform: scale(0);
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
            // return ['theme'];
        }

        tabSections = new Map

        tabs = new Map

        constructor () {
            super();

            this.attachShadow({mode: 'open'});

            const template = document.createElement('template');
            template.innerHTML = formHTML;
            this.shadowRoot.append(template.content.cloneNode(true));

            let style = document.createElement('style');
            style.textContent = formStyle;
            this.shadowRoot.append(style);
            this.shadowRoot.querySelector("#settings-tab-buttons button[name='cancel'").onclick = this.cancelSettings.bind(this);
            this.shadowRoot.querySelector("#settings-tab-buttons button[name='default'").onclick = this.defaultSettings.bind(this);
            this.shadowRoot.querySelector("#settings-tab-buttons button[name='restore'").onclick = this.restoreSettings.bind(this);
            this.shadowRoot.querySelector("#settings-tab-buttons button[name='save'").onclick = this.saveSettings.bind(this);
            this.shadowRoot.querySelector("#settings-tab-buttons button[name='close'").onclick = this.closeSettings.bind(this);
            this.shadowRoot.querySelector("#settings-tab-buttons button[name='apply'").onclick = this.applySettings.bind(this);

            this.shadowRoot.querySelector("#top-distance-tab-buttons button[name='cancel'").onclick = this.cancelTopDistance.bind(this);
            this.shadowRoot.querySelector("#top-distance-tab-buttons button[name='default'").onclick = this.defaultTopDistance.bind(this);
            this.shadowRoot.querySelector("#top-distance-tab-buttons button[name='restore'").onclick = this.restoreTopDistance.bind(this);
            this.shadowRoot.querySelector("#top-distance-tab-buttons button[name='save'").onclick = this.saveTopDistance.bind(this);
            this.shadowRoot.querySelector("#top-distance-tab-buttons button[name='close'").onclick = this.closeTopDistance.bind(this);
            this.shadowRoot.querySelector("#top-distance-tab-buttons button[name='apply'").onclick = this.applyTopDistance.bind(this);


            this.shadowRoot.querySelector("#lessons-tab-buttons button[name='cancel'").onclick = this.cancelLessons.bind(this);
            this.shadowRoot.querySelector("#lessons-tab-buttons button[name='default'").onclick = this.defaultLessons.bind(this);
            this.shadowRoot.querySelector("#lessons-tab-buttons button[name='restore'").onclick = this.restoreLessons.bind(this);
            this.shadowRoot.querySelector("#lessons-tab-buttons button[name='save'").onclick = this.saveLessons.bind(this);
            this.shadowRoot.querySelector("#lessons-tab-buttons button[name='apply'").onclick = this.applyLessons.bind(this);
            this.shadowRoot.querySelector("#lessons-tab-buttons button[name='close'").onclick = this.closeLessons.bind(this);

            this.shadowRoot.querySelector("#options-tab-buttons button[name='cancel'").onclick = this.cancelOptions.bind(this);
            this.shadowRoot.querySelector("#options-tab-buttons button[name='default'").onclick = this.defaultOptions.bind(this);
            this.shadowRoot.querySelector("#options-tab-buttons button[name='restore'").onclick = this.restoreOptions.bind(this);
            this.shadowRoot.querySelector("#options-tab-buttons button[name='save'").onclick = this.saveOptions.bind(this);
            this.shadowRoot.querySelector("#options-tab-buttons button[name='apply'").onclick = this.applyOptions.bind(this);
            this.shadowRoot.querySelector("#options-tab-buttons button[name='close'").onclick = this.closeOptions.bind(this);
            // this.shadowRoot.getElementById('save').onclick = this.save.bind(this);
            // this.shadowRoot.getElementById('delete').onclick = this.delete.bind(this);
            // this.shadowRoot.getElementById('compact').onclick = this.compact.bind(this);
            this.shadowRoot.getElementById('close').onclick = this.close.bind(this);
            this.form = this.shadowRoot.getElementById('form');
            // this.shadowRoot.getElementById('default').onclick = this.default.bind(this);

            let tabList = this.shadowRoot.querySelectorAll('.form-tab-link');
            for (let i = 0; i < tabList.length; i++) {
                const tab = tabList[i];
                tab.onclick = this.changeTab.bind(this);
                this.tabs.set(tab.getAttribute('id'), tab);
                this.tabSections.set(tab.getAttribute('id'), this.shadowRoot.getElementById(tab.getAttribute('id')+'-section'));
            }

            let radioList = this.shadowRoot.querySelectorAll('[name="radio-setting"]');
            for (let i = 0; i < radioList.length; i++) {
                radioList[i].onchange = this.radioChange.bind(this);
            }
        }

        stopAnimation() {
            form.classList.remove('animate-close');
            form.removeEventListener('animationend', this.animateCallback);
            this.form.style.display = "none";
        }

        static pdb = new PouchDB('settings')

        restoreSettings() {

        }

        restoreTopDistance() {

        }

        restoreOptions() {

        }
        async restoreLessons() {
            const mdResult = await this.modalDialog.show();
            if (mdResult === "OK") {
                alert(mdResult);
            }
            else {
                alert(mdResult);
            }
        }

        attributeChangedCallback(name, oldValue, newValue) {
            // if (name === "theme") {
            //     if (newValue === 'dark') {
            //         this.form.classList.add('dark');
            //     }
            //     else {
            //         this.form.classList.remove('dark');
            //     }
            // }
        }

        // get form() {
        //     return this.shadowRoot.getElementById('form');
        // }

        get modalDialog() {
            return this.shadowRoot.querySelector('modal-dialog');
        }

        openForm() {
            this.shadowRoot.getElementById('form-background').style.display = "block";
        }

        closeForm() {
            this.shadowRoot.getElementById('form-background').style.display = "";
        }

        show() {
            this.form.cloud.checked = !settings.cloud.hidden;
            this.form.horizon.checked = !settings.horizon.hidden;
            this.form.cactus.checked = !settings.cactus.hidden;
            this.form.ground.checked = !settings.ground.hidden;
            this.form.bumps.checked = !settings.bumps.hidden;
            this.form.pterodactyl.checked = !settings.pterodactyl.hidden;
            this.form.moon.checked = !settings.moon.hidden;
            this.form.star.checked = !settings.star.hidden;
            this.form.night.checked = !settings.night.hidden;

            this.form.topology.value = settings.topology.join('-');
            this.form.populationCount.value = settings.populationCount;
            this.form.lessonname.value = settings.lesson.name;
            this.form.lessonnumber.value = settings.lesson.number;
            this.form.topicname.value = settings.topic.name;
            this.form.topicnumber.value = settings.topic.number;
            this.form.theme.checked = settings.theme === 'dark';

            this.openForm();
        }

        close() {

            this.form.onanimationend = () => {
                this.form.classList.remove('animate-close');
                this.form.onanimationend = null;
                this.closeForm();
            }
            this.form.classList.add('animate-close');
        }

        cancel() {
            this.form.style.display = "none";
        }

        saveSettings() {
            settings.cloud.hidden = !this.form.cloud.checked;
            settings.horizon.hidden = !this.form.horizon.checked;
            settings.horizon.hidden ? this.hideHorizon() : this.showHorizon();
            settings.cactus.hidden = !this.form.cactus.checked;
            settings.ground.hidden = !this.form.ground.checked;
            settings.bumps.hidden = !this.form.bumps.checked;
            settings.pterodactyl.hidden = !this.form.pterodactyl.checked;
            settings.moon.hidden = !this.form.moon.checked;
            settings.star.hidden = !this.form.star.checked;
            settings.night.hidden = !this.form.night.checked;
        }

        saveTopDistance() {
            let radioList = this.shadowRoot.querySelectorAll('[name="radio-setting"]');
            for (let i = 0; i < radioList.length; i++) {
                const radio = radioList[i];
                if (radio.checked)
                {
                    settings[radio.value].distance.min = this.form.elements['distance-min'].value;
                    settings[radio.value].distance.max = this.form.elements['distance-max'].value;
                    settings[radio.value].top.min = this.form.elements['top-min'].value;
                    settings[radio.value].top.max = this.form.elements['top-max'].value;
                    break;
                }
            }
        }

        radioChange(e) {
            const radio = e.target.value;
            this.form.elements['distance-min'].value = settings[radio].distance.min;
            this.form.elements['distance-max'].value = settings[radio].distance.max;
            this.form.elements['top-min'].value = settings[radio].top.min;
            this.form.elements['top-max'].value = settings[radio].top.max;
        }

        saveOptions() {
            settings.theme = this.form.theme.checked ? 'dark' : 'light';
        }

        saveLessons() {
            settings.lesson.number = this.form.lessonnumber.value;
            settings.lesson.name = this.form.lessonname.value;
            settings.topic.number = this.form.topicnumber.value;
            settings.topic.name = this.form.topicname.value;
            settings.topology = this.form.topology.value.split('-');
            settings.populationCount = this.form.populationCount.value;
        }

        defaultSettings() {
            this.form.cloud.checked = !defaultSettings.cloud.hidden;
            this.form.horizon.checked = !defaultSettings.horizon.hidden;
            this.form.cactus.checked = !defaultSettings.cactus.hidden;
            this.form.ground.checked = !defaultSettings.ground.hidden;
            this.form.bumps.checked = !defaultSettings.bumps.hidden;
            this.form.pterodactyl.checked = !defaultSettings.pterodactyl.hidden;
            this.form.moon.checked = !defaultSettings.moon.hidden;
            this.form.star.checked = !defaultSettings.star.hidden;
            this.form.night.checked = !defaultSettings.night.hidden;
        }

        defaultTopDistance() {
            this.form.cloud.checked = !defaultSettings.cloud.hidden;
            this.form.horizon.checked = !defaultSettings.horizon.hidden;
            this.form.cactus.checked = !defaultSettings.cactus.hidden;
            this.form.ground.checked = !defaultSettings.ground.hidden;
            this.form.bumps.checked = !defaultSettings.bumps.hidden;
            this.form.pterodactyl.checked = !defaultSettings.pterodactyl.hidden;
            this.form.moon.checked = !defaultSettings.moon.hidden;
            this.form.star.checked = !defaultSettings.star.hidden;
            this.form.night.checked = !defaultSettings.night.hidden;
        }

        defaultLessons() {
            this.form.lessonnumber.value = defaultSettings.lesson.number;
            this.form.lessonname.value = defaultSettings.lesson.name;
            this.form.topicnumber.value = defaultSettings.topic.number;
            this.form.topicname.value = defaultSettings.topic.name;
            this.form.topology.value = defaultSettings.topology.join('-');
            this.form.populationCount.value = defaultSettings.populationCount;
        }

        defaultOptions() {
            this.form.theme.checked = defaultSettings.theme === 'dark';
        }

        cancelSettings() {
            this.form.cloud.checked = !settings.cloud.hidden;
            this.form.horizon.checked = !settings.horizon.hidden;
            this.form.cactus.checked = !settings.cactus.hidden;
            this.form.ground.checked = !settings.ground.hidden;
            this.form.bumps.checked = !settings.bumps.hidden;
            this.form.pterodactyl.checked = !settings.pterodactyl.hidden;
            this.form.moon.checked = !settings.moon.hidden;
            this.form.star.checked = !settings.star.hidden;
            this.form.night.checked = !settings.night.hidden;
        }

        cancelTopDistance() {
            this.form.cloud.checked = !settings.cloud.hidden;
            this.form.horizon.checked = !settings.horizon.hidden;
            this.form.cactus.checked = !settings.cactus.hidden;
            this.form.ground.checked = !settings.ground.hidden;
            this.form.bumps.checked = !settings.bumps.hidden;
            this.form.pterodactyl.checked = !settings.pterodactyl.hidden;
            this.form.moon.checked = !settings.moon.hidden;
            this.form.star.checked = !settings.star.hidden;
            this.form.night.checked = !settings.night.hidden;
        }

        closeSettings() {
            this.close();
        }

        applySettings() {
            settings.cloud.hidden = !this.form.cloud.checked;
            settings.horizon.hidden = !this.form.horizon.checked;
            settings.horizon.hidden ? this.hideHorizon() : this.showHorizon();
            settings.cactus.hidden = !this.form.cactus.checked;
            settings.ground.hidden = !this.form.ground.checked;
            settings.bumps.hidden = !this.form.bumps.checked;
            settings.pterodactyl.hidden = !this.form.pterodactyl.checked;
            settings.moon.hidden = !this.form.moon.checked;
            settings.star.hidden = !this.form.star.checked;
            settings.night.hidden = !this.form.night.checked;
        }

        applyTopDistance() {
            settings.cloud.hidden = !this.form.cloud.checked;
            settings.horizon.hidden = !this.form.horizon.checked;
            settings.horizon.hidden ? this.hideHorizon() : this.showHorizon();
            settings.cactus.hidden = !this.form.cactus.checked;
            settings.ground.hidden = !this.form.ground.checked;
            settings.bumps.hidden = !this.form.bumps.checked;
            settings.pterodactyl.hidden = !this.form.pterodactyl.checked;
            settings.moon.hidden = !this.form.moon.checked;
            settings.star.hidden = !this.form.star.checked;
            settings.night.hidden = !this.form.night.checked;
        }

        cancelLessons() {
            this.form.lessonnumber.value = settings.lesson.number;
            this.form.lessonname.value = settings.lesson.name;
            this.form.topicnumber.value = settings.topic.number;
            this.form.topicname.value = settings.topic.name;
            this.form.topology.value = settings.topology.join('-');
            this.form.populationCount.value = settings.populationCount;
        }

        cancelOptions() {
            this.form.theme.checked = settings.theme === 'dark';
        }

        applyLessons() {
            settings.lesson.number = this.form.lessonnumber.value;
            settings.lesson.name = this.form.lessonname.value;
            settings.topic.number = this.form.topicnumber.value;
            settings.topic.name = this.form.topicname.value;
            settings.topology = this.form.topology.value.split('-');
            settings.populationCount = this.form.populationCount.value;
        }

        closeLessons() {
            this.close();
        }

        closeTopDistance() {
            this.close();
        }

        applyOptions() {
            settings.theme = this.form.theme.checked ? 'dark' : 'light';
            const gameSpace = document.querySelector('#game-space');
            this.form.theme.checked ? gameSpace.classList.add('dark') : gameSpace.classList.remove('dark');
            this.form.theme.checked ? this.form.classList.add('dark') : this.form.classList.remove('class');
        }

        closeOptions() {
            this.close();
        }

        changeTab(e){
            let tabName = e.target.getAttribute('id');
            this.tabs.forEach((tab, name) => {
                if (name == tabName) {
                    tab.parentNode.classList.add('selected');
                    this.shadowRoot.querySelector("#" + name + "-buttons").classList.add('selected')
                    this.tabSections.get(name).classList.add('selected')
                } else {
                    tab.parentNode.classList.remove('selected');
                    this.shadowRoot.querySelector("#" + name + "-buttons").classList.remove('selected')
                    this.tabSections.get(name).classList.remove('selected')
                }
            });
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