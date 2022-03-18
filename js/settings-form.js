import {settings, defaultSettings} from './settings.js';

import {factoryModalDialog} from './modal-dialog.js';

import {compactDb, deleteDb} from './dino-brain.js';
import {formStyle} from './settings-form-style.js';
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
                            <label class="noselect"><input type="checkbox" checked="checked" name="smallcactus">Маленький кактус</label>
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
                            <label class="noselect"><input type="radio" name="radio-setting" value="smallcactus">Маленький кактус</label>
                        </div>

                        <label for="distance-group" class="noselect"><b>Расстояние между</b></label>
                        <div id="distance-group" name="distance-group" class="top-distance">
                            <input type="text" placeholder="Минимальное" name="distance-min" min="0" required>
                            <input type="text" placeholder="Максимальное" name="distance-max" min="0" required>
                        </div>

                        <label for="top-group" class="noselect"><b>Высота появления</b></label>
                        <div id="top-group" name="top-group" class="top-distance">
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

        async restoreTopDistance() {
            const mdResult = await this.modalDialog.show();
            if (mdResult === "OK") {
                alert(mdResult);
            }
            else {
                alert(mdResult);
            }

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
            this.form.smallcactus.checked = !settings.smallcactus.hidden;
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
            //settings.smallcactus.hidden = !this.form.smallcactus.checked;
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
            //this.form.smallcactus.checked = !defaultSettings.smallcactus.hidden;
            this.form.ground.checked = !defaultSettings.ground.hidden;
            this.form.bumps.checked = !defaultSettings.bumps.hidden;
            this.form.pterodactyl.checked = !defaultSettings.pterodactyl.hidden;
            this.form.moon.checked = !defaultSettings.moon.hidden;
            this.form.star.checked = !defaultSettings.star.hidden;
            this.form.night.checked = !defaultSettings.night.hidden;
        }

        defaultTopDistance() {
            let radioList = this.shadowRoot.querySelectorAll('[name="radio-setting"]');
            for (let i = 0; i < radioList.length; i++) {
                const radio = radioList[i];
                if (radio.checked)
                {
                    this.form.elements['distance-min'].value = defaultSettings[radio.value].distance.min;
                    this.form.elements['distance-max'].value = defaultSettings[radio.value].distance.max;
                    this.form.elements['top-min'].value = defaultSettings[radio.value].top.min;
                    this.form.elements['top-max'].value = defaultSettings[radio.value].top.max;
                }
            }

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
            //this.form.smallcactus.checked = !settings.smallcactus.hidden;
            this.form.ground.checked = !settings.ground.hidden;
            this.form.bumps.checked = !settings.bumps.hidden;
            this.form.pterodactyl.checked = !settings.pterodactyl.hidden;
            this.form.moon.checked = !settings.moon.hidden;
            this.form.star.checked = !settings.star.hidden;
            this.form.night.checked = !settings.night.hidden;
        }

        cancelTopDistance() {
            let radioList = this.shadowRoot.querySelectorAll('[name="radio-setting"]');
            for (let i = 0; i < radioList.length; i++) {
                const radio = radioList[i];
                if (radio.checked)
                {
                    this.form.elements['distance-min'].value = settings[radio.value].distance.min;
                    this.form.elements['distance-max'].value = settings[radio.value].distance.max;
                    this.form.elements['top-min'].value = settings[radio.value].top.min;
                    this.form.elements['top-max'].value = settings[radio.value].top.max;
                }
            }
        }

        closeSettings() {
            this.close();
        }

        applySettings() {
            settings.cloud.hidden = !this.form.cloud.checked;
            settings.horizon.hidden = !this.form.horizon.checked;
            settings.horizon.hidden ? this.hideHorizon() : this.showHorizon();
            settings.cactus.hidden = !this.form.cactus.checked;
            //settings.smallcactus.hidden = !this.form.smallcactus.checked;
            settings.ground.hidden = !this.form.ground.checked;
            settings.bumps.hidden = !this.form.bumps.checked;
            settings.pterodactyl.hidden = !this.form.pterodactyl.checked;
            settings.moon.hidden = !this.form.moon.checked;
            settings.star.hidden = !this.form.star.checked;
            settings.night.hidden = !this.form.night.checked;
        }

        applyTopDistance() {
            let radioList = this.shadowRoot.querySelectorAll('[name="radio-setting"]');
            for (let i = 0; i < radioList.length; i++) {
                const radio = radioList[i];
                if (radio.checked)
                {
                    settings[radio.value].distance.min =  this.form.elements['distance-min'].value;
                    settings[radio.value].distance.max = this.form.elements['distance-max'].value;
                    settings[radio.value].top.min = this.form.elements['top-min'].value;
                    settings[radio.value].top.max = this.form.elements['top-max'].value;
                }
            }
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