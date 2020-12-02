class TextBox {
    constructor(el) {
            this.el = {
            maxValue: el.dataset.maxlength,
            panel: el.querySelector('.panel'),
            title: el.querySelector('.title'),
            value: el.querySelector('.value'),
            textarea: el.querySelector('textarea'),
        }

        this.activePanel = new CurrentLengthPanel(this.el.panel, this);
        this.el.textarea.addEventListener('input', this.Update.bind(this));
        this.el.panel.addEventListener('click',this.Replace.bind(this));
        this.el.textarea.maxLength = this.el.maxValue;
        this.Update();
    }
    
    Replace() {
        switch(this.activePanel.constructor) {
        case CurrentLengthPanel:
               this.activePanel = new RemaningCharactersPanel(this.el.panel,this);
               break;
        default:
                this.activePanel = new CurrentLengthPanel(this.el.panel,this);

        }
        this.Update();
    }
    
    Reset() {
        this.el.textarea.value = '';
        this.Update();
    }
    
    Update() {
        this.activePanel.updateValue();
    }
}



let textboxes = document.querySelectorAll('.textbox');
let resetBtn = document.querySelector('#btn-reset');
for(let i=0; i< textboxes.length; i++) {
    tb = new TextBox(textboxes[i]);
    resetBtn.addEventListener('click', tb.Reset.bind(tb));
}