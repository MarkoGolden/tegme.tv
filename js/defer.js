var base_url_defer = "http://www.tegme.tv/js/";
//var base_url_defer = "js/";

function downloadJSAtOnload() {

	var map_api = document.createElement("script");
	map_api.src = base_url_defer + "dPlayer/js/map_api.js";
	document.body.appendChild(map_api);


	var social_api = document.createElement("script");
	social_api.src = base_url_defer + "dPlayer/js/social_api.js";
	document.body.appendChild(social_api);

	var video_js = document.createElement("script");
	video_js.src = base_url_defer + "dPlayer/node_modules/video.js/dist/video.min.js";
	document.body.appendChild(video_js);

	var video_js_ie8 = document.createElement("script");
	video_js_ie8.src = base_url_defer + "dPlayer/node_modules/video.js/dist/ie8/videojs-ie8.min.js";
	document.body.appendChild(video_js_ie8);

	var video_js_hls = document.createElement("script");
	video_js_hls.src = base_url_defer + "dPlayer/js/videojs-contrib-hls.min.js";
	document.body.appendChild(video_js_hls);

	var TegmePlayer = document.createElement("script");
	TegmePlayer.src = base_url_defer + "dPlayer/js/TegmePlayer.js";
	document.body.appendChild(TegmePlayer);
	
	
	var api = document.createElement("script");
	api.src = base_url_defer + "dPlayer/js/api.js";
	document.body.appendChild(api);



	var search = document.createElement("script");
	search.src = base_url_defer + "dPlayer/js/search.js";
	document.body.appendChild(search);

	var search = document.createElement("script");
	search.src = base_url_defer + "dPlayer/js/search.js";
	document.body.appendChild(search);	

}
if (window.addEventListener)
	window.addEventListener("load", downloadJSAtOnload, false);
else if (window.attachEvent)
	window.attachEvent("onload", downloadJSAtOnload);
else window.onload = downloadJSAtOnload;