function sumArg(...argument) {
    console.log(argument.reduce((a,b)=>a+b));
}

function printTimes(text='Hello World', times = 6) {
    for (let i=0; i<times;i++) {
        console.log(`${i+1}.) ${text}`);
    }
}

function arrayNoDuplicate(...list) {
    let my_arr = [];
    while (list.length) {
        tmp = list.shift();
        do {
            x=list.indexOf(tmp);
            list.splice(x,1);
        } while (list.indexOf(tmp)!=-1);
    
        my_arr.push(tmp);
    }
    console.log(my_arr);
}

function sumArg2(...arg) {
    console.log (`The sum is: ${arg.reduce((a,b)=>a+b)}`);
}

function notFound(current,new_arr2) {
        if(new_arr2.indexOf(current)<0) {
                return true;
        }
        return false;
}

function arrayNoDuplucate2(...arg) {
    let new_arr = [];
    for(let i=0;i<arg.length;i++) {
        if(notFound(arg[i],new_arr)) {
            new_arr.push(arg[i]);
        }
    }
    console.log(new_arr);
}


function arrayNoDuplucate3(...arg) {
    return arg.filter((v,i,a)=>a.indexOf(v)==i);
}

function main() {
    sumArg(1,'gg',2,3,'aa');
    printTimes('Hi my name is Giti' , 3);
    // returns ['foo', 'bar', 'buz']
    arrayNoDuplicate('foo', 'foo', 'foo', 'bar', 'bar', 'buz', 'buz');
    // returns [10, 20, 30]
    arrayNoDuplicate(10, 10, 10, 20, 20, 10, 20, 30);
    
    arrayNoDuplicate(10, 10, 10, 20, 20, 'foo', 10, 'foo', 20, 30);
    
    sumArg2(1,2,3,5,7,3,4);
    arrayNoDuplucate2(10, 10, 10, 20, 20, 'foo', 10, 'foo', 20, 30,'foo', 'foo', 'foo', 'bar', 'bar', 'buz', 'buz');
    let arr3_no_d = arrayNoDuplucate3(10, 10, 10, 20, 20, 'foo', 10, 'foo', 20, 30,'foo', 'foo', 'foo', 'bar', 'bar', 'buz', 'buz');
    console.log(`Smart ${arr3_no_d}`);
}

main();