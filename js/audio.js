//Create button play 

function playplause(audioPlayer, control){
    if ($('#btn-play').hasClass('pause_btn')){
        $('#btn-play').removeClass('pause_btn');
    } else {    
        $('#btn-play').addClass('pause_btn');
    }
};


function play (audioPlayer, control){
    var player = document.querySelector('#audioPlayer');
    playplause();
        
    if(player.paused) {
        player.play();
    } else {
        player.pause();
    }
}


//Create button stop

function resume(audioPlayer){
    var player = document.querySelector('#audioPlayer');
    
    player.currentTime = 0;
    player.pause();
}

//Get the time for create progress bar

function update(audioPlayer){
    var duration = audioPlayer.duration; // All Time
    var time = audioPlayer.currentTime; 
    var fraction = time / duration;
    //Math.ceil for a correct result
    var percent = Math.ceil(fraction*100);
        
    var progress = document.querySelector ('#progressBar');
    
    //Width of bar 
    progress.style.width = percent + '%';
    progress.textContent = percent + '%';
    
    //Duration of music
    document.querySelector('#progressTime').textContent = formatTime(time);
    
}

//console.log(audioPlayer.currentTime);

//Get the time

function formatTime(time){
    var hours = Math.floor(time / 3600);
    var mins = Math.floor((time % 3600) / 60);
    var secs = Math.floor(time % 60);
    
    if (secs < 10) {
        secs = "0" + secs;
    }
    
    if (hours) {
        if (min < 10) {
            mins= "0"+mins;
        }
        
        return hours + ":" + mins + ":" + secs;
    }else {
        return mins + ":" + secs;
    }
}

//Create a button volume 

function volume (audioPlayer, vol) {
    var player = document.querySelector('#audioPlayer');
    
    player.volume= vol;
}


//Click on Progress Bar

function MousePosition(event){
    return {
        x: event.pageX,
        y: event.pageY
    };
}

function getPosition(element){
    var top = 0, left = 0;
    
    do {
        top += element.offsetTop;
        left += element.offsetLeft;
    } while (element = element.offsetParent);
    
    return {x: left, y:top};
    
    }

function clickProgress(audioPlayer, control,event){
    var parent = getPosition(control);
    var target = MousePosition(event);
    
    var player = document.querySelector('#audioPlayer');
    
    var x = target.x - parent.x;
    var wrapperWidth = document.querySelector('#progressBarControl').offsetWidth;
    
    var percent = Math.ceil((x / wrapperWidth) * 100);
    var duration = audioPlayer.duration;
    
    audioPlayer.currentTime = (duration * percent) / 100;
}


function getmusic(folder){
    $.get('/getmusic?folder='+folder, function(mp3s){
        var current = 0;
        audioPlayer.src = mp3s[current];


        //Read Tag ID3 

        var jsmediatags = window.jsmediatags;
        var _counter = 0;        
            
        for(var i=0; i<mp3s.length; i++){
            (function(mp3, idx){
                jsmediatags.read(mp3, {
                  onError: function(err){
                    _counter++;  
                  },
                  onSuccess: function(tag) {
                     console.log(mp3);
                    var tags = tag.tags;

                    var output = [
                        '<a href="'+mp3+'">',
                            '<h4>'+tags.artist+'</h4>',
                            '<h5 id="title_song">'+tags.title+'</h5>',
                            '<h6>'+tags.album+'</h6>',
                        '</a>'
                    ].join('');


                    var newline = document.createElement('li');
                    newline.innerHTML = output

                    document.getElementById('thelist').appendChild(newline); 
                    
                    _counter++;

                    if(_counter === mp3s.length || mp3s.length === 1)
                        init();
                  }
                });
            })(mp3s[i], i)
        }    
    });
}

function toggle(){
    if ($('#thelist').hasClass('hide_')){
        $('#thelist').removeClass('hide_').addClass('show_');
        
    } else if ($('#thelist').hasClass('show_')){ 
        $('#thelist').addClass('hide_').removeClass('show_');
    }
    else {
        $('#thelist').addClass('show_', 15000, "easeOutBounce").removeClass('hide_');
}
    
};



$('#next_').click(function(){
        toggle();
        event.preventDefault(); 
   $('ul#thelist').empty();
    var folder = $(this).attr('data-getmusic');
    getmusic(folder); 
    
});

/*function toggle(){
    if ($('#thelist').hasClass('hide')){
        $('#thelist').removeClass('hide');
    } else {    
        $('#thelist').addClass('hide');
    }
}; */


$('#next__').click(function(){
    toggle();
    event.preventDefault(); 
    $('ul#thelist').empty();
    var folder = $(this).attr('data-getmusic');
    getmusic(folder); 
    
});



var audio;
var playlist;
var tracks;
var current;

function init(){
    var player = document.querySelector('#audioPlayer');

    current = 0;
    playlist = $('#thelist');
    tracks = playlist.find('li a');
    len = tracks.length - 1;
    player.play();
    playlist.find('a').click(function(e){
        e.preventDefault();
        link = $(this);
        current = link.parent().index();
        run(link, player);
    });
    player.addEventListener('ended',function(e){
        current++;
        if(current == len){
            current = 0;
            link = playlist.find('a')[0];
        }else{
            link = playlist.find('a')[current];    
        }
        run($(link),player);
    });
}
function run(link, player){
        player.src = link.attr('href');
        par = link.parent();
        par.addClass('active').siblings().removeClass('active');
        player.load();
        player.play();
}


$(window).scroll(function(){
//box one
    var $win = $(window);
    $('#player_style').css('top', 20 -$win.scrollTop());
    $('#player_style').css('left', 20 -$win.scrollLeft());
});






 


//Write ID3 Tag in div  '<h4>'+tags.artist+'</h4>' + '<h5>'tags.title'</h5>' + '<h6>'tags.album'</h6>';


//$("#thelist").html("lol");



