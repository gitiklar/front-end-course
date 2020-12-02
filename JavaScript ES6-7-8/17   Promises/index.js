/*
const p = new Promise((resolve , reject)=>{
    console.log('start');
    setTimeout(()=>{
        resolve();
    } , 5000);
})

p.then(()=>{
    console.log('hello');
});


/////////////////////////////////////////////////////

const img = new Image();
document.body.appendChild(img);
img.src = 'https://upload.wikimedia.org/wikipedia/commons/thumb/2/2d/Astronotus_ocellatus_-_closeup_%28aka%29.jpg/1200px-Astronotus_ocellatus_-_closeup_%28aka%29.jpg';
const pImg = new Promise((resolve, reject)=>{
    img.addEventListener('load' , resolve);
    img.addEventListener('erroe' , reject);
})

pImg.then(()=>{
    console.log('The upload was successful');
})

pImg.catch(()=>{
    console.log('Failed to load');
});

/////////////////////////////////////////////////////

function allImagesLoaded() {
    const p = document.querySelector('.loading');
    p.classList.remove('loading');
}

const promises = [];
const images = document.querySelectorAll('img');
for(let img of images) {
    const p = new Promise((resolve , reject)=>{
        img.addEventListener('load'  , resolve);
        img.addEventListener('error' , reject);
    });
    promises.push(p);
}

Promise.all(promises).then(allImagesLoaded).catch(function(e) {
    console.log('error loading image: ' + e.target.src);
});
*/



const btnStart = document.querySelector('#btn-start');
const results = document.querySelector('#result');
btnStart.addEventListener('click',start);

function awaitForUserInput() {
    const myPrompt = document.querySelector('#prompt');
    const input = document.querySelector('input');
    const btnGo = document.querySelector('#btn-go');
    results.style.display = 'none';
    myPrompt.style.display = 'block';
    input.value = '';

    return new Promise((resolve , reject)=>{
        btnGo.addEventListener('click',()=>{
            resolve(input.value);
            myPrompt.style.display = 'none';
        });
    });
}

function start() {
    awaitForUserInput().then((input)=>{
        results.style.display = 'block';
        results.innerHTML = `Hello ${input}`;
    });
}