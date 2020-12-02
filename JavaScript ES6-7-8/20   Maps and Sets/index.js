function countWord(...words) {
    const counters = Object.create(null);
    for(let word of words) {
        counters[word] = (counters[word] || 0) + 1 ;
    }
    return counters;
}

function hasWord(word , counters) {
    return typeof counters[word] !== 'undefined';
}

//           with Maps             //

function countWordM(...words) {
    const counters = new Map();
    for(let word of words) {
        counters.set(word , (counters.get(word)|| 0) +1);
    }
    return counters;
}

function hasWordM(word , counters) {
    return counters.has(word);
}


class DataKeeper {
    constructor() {
      this._data = new WeakMap();
    }
    
    set(el, data) {
      this._data.set(el, data);
    }
    
    get(el) {
      return this._data.get(el);
    }
  }
  
  const keeper = new DataKeeper();
  
  const li1 = document.querySelector('li');
  keeper.set(li1, true);
  
  for (let li of document.querySelectorAll('li')) {
    if (keeper.get(li) === true) {
      li.style.textDecoration = 'line-through';
    }
  }
  li1.parentElement.removeChild(li1);