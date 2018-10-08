// When the window has finished loading create our google map below
google.maps.event.addDomListener(window, 'load', init);

var markerImg = "img/map/point.svg",
    latMap = 55.76598136836506,
    lngMap = 37.60972251719666,
    zoom = 18,
    centerOfset = 0.0002;

if (isXsWidth()) {
    var markerImg = "img/map/point-sm.svg";
    var zoom = 17;
    centerOfset = 0.0003;
}


function init() {
    // Basic options for a simple Google Map
    // For more options see: https://developers.google.com/maps/documentation/javascript/reference#MapOptions
    var mapOptions = {
        // How zoomed in you want the map to start at (always required)
        language: 'ru',
        zoom: zoom,
        zoomControl: false,
        scrollwheel: false,
        mapTypeControl: false,
        fullscreenControl: false,
        // draggable: false,
        streetViewControl: false,

        // The latitude and longitude to center the map (always required)
        center: new google.maps.LatLng(latMap + centerOfset,lngMap), 

        // How you would like to style the map. 
        // This is where you would paste any style found on Snazzy Maps.
        styles: [
            {
                "featureType": "all",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#212121"
                    }
                ]
            },
            {
                "featureType": "all",
                "elementType": "labels.icon",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "administrative",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "administrative.country",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#9e9e9e"
                    }
                ]
            },
            {
                "featureType": "administrative.locality",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#bdbdbd"
                    }
                ]
            },
            {
                "featureType": "administrative.land_parcel",
                "elementType": "all",
                "stylers": [
                    {
                        "visibility": "off"
                    }
                ]
            },
            {
                "featureType": "poi",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#181818"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "poi.park",
                "elementType": "labels.text.stroke",
                "stylers": [
                    {
                        "color": "#1b1b1b"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "geometry.fill",
                "stylers": [
                    {
                        "color": "#2c2c2c"
                    }
                ]
            },
            {
                "featureType": "road",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#8a8a8a"
                    }
                ]
            },
            {
                "featureType": "road.highway",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#3c3c3c"
                    }
                ]
            },
            {
                "featureType": "road.highway.controlled_access",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#4e4e4e"
                    }
                ]
            },
            {
                "featureType": "road.arterial",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#373737"
                    }
                ]
            },
            {
                "featureType": "road.local",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#616161"
                    }
                ]
            },
            {
                "featureType": "transit",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#757575"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "geometry",
                "stylers": [
                    {
                        "color": "#000000"
                    }
                ]
            },
            {
                "featureType": "water",
                "elementType": "labels.text.fill",
                "stylers": [
                    {
                        "color": "#3d3d3d"
                    }
                ]
            }
        ]
    };

    // Get the HTML DOM element that will contain your map 
    // We are using a div with id="map" seen below in the <body>
    var mapElement = document.getElementById('map');

    // Create the Google Map using our element and options defined above
    var map = new google.maps.Map(mapElement, mapOptions);

    // Используется, если не нужны информационные окошки к объектам/маркерам
    var neighborhoods = [
        // Main
        {lat: latMap, lng: lngMap, title: 'kohlDesign', icon: markerImg},
    ];

    var markers = [];

    function drop() {
        for (var i = 0; i < neighborhoods.length; i++) {
            addMarkerWithTimeout(neighborhoods[i], i * 1500);
        }
    }

    function addMarkerWithTimeout(marker, timeout) {
        window.setTimeout(function() {
            markers.push(new google.maps.Marker({
                position: new google.maps.LatLng(marker["lat"], marker["lng"]),
                map: map,
                title: marker["title"],
                icon: {
                    url: marker["icon"]
                },
                animation: google.maps.Animation.DROP
            }));
        }, timeout);
    }

    drop();



    // Enable scroll zoom after click on map
    map.addListener('click', function() {
        map.setOptions({
            scrollwheel: true
        });
    });

    // Enable scroll zoom after drag the map
    map.addListener('drag', function() {
        map.setOptions({
            scrollwheel: true
        });
    });

    // Disable scroll zoom when mouse leave the map
    map.addListener('mouseout', function() {
        map.setOptions({
            scrollwheel: false
        });
    });

    /* Map center on resize
    =========================*/
    var getCen = map.getCenter();

    google.maps.event.addDomListener(window, 'resize', function() {
        map.setCenter(getCen);
    });
}