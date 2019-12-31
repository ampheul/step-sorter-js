var step_sorter = require('./step-sorter-v2');
var helper = require('helper');


// make a sorted list and unsort it
var sorted = helper.range(0,10 + Math.floor(Math.random()*10));
var unsorted = helper.shuffle(sorted_list.slice());

// begin sorting with the merge_sort generator function
var choices = step_sorter.merge_sort(xs);
var i = choices.next();

while (!i.done) {
    [a,b] = i.value;
    if (a < b) {
        i = choices.next(step_sorter.lt);
    }
    else {
        i = choices.next(step_sorter.gt);
    }
}

if (compare_arrays(sorted_list, i.value)) {
    console.log("Sorting was successful!");
}
else {
    console.log("sorted_list does not match xs.");
}
