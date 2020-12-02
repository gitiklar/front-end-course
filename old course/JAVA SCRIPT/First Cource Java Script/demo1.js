//Random between min to max include both
function RandomInt(min,max) {
   return (Math.floor((Math.random()*(Math.floor(max-min+1))) + min));
}

//T1;
function max_between_3_numbers() {
    var num1 = RandomInt(0,100);
    var num2 = RandomInt(0,100);
    var num3 = RandomInt(0,100);
    console.log("num1: " + num1 + " num2: " + num2 + " num3: " + num3);
    console.log ("The max number is: " + (Math.max(num1,num2,num3)));
}

//T2
function sum_of_digits(min,max) {
    var num = RandomInt(min,max);
    var sum = 0;
    var num_tmp = num;
    while(num) {
        sum+=num%10;
        num=Math.floor(num/10); 
    }
    console.log ("The number is: " + num_tmp + "\nAnd the sum of the digits is: " + sum);
}

function first_devide_by_second(num1,num2) {
    if (num1/num2 == (Math.floor(num1/num2))) {
        return 1;
    }
    
    return 0;
}

//T3
function largest_number_that_they_both_devide (num1,num2) {
    min_num = Math.min(num1,num2);
    for (var i = min_num; i>0; i--) {
        if(first_devide_by_second(num1,i) && first_devide_by_second(num2,i)){
            console.log ("The largest number is: " + i)
            break;
        }
    }
}

//T4
function smallest_common_multiple(num1,num2) {
    for (var i = Math.max(num1,num2); i<=num1*num2; i++) {
        if(first_devide_by_second(i,num1) && first_devide_by_second(i,num2)) {
            console.log ("The number is: " + i);
            break;
        }
    }
}


function main() {
    max_between_3_numbers();
    sum_of_digits(1000,100000000);
    largest_number_that_they_both_devide(128,236);
    smallest_common_multiple(20,8);
}

main();