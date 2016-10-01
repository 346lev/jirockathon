function getgeo(address) {
    var BASE_URL = 'https://maps.googleapis.com/maps/api/geocode/json';
    var ACCESS_URL = BASE_URL + '?address=' + address + '&sensor=false';

    return $.ajax({
        ContentType: 'Application/json',
        type: 'GET',
        async: false,
        url: ACCESS_URL,
    }).done(function (data) {
        if(data.status == 'ok') {
            return data.results[0].geometry.location;
        }
    }).fail(function (data) {
        console.log('error');
    });
}

