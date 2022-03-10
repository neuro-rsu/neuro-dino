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
                            <span id="db-tab" class="form-tab-link noselect">База данных</span>
                        </div>
                        <div class="form-tab">
                            <span id="options-tab" class="form-tab-link noselect">Настройки</span>
                        </div>
                    </div>
                    <span id="close" class="close noselect" title="Закрыть">&times;</span>
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

        /* Modal Form Box */
        .form {
            background-color: #fefefe;
            margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
            border: 1px solid #888;
            width: 80%; /* Could be more or less, depending on screen size */
            max-width: 800px;
            border-radius: 10px;
        }

        .form.dark {
            background-color: var(--dark-color);
        }

        /* Center the image and position the close button */
        .form-header {
            display: flex;
            position: relative;
            text-align: center;
            padding: 0px 16px 0 16px;
            border-radius: 10px 10px 0 0;
            background-color: #f1f1f1;
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
            background-color: #f1f1f1;
            overflow: hidden;
        }

        #form.dark .form-footer {
            background-color: var(--dark-header-color);
        }

        /* Full-width input fields */
        input[type="text"],
        input[type="password"],
        input[type="number"] {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
        }

        #form.dark input[type="text"],
        #form.dark input[type="password"],
        #form.dark input[type="number"] {
            background-color: var(--dark-input-color);
            border-color: var(--dark-input-border-color);
        }

        .lesson, .topic {
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

        .footer-buttons {
            display: flex;
            flex-wrap: wrap;
            width: 100%;
        }

        .footer-button {
            width: auto;
            flex: none;
            padding: 10px 18px;
            margin: 4px;
            background-color: #04aa6d;
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

        /* Extra styles for the cancel button */
        .cancel-button {
            margin-right: auto;
            background-color: #f44336;
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
            background: #f1f1f1;
            border-bottom: 1px solid #ddd;
            border-radius: 3px 3px 0 0;
        }

        .form-tab,
        .form-list.selected:first-of-type ~ .form-tabs > .form-tab:first-child ~ .form-tab,
        .form-list.selected:nth-of-type(2) ~ .form-tabs > .form-tab:nth-child(2) ~ .form-tab,
        .form-list.selected:last-of-type ~ .form-tabs > .form-tab:last-child ~ .form-tab {
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
            color: #555;
            background: white;
            border-top: 0;
        }

        .form-tab:hover {
            font-weight: bold;
            color: #555;
        }

        .form-tab.selected > .form-tab-link{
            margin: 0 -1px;
            border-top: 4px solid #4cc8f1;
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
        .close {
            flex: none;
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
        }

        stopAnimation() {
            form.classList.remove('animate-close');
            form.removeEventListener('animationend', this.animateCallback);
            this.form.style.display = "none";
        }

        static pdb = new PouchDB('settings')

        restoreSettings() {

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