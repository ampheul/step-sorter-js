var ss = require('./generator-version');

//-- BEGIN EXAMPLE/TEST

var sorted_list = range(0,10 + Math.floor(Math.random()*10));

var xs = shuffle(sorted_list.slice());
console.log("UNSORTED:\n", xs);

// begin sorting
var choices = ss.merge_sort(xs);
var i = choices.next();
// step through the sorting process automatically
while (!i.done) {
    [a,b] = i.value;
    if (a < b) {
        i = choices.next(ss.lt);
    }
    else {
        i = choices.next(ss.gt);
    }
}

console.log("SORTED:\n", i.value);

if (compare_arrays(sorted_list, i.value)) {
    console.log("Sorting was successful!");
}
else {
    console.log("sorted_list does not match xs.");
}


//-- UTILITY FUNCTIONS

function range(start, end) {
    var xs  = [];
    for (let i = start; i <= end; i++) {
        xs.push(i);
    }
    return xs;
}

// knuth shuffle
function shuffle(xs) {
    for (let i = 0; i < xs.length; i++) {
	var k = Math.floor(Math.random()*(xs.length-i));
	// swap
	var tmp = xs[i];
	xs[i] = xs[i+k];
	xs[i+k] = tmp;
    }
    return xs;
}

function compare_arrays(xs, ys) {
    if (xs === ys) return true;
    else if (!xs || !ys) return false;
    else if (xs.length !== ys.length) return false;

    for (let i = 0; i < xs.length; i++) {
        if (xs[i] !== ys[i]) return false;
    }
    return true;
}
