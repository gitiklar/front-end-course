const textAreaArray = [];
for(let i=0;i<5;i++) {
    let divForTextArea = document.createElement('div');
    divForTextArea.classList.add(`divForTextArea${i}`);
    document.body.appendChild(divForTextArea);
    textAreaArray[i] = (new TextArea(divForTextArea , bus , (i+1)*10 , `divForTextArea${i}`));
}