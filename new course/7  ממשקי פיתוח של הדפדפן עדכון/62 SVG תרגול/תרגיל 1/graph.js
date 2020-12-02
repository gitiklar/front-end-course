class Graph {
    constructor(svgElement, bus) {
        this.bus = bus;
        this.svgElement = svgElement;
        this.setupUI();
        this.bus.subscribe('objectArrayIsReady', this.createGraph);
    }

    setupUI() {
        this.svgElement.innerHTML = `
            <line x1="100" y1="430" x2="770" y2="430" stroke-width="1.5" stroke="#9a9c9e"/>
            <line x1="100" y1="380" x2="770" y2="380" stroke-width="1.5" stroke="#9a9c9e"/>
            <line x1="100" y1="330" x2="770" y2="330" stroke-width="1.5" stroke="#9a9c9e"/>
            <line x1="100" y1="280" x2="770" y2="280" stroke-width="1.5" stroke="#9a9c9e"/>
            <line x1="100" y1="230" x2="770" y2="230" stroke-width="1.5" stroke="#9a9c9e"/>
            <line x1="100" y1="180" x2="770" y2="180" stroke-width="1.5" stroke="#9a9c9e"/>
            <line x1="100" y1="130" x2="770" y2="130" stroke-width="1.5" stroke="#9a9c9e"/>
            <line x1="100" y1="80" x2="770" y2="80" stroke-width="1.5" stroke="#9a9c9e"/>
            <line x1="100" y1="30" x2="770" y2="30" stroke-width="1.5" stroke="#9a9c9e"/>
            <line x1="100" y1="-20" x2="770" y2="-20" stroke-width="1.5" stroke="#9a9c9e"/>

            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="440" x="50">1</text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="390" x="50">2</text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="340" x="50">3</text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="290" x="50">4</text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="240" x="50">5</text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="190" x="50">6</text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="140" x="50">7</text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="90"  x="50">8</text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="40" x="50">9</text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="-10" x="50">10+</text>
            <g class="svg-rect">
           
            </g>
            <g class="svg-text">
            </g>
        `;
        this.svgRect = this.svgElement.querySelector('.svg-rect');
        this.svgText = this.svgElement.querySelector('.svg-text');
        this.startSvgRectAndText();
    }

    startSvgRectAndText() {
        this.svgRect.innerHTML = `
            <rect stroke="#84D3DB" height="0" width="70" y="480" x="100" stroke-width="1.5" fill="#BF7E96"/>
            <rect stroke="#84D3DB" height="0" width="70" y="480" x="200" stroke-width="1.5" fill="#5B9BA2"/>
            <rect stroke="#84D3DB" height="0" width="70" y="480" x="300" stroke-width="1.5" fill="#CFCA6D"/>
            <rect stroke="#84D3DB" height="0" width="70" y="480" x="400" stroke-width="1.5" fill="#CC7C65"/>
            <rect stroke="#84D3DB" height="0" width="70" y="480" x="500" stroke-width="1.5" fill="#619E73"/>
            <rect stroke="#84D3DB" height="0" width="70" y="480" x="600" stroke-width="1.5" fill="#BF7E96"/>
            <rect stroke="#84D3DB" height="0" width="70" y="480" x="700" stroke-width="1.5" fill="#5B9BA2"/>
        `;
        this.svgText.innerHTML = `
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="505" x="100" stroke-width="0"></text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="505" x="200" stroke-width="0"></text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="505" x="300" stroke-width="0"></text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="505" x="400" stroke-width="0"></text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="505" x="500" stroke-width="0"></text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="505" x="600" stroke-width="0"></text>
            <text font-style="italic" font-family="Oswald, sans-serif" font-size="20" y="505" x="700" stroke-width="0"></text>
        `;
    }

    clearSvg() {
        [...this.svgRect.children].forEach(rect=>{
            rect.setAttribute('height', 0);
            rect.setAttribute('y', 480);
        });
        [...this.svgText.children].forEach(text=>{
           text.innerHTML ='';
        });
        
    }

    createGraph = (objectsArrayOfWordsAndSum)=> {
        this.clearSvg();
        objectsArrayOfWordsAndSum.forEach((obj,index)=>{
            if(index>6) return;
            let currentKey = Object.keys(obj)[0]
            this.svgText.children[index].innerHTML = currentKey;
            if(obj[currentKey]<=10) {
                this.svgRect.children[index].setAttribute('height', obj[currentKey]*50);
                this.svgRect.children[index].setAttribute('y',480 - obj[currentKey]*50);
            }
            else {
                this.svgRect.children[index].setAttribute('height', 500);
                this.svgRect.children[index].setAttribute('y',-20);
            }
        })
    }
}