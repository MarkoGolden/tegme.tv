jQuery.fn.rotate = function(degrees) {
    $(this).css({'-webkit-transform' : 'rotate('+ degrees +'deg)',
                 '-moz-transform' : 'rotate('+ degrees +'deg)',
                 '-ms-transform' : 'rotate('+ degrees +'deg)',
                 'transform' : 'rotate('+ degrees +'deg)'});
    return $(this);
};

/* Last updates */
var location_is_embed = false;

var website_url = 'http://www.tegme.tv/';

var urlbase = "http://www.tegme.tv/api/list/"; // for local
var browserUrlBarPathname = jQuery(location).attr('pathname');
// test
var each_click = null;
// Channel name is url last param or not
var specific_video_id = false;
var channel_name_for_api = window.location.href;

if( channel_name_for_api.split('/').length == 5 ){

    specific_video_id = channel_name_for_api.split('/').slice(-1)[0];
    browserUrlBarPathname = '/' + channel_name_for_api.split('/').slice(-2)[0];
    
}

var urlfeat = urlbase + "b" + browserUrlBarPathname;
var urlmostv = urlbase + "mv1" + browserUrlBarPathname;

var url = urlfeat;
//var url = "datas/videos.json"; // for local
//var url = "http://new.tegme.tv/api/list/b/" + browserUrlBarPathname; //for server
//var url = "http://new.tegme.tv/api/list/b/fede1"; //for server
var embed_page_url = "http://www.tegme.tv/embed.aspx";
var embed_video_idStreamSource = false;

var getUrlParameter = function getUrlParameter(sParam) {
    var sPageURL = decodeURIComponent(window.location.search.substring(1)),
        sURLVariables = sPageURL.split('&'),
        sParameterName,
        i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : sParameterName[1];
        }
    }
};

$(document).ready(function(){

    var location_of_window = window.location;
    location_of_window  = String( location_of_window );

    // check if loaction is embed page
    if(location_of_window.indexOf(embed_page_url) != -1){

        location_is_embed = true;
        //url = "../dPlayer/datas/videos.json";

        embed_video_idStreamSource = getUrlParameter('idvideo');
        /*
        embed_video_idStreamSource = location_of_window.split('/');
        embed_video_idStreamSource = embed_video_idStreamSource[ embed_video_idStreamSource.length - 1 ];
        */
		
        select_video_via_idstreamSource( embed_video_idStreamSource );

    }

    if( specific_video_id ){
		
        select_video_via_idstreamSource( specific_video_id );        
    }

});

// video data for share
var video_data_for_share = false;

var video;
var player;
var source; 
var estimator;

var each = 0;
function select_video( index, data )
{   
    each = index;
    connect( true , data );
}
var last_adv = false;
var adv_already_played = false;
var each_of_played_adv = 'false';
var rotation_loading = 0;

// platforms
var isFirefox = navigator.userAgent.toLowerCase().indexOf('firefox') > -1;
var isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor);
var iOS = /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream;
var ua = navigator.userAgent.toLowerCase();
var isAndroid = ua.indexOf("android") > -1; //&& ua.indexOf("mobile");
var isIphone = false;
if((navigator.userAgent.match(/iPhone/i)) || (navigator.userAgent.match(/iPod/i))) {
    isIphone = true;
}

function isEdge(){
    var rv = -1; // Return value assumes failure.

    if (navigator.appName == 'Microsoft Internet Explorer'){

       var ua = navigator.userAgent,
           re  = new RegExp("MSIE ([0-9]{1,}[\\.0-9]{0,})");

       if (re.exec(ua) !== null){
         rv = parseFloat( RegExp.$1 );
       }
    }
    else if(navigator.appName == "Netscape"){                       
       /// in IE 11 the navigator.appVersion says 'trident'
       /// in Edge the navigator.appVersion does not say trident
       if(navigator.appVersion.indexOf('Trident') === -1) rv = 12;
       else rv = 11;
    }       

    if( rv == 12 && !isChrome && !isAndroid && !iOS && !isFirefox ){
        return true;
    }else{
        return false;
    }
}


function connect( each_click, data )
{   
    //alert('connect');
    $('.vjs-control-bar').hide();
    if( embed_page_video_not_found ){
        return false;
    }

    /*Loading png*/    
    var append_load_interval = setInterval(function(){

        if( isAndroid ){

            //add Big play button
            $('#loading').remove();
            $('.vjs-big-play-button').append('<img id="loading" width="50" src="'+ website_url +'images/video-play-button-png.png">');
            $('#loading').css({ 'margin' : '-35px -35px 35px -35px' });

        }else{
            
            //add loding image
            $('#loading').remove();
            $('.vjs-big-play-button').append('<img id="loading" width="50" src="'+ website_url +'images/loading.png">');

        }
      
        if( !isAndroid ){

            var loading_interval = setInterval(function(){
                rotation_loading ++;
                $('#loading').rotate(rotation_loading);
            },10);
            
        }
        
        clearInterval( append_load_interval );
    },100);
    /* end Loading png */

    
    if( !iOS && !isAndroid && !isEdge() ){

        // run shaka player
        if ( video == null ){ 
            video = document.querySelector("video"); 
        }

        if ( player == null ){ 
            player = new shaka.Player(video); 
        }

        // Attach the player to the window so that it can be easily debugged.
        window.player = player;

        // Listen for errors from the Player.
        //player.addEventListener('error', failed );

        // Construct a DashVideoSource to represent the DASH manifest.
   
        if ( estimator != null ){
            estimator=null; 
        }

      //  estimator = new shaka.abr.EwmaBandwidthEstimator();

        if ( source != null ){ 
            source = null; 
        }

    }


    // Load Json data
    var connectStrvalue = "";
    var logo_img = "";
    
    if( location_is_embed ){

        //alert('if location is embed');
        generate_video( data );

    }else{

        $.getJSON(url, function(json) {

            generate_video( json );
            
        });

    }
    // end loading json data

}

function generate_video( json )
{ 

  
    //alert('generate_video');
   // console.log(json);
    //when playlist end reload from first video
    if( each == json.length ){
        each = 0;
    }

    //if last video is adv play same source video
    if( last_adv && !each_click ){
        
            var show_controls_interval = setInterval(function(){
               
                if( myPlayer.currentTime() > 0){
                    //alert(0);
                    $('.vjs-control-bar').hide();
                    
                    if(iOS){
                        var ios_controll_bar = setInterval(function(){
                            $('.vjs-control-bar').show();
                            clearInterval( ios_controll_bar );
                        },3000);
                    }else{
                        $('.vjs-control-bar').show();
                    }

                    clearInterval( show_controls_interval );
                }
            },1000);
        adv_already_played = true;
        last_adv = false;
        each--;
    }

    if( each_of_played_adv != each && !last_adv || each_click ){
        adv_already_played = false;
    }
    
    // ADV functionality
    if( json[each].hasadv  ){

        $('#banner').remove();
        $('#video_adv_link').remove();

        if(json[each].tipoadv == "b"){
            
            
            var show_controls_interval_1 = setInterval(function(){
                if( myPlayer.currentTime() > 0){
                    
                    $('.vjs-control-bar').hide();
                    
                    if(iOS){
                        var ios_controll_bar = setInterval(function(){
                            $('.vjs-control-bar').show();
                            clearInterval( ios_controll_bar );
                        },3000);
                    }else{
                        $('.vjs-control-bar').show();
                    }

                    clearInterval( show_controls_interval_1 );
                }
            },3000);
            
            $('#video-wrap-new').prepend('<a class="banner" id="banner" target="new" href="'+json[each].linkAdv+'"><img src="'+json[each].urlAdv+'"></a>');
        }

        if( json[each].tipoadv == "v" && !adv_already_played && each_of_played_adv != each || json[each].tipoadv == "v" && each_click ){
            $('.vjs-control-bar').hide();
            last_adv = true;
            each_of_played_adv = each;
            if(iOS || isAndroid || isEdge() ){
                connectStrvalue = json[each].urlAdvHls;
            }else{
                connectStrvalue = json[each].urlAdv;
            }
            $('#video-wrap-new').prepend('<a class="video_adv_link" id="video_adv_link" target="new" href="'+json[each].linkAdv+'"><p>See More</p></a>');
        }else{
            
            if(iOS || isAndroid || isEdge()){
                connectStrvalue = json[each].urlStreamSourceHls;
            }else{
                connectStrvalue = json[each].urlStreamSourceDash;
            }
            
        }

        var interval_banner = setInterval(function(){
            $('#banner').remove();
            clearInterval(interval_banner);
        }, 20000);

    }else{
        
        var show_controls_interval_2 = setInterval(function(){
            
            if( myPlayer.currentTime() > 0){
                //alert(3);
                $('.vjs-control-bar').hide();

                if(iOS){
                    var ios_controll_bar = setInterval(function(){
                        $('.vjs-control-bar').show();
                        clearInterval( ios_controll_bar );
                    },3000);
                }else{
                    $('.vjs-control-bar').show();
                }

                clearInterval( show_controls_interval_2 );
            }
            
        },1000);
        
        $('#banner').remove();
        $('#video_adv_link').remove();
        // Load the source into the Player.
        if(iOS || isAndroid || isEdge() ){
            connectStrvalue = json[each].urlStreamSourceHls;
        }else{
            connectStrvalue = json[each].urlStreamSourceDash;
        }

    }
    //end ADV functionality

    //get videoData
    var videoData = json[each];

    if( iOS || isEdge() ){            
        //$('#videoObj').prepend('<video id="videoObj" x-webkit-airplay="allow" class="video-js vjs-default-skin vjs-big-play-centered" controls data-setup="{}"></video>');
        $('video').html('<source src="'+ connectStrvalue +'"  type="application/x-mpegURL" >');
    }
    else if(isAndroid){
        $('video').html('<source src="'+ connectStrvalue +'"  type="application/x-mpegURL" >');
    }
    else{

       // source = new shaka.player.DashVideoSource(connectStrvalue, null, estimator);
        player.load(connectStrvalue);

    }

    // add logo to video
    if( isIphone ){   
        logo_img = json[each].logostream;
        $('.logo-img').remove();
        $('#videoObj').prepend("<img class='logo-img' src='"+ logo_img +"'>");
    }

    //add video name and share button bellow of player
    if( !location_is_embed ){
		var video_name = json[each].nomeStreamSource;
        var visite = json[each].visite;
		$(".nba-views").html('<p><i class="fa fa-eye"></i>'+ visite +'</p>');
		$(".nba-video-name").html('<p class="video-title-name">'+ video_name +'</p>');
     //   $("#bottom_container").remove();
        video_data_for_share = json[each];
       // $('#video-wrap-new').append('<div id="bottom_container" style="width:100%;padding-top:5px;"><div style="width:100%;text-align:center;"><h1 style="font-family: Roaleway,sans-serif;font-size: 28px;color: #1a1a1a;font-weight: 700;text-transform: capitalize;margin-left: 15px;">'+video_name+'</h1></div><div style="width:100%;height:40px"><div style="width:50%;float:left;"><div style="width:50%;float:left;text-align: right;padding: 9px;"><p style="font-weight: 700;">Views</p></div><div style="width:50%;float:right" ><div style="display: flex;justify-content: center;align-items: center;width:40px;height:40px;border-radius:100px;background:#70ad47;border:1px solid #528b2b;color:#fff" >'+ visite +'</div></div></div><div style="width:50%;float:right;"><div style="margin:0 auto" class="fb-share-btn" onclick="publish()" ><i class="fa fa-facebook-square" ></i> <span>Share on Facebook</span></div></div></div>');
    }

    //calll tegme initialize
    initialize( videoData, false );

    //alert(each);
    each++;
}

$(document).ready(function(){
    if( !location_is_embed && !specific_video_id ){
        connect( false, 'false' );
    }
});

if( iOS || isEdge() ){

    /*
    var remaining_time_interval = setInterval(function(){

        var remaining_time = $('.vjs-play-progress').attr('style');

        if( remaining_time == 'width: 100%;' ){
            
            alert(111);
            connect( false, 'false' );
        }

        clearInterval(remaining_time_interval);
    },1000 );
    */


    if( document.getElementById('videoObj_html5_api') != null ){
        document.getElementById('videoObj_html5_api').addEventListener('ended',myHandler,false);
    }else{
        document.getElementById('videoObj').addEventListener('ended',myHandler,false);
    }
    
    function myHandler(e) {
        //alert('video ended ios');
        if( !location_is_embed ){

            connect( false, 'false' );

        }
    }
}else{ 
    document.getElementById('videoObj').addEventListener('ended',myHandler,false);
    function myHandler(e) {
        alert('video ended');
        if( !location_is_embed ){

            connect( false, 'false' );
            
        }
    }
    
}

function getVideoBoxes( url, parent_id, limit, more_btn_id )
{   


    var video_data_for_boxes = getVideos(url);
    var video_boxes_count = 1;
    var video_boxes_wrapper_count = 1;
    //var content = '<div class="feat-vdo-list">';
    var content = '';
    $.each( video_data_for_boxes, function( index, val ){

    //    content+='<div class="feat-vdo-item" style="background-image:url('+ val.thumbStreamSource +');"><a onclick="select_video('+ index +', false )" href="#" class="feat-btn"><img src="'+ website_url +'images/play-btn-banner.png" class="img-responsive"></a><div class="feat-text"><p>'+ val.nomeStreamSource +'</p></div></div>';
        content+='<div class="a-channel"><img src="'+ val.thumbStreamSource +'" alt=""><div class="channel-data"><p onclick="select_video('+ index +', false )">'+ val.nomeStreamSource +'</p></div></div>';
        
      /*   if( more_btn_id && limit && video_boxes_count == limit ){
            content += '</div><div style="display:none" class="feat-vdo-list feat-vdo-list-'+ video_boxes_wrapper_count +'">';
            video_boxes_wrapper_count++;
            video_boxes_count = 0;
        } */

      //  video_boxes_count++;
    });

  //  content += '</div>';

    $('#' + parent_id ).html('');
    $('#' + parent_id ).append( content );

    // functionality for open and close more boxes
    if( more_btn_id && limit && video_boxes_wrapper_count > 1 ){

        var each_opened = 0;

        $("#" + more_btn_id ).click(function(){

            each_opened++;

            if( each_opened < video_boxes_wrapper_count ){

                $("#"+ parent_id +" .feat-vdo-list-" + each_opened).slideToggle("slow");

            }

            if( each_opened == video_boxes_wrapper_count - 1 ){
                
                $("#" + more_btn_id ).toggleClass("more-btn-1-min");

            }

            if( each_opened == video_boxes_wrapper_count ){

                each_opened = 0;

                //hide opened boxes
                for( index_opened = video_boxes_wrapper_count - 1; index_opened > 0 ; index_opened-- ){

                    $("#"+ parent_id +" .feat-vdo-list-" + index_opened).slideToggle("slow");

                }

                $("#" + more_btn_id ).toggleClass("more-btn-1-min");

            }

        });

    }
    //end functionality for open and close more boxes
}
/* end Last updates */

function getVideos(url) {

    var response = null;

    jQuery.ajax({
            method: "GET",
            url: url,
            dataType: "json",
            async:false
            /*data: { id: "1" }*/
    })
    .done(function( data ) {
        response = data;
    })
    .fail(function (jqXHR, textStatus) {
        response = textStatus;
    });

    return response;
}

function getVideo(url,idVideo) {

var response = null;

jQuery.ajax({
        method: "GET",
        url: url,
        dataType: "json",
        async:false,
        data: { id: idVideo }
    })
    .done(function( data ) {
        response = data;
    })
    .fail(function (jqXHR, textStatus) {
        response = textStatus;
    });

    return response;
}

function votaRating(idStreamSource,pathSource,rating){

    var response = "";
    var url =  pathSource;
    var obj = { "idstream": "", "ratestream": "", "useragg": "" };
    obj.idstream = idStreamSource ;
    obj.ratestream = rating;
    //alert(idStreamSource);
    jQuery.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(obj)
        })
        .done(function( data ) {
            return true;
        })
        .fail(function (jqXHR, textStatus) {
            response = textStatus;

        });

    return response;

}

function updateView(idStreamSource,urlUpdateView,tipo){
    //alert(idStreamSource+" - "+urlUpdateView+" - "+tipo);
    var response = "";
    //var url = "http://new.tegme.tv/api/ViewUpdate";
    var url =  urlUpdateView;
    var obj = { tipo: "", idobject: "" };
    obj.idobject = idStreamSource
    obj.tipo = tipo;
    //alert(obj.idobject);
    jQuery.ajax({
        url: url,
        type: "POST",
        contentType: "application/json",
        data: JSON.stringify(obj)
    })
    .done(function( data ) {
        return true;
    })
    .fail(function (jqXHR, textStatus) {
        response = textStatus;

    });

    return response;

}

var select_video_via_idstreamSource_page_already_loaded = false;
var embed_page_video_not_found = false;


function select_video_via_idstreamSource_for_map( idStreamSource )
{   // to show it in an alert window

    $( document ).scrollTop( 0 );

	url_for_map =  "http://www.tegme.tv/api/embed/" + idStreamSource;
    idStreamSource = Number( idStreamSource );
   
    if( idStreamSource != NaN && idStreamSource != 0 ){

        $.getJSON(url_for_map, function(json) {

            $.each( json, function( ind, value ){

                if( value.idStreamSource == idStreamSource ){
								if( location_is_embed ){

                                    select_video( ind, json );

                                }else{

                                    select_video( ind, 'false' );

                                }
                                
						}
                    });

        });
    }else{

        embed_page_video_not_found = true;
        alert("Please write valid video id");
        return false;

    }

}




function select_video_via_idstreamSource( idStreamSource )
{   // to show it in an alert window

    $( document ).scrollTop( 0 );

    //for test url
    if( location_is_embed ){
        url =  "http://www.tegme.tv/api/embed/" + idStreamSource;
        //console.log(url);
    }
    //end for test url

    idStreamSource = Number( idStreamSource );
    var found = false;

    if( idStreamSource != NaN && idStreamSource != 0 ){

        $.getJSON(url, function(json) {

            $.each( json, function( ind, value ){

                if( value.idStreamSource == idStreamSource ){
                    var way_1 = false;
                    var way_2 = false;

                    //alert('before starting two ways');

                    var interval_idstream = setInterval(function(){

                        if( select_video_via_idstreamSource_page_already_loaded && !way_2 ){
                            //alert('way 1');
                            way_1 = true;

                                select_video_via_idstreamSource_page_already_loaded = true;

                                if( location_is_embed ){

                                    select_video( ind, json );

                                }else{

                                    select_video( ind, 'false' );

                                }
                                

                        }

                        clearInterval(interval_idstream);
                    },1000);

                    $(window).load(function(){
                        //alert('way 2');
                        if( !way_1 ){

                            way_2 = true;

                            var interval_idstream = setInterval(function(){
                                select_video_via_idstreamSource_page_already_loaded = true;
                                if( location_is_embed ){

                                    select_video( ind, json );

                                }else{

                                    select_video( ind, 'false' );

                                }
                                clearInterval(interval_idstream);
                            },1000);

                        }

                    });
                    found = true;
                    return false;
                }

            });

            if(!found){
                embed_page_video_not_found = true;
                alert("Please write valid video id");
                return false;
            }

        });
    }else{

        embed_page_video_not_found = true;
        alert("Please write valid video id");
        return false;

    }

}
$(window).load(function(){
    var interval_idstream_for_checking_load_state = setInterval(function(){
        select_video_via_idstreamSource_page_already_loaded = true;
        clearInterval(interval_idstream_for_checking_load_state);
    },1000);
});
//responsivity
$('#videoObj').css({ 'width': '100%', 'height' : '100%' });
$(document).ready(function(){

    var window_width = $(window).width();
    if( window_width > 1280 ){
        window_width = 1280;
    }
    var window_height = window_width / 1.7777;
    $('#video-wrap-new').width( window_width );
    $('#video-wrap-new').height( window_height );
    var interval = setInterval(function(){
        $('.videoObj-dimensions').css({'width': '100%', 'height' : '100%'});
    },500);

});
$( window ).resize(function(){

    var window_width = $(window).width();
    if( window_width > 1280 ){
        window_width = 1280;
    }
    var window_height = window_width / 1.7777;
    $('#video-wrap-new').width( window_width );
    $('#video-wrap-new').height( window_height );
    $('.videoObj-dimensions').height( $('#video-wrap-new').height() );
});



$(document).ready(function () {

    if( !location_is_embed ){

        //Call getVideo boxes when document is ready
        // video boxes 1
        var url_of_video_list = urlfeat; // json source of video list
        var parent_id = 'next-video'; // in HTML where will inside boxes
        var limit_of_boxes = 4; // how many boxes need to show ( optional but you will add boolean false if not want limit, required to add more_btn_id false too)
        var more_btn_id = 'more-btn-1'; // button for load more boxes if have data ( optional if you don't want to load more datas you can set this boolean false )
        getVideoBoxes(url_of_video_list, parent_id, limit_of_boxes, more_btn_id );

        //video boxes 2
        url_of_video_list = urlmostv;
        parent_id = 'video_boxes_wrapper_2';
        limit_of_boxes = 4;
        more_btn_id = 'more-btn-2';
       // getVideoBoxes(url_of_video_list, parent_id, limit_of_boxes, more_btn_id );
        //end Call getVideo boxes when document is ready

    }

});