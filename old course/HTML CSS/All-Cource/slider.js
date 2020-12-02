var numPhotos = document.querySelectorAll('img').length;
var sizeOfPhoto = 300;

var inner = document.querySelector('.inline');
var outer = document.querySelector('.outline');

inner.addEventListener('click', function() {
  var currMargin = parseInt(inner.style.marginLeft) || 0;
  if ( Math.abs(currMargin) >= ((numPhotos - 1) * sizeOfPhoto )) {
    inner.style.marginLeft = '0px';
  } else {
    inner.style.marginLeft = (currMargin - sizeOfPhoto) + 'px';
  }
});