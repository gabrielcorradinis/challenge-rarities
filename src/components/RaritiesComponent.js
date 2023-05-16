export default class RaritiesComponent extends HTMLElement {

    static checkIcon = "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTQiIGhlaWdodD0iMTAiIHZpZXdCb3g9IjAgMCAxNCAxMCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZmlsbC1ydWxlPSJldmVub2RkIiBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik01LjI4NDkxIDcuNzIxMDFMMTIuMTA3MiAwLjc5NDk5MUMxMi4zNzY0IDAuNTIxNzY3IDEyLjgxMjcgMC41MjE3NjcgMTMuMDgxOSAwLjc5NDk5MUMxMy4zNTEgMS4wNjgyMSAxMy4zNTEgMS41MTEyIDEzLjA4MTkgMS43ODQ0Mkw1Ljc3MjIyIDkuMjA1MTZDNS41MDMwOCA5LjQ3ODM4IDUuMDY2NzMgOS40NzgzOCA0Ljc5NzYgOS4yMDUxNkwwLjg5OTExNiA1LjI0NzQzQzAuNjI5OTgyIDQuOTc0MjEgMC42Mjk5ODIgNC41MzEyMiAwLjg5OTExNiA0LjI1OEMxLjE2ODI1IDMuOTg0NzggMS42MDQ2IDMuOTg0NzggMS44NzM3NCA0LjI1OEw1LjI4NDkxIDcuNzIxMDFaIiBmaWxsPSJ3aGl0ZSIvPgo8L3N2Zz4K";

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
        this.data = [];
        this.fetchData = this.fetchData.bind(this);
        this.render = this.render.bind(this);
        
    }

    connectedCallback() {
        this.render();
        this.fetchData();
    }

    fetchData() {
        fetch('http://reshade.io:1234')
        .then(response => response.json())
        .then(data => {
            this.data = data;
            this.render();
            this.addEventListeners();
        });
    }

    render() {
    if (!this.data.length) {
        this.shadowRoot.innerHTML = 'Loading...';
        return;
    }

    this.shadowRoot.innerHTML = `
        <style>
            li {
                color: gray;
                display: flex;
                align-items: center;
            }
            .checkbox {
                appearance: none;
                width: 24px;
                height: 24px;
                margin: 12px;
                position: relative;
                cursor: pointer;
            }
            .checkbox::before {
                content: "";
                width: 100%;
                height: 100%;
                border: 0.5px solid gray;
                border-radius: 4px; 
                position: absolute;
            }
            .checkbox:checked::before {
                background: linear-gradient(rgb(62, 174, 255) -4.13%, rgb(60, 244, 200) 97.72%);
            }
            .checkbox::after {
                content: "";
                display: none;
                width: 100%;
                height: 100%;
                background: url(${RaritiesComponent.checkIcon}) no-repeat;
                background-size: 80%;
                background-position: 70% 55%;
                position: absolute;
            }
            .checkbox:checked::after {
                display: block;
            }
        </style>
        <ul>
            ${this.data.map((item, index) => `
                <li>
                    <input type="checkbox" class="checkbox" id="item-${index}">
                    <span id="text-${index}">${item[0]}</span>
                </li>
            `).join('')}
        </ul>`;
    }
    addEventListeners() {
        this.data.forEach((item, index) => {
            this.shadowRoot.querySelector(`#item-${index}`).addEventListener('change', (e) => {
                this.shadowRoot.querySelector(`#text-${index}`).style.color = e.target.checked ? `#${item[1]}` : 'gray';
                this.emitEvent();
            });
        });
    }
    emitEvent() {
        const checkedRarities = this.data
            .filter((item, index) => this.shadowRoot.querySelector(`#item-${index}`).checked)
            .map(item => item[0]);

        const event = new CustomEvent('raritiesUpdate', {
            detail: {
                checkedRarities
            }
        });

        this.dispatchEvent(event);
        console.log(event.detail);
    }
}