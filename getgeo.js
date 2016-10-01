$(function () {

$.fn.getgeo = function(address) {
var BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
// var ACCESS_URL = BASE_URL + address;
var ACCESS_URL = BASE_URL + '?address=' + address + '&sensor=false';

var request = $.ajax({
    type : 'GET',
    url : ACCESS_URL,
    success : function(data) {
        geolocation = data.results[0].geometry.location;
        return geolocation;
    },
    error : function(data) {
        console.log('error');
    }
});

}
});

