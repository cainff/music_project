/**Button test for playlist menu**/

function toggle(){
    if ($('#tracks').hasClass('hide_')){
        $('#tracks').removeClass('hide_');
    } else {    
        $('#tracks').addClass('hide_');
    }
};

var $tracks,
    players = [],
    count = 0,
    isReady = false;

var playlists = {
    booba : [
        'https://www.youtube.com/watch?v=Stet_4bnclk',                  
        'https://www.youtube.com/watch?v=Tk20thb6z-g',
        'https://www.youtube.com/watch?v=vq1ztJsbRek',
        'https://www.youtube.com/watch?v=NaR2l0JXQas',
        'https://www.youtube.com/watch?v=wa1jFkDejVE',
        'https://www.youtube.com/watch?v=hwtLqJyhS3Q'
    ],
    
    rohff : [
        'https://www.youtube.com/watch?v=s9Ye9I1NZTE',                  
        'https://www.youtube.com/watch?v=TIyi-CPR-jE',
        'https://www.youtube.com/watch?v=HOmP295oDMU',
        'https://www.youtube.com/watch?v=PMShE8Io5jQ',
        'https://www.youtube.com/watch?v=rGpz8okD7SM',
        'https://www.youtube.com/watch?v=I-roQNycZn8'
    ]
}

var onReady = function(){
    count++;
    if (count === playlists.rohff.length){
      start();
    }
};


var fill = function(pls){
    console.log('fill');
    $.embedly.oembed(pls, {query:{better: true} })
      .done(function(results){
        $.each(results, function(i, obj){
          $tracks.append(['<li class="track">',
            '<div class="panel">',
              '<div class="row">',
                '<div class="large-3 medium-3 small-3 columns">',
                  '<img src="'+obj.thumbnail_url+'" />',
                '</div>',
                '<div class="large-9 medium-9 small-9 columns">',
                  '<h4>'+obj.title+'</h4>',
                  //'<p>'+obj.description+'</p>',
                '</div>',
              '</div>',
              '<div class="iframe">'+obj.html+'</div>',
            '</div>',
          '</li>'].join(' '));
        });

        // grab the iframes and create players from them.
        $('.track iframe').each(function(i, e){
          var player = new playerjs.Player(e);
          players.push(player);
          player.on('ready', function(){
            player.unmute();
            onReady();
          });
        });
      });
}

var start = function(){
    var index = 0;

    var multi = new $Player(players);

    // Set the callout.
    multi.on('active', function(index){
      $('.panel').removeClass('callout').eq(index).addClass('callout');
    });

    // Go to a track by clicking on it.
    $('.panel').on('click', function(){
      if (!isReady){
        return false;
      }
      var index = $('.panel').index(this);
      multi.play(index);
      return false;
    });

    isReady = true;
};

/*global jQuery:true, playerjs:true, $Player:true */
(function($, document, window){
  $tracks = $('#tracks');

  

  // We need to wait for all the players to be ready before we go.
  
  $(document).on('ready', function(){
    // Go get all the URLS from embedly and then embed them.
    
      //fill(playlists.rohff);
  });
})(jQuery, document, window);

$('.fillply' ).click(function() {
    toggle();
    $('ul#tracks').empty();
    fill(playlists[$(this).attr('data-playlist')]);
});




//Second playlist// 

/*function playlist2(){
    if ($('#tracks').hasClass('hide_')){
        $('#tracks').removeClass('hide_');
    } else {    
        $('#tracks').addClass('hide_');
    }
};  


var music=document.getElementById('btn_test2');
    music.addEventListener('click',playlist2); 

(function($, document, window){

var play2 = [
    'https://www.youtube.com/watch?v=wku7zvDDRk0',                  'https://www.youtube.com/watch?v=zeM2NhQe7hQ',
    'https://www.youtube.com/watch?v=1E0WjtMrWKk',
    'https://www.youtube.com/watch?v=XsHbV4gG3M4',
    'https://www.youtube.com/watch?v=S3cB7Vj0gtQ',
    'https://www.youtube.com/watch?v=Tk20thb6z-g',
  ];
    */

