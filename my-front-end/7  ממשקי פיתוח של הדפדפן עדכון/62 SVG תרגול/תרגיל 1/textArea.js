class TextArea {
    constructor(containerTextAreaAndTable, bus) {
        this.bus = bus;
        this.setupUI(containerTextAreaAndTable);
        this.bus.subscribe('getObjectsArrayOfWordsAndSum', this.fillObjectsArrayOfWordsAndSum);
    }

    setupUI(containerTextAreaAndTable) {
        containerTextAreaAndTable.appendChild(document.createElement('textarea'));
        this.textArea = containerTextAreaAndTable.querySelector('textarea');
        this.textArea.addEventListener('input',()=>{this.bus.emit('input')});
    }

    fillObjectsArrayOfWordsAndSum = (objectsWordsAndCountArray)=> {
        let textAreaInput = this.textArea.value;
        textAreaInput = textAreaInput.replace(/(^\s*)|(\s*$)/gi,"");
        textAreaInput = textAreaInput.replace(/\n/g, " ");
        textAreaInput = textAreaInput.replace(/[ ]{2,}/gi," ");
        const textAreaInputArrayOfWords = (textAreaInput!='')? textAreaInput.split(' '):0;
        if(!textAreaInputArrayOfWords) return;
        textAreaInputArrayOfWords.forEach((word)=>{
            const index  = objectsWordsAndCountArray.findIndex((obj)=>{
                return Object.keys(obj)[0] === word;
            });
            if(index!=-1) {
                (objectsWordsAndCountArray[index])[Object.keys(objectsWordsAndCountArray[index])[0]]++;
            }
            else {
                let obj = {};
                obj[word] =1 ;
                objectsWordsAndCountArray.push(obj);
            }
        });
    }
}