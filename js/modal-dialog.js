
export { factoryModalDialog };

function factoryModalDialog() {
    const templateHTML = `
        <div id="dialog" class="modal-dialog">
            <div class="modal-dialog-content animate" id="modal-dialog">
                <div class="dialog-header">
                    <span id="dialog-title" class="dialog-title no-select">Сообщение</span>
                    <span id="dialog-button-close" class="dialog-button-close no-select" title="Закрыть">&times;</span>
                </div>

                <div class="dialog-body">
                    <span id="message" class="no-select">Вы выиграли миллион долларов</span>
                </div>

                <div class="dialog-footer no-select">
                    <div class="footer-buttons">

                        <button type="button" id="ok-button" class="footer-button btn-ok">Понял</button>
                    </div>
                </div>
            </div>
        </div>
    `;
    //<button type="button" id="cancel-button" class="footer-button btn-cancel">Закрыть</button>
    const templateStyle = `

        /* Set a style for all buttons */
        button {
            width: 100%;
            margin: 8px 0;
            padding: 14px 20px;
            border: none;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            background-color: #04aa6d;
            color: white;
            cursor: pointer;
        }

        button:hover {
            opacity: 0.8;
        }

        .footer-button {
            flex: none;
            width: auto;
            margin: 4px;
            padding: 10px 18px;
            background-color: #04aa6d;
        }

        .footer-buttons {
            display: flex;
            justify-content: flex-end;
            flex-wrap: wrap;
            width: 100%;
        }

        /* Extra styles for the cancel button */
        .cancel-button {
            margin-right: auto;
            background-color: #f44336;
        }

        /* Center the image and position the close button */
        .dialog-header {
            display: flex;
            align-items: center;
            padding: 0 16px 0 20px;
            border-radius: 10px 10px 0 0;
            background-color: var(--form-header-background-color);
        }

        #dialog.dark .dialog-header {
            background: var(--dark-header-color);
        }

        .dialog-title {
            flex: auto;
            overflow: hidden;
            text-overflow: ellipsis;
            color: #000;
            font-size: 20px;
        }

        #dialog.dark .dialog-title {
            color: var(--dark-color);
        }

        /* The Close Button (x) */
        .dialog-button-close {
            flex: none;
            color: #000;
            font-size: 35px;
            font-weight: bold;
        }

        #dialog.dark .dialog-button-close {
            color: #000;
        }

        .dialog-button-close:hover,
        .dialog-button-close:focus,
        #dialog.dark .dialog-button-close:hover,
        #dialog.dark .dialog-button-close:focus {
            cursor: pointer;
            color: red;
        }

        .dialog-body {
            margin: 0 16px;
            padding: 16px;
            overflow: hidden;
            text-overflow: ellipsis;
        }

        .dialog-body > span {
            font-size: 25px;
            font-weight: bold;
        }

        .dialog-footer {
            padding: 16px;
            border-radius: 0 0 10px 10px;
            overflow: hidden;
            background-color: var(--form-header-background-color);
        }

        #dialog.dark .dialog-footer {
            background-color: var(--dark-header-color);
            color: var(--dark-color);
        }

        #dialog.dark .dialog-button-close {
            color: white;
        }

        /* The Modal (background) */
        .modal-dialog {
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

        .show {
            display: block; /* Hidden by default */
        }

        /* Modal Content/Box */
        .modal-dialog-content {
            background-color: #fefefe;
            margin: 5% auto 15% auto; /* 5% from the top, 15% from the bottom and centered */
            border: 1px solid #888;
            width: 80%; /* Could be more or less, depending on screen size */
            max-width: 800px;
            border-radius: 10px;
        }

        #dialog.dark .modal-dialog-content {
            background-color: var(--dark-background-color);
            color: var(--dark-color);
        }

        .no-select {
            -webkit-touch-callout: none;
            -webkit-user-select: none;
            -khtml-user-select: none;
            -moz-user-select: none;
            -ms-user-select: none;
            user-select: none;
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
            .footer-button {
                width: 100%;
            }
        }
    `;

    class ModalDialog extends HTMLElement {

        static get observedAttributes() {
            return ['show'];
        }

        constructor () {
            super();

            this.attachShadow({mode: 'open'});

            const template = document.createElement('template');
            template.innerHTML = templateHTML;
            this.shadowRoot.append(template.content.cloneNode(true));

            let style = document.createElement('style');
            style.textContent = templateStyle;
            this.shadowRoot.append(style);

            this.shadowRoot.querySelector("#ok-button").onclick = this.ok.bind(this);
            this.shadowRoot.querySelector("#dialog-button-close").onclick = this.close.bind(this);
            // this.shadowRoot.querySelector("#cancel-button").onclick = this.cancel.bind(this);
        }

        stopAnimation() {
            form.classList.remove('animate-close');
            form.removeEventListener('animationend', this.animateCallback);
            this.form.style.display = "none";
        }

        attributeChangedCallback(name, oldValue, newValue) {
        }

        get dialog() {
            return this.shadowRoot.getElementById("dialog");
        }

        dialogResult

        show(message) {
            const messageNode = this.shadowRoot.getElementById("message");
            messageNode.innerHTML = message;
            this.dialog.classList.add('show');
            return new Promise( (resolve, reject) => {
                this.dialogResult = resolve;
            })
        }

        close() {
            const dialog = this.shadowRoot.getElementById('modal-dialog');
            dialog.onanimationend = () => {
                dialog.classList.remove('animate-close');
                dialog.onanimationend = undefined;
                this.dialog.classList.remove('show');
                this.dialogResult('Close');
            }
            dialog.classList.add('animate-close');
        }

        cancel() {
            const dialog = this.shadowRoot.getElementById('modal-dialog');
            dialog.onanimationend = () => {
                dialog.classList.remove('animate-close');
                dialog.onanimationend = undefined;
                this.dialog.classList.remove('show');
            }
            dialog.classList.add('animate-close');
            this.dialogResult('Cancel');
        }

        ok() {
            const dialog = this.shadowRoot.getElementById('modal-dialog');
            dialog.onanimationend = () => {
                dialog.classList.remove('animate-close');
                dialog.onanimationend = undefined;
                this.dialog.classList.remove('show');
            }
            dialog.classList.add('animate-close');
            this.dialogResult('Cancel');
        }

        changeTheme(themeName) {
            const dialog = this.shadowRoot.getElementById('dialog');
            if (themeName==="dark") {
                dialog.classList.add("dark")
            }
            else {
                dialog.classList.remove("dark");
            }
        }
    }

    function regModalDialog() {
        if (window.customElements.get('modal-dialog') !== undefined)
            return;
        customElements.define("modal-dialog", ModalDialog);
    }

    regModalDialog();
}

factoryModalDialog();
