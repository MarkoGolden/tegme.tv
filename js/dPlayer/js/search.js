var autocompleters_url = 'http://new.tegme.tv/api/searchtitle/';
var repeaters_url = 'http://new.tegme.tv/api/search/';

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
			console.log(json);
			var repeater_content = '';

			$.each( json, function( index, val ){

				repeater_content += "<div style='width:100%; height:150px; border:1px solid silver; background:#fff'><div style='width:10%;float:left;height:100%;display:flex;justify-content:center;align-items:center'><img style='width:80px;height:80px;border-radius:100px' src='"+ val.thumbs +"'></div><div style='float:right;width:90%;height:100%;padding:30px 30px'><div style='width:88%;height:100%;float:left'><span style='font-size:18px;color:#70ad47'>"+ val.titolo +"</span><br><span style='font-size:20px'>"+ val.channelname +"</span></div><div style='width:12%;height:100%;float:right'><a style='text-decoration:none;cursor:pointer;font-weight: 600;text-align:center;width:140px;height:40px;padding:10px 10px;border:1px solid #70ad47;background:#70ad47;color:#fff;display:block' href='"+ val.urllink +"'>SEE VIDEO</a></div></div></div>";

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