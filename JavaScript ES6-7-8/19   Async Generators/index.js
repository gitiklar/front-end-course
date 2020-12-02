import {} from 'https://cdnjs.cloudflare.com/ajax/libs/jquery/3.3.1/jquery.min.js';

async function main1() {
    const data = await $.get("http://swapi.dev/api/people/1/");  
    for (let filmUrl of data.films) {
        const data = await (await fetch(filmUrl)).json();
        console.log(data.title);
    }
}
//main1();

async function main2FecthAndThen() {
    const data = await (await fetch("http://swapi.dev/api/people/1/")).json();
    Promise.all(data.films.map(filmUrl=>fetch(filmUrl))).then(async dataArray => {
        for(let data of dataArray) {
            console.log((await data.json()).title);
        }
    });   
}
//main2FecthAndThen();

async function main2JqueryAndAwait() {
    const data = await $.get("http://swapi.dev/api/people/1/");
    const dataArray = await Promise.all(data.films.map(filmUrl=>$.get(filmUrl)));
    for(let data of dataArray) {
        console.log(data.title) ;
    }        
}
//main2JqueryAndAwait();

async function main3() {
    const data = await $.get("http://swapi.dev/api/people/1/");
    const promisesArray = data.films.map(filmUrl=>$.get(filmUrl));
    for await (let data of promisesArray) {
        console.log(data.title) ;
    }
}
//main3();

function main4() {
    const lat_field = document.querySelector('#lat-field');
    const long_field = document.querySelector('#long-field');
    async function getLocationAndPrint() {
        const data = await $.get('http://api.open-notify.org/iss-now.json');
        const { iss_position: { latitude, longitude  }} = data;
        lat_field.value = latitude;
        long_field.value = longitude;
        setTimeout(getLocationAndPrint, 1000);
    }
    getLocationAndPrint();
}
//main4();

async function asleep(ms) {
    return new Promise((resolve , reject)=>{
        setTimeout(resolve, ms);
    });
}

async function *issLocations() {
    while(true) {
        yield $.get('http://api.open-notify.org/iss-now.json');
        await asleep(1000);
    }
}

async function showLocationsInFields() {
    const lat_field = document.querySelector('#lat-field');
    const long_field = document.querySelector('#long-field');
    for await (let data of issLocations()) {
        const {iss_position: {longitude , latitude} } = data;
        lat_field.value = latitude;
        long_field.value = longitude;
    }
}

showLocationsInFields();

