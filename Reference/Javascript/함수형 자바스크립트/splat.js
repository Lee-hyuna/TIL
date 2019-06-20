function splat(fun) {
    return function(array) {
        return fun.apply(null, array);
    };
}

var addArrayElements = splat(function(x, y) {
    return x + y;
});

console.log(addArrayElements([1, 2]));



var _ = require('underscore');

function unsplat(fun) {
    return function() {
        console.log(arguments);
        //ex => { '0': 'Y', '1': 'o', '2': 'w', '3': 'u' }
        return fun.call(null, _.toArray(arguments));
    };
}

var joinElements = unsplat(function(array) {
    return array.join(' ');
});

console.log(joinElements(1, 2));
//=> "1 2"

console.log(joinElements('Y', 'o', 'w', 'u'));
// => "Y o w u"