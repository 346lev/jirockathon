/**
 * 2点間の緯度経度から距離を取得
 * 測地線航海算法を使用して距離を算出する。
 * @param float 緯度1
 * @param float 経度2
 * @param float 緯度2
 * @param float 経度2
 * @param 小数点以下の桁数(べき乗で算出精度を指定)
 */
function getDistance(lat1, lng1, lat2, lng2, precision){
    var distance = 0;
    if( ( Math.abs(lat1 - lat2) < 0.00001 ) && ( Math.abs(lng1 - lng2) < 0.00001 ) ) {
        distance = 0;
    }else{
        lat1 = lat1 * Math.PI / 180;
        lng1 = lng1 * Math.PI / 180;
        lat2 = lat2 * Math.PI / 180;
        lng2 = lng2 * Math.PI / 180;

        var A = 6378140;
        var B = 6356755;
        var F = ( A - B ) / A;

        var P1 = Math.atan( ( B / A ) * Math.tan(lat1) );
        var P2 = Math.atan( ( B / A ) * Math.tan(lat2) );

        var X = Math.acos( Math.sin(P1) * Math.sin(P2) + Math.cos(P1) * Math.cos(P2) * Math.cos(lng1 - lng2) );
        var L = ( F / 8 ) * ( ( Math.sin(X) - X ) * Math.pow( (Math.sin(P1) + Math.sin(P2) ), 2) / Math.pow( Math.cos(X / 2), 2 ) - ( Math.sin(X) - X ) * Math.pow( Math.sin(P1) - Math.sin(P2), 2 ) / Math.pow( Math.sin(X), 2) );

        distance = A * ( X + L );
        var decimal_no = Math.pow(10, precision);
        distance = Math.round(decimal_no * distance / 1) / decimal_no;
    }
    return distance;
}

function changeWalkTime(distance) {
    return Math.round(distance * 10);
}

function getScore(distanceList) {
    var score = 0;
    for (var i = 0; i < 5; i++) {
        if (distanceList[i].distance < 10) {
           score += 100 - (distanceList[i].distance * 10);
        }
    }

    return Math.round(score);
}
