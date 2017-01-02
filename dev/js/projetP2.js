var hamburger = (function(w, t) {
  window.addEventListener('load', function n(event) {
    window.removeEventListener('load', n, false);
    t.addEventListener('click', function(event) {
      t.classList.toggle('clicked');
    }, false);
  });
})(window, document.getElementsByClassName('hamburger')[0]);



$('.search').click(function(){
  $('.search, .search-bar').toggleClass('active');
  $('input').focus();
});
