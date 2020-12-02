/*
function allImagesLoaded() {
  var p = document.querySelector('.loading');
  p.classList.remove('loading');
}

var images = document.querySelectorAll('img');
var numImages = images.length;

for (var i= 0, len = images.length; i < len; i++ ) {
    images[i].addEventListener('load', function() {
       numImages--;
    if ( numImages === 0 ) {
      allImagesLoaded();
    }
  })
}
 */                      
 

/*

let images = document.querySelectorAll('img');
let numImages = images.length;

function allImagesLoaded() {
    return new Promise(function(load,noload) {
        for (var i= 0; i < images.length; i++ ) {
            images[i].addEventListener('load', function() {
                numImages--;
                if ( numImages === 0 ) {
                load();
                }
            })
        }
    })
}


allImagesLoaded().then(function() {
    var p = document.querySelector('.loading');
    p.classList.remove('loading');
})

*/








function allImagesLoaded() {
  var p = document.querySelector('.loading');
  p.classList.remove('loading');
}

var images = document.querySelectorAll('img');

var promises = [];

for (var i= 0, len = images.length; i < len; i++ ) {
  var img = images[i];
  promises.push(new Promise(function(resolve, reject) {
    img.addEventListener('load', resolve);
    img.addEventListener('error', reject);
  }));
}

Promise.all(promises).then(allImagesLoaded).catch(function(e) {
  console.log('error loading image: ' + e.target.src);
});
