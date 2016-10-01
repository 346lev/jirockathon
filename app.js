$(function () {
    var style = document.createElement('link');
    style.rel = 'stylesheet';
    style.type = 'text/css';
    style.href = chrome.extension.getURL('fukidashi.css');
    (document.head||document.documentElement).appendChild(style);

    var addresses = $('.cassetteitem_detail-col1');
    var distance_list = [];

    addresses.each(function (i, address) {
        // インターバルされていない
        setInterval(createDistanceList(i,address), 800);
    });

    function createDistanceList(i, address) {
        distance_list.push([]);

        var building_geo = getgeo(address.innerHTML).responseJSON.results[0].geometry.location;

        $.each(jiro_latlng, function (j, val) {
            distance_list[i].push({});
            distance_list[i][j]['name'] = val.name;
            distance_list[i][j]['distance'] = getDistance(building_geo.lat, building_geo.lng, val.lat, val.lng, 0) / 1000;
        });

        distance_list[i].sort(function(a, b){
            return (a.distance < b.distance) ? -1 : 1;
        });

        var score = getScore(distance_list[i]);
        var is_high = score > 250 ? 'p-fukidashi--high' : '';
        var object = $(address).closest(".cassetteitem").find(".cassetteitem_object-item");
        object.css('position','relative');
        object.append(
            '<div class="p-fukidashiWrapper"><div class="p-fukidashi ' + is_high + '"><p class="p-fukidashi__addicted">二郎依存度</p><p class="p-fukidashi__rate">' + score + '%</p><p class="p-fukidashi__walk">' + distance_list[i][0].name + '徒歩<span class="p-fukidashi__min">' + changeWalkTime(distance_list[i][0].distance) + '分</span></p></div></div>'
        );
    }
});
