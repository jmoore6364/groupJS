var data = [
	{ name: "Jason", gender: "M", state: "CA", orders: 3 },
    { name: "John", gender: "M", state: "FL", orders: 6 },
    { name: "Mike", gender: "M", state: "WY", orders: 1 },
    { name: "Cindy", gender: "F", state: "CA", orders: 3 },
    { name: "Olivia", gender: "F", state: "FL", orders: 7 }
];

var match = function (data, newRow, props) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        if (row.done)
            continue;
        var isEqual = true;
        for (var x = 0; x < props.length; x++) {
            var prop = props[x]
            if (row[prop] != newRow[prop]) {
                isEqual = false;
                break;
            }
        }
        if (isEqual) {
            row.done = true;
            result.push(row);
        }
    }
    return result;
};

var group = function (data, properties) {
    var result = []
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        if (row.done)
            continue;
        var matches = match(data, row, properties);
        result.push(matches)
    }
    for (var i = 0; i < result.length; i++) {
        for (var x = 0; x < result[i].length; x++) {
            delete result[i][x].done;
        }
    }
    return result;
};

var flatten = function (data, prop, sumProps) {
    if (data.length == 0)
        return {};
    if (data.length == 1)
        return data[0];
    var result = JSON.parse(JSON.stringify(data[0]));
    var propData = [];
    propData.push(result[prop]);
    for (var i = 1; i < data.length; i++) {
        var row = data[i];
        propData.push(row[prop]);
        for (var x = 0; x < sumProps.length; x++) {
            var sumProp = sumProps[x];
            if (!row[sumProp])
                continue;
            if (!result[sumProp])
                result[sumProp] = row[sumProp];
            else
                result[sumProp] += row[sumProp];
        }
    }
    result[prop] = propData.join(',');
    return result;
};

var flattenGroups = function (groups, prop, sumProps) {
    var result = [];
    for (var i = 0; i < groups.length; i++) {
        result.push(flatten(groups[i], prop, sumProps));
    }
    return result;
};

var groups = group(flatData, ['name']);
console.log(flattenGroups(groups, ['gender', 'state'], ['orders']));
