// Channel name is url last param
var channel_name = window.location.href;

if( channel_name.split('/').length == 5 ){
    channel_name = channel_name.split('/').slice(-2)[0];
}else{
	channel_name = channel_name.split('/').slice(-1)[0];
}

//Follow success message
var follow_message = '<div id="follow_message" style="display:none;width:100%;height:100px;position:absolute;z-index:999;padding:20px 20px;text-align:center;justify-content:center;align-items:center"><div style="display: flex;align-items: center;justify-content: center;border-radius: 10px;color:#70ad47;border:1px solid #70ad47;background:#fff;font-size:20px;font-weight:600;width:400px;height:60px">Now you are follower of this channel</div></div>';
$('body').prepend( follow_message );

/* Account types are string */
// facebook
var fb_app_id = '510169042491970';
window.fbAsyncInit = function() {
	FB.init({
	  appId      : fb_app_id,
	  xfbml      : true,
	  version    : 'v2.5'
	});
};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = "//connect.facebook.net/en_US/sdk.js";
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
// end facebook

// twitter
/*
window.twttr = (function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0],
    t = window.twttr || {};
  if (d.getElementById(id)) return t;
  js = d.createElement(s);
  js.id = id;
  js.src = "https://platform.twitter.com/widgets.js";
  fjs.parentNode.insertBefore(js, fjs);
 
  t._e = [];
  t.ready = function(f) {
    t._e.push(f);
  };
 
  return t;
}(document, "script", "twitter-wjs"));
*/
//end twitter

// linkedin
/* Need to add this code inside <head>

<script type="text/javascript" src="//platform.linkedin.com/in.js">
    api_key: 784w5ubxzjccgp
    authorize: true
    onLoad: onLinkedInLoad
</script>

this code add to <body>

<script type="in/Login"></script>

*/
// Setup an event listener to make an API call once auth is complete
function onLinkedInLoad() {}

function getProfileData() {
	IN.API.Profile("me").result(ShowProfileData);
}

function ShowProfileData(profiles) {
	// get account datas from social api
	var account_type 	= 'linkedin';
	var account_id   	= 'account_id';
	var account_email 	= 'account_email';
	var picture_url		= 'picture_url';
	var account_name	= 'account_name';

    var member = profiles.values[0];

    account_id = member.id;
    
    if( member.pictureUrl != null ){
    	picture_url = member.pictureUrl;
    }

    account_name = member.firstName + ' ' +  member.lastName;

    // make object for call api and insert to db
	var obj = { 'account_type' : account_type, 'account_id' : account_id, 'account_email': account_email, 'picture_url' : picture_url, 'account_name' : account_name, 'channel_name' : channel_name };
	//call add_to_db function for insert datas to db
	add_to_db( obj );
}

$(window).load(function(){
	$('.IN-widget').hide();
});
// end linkedIn


function follow( account_type, producer_channel )
{
	switch (account_type) {
	
		case 'facebook':
		
			follow_facebook( producer_channel );

			break;
		
		case 'twitter':
		
			follow_twitter( producer_channel );

			break;
		
		case 'linkedin':
		
			follow_linkedin( producer_channel );

			break;
		
		default:
		
			return false;
	
	}

}

	
function follow_facebook( producer_channel )
{	
	// check follow is producer or default and set channel name
	if( producer_channel ){
		channel_name = producer_channel;
	}

	FB.login(function(response) {
	    if (response.authResponse) {

			// get account datas from social api
			var account_type 	= 'facebook';
			var account_id   	= 'account_id';
			var account_email 	= 'account_email';
			var picture_url		= 'picture_url';
			var account_name	= 'account_name';

	    	// get profile picture
	    	FB.api('/me/picture?type=large&redirect=false', function(response) {

				picture_url	    = response.data.url;

	    	});

	    	// get profile id, name, email
			FB.api('/me', function(response) {

				account_id   	=  response.id;
				account_name	=  response.name;

			});

			var facebook_interval = setInterval( function(){

				if( picture_url != 'picture_url' && account_id != 'account_id' ){

					// make object for call api and insert to db
					var obj = { 'account_type' : account_type, 'account_id' : account_id, 'account_email': account_email, 'picture_url' : picture_url, 'account_name' : account_name, 'channel_name' : channel_name };
					//call add_to_db function for insert datas to db
					//console.log( obj );
					add_to_db( obj );

					clearInterval( facebook_interval );
				}

			},500 );


	    } else {
			//console.log('User cancelled login or did not fully authorize.');
			return false;
	    }
	});
	
}

function follow_twitter( producer_channel )
{
	// check follow is producer or default and set channel name
	if( producer_channel ){
		channel_name = producer_channel;
	}

}

function follow_linkedin( producer_channel )
{
	// check follow is producer or default and set channel name
	if( producer_channel ){
		channel_name = producer_channel;
	}

	$('.IN-widget span span').first().click();
	
	IN.Event.on(IN, "auth", getProfileData);
	getProfileData();

}

function add_to_db( obj )
{	
  	$.ajax({
		type: "POST",
		data: JSON.stringify(obj),
		url: website_url + "api/follower",
		contentType: "application/json",

		success: function(response) {
            
//            console.log(response);
            $('#myModal').modal('toggle');
            $('#follow_message').css({'display' : 'flex', 'top' : $(document).scrollTop() });
            $('#follow_message').show();
            var follow_message_interval = setInterval( function(){

            	$('#follow_message').hide();
            	clearInterval( follow_message_interval );
            }, 4000 );
        }

   	});
}

/* Facebook share */
function publish()
{	

	var share_picture = video_data_for_share.thumbStreamSource;
	var share_link = website_url + browserUrlBarPathname + '/' +  video_data_for_share.idStreamSource;
	var share_name = video_data_for_share.nomeStreamSource;
	var share_source = website_url + browserUrlBarPathname + '/' +  video_data_for_share.idStreamSource;
	var share_description = video_data_for_share.nomeStreamSource;

	var feed = {
	    method: 'feed',
	    picture: share_picture,
	    link: share_link,
	    name: share_name,
	    description: share_description,
	    source: share_source,
	    type: 'video',
	};

	function callback(response){
	    if(response && response.post_id !== undefined) {
	        //  alert('published');
	    }
	}

	FB.ui(feed, callback);

/*	
	FB.login(function(response) {
	    if (response.authResponse) {

	    	// make the API call 
			FB.api(
			    "/me/objects/video.tv_show",
			    "POST",
			    {
			        "object": "{\"fb:app_id\":\"510169042491970\",\"og:type\":\"video.tv_show\",\"og:url\":\"http:\\\/\\\/new.tegme.tv\\\/embed.aspx?idvideo=121\",\"og:title\":\"Sample TV Show\",\"og:image\":\"https:\\\/\\\/s-static.ak.fbcdn.net\\\/images\\\/devsite\\\/attachment_blank.png\",\"video:actor:id\":\"Sample Actor: ID\"}"
			    },
			    function (response) {
			    	alert(111);
			    	console.log( response );
			      if (response && !response.error) {
			        // handle the result 
			        alert(111);
			      }
			    }
			);
		}
	});
*/
}
/* end Facebook share */