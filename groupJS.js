var data = [
	{ name: "Jason", gender: "M", state: "CA", orders: 3 },
    { name: "John", gender: "M", state: "FL", orders: 6 },
    { name: "Mike", gender: "M", state: "WY", orders: 1 },
    { name: "Cindy", gender: "F", state: "CA", orders: 3 },
    { name: "Olivia", gender: "F", state: "FL", orders: 7 }
];

var isArray = function (myArray) {
    return myArray.constructor.toString().indexOf("Array") > -1;
}

var anyOf = function (arrayIn, anyOfArray) {
    for (var i = 0; i < anyOfArray.length; i++) {
        var a = anyOfArray[i]
        if (arrayIn.indexOf(a) > -1)
            return true;
    }
    return false;
};

var isMatch = function (objA, objB, props, options) {
    var isMatch = true;
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        var valueA = objA[prop];
        var valueB = objB[prop];
        if (isArray(valueA) && options && options.array && options.array == 'any') {
            if (!anyOf(valueA, valueB))
                return false;
            else
                continue;
        }
        else if (valueA != valueB)
            return false;
    }
    return true;
};

var matches = function (data, obj, props, options) {
    var result = [];
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        if (isMatch(row, obj, props, options))
            result.push(row);
    }
    return result;
};

var exists = function (data, value) {
    for (var i = 0; i < data.length; i++) {
        if (data[i] == value)
            return true;
    }
    return false;
};

var group = function (data, properties, options) {
    var result = []
    for (var i = 0; i < data.length; i++) {
        var row = data[i];
        var done = false;
        for (var x = 0; x < result.length; x++) {
            if (exists(result[x], row))
                done = true;
        }
        if (done)
            continue;
        result.push(matches(data, row, properties, options))
    }
    return result;
};

var flatten = function (data, props, sumProps) {
    if (data.length == 0)
        return {};
    if (data.length == 1)
        return data[0];
    var result = JSON.parse(JSON.stringify(data[0]));
    var propData = getValues(result, props);
    for (var i = 1; i < data.length; i++) {
        var row = data[i];
        for (var x = 0; x < props.length; x++) {
            var prop = props[x];
            var a = propData[prop];
            var b = row[prop];
            if (!exists(a, b) && b != '')
                a.push(b);
        }

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
    for (var x = 0; x < props.length; x++) {
        var prop = props[x];
        result[prop] = propData[prop].join(',');
    }
    return result;
};

var getValues = function (data, props) {
    var result = {};
    for (var i = 0; i < props.length; i++) {
        var prop = props[i];
        if (data[prop] == '')
            result[prop] = [];
        else
            result[prop] = [data[prop]];
    }
    return result;
};

var flattenGroups = function (groups, props, sumProps) {
    var result = [];
    for (var i = 0; i < groups.length; i++) {
        result.push(flatten(groups[i], props, sumProps));
    }
    return result;
};

var groups = group(flatData, ['name']);
console.log(flattenGroups(groups, ['gender', 'state'], ['orders']));
