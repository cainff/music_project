$(document).ready(function(){

 


  $('#search-form').submit(function(ev){
    ev.preventDefault();
  });
});

function search() {

  //Empty the search results and buttons before searching again.
  $('#results').html('');
  $('#buttons').html('');

  //Get the query in search bar
  query = $('#input-search').val();

  $.get("https://www.googleapis.com/youtube/v3/search",{
    part: 'snippet,id',
    q: query,
    type: 'video',
    maxResults: 30,
    key: 'AIzaSyCJ-StAmOvpw37mVaPdv4pFEJuq9p1ZUyc'}, function(data){
      console.log(data);

      $.each(data.items, function(i, item){
        var output = getOutput(item);
        $('#results').append(output);
      });

    
    });
}



function getOutput(item){
  var url = item.id.url;
  var videoId = item.id.videoId;
  var title = item.snippet.title;
  var description = item.snippet.description;
  var thumbnail = item.snippet.thumbnails.high.url;
  var channelTitle = item.snippet.channelTitle;
  var publishedAt = item.snippet.publishedAt;

  var getoutput = '<div class="row results-row">' +
  '<div class="col-md-4">' +
  '<a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'"><img src="'+thumbnail+'"></a>' +
  '</div>' +
  '<div class="col-md-8">' +
  '<h3><a class="fancybox fancybox.iframe" href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>' +
  '<p class="channel-meta">By<i> '+channelTitle+'</i> on '+publishedAt+'</p>'+
  '<p>'+description+'</p>' +
  '</div>' + 
  '</div>' +
  '<hr>'

  return getoutput;       
}

