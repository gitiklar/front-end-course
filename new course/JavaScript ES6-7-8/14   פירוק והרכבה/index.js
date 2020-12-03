const arr = [10 ,20 , 30 , 40 , 50];
const [first , second , ...rest] = arr;

function printData({name , likes: {programing, drinks}}) {
    //name , programming , drinks
    console.log(`${name} ${programing} ${drinks}`);
}

const data = {
    name: 'giti' , 
    likes: {
        programing:'JavaScript',
        drinks: 'coffee',
    }
};

printData(data);
const {name , likes:{programing ,drinks}} = data;
