const name = 'giti';
const text = `<h1>${name}</h1>`;
document.body.innerHTML = text;

const stuff = ['coffee' , 'leptop' , 'cool hat'];
const list = `
    <ul>
        ${stuff.map(el=>`<li>${el}</li>`).join('')}
    <ul>
`;
document.body.innerHTML+= list;