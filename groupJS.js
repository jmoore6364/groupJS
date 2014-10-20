var data = [
	{ name: "Jason", gender: "M", state: "CA", orders: 3 },
    { name: "John", gender: "M", state: "FL", orders: 6 },
    { name: "Mike", gender: "M", state: "WY", orders: 1 },
    { name: "Cindy", gender: "F", state: "CA", orders: 3 },
    { name: "Olivia", gender: "F", state: "FL", orders: 7 }
];

var getMatches = function (data, newRow) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        if (row.done)
            continue;
        if (row.name == newRow.name &&
            row.gender == newRow.gender) {
            row.done = true;
            result.push(row);
        }
    }
    return result;
};

var group = function (data) {
    var result = []
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        if (row.done)
            continue;
        var matches = getMatches(data, row);
        result.push(matches)
    }
    return result;
};
