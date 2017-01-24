var api_location_url = 'http://www.tegme.tv/api/globlocations';

var map;
var delay = 100;
var geocoder;
var bounds;
var locations_programs;

$.getJSON(api_location_url, function(json) {

  // code to draw map
  var col = '#FF0000';
  var link ;
  var latLng;
  var polypoints;

  function initialize() {

    locations_programs = json;

    var markersArray = [];
    var markers = {};
    
    var mapOptions = {

        center: new google.maps.LatLng(41.8919300, 12.5113300), // will be change later
        zoom: 4,
        scrollwheel: false,
        scaleControl: true,
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

    geocoder = new google.maps.Geocoder(); 
    map = new google.maps.Map(document.getElementById('map'), mapOptions);
    bounds = new google.maps.LatLngBounds();

    //var custommap = [{"featureType":"administrative","elementType":"labels.text","stylers":[{"lightness":"15"}]},{"featureType":"administrative.country","elementType":"geometry.stroke","stylers":[{"saturation":"-100"},{"lightness":"23"}]},{"featureType":"landscape","elementType":"all","stylers":[{"saturation":"35"},{"lightness":"46"},{"gamma":1},{"hue":"#6dff00"}]},{"featureType":"landscape.natural.terrain","elementType":"all","stylers":[{"lightness":"16"}]},{"featureType":"poi","elementType":"all","stylers":[{"hue":"#78ff00"},{"saturation":"22"},{"lightness":"50"},{"gamma":1}]},{"featureType":"poi","elementType":"labels.text","stylers":[{"lightness":"-27"},{"weight":"0.76"},{"saturation":"0"}]},{"featureType":"road","elementType":"all","stylers":[{"lightness":"21"}]},{"featureType":"road","elementType":"geometry.stroke","stylers":[{"lightness":"-12"}]},{"featureType":"road.highway","elementType":"all","stylers":[{"hue":"#0011ff"},{"saturation":"-84"},{"lightness":"59"},{"gamma":1},{"weight":"0.50"}]},{"featureType":"road.highway.controlled_access","elementType":"all","stylers":[{"lightness":"0"}]},{"featureType":"road.arterial","elementType":"all","stylers":[{"hue":"#ff0300"},{"saturation":-100},{"lightness":51.19999999999999},{"gamma":1}]},{"featureType":"road.local","elementType":"all","stylers":[{"hue":"#FF0300"},{"saturation":-100},{"lightness":52},{"gamma":1}]},{"featureType":"transit","elementType":"all","stylers":[{"lightness":"7"}]},{"featureType":"water","elementType":"all","stylers":[{"hue":"#009dff"},{"saturation":"-2"},{"lightness":"10"},{"gamma":1}]}];

      var custommap =[{"featureType":"water","elementType":"geometry","stylers":[{"visibility":"on"},{"color":"#aee2e0"}]},{"featureType":"landscape","elementType":"geometry.fill","stylers":[{"color":"#abce83"}]},{"featureType":"poi","elementType":"geometry.fill","stylers":[{"color":"#769E72"}]},{"featureType":"poi","elementType":"labels.text.fill","stylers":[{"color":"#7B8758"}]},{"featureType":"poi","elementType":"labels.text.stroke","stylers":[{"color":"#EBF4A4"}]},{"featureType":"poi.park","elementType":"geometry","stylers":[{"visibility":"simplified"},{"color":"#8dab68"}]},{"featureType":"road","elementType":"geometry.fill","stylers":[{"visibility":"simplified"}]},{"featureType":"road","elementType":"labels.text.fill","stylers":[{"color":"#5B5B3F"}]},{"featureType":"road","elementType":"labels.text.stroke","stylers":[{"color":"#ABCE83"}]},{"featureType":"road","elementType":"labels.icon","stylers":[{"visibility":"off"}]},{"featureType":"road.local","elementType":"geometry","stylers":[{"color":"#A4C67D"}]},{"featureType":"road.arterial","elementType":"geometry","stylers":[{"color":"#9BBF72"}]},{"featureType":"road.highway","elementType":"geometry","stylers":[{"color":"#EBF4A4"}]},{"featureType":"transit","stylers":[{"visibility":"off"}]},{"featureType":"administrative","elementType":"geometry.stroke","stylers":[{"visibility":"on"},{"color":"#87ae79"}]},{"featureType":"administrative","elementType":"geometry.fill","stylers":[{"color":"#7f2200"},{"visibility":"off"}]},{"featureType":"administrative","elementType":"labels.text.stroke","stylers":[{"color":"#ffffff"},{"visibility":"on"},{"weight":4.1}]},{"featureType":"administrative","elementType":"labels.text.fill","stylers":[{"color":"#495421"}]},{"featureType":"administrative.neighborhood","elementType":"labels","stylers":[{"visibility":"off"}]}]

    map.set('styles', custommap);

    //var latlngbounds = new google.maps.LatLngBounds();
   

    //***  PROGRAMS
    theNext();

  }

  google.maps.event.addDomListener(window, 'load', initialize);

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
        backgroundColor:'#3D3B38',        // '#1FD07C',
        cursor: 'pointer',
        width: '70px',
        height: '65px'
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
        .html( '<p style="margin:0;padding:0;text-align:center;font-size:10px;font-weight:600">'+this.get('title')+'<p/><br><div style="width:100%;height:60px"><img style="border-radius:3px;width:100%;max-height:100%" src="' + this.get('image') + '" ></div><br><div style="width:100%;padding-top:4px"><img style="display:block;margin:0 auto" src='+this.get('icon')+'></div>' )
        .click( function( event ) {
          window.location.href = marker.get('url');
          
            var events = marker.get('events');
            events && events.click( event );
        });
};
/* end Custom marker */


function geocodeAddress(address, next, index) {
    
    geocoder.geocode({address:address}, function (results,status)
    { 
       if (status == google.maps.GeocoderStatus.OK) {
        var p = results[0].geometry.location;
        var lat=p.lat();
        var lng=p.lng();
        createMarker(address,lat,lng, index);
      }
      else {

         if (status == google.maps.GeocoderStatus.OVER_QUERY_LIMIT) {
          nextAddress--;
          delay++;
        } else {  }   

      }
       next();

      
    }
  );
}

function createMarker(address,lat,lng, index) {

 var contentString = address;

 marker = new ImageMarker({
    map: map,
    position: new google.maps.LatLng(lat, lng),
    image: locations_programs[index].channellogo,
    title: locations_programs[index].channelname,
    icon: 'img/gmapicon.png',
    url: locations_programs[index].link,
    events: {
        click: function( event ) {
            
        }
    }
  });

 //icon: '../dPlayer/images/green-oval-button-hi.png',
  
 bounds.extend(marker.position);

}

var nextAddress = 0;

function theNext() {
  if (nextAddress < locations_programs.length) {
    setTimeout('geocodeAddress("'+locations_programs[nextAddress].address+'",theNext,"'+nextAddress+'")', delay);
    nextAddress++;
  } else {
    map.fitBounds(bounds);
  }
}