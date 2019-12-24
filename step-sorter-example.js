var ss = require('./step-sorter.js');
var util = require('util');

var x = ss.init_sort([1,2,3,4,5]);

if (x) {
    console.log(util.inspect(x, {depth: null}))
}
else {
    console.log('init_sort returned undegined.');
}

while (x !== null && typeof(x) === 'object' && ss.type in x ) {

    console.log("INSPECTING IN WHILE:\n", x[ss.type], util.inspect(x, {depth: null}));

    var [a,b] = ss.choices(x);

    if (a < b) {
	x = ss.sort_step(ss.lt, x);
    }
    else {
	x = ss.sort_step(ss.gt, x);
    }
}

console.log("RESULT", x);
