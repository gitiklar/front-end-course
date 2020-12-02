
class Calendar {
    constructor() {
        this.btnSave = document.querySelector('.save');
        this.btnClear = document.querySelector('.clear');
        this.dateInput = document.querySelector('input[type="date"]');
        this.textArea = document.querySelector('textarea');

        this.arrayStories = [];

        this.btnSave.addEventListener('click', this.saveStory.bind(this));
        this.btnClear.addEventListener('click', this.clearStory.bind(this));
        this.dateInput.addEventListener('change', this.dateChosen.bind(this));

        this.defaultInputDate();
        this.fillArrayFromLocalStorage();
    }

    defaultInputDate() {
        this.dateInput.value = new Date().toISOString().substring(0, 10);
    }
    
    fillArrayFromLocalStorage() {
        if(this.getArrayFromLocalStorage()){
            this.arrayStories = this.getArrayFromLocalStorage();
            let indexOfDateInArray = this.getIndexDateFromCalendar();
            if(indexOfDateInArray!=-1){
                this.textArea.value = this.arrayStories[indexOfDateInArray].story;
            }
        }
    }

    saveStory() {
        let indexOfDateInArray = this.getIndexDateFromCalendar();
        if(indexOfDateInArray!=-1) {
            this.arrayStories[indexOfDateInArray].story = this.textArea.value;
        }
        else {
            this.arrayStories.push({
                date: this.dateInput.value,
                story: this.textArea.value
            });
        }
        this.saveArrayInLocalStorage();
        this.textArea.value = '';
    }

    clearStory() {
        this.textArea.value ='';
    }

    getArrayFromLocalStorage() {
        return JSON.parse(localStorage.getItem('CalendarArray'));
    }
    
    saveArrayInLocalStorage() {
        localStorage.setItem('CalendarArray', JSON.stringify(this.arrayStories));
    }

    getIndexDateFromCalendar() {
        let Myindex = -1;
        this.arrayStories.forEach((object, index, array, myArray) => {
            if(Myindex!=-1){ return;}
            if (object.date == this.dateInput.value) {Myindex = index;}
        });
        return Myindex;
    }

    dateChosen() {
        if (this.getArrayFromLocalStorage()) {
            let myArray = this.getArrayFromLocalStorage();
            let indexOfDateInArray = this.getIndexDateFromCalendar();
            if(indexOfDateInArray!=-1){
                if(this.textArea.value)  {
                    let answer = window.prompt('A story already exists on this date - do you want to get it now instead of the story you wrote?');
                    if(answer!=null) {
                        this.textArea.value = myArray[indexOfDateInArray].story;
                    }
                }
                else {
                    this.textArea.value = myArray[indexOfDateInArray].story;
                }
            }                
        }
    }
}

const application = new Calendar();