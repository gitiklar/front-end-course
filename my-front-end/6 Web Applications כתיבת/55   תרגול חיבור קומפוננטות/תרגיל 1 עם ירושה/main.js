for(let i=0;i<5;i++) {
    const divForPanelAndTextArea = document.createElement('div');
    divForPanelAndTextArea.classList.add(`divForPanelAndTextArea${i}`);
    const textArea = new TextArea(divForPanelAndTextArea , bus , (i+1)*10);
    document.body.appendChild(divForPanelAndTextArea);
}