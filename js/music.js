/*global jQuery:true, playerjs:true, $Player:true */
(function($, document, window){

  var URLS = [
    'https://www.youtube.com/watch?v=H_AbU24v4EU&list=TLGG-MN34pVPZgMyOTExMjAxNg',                  'https://www.youtube.com/watch?v=NaR2l0JXQas',
    'https://www.youtube.com/watch?v=-KRe61NpaTA',
    'https://www.youtube.com/watch?v=9GJJMZjISmY',
    'https://www.youtube.com/watch?v=eh17foTBGmg',
    'https://www.youtube.com/watch?v=Bz2YJ7yyuL8'
  ];

  var $tracks = $('#tracks'),
    players = [],
    count = 0,
    isReady = false;

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

  // We need to wait for all the players to be ready before we go.
  var onReady = function(){
    count++;
    if (count === URLS.length){
      start();
    }
  };

  $(document).on('ready', function(){
    // Go get all the URLS from embedly and then embed them.
    $.embedly.oembed(URLS, {query:{better: true} })
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

  });

})(jQuery, document, window);