import {settings} from './settings.js';


export function settingsFormCancel() {
    document.getElementById('sittings-form').style.display='none';
}

export function settingsFormOpen() {
    const form = document.getElementById('form-settings');
    form.cloud.checked = settings.cloud.visible;
    form.horizon.checked = settings.horizon.visible;

    document.getElementById('sittings-form').style.display='block';
}

export function settingsFormClose() {
    document.getElementById('sittings-form').style.display='none';
    const form = document.getElementById('form-settings');
    settings.cloud.visible = !form.cloud.checked;
    settings.horizon.visible = form.horizon.checked;
}

