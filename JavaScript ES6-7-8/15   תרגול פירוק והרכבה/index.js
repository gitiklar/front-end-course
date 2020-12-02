// 1.) , 2.)
    function printTimes(options) {
        // TODO - fill code (1 line) here
        const {text , times=5} = options;
        for (let i=0; i < times; i++) {
            console.log(`${String(i + 1).padStart(2, '0')} ${text}`);
        }
    }
    // print 'hello world' ten times:
    printTimes({ text: 'hello world', times: 10 });
    // print 'hello world' five times:
    printTimes({ text: 'hello world'});

// 3.)
    function printTimesFromWeirdDevelopersDownstairs(weirdOptions) {
        // TODO fill code (1 line) here
        const {text = weirdOptions.title , times} = weirdOptions;
        printTimes({ text, times });
    }

// 4.)
    function fib(n) {
        if ((n == 0) || (n == 1)) {
            return 1;
        }
        return fib(n - 1) + fib(n - 2);
    }

    function timed(fn) {
        return (...arg)=>{
            const s0 = Date.now();
            fn(...arg);
            const s1 = Date.now();
            return `Took ${s1 - s0}ms`;
        }
    }

    const timedFib = timed(fib);
    console.log(timedFib(40));
// 5.)
    let arr1 = copyArr1 = [10, 20, 30, 40];
    let arr2 = copyArr2 = [10, 20, 30, 40];

    arr1.push(50);
    arr2 = [...arr2, 50];
    
    console.log(arr1);
    console.log(arr2);

    console.log(arr1===copyArr1);
    console.log(arr2===copyArr2);