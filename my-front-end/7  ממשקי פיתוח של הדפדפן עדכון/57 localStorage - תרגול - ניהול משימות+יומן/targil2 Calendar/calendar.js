class Calendar {
    constructor(el , bus) {
        this.el =  el;
        this.bus = bus;
        this.calendarArray = JSON.parse(localStorage.getItem('calendar')) || {};
        this.setupUi();
    }

    setupUi() {
        this.el.innerHTML= `
        <button class="save btn btn-primary btn-lg">Save your story</button>
        <button class="clear btn btn-primary btn-lg">Clear text box</button>
        <input class="date" type="date">
     `;
     this.saveBtn = this.el.querySelector('.save');
     this.clearBtn = this.el.querySelector('.clear');
     this.date = this.el.querySelector('.date');
     this.date.value=(new Date()).toISOString().substr(0,10);
     this.setSubscribeOrEmit();
    }
    
    setSubscribeOrEmit() {
        this.bus.subscribe('load', this.loadStoryForToday);
        this.bus.subscribe('saveValue', this.saveValue);
        this.saveBtn.addEventListener('click',()=>{this.bus.emit('getValue')});
        this.clearBtn.addEventListener('click',()=>{this.bus.emit('clear')});
        this.date.addEventListener('change',()=>{
            this.bus.emit('writeToTextArea',(this.calendarArray[this.date.value]||''));
        });
        this.bus.emit('writeToTextArea',(this.calendarArray[this.date.value]||''));
    }

    saveValue = (value) =>{
        this.calendarArray[this.date.value] = value;
        localStorage.setItem('calendar',JSON.stringify(this.calendarArray));
    }
}