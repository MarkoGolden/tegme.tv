/* urls */
var website_url = 'http://www.tegme.tv/';
var producers_list_url = website_url + 'api/listproducer/a';
var followers_list_url = website_url + 'api/listfollower/';
var urlfeat =   website_url + /*"api/list/b/nba"; */"api/listhome/top";
var urlmostv =  website_url + /*"api/list/mv1/nba"; */"api/listhome/bottom";


function getVideoBoxes( url, parent_id, limit, more_btn_id )
{   
//alert(345)
    var video_data_for_boxes = getVideos(url);
    var video_boxes_count = 1;
    var video_boxes_wrapper_count = 1;
   // var content = '<div class="feat-vdo-list">';
    var content = '';

    $.each( video_data_for_boxes, function( index, val ){

	
	content+='<div class="col-md-3 col-sm-6' +((index > 3) ? ' hidden-class': '')+'"><div class="jelly_fish" style="background-image:url(\''+val.thumbStreamSource+'\')"><div class="small_video_box"><div class="small_video_box_inner"><div class="small_video_play grip-bg-img"><a href="' + website_url + val.ChannelName + '/' + val.idStreamSource + '"><i class="fa fa-play" aria-hidden="true"></i></a></div><div class="small_video_caption"><h3>'+ val.ChannelName.toUpperCase() +'</h3><h4>'+ val.nomeStreamSource +'</h4></div></div></div></div></div>'

      //  content+='<div class="feat-vdo-item" style="background-image:url('+ val.thumbStreamSource +');"><a href="' + website_url + val.ChannelName + '/' + val.idStreamSource + '" class="feat-btn"><img src="'+ website_url +'images/play-btn-banner.png" class="img-responsive"></a><div class="feat-text"><p style="text-align:right;padding-right: 10px;font-weight: 600;">'+ val.ChannelName.toUpperCase() +'</p><p>'+ val.nomeStreamSource +'</p></div></div>';
        
   /*      if( more_btn_id && limit && video_boxes_count == limit ){
            content += '</div><div style="display:none" class="feat-vdo-list feat-vdo-list-'+ video_boxes_wrapper_count +'">';
            video_boxes_wrapper_count++;
            video_boxes_count = 0;
        }
 */
      //  video_boxes_count++;
    });

    //content += '</div>';

   // $('#' + parent_id ).html('');
  /*  if(parent_id == "mostViewed_vid")
    $('#' + parent_id ).prepend( content );
   else */
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

function getProducerBoxes( url, parent_id, limit, more_btn_id )
{   
    var prod_data_for_boxes = getProducers(url);
    //console.log( prod_data_for_boxes );
    var prod_boxes_count = 1;
    var prod_boxes_wrapper_count = 1;
  //  var content = '<div class="row">';
    var content = '';

    $.each( prod_data_for_boxes, function( index, val ){

		var facebook_string = "'facebook'";
        var linkedin_string = "'linkedin'";
        var nomeCanale_string = "'" + val.nomeCanale + "'";
//console.log(val)


/*         var facebook_string = "'facebook'";
        var linkedin_string = "'linkedin'";
        var nomeCanale_string = "'" + val.nomeCanale + "'";
		if(index / 8 == 0)
		content +='<div class="clearfix"></div>';
		content +='<div class="col-md-3 col-sm-4 col-xs-6"><div class=best_producers_box><div class=row><div class="col-md-5 col-sm-5 col-xs-5"><img class="img-circle img-thumbnail" src="'+ val.fotoprod +'"></div><div class="col-md-7 col-sm-7 col-xs-7">'+ ( val.fblink != null && val.fblink !="" ? '<a href="'+ val.fblink +'"><img src="img/fb.png"></a>':"" ) + ''+ ( val.lklink != null && val.fblink !="" ? '<a href="'+ val.lklink +'"><img src="img/lk.png" style=margin-left:20px></a>' : "" ) +'<h2>'+ val.nomeprod +'</h2><h3>'+ val.nomeprod +'</h3><h4>'+ val.numerovideo +' Videos</h4></div></div></div></div>';
		 */


		 content+='<div class="item '+((index == 0) ? 'active': '')+'"> <div class="col-md-3 col-sm-6 col-xs-12 icons_social"> <a href="#"><div class="follower-img" style="background-image:url(\''+ val.fotoprod +'\')"></div></a> <div class="text-center"> <h3>'+ val.nomeCanale +'</h3> <h4>'+ val.nomeprod +'</h4> </div><div class="social_icons"> <div class="social_icons_inner"> <div class="social_icon_fake"><div class="visit "><i class="fa fa-eye" aria-hidden="true"></i> '+val.numerovisite+'</div> <div class="facebook_in"><a onclick="follow('+ facebook_string + ', '+ nomeCanale_string +')" href=""><img src="img/fb.png"/></a><a onclick="follow( '+ linkedin_string +', '+ nomeCanale_string +' )" href=""><img src="img/lk.png"/></a></div><div><img src="'+val.logochannel+'"/></div></div></div></div></div></div>';
		
		
		
    });

  

    $('#' + parent_id ).html('');
    $('#' + parent_id ).append( content );


}

function getProducers(url) {

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

function getFollowerBoxes( url, parent_id, limit, more_btn_id, count_for_api )
{   
    var follower_data_for_boxes = getFollowers(url, count_for_api );
    var content = '';

    $.each( follower_data_for_boxes, function( index, val ){

        var fw_social_icon = '';
        if( val.socialtype == 'facebook' ){
           // fw_social_icon = '<img src="'+ website_url +'images/facebook-icon.png" style="width: 14px;">';
            fw_social_icon = '<img src="img/fb.png"/>';
        }else if( val.socialtype == 'linkedin' ){
          //  fw_social_icon = '<img src="'+ website_url +'images/linkedin-icon.png" style="width: 24px;">';
            fw_social_icon = '<img src="img/lk.png"/>';
        }

		
		var fw_imagespath = val.fw_imagespath;
        if( fw_imagespath == 'picture_url' ){
            fw_imagespath = website_url + 'dPlayer/images/Individual-icon.png';
        }
		
		/* if(index / 8 == 0)
		content +='<div class="clearfix"></div>'; */
		content +='<div class="col-md-3 col-sm-4 col-xs-6 '+((index > 3) ? "hidden-follower" : "" )+'"><div class=best_producers_box><div class=row><div class="col-md-5 col-sm-5 col-xs-5"><img class="img-circle img-thumbnail" src="'+ fw_imagespath +'"></div><div class="col-md-7 col-sm-7 col-xs-7"><a href="">'+fw_social_icon+'</a><h2>'+ val.fw_name +'</h2><h3>'+ val.channelName +'</h3></div></div></div></div>';
		
		
		
		

	});

    $('#' + parent_id ).html('');
    $('#' + parent_id ).append( content );


}

function getFollowers(url, count) {

    var response = null;

    jQuery.ajax({
        method: "GET",
        url: url + count,
        dataType: "json",
        async:false
    })
    .done(function( data ) {
        response = data;
    })
    .fail(function (jqXHR, textStatus) {
        response = textStatus;
    });

    return response;
}

$(document).ready(function () {


    //Call getVideo boxes when document is ready
    // video boxes 1
    var url_of_video_list = urlfeat; // json source of video list
    var parent_id = 'feature_vid'; // in HTML where will inside boxes
    var limit_of_boxes = 4; // how many boxes need to show ( optional but you will add boolean false if not want limit, required to add more_btn_id false too)
    var more_btn_id = 'more-btn-1'; // button for load more boxes if have data ( optional if you don't want to load more datas you can set this boolean false )
    getVideoBoxes(url_of_video_list, parent_id, limit_of_boxes, more_btn_id );

    //video boxes 2
    url_of_video_list = urlmostv;
    parent_id = 'mostViewed_vid';
    limit_of_boxes = 4;
    more_btn_id = 'more-btn-2';
    getVideoBoxes(url_of_video_list, parent_id, limit_of_boxes, more_btn_id );
    //end Call getVideo boxes when document is ready

    //Call getProducer boxes when document is ready
    var url_of_prod_list = producers_list_url; // json source of producers list
    var parent_id = 'bestProducers'; // in HTML where will inside boxes
    var limit_of_boxes = 6; // how many boxes need to show ( optional but you will add boolean false if not want limit, required to add more_btn_id false too)
    var more_btn_id = 'prodmore-btn-1'; // button for load more boxes if have data ( optional if you don't want to load more datas you can set this boolean false )
    getProducerBoxes(url_of_prod_list, parent_id, limit_of_boxes, more_btn_id );
    //end getProducer boxes when document is ready

    //Call getFollower boxes when document is ready
    var url_of_follower_list = followers_list_url; // json source of followers list
	var parent_id = 'carousel-items'; // in HTML where will inside boxes
    var limit_of_boxes = 4; // how many boxes need to show ( optional but you will add boolean false if not want limit, required to add more_btn_id false too)
    var more_btn_id = 'followermore-btn-1'; // button for load more boxes if have data ( optional if you don't want to load more datas you can set this boolean false )
    var count_for_api = 12; // count how many follower data get from api
    getFollowerBoxes(url_of_follower_list, parent_id, limit_of_boxes, more_btn_id, count_for_api );
    //end getFollower boxes when document is ready
});


/* Search */
var autocompleters_url = 'http://www.tegme.tv/api/searchtitle/';
var repeaters_url = 'http://www.tegme.tv/api/search/';

//var search_bar = $('#search-bar');
var search_input = $('#search-input');
var search_btn = $('#search-btn');
var autocompleter_container = $('#autocompleter-container');
var repeater_container = $('#repeater-container');

//css
autocompleter_container.css({ 'width' : '100%', 'max-height' : '320px', 'overflow-y' : 'scroll', 'position': 'absolute', 'z-index' : '999' });
repeater_container.css({ 'width' : '100%', 'max-height' : '600px', 'overflow-y' : 'scroll', });
search_btn.css({ 'cursor' : 'pointer' });

var autocompleter_style = "border:1px solid silver; background: #e6e6e6; font-family : 'Raleway', sans-serif;font-size : 28px;color : #595959;font-weight : 300;padding : 2px 30px;width : 100%;cursor : pointer";

function search_title( text )
{   

    if( text != '' ){

        $.getJSON( autocompleters_url + text , function(json) {
            
            var autocompleter_content = '';

            $.each( json, function( index, val ){

                autocompleter_content += '<div style="'+ autocompleter_style +'" class="autocompleter">'+ val +'</div>';

            });

            autocompleter_container.html( autocompleter_content );

        });

    }else{
        //delete titles
        autocompleter_container.html('');
    }

}

function search_repeaters( text )
{   

    //delete titles
    autocompleter_container.html('');

    //delete repeaters
    repeater_container.html('');

    if( text != '' ){

        $.getJSON( repeaters_url + text , function(json) {
            //console.log(json);
            var repeater_content = '';

            $.each( json, function( index, val ){

                repeater_content += "<div style='width:100%; height:150px; border:1px solid silver; background:#fff'><div style='width:10%;float:left;height:100%;display:flex;justify-content:center;align-items:center'><img style='width:80px;height:80px;border-radius:100px' src='"+ val.thumbs +"'></div><div style='float:right;width:90%;height:100%;padding:30px 30px'><div style='width:88%;height:100%;float:left'><span style='font-size:18px;color:#70ad47'>"+ val.titolo +"</span><br><span style='font-size:20px'>"+ val.channelname +"</span></div><div style='width:12%;height:100%;float:right'><a style='text-decoration:none;cursor:pointer;font-weight: 600;text-align:center;width:140px;height:40px;padding:10px 10px;border:1px solid #70ad47;background:#70ad47;color:#fff;display:block' href='"+ val.urllink +"'>SEE VIDEO</a><div style='width:100%;height:10px'></div><a style='text-decoration:none;cursor:pointer;font-weight: 600;text-align:center;width:140px;height:40px;padding:10px 10px;border:1px solid #70ad47;background:#fff;color:#70ad47;display:block' href='"+ val.channellink +"'>SEE CHANNEL</a></div></div></div>";

            });

            repeater_container.html( repeater_content );

        });

    }else{
        //delete repeaters
        repeater_container.html('');
    }
}


search_input.keyup(function(){

    search_title( search_input.val() );
    
});

var clicked_to_title = false;
search_input.focusout( function(){

    var focusout_interval = setInterval( function(){ 

        if( !clicked_to_title ){

            autocompleter_container.html('');

        }
        clicked_to_title = false;

        clearInterval( focusout_interval );
    }, 500 );


});

search_btn.click(function(){

    search_repeaters( search_input.val() );

});


autocompleter_container.on( 'click', '.autocompleter', function(){

    clicked_to_title = true;
    search_input.val( $(this).html() );
    autocompleter_container.html('');

});

function showall(container)
{
	$("#"+container).find("div.hidden-class").fadeIn(1000);	
}