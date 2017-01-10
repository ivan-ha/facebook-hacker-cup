fs = require('fs');

const MIN_WEIGHT = 50;

fs.readFile('lazyloading.in.txt', 'utf8', function (err, data) {
    if (err) {
        return console.log(err);
    }

    data = data.split('\n');
    // console.log(data);

    var numOfDays = data.shift();

    for (var i = 1; i <= numOfDays; i++) {
        var numOfWeights = data.shift();
        var items = data.splice(0, numOfWeights);

        var maxTrip = calculateMaxTrip(items);
        console.log("Case #" + i + ": " + maxTrip);
    }
});

function calculateMaxTrip(items) {
    var validBag = 0;
    var start = 0;
    var end = items.length - 1;

    // http://stackoverflow.com/questions/1063007/how-to-sort-an-array-of-integers-correctly
    items = items.sort(function(a, b) {return a - b;});

    while (start <= end) {
        if (items[end] >= MIN_WEIGHT) {
            validBag++;
            end--;
        }
        else {
            var topItem = items[end];
            var weight = items[end];
            var numOfItems = 1;
            while (weight < MIN_WEIGHT && end > start) {
                start++;
                numOfItems++;
                weight = topItem * numOfItems;
            }
            if (weight >= MIN_WEIGHT) {
                validBag++;
            }
            end--;
        }
    }

    return validBag;
}