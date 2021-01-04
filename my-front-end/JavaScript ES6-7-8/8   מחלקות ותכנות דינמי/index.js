/*
class Timer {
    constructor() {
        this.seconds = 0;
    }

    get minutes() {
        return this.seconds / 60;
    }

    set minutes(val) {
        this.seconds = val * 60;
    }

    get hours() {
       return this.seconds / 3600;
    }

    set hours(val) {
        this.seconds = val *  3600;
    }
}
*/

/*
class Timer {
    constructor() {
        this.seconds = 0;
    }
}

[['hours', 3600], ['minutes' , 60]].forEach(prop => {
    const [propName , factor] = prop;
    Object.defineProperty(Timer.prototype , propName , {
        get() {
            return this.seconds / factor;
        },
        
        set(val) {
            this.seconds = val * factor;
        }
    });
});
*/

function makeMeATimer(factorsArray) {
    const Timer = class {
        constructor() {
            this.seconds = 0;
        }
    }

    factorsArray.forEach(prop => {
        const [propName , factor] = prop;
        Object.defineProperty(Timer.prototype , propName , {
            get() {
                return this.seconds / factor;
            },
            
            set(val) {
                this.seconds = val * factor;
            }
        });
    });

    return Timer;
}
const Timer = makeMeATimer([['hours', 3600], ['minutes' , 60]]);
const SmallTimer = makeMeATimer([['ms', 1/1000]]);
const t = new Timer();
const st = new SmallTimer();

