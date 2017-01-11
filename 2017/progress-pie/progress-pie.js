fs = require('fs');

const RADIUS = 50;

fs.readFile('progresspie.in.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    data = data.split('\n');
    var numOfPoints = data.shift();

    for (var i = 0; i < numOfPoints; i++) {
        var items = data[i].split(' ');
        var percent = items[0];
        var point = {
            x: items[1],
            y: items[2]
        };

        var color = isInsideProcessPie(percent, point) ? "black" : "white";
        var index = i + 1;

        console.log("Case #" + index + ": " + color);
    }
});

function isInsideCircle(point) {
    var projectedPoint = {
        x: point.x - RADIUS,
        y: point.y - RADIUS
    };

    return ((projectedPoint.x * projectedPoint.x) + (projectedPoint.y * projectedPoint.y) <= (RADIUS * RADIUS)) ? true : false;
}

function calculateAngle(point) {
    var projectedPoint = {
        x: point.x - RADIUS,
        y: point.y - RADIUS
    };

    var radian = Math.atan2(projectedPoint.x, projectedPoint.y);
    var offsetRadian = (radian > 0) ? radian : radian + (2 * Math.PI);
    var theta = offsetRadian * 180 / Math.PI;

    return theta;
}

function percentToAngle(percent) {
    return (percent / 100 * 360);
}

function isInsideProcessPie(percent, point) {
    var ret;

    if (!isInsideCircle(point)){
        ret = false;
    }
    else {
        ret = (calculateAngle(point) <= percentToAngle(percent)) ? true : false;
    }

    return ret;
}