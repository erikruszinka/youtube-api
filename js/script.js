$(function(){
    var inputField=$('#query');
    
    $(inputField).on('focus', function(){
        $(this).animate({
            width:'80%'
        },400)
    })
    
    $(inputField).on('blur', function(){
        if(inputField.val()==''){
         $(inputField).animate({
             width:'30%'
         },400, function(){});   
        }
    })
    
    $('#search-form').submit(function(e){
        e.preventDefault();
    })
    
})

function search(){
    $('#results').html('');
    $('#buttons').html('');
    
    inputval=$('#query').val();
    
    $.get("https://www.googleapis.com/youtube/v3/search",{
        part: 'snippet, id',
        q:inputval,
        type:'video',
        key:'AIzaSyAdQicCIBPZnuWxvpdfh6-uO2K2HEmwh4M'},
         
          function(data){
      
        console.log(data);
        
        $.each(data.items, function(i, item){
            var output=getOutput(item);
            
            $('#results').append(output);
            
        });
        
      }
             
    );
}


function getOutput(items){
    var videoId=items.id.videoId;
    var title=items.snippet.title;
    var desc=items.snippet.description;
    var thumb=items.snippet.thumbnails.high.url;
    var channelTitle=items.channelTitle;
    var videoDate=items.snippet.publishedAt;
    
    console.log('desc: '+items.snippet.description);
    var output='<li>'+
        '<div class="list-left">'+
        '<img src="'+thumb+'">'+
        '</div>'+
        '<div class="list-right">'+
        '<h3><a href="http://www.youtube.com/embed/'+videoId+'">'+title+'</a></h3>'+
        '<small>By <span class="cTitle">'+channelTitle+'</span> on '+videoDate+'</small>'+
        '<p>'+desc+'</p>'+
        '</div>'+
        '</li>'+
        '<div class="clearfix"></div>'+
        '';
    var text='<div><p>'+desc+'</p></div>'
    return output;
    return text;
    
    
    
    
}