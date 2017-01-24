var api_location_url = 'http://www.tegme.tv/api/locations/';
var website_url = 'http://www.tegme.tv/';
// Channel name is url last param
var channel_name_for_map = window.location.href;

if( channel_name_for_map.split('/').length == 5 ){

	channel_name_for_map = channel_name_for_map.split('/').slice(-2)[0];

}else{

	channel_name_for_map = channel_name_for_map.split('/').slice(-1)[0];
}

if(channel_name_for_map == 'map.html'){
	channel_name_for_map = 'nba'; //test
}

api_location_url = api_location_url + channel_name_for_map;

//api_location_url = '/dplayer/datas/channelmap.json'; //test

$.getJSON(api_location_url, function(json) {

	// code to draw map
	var map;
	var col = '#FF0000';
	var link ;
	var latLng;
	var polypoints;
	initialize();
	function initialize() {

		var locations_programs = json;

		var markersArray = [];
		var markers = {};
		var center_georef = "'41.9757793','12.4438012'";
		center_georef = center_georef.split(",");
		if( locations_programs[0] && locations_programs[0].georef != "" ){
			center_georef = locations_programs[0].georef.split(",");
		}
		var center_lat = center_georef[0].slice(1, -1);
		var center_lng = center_georef[1].slice(1, -1);
		
		var mapOptions = {

		    center: new google.maps.LatLng( center_lat , center_lng ),
		    zoom: 6,
		    scrollwheel: false,
		    scaleControl: true,
		    draggable: false,
		    mapTypeId: google.maps.MapTypeId.ROADMAP,
		    zoomControl: true,
		    zoomControlOptions: {
		        style: google.maps.ZoomControlStyle.LARGE,
		        position: google.maps.ControlPosition.RIGHT_TOP
			},
		    panControl: true,
		        panControlOptions: {
		        position: google.maps.ControlPosition.TOP_RIGHT
			}
	  	};

		map = new google.maps.Map(document.getElementById('map'),
		mapOptions);

		//var custommap = [{"featureType":"administrative","elementType":"labels.text","stylers":[{"lightness":"15"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"saturation":"-100"},{"lightness":"23"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":"35"},{"lightness":"46"},{"gamma":1},{"hue":"#6dff00"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"lightness":"16"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#78ff00"},{"saturation":"22"},{"lightness":"50"},{"gamma":1}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"lightness":"-27"},{"weight":"0.76"},{"saturation":"0"}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":"21"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"lightness":"-12"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#0011ff"},{"saturation":"-84"},{"lightness":"59"},{"gamma":1},{"weight":"0.50"}]},{"featureType":"road.highway.controlled_access","elementType":"all","stylers":[{"lightness":"0"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"hue":"#ff0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"transit","elementType":"all","stylers":[{"lightness":"7"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#009dff"},{"saturation":"-2"},{"lightness":"10"},{"gamma":1}]}];
		var custommap = [{ "featureType": "water", "elementType": "geometry", "stylers": [{ "visibility": "on" }, { "color": "#aee2e0" }] }, { "featureType": "landscape", "elementType": "geometry.fill", "stylers": [{ "color": "#abce83" }] }, { "featureType": "poi", "elementType": "geometry.fill", "stylers": [{ "color": "#769E72" }] }, { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#7B8758" }] }, { "featureType": "poi", "elementType": "labels.text.stroke", "stylers": [{ "color": "#EBF4A4" }] }, { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "visibility": "simplified" }, { "color": "#8dab68" }] }, { "featureType": "road", "elementType": "geometry.fill", "stylers": [{ "visibility": "simplified" }] }, { "featureType": "road", "elementType": "labels.text.fill", "stylers": [{ "color": "#5B5B3F" }] }, { "featureType": "road", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ABCE83" }] }, { "featureType": "road", "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] }, { "featureType": "road.local", "elementType": "geometry", "stylers": [{ "color": "#A4C67D" }] }, { "featureType": "road.arterial", "elementType": "geometry", "stylers": [{ "color": "#9BBF72" }] }, { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#EBF4A4" }] }, { "featureType": "transit", "stylers": [{ "visibility": "off" }] }, { "featureType": "administrative", "elementType": "geometry.stroke", "stylers": [{ "visibility": "on" }, { "color": "#87ae79" }] }, { "featureType": "administrative", "elementType": "geometry.fill", "stylers": [{ "color": "#7f2200" }, { "visibility": "off" }] }, { "featureType": "administrative", "elementType": "labels.text.stroke", "stylers": [{ "color": "#ffffff" }, { "visibility": "on" }, { "weight": 4.1 }] }, { "featureType": "administrative", "elementType": "labels.text.fill", "stylers": [{ "color": "#495421" }] }, { "featureType": "administrative.neighborhood", "elementType": "labels", "stylers": [{ "visibility": "off" }] }]


		map.set('styles', custommap);

		//***  PROGRAMS
		var marker, i;
		var id = 'programs';
		var hover_icon;

		//Get repeated locations
		/*
		var repeated_locations_programs = [];

		$.each( locations_programs, function( index, value ){

			$.each( locations_programs, function( ind, val ){

				if( value.georef == val.georef && index != ind ){

					var found_added = false;

					// check already added object
					$.each( repeated_locations_programs, function( i,v ){

						if( v.IdStreamSource == val.IdStreamSource ){
							found_added = true;
						}

					});

					// if not already added, add object to array
					if( !found_added ){
						repeated_locations_programs.push( val );
					}

				}

			});			

		});

		//delete repeated objects from locations_programs array
		$.each( locations_programs, function( index, value ){

			$.each( repeated_locations_programs, function( i,v ){

				if( value.IdStreamSource == v.IdStreamSource ){

					delete locations_programs[ index ];

				}

			});

		});
		console.log( locations_programs );
		console.log( repeated_locations_programs );
		*/
		//end Get repeated locations

	  	for (i = 0; i < locations_programs.length; i++) {

	  		if( locations_programs[i] != undefined && locations_programs[i].georef != "" && locations_programs[i].georef != "0" ){

	  			var id = 'programs' + i;
		    	var georef = locations_programs[i].georef.split(",");
				var lat = center_georef[0].slice(1, -1);
				lat = Number(lat) + (Math.random() -.5) / 1500;
				var lng = center_georef[1].slice(1, -1);
				lng = Number(lng) + (Math.random() -.5) / 1500;

			    hover_icon = {
			        url: locations_programs[i].streamThumb, // url
			        scaledSize: new google.maps.Size(100, 100), // scaled size
			        //origin: new google.maps.Point(0,0), // origin
			        //anchor: new google.maps.Point(0, 0) // anchor
			    };
			    /*
			    marker = new google.maps.Marker({

					position: new google.maps.LatLng(lat, lng)
					,map: map
					,id: id
					,icon: 'dPlayer/images/green-oval-button-hi.png'
					,url: locations_programs[i].IdStreamSource
					,zIndex:100
					,hover_icon: hover_icon
					,title: locations_programs[i].SourceName

			    });*/
			    marker = new ImageMarker({
			        map: map,
			        position: new google.maps.LatLng(lat, lng),
			        image: locations_programs[i].streamThumb,
			        icon: website_url + 'channels/img/gmapicon.png', //'dPlayer/images/green-oval-button-hi.png',
			        title: locations_programs[i].SourceName,
			        url: locations_programs[i].IdStreamSource,
			        events: {
			            click: function( event ) {
			                
			            }
			        }
			    });


			    /*
				google.maps.event.addListener(marker, 'mouseover', function(event) {
					this.setIcon( marker.hover_icon );
				});
				google.maps.event.addListener(marker, 'mouseout', function(event) {
					this.setIcon('http://www.christielakekids.com/_images/new/blue_circle.png');
				});
				marker.addListener('click', function() {
					select_video_via_idstreamSource( this.url );
				});*/

	  		}

		}

	}
//	google.maps.event.addDomListener(window, 'load', initialize);

});

/* Custom marker */
function ImageMarker( options ) {
    this.setValues( options );
    
    this.$inner = $('<div>').css({
        position: 'relative',
        left: '-50%', bottom: '80px',
        fontSize: '1px',
        lineHeight: '1px',
        border: '1px solid silver',
        borderRadius: '5px',
        padding: '2px',
        backgroundColor: '#3D3B38',
        cursor: 'pointer',
        width: '90px',
        height: '75px'
    });


    this.$div = $('<div>')
        .append( this.$inner )
        .css({
            position: 'absolute',
            display: 'none'
        });

};

ImageMarker.prototype = new google.maps.OverlayView;

ImageMarker.prototype.onAdd = function() {
    $( this.getPanes().overlayMouseTarget ).append( this.$div );
};

ImageMarker.prototype.onRemove = function() {
    this.$div.remove();
};

ImageMarker.prototype.draw = function() {
    var marker = this;
    var projection = this.getProjection();
    var position = projection.fromLatLngToDivPixel( this.get('position') );

    this.$div.css({
        left: position.x,
        top: position.y,
        display: 'block'
    })

    this.$inner
        .html( '<br><div style="height:5px"></div><br><p style="text-align:center;font-size:10px;font-weight:600">'+this.get('title')+'<p/><br><div style="height:5px"></div><br><div onclick="select_video_via_idstreamSource_for_map('+ this.get('url') +')" style="height:60px;width:100%"><img style="border-radius:3px;width:100%;max-height:100%" src="' + this.get('image') + '" ></div><br><div style="width:100%;padding-top:4px"><img style="display:block;margin:0 auto" src='+this.get('icon')+'></div>' ).click( function( event ) {
			//select_video(marker.get('url'), false )
        	//window.location.href = marker.get('url');
        	select_video_via_idstreamSource_for_map( marker.get('url') );

           // var events = marker.get('events');
           // events && events.click( event );
        });
};
/* end Custom marker */