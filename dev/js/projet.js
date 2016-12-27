



var hamburger = (function(w, t) {
  window.addEventListener('load', function n(event) {
    window.removeEventListener('load', n, false);
    t.addEventListener('click', function(event) {
      t.classList.toggle('clicked');
    }, false);
  });
})(window, document.getElementsByClassName('hamburger')[0]);



var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
        
        freeMode: true,
        autoplay: 2000   
    });




$('.search').click(function(){
  $('.search, .search-bar').toggleClass('active');
  $('input').focus();
});


var swiper2 = new Swiper('.swiper-container2', {
        pagination: '.swiper-pagination',
        nextButton: '.swiper-button-next',
        prevButton: '.swiper-button-prev',
        slidesPerView: 3,
        paginationClickable: true,
        freeMode: true,
        width: 1100
        
        
    });    

