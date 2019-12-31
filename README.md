# Step Sorter Js

A javascript rewrite of
[elm-step-sorter](https://github.com/ampheul/elm-step-sorter).


## Use

This module is designed for sorting an array step by step, based on
manual choices by the user. Check out the example file for how to call
this code in your project.

## Example

The following is a code example to help you learn `step-sorter`. As
you can see, it is quite easy.

```javascript
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
```


## Demo

A simple demo web app is available to demonstrate what is possible
[here](https://ampheul.github.io/elm-step-sorter/). It is programmed
in elm, but the concepts are almost identical in javascript.

*Note:*

Source code for the demo is available on
 [elm-step-sorter](https://github.com/ampheul/elm-step-sorter).

## Motivation

The inspiration behind this code came from a discussion on subjective
ratings. It is difficult to be objective when rating things. For
example, you might rate a good movie as average on a day when you're
feeling critical, and an average movie as good the next day. Unless
you keep track all the time, the scores would no longer reflect which
movies you like more. Therefore a better way to rate things could be
to rank them relative to one another. We produce this ranking by
sorting your list of objects. Comparisons cost users time. In order to
minimize cost we use Merge sort, which requires the fewest number of
comparisons asymptotically (and practically).